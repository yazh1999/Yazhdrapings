# Yazh Drapings — Website

Marketing and booking site for **Yazh Drapings**, a saree pre-pleating and drape-finishing service.
Customers send a saree, we pleat, press, finish and return it ready to wear in under a minute.

**Stack:** Next.js 16 (App Router) · React 19.2 · Tailwind CSS v4 · TypeScript
**Primary conversion:** WhatsApp booking + a pickup request form
**Primary market:** Chennai first, rest of Tamil Nadu by courier

---

## Documentation

| File | What's in it |
|---|---|
| [`docs/01-brief.md`](docs/01-brief.md) | The business, the customer, what the site has to achieve |
| [`docs/02-design-system.md`](docs/02-design-system.md) | Palette, type scale, spacing, components, the pleat motif |
| [`docs/03-pages-and-copy.md`](docs/03-pages-and-copy.md) | Every page, section by section, with real copy |
| [`docs/04-architecture.md`](docs/04-architecture.md) | Folder structure, data model, forms, SEO, performance |
| [`docs/05-roadmap.md`](docs/05-roadmap.md) | Build order in four phases, with a definition of done |
| [`docs/06-production.md`](docs/06-production.md) | Going live: infra, env, legal, launch and day-2 operations |
| [`docs/07-implementation-plan.md`](docs/07-implementation-plan.md) | Task-level build order, dependencies, checkpoints, content gates |

Read `01` and `02` before writing any component. The palette and type scale are not suggestions —
every color in the codebase comes from the tokens in `02`.

---

## Quick start

The Next.js app is at the **repo root**, with `docs/` alongside it. Already scaffolded — just:

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev
```

Open http://localhost:3000

Feature dependencies are installed per milestone, not upfront:

```bash
npm install lucide-react framer-motion react-hook-form zod @hookform/resolvers resend
```

### Environment variables

Create `app/.env.local`. Everything marked **required** must be set before the first deploy.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✓ | `https://yazhdrapings.com` — no trailing slash. Used by `sitemap.ts`, canonical tags, OG. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✓ | `91XXXXXXXXXX` — country code, no `+`, no spaces |
| `NEXT_PUBLIC_PHONE` | ✓ | `+91XXXXXXXXXX` — display + `tel:` links |
| `NEXT_PUBLIC_INSTAGRAM` | ✓ | Full profile URL |
| `NEXT_PUBLIC_GA_ID` | ✓ | `G-XXXXXXXXXX`. Omit in dev to stop polluting analytics. |
| `RESEND_API_KEY` | ✓ | Server-only. Never prefix with `NEXT_PUBLIC_`. |
| `RESEND_FROM` | ✓ | `bookings@yazhdrapings.com` — must be a verified Resend domain |
| `BOOKING_INBOX` | ✓ | Where booking requests land |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | | Google Maps embed src for `/contact` |

`.env.local` is gitignored. The same set goes into Vercel → Settings → Environment Variables for
Production, Preview and Development. See [`docs/06-production.md`](docs/06-production.md).

### Scripts

| Command | Does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config — `next lint` was removed in 16) |
| `npx tsc --noEmit` | Type check |

---

## Deployment

Vercel. Push to `main` → production. Every PR gets a preview URL.
Point the apex domain and `www` at Vercel, keep `www` redirecting to apex.
Full runbook in [`docs/06-production.md`](docs/06-production.md).

---

## Ground rules

1. **No hardcoded hex values.** Use the CSS variables in `globals.css`.
2. **No hardcoded rupee figures or counts in JSX.** Prices come from `src/data/services.ts`,
   headline numbers from `src/data/site.ts`. If a number is visible on the site, it lives in `data/`.
3. **Server Components by default.** Add `"use client"` only for forms, the mobile nav, and the gallery lightbox.
4. **Every image through `next/image`** with an explicit `sizes`. Saree photography is heavy; unoptimized images will sink the mobile score.
5. **WhatsApp CTA is never more than one scroll away** on any page.
6. **Tamil is a first-class language in the brand,** not decoration. If a Tamil string appears, it must be correct — get it checked by a native reader before shipping.
7. **No invented facts.** Testimonials, order counts and years-in-business are marked `PLACEHOLDER`
   in the docs. They must be replaced with verified reality, not shipped as written.
