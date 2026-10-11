/**
 * Client video testimonials (YouTube). Add a video by appending its 11-character
 * id from the share link (youtu.be/<id>). The first entry is the featured one.
 */
export type VideoTestimonial = {
  id: string;
  title: string;
  /** Optional line under the title, e.g. the client's name and company. */
  caption?: string;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "eduiD07Y6kM",
    title: "Our work speaks. Our clients confirm.",
    caption: "Clients on working with Hensa Solutions",
  },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@hensasolutions";
