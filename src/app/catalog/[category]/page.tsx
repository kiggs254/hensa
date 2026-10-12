import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopClient from "@/components/ShopClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbNode, catalogItemListNode, faqNode } from "@/lib/structured-data";
import { categoryGuides } from "@/data/categoryGuides";
import { sanitizeRichText } from "@/lib/richText";
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
    node.seoDescription ||
    node.blurb ||
    `Browse ${node.name} at ${site.name}: branded to order and delivered countrywide. Enquire on WhatsApp.`
  )
    .replace(/\s+/g, " ")
    .slice(0, 160);
  const title = node.seoTitle || `${node.name}, Branded to Order in Kenya`;
  return {
    // admin SEO titles already end in "| Hensa"; the generated one gets the template
    title: node.seoTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: `/catalog/${category}` },
    openGraph: {
      title: node.seoTitle || `${node.name} | ${site.name}`,
      description,
      url: `/catalog/${category}`,
      type: "website",
      ...(node.image ? { images: [{ url: node.image, alt: `${node.name} by ${site.name}` }] } : {}),
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
  const guide = categoryGuides[category];
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
          ...(guide ? [faqNode(guide.faq)] : []),
        ]}
      />
      <div className="mb-10">
        <p className="spec text-orange">
          {node.parent ? `${node.parent.name} · Catalog` : "The full catalogue"}
        </p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {node.name}
        </h1>
        {node.descriptionHtml ? (
          <div
            className="mt-4 max-w-3xl space-y-3 leading-relaxed text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink"
            // sanitised in lib/catalog.ts (lib/richText allowlist)
            dangerouslySetInnerHTML={{ __html: node.descriptionHtml }}
          />
        ) : node.blurb ? (
          <p className="mt-3 max-w-2xl text-ink-soft">{node.blurb}</p>
        ) : null}
      </div>
      <ShopClient
        products={inCategory}
        categories={categories}
        initialCategory={category}
      />

      {guide && (
        <section className="mt-20 grid gap-12 border-t border-ink/10 pt-14 lg:grid-cols-12" aria-label={`${node.name} buying guide`}>
          <div
            className="lg:col-span-7 space-y-4 leading-relaxed text-ink-soft [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-ink sm:[&_h2]:text-3xl [&_h3]:font-display [&_h3]:pt-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:marker:text-orange"
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(guide.guideHtml) }}
          />
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Questions buyers ask</h2>
            <div className="mt-5 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
              {guide.faq.map((f) => (
                <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="mt-0.5 text-orange transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
