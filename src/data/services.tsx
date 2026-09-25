import type { ReactNode } from "react";

export interface Service {
  slug: string;
  name: string;
  /** one-liner used on homepage tiles + index cards */
  short: string;
  kicker: string;
  /** headline segments; middle one gets the accent colour */
  title: [string, string, string];
  intro: string[];
  accent: "orange" | "green";
  specs: { k: string; v: string }[];
  perfectFor: string[];
  steps: { t: string; d: string }[];
  faqs: { q: string; a: string }[];
  /** used to pull matching products from the catalogue */
  keywords: string[];
  related: string[];
  icon: ReactNode;
  /**
   * Has its own route at app/services/<slug>/page.tsx instead of the shared
   * [slug] template. It still appears in every listing (index, homepage,
   * footer, sitemap, llms.txt), which all read this array.
   */
  standalone?: boolean;
  /** listing photo for cards and banners; services/page.tsx's per-slug map wins when set */
  image?: string;
}

export const services: Service[] = [
  {
    slug: "screen-printing",
    name: "Screen Printing",
    short: "Bold, durable prints for apparel and merchandise.",
    kicker: "The merch workhorse",
    title: ["Ink that ", "works", " as hard as you do."],
    intro: [
      "Screen printing pushes ink through a fine mesh stencil, laying down thick, vibrant colour that survives sun, rain and a hundred washes. It's the workhorse of branded merchandise, and our presses run it every day.",
      "From a fifty-piece polo order for your team to thousands of jute bags for a countrywide activation, screen printing delivers bold, opaque colour at a cost that keeps dropping as your quantities rise.",
    ],
    accent: "orange",
    specs: [
      { k: "Best for", v: "Bold logos & flat colour" },
      { k: "Materials", v: "Cotton · canvas · blends" },
      { k: "Durability", v: "Outlasts the garment" },
      { k: "Sweet spot", v: "Bulk orders" },
    ],
    perfectFor: [
      "T-shirts & polos",
      "Hoodies & sweatshirts",
      "Jute & canvas bags",
      "Aprons & workwear",
      "Reflector jackets",
      "Posters & merchandising",
    ],
    steps: [
      { t: "Artwork & separation", d: "We prep your logo colour by colour and advise on placement and sizing." },
      { t: "Mesh & stencil", d: "Each colour gets its own screen, burned with photographic precision." },
      { t: "Print & cure", d: "Ink is laid down pass by pass, then heat-cured so it's in for keeps." },
    ],
    faqs: [
      { q: "What artwork works best for screen printing?", a: "Clean, solid shapes and up to a handful of flat colours. Vector files (AI, EPS, PDF, SVG) give the sharpest result, but send what you have and our design team will redraw it if needed." },
      { q: "How many colours can you print?", a: "Each colour is applied with its own screen, so simple one- and two-colour designs are the most economical. Multi-colour artwork is possible too, and we'll advise the best approach for your budget." },
      { q: "Is screen printing good for small orders?", a: "It shines on bulk runs, where the per-piece cost drops sharply. For a handful of pieces we may recommend digital or sublimation printing instead. Tell us your quantity on WhatsApp and we'll steer you right." },
    ],
    keywords: ["t-shirt", "tshirt", "polo", "jute", "bag", "apron", "reflector", "hoodie", "sweat", "mesh"],
    related: ["embroidery", "sublimation-printing", "large-format-printing"],
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 15l16-8" />
      </>
    ),
  },
  {
    slug: "digital-printing",
    name: "Digital Printing",
    short: "Fast, full-colour short runs, ready when you are.",
    kicker: "Speed meets full colour",
    title: ["Today's idea, ", "tomorrow's", " print."],
    intro: [
      "Digital printing is the value-priced alternative to the traditional four-colour process. No plates, no long setup. Your artwork goes straight from file to press in full colour.",
      "That makes it perfect for short runs and tight deadlines: a box of business cards before your morning meeting, event flyers for the weekend, or a proof of your company profile before committing to volume.",
    ],
    accent: "green",
    specs: [
      { k: "Best for", v: "Full-colour detail" },
      { k: "Turnaround", v: "Our fastest press" },
      { k: "Runs", v: "One copy to thousands" },
      { k: "Finishes", v: "Gloss · matte · laminated" },
    ],
    perfectFor: [
      "Business cards",
      "Flyers & brochures",
      "Stickers & labels",
      "Posters",
      "Certificates",
      "Company profiles",
    ],
    steps: [
      { t: "Send your artwork", d: "Share your files on WhatsApp or email, or have our designers create them." },
      { t: "Proof & approve", d: "You sign off a digital (or printed) proof so there are no surprises." },
      { t: "Print & finish", d: "Printed, trimmed, laminated or folded, then packed for delivery." },
    ],
    faqs: [
      { q: "How is digital different from offset printing?", a: "Digital skips the plate-making stage, so setup is instant and short runs stay affordable. Offset takes over on large volumes, where its per-copy price becomes unbeatable. We run both, so you always get the right press for the job." },
      { q: "What files should I send?", a: "Print-ready PDFs are ideal, but we happily work from Word, PowerPoint, images or even a sketch. Our creative team will lay it out properly." },
      { q: "Can you print same-day?", a: "Short digital runs are the fastest work we do. Message us on WhatsApp with your deadline and we'll tell you honestly what's possible." },
    ],
    keywords: ["business card", "flyer", "brochure", "sticker", "poster", "certificate", "bookmark", "envelope"],
    related: ["offset-printing", "large-format-printing", "web-creative-design"],
    icon: (
      <>
        <path d="M6 9V3h12v6" />
        <rect x="3" y="9" width="18" height="8" rx="2" />
        <path d="M7 17h10v4H7z" />
      </>
    ),
  },
  {
    slug: "offset-printing",
    name: "Offset Printing",
    short: "Crisp, economical printing at serious volume.",
    kicker: "Built for bulk",
    title: ["Serious ", "volume", ", immaculate colour."],
    intro: [
      "Offset lithography is how the world's best print gets made at scale. Ink is transferred (offset) from plate to rubber blanket to paper, producing consistently sharp, rich results across thousands of copies.",
      "When your calendars, company profiles, books or letterheads need to look identical from the first copy to the ten-thousandth, offset is the press we fire up. The bigger the run, the harder the economics work in your favour.",
    ],
    accent: "orange",
    specs: [
      { k: "Best for", v: "High-volume print" },
      { k: "Quality", v: "Razor-sharp, consistent" },
      { k: "Stocks", v: "Wide paper & card range" },
      { k: "Economics", v: "Cheapest per copy at scale" },
    ],
    perfectFor: [
      "Calendars & diaries",
      "Books & publications",
      "Company profiles",
      "Letterheads & envelopes",
      "Receipt & invoice books",
      "Folders & packaging",
    ],
    steps: [
      { t: "Plan & proof", d: "We agree stocks, finishes and quantities, then you approve a contract proof." },
      { t: "Plates & press", d: "Your artwork is imaged onto plates and the press is inked to match." },
      { t: "Finish & bind", d: "Cutting, folding, binding and numbering, all finished in-house." },
    ],
    faqs: [
      { q: "When does offset beat digital?", a: "Roughly speaking: the moment quantities get serious. Setup costs more, but every extra copy costs less, so long runs come out far cheaper per piece and the colour stays consistent throughout." },
      { q: "Can you print branded receipt and invoice books?", a: "Yes. Numbered, carbonised NCR books with your branding are a staple of our offset work." },
      { q: "What about special finishes?", a: "Lamination, spot varnish, foiling, debossing and more. Tell us the look you're after and we'll recommend a finish that fits the budget." },
    ],
    keywords: ["calendar", "diary", "letterhead", "envelope", "receipt", "publication", "folder", "voucher", "notebook"],
    related: ["digital-printing", "laser-engraving-debossing", "screen-printing"],
    icon: (
      <>
        <circle cx="7" cy="10" r="3.5" />
        <circle cx="17" cy="10" r="3.5" />
        <path d="M3 19h18" />
      </>
    ),
  },
  {
    slug: "sublimation-printing",
    name: "Sublimation Printing",
    short: "Photo-quality colour on fabric, mugs and more.",
    kicker: "Colour that becomes the product",
    title: ["Photo-real colour, ", "baked", " in."],
    intro: [
      "Sublimation turns solid dye straight into gas, bonding it into polyester fabric or specially-coated surfaces. The print doesn't sit on the product, it becomes part of it. Nothing to crack or peel, and no texture under your fingers.",
      "It's the technique behind photo mugs that survive years of dishwashing, all-over jersey prints, and sequin pillows that reveal a loved one's photo. Use it anywhere you need edge-to-edge, photographic colour.",
    ],
    accent: "green",
    specs: [
      { k: "Best for", v: "Photos & gradients" },
      { k: "Surfaces", v: "Polyester & coated items" },
      { k: "Feel", v: "Zero texture, dyed in" },
      { k: "Coverage", v: "Edge to edge, all over" },
    ],
    perfectFor: [
      "Mugs & thermal mugs",
      "Water bottles",
      "Sports jerseys",
      "Sequin & throw pillows",
      "Photo frames & plaques",
      "Mousepads & coasters",
    ],
    steps: [
      { t: "Design at full bleed", d: "Photos, gradients and patterns all hold up at this size, so go bold." },
      { t: "Transfer print", d: "Your design is printed in reverse onto transfer paper with sublimation inks." },
      { t: "Heat & bond", d: "Heat and pressure turn the dye to gas, locking it permanently into the surface." },
    ],
    faqs: [
      { q: "Will the print fade or peel?", a: "No. The dye is inside the material, not on top of it. Mugs stay dishwasher-friendly and fabrics keep their colour wash after wash." },
      { q: "Can you sublimate cotton t-shirts?", a: "Sublimation needs polyester or a coated surface. For cotton we'll recommend screen printing or DTF instead, which gets the same bold result on the right chemistry." },
      { q: "Is one piece possible?", a: "Absolutely. Sublimation has no setup plates, so a single personalised mug or pillow is as easy as a hundred." },
    ],
    keywords: ["mug", "water bottle", "pillow", "sequin", "photo", "frame", "coaster", "tumbler"],
    related: ["screen-printing", "digital-printing", "laser-engraving-debossing"],
    icon: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />,
  },
  {
    slug: "large-format-printing",
    name: "Large Format Printing",
    short: "Banners and billboards that go big on your brand.",
    kicker: "Impossible to ignore",
    title: ["Your brand at ", "billboard", " scale."],
    intro: [
      "Some messages need to be read from across the street. Our large-format printers roll out banners, backdrops and billboard skins in weather-proof colour, metres wide and still pin-sharp.",
      "Pair the print with the right hardware and you have a portable brand presence: pop-up banners for the reception, X-banners for the expo stand, teardrops for the roadside and full gazebos for the field activation.",
    ],
    accent: "orange",
    specs: [
      { k: "Best for", v: "Events & outdoor" },
      { k: "Scale", v: "Metres wide, pin-sharp" },
      { k: "Media", v: "PVC · fabric · mesh · vinyl" },
      { k: "Weather", v: "UV & rain resistant" },
    ],
    perfectFor: [
      "Pop-up & roll-up banners",
      "X-banners & teardrops",
      "Backdrops & media walls",
      "Billboards",
      "Gazebos & tents",
      "Window & wall graphics",
    ],
    steps: [
      { t: "Size & site", d: "We confirm dimensions, viewing distance and where the piece will live." },
      { t: "Design for distance", d: "Artwork built to be read in seconds, with bold type and strong colour." },
      { t: "Print, finish, rig", d: "Printed, hemmed and eyeleted, supplied with stands and hardware." },
    ],
    faqs: [
      { q: "Will my banner survive outdoors?", a: "Yes. We print on UV-stable, weather-resistant media built for Kenyan sun and rain. For windy sites we recommend mesh banners that let air through." },
      { q: "Do you supply the stands too?", a: "We supply the complete kit: pop-up frames, X-stands, teardrop bases and gazebo frames, plus carry bags so your team can travel with them." },
      { q: "How do I make artwork this big?", a: "Send us your logo and message; our designers build the artwork at scale with the right resolution so it stays sharp at full size." },
    ],
    keywords: ["banner", "backdrop", "billboard", "gazebo", "teardrop", "telescopic", "signage", "x-banner"],
    related: ["screen-printing", "digital-printing", "web-creative-design"],
    icon: (
      <>
        <path d="M15 3h6v6" />
        <path d="M9 21H3v-6" />
        <path d="M21 3l-7 7" />
        <path d="M3 21l7-7" />
      </>
    ),
  },
  {
    slug: "laser-engraving-debossing",
    name: "Laser Engraving & Debossing",
    short: "Premium finishes on wood, metal and leather.",
    kicker: "The executive finish",
    title: ["Permanent, precise, ", "premium", "."],
    intro: [
      "A focused laser beam removes material from the surface with photographic precision, while debossing presses your mark deep into leather and card. Both leave a mark you can feel with a thumb, and it never wears off.",
      "It's the difference between a gift and an heirloom: crystal awards with razor-sharp lettering, executive pens carrying a name, leather notebooks pressed with your logo. No ink to fade, nothing to peel.",
    ],
    accent: "green",
    specs: [
      { k: "Best for", v: "Awards & executive gifts" },
      { k: "Materials", v: "Wood · metal · glass · leather" },
      { k: "Detail", v: "Photographic precision" },
      { k: "Lifespan", v: "Permanent, no ink" },
    ],
    perfectFor: [
      "Wooden & crystal awards",
      "Executive pens",
      "Flash drives",
      "Leather notebooks & wallets",
      "Gift sets",
      "Key holders & plaques",
    ],
    steps: [
      { t: "Choose the piece", d: "Pick from our awards, pens, notebooks and gift sets, or bring your own items." },
      { t: "Layout & preview", d: "We fit your logo, names or message to the piece and share a preview." },
      { t: "Engrave & present", d: "Laser-cut or debossed, polished and boxed in time for the ceremony." },
    ],
    faqs: [
      { q: "Can you personalise each piece differently?", a: "Yes. Individual names, titles and dates are exactly what laser engraving is for. Send us your list and every award or pen comes out personalised." },
      { q: "What's the difference between engraving and debossing?", a: "Engraving removes material with a laser, which suits wood, glass, metal and coated surfaces. Debossing presses the design into soft materials like leather and card for a classic, tactile impression." },
      { q: "Can you engrave items I already own?", a: "Usually, yes. Message us a photo of the item on WhatsApp and we'll confirm it's laser-safe before you bring it in." },
    ],
    keywords: ["award", "crystal", "engrav", "pen", "flash", "gift set", "wooden", "organizer", "key holder"],
    related: ["offset-printing", "sublimation-printing", "embroidery"],
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  },
  {
    slug: "embroidery",
    name: "Embroidery",
    short: "Stitched logos that outlast every wash.",
    kicker: "Thread-level quality",
    title: ["Stitched in, ", "never", " washed out."],
    intro: [
      "Embroidery converts your logo into thousands of tight stitches, sewn directly into the garment. It gives the logo depth and texture that a print can't, and it doesn't wash out.",
      "It's the standard for corporate wear that has to look sharp every day: polos and shirts, caps, chef jackets, overalls and beanies. If your team wears it, we can stitch it.",
    ],
    accent: "orange",
    specs: [
      { k: "Best for", v: "Corporate & workwear" },
      { k: "Look", v: "Raised, textured, premium" },
      { k: "Durability", v: "As long as the garment" },
      { k: "Detail", v: "Logos, monograms, names" },
    ],
    perfectFor: [
      "Polos & official shirts",
      "Caps & hats",
      "Chef jackets",
      "Beanies",
      "Overalls & workwear",
      "Fleece & jackets",
    ],
    steps: [
      { t: "Digitise the logo", d: "Your artwork is converted into a stitch file that maps every thread." },
      { t: "Sample stitch-out", d: "We sew a sample so you approve the exact colours and detail." },
      { t: "Production run", d: "Multi-head machines stitch the full order with identical precision." },
    ],
    faqs: [
      { q: "Does embroidery work for small text?", a: "Very small lettering can lose definition in thread. We'll advise the minimum size that stays crisp, or suggest a print for ultra-fine detail." },
      { q: "Can you embroider garments we already have?", a: "In most cases yes. Bring them in or message us photos first, and we'll confirm the fabric suits embroidery." },
      { q: "How do you match my brand colours?", a: "We match your logo against standard thread charts and show you the sample stitch-out before the run, so the colour on the cap is the colour on your brand guide." },
    ],
    keywords: ["polo", "cap", "chef", "beanie", "overall", "shirt", "hat", "apparel"],
    related: ["screen-printing", "laser-engraving-debossing", "sublimation-printing"],
    icon: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M8.5 8.5 20 20M8.5 15.5 20 4" />
      </>
    ),
  },
  {
    slug: "web-creative-design",
    name: "Web & Creative Design",
    short: "Websites and artwork that speak your brand.",
    kicker: "Your brand, everywhere",
    title: ["Design that ", "speaks", " your brand."],
    intro: [
      "The same team handles marketing, advertising and graphic design. Logos and brand identities, campaign artwork, company profiles, and responsive websites built to bring in enquiries.",
      "Because one team designs your print and your web, everything matches. The business card, the banner at your event and the site on a customer's phone all look like the same company.",
    ],
    accent: "green",
    specs: [
      { k: "Best for", v: "Getting your look consistent" },
      { k: "Web", v: "Responsive, modern, fast" },
      { k: "Design", v: "Logo → campaign → layout" },
      { k: "Consistency", v: "Print & digital, one voice" },
    ],
    perfectFor: [
      "Business websites",
      "Logos & brand identity",
      "Company profiles",
      "Campaign & ad artwork",
      "Social media kits",
      "Print-ready layouts",
    ],
    steps: [
      { t: "Discover", d: "We dig into your goals, audience and competitors before designing a thing." },
      { t: "Design & iterate", d: "Concepts, feedback and refinement, until it looks unmistakably you." },
      { t: "Launch & roll out", d: "Website live, brand files delivered, artwork ready for every press we run." },
    ],
    faqs: [
      { q: "Do you design logos from scratch?", a: "Yes. Full identity work from a blank page: logo, colours, typography and the brand files you'll use everywhere from letterheads to billboards." },
      { q: "What kind of websites do you build?", a: "Business websites built from scratch, fast on a phone, with your products laid out clearly and your contact details never more than a tap away." },
      { q: "Can you refresh artwork I already have?", a: "Happily. We can redraw low-quality logos, modernise old layouts and prepare print-ready files from whatever you currently have." },
    ],
    keywords: ["business card", "letterhead", "brochure", "company", "logo", "staff id"],
    related: ["digital-printing", "large-format-printing", "offset-printing"],
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a13.5 13.5 0 0 1 0 18a13.5 13.5 0 0 1 0-18Z" />
      </>
    ),
  },
  {
    slug: "event-branding-entertainment",
    name: "Event Branding & Entertainment",
    short: "Branded venues, delegate kits and gifts, plus the performers who fill the stage.",
    kicker: "Events, concept to execution",
    title: ["Branded from the ", "entrance", " to the encore."],
    intro: [
      "Event branding for conferences, gala dinners, product launches, weddings, exhibitions and private celebrations: backdrops, signage, stage and podium branding, delegate kits, stationery and corporate gifts, all produced in-house.",
      "Live entertainment to go with it: traditional Kenyan dancers, acrobats, magicians, fire performers, live bands, caricature artists and more, matched to the theme, audience and atmosphere of your event.",
    ],
    accent: "orange",
    specs: [
      { k: "Best for", v: "Conferences & launches" },
      { k: "Branding", v: "Venue, stage, delegates" },
      { k: "Entertainment", v: "10 kinds of act" },
      { k: "Scope", v: "Concept to execution" },
    ],
    perfectFor: [
      "Corporate Events",
      "Product Launches",
      "Conferences",
      "Summits",
      "Gala Dinners",
      "Weddings",
      "Festivals",
      "Award Ceremonies",
      "Private Parties",
      "Brand Activations",
    ],
    steps: [
      { t: "Share the brief", d: "Tell us the event, the date, the venue, how many guests and the feel you are after." },
      { t: "Concept & proofs", d: "We put forward the branding pieces and the entertainment, and you approve every artwork proof before it is printed." },
      { t: "Produce & perform", d: "We produce the branding in-house, deliver it for the event and coordinate the performers on the day." },
    ],
    faqs: [
      { q: "Can you handle both the branding and the entertainment for one event?", a: "Yes. We can brand the venue, supply the delegate materials and gifts, and book the performers, so a single team works to one brief and one schedule." },
      { q: "What kinds of events do you brand and entertain?", a: "Corporate events, product launches, conferences, summits, gala dinners, weddings, festivals, award ceremonies, private parties and brand activations." },
      { q: "What entertainment can you provide?", a: "Traditional and cultural performances, acrobatic shows, magic and illusion, fire performances, live bands and musicians, dancers and dance shows, kids entertainment, photo booths and 360° video booths, interactive games and caricature artists." },
      { q: "Can the entertainment be matched to our theme?", a: "Yes. Performances are chosen to suit the theme, audience and atmosphere of your event, whether you want to celebrate Kenyan culture or keep a formal corporate evening." },
      { q: "Do you supply conference kits and delegate bags?", a: "Yes. Delegate bags, conference kits, registration materials, branded notebooks and pens, lanyards, name tags, speaker and VIP gifts, exhibitor materials and presentation folders." },
    ],
    keywords: ["conference bag", "notebook", "backdrop", "pop up", "flag", "gift set", "mug", "bottle", "umbrella", "folder", "flash", "tote"],
    related: ["large-format-printing", "screen-printing", "laser-engraving-debossing"],
    icon: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
        <circle cx="12" cy="12" r="1.6" />
      </>
    ),
    standalone: true,
    image: "/events/hero.jpg",
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
