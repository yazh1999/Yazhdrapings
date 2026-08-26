"use server";

import { headers } from "next/headers";
import { bookingSchema } from "@/lib/schemas";
import { sendBookingEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export type BookingState =
  | { ok: true }
  | { ok: false; errors?: Record<string, string[]>; message?: string };

export async function submitBooking(
  _prev: BookingState | null,
  formData: FormData,
): Promise<BookingState> {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!rateLimit(ip)) {
    return {
      ok: false,
      message: "Too many requests just now. Message us on WhatsApp instead.",
    };
  }

  // Caught silently: returning an error would tell a bot which field tripped it.
  if (formData.get("honeypot")) return { ok: true };

  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await sendBookingEmail(parsed.data);
  } catch (err) {
    // The single most expensive bug this site could ship is a filled form lost
    // to our email provider being down. Never let it look like a success.
    console.error("booking email failed", err);
    return {
      ok: false,
      message:
        "We could not send that. Try again, or message us on WhatsApp — we will see it there.",
    };
  }

  return { ok: true };
}
