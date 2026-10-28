import { z } from "zod";

/**
 * Contact form validation schema — shared by the API route and tests.
 * Client-side HTML attributes mirror these limits; the server is the
 * authority.
 */

export const CONTACT_MESSAGE_MAX = 3000;
export const CONTACT_REQUEST_MAX_BYTES = 12_000;

export const contactSchema = z.object({
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
    .union([
      z.literal(""),
      // z.url() only checks syntax — "javascript:alert(1)" is a valid URL.
      // Restrict to web protocols before storing.
      z
        .url("Please enter a full URL, including https://")
        .refine(
          (url) => url.startsWith("http://") || url.startsWith("https://"),
          "Please enter an http(s) URL."
        )
        .max(300),
    ])
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
      z.enum(["Under $100", "$100 – $250", "$250 – $500", "$500+", "Not sure yet"]),
    ])
    .optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(CONTACT_MESSAGE_MAX, "Please keep the description under 3000 characters."),
  consent: z.literal(true, { error: "Please agree to the privacy policy." }),
  // Honeypot: hidden field real users never fill. Any non-empty value marks
  // the submission as automated; accepted by the schema so bots get a
  // plausible success response instead of a useful signal.
  company_website: z.string().max(300).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Extract only safe, display-safe fields for logs — never the full message. */
export function logSafeSummary(input: ContactInput): string {
  return JSON.stringify({
    service: input.service,
    website: input.website ? "(provided)" : "(none)",
    budget: input.budget || "(none)",
    messageLength: input.message.length,
    domain: input.email.split("@")[1] ?? "",
  });
}
