# 07 — Implementation Plan

`05-roadmap.md` says *what* ships in which phase. This says *how it gets built* — task by task, in
dependency order, with a testable done-condition for each.

**Estimate: ~13 working days of focused development**, about three calendar weeks once review and
client turnaround are allowed for. The ship gate is at the end of Milestone 2, day 9.

---

## How this is sequenced

Three tracks run in parallel, and only one of them is code:

| Track | Owner | Blocks what |
|---|---|---|
| **A — Build** | Developer | Everything below |
| **B — Content** | Client | Milestone 2 partially, Milestone 3 entirely |
| **C — Procurement** | You + client | Launch, not build |

**Track C starts on day 1, before a line of code.** Google Business Profile verification takes 1–2
weeks by postcard and Resend DNS takes up to 48 hours — both are pure waiting, both are invisible
until the day you need them, and neither is on the developer's critical path. See
`06-production.md` §1 and start them immediately.

The build is ordered so that **nothing is ever blocked on content**. Every section that needs a
photograph or a real testimonial has a defined fallback (§ Content gates). If the client is slow,
the site still ships — smaller, but complete and honest.

---

## Milestone 0 — Repo and pipeline

**0.5 days.** Deploy on day one, while there is nothing to debug. A broken pipeline discovered in
week three costs a day; discovered now it costs ten minutes.

| ID | Task | Files | Depends | Done when |
|---|---|---|---|---|
| 0.1 | Git repo, `.gitignore`, initial commit, push | root | — | `main` on GitHub with `docs/` committed |
| 0.2 | Scaffold Next.js at the **repo root** | root | 0.1 | `npm run dev` serves the starter |
| 0.3 | TS strict, `@/*` path alias | `tsconfig.json` | 0.2 | `npx tsc --noEmit` clean |
| 0.4 | Connect Vercel, first production deploy | — | 0.1–0.2 | Starter page live on a `.vercel.app` URL |
| 0.5 | Env vars set for Production / Preview / Development | Vercel dashboard | 0.4 | Build green; Preview has its own `BOOKING_INBOX` and no `NEXT_PUBLIC_GA_ID` |

### Milestone 0 status

| ID | Status | Note |
|---|---|---|
| 0.1 | ✅ Done | Repo initialised on `main`; docs committed. **No remote yet** — see below. |
| 0.2 | ✅ Done | Scaffolded at repo root. Next.js **16.3.1**, React 19.2.8, Tailwind v4. |
| 0.3 | ✅ Done | `strict: true`, `@/*` → `./src/*`. `tsc`, `eslint` and `next build` all green. |
| 0.4 | ⏸ Blocked | Needs a GitHub remote and Vercel account access. |
| 0.5 | ⏸ Blocked | Needs 0.4. `.env.example` is committed as the template. |

**Two deviations from the specs, both deliberate:**

1. **Next.js 16, not 15.** 16 is current stable; the docs were written when 15 was. The async
   `headers()` call in `04-architecture.md` is already correct for 16. Two Next 16 breaking changes
   touch planned work but do **not** affect us: async `params` on `opengraph-image` and async `id`
   on `sitemap` apply only to the dynamic `generateImageMetadata` / `generateSitemaps` variants, and
   ours are single static files. One that *does* apply: `images.qualities` now defaults to `[75]`
   only — fine for the gallery, but set it in `next.config.ts` before using any other quality value.
2. **App at the repo root, not `app/`.** A folder named `app/` containing `src/app/` is confusing,
   npm rejects the parent folder name as a package name, and root means Vercel needs no Root
   Directory setting. `docs/` sits alongside.

---

## Milestone 1 — Foundation

**3 days.** No page is built here. This is the layer every page is made of, and getting it wrong is
expensive to undo once thirty components depend on it.

