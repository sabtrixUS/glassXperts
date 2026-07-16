import type { Metadata } from "next";

const searchSiteUrl = "https://sabtrixus.github.io/glassXperts";
const commercialUrl = `${searchSiteUrl}/commercial/`;
const commercialImage = `${searchSiteUrl}/assets/commercial-emergency-storefront.jpg`;

export const metadata: Metadata = {
  title: "Commercial Glass Repair Atlanta, GA",
  description: "Commercial glass repair and replacement in Atlanta for storefronts, entry doors, office partitions and curtain walls. Call for commercial glass emergencies.",
  keywords: [
    "commercial glass repair Atlanta",
    "storefront glass repair Atlanta",
    "emergency commercial glass Atlanta",
    "commercial glass replacement Atlanta",
    "storefront door repair Atlanta",
    "office glass partitions Atlanta",
    "curtain wall glass Atlanta",
  ],
  alternates: {
    canonical: commercialUrl,
    languages: { "en-US": commercialUrl },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: commercialUrl,
    siteName: "GlassXperts",
    title: "Commercial Glass Repair & Storefront Replacement in Atlanta",
    description: "Business-only storefront glass, commercial doors, office partitions and emergency glass response across Metro Atlanta.",
    images: [{ url: commercialImage, width: 1920, height: 1280, alt: "Broken commercial storefront glass requiring emergency repair in Atlanta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Glass Repair Atlanta | GlassXperts",
    description: "Storefront glass repair, commercial doors and emergency glass replacement across Metro Atlanta.",
    images: [commercialImage],
  },
};

export default function CommercialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
