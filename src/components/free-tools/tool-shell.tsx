import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion, type FaqItem } from "@/components/faq";
import { freeTools } from "@/data/free-tools";
import { absoluteUrl } from "@/lib/site";

interface ToolShellProps {
  slug: string;
  intro: React.ReactNode;
  children: React.ReactNode;
  howTo: string[];
  example: React.ReactNode;
  faqs: FaqItem[];
}

export function ToolShell({ slug, intro, children, howTo, example, faqs }: ToolShellProps) {
  const tool = freeTools.find((item) => item.slug === slug);
  const related = freeTools.filter((item) => item.slug !== slug).slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <header className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
            <Link href="/free-tools" className="hover:text-accent-strong">
              Free Tools
            </Link>
            <span aria-hidden="true" className="mx-1.5">/</span>
            <span aria-current="page" className="text-ink-soft">
              {tool?.shortName ?? slug}
            </span>
          </nav>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {tool?.name ?? slug}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">{tool?.tagline}</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* The working tool */}
        <section aria-label={`Use the ${tool?.shortName}`} className="py-10">
          {children}
        </section>

        {/* What it does */}
        <section aria-labelledby="about-this-tool" className="border-t border-line py-10">
          <h2 id="about-this-tool" className="text-xl font-semibold text-ink">
            About this tool
          </h2>
          <div className="mt-4 space-y-4 leading-7 text-ink-soft">{intro}</div>
        </section>

        {/* How to use */}
        <section aria-labelledby="how-to-use" className="border-t border-line py-10">
          <h2 id="how-to-use" className="text-xl font-semibold text-ink">
            How to use it
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-ink-soft marker:font-medium marker:text-accent">
            {howTo.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Example */}
        <section aria-labelledby="example" className="border-t border-line py-10">
          <h2 id="example" className="text-xl font-semibold text-ink">
            Example
          </h2>
          <div className="mt-4 leading-7 text-ink-soft">{example}</div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="border-t border-line py-10">
          <h2 id="faq" className="text-xl font-semibold text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* Related tools */}
        <section aria-labelledby="related-tools" className="border-t border-line py-10">
          <h2 id="related-tools" className="text-xl font-semibold text-ink">
            More free tools
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/free-tools/${item.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 text-sm shadow-sm hover:border-accent-line"
                >
                  <span className="font-medium text-ink group-hover:text-accent-strong">
                    {item.name}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

export function toolPageMetadata(slug: string, title: string, description: string) {
  return {
    title,
    description,
    alternates: { canonical: `/free-tools/${slug}` },
    openGraph: {
      title: `${title} | AIlico`,
      description,
      url: absoluteUrl(`/free-tools/${slug}`),
    },
  };
}
