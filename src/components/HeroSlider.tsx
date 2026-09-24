"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEnquiry } from "@/components/EnquiryProvider";
import { WhatsAppIcon, ArrowIcon } from "@/components/icons";

export interface HeroSlide {
  kicker: string;
  /** [before, accented word, after] */
  title: [string, string, string];
  copy: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
  /** Optional tag card pinned to the image's top-right corner. */
  sticker?: { big: string; small: string };
  theme: "cream" | "green" | "dark" | "orange";
}

const THEMES = {
  cream: {
    bg: "bg-cream",
    kicker: "text-orange",
    title: "text-ink",
    accent: "text-orange",
    copy: "text-ink-soft",
    blob: "bg-orange/10",
    halftone: "text-orange/30",
    cta: "bg-ink text-cream hover:bg-orange",
    frame: "border-white",
  },
  green: {
    bg: "bg-[#e9f3e5]",
    kicker: "text-green-deep",
    title: "text-ink",
    accent: "text-green-deep",
    copy: "text-ink-soft",
    blob: "bg-green/15",
    halftone: "text-green/40",
    cta: "bg-green-deep text-white hover:bg-ink",
    frame: "border-white",
  },
  dark: {
    bg: "bg-ink",
    kicker: "text-green",
    title: "text-cream",
    accent: "text-orange",
    copy: "text-cream/70",
    blob: "bg-cream/10",
    halftone: "text-orange/40",
    cta: "bg-orange text-white hover:bg-cream hover:text-ink",
    frame: "border-cream/20",
  },
  orange: {
    bg: "bg-[#fcece1]",
    kicker: "text-orange-deep",
    title: "text-ink",
    accent: "text-orange",
    copy: "text-ink-soft",
    blob: "bg-orange/15",
    halftone: "text-orange/40",
    cta: "bg-ink text-cream hover:bg-orange",
    frame: "border-white",
  },
} as const;

