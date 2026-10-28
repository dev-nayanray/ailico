"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { trackEvent } from "@/lib/analytics/track";
import { locateJsonError } from "@/lib/free-tools/json-utils";
import { cn } from "@/lib/utils";

const MAX_INPUT_BYTES = 1_000_000;

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  function process(mode: "format" | "minify" | "validate") {
    setError(null);
    setIsValid(false);
    setOutput("");

    if (!input.trim()) {
      setError("Paste some JSON first — the input area is empty.");
      return;
    }
    if (new Blob([input]).size > MAX_INPUT_BYTES) {
      setError("Input is larger than 1 MB. Please use a smaller file for browser formatting.");
      return;
    }

    try {
      const parsed: unknown = JSON.parse(input);
      setIsValid(true);
      trackEvent("tool_used", { tool: "json-formatter", action: mode });
      if (mode === "format") {
        setOutput(JSON.stringify(parsed, null, indent));
      } else if (mode === "minify") {
        setOutput(JSON.stringify(parsed));
      }
      if (mode === "validate") {
        setOutput(input.trim());
      }
    } catch (exception) {
      const message = exception instanceof Error ? exception.message : "Invalid JSON";
      setError(locateJsonError(input, message));
    }
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="json-input" className="text-sm font-medium text-ink">
          JSON input
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setInput("");
            setOutput("");
            setError(null);
            setIsValid(false);
          }}
          disabled={!input && !output}
        >
          <Eraser className="h-4 w-4" aria-hidden="true" />
          Clear
        </Button>
      </div>

      <textarea
        id="json-input"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setError(null);
          setIsValid(false);
        }}
        placeholder='{"paste": "your JSON here", "to": ["format", "validate", "minify"]}'
        rows={9}
        spellCheck={false}
        className="mt-3 w-full resize-y rounded-lg border border-line bg-surface p-4 font-mono text-sm leading-6 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => process("format")}>
          Format
        </Button>
        <Button type="button" variant="outline" onClick={() => process("validate")}>
          Validate
        </Button>
        <Button type="button" variant="outline" onClick={() => process("minify")}>
          Minify
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="indent-select" className="text-sm text-ink-soft">
            Indent
          </label>
          <select
            id="indent-select"
            value={indent}
            onChange={(event) => setIndent(Number(event.target.value))}
            className="h-9 rounded-lg border border-line bg-surface px-2 text-sm text-ink focus:border-accent focus:outline-none"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
      </div>

      <div aria-live="polite" className="mt-4">
        {error && (
          <p className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              <strong className="font-semibold">Invalid JSON:</strong> {error}
            </span>
          </p>
        )}
        {isValid && !error && (
          <p className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            Valid JSON{output ? " — result below" : ""}
          </p>
        )}
      </div>

      {(output || null) && (
        <div className="mt-4">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="json-output" className="text-sm font-medium text-ink">
              Result
            </label>
            <CopyButton value={output} toolName="json-formatter" />
          </div>
          <output
            id="json-output"
            htmlFor="json-input"
            className="mt-2 block max-h-96 w-full overflow-auto whitespace-pre rounded-lg border border-line bg-surface-tint p-4 font-mono text-sm leading-6 text-ink"
          >
            {output}
          </output>
        </div>
      )}

      <p className={cn("mt-4 text-xs text-ink-faint")}>
        Runs entirely in your browser — your JSON is never uploaded. Input is limited to 1 MB.
      </p>
    </div>
  );
}
