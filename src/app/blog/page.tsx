import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { sortedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Practical Guides on AI Tools and Web Work",
  description:
    "Honest, up-to-date guides on choosing AI tools, validating JSON, building UTM links, and getting real work done with AI — written for freelancers, developers, and small businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Practical Guides on AI Tools and Web Work | AIlico",
    description:
      "Honest, up-to-date guides on choosing AI tools and getting real work done.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = sortedPosts();

  return (
    <>
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Blog
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Practical guides, honest comparisons
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            We write the articles we wished existed when evaluating AI tools: grounded
            in verified facts, clear about limitations, and always ending with a
            concrete next step.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-xs text-ink-faint">
                  <span className="font-medium text-accent">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-7 text-ink group-hover:text-accent-strong">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{post.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent">
                  Read the guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
