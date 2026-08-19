import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import EnquireButton from "@/components/EnquireButton";
import { services } from "@/data/services";
import { WhatsAppIcon, ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Our Services — Printing, Branding, Design & More",
  description:
    "Brand strategy, creative design, screen/digital/offset/sublimation/large-format printing, laser engraving, embroidery, marketing and web design — all under one roof in Nairobi.",
  alternates: { canonical: "/services" },
};

/** representative product photo per service (verified to exist in /public) */
const SERVICE_IMAGE: Record<string, string> = {
  "screen-printing": "/products/v-neck-t-shirts.jpg",
  "digital-printing": "/products/business-cards.jpg",
  "offset-printing": "/products/wall-calendars.jpg",
  "sublimation-printing": "/products/thermal-mug.jpg",
  "large-format-printing": "/products/pop-up-banner.jpg",
  "laser-engraving-debossing": "/products/executive-gift-sets-008.jpg",
  embroidery: "/products/buckle-caps.jpg",
  "web-creative-design": "/products/brochures.jpg",
};

const HERO_COLLAGE = [
  { img: "/products/v-neck-t-shirts.jpg", tilt: "-6deg", cls: "left-0 top-2 z-10 w-52" },
  { img: "/products/pop-up-banner.jpg", tilt: "5deg", cls: "right-0 top-16 z-20 w-48" },
  { img: "/products/executive-gift-sets-008.jpg", tilt: "3deg", cls: "bottom-0 left-20 z-30 w-44" },
];

const PRESSES = [
  "Screen",
  "Digital",
  "Offset",
  "Sublimation",
  "Large-format",
  "Laser",
  "Embroidery",
];

const PILLARS = [
  {
    n: "01",
    t: "Research",
    d: "We evaluate your targets, needs and challenges before a single drop of ink is committed.",
  },
  {
    n: "02",
    t: "Creativity",
    d: "An expert team focused on delivery — ideas that stand out and stand up.",
  },
  {
    n: "03",
    t: "Production",
    d: "In-house presses and finishing that make your advertising genuinely effective.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="grain relative overflow-hidden border-b border-ink/10 bg-paper-warm">
        <div className="halftone halftone-fade pointer-events-none absolute -right-16 -top-16 h-80 w-80 rotate-12 text-green/25" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            <p className="spec flex items-center gap-3 text-orange">
              <span className="inline-block h-2 w-2 rounded-full bg-orange" />
              What we do
            </p>
            <h1 className="font-display mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Every service your brand needs,{" "}
              <span className="text-green-deep">under one roof.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Brand strategy, design, printing, advertising and digital
              marketing — from a single mug to a countrywide campaign, our
              in-house presses handle it end to end.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <EnquireButton className="flex items-center gap-2.5 rounded-full bg-green px-7 py-3.5 font-display font-bold text-white shadow-[0_10px_28px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-green-deep">
                <WhatsAppIcon className="h-5 w-5" />
                Start a project
              </EnquireButton>
              <Link
                href="/shop"
                className="group flex items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3 font-display font-bold transition-colors hover:border-orange hover:text-orange"
              >
                See the products
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-6">
              <span className="spec text-ink-soft">Presses we run:</span>
              {PRESSES.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-ink/15 bg-cream px-3 py-1 text-xs font-semibold text-ink-soft"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* product collage */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto h-[420px] max-w-sm">
              {HERO_COLLAGE.map((c, i) => (
                <div
                  key={i}
                  className={`animate-float absolute overflow-hidden rounded-2xl border-[5px] border-cream bg-white shadow-[0_24px_60px_rgba(28,26,22,0.20)] ${c.cls}`}
                  style={{ ["--tilt" as string]: c.tilt, animationDelay: `${i * 1.1}s` }}
                >
                  <Image
                    src={c.img}
                    alt=""
                    width={400}
                    height={400}
                    className="aspect-square w-full object-cover"
                    priority
                  />
                </div>
              ))}
              <svg
                viewBox="0 0 40 40"
                className="absolute -bottom-2 right-2 h-10 w-10 text-ink/25"
                aria-hidden="true"
              >
                <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="spec text-orange">The full toolkit</p>
              <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {services.length} services, one team
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Tap any service for the full story — process, applications and
              the products we brand with it.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const img = SERVICE_IMAGE[s.slug];
            const accentBadge =
              s.accent === "orange"
                ? "bg-orange text-white"
                : "bg-green text-white";
            return (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_26px_50px_rgba(28,26,22,0.15)]"
                >
                  {/* image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-white">
                    {img && (
                      <Image
                        src={img}
                        alt={s.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="spec absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[9px] text-cream backdrop-blur">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`absolute -bottom-5 right-4 flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg ${accentBadge}`}
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
                        {s.icon}
                      </svg>
                    </span>
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-6 pt-7">
                    <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-orange">
                      {s.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">
                      {s.short}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.perfectFor.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-ink/12 bg-paper px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 flex items-center gap-1.5 text-sm font-bold text-green-deep transition-colors group-hover:text-orange">
                      Explore {s.name}
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="border-y border-ink/10 bg-paper-warm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className="spec text-orange">How we work</p>
            <h2 className="font-display mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Research, creativity, production — in that order.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={i * 90}>
                <div className="cropmarks group h-full border border-ink/10 bg-cream p-7 transition-colors hover:border-orange/40">
                  <p className="font-display text-5xl font-extrabold text-ink/10 transition-colors group-hover:text-orange/30">
                    {p.n}
                  </p>
                  <h3 className="font-display mt-3 text-xl font-bold">
                    <span className="text-orange">/</span> {p.t}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-cream sm:px-10">
            <div className="halftone pointer-events-none absolute -left-10 top-0 h-full w-64 text-green/20" />
            <div className="halftone pointer-events-none absolute -right-10 top-0 h-full w-64 text-orange/20" />
            <div className="relative mx-auto max-w-xl">
              <p className="spec text-orange">Got a project in mind?</p>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Not sure which service fits? Just describe it.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-cream/70">
                Tell us what you need on WhatsApp — quantities, colours,
                deadlines — and our team replies with the right approach and a
                quote.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <EnquireButton className="flex items-center gap-2.5 rounded-full bg-green px-8 py-4 font-display font-bold text-white shadow-[0_10px_30px_rgba(51,160,44,0.4)] transition-all hover:-translate-y-0.5 hover:bg-green-deep">
                  <WhatsAppIcon className="h-5 w-5" />
                  Ask on WhatsApp
                </EnquireButton>
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 font-display font-bold transition-colors hover:border-orange hover:text-orange"
                >
                  See the products
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
