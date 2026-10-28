import type { Metadata } from "next";
import { ToolShell, toolPageMetadata } from "@/components/free-tools/tool-shell";
import { SlugGenerator } from "@/components/free-tools/slug-generator";

export const metadata: Metadata = toolPageMetadata(
  "slug-generator",
  "Free URL Slug Generator — Clean, SEO-Friendly Slugs",
  "Turn any title into a clean, lowercase, hyphenated URL slug. Handles accented characters, removes special characters, and lets you control separator and length."
);

export default function SlugGeneratorPage() {
  return (
    <ToolShell
      slug="slug-generator"
      intro={
        <>
          <p>
            A URL slug is the human-readable part of a web address that identifies a
            page — in <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm">ailico.top/free-tools/slug-generator</code>,
            the slug is <em>slug-generator</em>. Good slugs are lowercase, use hyphens
            between words, avoid special characters, and stay reasonably short.
          </p>
          <p>
            This generator converts any title into a clean slug automatically: it
            lowercases the text, replaces accented characters with their base letters
            (é → e), drops apostrophes, converts “&amp;” to “and”, replaces remaining
            special characters with separators, and collapses repeats. You can switch
            between hyphen and underscore separators and cap the maximum length —
            truncation always happens at a word boundary, never mid-word.
          </p>
          <p>
            Readable slugs help both people and search engines: visitors can guess
            what a page is about from the link alone, and descriptive URLs are a
            long-standing usability guideline Google references in its SEO
            documentation.
          </p>
        </>
      }
      howTo={[
        "Type or paste your page title or headline into the input field.",
        "The slug appears instantly in the violet result box, with a full URL preview underneath.",
        "Choose a separator (hyphen or underscore), toggle lowercase, or set a maximum length if you need one.",
        "Press “Copy” to copy the slug, then paste it into your CMS's permalink or slug field.",
      ]}
      example={
        <>
          <p>
            Input: <em>10 Proven Ways to Improve Your Website's Loading Speed!</em>
          </p>
          <p className="mt-2">
            Result:{" "}
            <code className="rounded bg-surface-muted px-2 py-1 font-mono text-sm">
              10-proven-ways-to-improve-your-websites-loading-speed
            </code>
          </p>
          <p className="mt-2">
            With a 40-character cap, it becomes{" "}
            <code className="rounded bg-surface-muted px-2 py-1 font-mono text-sm">
              10-proven-ways-to-improve-your
            </code>{" "}
            — truncated at the last complete word.
          </p>
        </>
      }
      faqs={[
        {
          question: "Should slugs be short or descriptive?",
          answer:
            "Aim for both: 3–6 words that describe the page. Extremely long URLs get truncated in search results and chat messages, while single-word slugs waste the descriptive opportunity. Google's documentation suggests concise, descriptive URLs.",
        },
        {
          question: "Hyphens or underscores in URLs?",
          answer:
            "Use hyphens for public web URLs. Search engines treat hyphens as word separators; underscores historically are treated as word joiners. Underscores make sense mainly for internal file names or systems that require them.",
        },
        {
          question: "Does changing a slug hurt SEO?",
          answer:
            "Changing a URL means the old address stops resolving, so always set up a 301 redirect from the old URL to the new one. Without a redirect, the page loses its accumulated signals and visitors hitting the old link see a 404.",
        },
        {
          question: "Should I remove stop words like 'the' and 'of' from slugs?",
          answer:
            "It is a style choice, not a ranking factor. Keeping short function words usually keeps the slug readable, and removing them saves only a few characters. We suggest keeping them unless the slug is clearly too long.",
        },
      ]}
    >
      <SlugGenerator />
    </ToolShell>
  );
}
