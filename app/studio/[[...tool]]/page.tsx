"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/lib/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", background: "#12100f", color: "#f7f2e9", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ letterSpacing: ".12em", textTransform: "uppercase", fontSize: 12, opacity: .65 }}>SHEF CMS</p>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1, margin: "1rem 0" }}>Connect Sanity to edit the site.</h1>
          <p style={{ lineHeight: 1.6, opacity: .75 }}>Add the public project ID and dataset from <code>.env.local</code>, then reload this page to open the editor.</p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
