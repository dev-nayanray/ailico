"use client";

import { useMemo, useState } from "react";
import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/track";
import { analyzeText, topKeywords, formatDuration } from "@/lib/free-tools/text-stats";

const SAMPLE_TEXT =
  "Artificial intelligence tools are changing how small businesses work. " +
  "From drafting emails to editing videos, the right tool can save hours every week. " +
  "The challenge is choosing well: with thousands of options, honest comparisons matter more than ever. " +
  "That is why we verify every listing in the AIlico directory before it goes live.";

export function WordCounter() {
  const [text, setText] = useState("");
  const [readingWpm, setReadingWpm] = useState(225);

  const stats = useMemo(() => analyzeText(text, readingWpm), [text, readingWpm]);
  const keywords = useMemo(() => topKeywords(text), [text]);

  const statCards: { label: string; value: string | number }[] = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
  ];

  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="word-counter-input" className="text-sm font-medium text-ink">
          Your text
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setText(SAMPLE_TEXT);
              trackEvent("tool_used", { tool: "word-counter", action: "sample" });
            }}
          >
            Try sample text
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setText("")}
            disabled={!text}
          >
            <Eraser className="h-4 w-4" aria-hidden="true" />
            Clear
          </Button>
        </div>
      </div>

      <textarea
        id="word-counter-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type or paste your text here — counts update instantly…"
        rows={8}
        className="mt-3 w-full resize-y rounded-lg border border-line bg-surface p-4 text-sm leading-6 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-line bg-surface-tint px-3 py-3 text-center"
          >
            <p className="text-xl font-bold text-ink" aria-live="polite">
              {card.value.toLocaleString()}
            </p>
            <p className="mt-0.5 text-xs text-ink-faint">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-accent-line bg-accent-soft px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-accent-strong">
            Reading time
          </p>
          <p className="mt-1 text-lg font-semibold text-ink" aria-live="polite">
            {formatDuration(stats.readingMinutes)}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-surface-tint px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
            Speaking time
          </p>
          <p className="mt-1 text-lg font-semibold text-ink" aria-live="polite">
            {formatDuration(stats.speakingMinutes)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label htmlFor="reading-speed" className="text-sm text-ink-soft">
          Reading speed: <strong className="text-ink">{readingWpm} words/min</strong>
        </label>
        <input
          id="reading-speed"
          type="range"
          min={100}
          max={400}
          step={25}
          value={readingWpm}
          onChange={(event) => setReadingWpm(Number(event.target.value))}
          className="h-2 w-48 accent-[#7c3aed]"
        />
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <h3 className="text-sm font-semibold text-ink">
          Most frequent keywords
        </h3>
        {keywords.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Most frequent keywords">
            {keywords.map((keyword) => (
              <li
                key={keyword.word}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-soft"
              >
                {keyword.word} <span className="font-semibold text-accent-strong">×{keyword.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ink-faint">
            Add at least a sentence of text to see your top keywords.
          </p>
        )}
        <p className="mt-3 text-xs text-ink-faint">
          Common stop words (the, and, to…) are excluded automatically.
        </p>
      </div>
    </div>
  );
}
