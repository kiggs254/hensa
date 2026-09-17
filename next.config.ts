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
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
  },
];

// Allow-list image hosts (never a bare "**"). The known media host is the
// default so images work on a fresh build; ops can add S3/CDN hosts via env
// (BACKEND_ORIGIN, NEXT_PUBLIC_MEDIA_ORIGIN, or comma-separated IMAGE_ALLOWED_HOSTS)
// without a code change.
type ImgPattern = {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
};

function imageRemotePatterns(): ImgPattern[] {
  const patterns: ImgPattern[] = [
    { protocol: "https", hostname: "media.e-biz.co.ke", pathname: "/**" },
  ];
  const seen = new Set(patterns.map((p) => `${p.protocol}|${p.hostname}|${p.port ?? ""}`));
  const add = (raw: string) => {
    const v = raw.trim();
    if (!v) return;
    try {
      if (v.includes("://")) {
        const u = new URL(v);
        const protocol = u.protocol.replace(":", "") as "http" | "https";
        const key = `${protocol}|${u.hostname}|${u.port}`;
        if (seen.has(key)) return;
        seen.add(key);
        patterns.push({ protocol, hostname: u.hostname, ...(u.port ? { port: u.port } : {}), pathname: "/**" });
      } else {
        const key = `https|${v}|`;
        if (seen.has(key)) return;
        seen.add(key);
        patterns.push({ protocol: "https", hostname: v, pathname: "/**" });
      }
    } catch {
      /* ignore a malformed host rather than fail the build */
    }
  };
  if (process.env.NEXT_PUBLIC_MEDIA_ORIGIN) add(process.env.NEXT_PUBLIC_MEDIA_ORIGIN);
  if (process.env.BACKEND_ORIGIN) add(process.env.BACKEND_ORIGIN);
  for (const h of (process.env.IMAGE_ALLOWED_HOSTS || "").split(",")) add(h);
  return patterns;
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    dangerouslyAllowSVG: false,
    remotePatterns: imageRemotePatterns(),
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
