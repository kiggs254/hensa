/**
 * Written client testimonials. Only add genuine quotes, with the client's
 * permission. (The sample quotes used to build the layout were removed
 * 2026-10-11 because they were live as if real.)
 *
 * To update: add entries below. `featured: true` renders in the large dark
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

// Empty until Hensa sends real client quotes (with permission). While it is
// empty the written-testimonials section is hidden and only the video
// testimonials show. Example entry:
//   { quote: "…", name: "Jane Wanjiku", role: "Marketing Lead · Acme Ltd", rating: 5, featured: true },
export const testimonials: Testimonial[] = [];

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
