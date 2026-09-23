/**
 * Hensa catalogue, now sourced live from the E-biz storefront API (see api.ts)
 * instead of a static JSON export. The Product / Category shapes are unchanged
 * so components keep working; the accessors are async (server components await
 * them, and client components receive the data as props).
 */
import {
  apiGetAllProducts,
  apiGetProductBySlug,
  apiGetProductsInCategory,
  apiGetSocialLinks,
  categoryIndex,
} from "@/lib/api";

export type { SocialLink } from "@/lib/api";

export async function getSocialLinks() {
  return apiGetSocialLinks();
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  priceMax: number | null;
  onSale: boolean;
  description: string;
  categories: string[];
  tags: string[];
  image: string;
  localImage: string;
  /** Top-level category label/slug, resolved from the product's (sub)category. */
  categoryName?: string;
  categorySlug?: string;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  count: number;
  /** Direct child categories (only those that have products), for the drill-down strip. */
  children?: SubCategory[];
}

export interface SubCategory {
  slug: string;
  name: string;
  image: string;
  count: number;
  description?: string;
}

/** A browseable catalogue node (a top-level category or a subcategory) with
 *  everything the /catalog/[category] route needs for SEO + the heading. */
export interface CatalogNode {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  isSub: boolean;
  parent?: { slug: string; name: string };
}

/** Hand-written top-level copy + local fallback art (the images also live in the API). */
const CATEGORY_META: Record<string, { blurb: string; image: string; order: number }> = {
  banners: { order: 0, blurb: "Pop-up, teardrop, backdrop, X-banners, billboards & gazebos for events and promotions.", image: "/categories/banners.jpg" },
  "corporate-apparel": { order: 1, blurb: "Gents' and ladies' corporate shirts, chef jackets and tailored workwear.", image: "/categories/corporate-apparel.jpg" },
  "corporate-gifts": { order: 2, blurb: "Executive gift sets, flash disks, desk organisers and card holders.", image: "/categories/corporate-gifts.jpg" },
  "trophies-awards": { order: 2.5, blurb: "Trophies, medals, plaques, shields and crystal, glass, wood & resin awards, engraved and branded to order.", image: "/categories/corporate-gifts.jpg" },
  "corporate-stationery": { order: 3, blurb: "Notebooks, pens, business cards, letterheads, calendars, diaries and more.", image: "/categories/corporate-stationery.jpg" },
  "individual-gifts": { order: 4, blurb: "Photo books, framed photos, throw pillows, cards and personalised keepsakes.", image: "/categories/individual-gifts.jpg" },
  "promotional-items": { order: 5, blurb: "T-shirts, hoodies, caps, mugs, water bottles, bags and giveaways that carry your brand.", image: "/categories/promotional-items.jpg" },
  signages: { order: 6, blurb: "2D & 3D signage, glass and directional signs, cut and fitted to your space.", image: "/categories/signages.jpg" },
  "printing-accessories": { order: 7, blurb: "Screen-printing meshes and professional consumables for print work.", image: "/products/screen-printing-mesh-55t-high-quality.jpg" },
  campaign: { order: 8, blurb: "Election-ready merchandise for every party: t-shirts, caps, banners, lessos, flags and more, in your colours.", image: "/categories/campaign.jpg" },
};

export async function getProducts(): Promise<Product[]> {
  return apiGetAllProducts();
}

export async function getCategories(): Promise<Category[]> {
  const [{ roots }, all] = await Promise.all([categoryIndex(), apiGetAllProducts()]);
  const counts = new Map<string, number>();
  for (const p of all) for (const s of p.categories) counts.set(s, (counts.get(s) ?? 0) + 1);
  return roots
    .map((r) => {
      const meta = CATEGORY_META[r.slug];
      const children = (r.children ?? [])
        .map((c) => ({
          slug: c.slug,
          name: c.name,
          image: c.image || "",
          count: counts.get(c.slug) ?? 0,
          description: c.description || "",
        }))
        .filter((c) => c.count > 0)
        .sort((a, b) => a.name.localeCompare(b.name));
      return {
        slug: r.slug,
        name: r.name,
        blurb: meta?.blurb ?? r.description ?? "",
        image: r.image || meta?.image || "",
        count: counts.get(r.slug) ?? 0,
        children,
        _order: meta?.order ?? 99,
      };
    })
    .sort((a, b) => a._order - b._order)
    .map(({ _order, ...c }) => c);
}

export async function categoryBySlug(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((c) => c.slug === slug);
}

/** Resolve any catalogue slug (top-level category OR subcategory) to a node
 *  with a blurb + parent, for the /catalog/[category] page + its metadata. */
export async function getCatalogNode(slug: string): Promise<CatalogNode | undefined> {
  const cats = await getCategories();
  for (const c of cats) {
    if (c.slug === slug)
      return { slug: c.slug, name: c.name, blurb: c.blurb, image: c.image, isSub: false };
    for (const s of c.children ?? []) {
      if (s.slug === slug)
        return {
          slug: s.slug,
          name: s.name,
          blurb:
            s.description ||
            `${s.name}, part of our ${c.name.toLowerCase()} range, branded to order.`,
          image: s.image,
          isSub: true,
          parent: { slug: c.slug, name: c.name },
        };
    }
  }
  return undefined;
}

/** Every browseable catalogue slug (top-level + subcategories) for static params. */
export async function getAllCategorySlugs(): Promise<string[]> {
  const cats = await getCategories();
  const out: string[] = [];
  for (const c of cats) {
    out.push(c.slug);
    for (const s of c.children ?? []) out.push(s.slug);
  }
  return out;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return apiGetProductBySlug(slug);
}

export async function getProductsInCategory(slug: string): Promise<Product[]> {
  return apiGetProductsInCategory(slug);
}

export async function getRelatedProducts(product: Product, n = 4): Promise<Product[]> {
  const root = product.categorySlug || product.categories[0];
  const pool = (await apiGetProductsInCategory(root)).filter((p) => p.id !== product.id);
  return pool.slice(0, n);
}
