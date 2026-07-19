export const site = {
  name: "Hensa Solutions",
  tagline: "Printing, Branding, Corporate, Conference & Promotional Gifts",
  description:
    "The leading branding agency based in Nairobi, Kenya. We specialize in creating and developing brands for businesses in East Africa — printing, branding and advertising.",
  url: "https://www.hensa.co.ke",
  phone: "+254 721 597714",
  phoneHref: "tel:+254721597714",
  email: "info@hensa.co.ke",
  whatsappNumber: "254721597714",
  address: "Mfangano Street, Rumwe Farm Co-op Hse, Opposite KNUT Headquarters",
  postal: "P.O. Box 77873-00610, Nairobi, Kenya",
  hours: "Mon – Sat · 8:00am – 6:00pm",
};

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const generalEnquiry = waLink(
  "Hello Hensa Solutions! 👋 I'd like to make an enquiry."
);
