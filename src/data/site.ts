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
