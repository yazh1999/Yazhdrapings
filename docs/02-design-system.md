# 02 — Design System

## Direction

**Couture editorial, built out of folds.**

The layout behaves like a fashion magazine: high-contrast display type, generous margins, a lot of
ivory, photography treated as plates rather than decoration. Cutting through it is the one
structural idea — **the pleat**: parallel vertical bands, alternating light and shadow, spaced like
the folds of a set saree.

The pleat is the signature. It appears in the hero, as every section divider, in the loading state,
and in the hover on service cards. Everywhere else, restraint. If a component doesn't need
decoration, it doesn't get any.

**One risk, taken deliberately:** the hero has no photograph. It's a full-bleed field of CSS pleats
in rose and gold that fans open on load, with the wordmark sitting in the fold. A saree service
whose homepage opens with a stock model looks like every tailor's site in India. Opening with the
*fold itself* is unmistakable, weighs almost nothing, and renders instantly on a 4G phone — which
is where the customer actually is.

---

## Palette

Three brand colors are fixed by the client. The neutrals are chosen to serve them.

| Token | Hex | Role |
|---|---|---|
| `--rose` | `#cb2056` | Primary. Buttons, links, the deep edge of every pleat. |
| `--magenta` | `#d02e73` | Accent. Hovers, active states, the lit edge of a pleat. Never for body text. |
| `--gold` | `#e8ba80` | Secondary. Rules, borders, tassel details, the third band in the pleat gradient. |
| `--ink` | `#2b0a16` | Text and dark sections. A near-black pulled toward the rose, not neutral grey. |
| `--ivory` | `#fffaf6` | Page background. Warm, so the gold doesn't turn dirty against it. |
| `--sand` | `#f4e7db` | Card and section fills, input backgrounds. |
| `--muted` | `#7d5b64` | Secondary text, captions, placeholders. Passes AA on ivory. |

### Rules

Measured ratios, WCAG 2.1, recomputed — trust these numbers, not eyeballing:

| Pair | Ratio | Verdict |
|---|---|---|
| `--ink` on `--ivory` | **17.5:1** | AAA. The default for body copy. |
| `--muted` on `--ivory` | **5.7:1** | AA normal text. Captions, placeholders. |
| `--rose` on `--ivory` | **5.22:1** | AA normal text. Links, buttons, headings. Not AAA — don't use it for long paragraphs. |
| `--ivory` on `--rose` | **5.22:1** | AA. The primary button. |
| `--magenta` on `--ivory` | **4.69:1** | AA normal text, but only just. Reserved for UI and large text by convention, so a future palette tweak can't silently break body copy. |
| `--rose` on `--ink` | **3.35:1** | **Fails.** Never do this. |
| `--gold` on `--ivory` | **1.72:1** | **Fails everything.** Surface and line only. |
| `--ink` on `--sand` | **14.94:1** | AAA. Body copy on cards and in inputs. |
| `--muted` on `--sand` | **4.87:1** | AA normal text. Placeholders and captions on cards. |
| `--rose` on `--sand` | **4.46:1** | **Fails AA for normal text.** Large text and UI only — see the note below. |

- `--gold` **never** carries text on a light background. It is a surface and a line, not a foreground.
  On `--ink` it is legible (10.2:1) and is the correct accent there.
- On `--ink`, use `--ivory` for text and `--gold` for accents.
- No gradient buttons. The gradient belongs to the pleat motif and nowhere else.
- **The `--sand` trap.** `--sand` is the fill for cards, sections and inputs, and `--rose` is the
  link and label color — so the tempting combination is exactly the one that fails. On `--sand`,
  rose is allowed for headings at `title` size and above, for icons, and for borders. Body text,
  captions, input text and error messages on sand are `--ink` or `--muted`.
- Re-measure before adding any color. The two ratios originally written into this document were
  both wrong; assume the same of any new one until it is checked.

