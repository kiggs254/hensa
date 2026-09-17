import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/catalog";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const staticPages = ["", "/catalog", "/services", "/faq", "/about", "/contact"].map(
    (p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })
  );

  const categoryPages = categories.flatMap((c) => [
    {
      url: `${site.url}/catalog/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...(c.children ?? []).map((s) => ({
      url: `${site.url}/catalog/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]);

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...productPages];
}
