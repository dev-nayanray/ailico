import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/free-tools/slugify";

describe("slugify", () => {
  it("lowercases and hyphenates a normal title", () => {
    expect(slugify("10 Proven Ways to Improve Your Website's Loading Speed!")).toBe(
      "10-proven-ways-to-improve-your-websites-loading-speed"
    );
  });

  it("strips accented characters to their base letters", () => {
    expect(slugify("Café Résumé Über")).toBe("cafe-resume-uber");
  });

  it("converts ampersands to 'and'", () => {
    expect(slugify("Tips & Tricks")).toBe("tips-and-tricks");
  });

  it("collapses repeated separators and trims them", () => {
    expect(slugify("  hello --- world!!  ")).toBe("hello-world");
  });

  it("supports underscore separators", () => {
    expect(slugify("Hello World", "_")).toBe("hello_world");
  });

  it("respects the lowercase toggle", () => {
    expect(slugify("Hello World", "-", false)).toBe("Hello-World");
  });

  it("truncates at a word boundary when exceeding max length", () => {
    const result = slugify("one two three four five six seven eight nine ten", "-", true, 18);
    expect(result.length).toBeLessThanOrEqual(18);
    // Cutting happens at the last separator inside the cap — never mid-word.
    expect(result).toBe("one-two-three");
    expect(result.endsWith("-")).toBe(false);
  });

  it("returns an empty string for punctuation-only input", () => {
    expect(slugify("!!! ??? ***")).toBe("");
  });

  it("drops typographic quotes", () => {
    expect(slugify("it's a test")).toBe("its-a-test");
  });
});