| ID | Task | Files | Depends | Done when |
|---|---|---|---|---|
| 1.1 | `@theme` token block, verbatim from `02` | `src/app/globals.css` | 0.3 | `bg-rose` works, and the default palette is absent from the built CSS. `text-rose-600` is **not** a build error — Tailwind v4 drops unknown utilities silently — so `npm run check:tokens` is what actually enforces it. |
| 1.2 | Four fonts via `next/font/google` | `src/app/layout.tsx` | 1.1 | Bodoni, Manrope, Noto Serif Tamil, DM Mono all render; `display: "swap"`; no layout shift on reload |
| 1.3 | Type definitions | `src/types/index.ts` | 0.3 | `Price`, `Turnaround`, `Service`, `Charge`, `GalleryItem` compile |
| 1.4 | Site data + `stats` | `src/data/site.ts` | 1.3 | NAP, hours, socials, and the four trust-strip numbers, all typed |
| 1.5 | Services + charges | `src/data/services.ts` | 1.3 | 6 services, 2 charges, **exactly three `featured: true`**; kuchu carries a `to` price |
| 1.6 | `cn()` + `formatPrice()` | `src/lib/utils.ts` | 1.3 | `formatPrice` renders both `₹250` and `₹400–₹900` correctly, `en-IN` grouping |
| 1.7 | **The pleat gradient** | `src/app/globals.css` | 1.1 | See below — this one gets its own section |
| 1.8 | UI primitives | `src/components/ui/` | 1.7 | `Button` (3 variants, 48px min), `Section` (3 tones), `Eyebrow`, `PleatDivider` |
| 1.9 | Loading, error, 404 | `src/app/{loading,error,not-found}.tsx` | 1.8 | All three styled; `PleatLoader` bars animate on `transform`/`opacity` only |
| 1.10 | WhatsApp deep links | `src/lib/whatsapp.ts` | 1.4 | URL builds with and without `context`; text correctly encoded |
| 1.11 | Header, MobileNav, Footer, WhatsAppBar | `src/components/layout/` | 1.8, 1.10 | Present on every route; mobile nav opens/closes/traps focus |

### Milestone 1 status — all code tasks done

| ID | Status | Note |
|---|---|---|
| 1.1 | ✅ | Tokens in `globals.css`. Default palette verified absent from the built CSS. Enforced by `npm run check:tokens`, not by the build — see the row above. |
| 1.2 | ✅ | Bodoni Moda, Manrope, Noto Serif Tamil, DM Mono. Tamil and mono are `preload: false` — off the critical path. |
| 1.3 | ✅ | `Price`, `Turnaround`, `Service`, `Charge`, `GalleryItem`, `Testimonial`. |
| 1.4 | ✅ | `site`, `contact`, `stats`, `nav`. Studio address is a `TODO(launch)`. |
| 1.5 | ⚠️ | Six services, two charges, exactly three featured, kuchu carries `to: 900`. **Prices are the invented placeholders** — gate B3. `tamilName` left undefined rather than guessed. |
| 1.6 | ✅ | `formatPrice` renders `₹250` and `₹400–₹900` with `en-IN` grouping. |
| 1.7 | ⚠️ | Implemented per spec and rendering. **Not yet tuned against a reference photograph** — see below. |
| 1.8 | ✅ | `Button` ×3 variants, `Section` ×3 tones, `Eyebrow` (tone-aware for the sand contrast rule), `PleatDivider`. |
| 1.9 | ✅ | `PleatLoader` plus `loading.tsx`, `error.tsx`, `not-found.tsx`. |
| 1.10 | ✅ | Verified: builds a correct wa.me link with encoded context, and renders nothing when unconfigured. |
| 1.11 | ✅ | Header, MobileNav (Esc, scroll lock, focus return), Footer, WhatsAppBar. Skip link added. |

`npm run verify` — check:tokens, tsc, eslint, build — passes.

**One deviation worth recording.** `MobileNav` closes on navigation by adjusting state during
render rather than in a `useEffect`. React's set-state-in-effect lint rule rejects the effect
version, and the render-phase pattern also covers browser back/forward, which an onClick handler on
each link would miss.

### 1.7 — The pleat gradient, in detail

`05-roadmap.md` calls this out as the task everything visual depends on, and it is the one piece of
this build that cannot be copied from the spec and called done. The CSS in `02-design-system.md` is
a starting point, not an answer.

**Timebox it to half a day**, and work against a real photograph of a set saree on the second
monitor. Tune band widths and the gold/rose stop positions until the rhythm reads as fabric rather
than as a striped background. Check it at three sizes — a 6px card strip, a 2px divider, and the
full-bleed hero — because the same gradient has to survive all three.

**Done when:** held next to the reference photograph at arm's length on a phone, it reads as folds.
If half a day passes and it doesn't, stop and get a second opinion rather than continuing to tune —
that is a design decision surfacing, not a CSS problem.

> **Status: implemented, not tuned.** The spec values from `02-design-system.md` are in
> `globals.css` as `--pleat-gradient` and render correctly at all three sizes — the Checkpoint 1
> page at `/` deliberately shows the hero fan, the 2px divider and the 6px card strip together for
> exactly this comparison. What has not happened is the tuning pass, because it needs a photograph
> of a real set saree to judge against. **This is the open item blocking Checkpoint 1 sign-off.**

