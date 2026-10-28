/** UTM URL construction — pure function, unit-tested. */

export interface UtmParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Builds a UTM-tagged URL with proper encoding, or null when required
 * inputs are missing/invalid. Preserves existing query parameters where
 * practical (UTM parameters take precedence on collision).
 */
export function buildUtmUrl(params: UtmParams): string | null {
  const { url, source, medium, campaign, term, content } = params;
  if (!isValidHttpUrl(url)) return null;
  if (!(source ?? "").trim() || !(medium ?? "").trim() || !(campaign ?? "").trim()) {
    return null;
  }

  const target = new URL(url.trim());
  target.searchParams.set("utm_source", source.trim());
  target.searchParams.set("utm_medium", medium.trim());
  target.searchParams.set("utm_campaign", campaign.trim());
  if (term?.trim()) target.searchParams.set("utm_term", term.trim());
  if (content?.trim()) target.searchParams.set("utm_content", content.trim());
  return target.toString();
}
