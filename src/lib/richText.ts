import { decodeEntities } from "@/lib/api";

/**
 * Product descriptions arrive either as plain text (older imports) or as
 * simple HTML from the admin editor (<p>, <ul><li>, <strong>…). These helpers
 * turn them into (a) plain text for cards, search, meta tags and JSON-LD and
 * (b) a strict allowlist of formatting tags for the product page.
 */

const ALLOWED = new Set(["p", "br", "ul", "ol", "li", "strong", "b", "em", "i", "h3", "h4"]);
const TAG_RE = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;

export const looksLikeHtml = (s: string) => /<\/?[a-z][a-z0-9]*\b[^>]*>/i.test(s);

/** HTML → readable plain text ("Size: B5. Available colours: …"). */
export function toPlainText(html: string): string {
  if (!looksLikeHtml(html)) return decodeEntities(html).replace(/\s+/g, " ").trim();
  const text = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/li>/gi, ". ")
    .replace(/<(br|\/p|\/h[1-6]|\/div|\/ul|\/ol)\b[^>]*>/gi, " ")
    .replace(TAG_RE, "");
  return decodeEntities(text)
    .replace(/\s+/g, " ")
    .replace(/\s+\./g, ".")
    .replace(/([.:!?])\.+/g, "$1")
    .trim();
}

/**
 * Keeps only allowlisted formatting tags, rebuilt WITHOUT attributes (so no
 * on*= handlers, styles or links survive); everything else is dropped and any
 * stray angle brackets in text are escaped.
 */
export function sanitizeRichText(html: string): string {
  const cleaned = html.replace(/<(script|style|iframe|object|template)\b[\s\S]*?<\/\1>/gi, "");
  let out = "";
  let last = 0;
  for (const m of cleaned.matchAll(TAG_RE)) {
    out += escapeText(cleaned.slice(last, m.index));
    last = m.index! + m[0].length;
    const name = m[1].toLowerCase();
    if (!ALLOWED.has(name)) continue;
    const closing = m[0][1] === "/";
    out += name === "br" ? "<br>" : closing ? `</${name}>` : `<${name}>`;
  }
  return out + escapeText(cleaned.slice(last));
}

const escapeText = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
