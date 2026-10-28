import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { freeTools } from "@/lib/free-tools";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        That page doesn't exist
      </h1>
      <p className="mt-3 leading-7 text-ink-soft">
        The address may be mistyped, or the page may have moved. Here are some
        useful places to go instead:
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Go home
        </ButtonLink>
        <ButtonLink href="/ai-tools" variant="outline" size="lg">
          Browse AI Tools
        </ButtonLink>
        <ButtonLink href="/free-tools" variant="outline" size="lg">
          Free Tools
        </ButtonLink>
      </div>
      <nav aria-label="Popular free tools" className="mt-10">
        <p className="text-sm font-medium text-ink">Popular utilities:</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {freeTools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/free-tools/${tool.slug}`}
                className="inline-flex rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft hover:border-accent-line hover:text-accent-strong"
              >
                {tool.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
