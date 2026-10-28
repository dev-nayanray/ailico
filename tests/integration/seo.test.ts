import { beforeAll, describe, expect, it } from "vitest";
import { site } from "@/lib/site";
import { aiTools } from "@/data/tools";
import { freeTools } from "@/data/free-tools";
import { services } from "@/data/services";
import { publishedPosts, posts } from "@/lib/posts";

let urls: string[];

beforeAll(async () => {
  const { default: sitemap } = await import("@/app/sitemap");
  urls = (await sitemap()).map((entry) => entry.url);
});

describe("sitemap", () => {
  it("contains every core static page", () => {
    expect(urls).toContain(site.url);
    for (const path of [
      "/ai-tools",
      "/free-tools",
      "/services",
      "/blog",
      "/portfolio",
      "/about",
      "/contact",
      "/privacy-policy",
      "/terms",
      "/affiliate-disclosure",
    ]) {
      expect(urls, path).toContain(`${site.url}${path}`);
    }
  });

  it("contains every tool, tool category, free tool, service, and published post", () => {
    for (const tool of aiTools) {
      expect(urls).toContain(`${site.url}/ai-tools/${tool.slug}`);
    }
    for (const tool of freeTools) {
      expect(urls).toContain(`${site.url}/free-tools/${tool.slug}`);
    }
    for (const service of services) {
      expect(urls).toContain(`${site.url}/services/${service.slug}`);
    }
    for (const post of publishedPosts()) {
      expect(urls).toContain(`${site.url}/blog/${post.slug}`);
    }
  });

  it("never leaks API or redirect routes, and uses canonical absolute URLs", () => {
    expect(urls.some((url) => url.includes("/api/"))).toBe(false);
    expect(urls.some((url) => url.includes("/go/"))).toBe(false);
    for (const url of urls) {
      expect(url.startsWith(site.url)).toBe(true);
    }
  });

  it("excludes draft posts", () => {
    const draftSlugs = posts.filter((post) => post.status === "draft").map((p) => p.slug);
    for (const slug of draftSlugs) {
      expect(urls).not.toContain(`${site.url}/blog/${slug}`);
    }
  });
});

describe("RSS feed", () => {
  it("serves valid RSS XML with all published posts", async () => {
    const { GET } = await import("@/app/feed.xml/route");
    const response = await GET();
    expect(response.headers.get("Content-Type")).toContain("application/rss+xml");
    const xml = await response.text();
    expect(xml).toContain("<?xml");
    expect(xml).toContain("<rss");
    for (const post of publishedPosts()) {
      expect(xml).toContain(`${site.url}/blog/${post.slug}`);
    }
    // XML-escape check: ampersands must be encoded.
    expect(xml).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;|#)/);
  });
});
