# Hensa Solutions — Website

Modern Next.js rebuild of [hensa.co.ke](https://www.hensa.co.ke) — Nairobi's leading branding, printing and promotional-gifts agency.

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- Static product catalog (274 real products scraped from the live WooCommerce store) in `src/data/catalog.json`
- All product/category images stored locally in `public/products` and `public/categories`
- **WhatsApp-only enquiries** — no cart, no checkout. Every product opens `wa.me/254721597714` with a pre-filled message (product name, price, quantity, note).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all product pages statically generated)
```

## Pages

| Route | What's there |
|---|---|
| `/` | Hero, services marquee, trust bar, category grid, featured products, methodology, CTA |
| `/shop` | Full catalogue — category filter, search, sort, load-more |
| `/product/[slug]` | 274 static product pages with WhatsApp enquiry widget + JSON-LD |
| `/services` | Branding, design, printing, engraving, embroidery, marketing, web design |
| `/about` | Who we are, methodology, stats |
| `/contact` | Contact cards, map, WhatsApp-composer contact form |

## Updating content

- **Products**: edit `src/data/catalog.json` (name, slug, price, priceMax, description, categories, tags, localImage). Drop the image in `public/products/`.
- **Categories / blurbs**: `src/lib/catalog.ts`
- **Phone / WhatsApp / address / hours**: `src/lib/site.ts`
- **Brand colors & design tokens**: `src/app/globals.css` (`--orange`, `--green`, `--ink`, `--paper`)

## Notes

- SEO: per-page metadata, `sitemap.xml` (all products), `robots.txt`, Product JSON-LD.
- Security headers configured in `next.config.ts` (HSTS, nosniff, CSP frame-ancestors, etc.).
