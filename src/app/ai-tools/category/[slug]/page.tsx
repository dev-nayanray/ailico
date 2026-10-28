import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { toolCategories, getCategoryBySlug, toolsInCategory } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return toolCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const count = toolsInCategory(slug).length;
  const title = `Best ${category.name} Tools — ${count} Verified Options`;
  const description = `${category.description.slice(0, 150)}… Browse ${count} verified ${category.name.toLowerCase()} tools with honest pros, cons, and pricing models on AIlico.`;
  return {
    title,
    description,
    alternates: { canonical: `/ai-tools/category/${category.slug}` },
    openGraph: {
      title: `${title} | AIlico`,
      description,
      url: `/ai-tools/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const tools = toolsInCategory(slug);
  const otherCategories = toolCategories.filter((c) => c.slug !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: `${site.url}/ai-tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${site.url}/ai-tools/category/${category.slug}`,
      },
    ],
  };

  return (
    <div className="pb-16">
      <header className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/ai-tools" className="hover:text-accent-strong">AI Tools</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="text-ink-soft">{category.name}</li>
            </ol>
          </nav>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {category.headline}
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-ink-soft">{category.description}</p>
          <p className="mt-3 text-sm font-medium text-accent">
            {tools.length} verified {tools.length === 1 ? "tool" : "tools"} in this category
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-labelledby="other-categories" className="border-t border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="other-categories" className="text-lg font-semibold text-ink">
            Explore other categories
          </h2>
          <nav aria-label="Other tool categories" className="mt-4 flex flex-wrap gap-2">
            {otherCategories.map((other) => (
              <Link
                key={other.slug}
                href={`/ai-tools/category/${other.slug}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-accent-line hover:text-accent-strong"
              >
                {other.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
