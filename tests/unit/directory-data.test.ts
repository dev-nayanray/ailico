import { describe, expect, it } from "vitest";
import {
  aiTools,
  toolCategories,
  getToolBySlug,
  getCategoryBySlug,
  toolsInCategory,
  relatedTools,
  toolDestination,
  pricingLabels,
} from "@/data/tools";
import { services, getServiceBySlug } from "@/data/services";
import { freeTools } from "@/data/free-tools";

const categorySlugs = new Set(toolCategories.map((category) => category.slug));
const httpUrl = /^https:\/\//;

describe("AI tools directory data integrity", () => {
  it("contains between 20 and 40 listings", () => {
    expect(aiTools.length).toBeGreaterThanOrEqual(20);
    expect(aiTools.length).toBeLessThanOrEqual(40);
  });

  it("has unique slugs", () => {
    const slugs = aiTools.map((tool) => tool.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("links only to official https websites", () => {
    for (const tool of aiTools) {
      expect(tool.website, tool.slug).toMatch(httpUrl);
    }
  });

  it("assigns every tool to a real category", () => {
    for (const tool of aiTools) {
      expect(categorySlugs.has(tool.category), `${tool.slug} → ${tool.category}`).toBe(true);
    }
  });

  it("fills every category with at least two tools", () => {
    for (const category of toolCategories) {
      expect(toolsInCategory(category.slug).length, category.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it("uses known pricing models with a note", () => {
    for (const tool of aiTools) {
      expect(pricingLabels[tool.pricing], tool.slug).toBeDefined();
      expect(tool.pricingNote.length, tool.slug).toBeGreaterThan(10);
    }
  });

  it("carries a valid last-verified ISO date", () => {
    for (const tool of aiTools) {
      expect(() => new Date(tool.lastVerified).toISOString(), tool.slug).not.toThrow();
      expect(new Date(tool.lastVerified).toString(), tool.slug).not.toBe("Invalid Date");
    }
  });

  it("includes honest pros AND cons for every tool", () => {
    for (const tool of aiTools) {
      expect(tool.pros.length, tool.slug).toBeGreaterThanOrEqual(2);
      expect(tool.cons.length, tool.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it("has no active affiliate partnerships yet (activates only on approval)", () => {
    // When a partnership is approved, update this expectation deliberately.
    for (const tool of aiTools) {
      expect(tool.affiliateUrl, tool.slug).toBeNull();
    }
  });

  it("features at least four tools for the homepage", () => {
    expect(aiTools.filter((tool) => tool.featured).length).toBeGreaterThanOrEqual(4);
  });

  it("resolves slugs and destinations safely", () => {
    expect(getToolBySlug("chatgpt")?.name).toBe("ChatGPT");
    expect(getToolBySlug("no-such-tool")).toBeUndefined();
    expect(getCategoryBySlug("ai-writing")?.name).toBe("AI Writing");
    // Destinations are https only — no open-redirect surface.
    for (const tool of aiTools) {
      expect(toolDestination(tool), tool.slug).toMatch(httpUrl);
    }
  });

  it("returns related tools from the same category when possible", () => {
    const claude = getToolBySlug("claude")!;
    const related = relatedTools(claude, 3);
    expect(related.length).toBe(3);
    expect(related.every((tool) => tool.slug !== "claude")).toBe(true);
  });
});

describe("services data integrity", () => {
  it("matches the three configured offers and prices", () => {
    const bySlug = new Map(services.map((service) => [service.slug, service]));
    expect(bySlug.get("website-quick-fix")?.price).toBe(79);
    expect(bySlug.get("landing-page-development")?.price).toBe(199);
    expect(bySlug.get("ai-workflow-setup")?.price).toBe(99);
  });

  it("declares deliverables, exclusions, turnaround, and client responsibilities", () => {
    for (const service of services) {
      expect(service.deliverables.length, service.slug).toBeGreaterThanOrEqual(4);
      expect(service.exclusions.length, service.slug).toBeGreaterThanOrEqual(3);
      expect(service.turnaround.length, service.slug).toBeGreaterThan(5);
      expect(service.clientResponsibilities.length, service.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it("resolves service slugs", () => {
    expect(getServiceBySlug("landing-page-development")?.name).toBe("Landing Page Development");
    expect(getServiceBySlug("nope")).toBeUndefined();
  });
});

describe("free tools data integrity", () => {
  it("lists exactly the five utilities with unique slugs", () => {
    expect(freeTools.map((tool) => tool.slug)).toEqual([
      "word-counter",
      "text-case-converter",
      "slug-generator",
      "json-formatter",
      "utm-builder",
    ]);
  });
});