> **Checkpoint 1.** An empty page with real chrome: header, footer, a working WhatsApp button, and
> one pleat divider that looks like cloth. Show it to the client. This is the first moment the brand
> is visible and the cheapest moment to hear "that's not what I pictured."

---

## Milestone 2 — The page that sells

**5 days.** Home, the form, and everything legally required to take a booking. **This is the ship
gate** — at the end of this milestone the site is a complete business and can go live.

### Home page

| ID | Task | Files | Depends | Done when |
|---|---|---|---|---|
| 2.1 | Hero, CSS fan animation | `components/home/Hero.tsx` | 1.7 | Fans open once; `prefers-reduced-motion` renders the open state; **stays a Server Component** |
| 2.2 | Trust strip | `components/home/TrustStrip.tsx` | 1.4 | All four numbers render from `site.stats` — none typed into JSX |
| 2.3 | Services preview | `components/home/ServicesPreview.tsx` | 1.5, 1.8 | Three cards from `featured`; pleat strip slides in on hover **and on keyboard focus** |
| 2.4 | Four-step process | `components/home/Steps.tsx` | 1.8 | `01`–`04` in DM Mono, gold, oversized |
| 2.5 | Why hand-set | `components/home/WhyHandSet.tsx` | 1.8 | Asymmetric 5/7 split; fabric names in Bodoni italic |
| 2.6 | Testimonials | `components/home/Testimonials.tsx` | Content gate B2 | Renders real quotes, **or the section is absent** |
| 2.7 | Closing CTA | `components/home/ClosingCTA.tsx` | 1.8, 1.10 | Ink section, gold divider above, both CTAs live |
| 2.8 | Gallery preview | `components/home/GalleryPreview.tsx` | Content gate B1 | Six real images, **or the section is absent** |

### The booking form — the highest-value code on the site

| ID | Task | Files | Depends | Done when |
|---|---|---|---|---|
| 2.9 | Zod schema | `src/lib/schemas.ts` | 1.3 | All 12 fields; both `.refine()` rules; honeypot optional |
| 2.10 | Resend client + rate limiter | `src/lib/{email,rate-limit}.ts` | 0.5 | Test email lands in the real inbox, **not spam** |
| 2.11 | Form UI | `components/forms/` | 2.9, 1.8 | Labels above inputs; inline errors; conditional WhatsApp field; full keyboard path with visible focus |
| 2.12 | Server Action | `src/app/book/actions.ts` | 2.9, 2.10 | Submits **with JS disabled**; email failure returns the WhatsApp fallback, not a 500; honeypot returns success |

> 2.12 is where the money is. Test the failure path deliberately — put a bad `RESEND_API_KEY` in
> Preview and confirm the customer sees a useful message rather than an error boundary.

### Supporting pages and infrastructure

