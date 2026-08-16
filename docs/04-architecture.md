# 04 — Technical Architecture

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16, App Router | Static generation for every marketing page; Server Actions handle the one form. **16, not 15** — see the version note below. |
| Language | TypeScript, strict | |
| Styling | Tailwind CSS v4 | `@theme` in CSS, no config file to drift from the design system |
| Icons | `lucide-react` | Import individually, never the barrel |
| Motion | `framer-motion` | Client components only — hero, cards, section reveals |
| Forms | `react-hook-form` + `zod` | Same schema validates client and server |
| Email | Resend | Booking notifications |
| Images | `next/image` + Vercel optimization | |
| Analytics | Vercel Analytics + Google Analytics 4 | Track WhatsApp clicks as a conversion event. **GA4 loads only after consent** — see `03-pages-and-copy.md`, Legal pages. Vercel Analytics is cookieless and loads unconditionally. |
| Hosting | Vercel | |

No CMS in v1. Content lives in typed files under `src/data/`. If the client needs to edit
independently later, move `services`, `faqs` and `gallery` into Sanity — the shapes are designed
to port cleanly.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, Header, Footer, WhatsAppBar
│   ├── page.tsx                # home
│   ├── globals.css             # @theme tokens, .pleats, base layer
│   ├── services/page.tsx
│   ├── pricing/page.tsx
│   ├── gallery/
│   │   ├── page.tsx
│   │   └── loading.tsx         # the one route slow enough to need its own
│   ├── how-it-works/page.tsx
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   ├── contact/page.tsx
│   ├── book/
│   │   ├── page.tsx
│   │   └── actions.ts          # "use server" — submitBooking
│   ├── privacy/page.tsx        # DPDP notice — required before launch
│   ├── terms/page.tsx
│   ├── care-policy/page.tsx
│   ├── loading.tsx             # <PleatLoader> — the six-bar state
│   ├── error.tsx               # "use client" — required by the App Router
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   └── opengraph-image.tsx
│
├── components/
│   ├── layout/     Header · MobileNav · Footer · WhatsAppBar · Section
│   ├── ui/         Button · Eyebrow · PleatDivider · PleatLoader · Input · Select · Accordion
│   ├── analytics/  Analytics · ConsentBanner   ← GA4 loads only after consent
│   ├── home/       Hero · TrustStrip · ServicesPreview · Steps · GalleryPreview
│   │               WhyHandSet · Testimonials · ClosingCTA
│   ├── gallery/    GalleryGrid · GalleryFilter · Lightbox
│   └── forms/      BookingForm · FormField · FormStatus
│
├── data/
│   ├── services.ts     ← single source of truth for prices
│   ├── faqs.ts
│   ├── gallery.ts
│   ├── testimonials.ts
│   └── site.ts         ← name, phone, WhatsApp, address, hours, socials, stats
│
├── lib/
│   ├── schemas.ts      zod — bookingSchema
│   ├── whatsapp.ts     buildWhatsAppUrl()
│   ├── seo.ts          metadata + JSON-LD builders
│   ├── analytics.ts    track() — no-ops until consent is given
│   ├── rate-limit.ts   in-memory IP bucket for the Server Action
│   ├── email.ts        Resend client + sendBookingEmail()
│   └── utils.ts        cn()
│
└── types/index.ts
```

**Client components, and only these:** `MobileNav`, `BookingForm`, `GalleryFilter`, `Lightbox`,
`ConsentBanner`, `error.tsx` (the App Router requires it), and the framer-motion reveal wrapper.
Everything else is a Server Component.

`Hero` is **not** on that list. The fan animation is a pure CSS keyframe (see `02-design-system.md`),
so the hero stays a Server Component and ships no JS. The only client-side touch is an optional
`animationend` listener to drop `will-change`, and that belongs in a tiny separate client component
wrapping nothing, not in the hero itself.

---

## Data shapes

```ts
// src/types/index.ts
export type FabricGroup = "light" | "silk" | "specialty";

/**
 * Prices are a range, not a scalar. Kuchu is ₹400–₹900 and the price card has to
 * say so; a bare `priceFrom` silently drops the ceiling and the /pricing table
 * ends up hardcoding the real figure in JSX, which is the rule we are trying to
 * enforce. `priceTo` omitted means a fixed price.
 */
export interface Price {
  from: number;           // INR, paise never
  to?: number;            // omit for a fixed price
  unit: "per-saree" | "per-order";
  note?: string;          // "free above ₹800", "at actuals"
}

/**
 * Turnaround is two numbers plus a surcharge, because /how-it-works publishes a
 * standard/express table and the express column differs per service — same day
 * for pre-pleating, 24 hrs for fall & pico, 48 hrs for kuchu.
 */
export interface Turnaround {
  standardHours: number;
  expressHours?: number;        // omit where express is "on request"
  expressSurchargePct?: number; // 50 for pre-pleating
}

