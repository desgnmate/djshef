import { createClient } from "@supabase/supabase-js";
import { supabasePublishableKey, supabaseUrl } from "./env";

export function createSupabasePublicClient() {
  return createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabasePublishableKey || "placeholder-key",
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
