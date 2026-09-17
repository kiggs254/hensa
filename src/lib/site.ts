export const site = {
  name: "Hensa Solutions",
  legalName: "Hensa Solutions",
  tagline: "Printing, Branding, Corporate, Conference & Promotional Gifts",
  description:
    "The leading branding agency based in Nairobi, Kenya. We create and develop brands for businesses across East Africa and clients worldwide — printing, branding and advertising.",
  /** the canonical one-sentence positioning used across metadata + structured data */
  seoDescription:
    "Hensa Solutions is a Nairobi-based printing and promotional branding company providing large-format printing, corporate gifts, branded merchandise, event branding and promotional products to businesses, institutions and organizations across Kenya, East Africa and worldwide.",
  url: "https://www.hensa.co.ke",
  phone: "+254 721 597714",
  phoneHref: "tel:+254721597714",
  email: "info@hensa.co.ke",
  whatsappNumber: "254721597714",
  address: "Mfangano Street, Rumwe Farm Co-op Hse, Opposite KNUT Headquarters",
  streetAddress: "Mfangano Street, Rumwe Farm Co-op House (opposite KNUT Headquarters)",
  postal: "P.O. Box 77873-00610, Nairobi, Kenya",
  city: "Nairobi",
  region: "Nairobi County",
  country: "KE",
  hours: "Mon – Sat · 8:00am – 6:00pm",
  /** approximate Nairobi CBD coordinates — refine with the exact Google Business Profile pin */
  geo: { lat: -1.2841, lng: 36.8256 },
  areaServed: [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Kenya",
    "East Africa",
    "Worldwide",
  ],
  /** add real profile URLs here — they feed Organization.sameAs for entity recognition */
  social: [] as string[],
  logo: "https://www.hensa.co.ke/logo.png",
};

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const generalEnquiry = waLink(
  "Hello Hensa Solutions! 👋 I'd like to make an enquiry."
);
