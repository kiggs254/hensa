import type { Metadata } from "next";
import { Suspense } from "react";
import { permanentRedirect } from "next/navigation";
import ShopClient from "@/components/ShopClient";
import { getProducts, getCategories } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Catalog — Branded Products & Corporate Gifts",
  description:
    "Browse branded products: banners, corporate apparel, gifts, stationery, promotional items, signage and trophies & awards. Enquire instantly on WhatsApp.",
  alternates: { canonical: "/catalog" },
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  // Legacy ?category= links now live at /catalog/<slug> — send them there.
  const { category } = await searchParams;
  if (category) permanentRedirect(`/catalog/${category}`);

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="spec text-orange">The full catalogue</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Catalog
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Every item can be branded with your logo. Pick a product, hit{" "}
          <strong className="text-green-deep">Enquire</strong>, and we&apos;ll
          take it from there on WhatsApp — no checkout needed.
        </p>
      </div>
      <Suspense>
        <ShopClient products={products} categories={categories} />
      </Suspense>
    </div>
  );
}
