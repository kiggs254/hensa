import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
import ProductGallery from "@/components/ProductGallery";

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
  const description = metaDescription(product);
  const images = product.images.length ? product.images : [{ url: product.localImage, alt: product.name }];
  return {
    // Admin SEO title already ends in "| Hensa"; otherwise the layout template adds the brand.
    title: product.seoTitle ? { absolute: product.seoTitle } : product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.seoTitle || product.name,
      description,
      url: `/product/${product.slug}`,
      images: images.slice(0, 4).map((i) => ({ url: i.url, alt: i.alt || product.name })),
    },
    twitter: { card: "summary_large_image", title: product.seoTitle || product.name, description, images: [images[0].url] },
  };
}

/** ≤160 chars: the admin SEO description, else the product text + a short CTA. */
function metaDescription(p: { seoDescription?: string; description: string; name: string }): string {
  if (p.seoDescription) return p.seoDescription;
  const cta = " Get a quote on WhatsApp.";
  const base = p.description || `${p.name}, branded with your logo by Hensa Solutions, Nairobi.`;
  if (base.length + cta.length <= 160) return base + cta;
  const cut = base.slice(0, 157);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "") + "…";
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

  const abs = (u: string) => (/^https?:\/\//.test(u) ? u : `${site.url}${u}`);
  const photos = product.images.length ? product.images : [{ url: product.localImage, alt: product.name }];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site.url}/product/${product.slug}#product`,
    name: product.name,
    url: `${site.url}/product/${product.slug}`,
    image: photos.map((i) => abs(i.url)),
    description: product.description,
    ...(product.sku ? { sku: product.sku } : {}),
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
        {/* photos */}
        <ProductGallery images={photos} name={product.name} badge={cat?.name} />

        {/* info */}
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="regline my-6 h-px" />
          {product.descriptionHtml ? (
            <div
              className="space-y-3 leading-relaxed text-ink-soft [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-ink [&_h4]:font-bold [&_h4]:text-ink [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:marker:text-orange"
              // sanitised in lib/richText.ts: allowlisted tags only, no attributes
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="leading-relaxed text-ink-soft">{product.description}</p>
          )}

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
