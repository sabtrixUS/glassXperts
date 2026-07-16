const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/FjfyTuO1vncfCoNQiCIM/webhook-trigger/d892b50d-d6a2-4b72-beb5-5965e400fa24";

type FormValue = string | boolean;

export async function sendLead(
  form: HTMLFormElement,
  extraFields: Record<string, FormValue>,
) {
  const formData = new FormData(form);
  const payload: Record<string, FormValue> = { ...extraFields };

  formData.forEach((value, key) => {
    if (typeof value === "string") payload[key] = value.trim();
  });

  payload.page_url = window.location.href;
  payload.submitted_at = new Date().toISOString();

  const query = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"].forEach(
    (key) => {
      const value = query.get(key);
      if (value) payload[key] = value;
    },
  );

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
  } finally {
    window.clearTimeout(timeout);
  }
}