### CSS variables

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Clear Tailwind's default palette first. See the note below — this line is load-bearing. */
  --color-*: initial;

  --color-rose:    #cb2056;
  --color-magenta: #d02e73;
  --color-gold:    #e8ba80;
  --color-ink:     #2b0a16;
  --color-ivory:   #fffaf6;
  --color-sand:    #f4e7db;
  --color-muted:   #7d5b64;

  /* Re-declare the two Tailwind keywords that `--color-*: initial` removes and we still need. */
  --color-white:       #ffffff;
  --color-black:       #000000;
  --color-transparent: transparent;
  --color-current:     currentColor;

  --font-display: "Bodoni Moda", Georgia, serif;
  --font-body:    "Manrope", system-ui, sans-serif;
  --font-tamil:   "Noto Serif Tamil", serif;
  --font-mono:    "DM Mono", ui-monospace, monospace;

  --radius-fold: 2px;   /* pleats have creases, not rounded corners */
  --radius-card: 4px;
}
```

Tailwind v4 reads `@theme` directly — `bg-rose`, `text-ink`, `font-display` all work with no
config file.

**Why `--color-*: initial` matters.** Tailwind ships its own `rose` scale (`rose-50` … `rose-950`),
a completely different pink. Declaring a bare `--color-rose` adds `bg-rose` but does *not* remove
`bg-rose-500`, so both resolve and the wrong one is one keystroke away — an editor autocompleting
`text-rose-` to `text-rose-600` produces a plausible-looking pink that is not the brand color, and
nobody catches it in review. Wiping the default palette makes that a build error instead of a bug.

The same applies to `gold`, `sand` and `ink`, which have no Tailwind default and so would silently
fall back to nothing if misspelled. With `--color-*: initial`, any class outside this token list
fails loudly. That is the point.

---

## Typography

| Role | Face | Why |
|---|---|---|
| Display | **Bodoni Moda** | Didone. Hairline-to-thick stroke contrast that mirrors the lit and shadowed edge of a pleat. It's the typeface of fashion plates, which is exactly the register. |
| Body | **Manrope** | Geometric, slightly rounded, wide apertures. Quiet enough to disappear under Bodoni, legible at 15px on a phone. |
| Tamil | **Noto Serif Tamil** | For the wordmark (யாழ்), section eyebrows, and fabric names. Serif weight matches Bodoni. |
| Numeric | **DM Mono** | Prices, pleat counts, turnaround days, order references. Tabular figures make the price card scannable. |

Load with `next/font/google`, `display: "swap"`, subset only what's used.

### Scale

Fluid, clamped. Never let Bodoni run below 20px — the hairlines vanish.

| Token | Size | Use |
|---|---|---|
| `display-xl` | `clamp(3rem, 11vw, 8rem)` | Hero wordmark. Bodoni 400, tracking `-0.03em`, leading `0.88` |
| `display-lg` | `clamp(2.25rem, 6vw, 4.5rem)` | Page titles. Bodoni 400, leading `1.0` |
| `display-md` | `clamp(1.75rem, 4vw, 2.75rem)` | Section headings. Bodoni 500 |
| `title` | `1.25rem` | Card headings. Manrope 600 |
| `body` | `1.0625rem` / `1.7` | Paragraphs. Manrope 400, max 62ch |
| `small` | `0.875rem` | Captions. Manrope 400, `--muted` |
| `eyebrow` | `0.75rem` | Section labels. Manrope 600, uppercase, tracking `0.18em`, `--rose` |
| `numeric` | `1.125rem` | Prices. DM Mono 500, tabular |

### Two typographic habits, used consistently

**Italic for fabric.** Every fabric name is set in Bodoni italic, inline in body copy: *Kanjivaram*,
*organza*, *Chettinad cotton*. It gives the copy a texture no styling can, and it teaches the eye
that italic = material.

**Mono for anything countable.** `9 pleats`, `48 hrs`, `₹500`. Numbers never sit in Manrope.

---

## The pleat motif

The one thing to build carefully. Everything else in this system is ordinary; this is not.

A pleat is three bands: a lit edge, a face, a shadowed crease.

```
 lit    face   crease    lit    face   crease
 gold → ivory → rose     gold → ivory → rose
  │      │       │        │      │       │
  ▓░░░░░░░░░░░░░▒▓░░░░░░░░░░░░░▒▓░░░░░░░░░░░░░▒
  └──── 1 fold ────┘
