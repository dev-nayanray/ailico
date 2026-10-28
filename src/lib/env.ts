import { z } from "zod";

/**
 * Server environment validation.
 *
 * Public pages must never crash because an optional integration variable is
 * missing — API routes degrade gracefully based on the parsed config instead
 * of reading process.env directly.
 */

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("https://ailico.top"),
  SUPABASE_URL: z.url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
  CONTACT_WEBHOOK_URL: z
    .url()
    .refine((url) => url.startsWith("https://"), "CONTACT_WEBHOOK_URL must be https")
    .optional(),
  UPSTASH_REDIS_REST_URL: z
    .url()
    .refine((url) => url.startsWith("https://"), "UPSTASH_REDIS_REST_URL must be https")
    .optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  TRUST_PROXY_HEADERS: z.enum(["true", "false"]).default("true"),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (parsed.success) {
    cached = parsed.data;
  } else {
    // Log invalid entries but keep the app running with defaults.
    for (const issue of parsed.error.issues) {
      console.warn(`[env] Invalid or missing ${issue.path.join(".")}: ${issue.message}`);
    }
    cached = envSchema.parse({});
  }
  return cached;
}

/** Reset cache — used by tests. */
export function resetEnvCache(): void {
  cached = null;
}

export type LeadStorage =
  | { mode: "supabase"; url: string; serviceKey: string; webhook?: string }
  | { mode: "webhook"; webhook: string }
  | { mode: "none" };

/**
 * Which persistence backend the contact API should use.
 * Supabase wins when fully configured; a webhook alone still guarantees the
 * owner is notified; "none" is only acceptable outside production.
 */
export function leadStorageConfig(env: Env = getEnv()): LeadStorage {
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    return { mode: "supabase", url: env.SUPABASE_URL, serviceKey: env.SUPABASE_SERVICE_ROLE_KEY, webhook: env.CONTACT_WEBHOOK_URL };
  }
  if (env.CONTACT_WEBHOOK_URL) {
    return { mode: "webhook", webhook: env.CONTACT_WEBHOOK_URL };
  }
  return { mode: "none" };
}
