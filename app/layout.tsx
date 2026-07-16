import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import AnalyticsEvents from "./analytics-events";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frameless Shower Doors Atlanta | GlassXperts",
  description:
    "Custom frameless shower doors and professional glass installation in Metro Atlanta. Free in-home measurement, same-week service and a 5-year warranty.",
  other: {
    "codex-preview": "development",
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
