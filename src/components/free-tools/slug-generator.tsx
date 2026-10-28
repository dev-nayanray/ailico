"use client";

import { useMemo, useState } from "react";
import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

function slugify(input: string, separator: string, lowerCase: boolean, maxLength: number): string {
  let text = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (lowerCase) text = text.toLowerCase();
  text = text
    .replace(/[''"]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, separator);
  if (maxLength > 0 && text.length > maxLength) {
    text = text.slice(0, maxLength);
    const lastSeparator = text.lastIndexOf(separator);
    if (lastSeparator > 0) text = text.slice(0, lastSeparator);
  }
  return text;
}

export function SlugGenerator() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowerCase, setLowerCase] = useState(true);
  const [maxLength, setMaxLength] = useState(80);

  const slug = useMemo(
    () => slugify(input, separator, lowerCase, maxLength),
    [input, separator, lowerCase, maxLength]
  );

  const previewUrl = `https://example.com/${slug || "your-slug-here"}`;

  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="slug-input" className="text-sm font-medium text-ink">
          Title or heading
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setInput("")}
          disabled={!input}
        >
          <Eraser className="h-4 w-4" aria-hidden="true" />
          Clear
        </Button>
      </div>

      <input
        id="slug-input"
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          if (event.target.value.length === 1) {
            trackEvent("tool_used", { tool: "slug-generator" });
          }
        }}
        placeholder="e.g. 10 Proven Ways to Improve Your Website's Loading Speed!"
        className="mt-3 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-ink">Options</legend>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink-soft" id="separator-label">
              Separator
            </span>
            <div className="flex overflow-hidden rounded-lg border border-line" role="group" aria-labelledby="separator-label">
              {[
                { value: "-", label: "hyphen -" },
                { value: "_", label: "underscore _" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSeparator(option.value)}
                  aria-pressed={separator === option.value}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium",
                    separator === option.value
                      ? "bg-accent text-white"
                      : "bg-surface text-ink-soft hover:text-accent-strong"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={lowerCase}
              onChange={(event) => setLowerCase(event.target.checked)}
              className="h-4 w-4 accent-[#7c3aed]"
            />
            Convert to lowercase
          </label>

          <label className="flex items-center gap-2 text-sm text-ink-soft">
            Max length
            <input
              type="number"
              min={10}
              max={200}
              value={maxLength}
              onChange={(event) =>
                setMaxLength(Math.min(200, Math.max(10, Number(event.target.value) || 80)))
              }
              className="h-9 w-20 rounded-lg border border-line bg-surface px-2 text-sm text-ink focus:border-accent focus:outline-none"
            />
            characters
          </label>
        </div>
      </fieldset>

      <div className="mt-6 rounded-xl border border-accent-line bg-accent-soft p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-accent-strong">Your URL slug</p>
          <CopyButton value={slug} toolName="slug-generator" disabled={!slug} />
        </div>
        <p
          className="mt-2 break-all font-mono text-lg font-semibold text-ink"
          aria-live="polite"
        >
          {slug || <span className="text-ink-faint">your-slug-appears-here</span>}
        </p>
        <p className="mt-3 break-all text-xs text-ink-faint">
          Full URL preview: <span className="font-mono">{previewUrl}</span>
        </p>
        <p className="mt-1 text-xs text-ink-faint">
          {slug.length}/80 characters {slug.length > 80 && "— consider shortening"}
        </p>
      </div>
    </div>
  );
}
