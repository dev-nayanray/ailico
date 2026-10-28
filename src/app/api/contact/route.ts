import { NextResponse } from "next/server";
import { leadStorageConfig } from "@/lib/env";
import { limit } from "@/lib/security/rate-limit";
import { clientIpFromHeaders } from "@/lib/security/ip";
import {
  contactSchema,
  logSafeSummary,
  CONTACT_REQUEST_MAX_BYTES,
} from "@/lib/validation/contact";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

/**
 * Contact form submission endpoint.
 *
 * Guarantees:
 * - Server-side zod validation (client limits are mirrored, not trusted).
 * - Request-size cap before parsing.
 * - Honeypot: bot submissions get a plausible success and are discarded.
 * - Rate limiting: per IP (per-hour) and per email (duplicate protection),
 *   shared across instances when Upstash is configured.
 * - Honest success semantics: `ok:true` is returned ONLY when storage
 *   confirmed persistence (or in non-production log-only dev mode).
 *   Failures are reported to the user with a retry path — never as success.
 */

const IP_LIMIT = 5;
const IP_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_LIMIT = 2;
const EMAIL_WINDOW_MS = 60 * 60 * 1000;

interface PersistOutcome {
  persisted: boolean;
  detail: "supabase" | "webhook" | "dev-log";
}

async function persistLead(payload: ReturnType<typeof contactSchema.parse>): Promise<PersistOutcome> {
  const record = {
    name: payload.name,
    email: payload.email,
    website: payload.website || null,
    service: payload.service,
    budget: payload.budget || null,
    message: payload.message,
    source: "contact-form",
  };

  const storage = leadStorageConfig();
  let supabaseOk = false;

  if (storage.mode === "supabase") {
    const supabase = getSupabaseServiceClient();
    if (supabase) {
      const { error } = await supabase.from("leads").insert(record);
      if (error) {
        console.error("[contact] Supabase insert failed:", error.message);
      } else {
        supabaseOk = true;
      }
    }
  }

  // Optional notification when Supabase is the system of record.
  if (storage.mode === "supabase" && storage.webhook) {
    try {
      const response = await fetch(storage.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_lead", lead: record }),
      });
      if (!response.ok) console.error("[contact] Webhook notify failed:", response.status);
    } catch (notifyError) {
      // Notification failure must not fail an already-persisted lead.
      console.error("[contact] Webhook notify error:", notifyError);
    }
  }

  if (supabaseOk) return { persisted: true, detail: "supabase" };

  if (storage.mode === "webhook") {
    // Webhook-only mode: the notification itself is the delivery. If the
    // fetch above threw, we cannot confirm the owner received anything.
    try {
      const response = await fetch(storage.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_lead", lead: record }),
      });
      if (response.ok) return { persisted: true, detail: "webhook" };
      console.error("[contact] Webhook delivery failed:", response.status);
    } catch (deliverError) {
      console.error("[contact] Webhook delivery error:", deliverError);
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[contact] DEV MODE: no storage configured. Lead logged briefly (summary only):",
      logSafeSummary(payload)
    );
    return { persisted: true, detail: "dev-log" };
  }

  return { persisted: false, detail: "dev-log" };
}

function errorResponse(
  message: string,
  status: number,
  extraHeaders?: Record<string, string>
) {
  return NextResponse.json({ ok: false, error: message }, { status, headers: extraHeaders });
}

export async function POST(request: Request) {
  // Request-size cap before parsing the body.
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > CONTACT_REQUEST_MAX_BYTES) {
    return errorResponse("Request is too large.", 413);
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > CONTACT_REQUEST_MAX_BYTES) {
      return errorResponse("Request is too large.", 413);
    }
    body = JSON.parse(raw);
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const ip = clientIpFromHeaders(request.headers);

  // Per-IP limit.
  const ipLimit = await limit(`contact-ip:${ip}`, IP_LIMIT, IP_WINDOW_MS);
  if (!ipLimit.ok) {
    return errorResponse(
      "Too many submissions from your connection. Please try again later.",
      429,
      { "Retry-After": String(ipLimit.retryAfterSeconds) }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return errorResponse(
      first?.message ?? "Please check the form and try again.",
      400
    );
  }

  // Honeypot filled → pretend success, store nothing.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  // Per-email duplicate protection (same person re-submitting).
  const emailKey = `contact-email:${parsed.data.email}`;
  const emailLimit = await limit(emailKey, EMAIL_LIMIT, EMAIL_WINDOW_MS);
  if (!emailLimit.ok) {
    return errorResponse(
      "We already received your message. Please wait a bit before sending another, or reply to our email.",
      429,
      { "Retry-After": String(emailLimit.retryAfterSeconds) }
    );
  }

  const outcome = await persistLead(parsed.data);

  if (!outcome.persisted) {
    console.error("[contact] Submission lost: no storage configured in production.");
    return errorResponse(
      "We could not save your message right now. Please try again in a few minutes.",
      503
    );
  }

  return NextResponse.json({ ok: true });
}

// Small export for tests that want the limits without hitting the route.
export const __limits = { IP_LIMIT, IP_WINDOW_MS, EMAIL_LIMIT, EMAIL_WINDOW_MS };
