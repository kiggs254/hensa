import Link from "next/link";
import Image from "next/image";
import { categories, products } from "@/lib/catalog";
import { clientLogos } from "@/data/clients";
import { services } from "@/data/services";
import { site } from "@/lib/site";
import EnquireButton from "@/components/EnquireButton";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import Testimonials from "@/components/Testimonials";
import { WhatsAppIcon, ArrowIcon } from "@/components/icons";

const FEATURED_SLUGS = [
  "hoodies",
  "executive-gift-sets-008",
  "pop-up-banner",
  "buckle-caps",
  "executive-notebooks-005",
  "thermal-mug",
  "chef-jackets-and-beanies",
  "double-wall-water-bottles",
];

/* sub-categories shown in the hover popover of each category circle */
const SUBCATS: Record<string, string[]> = {
  banners: ["Pop Up Banners", "X-Banners", "Teardrop", "Backdrop", "Telescopic", "Gazebos"],
  "corporate-apparel": ["Gents Shirts", "Ladies Shirts", "Chef Jackets", "Beanies"],
  "corporate-gifts": ["Gift Sets", "Awards", "Flash Drives", "Card Holders", "Desk Organisers"],
  "corporate-stationery": ["Notebooks", "Pens", "Business Cards", "Calendars", "Diaries", "Letterheads"],
  "individual-gifts": ["Photo Books", "Frames", "Throw Pillows", "Cards", "Wallets"],
  "promotional-items": ["T-Shirts", "Hoodies", "Caps", "Mugs", "Water Bottles", "Bags"],
  signages: ["3D Signage", "2D Signage", "Glass Signage", "Directional"],
  "printing-accessories": ["Screen Meshes"],
};

const TRUST = [
  {
    title: "Countrywide Delivery",
    body: "We deliver across Kenya — Nairobi to the counties, right to your door.",
    color: "text-orange",
  },
  {
    title: "M-Pesa Accepted",
    body: "Comfortable payments the Kenyan way. Lipa na M-Pesa, sorted.",
    color: "text-green-deep",
  },
  {
    title: "Only Best Brands",
    body: "Quality materials and finishes that hold your logo with pride.",
    color: "text-orange",
  },
  {
    title: "Free Gifts & Discounts",
    body: "Loyal clients enjoy free gifts and discounts on bulk orders.",
    color: "text-green-deep",
  },
];

