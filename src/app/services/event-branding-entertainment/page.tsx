import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { serviceBySlug } from "@/data/services";
import {
  EVENT_SERVICE_SLUG,
  hero,
  branding,
  entertainment,
  closing,
} from "@/data/events";
import { pickProducts } from "@/lib/catalog";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { serviceNode, breadcrumbNode, faqNode } from "@/lib/structured-data";
import EnquireButton from "@/components/EnquireButton";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon, ArrowIcon, PhoneIcon } from "@/components/icons";

export const revalidate = 300;

const PATH = `/services/${EVENT_SERVICE_SLUG}`;
const TITLE = "Event Branding & Entertainment in Nairobi, Kenya";
const DESCRIPTION =
  "Event branding in Nairobi (backdrops, signage, delegate kits, gifts) plus live entertainment from traditional dancers, acrobats, fire performers and bands.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  // openGraph replaces the layout's object rather than merging into it, so the
  // site-wide fields are repeated; the image comes from opengraph-image.jpg here
  openGraph: {
    siteName: site.name,
    locale: "en_KE",
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: PATH,
    type: "website",
  },
  twitter: { title: `${TITLE} | ${site.name}`, description: DESCRIPTION },
};

/** stage-light glow used behind the dark sections */
function Glow({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default async function EventBrandingEntertainmentPage() {
  const service = serviceBySlug(EVENT_SERVICE_SLUG);
  if (!service) notFound();

  const catalogue = await pickProducts(service.keywords, 8, {
    excludeCategories: ["campaign"],
  });
  const related = service.related
    .map((r) => serviceBySlug(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const acts = entertainment.acts;
  // Featured acts span 2x2 in the 4-column grid (full width at 2 columns).
  // Feature as many as it takes for the rows to come out even, so adding or
  // removing an act never leaves an orphan tile: 13 acts -> 1, 10 acts -> 2.
  const featuredCount =
    [1, 2, 3, 0].find((f) => (3 * f + acts.length) % 4 === 0) ?? 1;

  return (
    <>
      <JsonLd
        data={serviceNode({
          name: service.name,
          description: `${service.intro[0]} ${service.intro[1]}`,
          slug: service.slug,
          serviceType: "Event branding and live entertainment",
        })}
      />
      <JsonLd
        data={breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Our Services", path: "/services" },
          { name: service.name, path: PATH },
        ])}
      />
      <JsonLd data={faqNode(service.faqs)} />

      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[72%_center]"
        />
        {/* ink wash where the copy sits, so it reads over any part of the photo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/25 lg:via-ink/70 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink/90 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pb-24 lg:pt-12">
          <nav
            className="spec flex flex-wrap items-center gap-2 text-cream/55"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-orange">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-orange">Our Services</Link>
            <span aria-hidden>/</span>
            <span className="text-cream/85" aria-current="page">{service.name}</span>
          </nav>

          <div className="mt-12 max-w-2xl lg:mt-20">
            <p className="spec flex items-center gap-3 text-orange">
              <span className="inline-block h-2 w-2 rounded-full bg-orange" />
              {service.name}
            </p>
            <h1 className="font-display animate-rise mt-4 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {service.title[0]}
              <span className="text-orange">{service.title[1]}</span>
              {service.title[2]}
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-cream/75 [animation-delay:150ms]">
              {hero.lead}
            </p>

            <div className="animate-rise mt-8 flex flex-wrap items-center gap-3.5 [animation-delay:250ms]">
              <EnquireButton
                payload={{ service: service.name }}
                className="flex items-center gap-2.5 rounded-full bg-green px-7 py-3.5 font-display font-bold text-white shadow-[0_10px_28px_rgba(51,160,44,0.4)] transition-all hover:-translate-y-0.5 hover:bg-green-deep"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Plan your event on WhatsApp
              </EnquireButton>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 font-display font-bold transition-colors hover:border-orange hover:text-orange"
              >
                <PhoneIcon className="h-4 w-4" />
                {site.phone}
              </a>
            </div>

            {/* the page in two halves: jump straight to either */}
            <div className="animate-rise mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/15 bg-cream/15 [animation-delay:350ms]">
              {[
                { href: "#branding", n: "01", t: "Event branding" },
                { href: "#entertainment", n: "02", t: "Live entertainment" },
              ].map((j) => (
                <a
                  key={j.href}
                  href={j.href}
                  className="group flex items-center justify-between gap-3 bg-ink/70 px-4 py-3.5 backdrop-blur transition-colors hover:bg-ink/40"
                >
                  <span>
                    <span className="spec block text-[10px] text-cream/50">{j.n}</span>
                    <span className="font-display text-sm font-bold sm:text-base">{j.t}</span>
                  </span>
                  <ArrowIcon className="h-4 w-4 rotate-90 text-orange transition-transform group-hover:translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PERFECT FOR (ticker) ============ */}
      {/* Decorative: the same list is real text in the entertainment section. */}
      <div aria-hidden className="relative overflow-hidden border-y border-ink/10 bg-orange-deep text-white">
        <div className="animate-marquee flex w-max items-center py-3.5">
          {[...service.perfectFor, ...service.perfectFor].map((t, i) => (
            <span key={i} className="flex items-center font-display text-base font-bold sm:text-lg">
              <span className="px-6">{t}</span>
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-white/55">
                <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* ============ 01 EVENT BRANDING ============ */}
      <section id="branding" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6">
              <p className="spec flex items-center gap-3 text-orange">
                <span>01</span>
                <span className="h-px w-8 bg-orange/50" />
                Event branding
              </p>
              <h2 className="font-display mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {branding.heading}
              </h2>
              {branding.intro.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal className="relative lg:col-span-6" delay={120}>
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 sm:h-[26rem] sm:w-[26rem]" />
              <div className="halftone halftone-fade pointer-events-none absolute -right-2 -top-6 h-40 w-40 rounded-full text-green/35" />
              <div className="relative mx-auto w-full max-w-md rotate-[-2.5deg] overflow-hidden rounded-3xl border-[6px] border-white bg-white shadow-[0_30px_60px_rgba(28,26,22,0.22)] transition-transform duration-500 hover:rotate-0">
                <Image
                  src={branding.image.src}
                  alt={branding.image.alt}
                  width={1312}
                  height={1199}
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 right-6 rotate-3 rounded-2xl border border-ink/10 bg-cream px-4 py-2.5 shadow-[0_12px_30px_rgba(28,26,22,0.18)] sm:right-12">
                <p className="font-display text-base font-extrabold leading-none text-orange">One look</p>
                <p className="spec mt-1 text-[9px] text-ink-soft">badge to backdrop</p>
              </div>
              <svg
                viewBox="0 0 40 40"
                className="absolute -left-1 bottom-8 h-9 w-9 text-ink/25"
                aria-hidden="true"
              >
                <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Reveal>
          </div>

          {/* what we supply */}
          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            {branding.groups.map((g, i) => (
              <Reveal key={g.id} delay={i * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(28,26,22,0.12)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-warm">
                    <Image
                      src={g.image.src}
                      alt={g.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="spec absolute left-3 top-3 rounded-full bg-ink/75 px-2.5 py-1 text-[9px] text-cream backdrop-blur">
                      {String(i + 1).padStart(2, "0")} · {g.items.length} items
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{g.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-soft">{g.lead}:</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-ink/12 bg-paper px-2.5 py-1 text-[12px] font-medium text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* from the catalogue: real products they can enquire about now */}
          {catalogue.length >= 4 && (
            <div className="mt-20">
              <Reveal>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="spec text-green-deep">Straight from the catalogue</p>
                    <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                      Stock the event
                    </h2>
                  </div>
                  <Link
                    href="/catalog"
                    className="group flex items-center gap-2 font-display font-bold text-green-deep transition-colors hover:text-orange"
                  >
                    Browse everything
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
                {catalogue.slice(0, 8).map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 80}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* branding, in one line */}
          <Reveal>
            <div className="relative mt-20 overflow-hidden rounded-[2rem] bg-paper-warm px-7 py-10 sm:px-12 sm:py-14">
              <div className="halftone pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full text-orange/25 [mask-image:radial-gradient(black,transparent_70%)]" />
              <p className="spec text-orange">From concept to execution</p>
              <p className="font-display relative mt-4 max-w-4xl text-2xl font-bold leading-snug tracking-tight sm:text-[2rem] sm:leading-[1.25]">
                {branding.closing}
              </p>
              <EnquireButton
                payload={{ service: "Event branding" }}
                className="group relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-display font-bold text-cream transition-colors hover:bg-orange"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Brief us on your event branding
              </EnquireButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 02 LIVE ENTERTAINMENT ============ */}
      <section id="entertainment" className="relative scroll-mt-24 overflow-hidden bg-ink text-cream">
        <Glow className="-left-48 -top-24 h-[34rem] w-[34rem] bg-green/25" />
        <Glow className="-right-48 top-[28rem] h-[30rem] w-[30rem] bg-orange/20" />
        <Glow className="bottom-0 left-1/3 h-[26rem] w-[26rem] bg-green/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <p className="spec flex items-center gap-3 text-green">
                <span>02</span>
                <span className="h-px w-8 bg-green/50" />
                Live entertainment
              </p>
              <h2 className="font-display mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {entertainment.heading}
              </h2>
              {entertainment.intro.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 text-lg leading-relaxed text-cream/70">
                  {p}
                </p>
              ))}

              <h3 className="spec mt-9 text-cream/50">Perfect for</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.perfectFor.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/[0.04] px-3 py-1.5 text-[13px] font-medium text-cream/85"
                  >
                    <span className="text-green">
                      <CheckIcon />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={120}>
              <div className="relative overflow-hidden rounded-[2rem] border border-cream/10 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src={entertainment.image.src}
                  alt={entertainment.image.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-cream/10" />
              </div>
            </Reveal>
          </div>

          {/* ---- the programme: every act ---- */}
          <Reveal>
            <div className="mt-24 flex flex-wrap items-end justify-between gap-4 border-t border-cream/10 pt-10">
              <div>
                <p className="spec text-orange">Entertainment options</p>
                <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Build your line-up
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-cream/60">
                {acts.length} kinds of act, mixed and matched to your event.
                Ask about any of them and we&apos;ll reply on WhatsApp.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {acts.map((act, i) => {
              const featured = i < featuredCount;
              const n = String(i + 1).padStart(2, "0");
              return (
                <li
                  key={act.id}
                  className={featured ? "sm:col-span-2 lg:row-span-2" : undefined}
                >
                  <Reveal delay={(i % 4) * 70} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:bg-cream/[0.06]">
                      <div
                        className={`relative overflow-hidden ${
                          featured
                            ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[26rem] lg:flex-1"
                            : "aspect-[4/5]"
                        }`}
                      >
                        <Image
                          src={act.image.src}
                          alt={act.image.alt}
                          fill
                          sizes={
                            featured
                              ? "(max-width: 640px) 100vw, 50vw"
                              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          }
                          style={featured && act.focus ? { objectPosition: act.focus } : undefined}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                        <span className="spec absolute left-4 top-4 rounded-full bg-ink/65 px-2.5 py-1 text-[10px] text-cream backdrop-blur">
                          Act {n}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <h3
                            className={`font-display font-bold leading-tight tracking-tight text-cream ${
                              featured ? "text-3xl sm:text-4xl" : "text-xl"
                            }`}
                          >
                            {act.title}
                          </h3>
                          {featured && (
                            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/80">
                              {act.body}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* only the regular cards grow their body; on the featured
                          card the image takes the spare height of its two rows */}
                      <div
                        className={`flex flex-col px-5 pb-5 pt-4 sm:px-6 ${
                          featured ? "" : "flex-1"
                        }`}
                      >
                        {!featured && (
                          <p className="flex-1 text-sm leading-relaxed text-cream/65">{act.body}</p>
                        )}
                        <EnquireButton
                          payload={{ service: `${act.title} (live entertainment)` }}
                          ariaLabel={`Ask about ${act.title} on WhatsApp`}
                          className={`flex w-fit items-center gap-2 rounded-full font-display text-sm font-bold transition-colors ${
                            featured
                              ? "bg-orange-deep px-5 py-2.5 text-white hover:bg-cream hover:text-ink"
                              : "mt-4 text-green hover:text-orange"
                          }`}
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                          Ask about this act
                        </EnquireButton>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <Image
          src={closing.image.src}
          alt={closing.image.alt}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30 lg:via-ink/65 lg:to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
          <Reveal className="max-w-xl">
            <p className="spec text-orange">Got an event coming up?</p>
            <h2 className="font-display mt-3 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl">
              {closing.heading[0]}
              <span className="text-orange">{closing.heading[1]}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">{closing.body}</p>
            <p className="font-display mt-5 text-lg font-bold text-green">{closing.kicker}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <EnquireButton
                payload={{ service: service.name }}
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

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="spec text-center text-orange">Good to know</p>
          <h2 className="font-display mt-2 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Event branding &amp; entertainment, answered
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {service.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <details className="group rounded-2xl border border-ink/10 bg-cream transition-colors hover:border-orange/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ink/15 text-lg leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
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
    </>
  );
}
