import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { MotionDirector } from "@/components/motion-director";
import { Navigation } from "@/components/navigation";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://shef.dj"),
  title: { default: "SHEF — DJ / No Set Menu", template: "%s — SHEF" },
  description: "Official site for Vietnamese–Australian DJ SHEF. Listen to mixes spanning house, R&B, techno, hard bounce, and psytrance; view the press kit and booking information.",
  keywords: ["SHEF", "DJ SHEF", "Melbourne DJ", "Vietnamese Australian DJ", "house", "hard bounce", "R&B", "psytrance"],
  icons: { icon: "/images/shef-mark.svg", apple: "/images/shef-mark.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "SHEF — DJ / No Set Menu",
    description: "House, bounce, R&B, techno, and psytrance—cooked to the room.",
    url: "/",
    siteName: "SHEF",
    images: [{ url: "/images/shef-drive-1196.jpg", width: 4387, height: 6581, alt: "SHEF" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "SHEF", description: "No set menu.", images: ["/images/shef-drive-1196.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
      </body>
    </html>
  );
}
