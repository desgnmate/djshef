import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { socials } from "@/data/site";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = { title: "Press kit", description: "Official SHEF biography, artist profile, selected credits, press images, and booking information." };

export default function PressKitPage() {
  return (
    <main id="main" className="inner-page press-page">
      <section className="press-hero">
        <Image src="/images/shef-drive-1196.jpg" alt="SHEF in a black leather studio portrait" fill priority sizes="100vw" />
        <div className="inner-hero-shade" />
        <div className="press-hero-copy"><p className="eyebrow">Official electronic press kit / 2026</p><h1>SHEF</h1><div><span>Artist / DJ</span><span>HCMC / Australia</span></div></div>
      </section>
      <section className="press-intro section-pad">
        <div><div className="section-code"><span>001</span><span>Artist profile</span></div><h2>No set menu.<br />Always enough heat.</h2></div>
        <div className="press-bio">
          <p>SHEF is a Vietnamese–Australian DJ working between Ho Chi Minh City and Australia, with Melbourne at the centre of her club story.</p>
          <p>Her sets are built by feel rather than genre borders. House and deep grooves meet soulful R&B, hard bounce, techno, and psytrance—switching temperature without losing the room.</p>
          <p>Recent highlights include a Brisbane opening set for Jenevieve’s sold-out Crysalis Tour, a B2B at Melbourne’s Trieye underground warehouse rave, a STEMS Official appearance, and DG Radio: Episode 21 for Dangerous Goods.</p>
          <div className="press-actions"><PrintButton /><Link href="/booking" className="button">Booking brief <ArrowUpRight /></Link></div>
        </div>
      </section>
      <section className="press-facts section-pad">
        <div className="section-code section-code-wide"><span>002</span><span>At a glance</span><span>Artist facts</span></div>
        <div className="fact-grid"><div><span>Roots</span><strong>Vietnamese–Australian</strong></div><div><span>Orbit</span><strong>HCMC / Australia</strong></div><div><span>Club base</span><strong>Melbourne</strong></div><div><span>Format</span><strong>Cross-genre DJ</strong></div><div><span>Sound</span><strong>House / bounce / R&B</strong></div><div><span>Featured</span><strong>DG Radio 21</strong></div></div>
      </section>
      <section className="press-images">
        <figure><Image src="/images/shef-drive-1247.jpg" alt="SHEF black leather press portrait" fill sizes="50vw" /><figcaption>Press portrait 01 / supplied folder</figcaption></figure>
        <figure><Image src="/images/shef-drive-orange-45422.jpg" alt="SHEF in a coral editorial look" fill sizes="50vw" /><figcaption>Press portrait 02 / supplied folder</figcaption></figure>
      </section>
      <section className="rider-section section-pad">
        <div className="rider-title"><div className="section-code"><span>003</span><span>Promoter notes</span></div><h2>Before<br />service</h2><p>SHEF&apos;s current technical requirements are shared directly with confirmed promoters. Include the details below with the first enquiry.</p></div>
        <div className="rider-list"><div><span>Event</span><p>Date, city, venue, event type, and expected capacity</p></div><div><span>Lineup</span><p>Full bill, proposed set time, and requested set length</p></div><div><span>Booth</span><p>Available players, mixer, monitor setup, and venue sound contact</p></div><div><span>Travel</span><p>Transport, accommodation, visas, and ground-transfer plan where applicable</p></div><div><span>Offer</span><p>Fee, currency, payment terms, and inclusions stated clearly</p></div></div>
      </section>
      <section className="press-contact section-pad"><p className="eyebrow">Bookings / press / partnerships</p><Link href="/booking">Prepare a proper brief</Link><div>{socials.map((social) => <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label} <ArrowUpRight /></a>)}</div></section>
    </main>
  );
}
