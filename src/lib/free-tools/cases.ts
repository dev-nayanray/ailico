/** Text case conversions — pure functions, unit-tested. */

const MINOR_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "nor", "of", "on",
  "or", "per", "so", "the", "to", "v", "via", "vs", "with",
]);

export function toWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9']+/)
    .filter(Boolean);
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const caseConverters: { label: string; hint: string; convert: (text: string) => string }[] = [
  { label: "UPPERCASE", hint: "ALL CAPS", convert: (text) => text.toUpperCase() },
  { label: "lowercase", hint: "all small", convert: (text) => text.toLowerCase() },
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
  { label: "PascalCase", hint: "ClassNameStyle", convert: (text) => toWords(text).map(capitalize).join("") },
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
