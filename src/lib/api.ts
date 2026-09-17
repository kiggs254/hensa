/**
 * E-biz storefront API client for Hensa.
 *
 * Server-side only (fetches from BACKEND_ORIGIN with Next's fetch cache +
 * revalidation, so pages stay fast and refresh every few minutes). The static
 * catalog.json is gone — `catalog.ts` now maps these responses into the same
 * Product/Category shapes the components already use.
 */
import type { Product } from "@/lib/catalog";

const RAW = (process.env.BACKEND_ORIGIN || "https://api-ca1f6.e-biz.co.ke").replace(/\/+$/, "");
const SF = `${RAW}/api/v1/storefront`;
const REVALIDATE = 300; // seconds

async function sf<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SF}${path}`, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as T;
  } catch {
    return null;
  }
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
    name: p.name,
    slug: p.slug,
    price,
    priceMax: null,
    onSale,
    description: p.description || p.short_description || "",
    categories: [...slugs],
    tags: (p.tags ?? []).map((t) => (typeof t === "string" ? t : t.name)).filter(Boolean),
    image: img,
    localImage: img,
    categoryName: rootSlug ? bySlug.get(rootSlug)?.name : undefined,
    categorySlug: rootSlug || undefined,
  };
}

export async function apiGetAllProducts(): Promise<Product[]> {
  const [{ childToRoot, bySlug }, data] = await Promise.all([
    categoryIndex(),
    sf<{ products: ApiProduct[] }>("/products?limit=500"),
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

export async function apiGetProductsInCategory(slug: string): Promise<Product[]> {
  const [{ childToRoot, bySlug }, data] = await Promise.all([
    categoryIndex(),
    sf<{ products: ApiProduct[] }>(`/products?category_slug=${encodeURIComponent(slug)}&limit=500`),
  ]);
  return (data?.products ?? []).map((p) => mapProduct(p, childToRoot, bySlug));
}
