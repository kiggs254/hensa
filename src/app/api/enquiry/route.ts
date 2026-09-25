/**
 * Record a WhatsApp enquiry as an order in Hensa's E-biz admin.
 *
 * The enquiry itself still goes out on WhatsApp — the browser opens the chat
 * straight away and calls this in the background — but every enquiry also
 * lands in the admin's Orders list, so the team can track, quote and follow
 * up on it there instead of only in a phone.
 *
 * E-biz's public checkout creates the order and prices it from its own
 * catalogue (Hensa's products are mostly price-on-request, so most totals are
 * 0). What E-biz needs that an enquiry doesn't have is filled in honestly:
 *   - a product: the one enquired about, resolved from its link here on the
 *     server; a general or service enquiry uses a hidden product with the
 *     slug "general-enquiry" when the shop has one, and isn't recorded
 *     otherwise (it still reaches WhatsApp);
 *   - an email: the customer's if they gave one, else the placeholder E-biz's
 *     WhatsApp bot uses (wa_<phone>@wa.placeholder), so the same person's
 *     orders stay on one customer and no email is sent to a made-up address;
 *   - a delivery address: "to be confirmed on WhatsApp".
 * Everything they wrote goes into the order notes.
 *
 * Public and unauthenticated like the WhatsApp link it shadows, so it is
 * same-origin + JSON only (E-biz has no CSRF protection) and rate-limited.
 */

import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/catalog";
import { site } from "@/lib/site";

const API = (process.env.BACKEND_ORIGIN || "https://api.hensa.co.ke").replace(/\/+$/, "");
const INTERNAL_TOKEN = process.env.INTERNAL_API_TOKEN || "";
const GENERAL_ENQUIRY_SLUG = "general-enquiry";

const json = (status: number, body: unknown) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// ── Abuse limits: per client IP, and a replay guard per enquiry key ──

const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear();
  const lastMinute = recent.filter((t) => now - t < 60_000).length;
  return lastMinute > 5 || recent.length > 30;
}

const recorded = new Map<string, { at: number; body: unknown }>();
function remember(key: string, body: unknown) {
  const now = Date.now();
  for (const [k, v] of recorded) if (now - v.at > 15 * 60_000) recorded.delete(k);
  recorded.set(key, { at: now, body });
}

// ── Input ─────────────────────────────────────────────────────────

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Kenyan mobile → 2547XXXXXXXX / 2541XXXXXXXX, or "" if it isn't one. */
function kePhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  const m = d.match(/^(?:254|0)?([71]\d{8})$/);
  return m ? `254${m[1]}` : "";
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

/** The product slug from a link to one of this site's product pages. */
function slugFromUrl(raw: string): string {
  try {
    const m = new URL(raw).pathname.match(/^\/product\/([a-z0-9][a-z0-9-]{0,190})\/?$/i);
    return m ? m[1] : "";
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json(403, { error: "Forbidden" });
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return json(415, { error: "Expected JSON" });
  }
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json(400, { error: "Invalid request" });
  }

  const key = str(body.key, 80);
  if (key.length < 16) return json(400, { error: "Invalid request" });
  // A retry of an enquiry already recorded is answered from memory, before
  // the rate limit, and never creates a second order.
  const replay = recorded.get(key);
  if (replay) return json(200, replay.body);

  // www.hensa.co.ke is behind Cloudflare, so the visitor's own address is in
  // CF-Connecting-IP; without it every visitor would share an edge IP.
  const ip =
    req.headers.get("cf-connecting-ip")?.trim() ||
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown";
  if (limited(ip)) return json(429, { error: "Too many enquiries — please try again shortly." });

  const c = (typeof body.customer === "object" && body.customer) || {};
  const name = str((c as Record<string, unknown>).name, 80);
  const phone = kePhone(str((c as Record<string, unknown>).phone, 20));
  const emailRaw = str((c as Record<string, unknown>).email, 120).toLowerCase();
  const email = isEmail(emailRaw) ? emailRaw : "";
  const identified = !!(name && phone);

  const productUrlRaw = str(body.productUrl, 300);
  // Only a real link to this site goes into the order notes.
  const productUrl = (() => {
    try {
      const u = new URL(productUrlRaw);
      return u.protocol === "https:" && u.host === new URL(site.url).host ? u.toString() : "";
    } catch {
      return "";
    }
  })();
  const productName = str(body.productName, 160);
  const service = str(body.service, 120);
  const note = str(body.note, 500);
  const message = str(body.message, 1000);
  const quantity = Math.min(100_000, Math.max(1, Math.floor(Number(body.quantity) || 1)));

  // The product enquired about — or the shop's hidden general-enquiry product.
  const slug = slugFromUrl(productUrl);
  let product = slug ? await getProductBySlug(slug) : undefined;
  const general = !product;
  if (!product) product = await getProductBySlug(GENERAL_ENQUIRY_SLUG);
  if (!product) {
    const result = { recorded: false, reason: "no_product" };
    remember(key, result);
    return json(200, result);
  }

  const [first, ...rest] = (identified ? name : "WhatsApp enquiry").split(/\s+/);
  const customerEmail = email || (identified ? `wa_${phone}@wa.placeholder` : "wa_enquiry@wa.placeholder");
  const subject = productName || service || (general ? "General enquiry" : product.name);
  const notes = [
    `WhatsApp enquiry from ${site.url.replace(/^https?:\/\//, "")} — the conversation continues on WhatsApp.`,
    `Enquiry: ${subject}${quantity > 1 ? ` × ${quantity}` : ""}`,
    general && service ? `Service: ${service}` : null,
    note ? `Note: ${note}` : null,
    message ? `Message: ${message}` : null,
    productUrl ? `Page: ${productUrl}` : null,
    identified
      ? `Customer: ${name} · +${phone}${email ? ` · ${email}` : ""}`
      : "Customer skipped their details — match this to the WhatsApp chat by time and product.",
  ]
    .filter(Boolean)
    .join("\n");

  const address = {
    first_name: first || "WhatsApp",
    last_name: rest.join(" ") || (identified ? "-" : "enquiry"),
    address_1: "To be confirmed on WhatsApp",
    city: "Nairobi",
    state: "Nairobi",
    postal_code: "",
    country: "KE",
    phone: phone ? `+${phone}` : "",
  };

  let res: Response;
  try {
    res = await fetch(`${API}/api/v1/storefront/checkout/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(INTERNAL_TOKEN ? { "X-Internal-Token": INTERNAL_TOKEN } : {}),
      },
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
      body: JSON.stringify({
        customer: {
          email: customerEmail,
          first_name: address.first_name,
          last_name: address.last_name,
          phone: address.phone || undefined,
        },
        shipping_address: address,
        billing_address: { same_as_shipping: true },
        items: [{ product_id: product.id, quantity: general ? 1 : quantity }],
        notes,
      }),
    });
  } catch (err) {
    console.error("[enquiry] E-biz unreachable", err);
    return json(502, { recorded: false, reason: "unreachable" });
  }

  const payload = (await res.json().catch(() => null)) as
    | { status?: string; message?: string; data?: { order?: { order_number?: string } } }
    | null;
  if (!res.ok || payload?.status !== "success") {
    console.error("[enquiry] create-order failed", res.status, payload?.message);
    return json(502, { recorded: false, reason: "rejected" });
  }

  const result = { recorded: true, order: payload.data?.order?.order_number ?? null };
  remember(key, result);
  return json(201, result);
}
