"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/track";

export function CopyButton({
  value,
  label = "Copy",
  toolName,
  className,
  disabled,
}: {
  value: string;
  label?: string;
  toolName: string;
  className?: string;
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      trackEvent("copy_action", { tool: toolName });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — the user can still select the text manually.
    }
  }, [value, toolName]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={onCopy}
      disabled={disabled || !value}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden="true" />
          {label}
        </>
      )}
    </Button>
  );
}
