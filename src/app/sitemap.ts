import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/catalog";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/shop", "/services", "/faq", "/about", "/contact"].map(
    (p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })
  );

  const categoryPages = categories.map((c) => ({
    url: `${site.url}/shop?category=${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

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