| ID | Task | Files | Depends | Done when |
|---|---|---|---|---|
| 2.13 | `/contact` | `src/app/contact/page.tsx` | 1.11 | Phone, WhatsApp, email, address, map, hours |
| 2.14 | `/pricing` | `src/app/pricing/page.tsx` | 1.5, 1.6 | Full table from `services.ts`; ranges and conditional charges render correctly |
| 2.15 | Legal pages ×3 | `src/app/{privacy,terms,care-policy}/page.tsx` | Content gate B3 | Published, dated, indexable; `/privacy` names every third party |
| 2.16 | Consent banner + analytics | `components/analytics/` | 2.15 | **Decline → zero GA4 requests in DevTools**; `whatsapp_click` fires on accept |
| 2.17 | SEO baseline | `lib/seo.ts`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` | 2.13–2.15 | Per-page metadata; sitemap lists real routes; OG image renders in a WhatsApp link preview |

> **Checkpoint 2 — the ship gate.** Run the full money-path test from `06-production.md` §4 on a real
> mid-range Android on mobile data. Every **blocking** item in the `04-architecture.md` quality gate
> is checked. `grep -rn "PLACEHOLDER" src/` returns nothing.
>
> The site can go live here. Milestone 3 is depth, and it is worth more once real traffic exists to
> tell you which parts of it matter.

---

## Milestone 3 — Depth

**4 days.** Heavily gated on photography — if Track B has not delivered, most of this cannot start,
which is exactly why the ship gate is before it and not after.

| ID | Task | Files | Depends | Done when |
|---|---|---|---|---|
| 3.1 | `/services` | `src/app/services/page.tsx` | 1.5, B1 | Six blocks, alternating sides, Tamil names present |
| 3.2 | `/faq` | `src/app/faq/page.tsx` | 1.8 | Native `<details>`, no JS, gold rules, chevron rotates |
| 3.3 | `/about` | `src/app/about/page.tsx` | B1, B4 | Founder photo and name, studio address, care policy summary linking `/care-policy` |
| 3.4 | Gallery data + grid | `data/gallery.ts`, `components/gallery/` | B1 | Masonry 2/3 cols; every image has real descriptive alt text |
| 3.5 | Gallery filter + lightbox | `components/gallery/` | 3.4 | Filter chips work; lightbox traps focus and closes on `Esc`; empty state renders |
| 3.6 | `/how-it-works` | `src/app/how-it-works/page.tsx` | B1 | Four long-form steps, one photo each, turnaround table from `services.ts` |
| 3.7 | Full JSON-LD | `src/lib/seo.ts` | 3.1, 3.2 | `LocalBusiness`, `Service` ×6, `FAQPage`, `BreadcrumbList` — all validate in Google's Rich Results Test |
| 3.8 | Google Business Profile filled | — | Track C | Verified, categorised *Tailor*, service area Chennai, NAP identical to the site |

> **Checkpoint 3.** Full quality gate, both tiers. Lighthouse ≥ 90 mobile on the production URL —
> run it *after* the gallery lands, since photography is how performance regresses.

---

## Content gates

Each of these blocks specific work. Each has a fallback so the build never stalls waiting.

| Gate | Needed for | If it isn't ready |
|---|---|---|
| **B1 — Photography** (20–30 images per the `05` brief) | 2.8, 3.1, 3.3, 3.4, 3.6 | Ship without the home gallery preview and defer `/gallery` and `/how-it-works` to post-launch. **Never substitute stock photography** — `01-brief.md` rules it out explicitly, and it destroys the trust strategy the whole site rests on. |
| **B2 — Three real testimonials + written consent** | 2.6 | **Cut the section.** Do not ship the invented ones. An absent section costs nothing; a fabricated customer is misleading advertising. |
| **B3 — Care policy, damage terms, real prices, signed off** | 2.14, 2.15 | **Hard block on launch.** There is no fallback — the site cannot take bookings without terms, and cannot state prices it hasn't confirmed. |
| **B4 — Founder photo, studio address, year founded** | 3.3 | Defer `/about`; it is not on the conversion path, though it does close bridal orders. |
| **B5 — Tamil names for services, native-reader proofread** | 1.5, 3.1 | Ship English-only names rather than guessed Tamil. `README.md` ground rule 6: if a Tamil string appears it must be correct. |

---

## Sequencing summary

```
Day  1   ██ M0  repo, scaffold, deploy        ← Track C starts today too
Day  2-4 ██████ M1  tokens, pleat, primitives, chrome
              └─ Checkpoint 1: brand visible
Day  5-9 ██████████ M2  home, form, pricing, legal, analytics, SEO
              └─ Checkpoint 2: SHIP GATE ── site can go live
Day 10-13 ████████ M3  services, gallery, faq, about, how-it-works, JSON-LD
              └─ Checkpoint 3: full quality gate
```

Launch itself is a separate half-day checklist — `06-production.md` §5. Not a Friday.

---

## Risks specific to the build

| Risk | Mitigation |
|---|---|
| The pleat gradient doesn't read as fabric | Timeboxed to half a day at 1.7, with an explicit stop-and-escalate rule. It gates the entire visual system, so failing fast matters more here than anywhere else. |
| Photography never arrives | Ship gate deliberately sits **before** the photography-dependent milestone. Say this to the client early and repeatedly. |
| Client edits prices after launch | They live in `services.ts` and need a deploy. Flag it at handover — if unacceptable, the Sanity migration moves from Phase 4 to Phase 3 and adds ~2 days. |
| Form works in dev, fails in production | 2.10 tests against the real inbox, and 0.4 proves the deploy pipeline on day one rather than day nine. |
| Scope creeps into Phase 4 items | `05-roadmap.md` gates all of them on real traffic existing. Hold that line. |

---

## Before I start, I need three things

1. **Photography status.** Does it exist, is it scheduled, or is it not started? This determines
   whether Milestone 3 is a build or a wait, and it is the single biggest variable in the timeline.
2. **The real price card**, and confirmation of who signs off the care and damage policy. B3 is the
   only gate with no fallback.
3. **GitHub and Vercel accounts** — whose, and do I have access? Milestone 0 needs them on day one.

Everything else I can proceed on with the documented assumptions.
