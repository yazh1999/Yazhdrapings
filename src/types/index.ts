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

/**
 * The business runs two models, and they do not share fields.
 *
 *   send-in     — the saree comes to us, is worked on, and goes back. Has a
 *                 fabric group and a turnaround. This is pre-pleating, fall &
 *                 pico, kuchu.
 *   appointment — we come to you and drape the saree on the day. Has a place
 *                 and a duration; a turnaround is meaningless for it.
 *
 * Modelling both with one flat shape would mean optional fields everywhere and
 * a `turnaround` on bridal draping that no one can answer. A discriminated
 * union makes the compiler enforce which fields belong to which.
 */
export type ServiceKind = "send-in" | "appointment";

interface ServiceBase {
  slug: string;
  name: string;
  tamilName?: string; // must be proofread by a native reader before launch
  summary: string; // one line, for cards
  description: string; // two sentences, for /services
  /** Null means "on request" — never invent a figure to fill this. */
  price: Price | null;
  featured: boolean; // exactly three — the home page preview
  image: string;
}

export interface SendInService extends ServiceBase {
  kind: "send-in";
  fabricGroup: FabricGroup;
  turnaround: Turnaround;
}

export interface AppointmentService extends ServiceBase {
  kind: "appointment";
  /** Where it happens — venue, home, studio. */
  where: string;
  /** Rough time to allow, so a bride can plan the morning around it. */
  durationMins?: number;
  /** How many people one booking covers. */
  covers?: string;
}

export type Service = SendInService | AppointmentService;

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

export interface HeroImageSource {
  src: string;
  width: number;
  height: number;
}

export interface HeroImageConfig {
  enabled: boolean;
  desktop: HeroImageSource;
  /** Optional portrait crop. Null means one file serves every size. */
  mobile: HeroImageSource | null;
  alt: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  area: string;
}
