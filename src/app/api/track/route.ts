import { NextResponse } from "next/server";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

/**
 * Anonymous event tracking endpoint.
 *
 * Accepts an event name and small non-personal metadata, counts them
 * in memory, and logs an aggregate line for the host's log drain.
 * No cookies, no IP storage, no personal data.
 */

const ALLOWED_EVENTS = new Set([
  "search_submit",
  "tool_used",
  "copy_action",
  "contact_submit",
  "cta_click",
  "outbound_click",
]);

const counts = new Map<string, number>();

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  const limit = rateLimit(`track:${ip}`, 120, 60 * 1000);
  if (!limit.ok) {
    return new NextResponse(null, { status: 429 });
  }

  let body: { event?: unknown; meta?: unknown };
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const event = typeof body.event === "string" ? body.event : "";
  if (!ALLOWED_EVENTS.has(event)) {
    return new NextResponse(null, { status: 204 });
  }

  counts.set(event, (counts.get(event) ?? 0) + 1);
  const meta =
    body.meta && typeof body.meta === "object" && Object.keys(body.meta as object).length > 0
      ? JSON.stringify(body.meta)
      : "";
  console.info(`[track] ${event} (total: ${counts.get(event)}) ${meta}`);

  return new NextResponse(null, { status: 204 });
}
