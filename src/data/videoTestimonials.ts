/**
 * Client video testimonials (YouTube). Add a video by appending its 11-character
 * id from the share link (youtu.be/<id> or youtube.com/shorts/<id>; Shorts get
 * `vertical: true`). The first landscape entry is the one that plays first; the rest form the playlist beside it.
 */
export type VideoTestimonial = {
  id: string;
  title: string;
  /** Optional line under the title, e.g. the client's name and company. */
  caption?: string;
  /** YouTube Shorts (9:16). Shown as portrait cards below the featured video. */
  vertical?: boolean;
  /** Running time in seconds, shown on the card. */
  seconds?: number;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "L3wUHCCOHZY",
    title: "Client experience excellence",
    caption: "Real feedback from a corporate event we branded",
    seconds: 94,
  },
  {
    id: "eduiD07Y6kM",
    title: "Our work speaks. Our clients confirm.",
    caption: "Clients on working with Hensa Solutions",
    seconds: 56,
  },
  {
    id: "BrM6TPwxEw4",
    title: "Our partnership with JPIC Franciscans Africa",
    caption: "Working together since 2014",
    seconds: 160,
  },
  {
    id: "09_kGSyYzHM",
    title: "AIC Cure Children's Hospital of Kenya",
    caption: "Customer Service Week visit",
    vertical: true,
    seconds: 98,
  },
  {
    id: "8miXa5S-PIs",
    title: "Teltonika IoT Group Kenya",
    caption: "Customer Service Week visit",
    vertical: true,
    seconds: 103,
  },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@hensasolutions";
