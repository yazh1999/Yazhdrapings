#!/usr/bin/env node
/**
 * Enforces two ground rules from README.md that nothing else can catch.
 *
 * Why this exists: `--color-*: initial` in globals.css wipes Tailwind's default
 * palette, which stops `text-rose-600` from rendering the WRONG pink. But
 * Tailwind v4 does not error on an unknown utility — it silently emits no CSS.
 * So the class compiles, the build passes, and the text just quietly inherits
 * its colour. That is a bug you find in review or never. This makes it fail.
 *
 * Run: npm run check:tokens   (also part of `npm run verify`)
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src"];
const EXTENSIONS = new Set([".ts", ".tsx", ".css"]);

const BRAND_TOKENS = "rose|magenta|gold|ink|ivory|sand|muted";
const UTILITIES =
  "text|bg|border|from|via|to|ring|outline|decoration|fill|stroke|accent|caret|divide|shadow";

// `text-rose-600` — a numeric suffix on a brand token. The default palette is
// gone, so this renders nothing at all.
const NUMBERED_TOKEN = new RegExp(`\\b(?:${UTILITIES})-(?:${BRAND_TOKENS})-\\d{2,3}\\b`, "g");

// Raw hex outside globals.css. Ground rule 1: no hardcoded hex values.
const RAW_HEX = /#[0-9a-fA-F]{3,8}\b/g;
const HEX_EXEMPT = new Set(["src/app/globals.css"]);

/**
 * Blank out comments while preserving line numbers, so prose that *discusses*
 * a bad class (like the note in globals.css explaining this very rule) is not
 * reported as a use of it.
 */
function stripComments(source) {
  const withoutBlocks = source.replace(/\/\*[\s\S]*?\*\//g, (block) =>
    block.replace(/[^\n]/g, " "),
  );
  return withoutBlocks
    .split("\n")
    .map((line) => {
      // Ignore `//` only when it is not part of a URL scheme (https://).
      const idx = line.search(/(^|[^:])\/\//);
      return idx === -1 ? line : line.slice(0, line.indexOf("//", idx));
    })
    .join("\n");
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTENSIONS.has(extname(full))) out.push(full);
  }
  return out;
}

const problems = [];

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file).replaceAll("\\", "/");
    const lines = stripComments(readFileSync(file, "utf8")).split("\n");

    lines.forEach((line, i) => {
      for (const match of line.matchAll(NUMBERED_TOKEN)) {
        problems.push({
          file: rel,
          line: i + 1,
          found: match[0],
          why: "brand tokens have no numeric scale — the default palette is wiped, so this renders nothing",
        });
      }

      if (!HEX_EXEMPT.has(rel)) {
        for (const match of line.matchAll(RAW_HEX)) {
          problems.push({
            file: rel,
            line: i + 1,
            found: match[0],
            why: "no hardcoded hex — use a token from globals.css",
          });
        }
      }
    });
  }
}

if (problems.length === 0) {
  console.log("check:tokens — clean");
  process.exit(0);
}

console.error(`check:tokens — ${problems.length} problem(s)\n`);
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  ${p.found}`);
  console.error(`    ${p.why}\n`);
}
process.exit(1);
