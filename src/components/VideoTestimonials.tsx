"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { YouTubeIcon, ArrowIcon } from "@/components/icons";
import { videoTestimonials, YOUTUBE_CHANNEL, type VideoTestimonial } from "@/data/videoTestimonials";

/**
 * Click-to-play YouTube player: shows the thumbnail and only loads YouTube's
 * (heavy) player when the visitor presses play. Uses youtube-nocookie.com.
 */
function Player({ v, autoplay }: { v: VideoTestimonial; autoplay: boolean }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`}
        title={v.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full cursor-pointer"
      aria-label={`Play video: ${v.title}`}
    >
      {/* sddefault is 4:3 with letterbox bars; object-cover crops them off at 16:9 */}
      <img
        src={`https://i.ytimg.com/vi/${v.id}/sddefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true">
          <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.13-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
        </svg>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 text-left text-cream sm:p-6">
        <span className="font-display block text-base font-bold leading-snug sm:text-xl">{v.title}</span>
        {v.caption && <span className="mt-1 block text-xs text-cream/70 sm:text-sm">{v.caption}</span>}
      </span>
    </button>
  );
}

export default function VideoTestimonials() {
  if (videoTestimonials.length === 0) return null;
  const [featured, ...rest] = videoTestimonials;

  return (
    <section className="relative overflow-hidden bg-ink py-14 text-cream sm:py-20" aria-labelledby="video-testimonials">
      <div className="halftone pointer-events-none absolute -right-16 top-0 h-72 w-72 text-orange/20 [mask-image:radial-gradient(black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="spec text-orange">Video testimonials</p>
            <h2
              id="video-testimonials"
              className="font-display mt-2 text-[32px] font-extrabold leading-[1.1] tracking-tight sm:text-5xl sm:leading-tight"
            >
              Hear it from <span className="text-orange">our clients.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/70">
              Real clients on the branding, printing and gifts we have delivered for them.
            </p>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-sm font-bold transition-colors hover:border-orange hover:text-orange"
            >
              <YouTubeIcon className="h-5 w-5" /> More on our YouTube <ArrowIcon className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={90}>
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink-soft shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-cream/10">
              <Player v={featured} autoplay />
            </div>
          </Reveal>
        </div>

        {rest.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 90}>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-cream/10">
                  <Player v={v} autoplay />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
