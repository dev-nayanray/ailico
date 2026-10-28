"use client";

import { useMemo, useState } from "react";
import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/track";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "can", "did", "do", "does",
  "for", "from", "had", "has", "have", "he", "her", "his", "i", "if", "in", "into",
  "is", "it", "its", "just", "me", "my", "no", "not", "of", "on", "or", "our", "she",
  "so", "some", "that", "the", "their", "them", "then", "there", "these", "they",
  "this", "to", "too", "up", "us", "very", "was", "we", "were", "what", "when",
  "where", "which", "while", "who", "why", "will", "with", "would", "you", "your",
]);

const SAMPLE_TEXT =
  "Artificial intelligence tools are changing how small businesses work. " +
  "From drafting emails to editing videos, the right tool can save hours every week. " +
  "The challenge is choosing well: with thousands of options, honest comparisons matter more than ever. " +
  "That is why we verify every listing in the AIlico directory before it goes live.";

interface Stats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  speakingMinutes: number;
}

function analyze(text: string, readingWpm: number): Stats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g) ?? []).length || (words.length ? 1 : 0) : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((part) => part.trim()).length : 0;
  const wordCount = words.length;
  return {
    words: wordCount,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences,
    paragraphs,
    readingMinutes: wordCount / readingWpm,
    speakingMinutes: wordCount / 130,
  };
}

function topKeywords(text: string): { word: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const raw of text.toLowerCase().match(/[a-z][a-z'-]{2,}/g) ?? []) {
    if (STOP_WORDS.has(raw)) continue;
    counts.set(raw, (counts.get(raw) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0 sec";
  const totalSeconds = Math.round(minutes * 60);
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return secs ? `${mins} min ${secs} sec` : `${mins} min`;
}

export function WordCounter() {
  const [text, setText] = useState("");
  const [readingWpm, setReadingWpm] = useState(225);

  const stats = useMemo(() => analyze(text, readingWpm), [text, readingWpm]);
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
