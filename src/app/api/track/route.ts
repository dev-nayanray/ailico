import { NextResponse } from "next/server";
import { limit } from "@/lib/security/rate-limit";
import { clientIpFromHeaders } from "@/lib/security/ip";
import { TRACK_EVENTS } from "@/lib/analytics/events";

/**
 * Anonymous event tracking endpoint.
 *
 * Accepts an event name and small non-personal metadata, counts them in
 * memory, and logs an aggregate line for the host's log drain. No cookies,
 * no IP storage, no personal data. Payloads are capped at 2 KB.
 */

const ALLOWED_EVENTS = new Set<string>(TRACK_EVENTS);
const MAX_TRACK_BYTES = 2_000;
const counts = new Map<string, number>();

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_TRACK_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  const ip = clientIpFromHeaders(request.headers);
  const ipLimit = await limit(`track:${ip}`, 120, 60 * 1000);
  if (!ipLimit.ok) {
    return new NextResponse(null, { status: 429 });
  }

  let body: { event?: unknown; meta?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > MAX_TRACK_BYTES) {
      return new NextResponse(null, { status: 413 });
    }
    body = JSON.parse(raw);
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
