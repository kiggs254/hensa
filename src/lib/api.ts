/**
 * E-biz storefront API client for Hensa.
 *
 * Server-side only (fetches from BACKEND_ORIGIN with Next's fetch cache +
 * revalidation, so pages stay fast and refresh every few minutes). The static
 * catalog.json is gone; `catalog.ts` now maps these responses into the same
 * Product/Category shapes the components already use.
 */
import type { Product } from "@/lib/catalog";

// Set BACKEND_ORIGIN explicitly on every deployment: an instance's API host
// moves (Hensa's went from api-ca1f6.e-biz.co.ke to api.hensa.co.ke), and a
// stale fallback fails quietly as an empty catalog.
const RAW = (process.env.BACKEND_ORIGIN || "https://api.hensa.co.ke").replace(/\/+$/, "");
const SF = `${RAW}/api/v1/storefront`;
const REVALIDATE = 300; // seconds

// Every call here is server-side, so all of them reach the API from this
// server's one IP. The shared INTERNAL_API_TOKEN lets the API tell its own
// storefront apart from abuse and skip the per-IP rate limit (see the
// backend's isTrustedInternalCaller). Server-only env: never in the browser.
const INTERNAL_TOKEN = process.env.INTERNAL_API_TOKEN || "";

async function sf<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SF}${path}`, {
      next: { revalidate: REVALIDATE },
      headers: {
        Accept: "application/json",
        ...(INTERNAL_TOKEN ? { "X-Internal-Token": INTERNAL_TOKEN } : {}),
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as T;
  } catch {
    return null;
  }
}

/**
 * Some catalogue text came in from a WooCommerce import still HTML-encoded
 * ("Rubber Stamps &#038; Company Seal"). React escapes it again, so visitors
 * saw the raw code. Decode entities once, here at the API boundary.
 */
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: "\u00a0",
  ndash: "\u2013", mdash: "\u2014", hellip: "\u2026",
  lsquo: "\u2018", rsquo: "\u2019", ldquo: "\u201c", rdquo: "\u201d",
};
export function decodeEntities(s: string): string;
export function decodeEntities(s: string | null | undefined): string | null | undefined;
export function decodeEntities(s: string | null | undefined) {
  if (!s || !s.includes("&")) return s;
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const hex = e[1] === "x" || e[1] === "X";
      const code = parseInt(e.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : m;
    }
    return NAMED_ENTITIES[e.toLowerCase()] ?? m;
  });
}

export interface ApiCategoryNode {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  image?: string | null;
  description?: string | null;
  children?: ApiCategoryNode[];
}

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  price: string | number | null;
  sale_price: string | number | null;
  description?: string | null;
  short_description?: string | null;
  category?: { id: number; name: string; slug: string } | null;
  categories?: Array<{ slug: string }> | null;
  tags?: Array<{ name: string } | string> | null;
  images?: Array<{ url: string }> | null;
}

/** Category tree + a descendant→root lookup so a product in a subcategory still
 *  filters under its top-level category on the storefront. Cached via fetch. */
export async function categoryIndex(): Promise<{
  roots: ApiCategoryNode[];
  childToRoot: Map<string, string>;
  bySlug: Map<string, ApiCategoryNode>;
}> {
  const data = await sf<{ categories: ApiCategoryNode[] }>("/categories");
  const roots = data?.categories ?? [];
  const childToRoot = new Map<string, string>();
  const bySlug = new Map<string, ApiCategoryNode>();
  const walk = (node: ApiCategoryNode, root: string) => {
    node.name = decodeEntities(node.name);
    node.description = decodeEntities(node.description);
    bySlug.set(node.slug, node);
    childToRoot.set(node.slug, root);
    for (const c of node.children ?? []) walk(c, root);
  };
  for (const r of roots) walk(r, r.slug);
  return { roots, childToRoot, bySlug };
}

function activePrice(p: ApiProduct): { price: number; onSale: boolean } {
  const price = Number(p.price) || 0;
  const sale = p.sale_price != null ? Number(p.sale_price) : null;
  if (sale != null && sale > 0 && sale < price) return { price: sale, onSale: true };
  return { price, onSale: false };
}

function mapProduct(
  p: ApiProduct,
  childToRoot: Map<string, string>,
  bySlug: Map<string, ApiCategoryNode>
): Product {
  const { price, onSale } = activePrice(p);
  const slugs = new Set<string>();
  const add = (s?: string | null) => {
    if (!s) return;
    slugs.add(s);
    const r = childToRoot.get(s);
    if (r) slugs.add(r);
  };
  add(p.category?.slug);
  for (const c of p.categories ?? []) add(c?.slug);
  const rootSlug = (p.category?.slug && childToRoot.get(p.category.slug)) || p.category?.slug || "";
  const img = p.images?.[0]?.url || "";
  return {
    id: p.id,
    name: decodeEntities(p.name),
    slug: p.slug,
    price,
    priceMax: null,
    onSale,
    description: decodeEntities(p.description || p.short_description || ""),
    categories: [...slugs],
    tags: (p.tags ?? [])
      .map((t) => decodeEntities(typeof t === "string" ? t : t.name))
      .filter(Boolean),
    image: img,
    localImage: img,
    categoryName: rootSlug ? bySlug.get(rootSlug)?.name : undefined,
    categorySlug: rootSlug || undefined,
  };
}

export async function apiGetAllProducts(): Promise<Product[]> {
  const [{ childToRoot, bySlug }, data] = await Promise.all([
    categoryIndex(),
    sf<{ products: ApiProduct[] }>("/products?limit=1000"),
  ]);
  return (data?.products ?? []).map((p) => mapProduct(p, childToRoot, bySlug));
}

export async function apiGetProductBySlug(slug: string): Promise<Product | undefined> {
  const [{ childToRoot, bySlug }, data] = await Promise.all([
    categoryIndex(),
    sf<{ product: ApiProduct }>(`/products/${encodeURIComponent(slug)}`),
  ]);
  const p = data?.product;
  return p ? mapProduct(p, childToRoot, bySlug) : undefined;
}

export type SocialPlatform =
  | "facebook" | "instagram" | "x" | "tiktok" | "youtube" | "linkedin" | "pinterest" | "threads" | "whatsapp";
export interface SocialLink { platform: SocialPlatform; label: string; url: string }

const SOCIAL_KEYS: Array<{ key: string; platform: SocialPlatform; label: string }> = [
  { key: "social_facebook", platform: "facebook", label: "Facebook" },
  { key: "social_instagram", platform: "instagram", label: "Instagram" },
  { key: "social_twitter", platform: "x", label: "X" },
  { key: "social_tiktok", platform: "tiktok", label: "TikTok" },
  { key: "social_youtube", platform: "youtube", label: "YouTube" },
  { key: "social_linkedin", platform: "linkedin", label: "LinkedIn" },
  { key: "social_pinterest", platform: "pinterest", label: "Pinterest" },
  { key: "social_threads", platform: "threads", label: "Threads" },
  { key: "social_whatsapp", platform: "whatsapp", label: "WhatsApp" },
];

function socialUrl(raw: string, platform: SocialPlatform): string {
  const v = raw.trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (platform === "whatsapp") {
    const digits = v.replace(/[^\d]/g, "");
    return digits ? `https://wa.me/${digits}` : v;
  }
  return `https://${v.replace(/^\/+/, "")}`;
}

/** Social links configured in the admin (Settings). Only the ones actually set
 *  come back, in a stable display order. */
export async function apiGetSocialLinks(): Promise<SocialLink[]> {
  const data = await sf<{ settings: Record<string, unknown> }>("/settings");
  const s = data?.settings ?? {};
  const out: SocialLink[] = [];
  for (const { key, platform, label } of SOCIAL_KEYS) {
    const raw = s[key];
    if (typeof raw === "string" && raw.trim()) {
      out.push({ platform, label, url: socialUrl(raw, platform) });
    }
  }
  return out;
}

export async function apiGetProductsInCategory(slug: string): Promise<Product[]> {
  const [{ childToRoot, bySlug }, data] = await Promise.all([
    categoryIndex(),
    sf<{ products: ApiProduct[] }>(`/products?category_slug=${encodeURIComponent(slug)}&limit=1000`),
  ]);
  return (data?.products ?? []).map((p) => mapProduct(p, childToRoot, bySlug));
}