```

Base implementation — a repeating linear gradient, no images, no JS:

```css
.pleats {
  background-image: repeating-linear-gradient(
    90deg,
    var(--color-gold)  0px,
    var(--color-ivory) 3px,
    var(--color-ivory) 34px,
    var(--color-rose)  40px,
    var(--color-magenta) 41px,
    var(--color-gold)  44px
  );
}
```

### Three applications

**1. Hero — the fan.** On load, the pleat field opens outward from centre over 900ms with
`cubic-bezier(.16,1,.3,1)`. Runs once. Respects `prefers-reduced-motion` by rendering the open
state directly.

**Animate `transform`, never `background-size`.** The obvious implementation — tweening
`background-size` from `6% 100%` to `100% 100%` — repaints the gradient on every frame on the main
thread. On the mid-range Android on 4G that is the actual target device, that is a guaranteed
janky first impression in the most important 900ms on the site, and it lands directly on the LCP
element. Use a scaled layer instead, which the compositor owns:

```css
.hero-pleats {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-pleats__fan {
  position: absolute;
  inset: 0;
  background-image: var(--pleat-gradient);
  transform: scaleX(0.06);
  transform-origin: 50% 50%;
  will-change: transform;
  animation: fan-open 900ms cubic-bezier(.16, 1, .3, 1) both;
}

@keyframes fan-open {
  from { transform: scaleX(0.06); }
  to   { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-pleats__fan { animation: none; transform: none; }
}
```

Two consequences to design around, both acceptable:

- `scaleX` compresses the whole layer, so the pleats start narrow and *widen* into place rather
  than multiplying. That reads as a fan opening, which is the intent.
- The bands scale with the layer, so the crease widths in the gradient should be tuned at the
  final `scaleX(1)` state, not the start state.

Drop `will-change` after the animation completes (`animationend` → remove the class) so the
promoted layer does not sit in memory for the rest of the session.

**2. Section dividers — the crease.** A `2px` band of the same gradient at 30% opacity, full-bleed,
between major sections. Replaces every horizontal rule on the site. Never use a plain `<hr>`.

**3. Service cards — the reveal.** Card sits flat in `--sand`. On hover or focus, a 6px pleat strip
slides in from the left edge over 240ms. That's the entire interaction. No lift, no shadow, no scale.

### Loading state

Six vertical pleat bars that fall into place left to right, 80ms apart. It reads as a saree being
set, and it is the only loading animation on the site.

Built as `<PleatLoader>` in `components/ui/`, and wired into the App Router through `app/loading.tsx`
so it covers every route transition without being imported page by page. The gallery, which is the
one route that can be slow, gets its own `app/gallery/loading.tsx` rendering the same component.
Animate `transform: translateY()` and `opacity` only — the same compositor rule as the hero.

Pair it with `app/error.tsx` and `app/not-found.tsx`, both of which use the static pleat field
rather than the animation. See `04-architecture.md` for placement.

---

## Layout

- **Grid:** 12 columns, `1.5rem` gutters. Content max-width `1240px`, prose max-width `62ch`.
- **Vertical rhythm:** section padding `clamp(4rem, 9vw, 8rem)` block. Apply it in one place —
  a `<Section>` wrapper — so no two selectors fight over margins.
- **Asymmetry is intentional.** Text columns sit at 5 of 12, images at 7, alternating side per
  section. A centred column all the way down is the template answer.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280`. Design mobile first; more than 80% of
  traffic will be an Android phone on 4G.

### Radius, borders, shadows

- Radius: `2px` on buttons and inputs, `4px` on cards, `0` on images. Sarees have creases.
- Borders: `1px solid --gold` at 40% opacity. Gold is the line color of the brand.
- **No shadows anywhere.** Depth comes from the pleat gradient. A drop shadow on an ivory page is
  the single fastest way to make this look generic.

---

## Components

| Component | Notes |
|---|---|
| `<Button>` | `primary` solid rose · `secondary` outlined gold on ivory · `whatsapp` ink fill with gold rule. 48px min height. |
| `<WhatsAppBar>` | Fixed bottom bar on mobile, floating pill bottom-right on desktop. Present on every page. |
| `<Section>` | Owns all vertical padding. Optional `tone="ivory" | "sand" | "ink"`. |
| `<Eyebrow>` | Uppercase label + a 24px gold rule. `--rose` on ivory; **`--ink` on sand or ink sections** — rose at `eyebrow` size on `--sand` is 4.46:1 and fails AA. The gold rule stays either way. |
| `<PleatDivider>` | The crease. Full-bleed, decorative, `aria-hidden`. |
| `<PleatLoader>` | The six-bar loading state below. Lives in `components/ui/`, rendered by `app/loading.tsx` and by any route segment with its own `loading.tsx`. |
| `<ServiceCard>` | Title, one-line description, mono price, pleat-reveal hover. |
| `<StepList>` | The four-step process. Numbered `01–04` — justified here because it genuinely is a sequence. Numbers in DM Mono, gold, oversized. |
| `<GalleryGrid>` | Masonry, 2 cols mobile / 3 desktop. Lightbox on click. Every image needs a real alt describing fabric and work done. |
| `<PriceTable>` | Two columns, gold hairlines, mono prices, no zebra striping. |
| `<FAQ>` | Native `<details>`/`<summary>`. Gold rule between items, chevron rotates. No JS. |
| `<BookingForm>` | See `04-architecture.md`. Inline errors, `--sand` inputs, gold border, rose focus ring. |
| `<Testimonial>` | Bodoni italic quote, mono attribution, no avatar, no star rating. |

### States

- **Focus:** `2px` rose ring, `2px` offset. Visible on every interactive element. Non-negotiable.
- **Disabled:** 45% opacity, `cursor: not-allowed`, no color change.
- **Error:** rose border, message below in `small`, plain and specific — "Enter a 10-digit mobile
  number", not "Invalid input".
- **Empty gallery filter:** "No work in this category yet. Try *Silk* or *Cotton*."

## Motion

| Where | What | Duration |
|---|---|---|
| Hero pleats | Fan open, once on load | 900ms |
| Section entry | Fade + 12px rise, one shot | 500ms |
| Card hover | Pleat strip slides in | 240ms |
| Buttons | Background shift rose → magenta | 160ms |
| Accordion | Height | 200ms |

Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances, `ease-out` for hovers. Nothing loops.
Nothing parallaxes. Wrap everything in `@media (prefers-reduced-motion: reduce)` and disable.

## Accessibility floor

Ship nothing that misses these:

- Contrast AA on all text; check `--gold` and `--magenta` before every use.
- Full keyboard path through the booking form with visible focus.
- Real `alt` text on gallery images; `aria-hidden` on every pleat divider.
- Labels above inputs, never placeholder-only.
- Tap targets ≥ 44×44px.
- Page zooms to 200% without horizontal scroll.
