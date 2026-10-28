import type { Metadata } from "next";
import Link from "next/link";
import { ToolsDirectory } from "@/components/tools-directory";
import { aiTools, toolCategories, toolCountByCategory } from "@/lib/tools";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "AI Tools Directory — 30 Verified Tools Across 8 Categories",
  description:
    "Browse 30 verified AI tools for writing, images, video, coding, productivity, marketing, SEO, and automation. Honest pros and cons, pricing models, and last-verified dates — no pay-to-play rankings.",
  alternates: { canonical: "/ai-tools" },
  openGraph: {
    title: "AI Tools Directory — 30 Verified Tools Across 8 Categories | AIlico",
    description:
      "Browse 30 verified AI tools with honest pros and cons, pricing models, and last-verified dates.",
    url: "/ai-tools",
  },
};

export default async function AiToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const initialQuery = typeof q === "string" ? q.slice(0, 100) : "";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AIlico AI Tools Directory",
    numberOfItems: aiTools.length,
    itemListElement: aiTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `/ai-tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            AI Tools Directory
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {aiTools.length} verified AI tools, organized for real decisions
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            Every listing is a real product reviewed against its official website and
            documentation. We record honest pros and cons, a pricing model (not volatile
            exact prices), and the date we last verified the listing.
          </p>
          <nav aria-label="Tool categories" className="mt-6 flex flex-wrap gap-2">
            {toolCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/ai-tools/category/${category.slug}`}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent-line hover:text-accent-strong"
              >
                {category.name}
                <span className="ml-1.5 text-xs text-ink-faint">
                  {toolCountByCategory(category.slug)}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ToolsDirectory tools={aiTools} initialQuery={initialQuery} />
      </section>

      <section aria-labelledby="category-guides" className="border-t border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            align="left"
            eyebrow="Browse by Category"
            title="Start with what you're trying to do"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {toolCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/ai-tools/category/${category.slug}`}
                className="group rounded-xl border border-line bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-ink group-hover:text-accent-strong">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-faint">
                  {toolCountByCategory(category.slug)} tools
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">
                  {category.headline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
