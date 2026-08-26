/**
 * In-memory IP bucket for the booking Server Action.
 *
 * docs/04-architecture.md deferred this to "if spam becomes a problem" — by
 * which point the inbox is unusable and the Resend quota is spent. Ten lines
 * costs nothing.
 *
 * Resets on deploy and on cold start, which is fine at this volume. Move to
 * Upstash Redis only when that stops being true.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Cheap sweep so the map cannot grow without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return true;
}
