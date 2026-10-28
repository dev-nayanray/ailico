import { describe, expect, it } from "vitest";
import { analyzeText, topKeywords, formatDuration } from "@/lib/free-tools/text-stats";

describe("analyzeText", () => {
  it("counts words, characters, and characters without spaces", () => {
    const stats = analyzeText("hello world", 225);
    expect(stats.words).toBe(2);
    expect(stats.characters).toBe(11);
    expect(stats.charactersNoSpaces).toBe(10);
  });

  it("returns zeros for empty input", () => {
    const stats = analyzeText("   \n  ", 225);
    expect(stats.words).toBe(0);
    expect(stats.sentences).toBe(0);
    expect(stats.paragraphs).toBe(0);
    expect(stats.readingMinutes).toBe(0);
  });

  it("counts sentences by terminal punctuation", () => {
    expect(analyzeText("One. Two! Three?", 225).sentences).toBe(3);
  });

  it("counts one sentence for unpunctuated text with words", () => {
    expect(analyzeText("just some words", 225).sentences).toBe(1);
  });

  it("counts paragraphs split by blank lines", () => {
    const stats = analyzeText("first para\n\nsecond para\n\n\nthird", 225);
    expect(stats.paragraphs).toBe(3);
  });

  it("computes reading time from the configured speed", () => {
    const stats = analyzeText("word ".repeat(450), 225);
    expect(stats.words).toBe(450);
    expect(Math.round(stats.readingMinutes)).toBe(2);
  });

  it("computes speaking time at ~130 wpm", () => {
    const stats = analyzeText("word ".repeat(130), 225);
    expect(Math.round(stats.speakingMinutes)).toBe(1);
  });
});

describe("topKeywords", () => {
  it("excludes stop words and ranks by frequency", () => {
    const keywords = topKeywords("the cat and the dog chased the cat");
    expect(keywords[0]).toEqual({ word: "cat", count: 2 });
    expect(keywords.map((k) => k.word)).not.toContain("the");
    expect(keywords.map((k) => k.word)).not.toContain("and");
  });

  it("returns at most five keywords", () => {
    const keywords = topKeywords("alpha beta gamma delta epsilon zeta eta");
    expect(keywords.length).toBe(5);
  });

  it("ignores words shorter than three letters", () => {
    expect(topKeywords("to be or not to be")).toEqual([]);
  });
});

describe("formatDuration", () => {
  it("formats sub-minute durations in seconds", () => {
    expect(formatDuration(0)).toBe("0 sec");
    expect(formatDuration(0.5)).toBe("30 sec");
  });

  it("formats whole minutes without seconds", () => {
    expect(formatDuration(2)).toBe("2 min");
  });

  it("formats mixed durations", () => {
    expect(formatDuration(3.5)).toBe("3 min 30 sec");
  });
});
