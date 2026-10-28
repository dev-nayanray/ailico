import { beforeEach, describe, expect, it } from "vitest";
import { resetRateLimitMemory } from "@/lib/security/rate-limit";
import { resetEnvCache } from "@/lib/env";

/**
 * Integration tests for the contact API route handler, executed directly
 * (no HTTP server). Storage runs in dev-log mode (no Supabase/webhook in the
 * test environment), which is exactly what NODE_ENV=test implies.
 */

const VALID_BODY = {
  name: "Jane Doe",
  email: "jane@example.com",
  website: "",
  service: "website-quick-fix",
  budget: "",
  message: "My site has a broken mobile menu and two broken links to fix.",
  consent: true,
  company_website: "",
};

function postRequest(body: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function run(body: unknown, ip?: string) {
  const { POST } = await import("@/app/api/contact/route");
  const response = await POST(postRequest(body, ip));
  return { status: response.status, json: await response.json().catch(() => ({})) };
}

beforeEach(() => {
  resetRateLimitMemory();
  resetEnvCache();
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.CONTACT_WEBHOOK_URL;
});

describe("POST /api/contact", () => {
  it("accepts a valid submission", async () => {
    const { status, json } = await run(VALID_BODY, "198.51.100.1");
    expect(status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("rejects invalid input with a readable error", async () => {
    const { status, json } = await run(
      { ...VALID_BODY, email: "broken" },
      "198.51.100.2"
    );
    expect(status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("email");
  });

  it("rejects a malformed JSON body", async () => {
    const { status } = await run("{not json", "198.51.100.3");
    expect(status).toBe(400);
  });

  it("rejects oversized bodies with 413", async () => {
    const { status } = await run(
      { ...VALID_BODY, message: "x".repeat(20_000) },
      "198.51.100.4"
    );
    expect(status).toBe(413);
  });

  it("silently accepts honeypot submissions without consuming storage", async () => {
    const { status, json } = await run(
      { ...VALID_BODY, company_website: "http://spam.example" },
      "198.51.100.5"
    );
    expect(status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("throttles duplicate submissions from the same email", async () => {
    const ip = "198.51.100.6";
    await run(VALID_BODY, ip);
    await run(VALID_BODY, ip);
    const third = await run(VALID_BODY, ip);
    expect(third.status).toBe(429);
    expect(third.json.error).toContain("already received");
  });

  it("enforces the per-IP limit across different emails", async () => {
    const ip = "198.51.100.7";
    const results = [];
    for (let i = 0; i < 6; i++) {
      results.push(
        await run({ ...VALID_BODY, email: `user${i}@example.com` }, ip)
      );
    }
    expect(results.slice(0, 5).every((r) => r.status === 200)).toBe(true);
    expect(results[5].status).toBe(429);
    expect(Number(results[5].json.error.length)).toBeGreaterThan(0);
  });
});
