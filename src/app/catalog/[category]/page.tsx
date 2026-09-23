import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ShopClient from "@/components/ShopClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbNode, catalogItemListNode } from "@/lib/structured-data";
import { site } from "@/lib/site";
import {
  getProducts,
  getCategories,
  getCatalogNode,
  getAllCategorySlugs,
} from "@/lib/catalog";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const node = await getCatalogNode(category);
  if (!node) return {};
  const description = (
    node.blurb ||
    `Browse ${node.name} at ${site.name}: branded to order and delivered countrywide. Enquire on WhatsApp.`
  )
    .replace(/\s+/g, " ")
    .slice(0, 160);
  return {
    title: node.name,
    description,
    alternates: { canonical: `/catalog/${category}` },
    openGraph: {
      title: `${node.name} | ${site.name}`,
      description,
      url: `/catalog/${category}`,
      type: "website",
      ...(node.image ? { images: [node.image] } : {}),
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const [node, products, categories] = await Promise.all([
    getCatalogNode(category),
    getProducts(),
    getCategories(),
  ]);
  if (!node) notFound();

  const inCategory = products.filter((p) => p.categories.includes(category));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    ...(node.parent
      ? [{ name: node.parent.name, path: `/catalog/${node.parent.slug}` }]
      : []),
    { name: node.name, path: `/catalog/${category}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd
        data={[
          breadcrumbNode(crumbs),
          catalogItemListNode({
            name: node.name,
            path: `/catalog/${category}`,
            items: inCategory,
          }),
        ]}
      />
      <div className="mb-10">
        <p className="spec text-orange">
          {node.parent ? `${node.parent.name} · Catalog` : "The full catalogue"}
        </p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {node.name}
        </h1>
        {node.blurb ? (
          <p className="mt-3 max-w-2xl text-ink-soft">{node.blurb}</p>
        ) : null}
      </div>
      <Suspense>
        <ShopClient
          products={products}
          categories={categories}
          initialCategory={category}
        />
      </Suspense>
    </div>
  );
}
