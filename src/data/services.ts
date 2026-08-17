import type { AppointmentService, Charge, SendInService, Service } from "@/types";

/**
 * Single source of truth for prices. Never type a rupee figure into JSX.
 *
 * ⚠️ EVERY PRICE BELOW IS A PLACEHOLDER from docs/01-brief.md. They are invented
 * and must be replaced with the client's real card before launch — this is
 * content gate B3, the one gate with no fallback. See docs/07-implementation-plan.md.
 *
 * `tamilName` is deliberately left undefined rather than guessed. README ground
 * rule 6: if a Tamil string appears it must be correct, checked by a native
 * reader. An absent Tamil name is fine; a wrong one is not.
 */
export const sendInServices: SendInService[] = [
  {
    kind: "send-in",
    slug: "pre-pleating-light",
    name: "Pre-pleating — cotton, georgette, chiffon",
    summary: "Pleats set to your height, pressed, and tacked so they hold through the day.",
    description:
      "Every saree is read before it is touched — weight, weave and drop — then pleated by hand to your height rather than a standard. Pressed, tacked at the waist, and left overnight to hold.",
    price: { from: 250, unit: "per-saree" },
    fabricGroup: "light",
    // "Same day" service, per docs/03: with us before 11am, +50%.
    turnaround: { standardHours: 48, expressHours: 8, expressSurchargePct: 50 },
    featured: true,
    image: "/assets/services/pre-pleating-light.webp",
  },
  {
    kind: "send-in",
    slug: "pre-pleating-silk",
    name: "Pre-pleating — silk, Kanjivaram, tissue",
    summary: "Heavier fabric, steam-set and given a slower hold.",
    description:
      "Silk holds a crease for months and punishes a wrong one, so it is steamed rather than pressed hot and given a longer set. Kanjivaram and tissue are handled on their own table.",
    price: { from: 500, unit: "per-saree" },
    fabricGroup: "silk",
    turnaround: { standardHours: 48, expressHours: 8, expressSurchargePct: 50 },
    featured: false,
    image: "/assets/services/pre-pleating-silk.webp",
  },
  {
    kind: "send-in",
    slug: "fall-and-pico",
    name: "Fall & pico",
    summary: "Fall stitched straight, edges piped clean.",
    description:
      "The fall is stitched to sit flat and square along the hem, and the raw edges are piped so they stop fraying. The part nobody sees and everybody notices.",
    price: { from: 200, unit: "per-saree" },
    fabricGroup: "specialty",
    turnaround: { standardHours: 48, expressHours: 24 },
    featured: false,
    image: "/assets/services/fall-and-pico.webp",
  },
  {
    kind: "send-in",
    slug: "kuchu",
    name: "Kuchu & tassels",
    summary: "Hand-knotted pallu tassels. Pick your thread, pick your bead.",
    description:
      "Tassels are knotted onto the pallu by hand, in the thread and bead you choose. Density and length are set to the weight of the saree so the pallu still falls correctly.",
    // The range is why Price exists. A bare `from` would drop the ₹900 ceiling.
    price: { from: 400, to: 900, unit: "per-saree" },
    fabricGroup: "specialty",
    turnaround: { standardHours: 96, expressHours: 48 },
    featured: true,
    image: "/assets/services/kuchu.webp",
  },
  {
    kind: "send-in",
    slug: "ready-to-wear",
    name: "Ready-to-wear conversion",
    summary: "Saree stitched into a step-in, zip-fastened drape.",
    description:
      "The saree is cut and stitched into a step-in drape with a concealed zip, so it goes on like a skirt and the pleats never need setting again. Irreversible — we confirm before cutting.",
    price: { from: 1200, unit: "per-saree" },
    fabricGroup: "specialty",
    // TODO(launch): not in the turnaround table in docs/03. Confirm with client.
    turnaround: { standardHours: 120 },
    featured: false,
    image: "/assets/services/ready-to-wear.webp",
  },
  {
    kind: "send-in",
    slug: "bridal-package",
    name: "Bridal / occasion package",
    summary: "Pleating, fall & pico, kuchu, garment bag, on-time delivery.",
    description:
      "Everything the saree needs in one booking, scheduled backwards from the function date. Photographed on arrival and on dispatch, and returned in a garment bag.",
    price: { from: 1800, unit: "per-order" },
    fabricGroup: "specialty",
    turnaround: { standardHours: 120 }, // express on request
    featured: false,
    image: "/assets/services/bridal-package.webp",
  },
];

