import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getCategories } from "@/lib/catalog";

export const revalidate = 300;
import EnquireButton from "@/components/EnquireButton";
import { WhatsAppIcon, ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Hensa | Nairobi's Leading Branding Agency",
  description:
    "Hensa Solutions is the leading branding agency based in Nairobi, Kenya. We build brands for businesses across East Africa and worldwide through printing, branding and advertising.",
  alternates: { canonical: "/about" },
};

const METHOD = [
  {
    n: "01",
    t: "Brief",
    d: "You tell us the quantity, the deadline and what the job is for. We tell you what it costs and what we would print it on.",
  },
  {
    n: "02",
    t: "Artwork",
    d: "Send your logo, or let our designers draw it. We set it up for the press and show you exactly where it sits.",
  },
  {
    n: "03",
    t: "Proof",
    d: "You see a proof before anything runs. Colours, spelling, placement. Nothing goes to press until you sign it off.",
  },
  {
    n: "04",
    t: "Press",
    d: "We print, stitch or engrave it, then check it, pack it and deliver it anywhere in Kenya.",
  },
];

export default async function AboutPage() {
  const categories = await getCategories();
  return (
    <>
      <section className="grain relative overflow-hidden border-b border-ink/10">
        <div className="halftone halftone-fade pointer-events-none absolute -left-16 -top-16 h-80 w-80 text-orange/25" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="spec text-green-deep">About Hensa</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            We put brands{" "}
            <span className="text-orange">on the map</span>. And on mugs,
            shirts, banners &amp; billboards.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            We are the leading branding agency based in Nairobi, Kenya. We
            specialise in creating and developing brands for businesses across
            East Africa and around the world. We are known for our expertise in
            printing, branding and advertising. Our team has a wealth of
            experience helping businesses establish and grow their brands.
          </p>

          {/* stats */}
          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden border border-ink/10 bg-ink/10">
            {[
              { v: "100%", l: "Custom branded" },
              { v: `${categories.length}`, l: "Product categories" },
              { v: "47", l: "Counties we deliver to" },
            ].map((s) => (
              <div key={s.l} className="bg-cream p-5 text-center">
                <p className="font-display text-3xl font-extrabold text-orange sm:text-4xl">
                  {s.v}
                </p>
                <p className="spec mt-1.5 text-ink-soft">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* who / how / uniqueness */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Who we are",
              d: "A full-service branding house. Strategists, designers, printers and finishers, all in the same building and answerable to each other.",
              accent: "text-orange",
            },
            {
              t: "How we do it",
              d: "Brand strategy, design, printing, advertising and digital marketing, used together to get your name in front of the people you are trying to reach.",
              accent: "text-green-deep",
            },
            {
              t: "Our uniqueness",
              d: "Everything in-house means faster turnarounds, tighter quality control and honest pricing. You talk to the people who actually make your products.",
              accent: "text-orange",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="cropmarks h-full border border-ink/10 bg-cream p-7">
                <h2 className={`font-display text-xl font-bold ${c.accent}`}>
                  {c.t}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* methodology */}
      <section className="border-y border-ink/10 bg-paper-warm py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="spec text-orange">How we work</p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Four passes, from brief to delivery.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="relative h-full border border-ink/10 bg-cream p-6">
                  <span className="spec absolute -top-3 left-5 bg-orange px-2 py-1 text-white">
                    PHASE {s.n}
                  </span>
                  <h3 className="font-display mt-3 text-xl font-bold">{s.t}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Ready to grow your brand with us?
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <EnquireButton className="flex items-center gap-2 rounded-full bg-green px-8 py-4 font-display font-bold text-white shadow-[0_8px_24px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-green-deep">
              <WhatsAppIcon className="h-5 w-5" />
              Talk to us on WhatsApp
            </EnquireButton>
            <Link
              href="/catalog"
              className="group flex items-center gap-2 rounded-full border-2 border-ink px-8 py-[14px] font-display font-bold transition-colors hover:border-orange hover:text-orange"
            >
              Browse products
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
