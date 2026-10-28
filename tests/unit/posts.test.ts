import { describe, expect, it } from "vitest";
import { posts, publishedPosts, sortedPosts, postNeighbors, getPostBySlug } from "@/lib/posts";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

describe("posts metadata", () => {
  it("has unique slugs", () => {
    const slugs = posts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses valid ISO dates everywhere", () => {
    for (const post of posts) {
      expect(post.date, post.slug).toMatch(isoDate);
      if (post.updated) expect(post.updated, post.slug).toMatch(isoDate);
    }
  });

  it("defaults to published; drafts are excluded from public views", () => {
    expect(publishedPosts().length).toBeLessThanOrEqual(posts.length);
    expect(sortedPosts().every((post) => post.status !== "draft")).toBe(true);
  });

  it("sorts newest first", () => {
    const dates = sortedPosts().map((post) => post.date);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sorted);
  });

  it("returns sensible neighbors for a middle post", () => {
    const list = sortedPosts();
    if (list.length >= 3) {
      const middle = list[1];
      const neighbors = postNeighbors(middle.slug);
      expect(neighbors.older?.slug).toBeDefined();
      expect(neighbors.newer?.slug).toBeDefined();
      expect(neighbors.older?.slug).not.toBe(middle.slug);
    }
  });

  it("resolves posts by slug", () => {
    expect(getPostBySlug("how-to-validate-json-online")?.title).toContain("JSON");
    expect(getPostBySlug("missing")).toBeUndefined();
  });
});
