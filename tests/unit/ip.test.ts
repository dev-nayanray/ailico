import { afterEach, describe, expect, it } from "vitest";
import { clientIpFromHeaders } from "@/lib/security/ip";

const originalTrust = process.env.TRUST_PROXY_HEADERS;

afterEach(() => {
  if (originalTrust === undefined) delete process.env.TRUST_PROXY_HEADERS;
  else process.env.TRUST_PROXY_HEADERS = originalTrust;
});

describe("clientIpFromHeaders", () => {
  it("prefers CF-Connecting-IP when present (Cloudflare edge-set)", () => {
    const ip = clientIpFromHeaders(
      new Headers({
        "cf-connecting-ip": "203.0.113.10",
        "x-forwarded-for": "198.51.100.7, 203.0.113.99",
      })
    );
    expect(ip).toBe("203.0.113.10");
  });

  it("takes the first X-Forwarded-For hop", () => {
    const ip = clientIpFromHeaders(
      new Headers({ "x-forwarded-for": "198.51.100.7, 10.0.0.1" })
    );
    expect(ip).toBe("198.51.100.7");
  });

  it("falls back to x-real-ip", () => {
    expect(clientIpFromHeaders(new Headers({ "x-real-ip": "192.0.2.4" }))).toBe("192.0.2.4");
  });

  it("returns 'unknown' with no headers", () => {
    expect(clientIpFromHeaders(new Headers())).toBe("unknown");
  });

  it("ignores all headers when TRUST_PROXY_HEADERS=false", () => {
    process.env.TRUST_PROXY_HEADERS = "false";
    expect(
      clientIpFromHeaders(new Headers({ "x-forwarded-for": "198.51.100.7" }))
    ).toBe("unknown");
  });
});