export default function Home() {
  const featured = FEATURED_SLUGS.map((s) =>
    products.find((p) => p.slug === s)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const img = (slug: string, fallback: string) =>
    products.find((p) => p.slug === slug)?.localImage ?? fallback;

  const slides: HeroSlide[] = [
    {
      kicker: "Nairobi's branding workshop",
      title: ["Everything your ", "logo", " belongs on."],
      copy: `${products.length} branded products — from a single mug to a fleet of billboards — printed with utmost expertise and delivered countrywide.`,
      cta: { label: "Shop the catalogue", href: "/shop" },
      image: {
        src: img("executive-gift-sets-008", "/products/hoodies.jpg"),
        alt: "Executive branded gift set",
      },
      sticker: { big: `${products.length}+`, small: "products to brand" },
      theme: "cream",
    },
    {
      kicker: "Promotional apparel",
      title: ["Merch your team will ", "actually", " wear."],
      copy: "Hoodies, polos, tees, caps and reflectors — screen-printed or embroidered with your brand, in sizes S to XXXL.",
      cta: { label: "Shop apparel", href: "/shop?category=promotional-items" },
      image: { src: img("hoodies", "/products/hoodies.jpg"), alt: "Custom printed hoodie" },
      sticker: { big: "S – XXXL", small: "all sizes available" },
      theme: "green",
    },
    {
      kicker: "Banners & signage",
      title: ["Be ", "impossible", " to miss."],
      copy: "Pop-up banners, backdrops, teardrops and 3D signage that pull eyes at every event, expo and storefront.",
      cta: { label: "Shop banners", href: "/shop?category=banners" },
      image: {
        src: img("pop-up-banner", "/categories/banners.jpg"),
        alt: "Branded pop-up banner",
      },
      sticker: { big: "2D & 3D", small: "banners · signage" },
      theme: "dark",
    },
    {
      kicker: "Corporate gifts & stationery",
      title: ["Gifts that ", "mean", " business."],
      copy: "Executive gift sets, notebooks, pens and awards — thoughtful, branded and boardroom-ready for clients and staff.",
      cta: { label: "Shop gifts", href: "/shop?category=corporate-gifts" },
      image: {
        src: img("executive-notebooks-005", "/categories/corporate-gifts.jpg"),
        alt: "Executive branded notebooks",
      },
      sticker: { big: "100%", small: "custom branded" },
      theme: "orange",
    },
  ];

  return (
    <>
      {/* ============ HERO SLIDER ============ */}
      <h1 className="sr-only">
        Hensa Solutions — printing, branding, corporate & promotional gifts in
        Nairobi, Kenya
      </h1>
      <HeroSlider slides={slides} />

      {/* ============ CATEGORY QUICK-NAV (auto-scrolling) ============ */}
      <nav
        aria-label="Shop by category"
        className="marquee-pause relative z-30 mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 lg:pt-10"
      >
        {/* The edge fade is painted by the two gradient overlays at the bottom
            of this nav, NOT by a mask on this element. A mask applies to every
            DESCENDANT, so the hover popover of whichever category was passing
            under the fade got faded along with it — which is the bug this
            replaces. overflow-x-clip stays: the marquee is far wider than the
            page and would otherwise create a horizontal scrollbar. */}
        <div className="pointer-events-none -mb-72 overflow-x-clip pb-72 pt-2">
          <div className="pointer-events-auto animate-marquee-cats flex w-max gap-8 pr-8">
            {[...categories, ...categories].map((c, i) => (
              <div key={`${c.slug}-${i}`} className="group relative w-24 flex-none">
                <Link
                  href={`/shop?category=${c.slug}`}
                  tabIndex={i < categories.length ? 0 : -1}
                  aria-hidden={i >= categories.length}
                  className="flex flex-col items-center gap-2.5 text-center"
                >
                  <span className="relative block h-20 w-20 overflow-hidden rounded-full border border-ink/10 ring-2 ring-transparent ring-offset-2 ring-offset-paper transition-all duration-300 group-hover:ring-orange sm:h-[5.5rem] sm:w-[5.5rem]">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-ink transition-colors group-hover:text-orange">
                    {c.name}
                  </span>
                </Link>

                {/* sub-categories popover (desktop) */}
                <div className="invisible absolute left-1/2 top-full z-40 hidden w-56 -translate-x-1/2 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 lg:block">
                  <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-2 shadow-[0_24px_50px_rgba(28,26,22,0.18)]">
                    {(SUBCATS[c.slug] ?? []).map((s) => (
                      <Link
                        key={s}
                        href={`/shop?q=${encodeURIComponent(s)}`}
                        tabIndex={-1}
                        className="block rounded-lg px-3 py-1.5 text-left text-xs font-semibold text-ink-soft transition-colors hover:bg-orange/10 hover:text-orange"
                      >
                        {s}
                      </Link>
                    ))}
                    <Link
                      href={`/shop?category=${c.slug}`}
                      tabIndex={-1}
                      className="spec mt-1 block border-t border-dashed border-ink/15 px-3 pb-1 pt-2 text-left text-[9px] text-green-deep transition-colors hover:text-orange"
                    >
                      All {c.count} products →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edge fades — siblings of the strip, so they can never tint the
            popovers. z-20 sits above the marquee but below the popover's z-40,
            so a popover opened at the edge stays fully readable. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-paper via-paper/80 to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-paper via-paper/80 to-transparent sm:w-24"
        />
      </nav>

      {/* ============ TRUST BAR ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} className="bg-cream">
              <div className="h-full p-6">
                <p className={`spec ${t.color}`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display mt-2 text-lg font-bold">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ PROMO BANNERS ============ */}
      <section
        aria-label="Featured collections"
        className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6"
      >
        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {[
            {
              href: "/shop?category=corporate-apparel",
              img: "/promos/corporate-apparel.jpg",
              alt: "Corporate apparel — branded caps and kitchen aprons. Shop now.",
            },
            {
              href: "/shop?category=promotional-items",
              img: "/promos/promotional-items.jpg",
              alt: "Promotional items — branded mugs, t-shirts and tote bags. Shop now.",
            },
            {
              href: "/shop?category=banners",
              img: "/promos/banners.jpg",
              alt: "Banners — X-banners and hanging banners for your brand. Shop now.",
            },
          ].map((p, i) => (
            <Reveal
              key={p.href}
              delay={(i % 3) * 100}
              className="w-[84%] flex-none snap-center sm:w-[64%] md:w-[46%] lg:w-auto"
            >
              <Link
                href={p.href}
                className="group relative block overflow-hidden rounded-2xl border border-ink/10 shadow-[0_10px_30px_rgba(28,26,22,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_rgba(28,26,22,0.18)]"
              >
                <Image
                  src={p.img}
                  alt={p.alt}
                  width={800}
                  height={500}
                  sizes="(max-width: 1024px) 84vw, 33vw"
                  className="w-full transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ WHAT WE OFFER ============ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="spec text-orange">What we offer</p>
              <h2 className="font-display mt-2 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">
                One workshop, every way to{" "}
                <span className="text-green-deep">brand.</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="group flex items-center gap-2 font-display font-bold text-green-deep transition-colors hover:text-orange"
            >
              Explore our services
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* the shop — featured tile */}
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <Link
              href="/shop"
              className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border border-ink/10 bg-ink lg:min-h-[29rem]"
            >
              <Image
                src="/categories/promotional-items.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5" />
              <div className="relative p-7 lg:p-9">
                <p className="spec text-orange">The shop</p>
                <h3 className="font-display mt-2 text-3xl font-extrabold text-cream lg:text-4xl">
                  {products.length} products, ready for your logo
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">
                  Banners, apparel, gifts, stationery, promo items and signage —
                  every single one branded to order and delivered countrywide.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-display text-sm font-bold text-ink transition-colors group-hover:bg-orange group-hover:text-white">
                  Browse the catalogue
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* services */}
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 70}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_22px_45px_rgba(28,26,22,0.14)]"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
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
                <h3 className="font-display mt-4 text-[17px] font-bold leading-snug">
                  {s.name}
                </h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">
                  {s.short}
                </p>
                <span className="mt-3 flex items-center gap-1.5 text-xs font-bold text-green-deep transition-colors group-hover:text-orange">
                  Learn more
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="relative mt-10 overflow-hidden bg-paper-warm py-20">
        <div className="halftone pointer-events-none absolute inset-x-0 top-0 h-24 text-ink/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="spec text-green-deep">Fresh off the press</p>
                <h2 className="font-display mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Popular picks
                </h2>
              </div>
              <Link
                href="/shop"
                className="group flex items-center gap-2 font-display font-bold text-green-deep transition-colors hover:text-orange"
              >
                View everything
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="spec text-orange">Our methodology</p>
          <h2 className="font-display mt-2 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            From idea to ink, in four passes
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              t: "Discovery",
              d: "We take time to holistically understand your strategies, goals, challenges and opportunities to facilitate impactful results.",
            },
            {
              n: "02",
              t: "Concept",
              d: "Strategy mapping, user-experience design and technology integration — harmonised with your business processes.",
            },
            {
              n: "03",
              t: "Integration",
              d: "Ideas become tangible, functional solutions — pressed, stitched, engraved and quality-checked before anything ships.",
            },
            {
              n: "04",
              t: "Launch",
              d: "We actualise the solution with the right expertise and a well-conceptualised strategy, then deliver countrywide.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="cropmarks group h-full border border-ink/10 bg-cream p-6 transition-colors hover:border-orange/40">
                <p className="font-display text-5xl font-extrabold text-ink/10 transition-colors group-hover:text-orange/25">
                  {s.n}
                </p>
                <h3 className="font-display mt-3 text-xl font-bold">
                  <span className="text-green-deep">/</span> {s.t}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials />

      {/* ============ OUR CLIENTS ============ */}
      <section className="overflow-hidden border-y border-ink/10 bg-white py-16">
        <Reveal>
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p className="spec text-orange">Our clients</p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The best partners you can think of
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              From government and NGOs to schools, hospitals and startups —
              {" "}{clientLogos.length}+ brands trust Hensa with their name.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-5">
          {[
            {
              logos: clientLogos.slice(0, Math.ceil(clientLogos.length / 2)),
              anim: "animate-marquee-slow",
            },
            {
              logos: clientLogos.slice(Math.ceil(clientLogos.length / 2)),
              anim: "animate-marquee-slow-reverse",
            },
          ].map((row, r) => (
            <div
              key={r}
              className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            >
              <div className={`${row.anim} flex w-max items-center gap-5 pr-5`}>
                {[...row.logos, ...row.logos].map((src, i) => (
                  <div
                    key={i}
                    className="flex h-24 w-40 flex-none items-center justify-center rounded-xl border border-ink/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange/30 hover:shadow-[0_12px_28px_rgba(28,26,22,0.10)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt="Hensa Solutions client logo"
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream">
        <div className="halftone pointer-events-none absolute -left-10 top-0 h-full w-64 text-green/20" />
        <div className="halftone pointer-events-none absolute -right-10 top-0 h-full w-64 text-orange/20" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="spec text-orange">Got a project in mind?</p>
            <h2 className="font-display mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Let&apos;s put your brand on{" "}
              <span className="text-green">everything.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/70">
              Tell us what you need — quantities, colours, deadlines — and our
              team will reply on WhatsApp with options and a quote. Fast.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <EnquireButton className="flex items-center gap-2.5 rounded-full bg-green px-8 py-4 font-display font-bold text-white shadow-[0_10px_30px_rgba(51,160,44,0.4)] transition-all hover:-translate-y-0.5 hover:bg-green-deep">
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
