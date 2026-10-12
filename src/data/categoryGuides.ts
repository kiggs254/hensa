/**
 * Long-form buying guide + FAQ for the priority catalogue pages (keyed by
 * category slug). Rendered under the product grid, FAQ also as FAQPage JSON-LD.
 * HTML is sanitised at render time (lib/richText.ts).
 */
export type CategoryGuide = { guideHtml: string; faq: { q: string; a: string }[] };

export const categoryGuides: Record<string, CategoryGuide> = {
  "corporate-stationery-diaries": {
    "guideHtml": "<h2>How to choose a 2027 diary for your company</h2>\n<p>A branded diary sits on a client's desk every working day, so it is worth choosing carefully. Start with the size, then the cover, then how your logo will appear.</p>\n<h3>Choosing a size</h3>\n<ul><li><strong>A4:</strong> a large desk diary, suited to managers who want plenty of writing space.</li><li><strong>A5:</strong> the most common corporate size, with the widest choice of styles in our range.</li><li><strong>B5:</strong> a size between A5 and A4, for those who want a little more room.</li></ul>\n<h3>Cover styles and colours</h3>\n<p>The range includes many numbered styles, and the cover finishes and colours differ from one to the next. Look through the product photos to compare them, and tell us which colours suit your brand.</p>\n<h3>Branding options</h3>\n<ul><li>Embossing or debossing of your logo or company name on the cover, where the material suits it.</li><li>Foil stamping on the cover.</li><li>Laser engraving on a metal plate, where the diary has one.</li><li>Printed inserts, so your company details or messages appear inside.</li></ul>\n<p>Which options are possible depends on the style you choose. Send us your logo and we will advise.</p>\n<h3>Gift sets and ordering early</h3>\n<p>The A5 Diary 2027 Gift Set is one option if you want a diary presented as a gift. Many companies place diary orders well ahead of the new year so that staff and clients receive them before January. Tell us your quantity and your deadline and we will confirm what is possible.</p>\n<h3>Who orders branded diaries</h3>\n<p>Procurement officers, HR managers and marketing teams in banks, schools, hospitals, NGOs and growing businesses order diaries for staff, board members and key clients. A diary with your name on the cover is a gift people use all year, and one that travels with them to meetings.</p>\n<p>To order, message us on WhatsApp with the style numbers you like, your quantity and your logo. We quote you and deliver across Kenya.</p>",
    "faq": [
      {
        "q": "Can you brand 2027 diaries with our company logo?",
        "a": "Yes. Depending on the diary, options include embossing or debossing, foil, laser engraving on a metal plate and printed inserts. Send your logo on WhatsApp and we will advise on the best option for the style you choose."
      },
      {
        "q": "Which diary sizes do you offer?",
        "a": "The 2027 range includes A4, A5 and B5 diaries, plus an A5 Diary 2027 Gift Set. A5 has the widest choice of styles."
      },
      {
        "q": "Do you deliver outside Nairobi?",
        "a": "Yes, we deliver countrywide across Kenya, and we also serve clients in East Africa and abroad. Tell us your location when you request a quote."
      },
      {
        "q": "How do I get a quote?",
        "a": "Message us on WhatsApp with the diary styles you like, your quantity and your logo. We will reply with a quote, as we do not publish prices."
      },
      {
        "q": "When should we order our 2027 diaries?",
        "a": "Ordering early helps you receive them before the new year. Tell us your quantity and deadline and we will confirm what is possible."
      },
      {
        "q": "Can we choose our own cover colour?",
        "a": "Cover colours vary across the numbered styles, so pick the one closest to your brand. For anything specific, tell us what you need and we will confirm."
      }
    ]
  },
  "corporate-stationery-notebooks": {
    "guideHtml": "<h2>How to choose branded notebooks for your business</h2>\n<p>Notebooks are one of the most practical items to brand: they are used in meetings, at conferences and on desks, and your logo is seen each time. Here is how to narrow down the choice.</p>\n<h3>Executive notebooks or standard notebooks</h3>\n<p><strong>Executive notebooks</strong> are the more polished option, usually chosen for senior staff, clients and VIP guests. Our range includes many numbered executive styles, and some come as sets with items such as a power bank and flash drive. Standard notebooks suit large groups, such as training cohorts and event delegates. There is also a customised notebook option if you have your own idea.</p>\n<h3>Sizes</h3>\n<ul><li><strong>A4:</strong> for those who need a large page.</li><li><strong>A5:</strong> the everyday corporate size and the most common in our range.</li><li><strong>B5:</strong> a size between A5 and A4.</li><li><strong>A6:</strong> a small notebook that fits a pocket or handbag.</li></ul>\n<h3>Branding options</h3>\n<ul><li>Embossing or debossing your logo on a leather-look cover.</li><li>Foil stamping for a metallic finish.</li><li>Printed covers in your brand colours.</li><li>Laser engraving where a notebook has a metal element.</li></ul>\n<p>Not every method suits every style, so we match the method to the notebook you choose.</p>\n<h3>Where companies use them</h3>\n<ul><li>Staff onboarding packs for new hires.</li><li>Conference and training delegate bags.</li><li>Client and partner gifts, often paired with a branded pen.</li></ul>\n<h3>Choosing for your audience</h3>\n<p>For staff and large events, pick a simple standard notebook so every delegate receives one. For directors, clients and guests of honour, an executive style makes a stronger impression, and a set that includes a pen or other accessories can make the gift feel complete. If you are unsure, send us your audience and quantity and we will suggest styles from the range.</p>\n<p>Message us on WhatsApp with the styles you like, your quantity and your logo. We will quote and deliver across Kenya.</p>",
    "faq": [
      {
        "q": "Can you put our logo on executive notebooks?",
        "a": "Yes. Options include embossing or debossing, foil and printed covers, depending on the notebook style. Send your logo on WhatsApp and we will advise."
      },
      {
        "q": "Which notebook sizes are available?",
        "a": "Our range includes A4, A5, B5 and A6 notebooks. A5 is the most common size across the executive styles."
      },
      {
        "q": "What is the difference between executive and standard notebooks?",
        "a": "Executive notebooks are the more presentable styles, aimed at senior staff and clients, and some come as sets with a power bank and flash drive. Standard notebooks suit larger groups such as delegates and new staff."
      },
      {
        "q": "Can we order notebooks with a pen to match?",
        "a": "Yes. We also supply branded pens, and we can quote notebooks and pens together. Tell us your quantity on WhatsApp."
      },
      {
        "q": "Do you deliver outside Nairobi?",
        "a": "Yes, we deliver countrywide across Kenya. Give us your location when you request your quote."
      },
      {
        "q": "How do I get a quote?",
        "a": "Message us on WhatsApp with the style numbers, your quantity, your logo and your deadline. We will reply with a quote, as we do not publish prices."
      }
    ]
  },
  "corporate-stationery": {
    "guideHtml": "<h2>Corporate stationery that carries your brand</h2>\n<p>Stationery is used daily, inside and outside your office, which makes it a dependable way to keep your logo in view. Hensa prints and brands the full range from our base in Nairobi.</p>\n<h3>What is in the range</h3>\n<ul><li><strong>2027 Diaries:</strong> A4, A5 and B5 diaries, including an A5 gift set. See the <strong>2027 Diaries</strong> category.</li><li><strong>Notebooks:</strong> executive and standard notebooks in A4, A5, B5 and A6.</li><li><strong>Pens:</strong> ball pens and executive pens, plus a pen with flash disk.</li><li><strong>Calendars:</strong> wall, one-leaf, desktop and table tent calendars.</li><li><strong>Key holders:</strong> leather, metallic, plastic and wooden styles.</li><li><strong>Print materials:</strong> business cards, letterheads, envelopes, brochures, flyers, folders, receipts and invoices, rubber stamps and more.</li><li><strong>Bookmarks</strong> and similar small printed items.</li></ul>\n<h3>Matching branding to the item</h3>\n<p>The method depends on the product. Paper goods are printed, covers can be embossed, debossed or foil stamped, and metal items can be laser engraved. We suggest the best method once we see your logo.</p>\n<h3>Build a matching set</h3>\n<p>Many organisations order a diary, notebook and pen together as a welcome pack or a year-end client gift, and add calendars and printed letterheads so every touchpoint matches. Ordering the diaries and calendars early helps them reach people before the new year starts.</p>\n<h3>How to order</h3>\n<p>Browse the categories, then message us on WhatsApp with the items, your quantity and your logo. We quote you and deliver across Kenya.</p>\n<h3>Who orders it</h3>\n<p>Procurement officers, HR and marketing managers, schools, banks and event organisers all order from this range, for staff packs, client gifts, conferences and everyday office use. If you need items from several categories, tell us everything in one message and we will quote them together. We can also advise on which items pair well, such as a diary with a notebook and pen, or calendars with printed letterheads, so that your branding looks consistent across everything you hand out.</p>",
    "faq": [
      {
        "q": "What corporate stationery do you supply?",
        "a": "Our range covers 2027 diaries, notebooks, pens, calendars, key holders and print materials such as business cards, letterheads and receipt books."
      },
      {
        "q": "Can everything be branded with our logo?",
        "a": "Yes, our core service is branding. The method depends on the item, for example printing on paper, embossing on covers or laser engraving on metal."
      },
      {
        "q": "Can I order a diary, notebook and pen as one set?",
        "a": "Yes. Tell us what you want to include and your quantity on WhatsApp and we will quote the set."
      },
      {
        "q": "Do you print business cards and letterheads too?",
        "a": "Yes. The Print Materials category includes business cards, letterheads, envelopes, brochures, flyers, folders and more."
      },
      {
        "q": "Do you deliver outside Nairobi?",
        "a": "Yes, we deliver countrywide across Kenya."
      },
      {
        "q": "How do I get a quote?",
        "a": "Message us on WhatsApp with the items, your quantity and your logo. We reply with a quote, as we do not publish prices."
      }
    ]
  }
};
