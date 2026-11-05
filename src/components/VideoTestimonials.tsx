"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { YouTubeIcon, ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/site";
import { videoTestimonials, YOUTUBE_CHANNEL, type VideoTestimonial } from "@/data/videoTestimonials";

const thumb = (v: VideoTestimonial, size: "sd" | "mq" = "sd") =>
  // Shorts: oar2 is the full 9:16 frame. Landscape: sd/mq are 4:3 with
  // letterbox bars, which object-cover crops off at 16:9.
  `https://i.ytimg.com/vi/${v.id}/${v.vertical ? "oar2" : size === "sd" ? "sddefault" : "mqdefault"}.jpg`;

const clock = (s?: number) => (s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : null);

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.13-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

/**
 * Click-to-play YouTube player: shows the thumbnail and only loads YouTube's
 * (heavy) player when the visitor presses play. Uses youtube-nocookie.com.
 * `startPlaying` is set when a playlist pick swaps the video in, so the second
 * click isn't needed.
 */
function Player({ v, startPlaying = false, compact = false }: { v: VideoTestimonial; startPlaying?: boolean; compact?: boolean }) {
  const [playing, setPlaying] = useState(startPlaying);
  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={v.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }
  const time = clock(v.seconds);
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full cursor-pointer"
      aria-label={`Play video: ${v.title}`}
    >
      <img
        src={thumb(v)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
      <span
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 ${
          compact ? "h-12 w-12" : "h-16 w-16 sm:h-20 sm:w-20"
        }`}
      >
        {/* Soft pulse ring on the big player only. */}
        {!compact && <span className="absolute inset-0 animate-ping rounded-full bg-orange/40 [animation-duration:2.4s] motion-reduce:hidden" />}
        <PlayGlyph className={`relative ml-1 ${compact ? "h-5 w-5" : "h-7 w-7 sm:h-8 sm:w-8"}`} />
      </span>
      {time && (
        <span className={`absolute rounded-md bg-ink/75 font-semibold tabular-nums text-cream backdrop-blur-sm ${compact ? "right-2.5 top-2.5 px-1.5 py-0.5 text-[10px]" : "right-4 top-4 px-2 py-1 text-xs"}`}>
          {time}
        </span>
      )}
      <span className={`absolute inset-x-0 bottom-0 text-left text-cream ${compact ? "p-3.5" : "p-5 sm:p-7"}`}>
        <span className={`font-display block font-bold leading-snug ${compact ? "text-sm" : "text-lg sm:text-2xl"}`}>{v.title}</span>
        {v.caption && <span className={`mt-1 block text-cream/70 ${compact ? "text-[11px]" : "text-xs sm:text-sm"}`}>{v.caption}</span>}
      </span>
    </button>
  );
}

export default function VideoTestimonials() {
  const landscape = videoTestimonials.filter((v) => !v.vertical);
  const shorts = videoTestimonials.filter((v) => v.vertical);
  const [activeId, setActiveId] = useState(landscape[0]?.id ?? videoTestimonials[0]?.id);
  // Becomes true once the visitor picks from the playlist, so the swapped-in
  // video starts straight away. The first one still waits for a click.
  const [picked, setPicked] = useState(false);
  if (videoTestimonials.length === 0) return null;
  const active = videoTestimonials.find((v) => v.id === activeId) ?? videoTestimonials[0];

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-cream sm:py-24" aria-labelledby="video-testimonials">
      <div className="halftone pointer-events-none absolute -right-16 top-0 h-80 w-80 text-orange/20 [mask-image:radial-gradient(black,transparent_70%)]" />
      <div className="halftone pointer-events-none absolute -left-24 bottom-10 h-72 w-72 text-green/15 [mask-image:radial-gradient(black,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-orange/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading row */}
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="spec text-orange">Video testimonials</p>
            <h2
              id="video-testimonials"
              className="font-display mt-2 text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Hear it from <span className="text-orange">our clients.</span>
            </h2>
          </div>
          <div className="max-w-sm md:text-right">
            <p className="text-[15px] leading-relaxed text-cream/70">
              Real clients, unscripted, on the branding, printing and gifts we have delivered for them.
            </p>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm font-bold transition-colors hover:border-orange hover:text-orange"
            >
              <YouTubeIcon className="h-5 w-5" /> More on our YouTube <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* Player + playlist */}
        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-8" delay={90}>
            <div className="relative rounded-[28px] bg-gradient-to-br from-orange/60 via-cream/10 to-green/40 p-px shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <div className={`relative overflow-hidden rounded-[27px] bg-ink-soft ${active.vertical ? "mx-auto aspect-[9/16] max-w-xs" : "aspect-video"}`}>
                <Player key={active.id} v={active} startPlaying={picked} />
              </div>
            </div>
          </Reveal>

          {landscape.length > 1 && (
            <Reveal className="lg:col-span-4" delay={180}>
              <div className="flex h-full flex-col rounded-[28px] bg-cream/[0.04] p-3 ring-1 ring-cream/10 sm:p-4">
                <p className="spec flex items-center justify-between px-2 pb-3 pt-1 text-cream/50">
                  <span>Playlist</span>
                  <span className="tabular-nums">{landscape.length} videos</span>
                </p>
                <ol className="flex flex-1 flex-col gap-2">
                  {landscape.map((v, i) => {
                    const on = v.id === active.id;
                    return (
                      <li key={v.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveId(v.id);
                            setPicked(true);
                          }}
                          aria-current={on ? "true" : undefined}
                          className={`group relative flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors ${
                            on ? "bg-cream/10 ring-1 ring-orange/60" : "hover:bg-cream/[0.06]"
                          }`}
                        >
                          <span className={`font-display w-6 shrink-0 text-center text-sm font-bold tabular-nums ${on ? "text-orange" : "text-cream/35"}`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-ink-soft sm:w-32">
                            <img src={thumb(v, "mq")} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <span className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 transition-opacity group-hover:opacity-100">
                              <PlayGlyph className="h-6 w-6 text-cream" />
                            </span>
                            {on && (
                              <span className="absolute bottom-1.5 left-1.5 flex items-end gap-0.5" aria-hidden="true">
                                {[0, 1, 2].map((b) => (
                                  <span key={b} className="w-[3px] animate-pulse rounded-full bg-orange" style={{ height: 6 + b * 3, animationDelay: `${b * 150}ms` }} />
                                ))}
                              </span>
                            )}
                            {clock(v.seconds) && (
                              <span className="absolute bottom-1 right-1 rounded bg-ink/80 px-1 text-[10px] font-semibold tabular-nums text-cream">{clock(v.seconds)}</span>
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className={`font-display line-clamp-2 block text-sm font-bold leading-snug ${on ? "text-cream" : "text-cream/85"}`}>{v.title}</span>
                            {v.caption && <span className="mt-0.5 line-clamp-1 block text-xs text-cream/55">{v.caption}</span>}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
                <a
                  href={waLink("Hi Hensa, I watched your client videos and would like a quote.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-orange px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-deep"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/75">Your brand next?</span>
                    Get a quote on WhatsApp
                  </span>
                  <WhatsAppIcon className="h-6 w-6 shrink-0" />
                </a>
              </div>
            </Reveal>
          )}
        </div>

        {/* Shorts */}
        {shorts.length > 0 && (
          <div className="mt-14 grid items-center gap-6 border-t border-cream/10 pt-12 sm:mt-16 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <p className="spec text-orange">Client visits</p>
              <h3 className="font-display mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                We show up for our clients, <span className="text-orange">in person.</span>
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-cream/65">
                Short clips from our Customer Service Week visits to the teams we brand and print for.
              </p>
            </Reveal>
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:gap-5 lg:col-span-8 lg:justify-end [&::-webkit-scrollbar]:hidden">
              {shorts.map((v, i) => (
                <Reveal key={v.id} delay={(i % 4) * 90} className="w-[62%] shrink-0 snap-start sm:w-56 lg:w-60">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-ink-soft shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-1 ring-cream/10 transition-transform duration-300 hover:-translate-y-1">
                    <Player v={v} compact />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
