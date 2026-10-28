/** Word counter statistics — pure functions, unit-tested. */

export const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "can", "did", "do", "does",
  "for", "from", "had", "has", "have", "he", "her", "his", "i", "if", "in", "into",
  "is", "it", "its", "just", "me", "my", "no", "not", "of", "on", "or", "our", "she",
  "so", "some", "that", "the", "their", "them", "then", "there", "these", "they",
  "this", "to", "too", "up", "us", "very", "was", "we", "were", "what", "when",
  "where", "which", "while", "who", "why", "will", "with", "would", "you", "your",
]);

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  speakingMinutes: number;
}

export function analyzeText(text: string, readingWpm: number): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const sentences = trimmed
    ? (trimmed.match(/[.!?]+(\s|$)/g) ?? []).length || (wordCount ? 1 : 0)
    : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter((part) => part.trim()).length
    : 0;
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

export function topKeywords(text: string, count = 5): { word: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const raw of text.toLowerCase().match(/[a-z][a-z'-]{2,}/g) ?? []) {
    if (STOP_WORDS.has(raw)) continue;
    counts.set(raw, (counts.get(raw) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([word, wordCount]) => ({ word, count: wordCount }))
    .sort((a, b) => b.count - a.count)
    .slice(0, count);
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0 sec";
  const totalSeconds = Math.round(minutes * 60);
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return secs ? `${mins} min ${secs} sec` : `${mins} min`;
}
