# 03 — Pages and Copy

Copy here is ready to ship. Change the facts (prices, turnaround, names) — keep the register.

## Sitemap

```
/                    Home
/services            What we do, in detail
/pricing             The full price card
/gallery             Finished work
/how-it-works        The process, step by step
/about               Who we are
/faq                 Questions
/contact             Form, map, hours
/book                Pickup request form  ← primary form target
```

Footer-only: `/privacy`, `/terms`, `/care-policy`. Specified at the end of this document — they
are not optional, and one of them is a legal requirement. See "Legal pages" below.

---

## Global

### Header
Wordmark left: **Yazh** in Bodoni, **யாழ்** in Noto Serif Tamil beneath at 60% size, gold.
Nav right: Services · Pricing · Gallery · How it works · About.
CTA: `Book a pickup` (rose solid).
Mobile: hamburger → full-screen ivory overlay, nav in `display-md`, WhatsApp button at the bottom.

### Persistent WhatsApp bar
Mobile: fixed bottom, full width, ink fill, gold top rule — `Message us on WhatsApp`.
Desktop: floating pill, bottom right.

### Footer
Four columns on desktop, stacked on mobile.
1. Wordmark + one line: *Saree pre-pleating and drape finishing. Chennai.*
2. Services links
3. Contact: address, phone, WhatsApp, hours
4. Instagram + a line of pleat gradient across the full width above the copyright.

`© 2026 Yazh Drapings. Made in Chennai.`

---

## `/` — Home

### 1. Hero
Full-bleed pleat field, fanning open on load. No photograph.

> **eyebrow** — Chennai · Saree pre-pleating
>
> # Nine folds, set overnight.
>
> Your saree comes back pleated, pressed and pinned — ready to wear in under a minute.
> Cotton to *Kanjivaram*, we set them all by hand.
>
> `[Book a pickup]` `[See our work]`
>
> **small** — Doorstep pickup across Chennai · Back in 48 hrs

### 2. Trust strip
Four items across a `--sand` band, mono numerals, gold dividers between.

`2,400+` sarees pleated · `48 hrs` standard turnaround · `100%` hand-set · `₹0` pickup above ₹800

> ⚠️ **`PLACEHOLDER` — 2,400+.** Nobody has verified this figure. It is a factual claim about the
> business, it is the first number a customer reads, and it is repeated on `/gallery`. Get the real
> count from the client, or cut the item and run three. All four values live in
> `src/data/site.ts` as `stats`, never typed into JSX.

### 3. Services (three cards + link)

> **eyebrow** — What we do
> ## Everything between the fold and the front door.

**Pre-pleating** — Pleats set to your height, pressed, and tacked so they hold through the day. `from ₹250`
**Fall & pico** — Fall stitched straight, edges piped clean. The part nobody sees and everybody notices. `from ₹200`
**Kuchu & tassels** — Hand-knotted pallu tassels. Pick your thread, pick your bead. `from ₹400`

`See all services →`

### 4. How it works
Four steps, `01–04`, oversized gold mono numerals.

**01 · Tell us** — Message on WhatsApp with the saree, the fabric, and the date you need it.
**02 · We collect** — Doorstep pickup anywhere in Chennai, or drop it at the studio.
**03 · We set** — Measured to your height, pleated by hand, pressed, left overnight to hold.
**04 · Back to you** — Folded in a garment bag, delivered to your door.

### 5. Gallery preview
Six images, masonry. Caption each with fabric and pleat count in mono: *Kanjivaram silk · 9 pleats*.
`See more work →`

### 6. Why hand-set (the differentiator)
Two columns, text at 5, image at 7.

> **eyebrow** — Why it matters
> ## A machine can fold. It cannot read a fabric.
>
> *Organza* springs back. *Kanjivaram* holds a crease for months and punishes a wrong one.
> Chiffon slips out of a pleat if it's pressed too hot. Every saree that comes in gets read first
> — weight, weave, drop — and then set to your height, not a standard.
>
> That's why we take a night over it.

### 7. Testimonials
Three. Bodoni italic, mono attribution. No stars, no photos.

> 🚨 **`PLACEHOLDER` — all three quotes below are invented.** They are written to demonstrate the
> register, not to be shipped. Publishing fabricated customer testimonials is misleading advertising
> under the Consumer Protection Act 2019 and the CCPA's 2022 endorsement guidelines, and it is the
> exact opposite of the trust strategy in `01-brief.md`.
>
> Before launch: collect three real ones over WhatsApp, get written consent to publish the quote and
> the first-name-plus-area attribution, and keep the consent messages. If there are no real
> testimonials yet, **cut the section entirely** and let the gallery carry the proof. An empty space
> is not a problem; an invented customer is.

> *"Four functions, four sarees, and I didn't pin a single pleat. My mother has now sent hers."*
> — Divya R., Adyar

> *"They handled my wedding Kanjivaram like it was theirs. Came back better than the shop gave it."*
> — Meenakshi S., T. Nagar

> *"Picked up Tuesday, back Thursday, exactly as promised."*
> — Anitha K., Velachery