export interface Service {
  slug: string;
  name: string;
  tamilName?: string;     // required before launch — see 05-roadmap.md
  summary: string;        // one line, for cards
  description: string;    // two sentences, for /services
  price: Price;
  fabricGroup: FabricGroup;
  turnaround: Turnaround;
  featured: boolean;      // exactly three true — the home page preview
  image: string;
}

/**
 * Pickup, delivery and courier are charges, not services: they have no
 * turnaround, no image, no /services block and must not appear in the service
 * select on /book. Modelling them as Services was the original mistake.
 */
export interface Charge {
  slug: "pickup-chennai" | "courier-tamilnadu";
  name: string;
  price: Price;
  appliesTo: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;            // required — fabric + work done
  fabric: string;
  pleatCount?: number;
  service: string;
  category: "silk" | "cotton" | "georgette" | "bridal" | "kuchu";
  width: number;
  height: number;
}
```

```ts
// src/data/site.ts — headline numbers live here, not in JSX
export const stats = {
  sareesPleated: 2400,      // ⚠️ PLACEHOLDER — verify with the client before launch
  standardTurnaroundHours: 48,
  handSetPct: 100,
  freePickupAbove: 800,
} as const;
```

**Every visible number derives from `data/`.** Prices and turnarounds from `services.ts`, headline
counts from `site.ts`. Never type a rupee figure or a count into JSX — the trust strip and the
`/gallery` headline both render `stats.sareesPleated`, which is what stops them disagreeing the way
they did in the first draft of `03-pages-and-copy.md`.

Format money through one helper so the ₹ symbol, the grouping and the range dash are consistent:

```ts
// src/lib/utils.ts
export function formatPrice(p: Price): string {
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return p.to ? `${inr(p.from)}–${inr(p.to)}` : inr(p.from);
}
```

---

## WhatsApp deep links

```ts
// src/lib/whatsapp.ts
const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;

export function buildWhatsAppUrl(context?: string) {
  const text = context
    ? `Hi Yazh Drapings, I'd like to ask about ${context}.`
    : `Hi Yazh Drapings, I'd like to book a saree pre-pleating.`;
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}
```

Every service card passes its own name as `context`, so the message arrives pre-written and the
enquiry is already qualified. Fire a `whatsapp_click` analytics event on every one.

---

## Booking form

Server Action, shared zod schema, progressive enhancement — it submits without JS.

```ts
// src/lib/schemas.ts
import { z } from "zod";

const mobile = z
  .string()
  .transform((s) => s.replace(/[\s-]/g, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile number"));

export const bookingSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name"),
    mobile,
    // Unchecked checkboxes are absent from FormData, so the default is false and
    // the UI ships it checked. Do not use z.boolean() — FormData values are strings.
    whatsappSame: z.coerce.boolean().default(false),
    whatsappNumber: z.union([mobile, z.literal("")]).optional(),
    service: z.string().min(1, "Choose a service"),
    fabric: z.enum(["cotton","silk","georgette","chiffon","organza","unsure"]),
    quantity: z.coerce.number().int().min(1, "At least one").max(20, "Twenty at a time, maximum"),
    height: z.string().optional(),
    neededBy: z.string().min(1, "Choose a date"),
    area: z.string().trim().min(2, "Which part of Chennai?"),
    notes: z.string().max(500).optional(),
    // Absent when the field is stripped by a bot, so .optional() — a required
    // honeypot rejects legitimate submissions from anything that drops hidden inputs.
    honeypot: z.string().max(0).optional(),
  })
  // A different WhatsApp number is required only when the box is unchecked.
  .refine((d) => d.whatsappSame || (d.whatsappNumber && d.whatsappNumber.length === 10), {
    message: "Enter the WhatsApp number, or tick that it is the same",
    path: ["whatsappNumber"],
  })
  // Validate the date server-side too. A client-side `min` attribute is a hint,
  // not a constraint, and this one carries an operational promise.
  .refine(
    (d) => {
      const wanted = new Date(`${d.neededBy}T00:00:00+05:30`);
      const earliest = new Date();
      earliest.setHours(0, 0, 0, 0);
      earliest.setDate(earliest.getDate() + 2);
      return !Number.isNaN(wanted.getTime()) && wanted >= earliest;
    },
    { message: "We need at least two days. Message us on WhatsApp if it is urgent.", path: ["neededBy"] },
  );

