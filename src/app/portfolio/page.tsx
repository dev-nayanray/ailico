import type { Metadata } from "next";
import Link from "next/link";
import { Check, ExternalLink, FileText, Layers, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Portfolio & Sample Work",
  description:
    "See what AIlico delivers: our flagship self-built case study, example deliverable walkthroughs for each service, and the standards every project is held to. Client case studies are added as projects complete.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio & Sample Work | AIlico",
    description:
      "Our flagship case study, example deliverables per service, and delivery standards.",
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Portfolio
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            What working with AIlico looks like
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            We are a new studio, and we believe in showing real evidence rather than
            decorating a page with stock logos. Below: our flagship self-built case
            study, honest example walkthroughs of each service, and the standards every
            engagement is held to. Client case studies appear here — with written
            permission — as projects complete.
          </p>
        </div>
      </section>

      {/* Case study 1: this site */}
      <section aria-labelledby="case-study-ailico" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Case Study 01 — Self-initiated
            </p>
            <h2 id="case-study-ailico" className="mt-2 text-2xl font-bold text-ink">
              AIlico itself: a complete product built end to end
            </h2>
            <p className="mt-4 leading-7 text-ink-soft">
              The site you are browsing right now is our most complete demonstration —
              designed, built, and shipped by us, end to end. It practices everything
              our services promise:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "A full Next.js + TypeScript + Tailwind CSS codebase, statically generated for speed and SEO",
                "30 verified AI tool listings across 8 category pages with structured data",
                "Five genuinely working, privacy-first browser utilities — no fake buttons anywhere",
                "Conversion-focused service pages with transparent pricing and written scopes",
                "Accessibility baked in: keyboard navigation, semantic HTML, ARIA states, skip link",
                "Security headers, rate limiting, and spam protection on every public endpoint",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/" size="sm" variant="outline">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Browse the live site
              </ButtonLink>
              <ButtonLink href="/contact?service=landing-page-development" size="sm">
                Build something like this
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
              Project facts
            </h3>
            <dl className="mt-4 space-y-4">
              {[
                ["Type", "Self-initiated product (this website)"],
                ["Stack", "Next.js 15, React, TypeScript, Tailwind CSS"],
                ["Scope", "Design, development, content, SEO, deployment"],
                ["Pages", "40+ routes including tool pages and articles"],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col gap-0.5">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">{term}</dt>
                  <dd className="text-sm text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 rounded-lg bg-surface-tint p-3 text-xs leading-5 text-ink-faint">
              We do not publish traffic or performance screenshots we cannot verify.
              When this site accumulates real analytics history, we will add verifiable
              numbers here.
            </p>
          </div>
        </div>
      </section>

      {/* Example deliverable walkthroughs */}
      <section aria-labelledby="example-deliverables" className="border-y border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            align="left"
            eyebrow="Illustrative Walkthroughs"
            title="What each service delivers, step by step"
            description="These are transparent illustrations of our delivery process — not fabricated client projects. Client case studies with verified outcomes will replace these as real engagements complete."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">Website Quick Fix</h3>
              <ol className="mt-3 space-y-2.5 text-sm leading-6 text-ink-soft">
                <li>1. You list the issues you see (with URLs/screenshots)</li>
                <li>2. We verify each one and confirm the three in scope</li>
                <li>3. Fixes are applied on a staging copy first</li>
                <li>4. You approve, we push live</li>
                <li>5. You receive a before/after summary document</li>
              </ol>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">Landing Page Development</h3>
              <ol className="mt-3 space-y-2.5 text-sm leading-6 text-ink-soft">
                <li>1. Structured brief: offer, audience, desired action</li>
                <li>2. Wireframe of sections for your approval</li>
                <li>3. Build: responsive page, form, metadata</li>
                <li>4. Preview link for your review</li>
                <li>5. Revision round, then deployment + handover notes</li>
              </ol>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                <Workflow className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">AI Workflow Setup</h3>
              <ol className="mt-3 space-y-2.5 text-sm leading-6 text-ink-soft">
                <li>1. We map the task: inputs, outputs, edge cases</li>
                <li>2. Prompts are built and tested on your real examples</li>
                <li>3. The workflow is assembled in the chosen tools</li>
                <li>4. Live walkthrough with your team member</li>
                <li>5. After a week: adjustment round, then full handover</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section aria-labelledby="standards" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Our Standards"
          title="Every project, without exception"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Written scope approved by you before payment",
            "Fixed price — the quote is the invoice",
            "Responsive layouts tested on real device sizes",
            "Accessible, semantic HTML as a baseline",
            "No placeholder buttons or fake functionality, ever",
            "Full handover: you own everything we build",
          ].map((standard) => (
            <li
              key={standard}
              className="flex gap-2.5 rounded-lg border border-line bg-surface p-4 text-sm leading-6 text-ink-soft"
            >
              <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {standard}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-accent-soft/60">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Your project could be case study 02
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Early clients get introductory pricing and extra attention — we succeed
            together or we do not take the job.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Start the conversation
            </ButtonLink>
            <Link
              href="/services"
              className="text-sm font-medium text-accent hover:text-accent-strong"
            >
              Compare the three services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
