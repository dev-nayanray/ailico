import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, ShieldCheck, ThumbsDown, ThumbsUp, Users, X } from "lucide-react";
import { aiTools, getToolBySlug, getCategoryBySlug, pricingLabels, relatedTools } from "@/data/tools";
import { ToolCard } from "@/components/tool-card";
import { ButtonLink } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return aiTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const title = `${tool.name} Review: Features, Pricing Model, Pros & Cons`;
  const description = `${tool.tagline} See what ${tool.name} does, who it's for, its ${pricingLabels[tool.pricing].toLowerCase()} pricing model, and honest pros and cons — verified ${formatDate(tool.lastVerified)}.`;
  return {
    title,
    description,
    alternates: { canonical: `/ai-tools/${tool.slug}` },
    openGraph: {
      title: `${title} | AIlico`,
      description,
      url: `/ai-tools/${tool.slug}`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const related = relatedTools(tool, 3);
  const isAffiliate = tool.affiliateUrl !== null;

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline,
    url: tool.website,
    applicationCategory: category?.name ?? "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: tool.pricingNote,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: `${site.url}/ai-tools` },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `${site.url}/ai-tools/category/${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 4 : 3,
        name: tool.name,
        item: `${site.url}/ai-tools/${tool.slug}`,
      },
    ],
  };

  return (
    <article className="pb-16">
      {/* Header */}
      <header className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/ai-tools" className="hover:text-accent-strong">AI Tools</Link></li>
              {category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href={`/ai-tools/category/${category.slug}`}
                      className="hover:text-accent-strong"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-soft">{tool.name}</li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-lg font-bold text-white"
                >
                  {tool.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {tool.name}
                  </h1>
                  <p className="mt-1 text-sm text-ink-soft">{tool.tagline}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {category && <CategoryBadge>{category.name}</CategoryBadge>}
                <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                  {pricingLabels[tool.pricing]} pricing
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-faint">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  Verified {formatDate(tool.lastVerified)}
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={`/go/${tool.slug}`}
                {...(isAffiliate ? { rel: "sponsored nofollow noopener" } : { rel: "noopener" })}
                target="_blank"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 font-medium text-white shadow-sm transition-colors hover:bg-accent-strong"
              >
                Visit {tool.name}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              {isAffiliate && (
                <p className="mt-2 max-w-48 text-xs text-ink-faint">
                  Affiliate link — we may earn a commission at no extra cost to you.
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Overview */}
        <section aria-labelledby="overview" className="py-10">
          <h2 id="overview" className="text-xl font-semibold text-ink">
            What is {tool.name}?
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-ink-soft">{tool.description}</p>
          <p className="mt-4 rounded-lg border border-line bg-surface-tint p-4 text-sm text-ink-soft">
            <strong className="font-semibold text-ink">Pricing:</strong> {tool.pricingNote}{" "}
            Check the official website for current prices — they change often, so we record
            pricing models rather than exact figures.
          </p>
        </section>

        {/* Key features */}
        <section aria-labelledby="features" className="border-t border-line py-10">
          <h2 id="features" className="text-xl font-semibold text-ink">
            Key features
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {tool.keyFeatures.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Pros & cons */}
        <section aria-labelledby="pros-cons" className="border-t border-line py-10">
          <h2 id="pros-cons" className="text-xl font-semibold text-ink">
            Pros and cons
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-green-800">
                <ThumbsUp className="h-4 w-4" aria-hidden="true" />
                What we like
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                {tool.pros.map((pro) => (
                  <li key={pro} className="flex gap-2">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-green-600" aria-hidden="true" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-orange-800">
                <ThumbsDown className="h-4 w-4" aria-hidden="true" />
                What to watch out for
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                {tool.cons.map((con) => (
                  <li key={con} className="flex gap-2">
                    <X className="mt-1 h-3.5 w-3.5 shrink-0 text-orange-600" aria-hidden="true" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Use cases & audience */}
        <section aria-labelledby="use-cases" className="border-t border-line py-10">
          <h2 id="use-cases" className="text-xl font-semibold text-ink">
            What {tool.name} is used for
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {tool.useCases.map((useCase) => (
              <li
                key={useCase}
                className="rounded-lg border border-line bg-surface p-3.5 text-sm text-ink-soft"
              >
                {useCase}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent-line bg-accent-soft p-5">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" aria-hidden="true" />
            <p className="text-sm leading-6 text-ink">
              <strong className="font-semibold">Best for:</strong> {tool.bestFor}
            </p>
          </div>
        </section>

        {/* Tags */}
        <section aria-label="Tags" className="border-t border-line py-10">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <Link
                key={tag}
                href={`/ai-tools?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft hover:border-accent-line hover:text-accent-strong"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Service CTA */}
        <section className="rounded-xl border border-accent-line bg-accent-soft/60 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-ink">
            Want help putting {tool.name} to work?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
            Our AI Workflow Setup service designs, documents, and hands over one reusable
            workflow built around tools like this — for a fixed price of $99.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href="/services/ai-workflow-setup" size="sm">
              See the AI Workflow Setup
            </ButtonLink>
            <ButtonLink href="/contact?service=ai-workflow-setup" variant="outline" size="sm">
              Get a Quote
            </ButtonLink>
          </div>
        </section>

        {/* Related tools */}
        <section aria-labelledby="related" className="border-t border-line py-10">
          <h2 id="related" className="text-xl font-semibold text-ink">
            Related tools
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedTool) => (
              <ToolCard key={relatedTool.slug} tool={relatedTool} />
            ))}
          </div>
          <Link
            href="/ai-tools"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all AI tools
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </article>
  );
}
