import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "@/lib/env";

/**
 * Server-side Supabase client factory using the service-role key.
 *
 * - `server-only` makes any accidental client import a build error, so the
 *   service key can never leak into a browser bundle.
 * - The key is only read through the validated env module.
 * - No sessions are stored (persistSession: false) — this is a machine client.
 */

let cached: SupabaseClient | null = null;

export function getSupabaseServiceClient(): SupabaseClient | null {
  const env = getEnv();
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return null;
  if (cached) return cached;
  cached = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