### 8. Closing CTA
Ink section, gold pleat divider above.

> ## Send us your saree.
> Message us with a photo and the date you need it. We'll tell you the price and the day it comes back.
> `[Message on WhatsApp]` `[Book a pickup]`

---

## `/services`

Page title: **What we do.** Sub: *Six services. All of them by hand.*

One block per service, alternating image side, each with:
- Name + Tamil name where it exists
- Two sentences on what it involves
- Who it's for
- Mono price
- `Book this →`

Cover: pre-pleating (cotton/synthetic), pre-pleating (silk), fall & pico, kuchu & tassels,
ready-to-wear conversion, bridal package.

Close with a note in `--sand`:

> **Not sure what your saree needs?** Send a photo on WhatsApp. We'll tell you.

---

## `/pricing`

> ## Prices, in full.
> No hidden charges. What you see is what you pay on delivery.

Full price table (see `01-brief.md`), grouped by fabric weight. Then:

**What's included in every order** — collection, hand-setting, steam press, a garment bag, and
delivery. **What costs extra** — same-day service (+50%), courier outside Chennai (at actuals),
kuchu beadwork beyond the standard set.

**Payment** — UPI, cash on delivery, or bank transfer. Nothing due until the saree is back with you.

---

## `/gallery`

> ## Two thousand sarees, and counting.

> ⚠️ `PLACEHOLDER` — must agree with the trust-strip count on the home page. Both render from
> `site.stats.sareesPleated`; write the headline so the number is interpolated, not spelled out in
> prose, or the two will drift apart again.

Filter chips: All · Silk · Cotton · Georgette & chiffon · Bridal · Kuchu.
Masonry grid, lightbox. Every image captioned in mono: *fabric · pleat count · service*.

Alt text pattern: `Deep green Kanjivaram silk saree, nine hand-set pleats, pressed and folded.`

Empty state: `No work in this category yet. Try Silk or Cotton.`

---

## `/how-it-works`

Long-form version of the four steps, one screen each, with a photograph per step and the small
details that build trust: how the saree is logged on arrival, how height is measured, why it rests
overnight, how it's folded for return.

End with turnaround table:

| Service | Standard | Express |
|---|---|---|
| Pre-pleating | 48 hrs | Same day (+50%) |
| Fall & pico | 48 hrs | 24 hrs |
| Kuchu | 3–4 days | 48 hrs |
| Bridal package | 5 days | On request |

---

## `/about`

> **eyebrow** — யாழ்
> ## Named for a harp.

> The *yazh* is an old Tamil instrument — a frame strung with parallel lines, each one tuned by
> hand. Set a saree well and it looks the same way: nine folds, evenly spaced, catching the light
> on one edge.
>
> We started in [year] in [neighbourhood], pleating for family before it became a business. ⚠️ `PLACEHOLDER` — fill in from the client. We
> still set every saree by hand, still read the fabric before we touch it, and still call you if
> something needs a decision.

Include: founder photo and name, the studio address, and a plain statement of the care policy —
what happens if a saree is damaged, and how it's insured. This paragraph closes more bridal orders
than anything else on the site. Do not skip it.

---

## `/faq`

Native `<details>`. Mirror these into `FAQPage` structured data.

- **How long do the pleats hold?** Through a full day of wear, and usually several. Silk holds longest; chiffon and georgette are the first to relax.
- **Do you pleat sarees you didn't sell?** We don't sell sarees at all. We only pleat.
- **What if my saree is damaged?** Every saree is photographed on arrival and insured while it's with us. If we damage it, we cover repair or replacement. It has happened twice in [X] years and we paid both times. ⚠️ `PLACEHOLDER` — the "twice" and the `[X]` are invented, and this answer is also a binding commitment. Replace with the true history, and make sure the promise matches what `/care-policy` says and what the business will actually honour. If there is no insurance in place, say what there is instead.
- **How do you know my pleat length?** We ask your height and your blouse-to-floor measurement when you book. If you're unsure, we'll talk you through measuring it.
- **Can I get it the same day?** Yes, for pre-pleating, at 50% extra, if it's with us before 11am.
- **Do you deliver outside Chennai?** Yes, by insured courier anywhere in Tamil Nadu. Add two days each way.
- **How do I wash a pre-pleated saree?** Dry clean only, and tell the cleaner it's pleated. A normal wash will drop the set and it'll need redoing.
- **How do I pay?** UPI, cash on delivery, or bank transfer. Nothing upfront.

---

## `/contact` and `/book`

**Contact:** phone, WhatsApp, email, studio address, embedded map, hours
(*Mon–Sat, 9am–7pm · Sunday, pickup only*).

**Book — form fields.** This table is the single source of truth for the form. It matches
`bookingSchema` in `04-architecture.md` field for field; if one changes, change both in the same
commit.

