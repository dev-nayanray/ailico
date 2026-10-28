import { describe, expect, it } from "vitest";
import { buildUtmUrl, isValidHttpUrl } from "@/lib/free-tools/utm";

describe("isValidHttpUrl", () => {
  it("accepts http and https URLs", () => {
    expect(isValidHttpUrl("https://example.com/page")).toBe(true);
    expect(isValidHttpUrl("http://example.com")).toBe(true);
  });

  it("rejects non-http protocols and garbage", () => {
    expect(isValidHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isValidHttpUrl("ftp://example.com")).toBe(false);
    expect(isValidHttpUrl("example.com")).toBe(false);
    expect(isValidHttpUrl("")).toBe(false);
  });
});

describe("buildUtmUrl", () => {
  const base = {
    url: "https://example.com/spring-offer",
    source: "newsletter",
    medium: "email",
    campaign: "spring-sale-2026",
  };

  it("appends the three required parameters, properly encoded", () => {
    expect(buildUtmUrl(base)).toBe(
      "https://example.com/spring-offer?utm_source=newsletter&utm_medium=email&utm_campaign=spring-sale-2026"
    );
  });

  it("adds optional term and content when provided", () => {
    const url = buildUtmUrl({ ...base, term: "running shoes", content: "banner-a" });
    expect(url).toContain("utm_term=running+shoes");
    expect(url).toContain("utm_content=banner-a");
  });

  it("preserves existing query parameters", () => {
    const url = buildUtmUrl({ ...base, url: "https://example.com/page?lang=en" });
    expect(url).toContain("lang=en");
    expect(url).toContain("utm_source=newsletter");
  });

  it("trims whitespace from values", () => {
    const url = buildUtmUrl({ ...base, source: "  google  " });
    expect(url).toContain("utm_source=google");
  });

  it("returns null when required inputs are missing or invalid", () => {
    expect(buildUtmUrl({ ...base, url: "not-a-url" })).toBeNull();
    expect(buildUtmUrl({ ...base, source: "  " })).toBeNull();
    expect(buildUtmUrl({ ...base, medium: "" })).toBeNull();
    expect(buildUtmUrl({ ...base, campaign: undefined as unknown as string })).toBeNull();
  });
});
