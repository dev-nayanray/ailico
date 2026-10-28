import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryBadge } from "@/components/ui/badge";
import { type AiTool, getCategoryBySlug, pricingLabels } from "@/data/tools";

export function ToolCard({ tool }: { tool: AiTool }) {
  const category = getCategoryBySlug(tool.category);

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-sm font-bold text-accent-strong"
        >
          {tool.name.slice(0, 2).toUpperCase()}
        </span>
        <span className="text-xs font-medium text-ink-faint">
          {pricingLabels[tool.pricing]}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-ink">
        <Link
          href={`/ai-tools/${tool.slug}`}
          className="after:absolute after:inset-0 after:content-[''] hover:text-accent-strong"
        >
          {tool.name}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-ink-soft">{tool.tagline}</p>

      <div className="mt-auto flex items-center justify-between pt-4">
        {category && <CategoryBadge>{category.name}</CategoryBadge>}
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          View details
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