| Field | Name | Type | Required |
|---|---|---|---|
| Name | `name` | text, min 2 | ✓ |
| Mobile | `mobile` | tel, 10 digits, starts 6–9 | ✓ |
| WhatsApp number is the same | `whatsappSame` | checkbox, default checked | |
| WhatsApp number | `whatsappNumber` | tel, 10 digits — shown only when the box is unchecked | conditional |
| Service | `service` | select, from `services.ts` | ✓ |
| Fabric | `fabric` | select — Cotton / Silk / Georgette / Chiffon / Organza / Not sure | ✓ |
| Number of sarees | `quantity` | number, 1–20 | ✓ |
| Your height | `height` | select, ranges in cm, plus "Not sure" | |
| Need it by | `neededBy` | date, min today+2 | ✓ |
| Pickup area | `area` | text — Chennai locality | ✓ |
| Notes | `notes` | textarea, max 500 | |
| — | `honeypot` | text, visually hidden, must stay empty | (spam trap) |

**No file upload in v1.** A saree photo was specified here originally and has been removed
deliberately, for three reasons: a 5MB upload breaks the "form submits with JS disabled" quality
gate, it exceeds the default Server Action body limit, and it duplicates a channel that already
works better. Replace it with a line under the Notes field:

> Have a photo of the saree? Send it on WhatsApp after you submit — we'll match it to your request.

Revisit only if a real number of customers ask for it. See `06-production.md` for what enabling it
would actually cost.

**Conditional WhatsApp field.** With JS, unchecking the box reveals the second number input. Without
JS, both fields render and the checkbox is honoured server-side. Never hide a required input behind
JS that the server still demands.

Submit button: `Request pickup`. Success message: `Request received. We'll WhatsApp you within
2 hours to confirm the price and the pickup slot.`

The action keeps its name the whole way through — button says *Request pickup*, confirmation says
*Request received*.

Below the form: `Prefer to talk? [Message on WhatsApp]`

---

## Legal pages

Footer-only, but not optional. `/privacy` is a legal requirement the moment the booking form
collects a name and a mobile number, which is before the site can launch at all. All three are
static Server Components, no design work beyond `<Section tone="ivory">` and prose at 62ch.

Add a `lastUpdated` date at the top of each. Set `robots: { index: true }` — these pages are
allowed to be indexed, they just aren't in the nav.

### `/privacy` — Privacy policy

**Required by the Digital Personal Data Protection Act 2023.** The booking form collects name,
mobile number, WhatsApp number, pickup address area and a needed-by date; GA4 sets cookies. Both
are processing of personal data and both trigger a notice obligation. This is not a formality that
can wait for Phase 4.

Must state, in plain language:

- **What is collected** — the booking-form fields, listed individually; analytics identifiers.
- **Why** — to quote a price, arrange a pickup, and return the saree. Nothing else.
- **Who else sees it** — Resend (email delivery), Vercel (hosting and analytics), Google (GA4),
  and the delivery partner. Name them; "third parties may include" is not a disclosure.
- **How long it is kept** — state a real retention period for booking emails, and delete on it.
- **Consent for analytics** — GA4 must not fire before consent. See the banner note below.
- **User rights under the DPDP Act** — access, correction, erasure, grievance redressal.
- **A named Data Protection Officer or grievance contact** with a working email address. The Act
  requires a reachable human, not a form.

**Analytics consent.** Load GA4 only after an explicit accept. A minimal two-button banner
(`Accept` / `Decline`), no dark patterns, decline remembered in `localStorage`, and no analytics
script in the document until accepted. Vercel Analytics is cookieless and can load unconditionally.

> **Draft this one with a lawyer, or at minimum from a DPDP-specific template.** Do not adapt a
> GDPR policy found online — the rights, the terminology and the grievance mechanism differ.

### `/terms` — Terms of service

Short and specific. What is being agreed to when someone submits the form:

- A pickup request is a **request**, not a confirmed order. The order exists once we reply with a
  price and a slot and the customer accepts on WhatsApp.
- Prices are as quoted on WhatsApp; the price card is indicative and can change for condition or
  complexity found on inspection.
- Payment terms: UPI, cash on delivery, or bank transfer, due on delivery.
- Cancellation: free before collection; after work has started, the labour is chargeable. State
  the actual number.
- Turnaround times are targets, not guarantees, and what happens if one is missed.
- Governing law and jurisdiction: Chennai, Tamil Nadu.

### `/care-policy` — Care and damage policy

The most commercially valuable of the three. `01-brief.md` names proof of care as the second
priority on the site, and `/about` is told not to skip it — this page is where it lives in full,
and the FAQ answer links here.

Must state:

- The saree is photographed on arrival and on dispatch, and the photos are kept for the order.
- What is insured, by whom, and up to what value. **If there is no insurance policy in place, say
  what the actual arrangement is.** A stated limit that is honoured beats an implied unlimited
  guarantee that isn't.
- The declared-value process for a high-value bridal saree, and how to declare it at booking.
- What counts as damage caused by us, and what is pre-existing wear or fabric behaviour — chiffon
  relaxing out of a set is not damage, a scorch is.
- The resolution process and how long it takes.
- What happens to a saree left uncollected, and after how long.

> ⚠️ Every number and promise on this page is a commitment the business has to honour. Write it
> with the client, get their sign-off in writing, and keep the site copy and their real practice
> identical.
