/** In-memory sliding window. One Node process / one container. */

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

const WINDOW_MS = 60_000;
const MAX_HITS = 120;
const MAX_KEYS = 4_000;

const hits = new Map<string, number[]>();

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function prune(now: number) {
  if (hits.size <= MAX_KEYS) return;
  for (const [key, times] of hits) {
    const fresh = times.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
    if (hits.size <= MAX_KEYS / 2) break;
  }
  if (hits.size > MAX_KEYS) {
    const overflow = hits.size - MAX_KEYS;
    const keys = hits.keys();
    for (let i = 0; i < overflow; i += 1) {
      const key = keys.next().value;
      if (key) hits.delete(key);
    }
  }
}

export function checkRateLimit(
  ip: string,
  now = Date.now(),
  maxHits = MAX_HITS,
  windowMs = WINDOW_MS,
): RateLimitResult {
  prune(now);
  const fresh = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (fresh.length >= maxHits) {
    const retryAfterMs = windowMs - (now - fresh[0]!);
    hits.set(ip, fresh);
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }
  fresh.push(now);
  hits.set(ip, fresh);
  return { ok: true };
}

/** Test-only: wipe the in-memory window. */
export function resetRateLimitForTests() {
  hits.clear();
}
