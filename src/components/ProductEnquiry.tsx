"use client";

import { useState } from "react";
import { type Product } from "@/lib/catalog";
import { site } from "@/lib/site";
import { useEnquiry } from "@/components/EnquiryProvider";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";

export default function ProductEnquiry({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const { openEnquiry, customer } = useEnquiry();

  const start = () =>
    openEnquiry({
      productName: product.name,
      productUrl: `${site.url}/product/${product.slug}`,
      quantity: qty,
      note,
    });

  return (
    <div className="cropmarks border border-ink/15 bg-cream p-6">
      <p className="spec text-ink-soft">WhatsApp Enquiry</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        No checkout, no fuss. Tell us what you need and our team replies on
        WhatsApp with availability, branding options and a quote.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <span className="text-sm font-semibold">Quantity</span>
        <div className="flex items-center overflow-hidden rounded-full border border-ink/20">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2 font-bold transition-colors hover:bg-ink/5"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-16 border-x border-ink/20 bg-transparent py-2 text-center font-mono text-sm font-semibold outline-none"
            aria-label="Quantity"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2 font-bold transition-colors hover:bg-ink/5"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder="Optional note: colours, sizes, branding, deadline…"
        className="mt-4 w-full resize-none rounded-lg border border-ink/20 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus:border-green"
      />

      <button
        type="button"
        onClick={start}
        className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-green px-6 py-4 font-display text-base font-bold text-white shadow-[0_8px_24px_rgba(51,160,44,0.35)] transition-all hover:-translate-y-0.5 hover:bg-green-deep"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Enquire on WhatsApp
      </button>

      {customer && (
        <p className="mt-2.5 text-center text-[11px] text-ink-soft">
          Sending as{" "}
          <span className="font-semibold text-ink">{customer.name}</span> ·{" "}
          {customer.phone}
        </p>
      )}

      <a
        href={site.phoneHref}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
      >
        <PhoneIcon className="h-4 w-4" />
        Or call {site.phone}
      </a>
    </div>
  );
}
