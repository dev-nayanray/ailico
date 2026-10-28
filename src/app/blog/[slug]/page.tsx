import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { posts, getPostBySlug, loadPostComponent, postNeighbors, DEFAULT_AUTHOR } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  // Drafts are never generated or served.
  return posts
    .filter((post) => (post.status ?? "published") === "published")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.status === "draft") return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author ?? DEFAULT_AUTHOR],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.status === "draft") notFound();

  const Content = await loadPostComponent(slug);
  if (!Content) notFound();

  const { newer, older } = postNeighbors(slug);
  const others = posts
    .filter((item) => item.slug !== slug && item.status !== "draft")
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <article className="pb-16">
        <header className="border-b border-line bg-surface-tint">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
            <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
              <Link href="/blog" className="hover:text-accent-strong">
                Blog
              </Link>
              <span aria-hidden="true" className="mx-1.5">/</span>
              <span aria-current="page" className="text-ink-soft">{post.category}</span>
            </nav>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
              <span>{post.author ?? DEFAULT_AUTHOR}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>Published {formatDate(post.date)}</time>
              {post.updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.updated}>Updated {formatDate(post.updated)}</time>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose-ailico py-10">
            <Content />
          </div>

          <div className="rounded-xl border border-accent-line bg-accent-soft/60 p-6">
            <h2 className="text-lg font-semibold text-ink">Need help with this?</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              AIlico builds websites, landing pages, and AI workflows for small
              businesses — fixed prices, written scope, no surprises.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium text-white hover:bg-accent-strong"
              >
                View services
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:border-accent"
              >
                Get a quote
              </Link>
            </div>
          </div>

          <nav aria-label="Article navigation" className="mt-8 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group rounded-lg border border-line bg-surface p-4 shadow-sm hover:border-accent-line"
              >
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-faint">
                  <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                  Older
                </span>
                <p className="mt-1 text-sm font-medium leading-6 text-ink group-hover:text-accent-strong">
                  {older.title}
                </p>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="group rounded-lg border border-line bg-surface p-4 text-right shadow-sm hover:border-accent-line"
              >
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-faint">
                  Newer
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
                <p className="mt-1 text-sm font-medium leading-6 text-ink group-hover:text-accent-strong">
                  {newer.title}
                </p>
              </Link>
            )}
          </nav>

          <section aria-labelledby="more-articles" className="border-t border-line py-10">
            <h2 id="more-articles" className="text-lg font-semibold text-ink">
              Keep reading
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="block h-full rounded-lg border border-line bg-surface p-4 text-sm leading-6 text-ink-soft shadow-sm hover:border-accent-line"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </Link>
          </section>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
