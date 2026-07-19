import type { Metadata } from "next";
import Link from "next/link";
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

const PILLARS = [
  {
    t: "Research",
    d: "We evaluate your targets, needs and challenges before a single drop of ink is committed.",
  },
  {
    t: "Creativity",
    d: "An expert team focused on delivery — ideas that stand out and stand up.",
  },
  {
    t: "Production",
    d: "In-house presses and finishing that make your advertising genuinely effective.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="grain relative overflow-hidden border-b border-ink/10 bg-paper-warm">
        <div className="halftone halftone-fade pointer-events-none absolute -right-16 -top-16 h-80 w-80 text-green/25" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="spec text-orange">What we do</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Every service your brand needs,{" "}
            <span className="text-green-deep">under one roof.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            We offer a wide range of services including brand strategy, design,
            printing, advertising and digital marketing — helping you reach
            your target audience and achieve your business objectives through
            creativity and innovation.
          </p>
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 90} className="bg-cream">
              <div className="h-full p-7">
                <h2 className="font-display text-xl font-bold">
                  <span className="text-orange">/</span> {p.t}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* services list */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="space-y-5">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 2) * 70}>
              <Link
                href={`/services/${s.slug}`}
                className="cropmarks group grid gap-6 border border-ink/10 bg-cream p-7 transition-all duration-300 hover:border-orange/40 hover:shadow-[0_20px_45px_rgba(28,26,22,0.10)] md:grid-cols-12 md:items-start"
              >
                <p className="font-display text-5xl font-extrabold text-ink/10 transition-colors group-hover:text-orange/30 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="flex items-start gap-4 md:col-span-3">
                  <span
                    className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-colors duration-300 ${
                      s.accent === "orange"
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
                      {s.icon}
                    </svg>
                  </span>
                  <h2 className="font-display text-2xl font-bold transition-colors group-hover:text-orange">
                    {s.name}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="leading-relaxed text-ink-soft">{s.intro[0]}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.perfectFor.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="spec border border-ink/15 bg-paper px-2.5 py-1.5 text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="spec flex items-center gap-1.5 px-2.5 py-1.5 text-green-deep transition-colors group-hover:text-orange">
                      Explore {s.name}
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center gap-6 border-2 border-dashed border-green/40 bg-green/5 p-10 text-center">
            <h2 className="font-display max-w-xl text-3xl font-extrabold tracking-tight">
              Not sure which service fits? Just describe your project.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <EnquireButton className="flex items-center gap-2 rounded-full bg-green px-7 py-3.5 font-display font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-green-deep">
                <WhatsAppIcon className="h-5 w-5" />
                Ask on WhatsApp
              </EnquireButton>
              <Link
                href="/shop"
                className="group flex items-center gap-2 rounded-full border-2 border-ink px-7 py-3 font-display font-bold transition-colors hover:border-orange hover:text-orange"
              >
                See the products
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
