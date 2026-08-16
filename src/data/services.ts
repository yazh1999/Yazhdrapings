import type { Charge, Service } from "@/types";

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
export const services: Service[] = [
  {
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
    image: "/images/services/pre-pleating-light.webp",
  },
  {
    slug: "pre-pleating-silk",
    name: "Pre-pleating — silk, Kanjivaram, tissue",
    summary: "Heavier fabric, steam-set and given a slower hold.",
    description:
      "Silk holds a crease for months and punishes a wrong one, so it is steamed rather than pressed hot and given a longer set. Kanjivaram and tissue are handled on their own table.",
    price: { from: 500, unit: "per-saree" },
    fabricGroup: "silk",
    turnaround: { standardHours: 48, expressHours: 8, expressSurchargePct: 50 },
    featured: false,
    image: "/images/services/pre-pleating-silk.webp",
  },
  {
    slug: "fall-and-pico",
    name: "Fall & pico",
    summary: "Fall stitched straight, edges piped clean.",
    description:
      "The fall is stitched to sit flat and square along the hem, and the raw edges are piped so they stop fraying. The part nobody sees and everybody notices.",
    price: { from: 200, unit: "per-saree" },
    fabricGroup: "specialty",
    turnaround: { standardHours: 48, expressHours: 24 },
    featured: true,
    image: "/images/services/fall-and-pico.webp",
  },
  {
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
    image: "/images/services/kuchu.webp",
  },
  {
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
    image: "/images/services/ready-to-wear.webp",
  },
  {
    slug: "bridal-package",
    name: "Bridal / occasion package",
    summary: "Pleating, fall & pico, kuchu, garment bag, on-time delivery.",
    description:
      "Everything the saree needs in one booking, scheduled backwards from the function date. Photographed on arrival and on dispatch, and returned in a garment bag.",
    price: { from: 1800, unit: "per-order" },
    fabricGroup: "specialty",
    turnaround: { standardHours: 120 }, // express on request
    featured: false,
    image: "/images/services/bridal-package.webp",
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

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
