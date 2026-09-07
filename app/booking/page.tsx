import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Booking",
  description: "Prepare a clear booking brief for SHEF for club, festival, fashion, private, and brand events.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Booking — SHEF",
    description: "Prepare a clear booking brief for SHEF for club, festival, fashion, private, and brand events.",
    url: "/booking",
    siteName: "SHEF",
    type: "website",
    images: [{ url: "/images/shef-drive-1196.jpg", width: 1200, height: 630, alt: "SHEF Booking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking — SHEF",
    description: "Prepare a clear booking brief for SHEF for club, festival, fashion, private, and brand events.",
    images: ["/images/shef-drive-1196.jpg"],
  },
};

export default function BookingPage() {
  return (
    <main id="main" className="inner-page booking-page">
      <section className="inner-hero">
        <Image src="/images/shef-drive-1196.jpg" alt="SHEF in a black leather studio portrait" fill priority sizes="100vw" />
        <div className="inner-hero-shade" />
        <div className="inner-hero-copy">
          <p className="eyebrow">Booking / 2026—27</p>
          <h1>Put SHEF<br />on the menu.</h1>
          <p>Clubs · Festivals · Fashion · Private events</p>
        </div>
      </section>
      <section className="booking-page-content section-pad">
        <div className="booking-note">
          <div className="section-code"><span>001</span><span>Enquiry</span></div>
          <h2>Give us the<br />full order.</h2>
          <p>Share the essentials below. The form builds a clean booking brief you can copy, then send directly to SHEF through her official Instagram contact.</p>
          <p className="eyebrow">Official contact<br /><a className="icon-link" href="https://www.instagram.com/shef.dj/" target="_blank" rel="noreferrer">@shef.dj <ArrowUpRight /></a></p>
        </div>
        <BookingForm />
      </section>
      <section className="booking-rider section-pad">
        <div><span className="eyebrow">Performance profile</span><h3>Cross-genre<br />club energy</h3></div>
        <ul><li><span>Orbit</span>HCMC / Australia</li><li><span>Sound</span>House, bounce, R&B, techno</li><li><span>Available for</span>Club, festival, fashion, private</li><li><span>Brief</span>Technical needs supplied directly</li></ul>
        <Link href="/press-kit" className="button">View artist profile <ArrowUpRight /></Link>
      </section>
    </main>
  );
}
