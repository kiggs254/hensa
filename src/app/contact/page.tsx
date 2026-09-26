import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { PhoneIcon, MailIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us | Talk to Hensa Solutions",
  description:
    "Reach Hensa Solutions on WhatsApp, phone (+254 721 597714) or email. Visit us on Mfangano Street, Nairobi. Countrywide delivery across Kenya.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="grain relative overflow-hidden border-b border-ink/10 bg-paper-warm">
        <div className="halftone halftone-fade pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-orange/25" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="spec text-orange">Contact us</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Let&apos;s talk <span className="text-green-deep">ink.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            The fastest reply is on WhatsApp, but we&apos;re just as happy to
            talk by phone, by email or in person at the workshop.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            {[
              {
                icon: <PhoneIcon className="h-5 w-5" />,
                label: "Call or WhatsApp",
                value: site.phone,
                href: site.phoneHref,
              },
              {
                icon: <MailIcon className="h-5 w-5" />,
                label: "Email",
                value: site.email,
                href: `mailto:${site.email}`,
              },
              {
                icon: <PinIcon className="h-5 w-5" />,
                label: "Visit the workshop",
                value: `${site.address} · ${site.postal}`,
                href: "https://maps.google.com/?q=Mfangano+Street,+Nairobi,+Kenya",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-5 border border-ink/10 bg-cream p-6 transition-colors hover:border-orange/50"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                  {c.icon}
                </span>
                <span>
                  <span className="spec block text-ink-soft">{c.label}</span>
                  <span className="font-display mt-1 block text-lg font-bold">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}

            <div className="border border-dashed border-green/40 bg-green/5 p-6">
              <p className="spec text-green-deep">Working hours</p>
              <p className="font-display mt-1 text-lg font-bold">{site.hours}</p>
              <p className="mt-1 text-sm text-ink-soft">
                Countrywide delivery across Kenya · M-Pesa accepted
              </p>
            </div>

            <div className="overflow-hidden border border-ink/10">
              <iframe
                title="Hensa Solutions location, Mfangano Street, Nairobi"
                src="https://maps.google.com/maps?q=Mfangano%20Street%2C%20Nairobi%2C%20Kenya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
