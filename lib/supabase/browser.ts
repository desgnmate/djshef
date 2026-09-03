"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabasePublishableKey, supabaseUrl } from "./env";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabasePublishableKey || "placeholder-key",
  );
}
