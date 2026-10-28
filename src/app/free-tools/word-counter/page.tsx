import type { Metadata } from "next";
import { ToolShell, toolPageMetadata } from "@/components/free-tools/tool-shell";
import { WordCounter } from "@/components/free-tools/word-counter";

export const metadata: Metadata = toolPageMetadata(
  "word-counter",
  "Free Word Counter & Reading Time Calculator",
  "Count words, characters, sentences, and paragraphs instantly, with estimated reading and speaking time and top keyword frequency. Free, private, and browser-based."
);

export default function WordCounterPage() {
  return (
    <ToolShell
      slug="word-counter"
      intro={
        <>
          <p>
            The word counter gives you live statistics as you type or paste: words,
            characters (with and without spaces), sentences, and paragraphs, plus
            estimated reading and speaking time for the text. The keyword list shows
            your five most frequent meaningful words, with common stop words excluded.
          </p>
          <p>
            Writers use these numbers every day: blog briefs often specify word-count
            targets, meta descriptions are capped by character count, and presenters
            need to know how long a script will take to deliver. The reading-speed
            slider (100–400 words per minute) lets you match the estimate to your
            audience — technical audiences read slower than average, and you read
            faster when skimming.
          </p>
          <p>
            All processing happens locally in your browser. Nothing you paste here is
            sent to, or stored on, any server.
          </p>
        </>
      }
      howTo={[
        "Type or paste your text into the box — or press “Try sample text” to see it in action.",
        "Watch the counts, reading time, and speaking time update instantly as you edit.",
        "Adjust the reading-speed slider to match your audience (225 words per minute is a common average for adult readers).",
        "Check the keyword list to spot accidental repetition; stop words are already excluded.",
        "Press “Clear” to start over with a fresh, empty counter.",
      ]}
      example={
        <>
          <p>
            A blog introduction of about 450 words shows a reading time of 2 minutes
            at 225 words per minute. If the same text needs to be presented aloud,
            the speaking estimate (based on ~130 words per minute) shows closer to
            3 minutes 30 seconds — useful when trimming a script for a 3-minute slot.
          </p>
        </>
      }
      faqs={[
        {
          question: "How is reading time calculated?",
          answer:
            "Reading time is the word count divided by your chosen reading speed, which defaults to 225 words per minute — a widely used average for adult readers of general web content. You can adjust the slider between 100 and 400 words per minute.",
        },
        {
          question: "How is speaking time calculated?",
          answer:
            "Speaking time uses a fixed pace of about 130 words per minute, a typical presentation pace. It is an estimate: actual delivery varies with pauses, emphasis, and language.",
        },
        {
          question: "Is my text stored or uploaded anywhere?",
          answer:
            "No. The counter runs entirely in your browser with JavaScript. Your text never leaves your device, is never logged, and disappears when you clear the box or close the tab.",
        },
        {
          question: "What counts as a sentence or a paragraph?",
          answer:
            "A sentence ends with a period, question mark, or exclamation point followed by a space or the end of the text. A paragraph is a block of text separated by a blank line, which matches how most writing tools count them.",
        },
        {
          question: "Which languages does the keyword list support?",
          answer:
            "The keyword frequency list matches English words of three or more letters. Counts of words and characters work for any language, including scripts without spaces.",
        },
      ]}
    >
      <WordCounter />
    </ToolShell>
  );
}
