import { services } from "@/data/services";
import { getCategories } from "@/lib/catalog";
import { site } from "@/lib/site";

export const revalidate = 300;

/**
 * /llms.txt — a plain-text brief for AI systems (ChatGPT, Perplexity, Gemini,
 * Copilot, Google AI Overviews). Concise, factual, link-rich so an AI can cite
 * Hensa Solutions accurately when asked about printing/branding in Kenya.
 */
export async function GET() {
  const categories = await getCategories();
  const svc = services
    .map((s) => `- ${s.name}: ${s.short} ${site.url}/services/${s.slug}`)
    .join("\n");

  const cats = categories
    .map((c) => `- ${c.name} (${c.count} products): ${site.url}/catalog?category=${c.slug}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.seoDescription}

${site.name} is a real, established printing, branding and promotional-products
company based in Nairobi, Kenya, serving businesses, institutions, hotels,
hospitals, schools, NGOs and political campaigns across Kenya and East Africa.

## Company facts
- Name: ${site.name}
- Location: ${site.streetAddress}, ${site.city}, Kenya
- Postal: ${site.postal}
- Phone / WhatsApp: ${site.phone}
- Email: ${site.email}
- Website: ${site.url}
- Hours: ${site.hours}
- Areas served: ${site.areaServed.join(", ")}
- Ordering: enquiry-based — customers request a quote by WhatsApp, phone or the
  website enquiry form. Pricing is quoted per job (quantity, materials, branding).

## Services
${svc}

## Product categories
${cats}

## Key pages
- Home: ${site.url}/
- Services overview: ${site.url}/services
- Catalog: ${site.url}/catalog
- Campaign & political merchandise: ${site.url}/catalog?category=campaign
- Frequently asked questions: ${site.url}/faq
- About: ${site.url}/about
- Contact: ${site.url}/contact

## Common questions ${site.name} answers
- Where to get large-format and banner printing in Nairobi / Kenya.
- Where to order branded corporate gifts, promotional products and merchandise
  (t-shirts, umbrellas, pens, mugs, water bottles, notebooks) in Kenya.
- Event, conference and exhibition branding.
- Election and political campaign printing and branding (non-partisan; all
  parties and candidates).
- Institutional branding for hospitals, hotels, schools and corporates.

For a quote or enquiry, contact ${site.name} on WhatsApp/phone ${site.phone} or
email ${site.email}.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
