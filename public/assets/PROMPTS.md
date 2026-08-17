# Service image prompts and specs

Nine images, one per service. The filename **must** match the service `slug` in
`src/data/services.ts` — that is what `Service.image` points at, and `lib/assets.ts` swaps the
pleat placeholder for the real photograph automatically on the next build. No code edit needed.

---

## Exact size

The plate renders at **669 CSS px** wide at the widest the layout ever goes (`col-span-7` of a
12-column grid inside the 1240px container), in a **4:3** box with `object-fit: cover`.

| | Size | Covers |
|---|---|---|
| **Minimum** | **1600 × 1200** | 2x screens with headroom |
| **Preferred** | **2400 × 1800** | 3x screens; matches the master delivery in `docs/05-roadmap.md` |

- **Aspect ratio 4:3, landscape.** Anything else gets centre-cropped — compose with breathing
  room at every edge so nothing important sits near a border.
- **WebP**, quality 75. Next 16 defaults `images.qualities` to the values in `next.config.ts`.
- **Under 400KB each.** These are committed to the repo; nine bloated files is a slow clone
  forever. Next resizes and re-encodes on request, so the source only needs to be good, not small.
- Do **not** upscale. A sharp 1600px beats a soft 2400px.

## Filenames — exact, lowercase, `.webp`

```
public/assets/services/
├── bridal-draping.webp
├── wedding-reception-draping.webp
├── party-occasion-draping.webp
├── pre-pleating-light.webp
├── pre-pleating-silk.webp
├── fall-and-pico.webp
├── kuchu.webp
├── ready-to-wear.webp
└── bridal-package.webp
```

---

## Before you generate: read this once

`docs/01-brief.md` is explicit that the site's credibility is photographic, that stock imagery
"reads as a template instantly", and that the images should be **real photographs of real work**.
AI-generated images are stock's cousin — the same problem, with an extra one on top: presenting a
generated image as your own work is a false claim about your business, and the bridal customer is
the one most likely to notice and least likely to forgive it.

A workable middle path:

- **Fine to generate:** still-life plates — fabric, folds, tassels, a garment bag on a table. These
  read as illustrative, and every clothing brand uses them.
- **Do not generate:** anything implying a specific finished job, a named fabric you did not work
  on, a real customer, or your studio.
- **Replace with real photographs** as soon as the shoot happens. Generated plates are scaffolding.

**One code change needed if you use generated images.** `ServiceBlock.tsx` currently sets alt text
to `"{service name} — work by Yazh Drapings"`. That sentence is false for a generated image. Ask for
it to be changed to a plain description of what is shown before these go live.

**Never generate a human face.** Faces are the immediate tell, they raise likeness questions, and
the brief rules out model photography anyway. Every prompt below uses a dress form or a crop.

---

## Shared style block

Append this to **every** prompt. Consistency across the set is the whole game — `05-roadmap.md`
asks for "consistent white balance across the set", and nine images in nine different lighting
setups look worse than nine plain ones.

```
Editorial still-life product photography. Matte dark walnut wood surface, near-black
background. Single soft window light from the upper left, gentle falloff, deep soft
shadows, no flash, no harsh specular highlights. Warm white balance. Shallow depth of
field. Photorealistic, high detail in the weave. 4:3 landscape, subject centred with
generous empty space at every edge. Muted, restrained, expensive.
```

## Negative prompt

```
text, lettering, watermark, logo, signature, caption, human face, full body, model,
hands with distorted fingers, extra fingers, plastic sheen, HDR, oversaturation,
neon colours, harsh flash, vignette, border, frame, collage, cluttered background,
mannequin head, jewellery close-up
```

## Palette to name in prompts

Pull from the brand tokens so the photography and the site agree:
deep rose `#cb2056` · magenta `#d02e73` · gold `#e8ba80` · near-black ink `#2b0a16` ·
ivory `#fffaf6` · sand `#f4e7db`

---

## The nine prompts

### 1. `bridal-draping.webp`
```
A bridal Kanjivaram silk saree in deep magenta with a heavy gold zari border, draped and
pinned on a headless tailor's dress form, the pallu falling over one shoulder in even
parallel pleats, waist pleats crisp and evenly spaced, a few brass pins catching the light.
```

### 2. `wedding-reception-draping.webp`
```
Three headless dress forms in a row, each draped in a different silk saree — deep rose,
gold, and dark green — pallus pleated and pinned, receding gently into shadow, a folded
measuring tape and a pin cushion on the table in the foreground.
```

### 3. `party-occasion-draping.webp`
```
A lightweight georgette saree in soft rose draped on a headless dress form, fabric caught
mid-fall so the drape reads as light and moving, pleats loose and fluid rather than
structured, one gold-edged pleat lifted slightly away from the body.
```

### 4. `pre-pleating-light.webp`
```
A close crop of a stack of freshly pressed cotton saree pleats, eight or nine parallel
folds seen edge-on, each fold catching light on one edge and shadow in the crease, ivory
and soft rose fabric, a warm iron resting out of focus behind.
```

### 5. `pre-pleating-silk.webp`
```
A close crop of heavy Kanjivaram silk pleats freshly steam-set, deep rose silk with gold
zari running through the folds, the sheen of silk showing the curve of each pleat, faint
steam rising, a tailor's steam iron softly out of focus behind.
```

### 6. `fall-and-pico.webp`
```
An extreme close crop of a saree hem lying flat on dark wood, a fall stitched neatly along
the inside edge in matching thread, the raw edge finished with fine pico piping, a needle
and a spool of gold thread resting beside it.
```

### 7. `kuchu.webp`
```
An extreme close crop of hand-knotted kuchu tassels on the pallu of a silk saree, gold and
deep rose silk thread wound tightly around small beads, a dozen tassels hanging in an even
row, one half-finished with loose thread ends showing the handwork.
```

### 8. `ready-to-wear.webp`
```
A ready-to-wear saree conversion on a headless dress form, stitched into a step-in drape
with permanent knife pleats at the waist and a concealed zip at the side, deep rose silk
with a gold border, the zip half open to show the finish inside.
```

### 9. `bridal-package.webp`
```
A folded silk saree in deep magenta and gold resting inside an open ivory garment bag on
dark wood, tissue paper tucked between the folds, a small gold-edged card tied with rose
ribbon on top, a second folded saree stacked beside it.
```

---

## After generating

1. Convert to WebP and check each is under 400KB.
2. Name them exactly as listed and drop them into `public/assets/services/`.
3. Rebuild. The placeholders swap automatically — nothing else to change.
4. Ask for the alt text in `ServiceBlock.tsx` to be corrected if these are generated rather than
   photographed.
