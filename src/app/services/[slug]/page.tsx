import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services, serviceBySlug } from "@/data/services";
import { getProducts, type Product } from "@/lib/catalog";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { serviceNode, breadcrumbNode, faqNode } from "@/lib/structured-data";
import EnquireButton from "@/components/EnquireButton";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon, ArrowIcon, PhoneIcon } from "@/components/icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} in Nairobi, Kenya`,
    description: `${service.short} ${service.intro[0]}`.slice(0, 155),
    alternates: { canonical: `/services/${service.slug}` },
  };
}

async function matchProducts(keywords: string[], n: number): Promise<Product[]> {
  const kws = keywords.map((k) => k.toLowerCase());
  const products = await getProducts();
  return products
    .map((p) => {
      const hay = `${p.name} ${p.tags.join(" ")}`.toLowerCase();
      return { p, score: kws.reduce((s, k) => s + (hay.includes(k) ? 1 : 0), 0) };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.p);
}

const ACCENTS = {
  orange: {
    spec: "text-orange",
    headline: "text-orange",
    blob: "bg-orange/10",
    halftone: "text-orange/30",
    chipIcon: "bg-orange/10 text-orange",
    stepNum: "text-orange/20 group-hover:text-orange/40",
    slash: "text-orange",
    faqHover: "hover:border-orange/40",
  },
  green: {
    spec: "text-green-deep",
    headline: "text-green-deep",
    blob: "bg-green/12",
    halftone: "text-green/35",
    chipIcon: "bg-green/10 text-green-deep",
    stepNum: "text-green/25 group-hover:text-green/50",
    slash: "text-green-deep",
    faqHover: "hover:border-green/50",
  },
} as const;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const a = ACCENTS[service.accent];
  const gallery = await matchProducts(service.keywords, 8);
  const heroImages = gallery.slice(0, 2);
  const related = service.related
    .map((r) => serviceBySlug(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const enquiryPayload = { service: service.name };

  return (
    <>
      <JsonLd
        data={serviceNode({
          name: service.name,
          description: `${service.short} ${service.intro[0]}`,
          slug: service.slug,
        })}
      />
      <JsonLd
        data={breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Our Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
      {service.faqs.length > 0 && <JsonLd data={faqNode(service.faqs)} />}

      {/* ============ HERO ============ */}
      <section className="grain relative overflow-hidden border-b border-ink/10 bg-paper-warm">
        <div
          className={`halftone halftone-fade pointer-events-none absolute -right-16 -top-16 h-80 w-80 rotate-12 ${a.halftone}`}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:pb-20 lg:pt-14">
          <nav className="spec flex flex-wrap items-center gap-2 text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-orange">Our Services</Link>
            <span>/</span>
            <span className="text-ink">{service.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className={`spec flex items-center gap-3 ${a.spec}`}>
                <span className="inline-block h-2 w-2 rounded-full bg-current" />
                {service.kicker}
              </p>
              <h1 className="font-display animate-rise mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {service.title[0]}
                <span className={a.headline}>{service.title[1]}</span>
                {service.title[2]}
              </h1>
              <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-soft [animation-delay:150ms]">
                {service.intro[0]}
              </p>

              <div className="animate-rise mt-8 flex flex-wrap items-center gap-4 [animation-delay:250ms]">
                <EnquireButton
                  payload={enquiryPayload}
                  className="flex items-center gap-2.5 rounded-full bg-green px-7 py-3.5 font-display font-bold text-white shadow-[0_10px_28px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-green-deep"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enquire about {service.name}
                </EnquireButton>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3 font-display font-bold transition-colors hover:border-orange hover:text-orange"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>

              {/* spec sheet */}
              <dl className="animate-rise mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-4 [animation-delay:350ms]">
                {service.specs.map((s) => (
                  <div key={s.k} className="bg-cream p-3.5">
                    <dt className="spec text-[9px] text-ink-soft">{s.k}</dt>
                    <dd className="mt-1 text-[13px] font-bold leading-snug">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* image collage */}
            <div className="relative hidden lg:col-span-5 lg:block">
              <div
                className={`absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full ${a.blob}`}
              />
              <div className="relative flex items-center justify-center py-6">
                {heroImages[0] && (
                  <Link
                    href={`/product/${heroImages[0].slug}`}
                    className="relative z-10 block w-64 rotate-[-4deg] overflow-hidden rounded-3xl border-[6px] border-white bg-white shadow-[0_30px_60px_rgba(28,26,22,0.25)] transition-transform duration-500 hover:rotate-0"
                  >
                    <Image
                      src={heroImages[0].localImage}
                      alt={heroImages[0].name}
                      width={480}
                      height={480}
                      priority
                      className="aspect-square w-full object-cover"
                    />
                  </Link>
                )}
                {heroImages[1] && (
                  <Link
                    href={`/product/${heroImages[1].slug}`}
                    className="relative z-20 -ml-16 mt-28 block w-52 rotate-[5deg] overflow-hidden rounded-3xl border-[6px] border-white bg-white shadow-[0_30px_60px_rgba(28,26,22,0.25)] transition-transform duration-500 hover:rotate-0"
                  >
                    <Image
                      src={heroImages[1].localImage}
                      alt={heroImages[1].name}
                      width={400}
                      height={400}
                      className="aspect-square w-full object-cover"
                    />
                  </Link>
                )}
                <svg
                  viewBox="0 0 40 40"
                  className="absolute -bottom-2 right-4 h-9 w-9 text-ink/25"
                  aria-hidden="true"
                >
                  <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PERFECT FOR ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className={`spec ${a.spec}`}>Where it shines</p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Perfect for
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{service.intro[1]}</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {service.perfectFor.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 80}>
                <div className="group flex items-center gap-3.5 rounded-2xl border border-ink/10 bg-cream p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_14px_30px_rgba(28,26,22,0.10)]">
                  <span
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl ${a.chipIcon}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-display text-[15px] font-bold">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="border-y border-ink/10 bg-paper-warm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className={`spec ${a.spec}`}>How it works</p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From brief to finished piece
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {service.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="cropmarks group h-full border border-ink/10 bg-cream p-6 transition-colors hover:border-orange/40">
                  <p className={`font-display text-5xl font-extrabold transition-colors ${a.stepNum}`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-3 text-xl font-bold">
                    <span className={a.slash}>/</span> {s.t}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FROM THE CATALOGUE ============ */}
      {gallery.length >= 4 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={`spec ${a.spec}`}>Straight from the catalogue</p>
                <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Products we brand with {service.name.toLowerCase()}
                </h2>
              </div>
              <Link
                href="/shop"
                className="group flex items-center gap-2 font-display font-bold text-green-deep transition-colors hover:text-orange"
              >
                Browse everything
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {gallery.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <Reveal>
          <p className={`spec text-center ${a.spec}`}>Good to know</p>
          <h2 className="font-display mt-2 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            {service.name}, answered
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {service.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <details
                className={`group rounded-2xl border border-ink/10 bg-cream transition-colors ${a.faqHover}`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ink/15 text-lg leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ RELATED SERVICES ============ */}
      <section className="border-t border-ink/10 bg-paper-warm">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Pairs well with
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-ink/10 bg-cream p-5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_18px_38px_rgba(28,26,22,0.12)]"
                >
                  <span
                    className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-colors duration-300 ${
                      r.accent === "orange"
                        ? "bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white"
                        : "bg-green/10 text-green-deep group-hover:bg-green group-hover:text-white"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      {r.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="font-display block font-bold transition-colors group-hover:text-orange">
                      {r.name}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-ink-soft">
                      {r.short}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-ink py-16 text-cream">
        <div className="halftone pointer-events-none absolute -left-10 top-0 h-full w-64 text-green/20" />
        <div className="halftone pointer-events-none absolute -right-10 top-0 h-full w-64 text-orange/20" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to put {service.name.toLowerCase()} to work?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/70">
              Describe your project on WhatsApp — quantities, deadline, ideas —
              and our team replies with options and a quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <EnquireButton
                payload={enquiryPayload}
                className="flex items-center gap-2.5 rounded-full bg-green px-8 py-4 font-display font-bold text-white shadow-[0_10px_30px_rgba(51,160,44,0.4)] transition-all hover:-translate-y-0.5 hover:bg-green-deep"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Start a WhatsApp enquiry
              </EnquireButton>
              <a
                href={site.phoneHref}
                className="rounded-full border border-cream/30 px-8 py-4 font-display font-bold transition-colors hover:border-orange hover:text-orange"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
