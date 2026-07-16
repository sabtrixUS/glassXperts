"use client";

import { useEffect } from "react";
import { trackPhoneCall } from "./tracking";

export default function AnalyticsEvents() {
  useEffect(() => {
    const trackTelephoneLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;
      trackPhoneCall(link.textContent?.trim().replace(/\s+/g, " ") || "Phone CTA");
    };

    document.addEventListener("click", trackTelephoneLink);
    return () => document.removeEventListener("click", trackTelephoneLink);
  }, []);

  return null;
}
