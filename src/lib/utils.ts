import type { Price, Turnaround } from "@/types";

/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * One formatter so the ₹ symbol, the Indian digit grouping and the range dash
 * are identical everywhere. en-IN groups as 1,80,000 rather than 180,000.
 */
export function formatPrice(price: Price | null): string {
  if (!price) return "On request";
  return price.to ? `${inr(price.from)}–${inr(price.to)}` : inr(price.from);
}

/**
 * "from ₹250" / "from ₹400–₹900" — the card and preview form.
 * A null price stays "On request" rather than becoming "from On request".
 */
export function formatPriceFrom(price: Price | null): string {
  return price ? `from ${formatPrice(price)}` : formatPrice(price);
}

/**
 * Turnaround in the brand's voice: name the day, not an adjective.
 * Anything inside a working day reads as "Same day" rather than "8 hrs".
 */
export function formatTurnaround(hours: number): string {
  if (hours <= 12) return "Same day";
  if (hours < 48) return `${hours} hrs`;
  const days = hours / 24;
  if (days === 2) return "48 hrs";
  return `${days} days`;
}

export function formatExpress(turnaround: Turnaround): string {
  if (!turnaround.expressHours) return "On request";
  const base = formatTurnaround(turnaround.expressHours);
  return turnaround.expressSurchargePct
    ? `${base} (+${turnaround.expressSurchargePct}%)`
    : base;
}
