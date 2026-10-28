"use client";

/**
 * Lightweight, privacy-conscious event tracking.
 * Sends anonymous event names (plus small, non-personal metadata) to /api/track,
 * where they are counted server-side. No cookies, no fingerprinting, no PII.
 */

export type TrackEventName =
  | "search_submit"
  | "tool_used"
  | "copy_action"
  | "contact_submit"
  | "cta_click"
  | "outbound_click";

export function trackEvent(event: TrackEventName, meta?: Record<string, string | number | boolean>) {
  try {
    const payload = JSON.stringify({ event, meta: meta ?? {} });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }
  } catch {
    // Tracking must never break the user experience.
  }
}
