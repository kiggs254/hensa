import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getProducts,
  getProductBySlug,
  getRelatedProducts,
  categoryBySlug,
} from "@/lib/catalog";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbNode } from "@/lib/structured-data";
import ProductEnquiry from "@/components/ProductEnquiry";
import ProductCard from "@/components/ProductCard";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.description} Enquire on WhatsApp for a quote. Countrywide delivery across Kenya.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      images: [{ url: product.localImage }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cat = await categoryBySlug(product.categorySlug || product.categories[0]);
  const related = await getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${site.url}${product.localImage}`,
    description: product.description,
    category: cat?.name,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": `${site.url}/#organization` },
    // no Offer node: this is a quote-on-enquiry business with no public prices
  };

  const breadcrumb = breadcrumbNode([
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    ...(cat ? [{ name: cat.name, path: `/catalog/${cat.slug}` }] : []),
    { name: product.name, path: `/product/${product.slug}` },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumb} />

      {/* breadcrumb */}
      <nav className="spec flex flex-wrap items-center gap-2 text-ink-soft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-orange">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-orange">Catalog</Link>
        {cat && (
          <>
            <span>/</span>
            <Link href={`/catalog/${cat.slug}`} className="hover:text-orange">
              {cat.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* image */}
        <div className="cropmarks relative border border-ink/10 bg-white p-3">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.localImage}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {cat && (
            <span className="spec absolute left-6 top-6 bg-ink/85 px-2.5 py-1.5 text-cream backdrop-blur">
              {cat.name}
            </span>
          )}
        </div>

        {/* info */}
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="regline my-6 h-px" />
          <p className="leading-relaxed text-ink-soft">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="spec border border-ink/15 bg-paper-warm px-2.5 py-1.5 text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8">
            <ProductEnquiry product={product} />
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            You might also like
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
