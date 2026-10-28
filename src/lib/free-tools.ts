export interface FreeTool {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
}

export const freeTools: FreeTool[] = [
  {
    slug: "word-counter",
    name: "Word Counter & Reading Time Calculator",
    shortName: "Word Counter",
    tagline: "Count words, characters, sentences, and estimate reading time instantly.",
    description:
      "Paste or type text to see live word, character, sentence, and paragraph counts, estimated reading and speaking time, and the most frequent keywords. Everything runs in your browser — nothing is uploaded or stored.",
    icon: "Calculator",
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    shortName: "Case Converter",
    tagline: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more.",
    description:
      "Transform any text into ten different cases, from sentence case and title case to developer formats like camelCase, snake_case, and CONSTANT_CASE. Processing happens entirely on your device.",
    icon: "CaseSensitive",
  },
  {
    slug: "slug-generator",
    name: "URL Slug Generator",
    shortName: "Slug Generator",
    tagline: "Turn any title into a clean, SEO-friendly URL slug.",
    description:
      "Convert headlines and page titles into readable, lowercase, hyphen-separated URL slugs. Accented characters are handled gracefully and you can control the separator and maximum length.",
    icon: "Link2",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    shortName: "JSON Formatter",
    tagline: "Format, validate, and minify JSON with precise error locations.",
    description:
      "Paste JSON to pretty-print it with your preferred indentation, validate it, and see exactly which line and column an error occurs on. Minify formatted JSON back to a single line. All parsing is local — your data never leaves the browser.",
    icon: "Braces",
  },
  {
    slug: "utm-builder",
    name: "UTM Link Builder",
    shortName: "UTM Builder",
    tagline: "Build consistent, trackable campaign URLs in seconds.",
    description:
      "Create UTM-tagged links with validated inputs, sensible presets for common sources, and a live preview you can copy in one click. Builds on the standard UTM parameters that Google Analytics and other platforms read.",
    icon: "Tags",
  },
];

export function getFreeToolBySlug(slug: string): FreeTool | undefined {
  return freeTools.find((tool) => tool.slug === slug);
}
