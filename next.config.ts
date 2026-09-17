import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=(), payment=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: "https", hostname: "media.e-biz.co.ke" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // "Shop" was renamed to "Catalog"; keep old links + bookmarks working.
    // Query strings (?category=, ?q=) are forwarded automatically.
    return [{ source: "/shop", destination: "/catalog", permanent: true }];
  },
};

export default nextConfig;
