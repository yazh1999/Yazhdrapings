# Assets

Everything in `public/assets/` is served from the site root — a file at
`public/assets/services/kuchu.webp` is requested as `/assets/services/kuchu.webp`.

Photography is the one thing code cannot fix. `docs/01-brief.md` rules out stock imagery
explicitly: it reads as a template instantly and undermines the entire trust strategy. **Zero stock
photography.** An empty section is better than a borrowed one.

## Where things go

| Folder | What | Used by |
|---|---|---|
| `services/` | One image per service, named for its slug — `pre-pleating-light.webp`, `kuchu.webp` | `/services`, home services preview |
| `gallery/` | Finished work, 20–30 images | `/gallery`, home gallery preview |
| `process/` | One per step of the four-step process | `/how-it-works` |
| `studio/` | The studio, the founder | `/about` |
| `brand/` | Wordmark, favicon source, OG fallback | Layout, metadata |

Service filenames must match the `slug` in `src/data/services.ts`, since that is what
`Service.image` points at.

## Specification

From the photography brief in `docs/05-roadmap.md`:

- 20–30 finished sarees, folded and pleated, on a plain ivory or ink surface
- Close crops of the fold stack, where the light-and-shadow of the pleat is the subject
- Hands at work — measuring, pressing, tying kuchu
- The studio, and the founder
- One photograph per process step
- Natural light, no flash, consistent white balance across the set

**Deliver at 2400px on the long edge, WebP, uncropped.**

## Before committing an image

- **WebP**, quality 75. Next 16 defaults `images.qualities` to `[75]` only — any other value needs
  `images.qualities` set in `next.config.ts` first.
- Record real pixel `width` and `height` in `src/data/gallery.ts`. Missing dimensions cause layout
  shift, and the CLS budget is 0.05.
- Write the `alt` text when you add the file, not later. Pattern:
  `Deep green Kanjivaram silk saree, nine hand-set pleats, pressed and folded.`
  Describe the fabric and the work done — never "saree image" or "gallery photo".
- Keep files under ~300KB. Saree photography is heavy and over 80% of traffic is an Android phone
  on 4G.

## Status

Empty. Every folder holds a `.gitkeep` so the structure survives in git.

This blocks content gate **B1** in `docs/07-implementation-plan.md`, which in turn blocks the home
gallery preview, `/gallery`, `/services` imagery, `/how-it-works` and `/about`. The build is
sequenced so none of that stops the site shipping — see the content gates table.
