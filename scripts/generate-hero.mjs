#!/usr/bin/env node
/**
 * Derives the hero and social images from the branding banner.
 *
 *   npm run hero
 *
 * The source is a finished banner: logo, its own headline, subtitle and four
 * service icons, all baked into the pixels on the left-hand side. That is the
 * right artwork for a social share card and the wrong artwork for a hero
 * background, because:
 *
 *   - Text in an image is invisible to Google. "saree pre pleating Chennai" is
 *     a top-three ranking target in docs/01-brief.md; a baked-in headline earns
 *     nothing toward it, and a screen reader cannot read it either.
 *   - It cannot reflow. At 390px the baked text is unreadable.
 *   - Our own headline would sit on top of it — two headlines, one screen.
 *
 * The first attempt covered the baked text with a near-opaque scrim. That did
 * not work: at 97% opacity, ~3% of light text on a near-black ground is still
 * legible, and "Draped with Elegance" ghosted through the headline.
 *
 * So the text panel is removed from the asset instead. The banner's background
 * is a flat, uniform dark across the whole panel, and there is a quiet gutter at
 * x=770 between the text and the photograph — so the panel can be replaced with
 * a matching fill and the photograph feathered back over it with no visible
 * seam. Nothing is left to hide, and the scrim goes back to being a contrast
 * device rather than a cover-up.
 *
 * The banner keeps its text for Open Graph, where that is exactly the point.
 */

import sharp from "sharp";
import { statSync } from "node:fs";

const SRC = "public/assets/hero/Branding.png";

// Where the text panel ends and the photograph begins. Found by scanning column
// variance: the panel is flat, x=770 is the quiet gutter, content ramps from
// x=800. Re-measure if the banner is ever redrawn.
const PHOTO_X = 770;
const FEATHER = 90;

const meta = await sharp(SRC).metadata();
console.log(
  `source: ${meta.width}x${meta.height} ${meta.format}, ${(statSync(SRC).size / 1024 / 1024).toFixed(2)}MB`,
);

function report(out) {
  console.log(`  ${out} — ${(statSync(out).size / 1024).toFixed(0)}KB`);
}

const photoWidth = meta.width - PHOTO_X;

// Sample the ground colour at the seam so the replacement fill matches the
// photograph's own background exactly. Hard-coding a hex here would band.
const seam = await sharp(SRC)
  .extract({ left: PHOTO_X, top: 0, width: 24, height: meta.height })
  .png()
  .toBuffer();
const { channels } = await sharp(seam).stats();
const [r, g, b] = channels.map((c) => Math.round(c.mean));
console.log(`  seam fill: rgb(${r},${g},${b})`);

// Feather the photograph's left edge so it dissolves into the fill.
const featherMask = await sharp(
  Buffer.from(
    `<svg width="${photoWidth}" height="${meta.height}">
       <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
         <stop offset="0" stop-color="#fff" stop-opacity="0"/>
         <stop offset="${FEATHER / photoWidth}" stop-color="#fff" stop-opacity="1"/>
       </linearGradient></defs>
       <rect width="100%" height="100%" fill="url(#g)"/>
     </svg>`,
  ),
)
  .resize(photoWidth, meta.height)
  .png()
  .toBuffer();

const photo = await sharp(SRC)
  .extract({ left: PHOTO_X, top: 0, width: photoWidth, height: meta.height })
  .composite([{ input: featherMask, blend: "dest-in" }])
  .png()
  .toBuffer();

// Hero — full frame at native resolution, text panel replaced by flat ground.
// Deliberately not upscaled to the 2400px the README asks for: upscaling adds
// bytes without adding detail, and a soft hero is worse than a slightly small one.
await sharp({
  create: {
    width: meta.width,
    height: meta.height,
    channels: 4,
    background: { r, g, b, alpha: 1 },
  },
})
  .composite([{ input: photo, left: PHOTO_X, top: 0 }])
  .webp({ quality: 80 })
  .toFile("public/assets/hero/hero-desktop.webp");
report("public/assets/hero/hero-desktop.webp");

// Portrait crop for phones, taken from the photograph only — no ink half to
// waste a portrait screen on, and no text panel to crop into.
const portraitWidth = Math.round(meta.height * (2 / 3));
await sharp(SRC)
  .extract({
    // Bias right: the drape is the subject, the vase is the supporting detail.
    left: Math.min(meta.width - portraitWidth, PHOTO_X + 180),
    top: 0,
    width: portraitWidth,
    height: meta.height,
  })
  .webp({ quality: 80 })
  .toFile("public/assets/hero/hero-mobile.webp");
report("public/assets/hero/hero-mobile.webp");

// Open Graph — 1200x630 is what every platform crops to. The banner's own text
// survives here, which is the point of a share card.
const ogCropHeight = Math.round(meta.width / (1200 / 630));
await sharp(SRC)
  .extract({
    left: 0,
    top: Math.max(0, Math.round((meta.height - ogCropHeight) / 2)),
    width: meta.width,
    height: Math.min(meta.height, ogCropHeight),
  })
  .resize(1200, 630)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("src/app/opengraph-image.jpg");
report("src/app/opengraph-image.jpg");

if (meta.width < 2000) {
  console.log(
    `\n  NOTE: source is ${meta.width}px wide, and only ${photoWidth}px of that is` +
      `\n  photograph. Full-bleed desktop wants 2400px. Ask for a larger original,` +
      `\n  and ideally the photograph without the banner text laid over it.`,
  );
}
