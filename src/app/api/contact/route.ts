import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

/**
 * Contact form submission endpoint.
 *
 * - Server-side validation with zod (never trust the client).
 * - Honeypot field for basic spam protection.
 * - Rate limiting: 5 submissions per hour per IP.
 * - Storage: Supabase table (if configured) and/or a webhook (if configured).
 *   Without either, submissions are logged server-side only — see README for
 *   the production configuration warning.
 */

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(200)
    .pipe(z.email("Please enter a valid email address.")),
  website: z
    .union([z.literal(""), z.url("Please enter a full URL, including https://").max(300)])
    .optional(),
  service: z.enum([
    "website-quick-fix",
    "landing-page-development",
    "ai-workflow-setup",
    "other",
  ]),
  budget: z
    .union([
      z.literal(""),
      z.enum([
        "Under $100",
        "$100 – $250",
        "$250 – $500",
        "$500+",
        "Not sure yet",
      ]),
    ])
    .optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(3000, "Please keep the description under 3000 characters."),
  consent: z.literal(true, { error: "Please agree to the privacy policy." }),
  // Honeypot: any non-empty value marks the submission as automated. The field
  // accepts any string so bots get a success response and stop retrying.
  company_website: z.string().max(300).optional(),
});

async function persistLead(payload: z.infer<typeof contactSchema>) {
  const record = {
    name: payload.name,
    email: payload.email,
    website: payload.website || null,
    service: payload.service,
    budget: payload.budget || null,
    message: payload.message,
    created_at: new Date().toISOString(),
  };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(record),
      });
      if (!response.ok) {
        console.error("[contact] Supabase persist failed:", response.status);
      } else {
        return "supabase";
      }
    } catch (error) {
      console.error("[contact] Supabase persist error:", error);
    }
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_lead", lead: record }),
      });
      return "webhook";
    } catch (error) {
      console.error("[contact] Webhook notify error:", error);
    }
  }

  console.warn(
    "[contact] No storage configured (SUPABASE_URL/CONTACT_WEBHOOK_URL unset). Lead logged to server console only — configure storage before going to production:",
    JSON.stringify(record)
  );
  return "logged";
}

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many submissions from your connection. Please try again later.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form and try again." },
      { status: 400 }
    );
  }

  // Honeypot filled → silently accept but do nothing (do not tip off bots).
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  await persistLead(parsed.data);

  return NextResponse.json({ ok: true });
}
