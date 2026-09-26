import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EnquireButton from "@/components/EnquireButton";
import JsonLd from "@/components/JsonLd";
import { faqNode, breadcrumbNode } from "@/lib/structured-data";
import { faqGroups, allFaqs } from "@/data/faqs";
import { site } from "@/lib/site";
import { WhatsAppIcon, ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "FAQ | Printing, Branding & Promotional Products in Kenya",
  description:
    "Answers to common questions about printing, banners, corporate gifts and promotional products in Nairobi and across Kenya: suppliers, pricing, materials, turnaround.",
  alternates: { canonical: "/faq" },
};

const RELATED = [
  { label: "Large Format Printing", href: "/services/large-format-printing" },
  { label: "Corporate Gifts", href: "/catalog/corporate-gifts" },
  { label: "Promotional Items", href: "/catalog/promotional-items" },
  { label: "Banners", href: "/catalog/banners" },
  { label: "Campaign & Political", href: "/catalog/campaign" },
  { label: "All services", href: "/services" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqNode(allFaqs)} />
      <JsonLd
        data={breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      {/* hero */}
      <section className="grain relative overflow-hidden border-b border-ink/10 bg-paper-warm">
        <div className="halftone halftone-fade pointer-events-none absolute -right-16 -top-16 h-80 w-80 rotate-12 text-orange/25" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
          <nav
            className="spec flex flex-wrap items-center gap-2 text-ink-soft"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-orange">Home</Link>
            <span>/</span>
            <span className="text-ink">FAQ</span>
          </nav>
          <p className="spec mt-6 text-orange">Answers</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Printing, branding &amp; promotional products in Kenya,{" "}
            <span className="text-green-deep">answered.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            The questions customers ask Hensa Solutions most often about banner
            printing, corporate gifts, promotional products, materials, pricing
            and delivery across Kenya.
          </p>
        </div>
      </section>

      {/* groups */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="space-y-14">
          {faqGroups.map((group) => (
            <div key={group.title}>
              <Reveal>
                <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  <span className="text-orange">/</span> {group.title}
                </h2>
              </Reveal>
              <div className="mt-6 space-y-4">
                {group.faqs.map((f, i) => (
                  <Reveal key={f.q} delay={i * 60}>
                    <details className="group rounded-2xl border border-ink/10 bg-cream transition-colors hover:border-orange/40">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ink/15 text-lg leading-none transition-transform duration-300 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-soft">
                        {f.a}
                      </p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* internal links */}
        <Reveal className="mt-14">
          <p className="spec text-ink-soft">Explore</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {RELATED.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
              >
                {r.label}
                <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-cream sm:px-10">
            <div className="halftone pointer-events-none absolute -left-10 top-0 h-full w-64 text-green/20" />
            <div className="halftone pointer-events-none absolute -right-10 top-0 h-full w-64 text-orange/20" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                Still have a question?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-cream/70">
                Ask our team directly. We reply on WhatsApp with options and a
                quote for your job.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <EnquireButton className="flex items-center gap-2.5 rounded-full bg-green px-8 py-4 font-display font-bold text-white shadow-[0_10px_30px_rgba(51,160,44,0.4)] transition-all hover:-translate-y-0.5 hover:bg-green-deep">
                  <WhatsAppIcon className="h-5 w-5" />
                  Ask on WhatsApp
                </EnquireButton>
                <a
                  href={site.phoneHref}
                  className="rounded-full border border-cream/30 px-8 py-4 font-display font-bold transition-colors hover:border-orange hover:text-orange"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
