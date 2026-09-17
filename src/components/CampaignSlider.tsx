"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEnquiry } from "@/components/EnquiryProvider";
import { WhatsAppIcon, ArrowIcon } from "@/components/icons";

interface Slide {
  label: string;
  slug: string;
  img: string;
}

const SLIDES: Slide[] = [
  { label: "T-Shirts", slug: "campaign-tshirts", img: "/campaign/campaign-tshirts.jpg" },
  { label: "Teardrop Banners", slug: "campaign-teardrop-banner", img: "/campaign/campaign-teardrop-banner.jpg" },
  { label: "Caps", slug: "campaign-caps", img: "/campaign/campaign-caps.jpg" },
  { label: "Reflectors", slug: "campaign-reflectors", img: "/campaign/campaign-reflectors.jpg" },
  { label: "Gazebos", slug: "campaign-gazebos", img: "/campaign/campaign-gazebos.jpg" },
  { label: "Mugs", slug: "campaign-mugs", img: "/campaign/campaign-mugs.jpg" },
];

const INTERVAL = 4500;

export default function CampaignSlider() {
  const { openEnquiry } = useEnquiry();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div
        className="relative overflow-hidden rounded-[1.75rem] bg-ink text-cream shadow-[0_30px_80px_rgba(28,26,22,0.14)] lg:rounded-[2.25rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* national flag accent stripe */}
        <div className="flex h-1.5 w-full" aria-hidden="true">
          <span className="flex-1 bg-ink" />
          <span className="flex-1 bg-[#bb0000]" />
          <span className="flex-1 bg-cream/90" />
          <span className="flex-1 bg-green" />
        </div>

        <div className="halftone pointer-events-none absolute -right-16 top-8 h-72 w-72 text-orange/20 [mask-image:radial-gradient(black,transparent_70%)]" />

        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-4 lg:p-12">
          {/* ---- copy ---- */}
          <div className="relative z-10">
            <p className="spec flex items-center gap-3 text-orange">
              <span className="inline-block h-2 w-2 rounded-full bg-orange" />
              Campaign season
            </p>
            <h2 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              We print for{" "}
              <span className="text-orange">every</span> side.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/70">
              From MCA to State House — t-shirts, caps, lessos, teardrop
              banners, reflectors and full regalia, branded in your party&apos;s
              colours. Any party, any candidate, any county.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/catalog?category=campaign"
                className="group flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 font-display font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-deep"
              >
                Browse campaign gear
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => openEnquiry({ note: "Campaign / political merchandise" })}
                className="flex items-center gap-2 rounded-full bg-wa/20 px-6 py-3.5 font-display font-bold text-wa transition-all hover:-translate-y-0.5 hover:bg-wa hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Get a quote
              </button>
            </div>

            {/* stat strip */}
            <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/12 pt-6">
              {[
                { v: "56+", k: "Campaign products" },
                { v: "All parties", k: "Non-partisan printing" },
                { v: "Countrywide", k: "Bulk delivery" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-xl font-extrabold text-cream">
                    {s.v}
                  </dt>
                  <dd className="spec mt-0.5 text-[9px] text-cream/50">{s.k}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- rotating image ---- */}
          <div
            className="relative"
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
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {SLIDES.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/product/${s.slug}`}
                  aria-hidden={i !== active}
                  tabIndex={i === active ? 0 : -1}
                  aria-label={`Campaign ${s.label}`}
                  className={`absolute inset-0 block overflow-hidden rounded-2xl border-4 border-cream bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-all duration-700 ${
                    i === active
                      ? "z-10 rotate-0 opacity-100"
                      : "pointer-events-none z-0 scale-95 opacity-0"
                  }`}
                >
                  <Image
                    src={s.img}
                    alt={`Campaign ${s.label} — branded for every party`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </Link>
              ))}
            </div>

            {/* controls */}
            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => go(active - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-orange hover:text-orange"
              >
                <ArrowIcon className="h-4 w-4 rotate-180" />
              </button>
              <div className="flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    aria-label={`Show ${s.label}`}
                    aria-current={i === active}
                    onClick={() => go(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-7 bg-orange" : "w-1.5 bg-cream/30 hover:bg-cream/60"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next"
                onClick={() => go(active + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-orange hover:text-orange"
              >
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
