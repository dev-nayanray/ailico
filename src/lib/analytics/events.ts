/** Anonymous analytics event vocabulary. See docs/ANALYTICS.md. */
export const TRACK_EVENTS = [
  "search_submit",
  "tool_used",
  "copy_action",
  "contact_submit",
  "cta_click",
  "outbound_click",
] as const;

export type TrackEventName = (typeof TRACK_EVENTS)[number];
