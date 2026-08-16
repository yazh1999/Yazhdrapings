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
 * So the hero uses the photograph with the baked text covered by an ink scrim
 * (see .hero-scrim in globals.css), and the banner goes to Open Graph, where
 * baked-in text is exactly what you want.
 */

import sharp from "sharp";
import { statSync } from "node:fs";

const SRC = "public/assets/hero/Branding.png";

const meta = await sharp(SRC).metadata();
console.log(
  `source: ${meta.width}x${meta.height} ${meta.format}, ${(statSync(SRC).size / 1024 / 1024).toFixed(2)}MB`,
);

function report(out) {
  console.log(`  ${out} — ${(statSync(out).size / 1024).toFixed(0)}KB`);
}

// Hero — full frame at native resolution. Deliberately not upscaled to the
// 2400px the README asks for: upscaling adds bytes without adding detail, and
// a soft hero is worse than a slightly small one.
await sharp(SRC)
  .webp({ quality: 78 })
  .toFile("public/assets/hero/hero-desktop.webp");
report("public/assets/hero/hero-desktop.webp");

// Open Graph — 1200x630 is the spec every platform crops to. The banner's own
// text survives here, which is the point of a share card.
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
    `\n  NOTE: source is ${meta.width}px wide. Full-bleed desktop wants 2400px —` +
      `\n  this will look soft on a 1440p display. Ask for a larger original.`,
  );
}
