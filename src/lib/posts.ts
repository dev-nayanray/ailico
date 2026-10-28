import type { ComponentType } from "react";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Optional — set when an article is substantively revised. */
  updated?: string;
  category: string;
  /** Displayed byline. Defaults to the AIlico Editorial byline. */
  author?: string;
  /** Drafts are excluded from routes, lists, RSS, and the sitemap. */
  status?: "draft" | "published";
  /** Approximate reading time, calculated from the final draft. */
  readingMinutes: number;
}

export const DEFAULT_AUTHOR = "AIlico Editorial";

/**
 * Article metadata lives here; bodies live in src/content/blog/<slug>.mdx.
 * To publish: add an entry with status "published" (the default) and create
 * the matching .mdx file. Set status: "draft" to hide a post everywhere
 * while keeping it in the repo.
 */
export const posts: PostMeta[] = [
  {
    slug: "how-to-validate-json-online",
    title: "How to Validate JSON Online (and Finally Understand the Errors)",
    description:
      "A practical guide to validating JSON, reading parse errors by line and column, and the formatting habits that prevent broken config files.",
    date: "2026-10-28",
    category: "Guides",
    readingMinutes: 7,
  },
  {
    slug: "how-to-create-utm-tracking-links",
    title: "How to Create UTM Tracking Links That Keep Your Analytics Clean",
    description:
      "Learn what each UTM parameter does, the naming conventions that prevent messy reports, and how to build consistent tagged links in seconds.",
    date: "2026-10-28",
    category: "Guides",
    readingMinutes: 8,
  },
  {
    slug: "best-ai-writing-tools-for-freelancers",
    title: "Best AI Writing Tools for Freelancers (Honest Comparison)",
    description:
      "What to look for in an AI writing assistant as a freelancer, how the leading tools differ, and where they genuinely help versus waste your time.",
    date: "2026-10-28",
    category: "AI Tools",
    readingMinutes: 9,
  },
  {
    slug: "ai-coding-assistants-for-web-developers",
    title: "AI Coding Assistants for Web Developers: What Actually Helps",
    description:
      "A grounded look at how AI coding assistants fit into professional web development, which workflows benefit most, and the review habits that keep codebases safe.",
    date: "2026-10-28",
    category: "AI Tools",
    readingMinutes: 8,
  },
];

const loaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  "how-to-validate-json-online": () => import("@/content/blog/how-to-validate-json-online.mdx"),
  "how-to-create-utm-tracking-links": () =>
    import("@/content/blog/how-to-create-utm-tracking-links.mdx"),
  "best-ai-writing-tools-for-freelancers": () =>
    import("@/content/blog/best-ai-writing-tools-for-freelancers.mdx"),
  "ai-coding-assistants-for-web-developers": () =>
    import("@/content/blog/ai-coding-assistants-for-web-developers.mdx"),
};

export function getPostBySlug(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Only published posts — used by routes, RSS, and the sitemap. */
export function publishedPosts(): PostMeta[] {
  return posts.filter((post) => (post.status ?? "published") === "published");
}

export function sortedPosts(): PostMeta[] {
  return [...publishedPosts()].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Previous (older) and next (newer) posts around a given slug, by date. */
export function postNeighbors(slug: string): { newer?: PostMeta; older?: PostMeta } {
  const ascending = [...publishedPosts()].sort((a, b) => (a.date < b.date ? -1 : 1));
  const index = ascending.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return {
    older: index > 0 ? ascending[index - 1] : undefined,
    newer: index < ascending.length - 1 ? ascending[index + 1] : undefined,
  };
}

export async function loadPostComponent(slug: string): Promise<ComponentType | null> {
  const loader = loaders[slug];
  if (!loader) return null;
  const loaded = await loader();
  return loaded.default;
}
