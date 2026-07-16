import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import AnalyticsEvents from "./analytics-events";
import JsonLd from "./seo-schema";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const searchSiteUrl = "https://sabtrixus.github.io/glassXperts";
const primaryBusinessUrl = "https://myglassxperts.com/";
const socialImage = `${searchSiteUrl}/assets/les-dillard-buckhead-shower.jpg`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${searchSiteUrl}/`),
  title: {
    default: "Frameless Shower Doors Atlanta, GA | GlassXperts",
    template: "%s | GlassXperts Atlanta",
  },
  description:
    "Custom frameless shower doors, shower glass installation and replacement across Metro Atlanta. Free measurements, professional installers and a 5-year warranty.",
  applicationName: "GlassXperts",
  authors: [{ name: "GlassXperts", url: primaryBusinessUrl }],
  creator: "GlassXperts",
  publisher: "GlassXperts",
  category: "Glass installation services",
  keywords: [
    "frameless shower doors Atlanta",
    "glass shower door installation Atlanta",
    "custom shower glass Atlanta",
    "frameless shower enclosure Atlanta",
    "shower glass installation near me",
    "shower door replacement Atlanta",
    "custom glass shower doors Metro Atlanta",
  ],
  alternates: {
    canonical: `${searchSiteUrl}/`,
    languages: { "en-US": `${searchSiteUrl}/` },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${searchSiteUrl}/`,
    siteName: "GlassXperts",
    title: "Frameless Shower Doors Atlanta, GA | GlassXperts",
    description: "Custom frameless shower glass measured and professionally installed across Metro Atlanta. Request a free quote.",
    images: [{ url: socialImage, width: 1086, height: 1448, alt: "Custom frameless shower glass installed by GlassXperts in Buckhead, Atlanta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frameless Shower Doors Atlanta, GA | GlassXperts",
    description: "Custom frameless shower glass measured and professionally installed across Metro Atlanta.",
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
  other: {
    "codex-preview": "development",
    "geo.region": "US-GA",
    "geo.placename": "Atlanta",
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17481704683" strategy="afterInteractive" />
        <Script id="glassxperts-google-tag" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'AW-17481704683');
        `}</Script>
        <Script id="glassxperts-meta-pixels" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1197697655571082');
          fbq('init', '3473347556130932');
          fbq('track', 'PageView');
        `}</Script>
        <Script id="glassxperts-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,'clarity','script','syb4it4827');
        `}</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
          "@id": `${primaryBusinessUrl}#business`,
          name: "GlassXperts",
          alternateName: "Glass Pro X",
          url: primaryBusinessUrl,
          logo: "https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/689cf1c57cb236c888630dd5.png",
          image: socialImage,
          telephone: "+1-678-501-7753",
          priceRange: "$$",
          description: "Atlanta glass company specializing in custom frameless shower doors, shower glass installation, storefront glass, office glass and commercial glass replacement.",
          areaServed: ["Atlanta", "Norcross", "Buckhead", "Alpharetta", "Marietta", "Sandy Springs", "Roswell", "Dunwoody", "Decatur", "Peachtree Corners", "Duluth", "Johns Creek", "Suwanee", "Lawrenceville"].map((name) => ({ "@type": "City", name })),
          openingHoursSpecification: [{
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "18:00",
          }],
          contactPoint: [{
            "@type": "ContactPoint",
            telephone: "+1-678-501-7753",
            contactType: "customer service",
            areaServed: "US-GA",
            availableLanguage: ["English", "Spanish"],
          }],
          sameAs: [
            "https://www.instagram.com/glass_xperts",
            "https://facebook.com/myglassxperts",
            "https://www.youtube.com/@MyGlassxperts",
          ],
          knowsAbout: ["Frameless shower doors", "Custom shower glass", "Glass shower enclosures", "Storefront glass", "Commercial glass replacement", "Office glass partitions"],
        }} />
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1197697655571082&ev=PageView&noscript=1" alt="" />
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=3473347556130932&ev=PageView&noscript=1" alt="" />
        </noscript>
        <AnalyticsEvents />
        {children}
      </body>
    </html>
  );
}
