import { existsSync } from "node:fs";
import path from "node:path";

/**
 * True when a file actually exists under public/.
 *
 * Server-only, and evaluated at build time because every page using it is
 * statically prerendered. The point is that dropping a photograph into
 * public/assets/services/ and rebuilding swaps the placeholder for the real
 * image with no code or data edit — content gate B1 unblocks itself.
 *
 * Never import this into a Client Component: node:fs does not exist there.
 */
export function hasPublicAsset(publicPath: string): boolean {
  if (!publicPath.startsWith("/")) return false;
  return existsSync(path.join(process.cwd(), "public", publicPath));
}
