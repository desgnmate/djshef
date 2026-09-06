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
      <div className="admin-login-brand"><span className="admin-app-mark">S</span><div><span className="eyebrow">SHEF / website admin</span><strong>Content management</strong></div></div>
      <h1 id="admin-login-title">Sign in to<br /><em>continue.</em></h1>
      <p className="admin-login-copy">Use your approved admin account to manage the content published on the SHEF website.</p>
      <form onSubmit={submit}>
        <label><span>Email</span><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-button admin-button-dark" type="submit" disabled={busy}>{busy ? "Signing in…" : "Continue to CMS"}</button>
      </form>
    </section>
  );
}
