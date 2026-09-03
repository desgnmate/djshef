"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type CmsDocument = Record<string, unknown>;

export function AdminStudio({ userEmail }: { userEmail: string }) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Loading current content…");
  const [busy, setBusy] = useState(true);

  async function load() {
    setBusy(true);
    setStatus("Loading current content…");
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus(body.error ?? "Could not load content.");
      setBusy(false);
      return;
    }
    setValue(JSON.stringify(body, null, 2));
    setStatus("Ready to edit.");
    setBusy(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function save() {
    let parsed: CmsDocument;
    try {
      parsed = JSON.parse(value) as CmsDocument;
    } catch {
      setStatus("Fix the JSON syntax before saving.");
      return;
    }
    setBusy(true);
    setStatus("Saving to Supabase…");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parsed),
    });
    const body = await response.json().catch(() => ({}));
    setStatus(response.ok ? "Saved. The public site is revalidating." : (body.error ?? "Save failed."));
    setBusy(false);
  }

  async function signOut() {
    await createSupabaseBrowserClient().auth.signOut();
    window.location.reload();
  }

  return (
    <section className="admin-studio" aria-labelledby="admin-title">
      <header className="admin-header">
        <div><p className="eyebrow">SHEF / private kitchen</p><h1 id="admin-title">Content <em>control.</em></h1></div>
        <div className="admin-user"><span>{userEmail}</span><button type="button" onClick={signOut}>Sign out ↗</button></div>
      </header>
      <div className="admin-toolbar"><p>{status}</p><div><button className="button button-ghost" type="button" onClick={() => void load()} disabled={busy}>Reload</button><button className="button button-solid" type="button" onClick={() => void save()} disabled={busy || !value}>Save content ↗</button></div></div>
      <label className="admin-editor"><span>Content JSON</span><textarea value={value} onChange={(event) => setValue(event.target.value)} spellCheck={false} aria-label="SHEF CMS content JSON" /></label>
      <div className="admin-help"><p className="eyebrow">How this works</p><p>This editor is intentionally portable: one JSON document, no hosted studio. Keep the object keys intact, edit copy, links, image paths, and published rows, then save. Images and video currently use files in <code>/public</code>; Supabase Storage can be added later without changing the content API.</p></div>
    </section>
  );
}
