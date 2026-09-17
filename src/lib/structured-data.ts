import { site } from "@/lib/site";

/**
 * Central JSON-LD builders. Every graph node uses a stable `@id` so search
 * engines and AI systems can resolve one consistent Hensa Solutions entity
 * across pages instead of many disconnected copies.
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const BUSINESS_ID = `${site.url}/#localbusiness`;

export function organizationNode() {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.seoDescription,
    logo: { "@type": "ImageObject", url: site.logo },
    image: site.logo,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    knowsAbout: [
      "Large format printing",
      "Banner printing",
      "Corporate branding",
      "Corporate gifts",
      "Promotional products",
      "Branded merchandise",
      "Event and conference branding",
      "Election and campaign branding",
      "Screen printing",
      "Embroidery",
    ],
    ...(site.social.length ? { sameAs: site.social } : {}),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.seoDescription,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-KE",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/catalog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Site-wide graph injected once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}

/** ItemList for a category/subcategory page (helps rich results + AI systems
 *  understand the collection). Capped to keep the HTML lean. */
export function catalogItemListNode(opts: {
  name: string;
  path: string;
  items: { name: string; slug: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: `${site.url}${opts.path}`,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.slice(0, 60).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${site.url}/product/${p.slug}`,
    })),
  };
}

export function faqNode(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceNode(opts: {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: `${site.url}/services/${opts.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    audience: {
      "@type": "Audience",
      audienceType:
        "Businesses, institutions, hotels, hospitals, NGOs, schools and political campaigns in Kenya",
    },
  };
}

/** BUSINESS_ID kept for future use (e.g. a dedicated contact/LocalBusiness page). */
export { ORG_ID, WEBSITE_ID, BUSINESS_ID };
