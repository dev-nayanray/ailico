"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { aiTools } from "@/lib/tools";
import { freeTools } from "@/lib/free-tools";
import { trackEvent } from "@/lib/track";

interface Suggestion {
  label: string;
  href: string;
  kind: "AI tool" | "Free tool";
}

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useMemo<Suggestion[]>(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 2) return [];
    const toolMatches = aiTools
      .filter(
        (tool) =>
          tool.name.toLowerCase().includes(trimmed) ||
          tool.tagline.toLowerCase().includes(trimmed) ||
          tool.tags.some((tag) => tag.includes(trimmed))
      )
      .slice(0, 4)
      .map<Suggestion>((tool) => ({
        label: tool.name,
        href: `/ai-tools/${tool.slug}`,
        kind: "AI tool",
      }));
    const freeMatches = freeTools
      .filter(
        (tool) =>
          tool.name.toLowerCase().includes(trimmed) ||
          tool.shortName.toLowerCase().includes(trimmed)
      )
      .slice(0, 2)
      .map<Suggestion>((tool) => ({
        label: tool.shortName,
        href: `/free-tools/${tool.slug}`,
        kind: "Free tool",
      }));
    return [...toolMatches, ...freeMatches];
  }, [query]);

  function submit() {
    trackEvent("search_submit", { location: "hero", query_length: query.trim().length });
    const trimmed = query.trim();
    router.push(trimmed ? `/ai-tools?q=${encodeURIComponent(trimmed)}` : "/ai-tools");
  }

  return (
    <div className="relative mx-auto mt-8 w-full max-w-xl">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor="hero-search" className="sr-only">
          Search AI tools and free utilities
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface p-2 shadow-sm focus-within:border-accent">
          <Search className="ml-2 h-5 w-5 shrink-0 text-ink-faint" aria-hidden="true" />
          <input
            id="hero-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              blurTimer.current = setTimeout(() => setOpen(false), 150);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
            placeholder="Search AI tools, e.g. writing, image, coding…"
            autoComplete="off"
            className="h-10 w-full bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            Search
          </button>
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <ul
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lg"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.map((suggestion) => (
            <li key={suggestion.href} role="option" aria-selected={false}>
              <a
                href={suggestion.href}
                onClick={() => clearTimeout(blurTimer.current ?? undefined)}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-ink hover:bg-surface-tint"
              >
                <span>{suggestion.label}</span>
                <span className="text-xs text-ink-faint">{suggestion.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
