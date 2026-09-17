/**
 * Central FAQ knowledge base. Answers are written to be quotable by AI search
 * (ChatGPT, Perplexity, Gemini, Google AI Overviews) — direct, factual, with
 * Nairobi/Kenya location signals. No invented prices: this is a quote-on-enquiry
 * business, so pricing answers explain the factors instead.
 */

export interface Faq {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  faqs: Faq[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "Ordering & suppliers in Kenya",
    faqs: [
      {
        q: "Where can I get branded corporate gifts in Nairobi?",
        a: "Hensa Solutions supplies branded corporate gifts in Nairobi and across Kenya — executive gift sets, engraved pens, flash drives, notebooks, mugs, water bottles, awards and more, all branded with your logo. We are based on Mfangano Street in Nairobi CBD and deliver countrywide. Send us your requirements on WhatsApp (+254 721 597714) for a quote.",
      },
      {
        q: "Where can I get banner printing in Kenya?",
        a: "Hensa Solutions offers large-format banner printing in Nairobi and throughout Kenya — pop-up banners, roll-up (X-banner) stands, teardrop flags, backdrops, eyelet and PVC banners, and gazebos. We print, finish and supply the hardware, with countrywide delivery. Contact us on +254 721 597714 or info@hensa.co.ke.",
      },
      {
        q: "Where can companies order promotional products in Kenya?",
        a: "Companies, institutions and organisations across Kenya order promotional products from Hensa Solutions in Nairobi — branded t-shirts, caps, mugs, water bottles, bags, umbrellas, pens, notebooks and giveaways, produced in bulk with your logo. We handle artwork, production and countrywide delivery. Request a quote by WhatsApp or the enquiry form on our website.",
      },
      {
        q: "Where can I get branded umbrellas in Kenya?",
        a: "Hensa Solutions produces branded and custom-printed umbrellas in Nairobi, Kenya — golf, straight and foldable umbrellas printed in your brand colours and logo, ideal for corporate giveaways, events and campaigns. Minimum order quantities apply for custom branding. Message us on +254 721 597714 for options and a quote.",
      },
    ],
  },
  {
    title: "Pricing & quotes",
    faqs: [
      {
        q: "How much does banner printing cost in Kenya?",
        a: "Banner printing is quoted per job because the price depends on the banner type (pop-up, roll-up, teardrop, PVC, mesh), the size, the material and finishing, and the quantity — bulk orders cost less per unit. Rather than a fixed list price, Hensa Solutions gives you an exact quote once we know these details. Send your size, quantity and artwork to +254 721 597714 on WhatsApp and we reply with a price and turnaround.",
      },
      {
        q: "How do I get a quote from Hensa Solutions?",
        a: "Tell us what you need — product or service, quantity, colours, branding and any deadline — via WhatsApp (+254 721 597714), phone, email (info@hensa.co.ke) or the enquiry form on any product page. Our team replies with options, materials and a price. There is no online checkout; every job is quoted individually.",
      },
      {
        q: "Do you offer discounts for bulk or corporate orders?",
        a: "Yes. Promotional products and printing are cheaper per unit at higher quantities, and loyal and corporate clients receive preferential pricing and occasional free gifts on bulk orders. Share your quantity when you enquire and we will quote the best rate.",
      },
    ],
  },
  {
    title: "Materials, options & turnaround",
    faqs: [
      {
        q: "What materials are suitable for outdoor banners?",
        a: "For outdoor banners in Kenya's sun and rain we recommend UV-stable, weather-resistant media: heavy PVC (frontlit) banners for durability, and mesh banners for windy or fenced sites because they let air pass through. Roll-up and teardrop stands use polyester fabric or PVC and are best for sheltered or short-term outdoor use. We advise the right material for where the banner will live.",
      },
      {
        q: "How long does large-format printing take?",
        a: "Turnaround for large-format printing depends on the item, quantity and finishing, but many banners and signage jobs are ready within a few working days once artwork is approved, and rush jobs can often be accommodated. Tell us your deadline when you enquire and we will confirm honestly what is possible.",
      },
      {
        q: "Can you print in my exact brand colours?",
        a: "Yes. Our design team matches your logo and brand colours and shares a proof (digital or, for embroidery, a stitch-out) before production, so the colour on your merchandise matches your brand guidelines.",
      },
      {
        q: "Do I need to provide artwork, or can you design it?",
        a: "Both. Send print-ready files if you have them, or just your logo and a brief — our in-house creative team will design or redraw the artwork professionally before printing.",
      },
    ],
  },
  {
    title: "Services & areas served",
    faqs: [
      {
        q: "What services does Hensa Solutions offer?",
        a: "Hensa Solutions offers large-format printing, banner and signage printing, screen printing, digital and offset printing, sublimation, laser engraving, embroidery, corporate branding, corporate gifts, promotional products, event and conference branding, and election/campaign printing — end to end from one Nairobi workshop.",
      },
      {
        q: "Which areas in Kenya do you serve?",
        a: "We are based in Nairobi and deliver countrywide — Nairobi, Mombasa, Kisumu, Nakuru, Eldoret and every county in between — as well as clients across East Africa and around the world. Payment is convenient via M-Pesa.",
      },
      {
        q: "Do you brand merchandise for institutions like hospitals, hotels and schools?",
        a: "Yes. Hensa Solutions supplies institutional and corporate branding for hospitals, hotels, schools, NGOs, banks and government bodies — uniforms and workwear, signage, stationery, gifts, apparel and event materials, all consistently branded.",
      },
      {
        q: "Do you print campaign and political merchandise?",
        a: "Yes. Hensa Solutions produces election and campaign merchandise for every party and candidate on a strictly non-partisan basis — branded t-shirts, caps, lessos, reflectors, banners, flags and full regalia in your party colours, delivered to any county. See our campaign range in the catalog.",
      },
    ],
  },
];

/** flattened for FAQPage structured data */
export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
