#!/usr/bin/env node
/**
 * Generates the favicon set from the logo.
 *
 * Run after replacing public/assets/logo/yazhdraping.jpeg:
 *   npm run icons
 *
 * The badge is circular but the source JPEG carries a square cream background,
 * which shows as a pale box against any surface that is not exactly that cream.
 * So everything here is masked to a circle and written as PNG, which has an
 * alpha channel. JPEG does not, which is why the source cannot be used directly
 * as an icon.
 *
 * sharp ships with Next.js, so there is nothing extra to install.
 */

import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/assets/logo/yazhdraping.jpeg";

const meta = await sharp(SRC).metadata();
const size = Math.min(meta.width, meta.height);
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

// Rasterise the mask to exactly `size` first. sharp renders SVG at its own
// density, so the intermediate can come out a pixel or two over and compositing
// then fails with "must have same dimensions or smaller".
const mask = await sharp(
  Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  ),
)
  .resize(size, size)
  .png()
  .toBuffer();

// Mask once at full size. This must be its own pipeline: a second .resize() on
// the same chain replaces the first rather than queueing after it, so the mask
// would be composited onto an already-shrunk image and fail on dimensions.
const masked = await sharp(SRC)
  .resize(size, size, { fit: "cover" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

async function circle(px, out) {
  const buf = await sharp(masked)
    .resize(px, px)
    .png({ compressionLevel: 9, palette: true, quality: 82 })
    .toBuffer();
  writeFileSync(out, buf);
  console.log(`  ${out} — ${px}x${px}, ${(buf.length / 1024).toFixed(1)}KB`);
}

// Next.js App Router picks these up by filename convention and emits the
// <link rel="icon"> tags itself. No manual head markup.
await circle(256, "src/app/icon.png");
await circle(180, "src/app/apple-icon.png");

// Transparent circular mark, for any surface the square JPEG cannot sit on —
// the ink footer, for one.
await circle(512, "public/assets/logo/mark-circle.png");
