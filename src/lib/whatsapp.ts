import { contact } from "@/data/site";

/**
 * Every WhatsApp CTA passes its own context, so the message arrives pre-written
 * and the enquiry is already qualified — docs/04-architecture.md.
 *
 * The number is read at module scope in the original spec; here it goes through
 * `contact` so a missing env var degrades to a visible no-op in development
 * rather than producing a wa.me link to nowhere in production.
 */
export function buildWhatsAppUrl(context?: string): string {
  const text = context
    ? `Hi Yazh Drapings, I'd like to ask about ${context}.`
    : `Hi Yazh Drapings, I'd like to book a saree pre-pleating.`;

  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * True when the number is actually configured. Used to keep the persistent bar
 * from rendering a broken link in a preview deploy with no env vars set.
 */
export function hasWhatsApp(): boolean {
  return contact.whatsappNumber.length > 0;
}
