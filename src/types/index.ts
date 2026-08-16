// Data model — docs/04-architecture.md

export type FabricGroup = "light" | "silk" | "specialty";

/**
 * Prices are a range, not a scalar. Kuchu is ₹400–₹900 and the price card has to
 * say so; a bare `priceFrom` drops the ceiling and /pricing ends up hardcoding
 * the real figure in JSX, which is the rule we are enforcing. Omit `to` for a
 * fixed price.
 */
export interface Price {
  from: number; // INR, rupees — never paise
  to?: number;
  unit: "per-saree" | "per-order";
  note?: string; // "free above ₹800", "at actuals"
}

/**
 * Two numbers plus a surcharge, because /how-it-works publishes a standard vs
 * express table and the express column differs per service.
 */
export interface Turnaround {
  standardHours: number;
  expressHours?: number; // omit where express is "on request"
  expressSurchargePct?: number;
}

export interface Service {
  slug: string;
  name: string;
  tamilName?: string; // must be proofread by a native reader before launch
  summary: string; // one line, for cards
  description: string; // two sentences, for /services
  price: Price;
  fabricGroup: FabricGroup;
  turnaround: Turnaround;
  featured: boolean; // exactly three — the home page preview
  image: string;
}

/**
 * Pickup, delivery and courier are charges, not services: no turnaround, no
 * /services block, and they must not appear in the service select on /book.
 * Modelling them as Services was the original mistake.
 */
export interface Charge {
  slug: "pickup-chennai" | "courier-tamilnadu";
  name: string;
  price: Price;
  appliesTo: string;
}

export type GalleryCategory =
  | "silk"
  | "cotton"
  | "georgette"
  | "bridal"
  | "kuchu";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string; // required — fabric + work done
  fabric: string;
  pleatCount?: number;
  service: string;
  category: GalleryCategory;
  width: number;
  height: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  area: string;
}
