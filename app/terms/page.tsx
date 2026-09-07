import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms and conditions for SHEF artist promotion and booking enquiries.",
  alternates: { canonical: "/terms" },
};
export default function TermsPage() { return <main id="main" className="legal-page section-pad"><p className="eyebrow">Legal / 02</p><h1>Terms</h1><div><p>Information on this website is provided for artist promotion and booking enquiries. Appearances, availability, and published set details can change; promoters and platforms provide the final information.</p><p>All photographs, artist marks, copy, and recordings remain the property of their respective rights holders and may not be reused without permission.</p><p>A booking brief does not confirm an engagement. A date is confirmed only through a completed agreement with SHEF&apos;s team.</p><Link href="/" className="icon-link"><ArrowLeft /> Return home</Link></div></main>; }

