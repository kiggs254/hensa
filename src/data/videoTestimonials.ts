/**
 * Client video testimonials (YouTube). Add a video by appending its 11-character
 * id from the share link (youtu.be/<id> or youtube.com/shorts/<id>; Shorts get
 * `vertical: true`). The first landscape entry is the featured one.
 */
export type VideoTestimonial = {
  id: string;
  title: string;
  /** Optional line under the title, e.g. the client's name and company. */
  caption?: string;
  /** YouTube Shorts (9:16). Shown as portrait cards below the featured video. */
  vertical?: boolean;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "eduiD07Y6kM",
    title: "Our work speaks. Our clients confirm.",
    caption: "Clients on working with Hensa Solutions",
  },
  {
    id: "09_kGSyYzHM",
    title: "AIC Cure Children's Hospital of Kenya",
    caption: "Customer Service Week visit",
    vertical: true,
  },
  {
    id: "8miXa5S-PIs",
    title: "Teltonika IoT Group Kenya",
    caption: "Customer Service Week visit",
    vertical: true,
  },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@hensasolutions";
