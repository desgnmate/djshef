import "server-only";

import { createSupabaseServerClient } from "./server";

function configuredAdminEmails() {
  return (process.env.CMS_ADMIN_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getCmsAdminUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const email = data.user.email?.toLowerCase();
  const allowlist = configuredAdminEmails();
  const configuredUserId = process.env.CMS_ADMIN_USER_ID;
  const isAllowed = Boolean(
    (email && allowlist.includes(email)) || (configuredUserId && data.user.id === configuredUserId),
  );

  return isAllowed ? data.user : null;
}
