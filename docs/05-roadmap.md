# 05 — Roadmap

Four phases. Ship at the end of Phase 2 if you have to — a live one-page site with a working
WhatsApp button earns more than a perfect site that launches three weeks later.

---

## Phase 1 — Foundation

- [ ] `create-next-app`, TypeScript, Tailwind v4, `src/` dir, App Router
- [ ] `globals.css` — the full `@theme` token block from `02-design-system.md`
- [ ] Fonts wired: Bodoni Moda, Manrope, Noto Serif Tamil, DM Mono
- [ ] `src/data/site.ts` — phone, WhatsApp, address, hours, socials
- [ ] `src/data/services.ts` — every service with its real price and both turnarounds
- [ ] `src/data/site.ts` — `stats` block; no headline number typed into JSX anywhere
- [ ] Tamil names collected for every service that has one, checked by a native reader
- [ ] `<Button>`, `<Section>`, `<Eyebrow>`, `<PleatDivider>`, `<PleatLoader>`
- [ ] `app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx` — cheap now, awkward to retrofit
- [ ] **Build the `.pleats` gradient and get it right.** Tune the band widths against a real
      photograph of a pleated saree until the rhythm reads correctly. Everything visual depends on this.
- [ ] Header, mobile nav, footer, `<WhatsAppBar>`
- [ ] Deploy to Vercel, connect the domain

**Done when:** an empty page renders with header, footer, a working WhatsApp button, and one
pleat divider that looks like fabric.

---

## Phase 2 — The page that sells

- [ ] Hero with the fan-open animation, plus the reduced-motion static state
- [ ] Trust strip
- [ ] Services preview — three cards, pleat-reveal hover
- [ ] Four-step process
- [ ] Why hand-set
- [ ] Testimonials
- [ ] Closing CTA
- [ ] `/book` form, Server Action, Resend wired, confirmation state
- [ ] Rate limit + honeypot + email-failure fallback on the Server Action
- [ ] `/contact` with map and hours
- [ ] `/pricing` — the full table. **Moved up from Phase 3, deliberately.**
- [ ] `/privacy`, `/terms`, `/care-policy`
- [ ] Consent banner, then analytics, `whatsapp_click` event firing

**Ship here.** Home + book + contact + pricing + the legal pages is a complete business.

**Why `/pricing` moved.** `01-brief.md` ranks stating prices openly as the fourth priority and says
plainly that hiding the price card *"loses the price-sensitive volume customer, who then never
messages at all."* Shipping without it contradicts the brief to save roughly an hour of work — the
table is a static render over `services.ts`, which Phase 1 already built. It is in the shipping cut.

**Why the legal pages moved.** `/privacy` is not a Phase 3 nicety. The moment the booking form
collects a mobile number and GA4 sets a cookie, a privacy notice is a legal obligation under the
DPDP Act 2023. It ships with the form or the form does not ship.

---

## Phase 3 — Depth

- [ ] `/services` — six full blocks
- [ ] `/gallery` — grid, filters, lightbox
- [ ] `/how-it-works` — long form with per-step photography
- [ ] `/about` — founder, studio, care policy
- [ ] `/faq` — `<details>` accordion
- [ ] All JSON-LD: LocalBusiness, Service, FAQPage, BreadcrumbList
- [ ] `sitemap.ts`, `robots.ts`, OG image, 404
- [ ] Google Business Profile claimed and filled

---

## Phase 4 — After launch

Only once real traffic exists.

- [ ] Instagram feed section on home
- [ ] Area landing pages (Adyar, T. Nagar, Velachery, Anna Nagar, OMR)
- [ ] Order status lookup by reference number
- [ ] Online payment (Razorpay) — only if WhatsApp payment becomes a bottleneck
- [ ] Tamil language toggle
- [ ] Move `services` / `faqs` / `gallery` into Sanity so the client edits without a developer
- [ ] Blog: saree care, fabric guides, how to measure your pleat length — long-tail SEO

---

## Photography brief

The site's credibility is photographic, and it's the one thing code can't fix. Shoot before Phase 3:

- 20–30 finished sarees, folded and pleated, on a plain ivory or ink surface
- Close crops of the fold stack, where the light-and-shadow of the pleat is the subject
- Hands at work — measuring, pressing, tying kuchu
- The studio, and the founder
- One photograph per process step
- Natural light, no flash, consistent white balance across the set

Deliver at 2400px on the long edge, WebP, uncropped. **Zero stock photography.**

---

## Definition of done

- Every **blocking** item in the `04-architecture.md` quality gate checked — no exceptions
- Every quality item checked, or logged as known with a date against it
- Zero `PLACEHOLDER` markers left in the shipped copy
- Mobile Lighthouse ≥ 90 on all four categories
- Prices verified against the client's current card
- Tamil proofread by a native reader
- Tested on a real mid-range Android phone on mobile data, not just a desktop emulator
- A booking submitted from that phone arrives in the inbox and gets a WhatsApp reply

Going live is a separate checklist. See `06-production.md`.
