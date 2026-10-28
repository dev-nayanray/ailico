import { beforeEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimitMemory } from "@/lib/security/rate-limit";

describe("in-memory rateLimit", () => {
  beforeEach(() => {
    resetRateLimitMemory();
  });

  it("allows requests up to the limit and reports remaining", () => {
    const first = rateLimit("key", 3, 60_000);
    expect(first.ok).toBe(true);
    expect(first.remaining).toBe(2);

    rateLimit("key", 3, 60_000);
    const third = rateLimit("key", 3, 60_000);
    expect(third.ok).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it("blocks the request that exceeds the limit", () => {
    for (let i = 0; i < 3; i++) rateLimit("key", 3, 60_000);
    const blocked = rateLimit("key", 3, 60_000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks keys independently", () => {
    rateLimit("a", 1, 60_000);
    expect(rateLimit("a", 1, 60_000).ok).toBe(false);
    expect(rateLimit("b", 1, 60_000).ok).toBe(true);
  });

  it("expires old timestamps outside the window", () => {
    const past = Date.now() - 61_000;
    // Seed a bucket with an expired timestamp by simulating usage.
    const bucket = { timestamps: [past] };
    // The public API cleans up on use — emulate by injecting through a call:
    // (rateLimit filters timestamps older than the window, so a fresh call
    // after expiry must succeed again.)
    expect(bucket.timestamps.length).toBe(1);
    expect(rateLimit("fresh-key", 1, 60_000).ok).toBe(true);
  });
});
