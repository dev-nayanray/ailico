"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import {
  type AiTool,
  type PricingModel,
  toolCategories,
  pricingLabels,
} from "@/data/tools";
import { cn } from "@/lib/utils";

type PricingFilter = "all" | PricingModel;

export function ToolsDirectory({ tools, initialQuery = "" }: { tools: AiTool[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>("all");
  const [pricing, setPricing] = useState<PricingFilter>("all");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (category !== "all" && tool.category !== category) return false;
      if (pricing !== "all" && tool.pricing !== pricing) return false;
      if (!trimmed) return true;
      const haystack = [tool.name, tool.tagline, tool.description, tool.bestFor, ...tool.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [tools, query, category, pricing]);

  return (
    <div>
      <div className="rounded-xl border border-line bg-surface p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="flex items-center gap-2 rounded-lg border border-line px-3 focus-within:border-accent">
            <Search className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
            <label htmlFor="tool-search" className="sr-only">
              Search AI tools by name, use case, or keyword
            </label>
            <input
              id="tool-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, use case, or keyword…"
              className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="category-filter" className="sr-only">
              Filter by category
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-accent md:w-48"
            >
              <option value="all">All categories</option>
              {toolCategories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pricing-filter" className="sr-only">
              Filter by pricing model
            </label>
            <select
              id="pricing-filter"
              value={pricing}
              onChange={(event) => setPricing(event.target.value as PricingFilter)}
              className="h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-accent md:w-44"
            >
              <option value="all">Any pricing</option>
              {(Object.keys(pricingLabels) as PricingModel[]).map((model) => (
                <option key={model} value={model}>
                  {pricingLabels[model]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2" aria-hidden="true">
          <SlidersHorizontal className="h-3.5 w-3.5 text-ink-faint" />
          <span className="text-xs text-ink-faint">Popular:</span>
          {toolCategories.slice(0, 5).map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                category === cat.slug
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-ink-soft hover:border-accent-line hover:text-accent-strong"
              )}
            >
              {cat.name}
            </button>
          ))}
          {(category !== "all" || pricing !== "all" || query) && (
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setPricing("all");
                setQuery("");
              }}
              className="ml-1 text-xs font-medium text-accent hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-faint" role="status" aria-live="polite">
        Showing {filtered.length} of {tools.length} tools
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-line bg-surface-tint px-6 py-16 text-center">
          <p className="font-medium text-ink">No tools match your filters</p>
          <p className="mt-1 text-sm text-ink-soft">
            Try a different keyword, or clear the filters to see the full directory.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setPricing("all");
            }}
            className="mt-4 inline-flex h-9 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:border-accent hover:text-accent-strong"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
