import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// A real 1200×630 branded Open Graph card, generated at build/request time so
// every page has a proper social preview without needing a design asset.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Printing, Branding & Promotional Products in Nairobi, Kenya`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf6ee",
          color: "#1c1a16",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              background: "#f0521d",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Printing, Branding &amp; Promotional Products
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#5b554a" }}>
            Nairobi, Kenya · Delivered countrywide &amp; worldwide
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <div style={{ color: "#33a02c", fontWeight: 700 }}>Enquire on WhatsApp</div>
          <div style={{ color: "#8a8375" }}>·</div>
          <div style={{ color: "#5b554a" }}>hensa.co.ke</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
