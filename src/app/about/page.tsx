import type { Metadata } from "next";
import { BadgeCheck, BookOpen, HandCoins, Lock, Search, Target } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { aiTools } from "@/lib/tools";
import { LAST_VERIFIED } from "@/lib/tools";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About AIlico — Our Mission and Editorial Principles",
  description:
    "AIlico helps freelancers, creators, developers, and small businesses discover verified AI tools and get practical web and AI help. Learn about our mission, standards, and how we make money.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AIlico — Our Mission and Editorial Principles",
    description:
      "Who we are, what we stand for, and exactly how this site earns money.",
    url: "/about",
  },
};

const principles = [
  {
    icon: Search,
    title: "Useful first",
    text: "Every page should help you make a decision or finish a task. If a page exists only to rank in search engines, we have failed — and we delete or rewrite it.",
  },
  {
    icon: BadgeCheck,
    title: "Verified, not scraped",
    text: `Every tool listing reflects its official website and public documentation, with a last-verified date (currently ${formatDate(LAST_VERIFIED)}). When we cannot verify a claim, we do not make it.`,
  },
  {
    icon: Lock,
    title: "Privacy by default",
    text: "Our free tools run in your browser. We do not set tracking cookies, and our event analytics are anonymous counts without personal data.",
  },
  {
    icon: HandCoins,
    title: "Transparent money",
    text: "We earn from services and, increasingly, from clearly-disclosed affiliate partnerships. Paid placement is labeled, and rankings are never for sale.",
  },
  {
    icon: BookOpen,
    title: "Honest limitations",
    text: "AI tools are powerful and imperfect. Our guides describe what can go wrong as carefully as what works.",
  },
  {
    icon: Target,
    title: "Small and focused",
    text: "We deliberately cover a small catalog deeply — currently " + aiTools.length + " tools — instead of listing thousands of unreviewed entries.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            About
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Discover AI. Create smarter.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            AIlico exists for one reason: the gap between “AI exists” and “AI is
            actually saving me time” is wider than it should be. We close it with
            verified tool information, genuinely free utilities, and hands-on help —
            for freelancers, creators, developers, marketers, and small businesses in
            the US, UK, and beyond.
          </p>
        </div>
      </section>

      <section aria-labelledby="what-we-do" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="what-we-do" className="text-2xl font-bold text-ink">
              What we do
            </h2>
            <div className="mt-4 space-y-4 leading-7 text-ink-soft">
              <p>
                <strong className="text-ink">AIlico Tools</strong> is a curated
                directory of {aiTools.length} AI tools across writing, images, video,
                productivity, coding, marketing, SEO, and automation — each with honest
                pros and cons, a pricing model, and a last-verified date.
              </p>
              <p>
                <strong className="text-ink">AIlico Free Tools</strong> provides five
                browser-based utilities (word counter, case converter, slug generator,
                JSON formatter, UTM builder) that work instantly, without accounts, and
                without uploading your data anywhere.
              </p>
              <p>
                <strong className="text-ink">AIlico Services</strong> delivers
                fixed-price web and AI help: website quick fixes, landing page
                development, and AI workflow setups, each with a written scope agreed
                before payment.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">How we make money</h2>
            <div className="mt-4 space-y-4 leading-7 text-ink-soft">
              <p>
                <strong className="text-ink">Services (primary).</strong> The revenue
                that pays the bills today. Fixed prices, published openly on this site.
              </p>
              <p>
                <strong className="text-ink">Affiliate commissions (secondary).</strong>{" "}
                Some outbound links to AI tools may earn us a commission in the future —
                but only through approved partnerships, always disclosed, marked with
                sponsored attributes, and never influencing our listings or rankings.
                See the{" "}
                <a href="/affiliate-disclosure" className="font-medium text-accent hover:underline">
                  affiliate disclosure
                </a>
                .
              </p>
              <p>
                <strong className="text-ink">Advertising (future).</strong> If we ever
                run ads or sponsored placements, they will be visually distinct from
                editorial content and labeled as advertising.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles" className="border-y border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="principles" className="text-2xl font-bold text-ink">
            The principles we work by
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                  <principle.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-ink">A note on honesty</h2>
        <p className="mt-4 leading-7 text-ink-soft">
          We do not publish invented reviews, fabricated traffic statistics, or
          testimonials we cannot attribute. When this site recommends something, it is
          because the underlying product is genuinely capable of the job described.
          When we have not yet tested something hands-on, we say so. That is a promise.
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact" size="lg">
            Get in touch
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