export type BookingInput = z.infer<typeof bookingSchema>;
```

```ts
// src/app/book/actions.ts
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
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return { ok: false, message: "Too many requests. Message us on WhatsApp instead." };
  }

  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  // Silently accept the honeypot catch so the bot sees a success.
  if (formData.get("honeypot")) return { ok: true };

  try {
    await sendBookingEmail(parsed.data);
  } catch (err) {
    // The customer must never lose a filled form to our email provider being down.
    console.error("booking email failed", err);
    return {
      ok: false,
      message: "We could not send that. Try again, or message us on WhatsApp — we will see it there.",
    };
  }

  return { ok: true };
}
```

Wire the UI with `useActionState`. On success, replace the form with the confirmation message —
don't leave a filled form sitting there.

**Three things the original version got wrong, and why they matter here.**

1. **A failed email silently returned success.** `await sendBookingEmail()` outside a `try` throws
   past the return, the user sees an error boundary, and the booking is gone. The single most
   expensive bug this site could ship — every lost form is a lost customer who already decided to
   buy. Catch, log, and tell them the WhatsApp fallback.
2. **Rate limiting was deferred to "if spam becomes a problem."** By then the inbox is unusable and
   the Resend quota is spent. A ten-line in-memory bucket — 5 submissions per IP per hour — costs
   nothing. It resets on deploy and on cold start, which is fine at this volume; move to Upstash
   Redis only if that stops being true.
3. **The honeypot returned an error.** Returning a validation failure tells the bot exactly which
   field tripped it. Return success and drop the submission.

**Also send the customer a confirmation email** if they gave one — but the form has no email field,
so the confirmation is the on-screen message plus the WhatsApp reply within 2 hours. That promise is
in the success copy; make sure someone is actually watching the inbox during stated hours before it
goes live.

---

## SEO

Per-page `metadata` exports. Titles follow `{Page} | Yazh Drapings — Saree Pre-Pleating in Chennai`.

**Structured data** — inject as JSON-LD in `layout.tsx` and the relevant pages:

- `LocalBusiness` with `address`, `geo`, `openingHours`, `telephone`, `priceRange: "₹₹"`
- `Service` for each entry in `services.ts`
- `FAQPage` on `/faq`
- `BreadcrumbList` on every page below root

**Local SEO checklist**

- Google Business Profile claimed, category *Tailor*, service area = Chennai. This drives more
  traffic than the site itself in month one.
- NAP (name, address, phone) identical on site, GBP, Instagram, and Justdial.
- Target phrases: *saree pre pleating Chennai*, *ready to wear saree Chennai*, *saree pleating
  near me*, *bridal saree pleating*, *fall and pico Chennai*.
- One location page per major area later (Adyar, T. Nagar, Velachery, Anna Nagar, OMR) if the
  budget allows — each targeting "saree pre pleating in {area}".
- `sitemap.ts` and `robots.ts` generated, submitted to Search Console.
- `opengraph-image.tsx` — pleat gradient with the wordmark, 1200×630, generated at build.

---

## Performance

Targets: LCP < 2.0s on 4G, CLS < 0.05, mobile Lighthouse ≥ 90.

- Hero is CSS only — no image to wait on. That's most of the LCP budget saved by design.
- Gallery images: WebP, `sizes` set per breakpoint, `loading="lazy"` below the fold,
  `blurDataURL` placeholders, explicit `width`/`height` so nothing shifts.
- Fonts: `next/font/google`, `display: "swap"`, preload display + body only. Tamil and mono load
  as needed.
- Import icons individually: `import { Phone } from "lucide-react"`.
- Keep framer-motion off the critical path — dynamic import the reveal wrapper.
- Budget: < 120KB JS on the home route.

## Quality gate before launch

**Blocking — the site does not go live without these.**

- [ ] Every `PLACEHOLDER` in `03-pages-and-copy.md` replaced with a verified fact, or the section cut
- [ ] Testimonials are real, with written consent on file — or the section is removed
- [ ] `/privacy` published, DPDP-compliant, with a working grievance contact
- [ ] `/terms` and `/care-policy` published and signed off by the client in writing
- [ ] GA4 does not fire before consent — verified in DevTools with the banner declined
- [ ] Prices verified against the client's current card
- [ ] Form submits with JS disabled, and a submission actually lands in `BOOKING_INBOX`
- [ ] Resend domain verified, SPF and DKIM passing, test mail not in spam
- [ ] WhatsApp link opens with the right prefilled message on a real Android device
- [ ] Someone is watching the booking inbox during the hours stated on `/contact`

**Quality — fix before launch, or log as known and dated.**

- [ ] Lighthouse ≥ 90 across all four categories on mobile
- [ ] Keyboard-only path through the booking form, focus visible throughout
- [ ] Contrast checked on every `--gold`, `--magenta` and `--rose`-on-`--sand` usage
- [ ] Every gallery image has descriptive alt text
- [ ] `loading.tsx`, `error.tsx` and `not-found.tsx` all styled
- [ ] Tamil strings proofread by a native reader — including every `Service.tamilName`
- [ ] Page zooms to 200% with no horizontal scroll
- [ ] Tested on a real mid-range Android on mobile data, not a desktop emulator
