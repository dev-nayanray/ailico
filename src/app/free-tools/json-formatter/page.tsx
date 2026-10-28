import type { Metadata } from "next";
import { ToolShell, toolPageMetadata } from "@/components/free-tools/tool-shell";
import { JsonFormatter } from "@/components/free-tools/json-formatter";

export const metadata: Metadata = toolPageMetadata(
  "json-formatter",
  "Free JSON Formatter & Validator — Pretty Print with Error Locations",
  "Format, validate, and minify JSON online with exact line-and-column error locations. Runs entirely in your browser — your data never leaves your device."
);

export default function JsonFormatterPage() {
  return (
    <ToolShell
      slug="json-formatter"
      intro={
        <>
          <p>
            JSON (JavaScript Object Notation) is the format most APIs, config files,
            and tools use to exchange structured data. It is strict: one stray comma,
            a missing brace, or single quotes instead of double quotes makes the whole
            document unparseable — and the error messages rarely tell you where to look.
          </p>
          <p>
            This formatter does three jobs. <strong>Format</strong> pretty-prints
            minified JSON with your chosen indentation so you can actually read it.{" "}
            <strong>Validate</strong> checks the document and reports whether it is
            well-formed. <strong>Minify</strong> strips all optional whitespace,
            producing the compact form APIs expect. When validation fails, the error
            message includes the exact line and column where parsing stopped, not just
            a character position.
          </p>
          <p>
            Common JSON mistakes this tool helps you find: trailing commas before a
            closing bracket, comments (JSON does not support them), single-quoted
            strings, unescaped newlines inside strings, and mismatched brackets.
          </p>
        </>
      }
      howTo={[
        "Paste your JSON into the input area.",
        "Press “Format” to pretty-print it, “Validate” to check it, or “Minify” to compact it.",
        "If the JSON is invalid, read the error message — it names the line and column of the problem.",
        "Use “Copy” on the result to reuse it, or “Clear” to start over.",
      ]}
      example={
        <>
          <p>
            Minified input:{" "}
            <code className="break-all rounded bg-surface-muted px-2 py-1 font-mono text-sm">
              {"{\"name\":\"AIlico\",\"tools\":[\"json\",\"utm\"],\"free\":true}"}
            </code>
          </p>
          <p className="mt-2">
            After formatting with 2-space indentation it becomes an indented, readable
            structure. If you add a trailing comma after <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm">true</code>,
            the validator will point to the exact line and column of the error.
          </p>
        </>
      }
      faqs={[
        {
          question: "Why does JSON fail with a trailing comma?",
          answer:
            "The JSON specification (RFC 8259) does not allow a comma after the last item in an array or object. Many formatters accept it silently, which causes bugs when the file reaches a strict parser. Our validator follows the strict grammar, matching how browsers and most servers parse JSON.",
        },
        {
          question: "Does this tool send my JSON to a server?",
          answer:
            "No. Parsing, formatting, and validation all run in your browser with the built-in JSON parser. Your data never leaves your device, which makes the tool safe for API responses and config files that contain sensitive values.",
        },
        {
          question: "Can it format JSON with comments (JSONC)?",
          answer:
            "Not currently. JSON with comments is a Visual Studio Code extension of the format and is not valid standard JSON. Strip the comments first, or use a dedicated JSONC parser.",
        },
        {
          question: "How does the error location work?",
          answer:
            "The browser's parser reports the character position where it gave up. The tool converts that position into a line number and column by counting newlines up to that point — so you can jump straight to the problem in your editor.",
        },
        {
          question: "Is there a size limit?",
          answer:
            "Yes, inputs above 1 MB are rejected to keep your browser tab responsive. For very large documents, format them locally with a command-line tool like jq.",
        },
      ]}
    >
      <JsonFormatter />
    </ToolShell>
  );
}
