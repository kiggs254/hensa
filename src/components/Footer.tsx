import Link from "next/link";
import Image from "next/image";
import { type Category } from "@/lib/catalog";
import { services } from "@/data/services";
import { site } from "@/lib/site";
import EnquireButton from "@/components/EnquireButton";
import SavedDetailsLink from "@/components/SavedDetailsLink";
import OpenStatus from "@/components/OpenStatus";
import BackToTop from "@/components/BackToTop";
import {
  WhatsAppIcon, PhoneIcon, MailIcon, PinIcon, ArrowIcon,
  FacebookIcon, InstagramIcon, XIcon, TikTokIcon, YouTubeIcon, LinkedInIcon, PinterestIcon, ThreadsIcon,
} from "@/components/icons";
import type { SocialLink, SocialPlatform } from "@/lib/api";

const SOCIAL_ICON: Record<SocialPlatform, (p: { className?: string }) => React.ReactElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  pinterest: PinterestIcon,
  threads: ThreadsIcon,
  whatsapp: WhatsAppIcon,
};

const jobSpec = [
  { k: "Studio", v: "Nairobi, KE" },
  { k: "Catalogue", v: "Fully brandable" },
  { k: "Delivery", v: "Countrywide" },
  { k: "Payment", v: "M-Pesa accepted" },
];

export default function Footer({
  categories,
  socials,
}: {
  categories: Category[];
  socials: SocialLink[];
}) {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      {/* halftone glow */}
      <div className="halftone halftone-fade pointer-events-none absolute inset-x-0 top-0 h-40 text-orange/25" />
      <div className="halftone pointer-events-none absolute -right-16 top-32 h-64 w-64 text-green/15 [mask-image:radial-gradient(black,transparent_70%)]" />

      {/* ---------- tear line ---------- */}
      <div className="relative flex items-center gap-4 px-4 pt-7 sm:px-6">
        <span className="spec whitespace-nowrap text-[9px] text-cream/30">
          Hensa Solutions · Est. Nairobi
        </span>
        <span className="h-px flex-1 bg-[repeating-linear-gradient(to_right,rgba(255,253,248,0.25)_0_6px,transparent_6px_12px)]" />
        <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none text-cream/25" aria-hidden="true">
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6">
        {/* ---------- headline CTA ---------- */}
        <div className="grid gap-8 border-b border-cream/10 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="spec text-orange">Still scrolling?</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s make something
              <br />
              worth <span className="text-green">keeping.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <EnquireButton className="flex items-center gap-2.5 rounded-full bg-green px-6 py-3.5 font-display font-bold text-white shadow-[0_10px_28px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-wa">
              <WhatsAppIcon className="h-5 w-5" />
              Start an enquiry
            </EnquireButton>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 font-display font-bold transition-colors hover:border-orange hover:text-orange"
            >
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>

        {/* ---------- job spec strip ---------- */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden border-b border-cream/10 bg-cream/10 sm:grid-cols-4">
          {jobSpec.map((s) => (
            <div key={s.k} className="bg-ink px-4 py-5">
              <dt className="spec text-[9px] text-cream/40">{s.k}</dt>
              <dd className="font-display mt-1 text-sm font-bold">{s.v}</dd>
            </div>
          ))}
        </dl>

        {/* ---------- columns ---------- */}
        <div className="grid gap-10 py-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <Image
              src="/logo.png"
              alt="Hensa Solutions"
              width={150}
              height={82}
              className="h-12 w-auto rounded-lg bg-cream p-1.5"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
              The leading branding agency in Nairobi, Kenya, creating and
              developing brands across East Africa and for clients worldwide
              through printing, branding and advertising.
            </p>
            <div className="mt-5">
              <OpenStatus />
            </div>
            {socials.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {socials.map((s) => {
                  const Icon = SOCIAL_ICON[s.platform];
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white shadow-[0_6px_16px_rgba(240,82,29,0.30)] transition-all hover:-translate-y-0.5 hover:bg-orange-deep hover:shadow-[0_10px_24px_rgba(240,82,29,0.45)]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* catalog */}
          <nav className="lg:col-span-3" aria-label="Catalog">
            <h3 className="spec mb-4 flex items-center gap-2 text-orange">
              <span className="h-px w-4 bg-orange/50" />
              Catalog
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/catalog/${c.slug}`}
                    className="inline-flex text-cream/65 transition-colors hover:text-orange"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className="spec mb-4 flex items-center gap-2 text-green">
              <span className="h-px w-4 bg-green/50" />
              What we do
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-cream/65 transition-colors hover:text-green"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div className="lg:col-span-2">
            <h3 className="spec mb-4 flex items-center gap-2 text-cream/50">
              <span className="h-px w-4 bg-cream/25" />
              Find us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 flex-none text-orange" />
                <span className="leading-relaxed text-cream/65">
                  {site.address}
                  <br />
                  <span className="text-cream/40">{site.postal}</span>
                </span>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 text-cream/65 transition-colors hover:text-orange"
                >
                  <PhoneIcon className="h-4 w-4 flex-none text-green" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 break-all text-cream/65 transition-colors hover:text-orange"
                >
                  <MailIcon className="h-4 w-4 flex-none text-green" />
                  {site.email}
                </a>
              </li>
            </ul>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-cream transition-colors hover:text-orange"
            >
              Get directions
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/about", label: "About" },
                { href: "/catalog", label: "Catalog" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-cream/65 transition-colors hover:text-orange"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="flex flex-col-reverse items-center justify-between gap-5 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center sm:justify-start sm:text-left">
            <p>© {new Date().getFullYear()} Hensa Solutions</p>
            <span className="hidden h-3 w-px bg-cream/15 sm:block" />
            <SavedDetailsLink />
            <span className="spec text-[9px] text-cream/30">
              Printing · Branding · Promotional Gifts
            </span>
          </div>
          <BackToTop />
        </div>
      </div>

    </footer>
  );
}
