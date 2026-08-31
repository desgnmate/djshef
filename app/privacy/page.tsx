import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() { return <main id="main" className="legal-page section-pad"><p className="eyebrow">Legal / 01</p><h1>Privacy</h1><div><p>This website does not store booking form submissions. The booking tool prepares a brief and copies it to your device clipboard only after you ask it to.</p><p>External music and social platforms may process usage data under their own privacy policies when you follow an outbound link.</p><p>For direct questions, use SHEF&apos;s official <a href="https://www.instagram.com/shef.dj/" target="_blank" rel="noreferrer">Instagram profile</a>.</p><Link href="/" className="icon-link"><ArrowLeft /> Return home</Link></div></main>; }
