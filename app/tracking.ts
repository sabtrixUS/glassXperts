export const GOOGLE_ADS_ID = "AW-17481704683";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const pageDetails = () => ({
  page_path: window.location.pathname,
  page_title: document.title,
});

export function trackPhoneCall(ctaLabel: string) {
  if (typeof window === "undefined") return;
  const details = { ...pageDetails(), contact_method: "phone", cta_label: ctaLabel };
  window.fbq?.("track", "Contact", details);
  window.gtag?.("event", "phone_call_click", {
    send_to: GOOGLE_ADS_ID,
    event_category: "contact",
    ...details,
  });
}

export function trackFormLead(formType: "residential_quote" | "commercial_quote") {
  if (typeof window === "undefined") return;
  const details = { ...pageDetails(), form_type: formType, lead_source: "website" };
  window.fbq?.("track", "Lead", details);
  window.gtag?.("event", "generate_lead", {
    send_to: GOOGLE_ADS_ID,
    event_category: "conversion",
    ...details,
  });
}

export {};
