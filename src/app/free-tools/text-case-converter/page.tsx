import type { Metadata } from "next";
import { ToolShell, toolPageMetadata } from "@/components/free-tools/tool-shell";
import { TextCaseConverter } from "@/components/free-tools/text-case-converter";

export const metadata: Metadata = toolPageMetadata(
  "text-case-converter",
  "Free Text Case Converter — UPPER, lower, Title, camelCase & More",
  "Convert text between uppercase, lowercase, sentence case, title case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE. Free and private."
);

export default function TextCaseConverterPage() {
  return (
    <ToolShell
      slug="text-case-converter"
      intro={
        <>
          <p>
            The case converter transforms any text into ten different cases. Alongside
            the everyday options (uppercase, lowercase, sentence case, and title case),
            it includes the naming conventions developers use: camelCase, PascalCase,
            snake_case, kebab-case, and CONSTANT_CASE.
          </p>
          <p>
            Typical uses: cleaning up text typed with Caps Lock on, formatting headline
            style for articles, converting a feature name like "User Sign Up Flow" into
            a code identifier such as <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm">userSignUpFlow</code>,
            or preparing environment-variable names in CONSTANT_CASE.
          </p>
          <p>
            Title Case follows the common editorial convention of capitalizing the
            first and last words while leaving minor words (a, of, the, to…) lowercase.
            Sentence case capitalizes the first letter of each sentence. Everything runs
            locally in your browser.
          </p>
        </>
      }
      howTo={[
        "Type or paste your text into the input box.",
        "Click the case you want — the result appears immediately below.",
        "Press “Copy” to copy the result to your clipboard.",
        "Try another case on the same text at any time; use “Clear” to reset both fields.",
      ]}
      example={
        <>
          <p>
            Input: <em>the quick brown fox jumps over the lazy dog</em>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Title Case → The Quick Brown Fox Jumps Over the Lazy Dog</li>
            <li>camelCase → theQuickBrownFoxJumpsOverTheLazyDog</li>
            <li>snake_case → the_quick_brown_fox_jumps_over_the_lazy_dog</li>
            <li>CONSTANT_CASE → THE_QUICK_BROWN_FOX_JUMPS_OVER_THE_LAZY_DOG</li>
          </ul>
        </>
      }
      faqs={[
        {
          question: "What is the difference between sentence case and title case?",
          answer:
            "Sentence case capitalizes only the first letter of each sentence, like a normal paragraph. Title case capitalizes the main words of every word group, leaving short connecting words (articles, prepositions, conjunctions) lowercase unless they come first or last.",
        },
        {
          question: "When should I use camelCase versus PascalCase?",
          answer:
            "The convention differs by language: JavaScript teams often use camelCase for variables and functions and PascalCase for classes and components; Python and SQL teams lean toward snake_case. The important thing is consistency within a codebase — use whichever the surrounding code already uses.",
        },
        {
          question: "How are numbers and punctuation handled?",
          answer:
            "Developer cases (camelCase, snake_case, and friends) strip punctuation and split on spaces and existing capital boundaries, so “Sign-up (v2)” becomes sign_up_v2 in snake_case. The plain cases (UPPERCASE, lowercase, sentence, title) preserve your punctuation.",
        },
        {
          question: "Is there a length limit?",
          answer:
            "The converter works comfortably with typical documents of thousands of words. It processes everything locally, so very large texts depend only on your device's memory.",
        },
      ]}
    >
      <TextCaseConverter />
    </ToolShell>
  );
}
