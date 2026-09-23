/**
 * ⚠️  PLACEHOLDER CONTENT: REPLACE BEFORE GOING LIVE  ⚠️
 *
 * These are SAMPLE quotes written to demonstrate the layout. They are NOT real
 * client feedback and must be swapped for genuine testimonials (with the
 * client's permission) before this site is published.
 *
 * To update: edit the entries below. `featured: true` renders in the large dark
 * card; keep exactly one. Everything else flows into the grid.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** shown in the avatar circle; defaults to the initials of `name` */
  initials?: string;
  rating: number;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We needed 400 branded polos and notebooks for a countrywide staff rollout, with three weeks' notice. Hensa handled artwork, sizing and delivery to every branch, and the embroidery still looks sharp a year later.",
    name: "Sample Client",
    role: "Head of Operations · Financial services",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "The pop-up banners and backdrop arrived a day early and set up in minutes. Our stand was easily the most visible at the expo.",
    name: "Sample Client",
    role: "Marketing Lead · Events",
    rating: 5,
  },
  {
    quote:
      "They redrew our old logo, then put it on everything from mugs to signage. Finally, one consistent look across the whole company.",
    name: "Sample Client",
    role: "Director · Hospitality group",
    rating: 5,
  },
  {
    quote:
      "Quoted on WhatsApp within the hour, delivered to Kisumu in three days. The engraved awards were exactly what we asked for.",
    name: "Sample Client",
    role: "Programmes Manager · NGO",
    rating: 5,
  },
  {
    quote:
      "Reliable on the boring stuff too: receipt books, letterheads, staff IDs. Same quality every reorder, no chasing.",
    name: "Sample Client",
    role: "Administrator · Healthcare",
    rating: 5,
  },
];

export function initialsOf(t: Testimonial): string {
  if (t.initials) return t.initials;
  return t.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
