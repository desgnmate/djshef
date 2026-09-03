import "server-only";

import { createClient } from "@supabase/supabase-js";
import { isSupabaseAdminConfigured, supabaseServiceRoleKey, supabaseUrl } from "./env";

export function createSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL ?? supabaseUrl;
  if (!isSupabaseAdminConfigured || !url || !supabaseServiceRoleKey) {
    throw new Error("Supabase admin credentials are not configured.");
  }

  return createClient(url, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
