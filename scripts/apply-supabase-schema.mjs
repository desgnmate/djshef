import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("Set POSTGRES_URL_NON_POOLING (or POSTGRES_URL) before running cms:db.");
  process.exit(1);
}

const migrationPath = resolve(process.cwd(), "supabase/migrations/20260903103159_shef_cms.sql");
const migration = await readFile(migrationPath, "utf8");
const sql = postgres(connectionString, { max: 1, connect_timeout: 15, idle_timeout: 5, ssl: "require" });

try {
  await sql.unsafe(migration);
  const [{ count }] = await sql`select count(*)::int as count from public.site_settings`;
  console.log(`Supabase schema ready (${count} site settings row${count === 1 ? "" : "s"}).`);
} finally {
  await sql.end({ timeout: 5 });
}
