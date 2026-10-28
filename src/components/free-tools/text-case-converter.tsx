"use client";

import { useState } from "react";
import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { trackEvent } from "@/lib/analytics/track";
import { caseConverters } from "@/lib/free-tools/cases";

export function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  function apply(converter: (typeof caseConverters)[number]) {
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
          {caseConverters.map((converter) => (
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
