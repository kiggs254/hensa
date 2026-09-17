"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type Category } from "@/lib/catalog";
import { site } from "@/lib/site";
import { useEnquiry } from "@/components/EnquiryProvider";
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  ArrowIcon,
  SearchIcon,
} from "@/components/icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog", mega: true },
  { href: "/services", label: "Our Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About Hensa" },
  { href: "/contact", label: "Contact Us" },
];

/* small, hardcoded so the full catalog JSON stays out of the shared bundle */
const MEGA_FEATURED = [
  { name: "Hoodies", slug: "hoodies", img: "/products/hoodies.jpg" },
  {
    name: "Executive Gift Sets",
    slug: "executive-gift-sets-008",
    img: "/products/executive-gift-sets-008.jpg",
  },
  { name: "Pop Up Banners", slug: "pop-up-banner", img: "/products/pop-up-banner.jpg" },
  { name: "Buckle Caps", slug: "buckle-caps", img: "/products/buckle-caps.jpg" },
];

const QUICK_SEARCHES = [
  "T-Shirts",
  "Mugs",
  "Caps",
  "Notebooks",
  "Banners",
  "Gift Sets",
  "Water Bottles",
  "Pens",
];

export default function Header({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { openEnquiry } = useEnquiry();

  const openMega = useCallback(() => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setSearch(false);
    setMega(true);
  }, []);

  const closeMega = useCallback((delay = 140) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), delay);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    if (!search) return;
    const t = setTimeout(() => searchInput.current?.focus(), 180);
    return () => clearTimeout(t);
  }, [search]);

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchInput.current?.value.trim();
    if (!q) return;
    setSearch(false);
    router.push(`/catalog?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* top strip */}
      <div className="bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 sm:px-6">
          <p className="spec hidden text-cream/80 sm:block">
            Countrywide delivery across Kenya · M-Pesa accepted
          </p>
          <div className="flex items-center gap-5 text-xs">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-orange"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-orange sm:flex"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div
        className={`relative border-b border-ink/10 bg-paper/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_2px_20px_rgba(28,26,22,0.08)]" : ""
        }`}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setMega(false);
            setSearch(false);
          }
        }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setMega(false);
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <Link href="/" className="shrink-0" aria-label="Hensa Solutions — home">
            <Image
              src="/logo.png"
              alt="Hensa Solutions"
              width={150}
              height={82}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((item) =>
              item.mega ? (
                <div
                  key={item.href}
                  onMouseEnter={openMega}
                  onMouseLeave={() => closeMega()}
                >
                  <Link
                    href={item.href}
                    aria-expanded={mega}
                    aria-haspopup="true"
                    onFocus={openMega}
                    className={`flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-ink/5 ${
                      pathname.startsWith("/catalog") ||
                      pathname.startsWith("/product")
                        ? "text-orange"
                        : ""
                    }`}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 8"
                      className={`ml-1.5 h-2 w-3 transition-transform duration-200 ${mega ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1.5 6 6.5 11 1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-ink/5 ${
                    pathname === item.href ? "text-orange" : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setMega(false);
                setSearch((s) => !s);
              }}
              aria-expanded={search}
              aria-label={search ? "Close search" : "Search products"}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                search
                  ? "border-orange bg-orange text-white"
                  : "border-ink/15 hover:border-orange hover:text-orange"
              }`}
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              onClick={() => openEnquiry()}
              className="hidden items-center gap-2 rounded-full bg-green px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-green-deep sm:flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-ink/15 lg:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <span
                className={`h-0.5 w-5 bg-ink transition-transform ${
                  open ? "translate-y-1 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-ink transition-transform ${
                  open ? "-translate-y-1 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ============ SEARCH PANEL ============ */}
        <div
          className={`absolute inset-x-0 top-full border-b border-ink/10 bg-cream shadow-[0_30px_60px_rgba(28,26,22,0.16)] transition-all duration-200 ${
            search
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-3xl px-4 py-7 sm:px-6">
            <form onSubmit={submitSearch} role="search">
              <div className="flex items-center gap-2 rounded-full border-2 border-ink/15 bg-white px-2 py-1.5 transition-colors focus-within:border-orange">
                <SearchIcon className="ml-3 h-5 w-5 flex-none text-ink-soft" />
                <input
                  ref={searchInput}
                  type="search"
                  placeholder="Search 274 branded products…"
                  aria-label="Search products"
                  tabIndex={search ? 0 : -1}
                  className="w-full bg-transparent py-2 text-base outline-none placeholder:text-ink-soft/60"
                />
                <button
                  type="submit"
                  tabIndex={search ? 0 : -1}
                  className="flex-none rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-orange"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="spec text-ink-soft">Popular:</span>
              {QUICK_SEARCHES.map((q) => (
                <Link
                  key={q}
                  href={`/catalog?q=${encodeURIComponent(q)}`}
                  tabIndex={search ? 0 : -1}
                  onClick={() => setSearch(false)}
                  className="rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-orange hover:text-orange"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ============ MEGA MENU ============ */}
        <div
          onMouseEnter={openMega}
          onMouseLeave={() => closeMega()}
          className={`absolute inset-x-0 top-full hidden border-b border-ink/10 bg-cream shadow-[0_30px_60px_rgba(28,26,22,0.16)] transition-all duration-200 lg:block ${
            mega
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-8">
            {/* categories */}
            <div className="col-span-8">
              <p className="spec text-orange">Browse by category</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/catalog?category=${c.slug}`}
                    tabIndex={mega ? 0 : -1}
                    className="group/tile relative block h-28 overflow-hidden rounded-xl border border-ink/10"
                  >
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-500 group-hover/tile:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition-colors group-hover/tile:from-orange/85" />
                    <span className="absolute inset-x-0 bottom-0 p-2.5">
                      <span className="block text-[13px] font-bold leading-tight text-cream">
                        {c.name}
                      </span>
                      <span className="spec mt-0.5 block text-[9px] text-cream/70">
                        {c.count} products
                      </span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* quick searches */}
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-dashed border-ink/15 pt-4">
                <span className="spec text-ink-soft">Popular:</span>
                {QUICK_SEARCHES.map((q) => (
                  <Link
                    key={q}
                    href={`/catalog?q=${encodeURIComponent(q)}`}
                    tabIndex={mega ? 0 : -1}
                    className="rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-orange hover:text-orange"
                  >
                    {q}
                  </Link>
                ))}
              </div>
            </div>

            {/* featured + promo */}
            <div className="col-span-4 flex flex-col">
              <p className="spec text-green-deep">Popular right now</p>
              <ul className="mt-4 space-y-1">
                {MEGA_FEATURED.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/product/${f.slug}`}
                      tabIndex={mega ? 0 : -1}
                      className="group/feat flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white"
                    >
                      <span className="relative block h-12 w-12 flex-none overflow-hidden rounded-lg border border-ink/10 bg-white">
                        <Image
                          src={f.img}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex-1 text-sm font-semibold transition-colors group-hover/feat:text-orange">
                        {f.name}
                      </span>
                      <ArrowIcon className="h-3.5 w-3.5 text-ink-soft/50 transition-all group-hover/feat:translate-x-0.5 group-hover/feat:text-orange" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex-1 rounded-xl bg-ink p-4 text-cream">
                <p className="font-display text-sm font-bold">
                  Can&apos;t find it? We&apos;ll source &amp; brand it.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-cream/65">
                  Tell us what you need on WhatsApp — our team replies with
                  options and a quote.
                </p>
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  tabIndex={mega ? 0 : -1}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-green px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-wa"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Start an enquiry
                </button>
              </div>
            </div>

            {/* bottom bar */}
            <div className="col-span-12 -mt-2 flex items-center justify-between border-t border-dashed border-ink/15 pt-4">
              <p className="spec text-ink-soft">
                Countrywide delivery · M-Pesa accepted · Bulk discounts
              </p>
              <Link
                href="/catalog"
                tabIndex={mega ? 0 : -1}
                className="group/all flex items-center gap-2 text-sm font-bold text-green-deep transition-colors hover:text-orange"
              >
                Browse the full catalogue
                <ArrowIcon className="h-4 w-4 transition-transform group-hover/all:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <nav
            className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-ink/10 bg-cream px-4 pb-6 pt-3 lg:hidden"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-dashed border-ink/10 py-3 font-display text-lg font-semibold"
              >
                {item.label}
              </Link>
            ))}
            <p className="spec mb-2 mt-4 text-ink-soft">Browse by category</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/catalog?category=${c.slug}`}
                  className="flex items-center gap-2.5 rounded-xl border border-ink/10 p-2 text-sm font-medium"
                >
                  <span className="relative block h-9 w-9 flex-none overflow-hidden rounded-lg">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                  {c.name}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green px-5 py-3 font-bold text-white"
            >
              <WhatsAppIcon />
              Enquire on WhatsApp
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
