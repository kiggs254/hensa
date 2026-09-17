import Reveal from "@/components/Reveal";
import { testimonials, initialsOf, type Testimonial } from "@/data/testimonials";
import { clientLogos } from "@/data/clients";
import { StarIcon, QuoteIcon } from "@/components/icons";

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      className={`flex gap-0.5 ${className}`}
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`h-3.5 w-3.5 ${i < n ? "" : "opacity-25"}`}
        />
      ))}
    </span>
  );
}

function Avatar({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 flex-none items-center justify-center rounded-full font-display text-sm font-bold ${
        dark ? "bg-cream/15 text-cream" : "bg-green/12 text-green-deep"
      }`}
      aria-hidden="true"
    >
      {initialsOf(t)}
    </span>
  );
}

export default function Testimonials() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t !== featured).slice(0, 4);

  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-paper-warm py-14 sm:py-20">
      <div className="halftone pointer-events-none absolute inset-x-0 top-0 h-24 text-ink/10" />
      <div className="halftone pointer-events-none absolute -left-20 bottom-0 h-72 w-72 text-green/15 [mask-image:radial-gradient(black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12 sm:gap-6">
            <div>
              <p className="spec text-orange">Kind words</p>
              <h2 className="font-display mt-2 max-w-2xl text-[32px] font-extrabold leading-[1.1] tracking-tight sm:text-5xl sm:leading-tight">
                Brands that came back{" "}
                <span className="text-green-deep">for more.</span>
              </h2>
            </div>
            <div className="flex w-full items-center gap-3.5 rounded-2xl border border-ink/10 bg-cream px-4 py-3 sm:w-auto sm:gap-4 sm:px-5 sm:py-3.5">
              <Stars n={5} className="flex-none text-orange" />
              <span className="text-sm font-bold">
                Trusted by {clientLogos.length}+ brands
                <span className="block text-xs font-normal text-ink-soft">
                  across Kenya, East Africa &amp; beyond
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* ---- featured quote ---- */}
          <Reveal className="lg:col-span-5">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6 text-cream sm:p-8 lg:p-9">
              <div className="halftone pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-orange/25" />
              <QuoteIcon className="relative h-8 w-8 text-orange sm:h-10 sm:w-10" />

              <blockquote className="relative mt-5 flex-1 sm:mt-6">
                <p className="font-display text-lg font-bold leading-snug tracking-tight sm:text-2xl lg:text-[26px] lg:leading-[1.3]">
                  &ldquo;{featured.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="relative mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-3 border-t border-cream/15 pt-5 sm:mt-8 sm:pt-6">
                <Avatar t={featured} dark />
                <span className="min-w-0 flex-1">
                  <span className="font-display block font-bold">
                    {featured.name}
                  </span>
                  <span className="block text-xs leading-relaxed text-cream/60">
                    {featured.role}
                  </span>
                </span>
                <Stars n={featured.rating} className="flex-none text-orange" />
              </figcaption>
            </figure>
          </Reveal>

          {/* ---- supporting quotes ---- */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {rest.map((t, i) => (
              <Reveal key={t.quote} delay={(i % 2) * 90}>
                <figure
                  className={`group flex h-full flex-col rounded-3xl border border-ink/10 bg-cream p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_22px_45px_rgba(28,26,22,0.13)] sm:p-6 ${
                    i % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"
                  } sm:hover:rotate-0`}
                >
                  <Stars n={t.rating} className="text-orange" />
                  <blockquote className="mt-3.5 flex-1 sm:mt-4">
                    <p className="text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-dashed border-ink/12 pt-4 sm:mt-5">
                    <Avatar t={t} />
                    <span className="min-w-0">
                      <span className="font-display block text-sm font-bold">
                        {t.name}
                      </span>
                      <span className="block text-xs leading-relaxed text-ink-soft">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