const INTERVAL = 6500;

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const { openEnquiry } = useEnquiry();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, count, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:pt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-[0_30px_80px_rgba(28,26,22,0.10)] lg:rounded-[2.25rem]"
        onPointerDown={(e) => {
          touch.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          if (!touch.current) return;
          const dx = e.clientX - touch.current.x;
          const dy = e.clientY - touch.current.y;
          touch.current = null;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
            go(active + (dx < 0 ? 1 : -1));
        }}
      >
        {slides.map((s, i) => {
          const t = THEMES[s.theme];
          const on = i === active;
          return (
            <article
              key={i}
              aria-hidden={!on}
              className={`${i === 0 ? "relative" : "absolute inset-0"} ${t.bg} grain transition-opacity duration-700 ease-out ${
                on ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
            >
              <div className="grid min-h-[560px] sm:min-h-[520px] lg:min-h-[540px] lg:grid-cols-2 lg:items-center">
                {/* ---- copy ---- */}
                <div className="relative z-10 px-7 pb-2 pt-10 sm:px-10 lg:py-16 lg:pl-14 lg:pr-4">
                  <p
                    className={`spec flex items-center gap-3 ${t.kicker} transition-all duration-700 delay-100 ${on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-current" />
                    {s.kicker}
                  </p>
                  <h2
                    className={`font-display mt-4 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl ${t.title} transition-all duration-700 delay-150 ${on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
                  >
                    {s.title[0]}
                    <span className={t.accent}>{s.title[1]}</span>
                    {s.title[2]}
                  </h2>
                  <p
                    className={`mt-5 max-w-md text-base leading-relaxed sm:text-lg ${t.copy} transition-all duration-700 delay-200 ${on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
                  >
                    {s.copy}
                  </p>
                  <div
                    className={`mt-8 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-300 ${on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
                  >
                    <Link
                      href={s.cta.href}
                      tabIndex={on ? 0 : -1}
                      className={`group flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-bold transition-all hover:-translate-y-0.5 ${t.cta}`}
                    >
                      {s.cta.label}
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => openEnquiry()}
                      tabIndex={on ? 0 : -1}
                      className={`flex items-center gap-2 rounded-full px-6 py-3.5 font-display font-bold transition-all hover:-translate-y-0.5 hover:bg-wa hover:text-white ${
                        s.theme === "dark"
                          ? "bg-wa/20 text-wa"
                          : "bg-wa/15 text-green-deep"
                      }`}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      WhatsApp us
                    </button>
                  </div>
                  <p
                    className={`spec mt-8 hidden text-[10px] sm:block ${s.theme === "dark" ? "text-cream/50" : "text-ink-soft/80"} transition-all duration-700 delay-300 ${on ? "opacity-100" : "opacity-0"}`}
                  >
                    M-Pesa accepted · Countrywide delivery · Bulk discounts
                  </p>
                </div>

                {/* ---- product stage ---- */}
                <div className="relative flex items-center justify-center px-8 pb-14 pt-6 lg:py-12">
                  <div
                    className={`absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-96 sm:w-96 lg:h-[26rem] lg:w-[26rem] ${t.blob}`}
                  />
                  <div
                    className={`halftone pointer-events-none absolute right-4 top-6 h-40 w-40 rounded-full lg:right-10 ${t.halftone} [mask-image:radial-gradient(black,transparent_70%)]`}
                  />
                  <div
                    className={`relative transition-all duration-700 delay-200 ${on ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"}`}
                  >
                    <Link
                      href={s.cta.href}
                      tabIndex={-1}
                      aria-hidden="true"
                      className={`block w-60 rotate-[-3deg] overflow-hidden rounded-3xl border-[6px] bg-white shadow-[0_30px_60px_rgba(28,26,22,0.28)] transition-transform duration-500 hover:rotate-0 sm:w-72 lg:w-80 ${t.frame}`}
                    >
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        width={600}
                        height={600}
                        priority={i === 0}
                        className="aspect-square w-full object-cover"
                      />
                    </Link>
                    {/* price sticker */}
                    {s.sticker && (
                      <div className="absolute -right-4 -top-5 rotate-6 rounded-2xl border border-ink/10 bg-cream px-4 py-2.5 shadow-[0_12px_30px_rgba(28,26,22,0.2)] sm:-right-8">
                        <p className="font-mono text-base font-bold leading-none text-orange sm:text-lg">
                          {s.sticker.big}
                        </p>
                        <p className="spec mt-1 text-[9px] text-ink-soft">
                          {s.sticker.small}
                        </p>
                      </div>
                    )}
                    {/* registration cross */}
                    <svg
                      viewBox="0 0 40 40"
                      className={`absolute -bottom-8 -left-6 h-9 w-9 ${s.theme === "dark" ? "text-cream/30" : "text-ink/25"}`}
                      aria-hidden="true"
                    >
                      <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M20 2v36M2 20h36" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* ---- arrows ---- */}
        <div className="absolute bottom-5 right-5 z-20 flex gap-2 lg:bottom-7 lg:right-7">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(active - 1)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-all hover:scale-105 ${
              slides[active].theme === "dark"
                ? "border-cream/25 bg-ink/40 text-cream hover:bg-cream hover:text-ink"
                : "border-ink/15 bg-cream/70 text-ink hover:bg-ink hover:text-cream"
            }`}
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(active + 1)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-all hover:scale-105 ${
              slides[active].theme === "dark"
                ? "border-cream/25 bg-ink/40 text-cream hover:bg-cream hover:text-ink"
                : "border-ink/15 bg-cream/70 text-ink hover:bg-ink hover:text-cream"
            }`}
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>

        {/* ---- dots / progress ---- */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2.5 lg:bottom-9 lg:left-14">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => go(i)}
              className={`h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                i === active
                  ? "w-9 " + (slides[active].theme === "dark" ? "bg-cream/25" : "bg-ink/15")
                  : "w-4 " + (slides[active].theme === "dark" ? "bg-cream/25 hover:bg-cream/40" : "bg-ink/15 hover:bg-ink/30")
              }`}
            >
              {i === active && (
                <span
                  key={active}
                  className={`animate-hero-progress block h-full rounded-full bg-orange ${paused ? "[animation-play-state:paused]" : ""}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
