import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop — Branded Products & Corporate Gifts",
  description:
    "Browse 270+ branded products: banners, corporate apparel, gifts, stationery, promotional items and signage. Enquire instantly on WhatsApp.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="spec text-orange">The full catalogue</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Shop
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Every item can be branded with your logo. Pick a product, hit{" "}
          <strong className="text-green-deep">Enquire</strong>, and we&apos;ll
          take it from there on WhatsApp — no checkout needed.
        </p>
      </div>
      <Suspense>
        <ShopClient />
      </Suspense>
    </div>
  );
}
