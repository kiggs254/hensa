import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/catalog";

export const revalidate = 300;
import { clientLogos } from "@/data/clients";
import { services } from "@/data/services";
import { site } from "@/lib/site";
import EnquireButton from "@/components/EnquireButton";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import Testimonials from "@/components/Testimonials";
import CampaignSlider from "@/components/CampaignSlider";
import CategoryStrip from "@/components/CategoryStrip";
import {
  WhatsAppIcon,
  ArrowIcon,
  TruckIcon,
  MpesaIcon,
  ShieldCheckIcon,
  GiftIcon,
} from "@/components/icons";

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

const TRUST = [
  {
    title: "Countrywide Delivery",
    body: "We deliver across Kenya, from Nairobi out to the counties, right to your door.",
    accent: "orange" as const,
    icon: <TruckIcon className="h-5 w-5" />,
  },
  {
    title: "M-Pesa Accepted",
    body: "Lipa na M-Pesa on any order, the way you already pay for everything else.",
    accent: "green" as const,
    icon: <MpesaIcon className="h-5 w-5" />,
  },
  {
    title: "Only the Best Brands",
    body: "We use blanks and inks that survive real use, so your logo still looks right months later.",
    accent: "orange" as const,
    icon: <ShieldCheckIcon className="h-5 w-5" />,
  },
  {
    title: "Free Gifts & Discounts",
    body: "Loyal clients enjoy free gifts and discounts on bulk orders.",
    accent: "green" as const,
    icon: <GiftIcon className="h-5 w-5" />,
  },
];

