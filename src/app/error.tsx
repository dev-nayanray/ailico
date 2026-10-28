"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Surface the digest server-side; never show raw error text to visitors.
  console.error("[app] Unhandled error:", error.digest ?? error.message);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <AlertTriangle className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">
        Something went wrong
      </h1>
      <p className="mt-3 leading-7 text-ink-soft">
        An unexpected error occurred on our side — not anything you did. You can
        try again, or head back to a working page.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => reset()}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <ButtonLink href="/" variant="outline">
          Back to homepage
        </ButtonLink>
      </div>
    </div>
  );
}
