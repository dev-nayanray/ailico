/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Good enough for a single-instance MVP deployment. For multi-instance
 * hosting, move the counters to a shared store (e.g., Upstash Redis free
 * tier) before scaling horizontally.
 */

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; remaining: number; retryAfterSeconds: number } {
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
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);

  // Opportunistic cleanup so the map does not grow without bound.
  if (buckets.size > 5000) {
    for (const [bucketKey, value] of buckets) {
      if (value.timestamps.length === 0 || now - value.timestamps[value.timestamps.length - 1] > windowMs) {
        buckets.delete(bucketKey);
      }
    }
  }

  return { ok: true, remaining: limit - bucket.timestamps.length, retryAfterSeconds: 0 };
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