export default async function Home() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const featured = FEATURED_SLUGS.map((s) =>
    products.find((p) => p.slug === s)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const img = (slug: string, fallback: string) =>
    products.find((p) => p.slug === slug)?.localImage ?? fallback;

  const slides: HeroSlide[] = [
    {
      kicker: "Customer Service Week · 5–9 October",
      title: ["Thank you for your ", "trust", " & partnership."],
      copy: "This Customer Service Week we're celebrating the clients who keep our presses running. Your success inspires our commitment. If you're thanking your own customers or team this week, we can print that too.",
      cta: { label: "Browse appreciation gifts", href: "/catalog/corporate-gifts" },
      image: {
        src: "/promos/customer-service-week.jpg",
        alt: "Hensa Solutions staff at a client event, thanking clients for Customer Service Week",
      },
      theme: "green",
    },
    {
      kicker: "Campaign season · every party",
      title: ["Your party's ", "colours", ", printed."],
      copy: "Election-ready merchandise for every candidate: t-shirts, caps, lessos, banners, reflectors and full regalia, branded in your colours and delivered to every county.",
      cta: { label: "Browse campaign gear", href: "/catalog/campaign" },
      image: {
        src: "/campaign/campaign-tshirts.jpg",
        alt: "Political campaign t-shirts branded for every party",
      },
      sticker: { big: "All parties", small: "campaign merch" },
      theme: "dark",
    },
    {
      kicker: "Nairobi's branding workshop",
      title: ["Everything your ", "logo", " belongs on."],
      copy: `Branded products, from a single mug to a fleet of billboards, printed in-house and delivered countrywide.`,
      cta: { label: "Browse the catalogue", href: "/catalog" },
      image: {
        src: img("executive-gift-sets-008", "/products/hoodies.jpg"),
        alt: "Executive branded gift set",
      },
      sticker: { big: "Any scale", small: "mug to billboard" },
      theme: "cream",
    },
    {
      kicker: "Promotional apparel",
      title: ["Merch your team will ", "actually", " wear."],
      copy: "Hoodies, polos, tees, caps and reflectors, screen-printed or embroidered with your brand, in sizes S to XXXL.",
      cta: { label: "Browse apparel", href: "/catalog/promotional-items" },
      image: { src: img("hoodies", "/products/hoodies.jpg"), alt: "Custom printed hoodie" },
      sticker: { big: "S – XXXL", small: "all sizes available" },
      theme: "green",
    },
    {
      kicker: "Banners & signage",
      title: ["Be ", "impossible", " to miss."],
      copy: "Pop-up banners, backdrops, teardrops and 3D signage that pull eyes at every event, expo and storefront.",
      cta: { label: "Browse banners", href: "/catalog/banners" },
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
      copy: "Executive gift sets, notebooks, pens and awards, branded for your clients and staff.",
      cta: { label: "Browse gifts", href: "/catalog/corporate-gifts" },
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
        Hensa Solutions: printing, branding, corporate & promotional gifts in
        Nairobi, Kenya
      </h1>
      <HeroSlider slides={slides} />

      {/* ============ CATEGORY QUICK-NAV ============ */}
      <nav
        aria-label="Browse by category"
        className="relative z-30 mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 lg:pt-10"
      >
        {/* The subcategory popover has to escape the strip downwards, but
            overflow-x-auto makes the viewport a scroll container on BOTH axes.
            So the popover is given room inside the padding box (pb-72) and that
            space is pulled back with -mb-72: it is never clipped, and it never
            produces a vertical scrollbar. */}
        <CategoryStrip
          ariaLabel="Browse by category"
          viewportClassName="-mb-72 gap-5 px-2 pb-72 pt-2 xl:gap-6"
        >
            {categories.map((c, i) => (
              <div key={c.slug} className="group relative w-24 flex-none">
                <Link
                  href={`/catalog/${c.slug}`}
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

                {/* sub-categories popover (desktop). The popover is wider than
                    the circle, so centring it would push the first one past
                    the strip's left edge (and the last past its right), where
                    the scrolling strip clips it: those two are anchored to
                    their circle's outer edge instead. */}
                <div
                  className={`invisible absolute top-full z-40 hidden w-56 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 lg:block ${
                    i === 0
                      ? "left-0"
                      : i === categories.length - 1
                        ? "right-0"
                        : "left-1/2 -translate-x-1/2"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream p-2 shadow-[0_24px_50px_rgba(28,26,22,0.18)]">
                    {/* The category's subcategories as set up in the admin (only
                        those with products), linking to their catalogue pages.
                        Capped in height so a long list (Trophies & Awards has
                        17) scrolls inside the popover instead of outgrowing
                        the room the strip reserves for it. */}
                    {(c.children?.length ?? 0) > 0 && (
                      <div className="max-h-52 overflow-y-auto overscroll-contain">
                        {c.children!.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/catalog/${s.slug}`}
                            tabIndex={-1}
                            className="block rounded-lg px-3 py-1.5 text-left text-xs font-semibold text-ink-soft transition-colors hover:bg-orange/10 hover:text-orange"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/catalog/${c.slug}`}
                      tabIndex={-1}
                      className={`spec block px-3 pb-1 pt-2 text-left text-[9px] text-green-deep transition-colors hover:text-orange ${
                        c.children?.length ? "mt-1 border-t border-dashed border-ink/15" : ""
                      }`}
                    >
                      All products →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </CategoryStrip>
      </nav>

      {/* ============ TRUST BAR ============ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} className="bg-cream">
              <div className="group relative h-full p-6">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                      t.accent === "orange"
                        ? "bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white"
                        : "bg-green/10 text-green-deep group-hover:bg-green group-hover:text-white"
                    }`}
                  >
                    {t.icon}
                  </span>
                  <span
                    className={`font-mono text-2xl font-bold text-ink/8 transition-colors ${
                      t.accent === "orange"
                        ? "group-hover:text-orange/25"
                        : "group-hover:text-green/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg font-bold">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {t.body}
                </p>
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
              href: "/catalog/corporate-apparel",
              img: "/promos/corporate-apparel.jpg",
              alt: "Corporate apparel: branded caps and kitchen aprons. Browse now.",
            },
            {
              href: "/catalog/promotional-items",
              img: "/promos/promotional-items.jpg",
              alt: "Promotional items: branded mugs, t-shirts and tote bags. Browse now.",
            },
            {
              href: "/catalog/banners",
              img: "/promos/banners.jpg",
              alt: "Banners: X-banners and hanging banners for your brand. Browse now.",
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

      {/* ============ CAMPAIGN / POLITICS ============ */}
      <CampaignSlider />

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
          {/* the catalog: featured tile */}
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <Link
              href="/catalog"
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
                <p className="spec text-orange">The catalog</p>
                <h3 className="font-display mt-2 text-3xl font-extrabold text-cream lg:text-4xl">
                  Everything, ready for your logo
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">
                  Banners, apparel, gifts, stationery, promo items and signage,
                  all branded to order and delivered countrywide.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-display text-sm font-bold text-ink transition-colors group-hover:bg-orange group-hover:text-white">
                  Browse the catalogue
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* services */}
          {services.filter((s) => !s.standalone).map((s, i) => (
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

          {/* standalone services get a full-width banner, which also keeps the
              4-column grid free of an orphaned ninth tile */}
          {services
            .filter((s) => s.standalone)
            .map((s) => (
              <Reveal key={s.slug} className="sm:col-span-2 lg:col-span-4">
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative isolate flex min-h-[17rem] flex-col justify-end overflow-hidden rounded-3xl border border-ink/10 bg-ink sm:min-h-[15rem] lg:min-h-[16rem]"
                >
                  {s.image && (
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 1232px"
                      className="-z-20 object-cover object-[70%_center] transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
                  <div className="max-w-xl p-7 lg:p-9">
                    <p className="spec text-orange">{s.kicker}</p>
                    <h3 className="font-display mt-2 text-2xl font-extrabold text-cream sm:text-3xl">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/75">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 font-display text-sm font-bold text-ink transition-colors group-hover:bg-orange group-hover:text-white">
                      Explore {s.name.toLowerCase()}
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
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
                href="/catalog"
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
          <p className="spec text-orange">How we work</p>
          <h2 className="font-display mt-2 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            From idea to ink, in four passes
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
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
              Who we print for
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              Government, NGOs, schools, hospitals and startups.{" "}
              {clientLogos.length}+ brands trust Hensa with their name.
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
              Tell us the quantities, the colours and the deadline. Our team
              replies on WhatsApp with options and a quote.
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
