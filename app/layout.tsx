import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { MotionDirector } from "@/components/motion-director";
import { Navigation } from "@/components/navigation";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#100d0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
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
  const { settings } = await getSiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://djshef.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "MusicGroup"],
        "@id": `${siteUrl}/#artist`,
        name: "SHEF",
        alternateName: ["DJ SHEF", "shef.dj"],
        url: siteUrl,
        image: `${siteUrl}${settings.seoImage}`,
        description: settings.seoDescription,
        genre: ["House", "Hard Bounce", "R&B", "Psytrance", "Techno"],
        sameAs: [
          "https://www.instagram.com/shef.dj/",
          "https://soundcloud.com/shef-699974995",
        ],
        jobTitle: "DJ / Music Artist",
        knowsAbout: ["Music Production", "DJing", "Sound Design", "Electronic Music"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "SHEF — DJ / No Set Menu",
        publisher: { "@id": `${siteUrl}/#artist` },
      },
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="page-loader" aria-hidden="true">
          <div className="loader-mark"><span className="loader-mark-icon">S</span></div>
        </div>
        <div className="scroll-progress" aria-hidden="true" />
        <Navigation />
        <MotionDirector />
        {children}
      </body>
    </html>
  );
}

