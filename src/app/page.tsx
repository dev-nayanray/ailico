import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Clock,
  FileText,
  HandCoins,
  Lock,
  Search,
  ShieldCheck,
  Timer,
  Wrench,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq";
import { ToolCard } from "@/components/tool-card";
import { HeroSearch } from "@/components/hero-search";
import { featuredTools, aiTools, LAST_VERIFIED } from "@/lib/tools";
import { freeTools } from "@/lib/free-tools";
import { services } from "@/lib/services";
import { sortedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const homeFaq = [
  {
    question: "Is AIlico free to use?",
    answer:
      "Yes. The AI tools directory and all five free online utilities (word counter, case converter, slug generator, JSON formatter, and UTM builder) are completely free, work without an account, and process your text locally in your browser wherever practical.",
  },
  {
    question: "How do you choose which AI tools are listed?",
    answer:
      "Every listing is a real product we have reviewed using its official website and public documentation. We record what each tool actually does, its pricing model (not exact prices, which change often), clear pros and cons, and the date we last verified the listing. We never accept payment to add or improve a listing.",
  },
  {
    question: "Do you earn commissions from AI tool recommendations?",
    answer:
      "Some listings may include affiliate links in the future, but only after a partnership is approved in writing. Any affiliate relationship is disclosed on this page and on our affiliate disclosure page, and affiliate links never change our rankings or ratings. Editorial recommendations and paid placements are always distinguishable.",
  },
  {
    question: "What services do you offer and what do they cost?",
    answer:
      "We offer three fixed-scope services: Website Quick Fix ($79) for up to three agreed fixes on an existing site, Landing Page Development ($199) for one conversion-focused page, and AI Workflow Setup ($99) for one documented, reusable AI workflow. Scope is always agreed in writing before payment.",
  },
  {
    question: "Do the free tools send my text to a server?",
    answer:
      "No. The word counter, case converter, slug generator, JSON formatter, and UTM builder all run entirely in your browser. Your text is never uploaded, logged, or stored by us.",
  },
  {
    question: "Who is AIlico for?",
    answer:
      "Freelancers, creators, developers, marketers, and small businesses — especially in the US, UK, and other English-speaking markets — who want practical, honest guidance on AI tools plus expert help building websites and AI workflows.",
  },
];

const benefits = [
  {
    icon: Search,
    title: "Find the right AI tool faster",
    description:
      "Skip the sponsored blog posts. Our directory lists 30 verified tools across 8 categories with honest pros, cons, and pricing models — so you can shortlist in minutes.",
  },
  {
    icon: BadgeCheck,
    title: "Listings you can trust",
    description:
      "Every tool page states what the product does, who it suits, and when we last verified it. No fake reviews, no invented ratings, no pay-to-play rankings.",
  },
  {
    icon: Timer,
    title: "Free utilities that just work",
    description:
      "Five focused online tools — word counting, case conversion, slug generation, JSON formatting, and UTM building — no signup, no uploads, instant results.",
  },
  {
    icon: Wrench,
    title: "Expert help when you need it",
    description:
      "Fixed-scope services at transparent prices: quick website fixes, landing pages, and AI workflow setups with clear deliverables and turnaround times.",
  },
];

const editorialPrinciples = [
  {
    icon: ShieldCheck,
    title: "We verify before we list",
    description:
      `Every listing reflects the product's official website and documentation, with a "last verified" date (most recently ${formatDate(LAST_VERIFIED)}) so you know how fresh our information is.`,
  },
  {
    icon: Lock,
    title: "No pay-to-play rankings",
    description:
      "Tools are organized by usefulness and category fit, never by commission. Paid placements, if ever offered, will be clearly labeled and visually distinct.",
  },
  {
    icon: BookOpen,
    title: "Honest pros and cons",
    description:
      "Every tool has real limitations and we state them. We never invent testing results, quotes, ratings, or traffic statistics.",
  },
  {
    icon: HandCoins,
    title: "Transparent affiliate policy",
    description:
      "Affiliate links only appear after a partnership is approved, are labeled as sponsored, and never influence what we list or how we describe it.",
  },
];

export default function HomePage() {
  const featured = featuredTools();
  const latestPosts = sortedPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-strong">
            Discover AI. Create smarter.
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl sm:leading-tight">
            Find the AI tools worth your time — and the help to put them to work
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
            AIlico is a curated directory of {aiTools.length} verified AI tools, five free
            online utilities, and fixed-price services for building websites and AI
            workflows. No hype, no fake reviews — just useful tools and honest guidance.
          </p>

          <HeroSearch />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/free-tools" size="lg">
              Explore Free Tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/ai-tools" variant="outline" size="lg">
              Explore AI Tools
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-ink-faint">
            Free forever · No account needed · Runs in your browser
          </p>
        </div>
      </section>

      {/* Featured AI tools */}
      <section aria-labelledby="featured-tools" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="AI Tools Directory"
          title="Featured AI tools"
          description="Hand-picked from our directory of 30 verified tools across writing, images, video, coding, marketing, SEO, and automation."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <ButtonLink href="/ai-tools" variant="secondary">
            Browse all {aiTools.length} tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      {/* Free tools */}
      <section aria-labelledby="free-tools" className="border-y border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Free Utilities"
            title="Free online tools, no signup"
            description="Fast, private utilities for everyday writing and web work. Everything runs locally in your browser — your text never touches our servers."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {freeTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/free-tools/${tool.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm transition-all hover:border-accent-line hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink group-hover:text-accent-strong">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-soft">{tool.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Use it free
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/free-tools"
                className="group flex h-full min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-accent-line bg-accent-soft/40 p-5 text-center transition-colors hover:bg-accent-soft"
              >
                <span className="font-medium text-accent-strong">More utilities on the way</span>
                <span className="mt-1 text-sm text-ink-soft">See all free tools</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Services"
          title="Fixed-scope services, transparent prices"
          description="No hourly billing surprises. Every service has a written scope, clear deliverables, and an agreed turnaround time — confirmed before any payment."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-ink">{service.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{service.tagline}</p>
              <p className="mt-4">
                <span className="text-3xl font-bold text-ink">${service.price}</span>
                <span className="ml-2 text-sm text-ink-faint">fixed price</span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                {service.deliverables.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-3 pt-6">
                <ButtonLink
                  href={`/services/${service.slug}`}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Details
                </ButtonLink>
                <ButtonLink
                  href={`/contact?service=${service.slug}`}
                  size="sm"
                  className="flex-1"
                >
                  Get a Quote
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits" className="border-y border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Why AIlico"
            title="Built for people who want results, not hype"
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                  <benefit.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-soft">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent guides */}
      <section aria-labelledby="guides" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="From the Blog"
          title="Recently published guides"
          description="Practical, up-to-date guides on AI tools and the workflows that make them pay off."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-xs text-ink-faint">
                  <span className="font-medium text-accent">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h3 className="mt-3 font-semibold leading-6 text-ink group-hover:text-accent-strong">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">
                  {post.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {post.readingMinutes} min read
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <ButtonLink href="/blog" variant="secondary">
            All articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      {/* Editorial principles */}
      <section aria-labelledby="principles" className="border-y border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Trust & Editorial Principles"
            title="How we keep AIlico honest"
            description="Trust is the product. These principles govern every listing, article, and recommendation on this site."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {editorialPrinciples.map((principle) => (
              <div key={principle.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent-line bg-surface text-accent-strong">
                  <principle.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{principle.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-soft">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
        />
        <div className="mt-10">
          <FaqAccordion items={homeFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-line bg-accent-soft/60">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Need a website fix, a landing page, or an AI workflow built?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Tell us what you need. We confirm the scope and price in writing before any
            work begins — and reply {`within 2 business days`}.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Get a Website Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Compare services
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
