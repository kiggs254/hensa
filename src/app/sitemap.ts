import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/catalog";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export const revalidate = 300;

/** Absolute, XML-safe image URL (the storefront serves API media as-is). */
const abs = (u: string) => (/^https?:\/\//.test(u) ? u : `${site.url}${u}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const latest = (list: { updatedAt?: string }[]) =>
    list.reduce<Date | undefined>((max, p) => {
      const d = p.updatedAt ? new Date(p.updatedAt) : undefined;
      return d && !Number.isNaN(+d) && (!max || d > max) ? d : max;
    }, undefined);
  const catalogUpdated = latest(products);

  const staticPages = ["", "/catalog", "/services", "/faq", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    ...(p === "" || p === "/catalog" ? { lastModified: catalogUpdated } : {}),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const inCat = (slug: string) => products.filter((p) => p.categories.includes(slug));
  const categoryPages = categories.flatMap((c) => [
    {
      url: `${site.url}/catalog/${c.slug}`,
      lastModified: latest(inCat(c.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      ...(c.image ? { images: [abs(c.image)] } : {}),
    },
    ...(c.children ?? []).map((s) => ({
      url: `${site.url}/catalog/${s.slug}`,
      lastModified: latest(inCat(s.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...(s.image ? { images: [abs(s.image)] } : {}),
    })),
  ]);

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Every product photo goes in as an <image:image> so Google Images can find
  // them all (the product page itself only shows one large photo at a time).
  const productPages = products.map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    ...(p.updatedAt ? { lastModified: new Date(p.updatedAt) } : {}),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: (p.images.length ? p.images.map((i) => i.url) : [p.localImage]).filter(Boolean).slice(0, 10).map(abs),
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...productPages];
}
