"use client";

import { useState } from "react";
import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { trackEvent } from "@/lib/track";

const MINOR_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "nor", "of", "on",
  "or", "per", "so", "the", "to", "v", "via", "vs", "with",
]);

function toWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9']+/)
    .filter(Boolean);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const converters: { label: string; hint: string; convert: (text: string) => string }[] = [
  {
    label: "UPPERCASE",
    hint: "ALL CAPS",
    convert: (text) => text.toUpperCase(),
  },
  {
    label: "lowercase",
    hint: "all small",
    convert: (text) => text.toLowerCase(),
  },
  {
    label: "Sentence case",
    hint: "First word capitalized",
    convert: (text) =>
      text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase()),
  },
  {
    label: "Title Case",
    hint: "Capitalize Main Words",
    convert: (text) =>
      toWords(text)
        .map((word, index, words) => {
          const lower = word.toLowerCase();
          const isLast = index === words.length - 1;
          if (index > 0 && !isLast && MINOR_WORDS.has(lower)) return lower;
          return capitalize(word);
        })
        .join(" "),
  },
  {
    label: "camelCase",
    hint: "variableNameStyle",
    convert: (text) =>
      toWords(text)
        .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
        .join(""),
  },
  {
    label: "PascalCase",
    hint: "ClassNameStyle",
    convert: (text) => toWords(text).map(capitalize).join(""),
  },
  {
    label: "snake_case",
    hint: "variable_name_style",
    convert: (text) => toWords(text).map((word) => word.toLowerCase()).join("_"),
  },
  {
    label: "kebab-case",
    hint: "url-friendly-style",
    convert: (text) => toWords(text).map((word) => word.toLowerCase()).join("-"),
  },
  {
    label: "CONSTANT_CASE",
    hint: "ENV_VARIABLE_STYLE",
    convert: (text) => toWords(text).map((word) => word.toUpperCase()).join("_"),
  },
  {
    label: "aLtErNaTiNg",
    hint: "odd styling for fun",
    convert: (text) =>
      text
        .split("")
        .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
        .join(""),
  },
];

export function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  function apply(converter: (typeof converters)[number]) {
    if (!input.trim()) return;
    setOutput(converter.convert(input));
    setActiveLabel(converter.label);
    trackEvent("tool_used", { tool: "text-case-converter", action: converter.label });
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="case-input" className="text-sm font-medium text-ink">
          Your text
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setInput("");
            setOutput("");
            setActiveLabel(null);
          }}
          disabled={!input && !output}
        >
          <Eraser className="h-4 w-4" aria-hidden="true" />
          Clear
        </Button>
      </div>

      <textarea
        id="case-input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Type or paste text, then choose a case below…"
        rows={5}
        className="mt-3 w-full resize-y rounded-lg border border-line bg-surface p-4 text-sm leading-6 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />

      <div className="mt-4" role="group" aria-label="Choose a case conversion">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {converters.map((converter) => (
            <button
              key={converter.label}
              type="button"
              onClick={() => apply(converter)}
              disabled={!input.trim()}
              className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                activeLabel === converter.label
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-ink hover:border-accent-line hover:text-accent-strong"
              }`}
            >
              {converter.label}
              <span
                className={`mt-0.5 block text-[10px] font-normal ${
                  activeLabel === converter.label ? "text-white/80" : "text-ink-faint"
                }`}
              >
                {converter.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="case-output" className="text-sm font-medium text-ink">
            Result {activeLabel && <span className="text-ink-faint">({activeLabel})</span>}
          </label>
          <CopyButton value={output} toolName="text-case-converter" disabled={!output} />
        </div>
        <output
          id="case-output"
          htmlFor="case-input"
          className="mt-2 block min-h-28 w-full overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-surface-tint p-4 font-mono text-sm leading-6 text-ink"
          aria-live="polite"
        >
          {output || <span className="text-ink-faint">Your converted text will appear here…</span>}
        </output>
      </div>
    </div>
  );
}
