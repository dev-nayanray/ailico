"use client";

import { useMemo, useState } from "react";
import { Eraser, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { trackEvent } from "@/lib/track";

const sourcePresets = ["google", "facebook", "instagram", "linkedin", "twitter", "newsletter", "youtube"];

interface FieldErrors {
  url?: string;
  source?: string;
  medium?: string;
  campaign?: string;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [touched, setTouched] = useState(false);

  const errors: FieldErrors = {};
  const trimmedUrl = url.trim();
  if (touched && trimmedUrl && !isValidUrl(trimmedUrl)) {
    errors.url = "Enter a full URL including https:// (e.g. https://example.com/offer)";
  }
  if (touched && !trimmedUrl) {
    errors.url = "The website URL is required.";
  }
  if (touched && !source.trim()) {
    errors.source = "Source is required (where the traffic comes from, e.g. google).";
  }
  if (touched && !medium.trim()) {
    errors.medium = "Medium is required (marketing medium, e.g. cpc, email, social).";
  }
  if (touched && !campaign.trim()) {
    errors.campaign = "Campaign name is required so you can recognize it in reports.";
  }

  const finalUrl = useMemo(() => {
    if (!isValidUrl(trimmedUrl) || !source.trim() || !medium.trim() || !campaign.trim()) {
      return "";
    }
    const params = new URLSearchParams();
    params.set("utm_source", source.trim());
    params.set("utm_medium", medium.trim());
    params.set("utm_campaign", campaign.trim());
    if (term.trim()) params.set("utm_term", term.trim());
    if (content.trim()) params.set("utm_content", content.trim());
    const base = new URL(trimmedUrl);
    base.search = params.toString();
    return base.toString();
  }, [trimmedUrl, source, medium, campaign, term, content]);

  const mediumPresets = ["cpc", "email", "social", "display", "referral", "affiliate"];

  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="utm-url" required>
            Website URL
          </FieldLabel>
          <input
            id="utm-url"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="https://example.com/your-page"
            aria-invalid={Boolean(errors.url)}
            aria-describedby={errors.url ? "utm-url-error" : undefined}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none aria-invalid:border-red-400"
          />
          <FieldError id="utm-url-error" message={errors.url} />
        </div>

        <div>
          <FieldLabel htmlFor="utm-source" required>
            Campaign source
          </FieldLabel>
          <input
            id="utm-source"
            type="text"
            value={source}
            onChange={(event) => setSource(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="google"
            list="source-presets"
            aria-invalid={Boolean(errors.source)}
            aria-describedby={errors.source ? "utm-source-error" : undefined}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none aria-invalid:border-red-400"
          />
          <datalist id="source-presets">
            {sourcePresets.map((preset) => (
              <option key={preset} value={preset} />
            ))}
          </datalist>
          <FieldError id="utm-source-error" message={errors.source} />
        </div>

        <div>
          <FieldLabel htmlFor="utm-medium" required>
            Campaign medium
          </FieldLabel>
          <input
            id="utm-medium"
            type="text"
            value={medium}
            onChange={(event) => setMedium(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="cpc"
            list="medium-presets"
            aria-invalid={Boolean(errors.medium)}
            aria-describedby={errors.medium ? "utm-medium-error" : undefined}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none aria-invalid:border-red-400"
          />
          <datalist id="medium-presets">
            {mediumPresets.map((preset) => (
              <option key={preset} value={preset} />
            ))}
          </datalist>
          <FieldError id="utm-medium-error" message={errors.medium} />
        </div>

        <div>
          <FieldLabel htmlFor="utm-campaign" required>
            Campaign name
          </FieldLabel>
          <input
            id="utm-campaign"
            type="text"
            value={campaign}
            onChange={(event) => setCampaign(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="spring-sale"
            aria-invalid={Boolean(errors.campaign)}
            aria-describedby={errors.campaign ? "utm-campaign-error" : undefined}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none aria-invalid:border-red-400"
          />
          <FieldError id="utm-campaign-error" message={errors.campaign} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor="utm-term">Campaign term (optional)</FieldLabel>
            <input
              id="utm-term"
              type="text"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="running+shoes"
              className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <FieldLabel htmlFor="utm-content">Campaign content (optional)</FieldLabel>
            <input
              id="utm-content"
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="banner-a"
              className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setUrl("");
            setSource("");
            setMedium("");
            setCampaign("");
            setTerm("");
            setContent("");
            setTouched(false);
          }}
        >
          <Eraser className="h-4 w-4" aria-hidden="true" />
          Reset
        </Button>
        <p className="text-xs text-ink-faint">* required fields</p>
      </div>

      <div className="mt-4 rounded-xl border border-accent-line bg-accent-soft p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-accent-strong">Your campaign URL</p>
          {finalUrl && (
            <div className="flex gap-2">
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("tool_used", { tool: "utm-builder", action: "test-open" })}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-accent-line bg-surface px-3 text-xs font-medium text-ink hover:border-accent"
              >
                Test link
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              <CopyButton value={finalUrl} toolName="utm-builder" />
            </div>
          )}
        </div>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-ink" aria-live="polite">
          {finalUrl || (
            <span className="text-ink-faint">
              Fill in the URL, source, medium, and campaign name — the tagged link appears here.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
      {children}
      {required && (
        <span className="ml-0.5 text-accent" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}
