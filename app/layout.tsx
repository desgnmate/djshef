import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { MotionDirector } from "@/components/motion-director";
import { Navigation } from "@/components/navigation";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/sanity/live";
import { getSiteContent } from "@/lib/content";
import { isSanityConfigured } from "@/lib/sanity/env";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://djshef.vercel.app";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings.seoTitle, template: "%s — SHEF" },
    description: settings.seoDescription,
    keywords: ["SHEF", "DJ SHEF", "Melbourne DJ", "Vietnamese Australian DJ", "house", "hard bounce", "R&B", "psytrance"],
    icons: { icon: "/images/shef-mark.svg", apple: "/images/shef-mark.svg" },
    alternates: { canonical: "/" },
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: "/",
      siteName: "SHEF",
      images: [{ url: settings.seoImage, width: 4387, height: 6581, alt: "SHEF" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: settings.seoTitle, description: settings.seoDescription, images: [settings.seoImage] },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isDraftMode = isSanityConfigured ? (await draftMode()).isEnabled : false;

  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="page-loader" aria-hidden="true">
          <div className="loader-mark"><span className="loader-mark-icon">S</span></div>
        </div>
        <div className="scroll-progress" aria-hidden="true" />
        <Navigation />
        <MotionDirector />
        {children}
        {isDraftMode && <SanityLive includeDrafts />}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
