import { Resend } from "resend";
import type { BookingInput } from "@/lib/schemas";
import { getService } from "@/data/services";

/**
 * Booking notification. Server-only — RESEND_API_KEY must never carry the
 * NEXT_PUBLIC_ prefix, which would compile it into the browser bundle.
 */
export async function sendBookingEmail(data: BookingInput): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.BOOKING_INBOX;

  if (!key || !from || !to) {
    // Loud in dev, and the caller still shows the customer the WhatsApp
    // fallback rather than pretending the booking landed.
    throw new Error(
      "Resend is not configured: set RESEND_API_KEY, RESEND_FROM and BOOKING_INBOX.",
    );
  }

  const service = getService(data.service);
  const whatsapp = data.whatsappSame ? data.mobile : data.whatsappNumber;

  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Mobile", data.mobile],
    ["WhatsApp", whatsapp ?? data.mobile],
    ["Service", service?.name ?? data.service],
    ["Fabric", data.fabric],
    ["Sarees", String(data.quantity)],
    ["Height", data.height || "Not given"],
    ["Needed by", data.neededBy],
    ["Area", data.area],
    ["Notes", data.notes || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:15px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#7d5b64">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table>`;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Pickup request — ${data.name}, ${service?.name ?? data.service}`,
    replyTo: `${data.name} <${to}>`,
    text,
    html,
  });

  // The SDK returns errors rather than throwing, so this has to be checked or
  // a failed send would look like a success.
  if (error) throw new Error(error.message);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
