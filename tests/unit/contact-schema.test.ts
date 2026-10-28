import { describe, expect, it } from "vitest";
import { contactSchema, logSafeSummary } from "@/lib/validation/contact";

const validPayload = {
  name: "Jane Doe",
  email: "Jane@Example.com",
  website: "",
  service: "website-quick-fix",
  budget: "",
  message: "My site has a broken mobile menu and two broken links to fix.",
  consent: true,
  company_website: "",
};

describe("contactSchema", () => {
  it("accepts a valid submission and normalizes the email to lowercase", () => {
    const parsed = contactSchema.parse(validPayload);
    expect(parsed.email).toBe("jane@example.com");
  });

  it("accepts a valid https website URL", () => {
    const parsed = contactSchema.parse({ ...validPayload, website: "https://example.com" });
    expect(parsed.website).toBe("https://example.com");
  });

  it("rejects a name that is too short", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email with a readable message", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0].message).toContain("email");
  });

  it("rejects a non-http(s) website URL", () => {
    const result = contactSchema.safeParse({ ...validPayload, website: "javascript:alert(1)" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown service", () => {
    const result = contactSchema.safeParse({ ...validPayload, service: "free-lunch" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 20 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects a message longer than the cap", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "x".repeat(3001) });
    expect(result.success).toBe(false);
  });

  it("requires explicit consent", () => {
    const result = contactSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
  });

  it("accepts a filled honeypot (silently discarded later)", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      company_website: "http://spam.example",
    });
    expect(result.success).toBe(true);
  });
});

describe("logSafeSummary", () => {
  it("never includes the message body or full email", () => {
    const parsed = contactSchema.parse(validPayload);
    const summary = logSafeSummary(parsed);
    expect(summary).not.toContain(validPayload.message);
    expect(summary).not.toContain("jane@example.com");
    expect(summary).toContain("example.com"); // domain only
  });
});
