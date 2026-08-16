import type { HeroImageConfig } from "@/types";

// Single source of truth for NAP, socials and every headline number.
// NAP must be byte-identical here, on Google Business Profile, on Instagram
// and on Justdial — docs/04-architecture.md, local SEO.

export const site = {
  name: "Yazh Drapings",
  tamilName: "யாழ்",
  tagline: "Saree pre-pleating and drape finishing. Chennai.",
  description:
    "Your saree comes back pleated, pressed and pinned — ready to wear in under a minute. Cotton to Kanjivaram, set by hand in Chennai.",

  // TODO(launch): replace with the real studio address before Google Business
  // Profile is claimed. NAP mismatches cost local ranking.
  address: {
    street: "[STREET]",
    locality: "[NEIGHBOURHOOD]",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "[PIN]",
    country: "IN",
  },

  hours: {
    weekdays: "Mon–Sat, 9am–7pm",
    sunday: "Sunday, pickup only",
  },

  serviceArea: "Chennai, and the rest of Tamil Nadu by insured courier",
} as const;

/**
 * Contact details come from the environment, not from source, so the same build
 * can run against a test number. Read through these helpers rather than touching
 * process.env in components.
 */
export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/**
 * Headline numbers. The trust strip and the /gallery headline both render from
 * here — that is what stops them disagreeing, which they did in the first draft
 * of the copy (2,400+ vs "two thousand").
 *
 * ⚠️ PLACEHOLDER: `sareesPleated` is unverified. It is a factual claim about the
 * business and the first number a customer reads. Confirm it with the client or
 * cut the item and run three. See docs/03-pages-and-copy.md.
 */
export const stats = {
  sareesPleated: 2400,
  standardTurnaroundHours: 48,
  handSetPct: 100,
  freePickupAbove: 800,
} as const;

/**
 * Hero background photograph.
 *
 * Set `enabled` to false to fall back to the CSS pleat field — that is also
 * what happens before any file exists, so a missing image can never show as a
 * broken one on the most important screen on the site.
 *
 * Regenerate the files from the branding banner with `npm run hero`.
 */
export const heroImage: HeroImageConfig = {
  enabled: true,

  /**
   * Generated from Branding.png by `npm run hero`. Native resolution — the
   * source is 1672px wide, under the 2400px a full-bleed desktop hero wants, so
   * it is soft on a 1440p display. Ask the client for a larger original.
   */
  desktop: { src: "/assets/hero/hero-desktop.webp", width: 1672, height: 941 },

  /**
   * No separate portrait crop yet. One is only worth adding when there is a
   * source big enough to cut it from — the saree occupies about 600px of the
   * current file, which would be upscaled and soft on a phone. Until then the
   * desktop file is positioned right so the drape, not the empty left panel,
   * is what fills a portrait screen.
   */
  mobile: null,

  // Decorative: the h1 beside it already says what the page is, and the image's
  // own baked-in text is covered by the scrim.
  alt: "",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
] as const;

export const footerLegal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/care-policy", label: "Care policy" },
] as const;
