import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { freeTools } from "@/data/free-tools";

export const metadata: Metadata = {
  title: "Free Online Tools — Word Counter, JSON Formatter, UTM Builder & More",
  description:
    "Five free browser-based utilities: word counter with reading time, text case converter, URL slug generator, JSON formatter and validator, and UTM link builder. No signup, no uploads.",
  alternates: { canonical: "/free-tools" },
  openGraph: {
    title: "Free Online Tools — Word Counter, JSON Formatter, UTM Builder & More | AIlico",
    description:
      "Five free browser-based utilities. No signup, no uploads, instant results.",
    url: "/free-tools",
  },
};

export default function FreeToolsPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Free Tools
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Free online tools that respect your time and your data
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            No accounts. No uploads. Every utility below runs entirely in your browser,
            so your text and links never touch a server.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-strong">
            <Lock className="h-4 w-4" aria-hidden="true" />
            100% local processing
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {freeTools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/free-tools/${tool.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-accent-line hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-ink group-hover:text-accent-strong">
                  {tool.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{tool.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent">
                  Open tool
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
