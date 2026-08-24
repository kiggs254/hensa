import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import EnquiryProvider from "@/components/EnquiryProvider";
import JsonLd from "@/components/JsonLd";
import { siteGraph } from "@/lib/structured-data";
import { site } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Printing, Branding & Promotional Products in Nairobi, Kenya`,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  keywords: [
    "printing company Nairobi",
    "large format printing Kenya",
    "banner printing Kenya",
    "corporate gifts Nairobi",
    "promotional products Kenya",
    "branded merchandise Kenya",
    "corporate branding Nairobi",
    "event branding Kenya",
    "campaign printing Kenya",
    "Hensa Solutions",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    siteName: site.name,
    title: `${site.name} — Printing, Branding & Promotional Products in Nairobi`,
    description: site.seoDescription,
    url: site.url,
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Printing & Branding in Nairobi, Kenya`,
    description: site.seoDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${bricolage.variable} ${hanken.variable} ${plexMono.variable} min-h-full flex flex-col antialiased`}
      >
        <JsonLd data={siteGraph()} />
        <EnquiryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </EnquiryProvider>
      </body>
    </html>
  );
}