/**
 * Draping — we come to you and drape the saree on the day.
 *
 * ⚠️ NO PRICES YET. Every one of these is `price: null`, which renders as
 * "On request". Do not fill them in with a guess: draping is quoted on the
 * number of people, the venue and the date, and a wrong figure on a bridal
 * booking is a refund conversation.
 *
 * The client's own description of this line was written for search engines —
 * "professional", "elegant", "beautiful", "perfectly styled". docs/01-brief.md
 * bans exactly those words and says why: specificity is the entire trust
 * strategy, and "nine pleats, set overnight" does more work than any adjective.
 * The search terms it was reaching for (bridal, wedding, reception, party,
 * traditional) are all still here — in the names, the descriptions and the page
 * metadata, where they count — but the sentences are written to be read by a
 * bride, not crawled by Google.
 */
export const drapingServices: AppointmentService[] = [
  {
    kind: "appointment",
    slug: "bridal-draping",
    name: "Bridal saree draping",
    summary: "The bridal saree, draped on you on the morning, pleat by pleat.",
    description:
      "A bridal drape is set on the person, not on a hanger — pleats counted, pallu pinned to hold through a long day of standing, sitting and photographs. We come to the venue or the house and allow enough time that nobody is rushing.",
    price: null,
    where: "Your venue or your home",
    durationMins: 45,
    covers: "The bride",
    featured: true,
    image: "/assets/services/bridal-draping.webp",
  },
  {
    kind: "appointment",
    slug: "wedding-reception-draping",
    name: "Wedding & reception draping",
    summary: "Draping for the family and the guests, several people in one booking.",
    description:
      "Muhurtham, reception, mehendi — whoever needs draping gets it, one after another at the venue. Tell us how many people and what time the function starts, and we work backwards from that.",
    price: null,
    where: "Your venue",
    covers: "Family and guests, several per booking",
    featured: false,
    image: "/assets/services/wedding-reception-draping.webp",
  },
  {
    kind: "appointment",
    slug: "party-occasion-draping",
    name: "Party & festival draping",
    summary: "One saree, one occasion, draped and pinned to last the evening.",
    description:
      "For a party, a festival, or an office function. Pick a traditional Tamil drape, a Nivi, or a style you have seen and want copied — bring a photograph and we will match it.",
    price: null,
    where: "Your home or the studio",
    durationMins: 30,
    covers: "One person",
    featured: false,
    image: "/assets/services/party-occasion-draping.webp",
  },
];

/**
 * Not services: no turnaround, no /services block, and these must never appear
 * in the service select on /book.
 */
export const charges: Charge[] = [
  {
    slug: "pickup-chennai",
    name: "Pickup & delivery",
    price: { from: 80, unit: "per-order", note: "Free above ₹800" },
    appliesTo: "Doorstep both ways, anywhere in Chennai",
  },
  {
    slug: "courier-tamilnadu",
    name: "Courier",
    price: { from: 0, unit: "per-order", note: "At actuals" },
    appliesTo: "Insured two-way, rest of Tamil Nadu",
  },
];

/**
 * Everything the business sells, in one list. Draping first: the logo leads
 * with "Saree Draping & Pre-Pleating Service", and a bridal booking is worth
 * many times a ₹250 pleating job.
 */
export const services: Service[] = [...drapingServices, ...sendInServices];

/** Exactly three, for the home page preview. */
export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Narrowing helpers, so callers do not hand-roll the discriminant check. */
export const isSendIn = (s: Service): s is SendInService => s.kind === "send-in";
export const isAppointment = (s: Service): s is AppointmentService =>
  s.kind === "appointment";
