/**
 * Rate limiting with two backends:
 *
 * 1. In-memory sliding window (default) — per server instance. Fine for a
 *    single-instance deployment; counters reset on restart.
 * 2. Upstash Redis fixed window (optional) — shared across instances when
 *    UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are configured.
 *    Uses the plain REST API, so it adds no dependencies.
 *
 * `limit()` picks the shared backend automatically when configured and falls
 * back to memory (with a one-time warning in production) otherwise.
 */

import { getEnv } from "@/lib/env";

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
  backend: "memory" | "upstash";
}

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

/** In-memory sliding window. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((time) => now - time < windowMs);

  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0];
    buckets.set(key, bucket);
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
      backend: "memory",
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);

  // Opportunistic cleanup so the map does not grow without bound.
  if (buckets.size > 5000) {
    for (const [bucketKey, value] of buckets) {
      if (
        value.timestamps.length === 0 ||
        now - value.timestamps[value.timestamps.length - 1] > windowMs
      ) {
        buckets.delete(bucketKey);
      }
    }
  }

  return {
    ok: true,
    remaining: limit - bucket.timestamps.length,
    retryAfterSeconds: 0,
    backend: "memory",
  };
}

/** Reset memory counters — used by tests. */
export function resetRateLimitMemory(): void {
  buckets.clear();
}

/** Fixed-window limiter over Upstash Redis REST (shared across instances). */
async function upstashLimit(
  key: string,
  limit: number,
  windowSeconds: number,
  url: string,
  token: string
): Promise<RateLimitResult> {
  // One round trip via pipeline: INCR then EXPIRE only on the first hit.
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["TTL", key],
    ]),
  });
  if (!response.ok) {
    // Fail open: a limiter outage must not take the site down, but say so.
    console.error(`[rate-limit] Upstash error ${response.status}; failing open`);
    return { ok: true, remaining: limit, retryAfterSeconds: 0, backend: "upstash" };
  }
  const payload = (await response.json()) as Array<{ result: number }>;
  const count = payload[0]?.result ?? 0;
  let ttl = payload[1]?.result ?? -1;
  if (ttl === -1) {
    await fetch(`${url}/expire/${encodeURIComponent(key)}/${windowSeconds}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => undefined);
    ttl = windowSeconds;
  }
  return {
    ok: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfterSeconds: ttl > 0 ? ttl : windowSeconds,
    backend: "upstash",
  };
}

let warnedMemoryOnly = false;

export async function limit(
  key: string,
  max: number,
  windowMs: number
): Promise<RateLimitResult> {
  const env = getEnv();
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
    return upstashLimit(
      `ailico:rl:${key}`,
      max,
      Math.ceil(windowMs / 1000),
      env.UPSTASH_REDIS_REST_URL,
      env.UPSTASH_REDIS_REST_TOKEN
    );
  }
  if (process.env.NODE_ENV === "production" && !warnedMemoryOnly) {
    warnedMemoryOnly = true;
    console.warn(
      "[rate-limit] Running multi-instance-hostile memory limiter. Set UPSTASH_REDIS_REST_URL/TOKEN for shared limits."
    );
  }
  return rateLimit(key, max, windowMs);
}
