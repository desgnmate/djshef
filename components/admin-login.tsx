"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    window.location.reload();
  }

  return (
    <section className="admin-login" aria-labelledby="admin-login-title">
      <p className="eyebrow">SHEF / private kitchen</p>
      <h1 id="admin-login-title">Content<br /><em>access.</em></h1>
      <p className="admin-login-copy">Sign in with the approved Supabase account to edit the site content.</p>
      <form onSubmit={submit}>
        <label><span>Email</span><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="button button-solid" type="submit" disabled={busy}>{busy ? "Opening…" : "Open CMS ↗"}</button>
      </form>
    </section>
  );
}
