/**
 * Mirrored into FAQPage structured data on /faq — docs/04-architecture.md.
 * Keep answers plain and specific; the brief makes specificity the trust strategy.
 */
export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How long do the pleats hold?",
    a: "Through a full day of wear, and usually several. Silk holds longest; chiffon and georgette are the first to relax.",
  },
  {
    q: "Do you pleat sarees you didn't sell?",
    a: "We don't sell sarees at all. We only pleat, finish and drape them.",
  },
  {
    q: "Do you come to the venue for draping?",
    a: "Yes. Bridal and reception draping happen where you are — the venue or the house — and we arrive early enough that nobody is rushing. Tell us the function time and we work backwards from it.",
  },
  {
    q: "What if my saree is damaged?",
    a: "Every saree is photographed on arrival and on dispatch. If we damage it, we cover repair or replacement. PLACEHOLDER — the exact insurance arrangement and its limit must be confirmed with the client and stated here before launch.",
  },
  {
    q: "How do you know my pleat length?",
    a: "We ask your height and your blouse-to-floor measurement when you book. If you're unsure, we'll talk you through measuring it.",
  },
  {
    q: "Can I get it the same day?",
    a: "Yes, for pre-pleating, at 50% extra, if it's with us before 11am.",
  },
  {
    q: "How far do you travel?",
    a: "PLACEHOLDER — the studio is in Gummidipoondi and the service area has not been confirmed. State the real radius for draping appointments and the courier area for send-in work before launch.",
  },
  {
    q: "How do I wash a pre-pleated saree?",
    a: "Dry clean only, and tell the cleaner it's pleated. A normal wash will drop the set and it'll need redoing.",
  },
  {
    q: "How do I pay?",
    a: "UPI, cash on delivery, or bank transfer. Nothing upfront.",
  },
];
