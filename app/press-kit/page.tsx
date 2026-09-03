import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { ArrowUpRight } from "@/components/icons";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = { title: "Press kit", description: "Official SHEF biography, artist profile, selected credits, press images, and booking information." };

export default async function PressKitPage() {
  const site = await getSiteContent();
  const { settings, pressKit, socials } = site;

  return (
    <main id="main" className="inner-page press-page">
      <section className="press-hero">
        <Image src={settings.heroBaseImage} alt="SHEF in a black leather studio portrait" fill priority sizes="100vw" />
        <div className="inner-hero-shade" />
        <div className="press-hero-copy"><p className="eyebrow">{pressKit.eyebrow}</p><h1>{settings.heroTitle}</h1><div><span>Artist / DJ</span><span>HCMC / Australia</span></div></div>
      </section>
      <section className="press-intro section-pad">
        <div><div className="section-code"><span>001</span><span>Artist profile</span></div><h2>{pressKit.headline[0]}<br />{pressKit.headline[1]}</h2></div>
        <div className="press-bio">
          <p>{pressKit.lead}</p>
          {pressKit.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="press-actions"><PrintButton /><Link href="/booking" className="button">Booking brief <ArrowUpRight /></Link></div>
        </div>
      </section>
      <section className="press-facts section-pad">
        <div className="section-code section-code-wide"><span>002</span><span>At a glance</span><span>Artist facts</span></div>
        <div className="fact-grid">{pressKit.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>
      </section>
      <section className="press-images">
        <figure><Image src={pressKit.portraitOne} alt={pressKit.portraitOneAlt} fill sizes="50vw" /><figcaption>{pressKit.portraitOneCaption}</figcaption></figure>
        <figure><Image src={pressKit.portraitTwo} alt={pressKit.portraitTwoAlt} fill sizes="50vw" /><figcaption>{pressKit.portraitTwoCaption}</figcaption></figure>
      </section>
      <section className="rider-section section-pad">
        <div className="rider-title"><div className="section-code"><span>003</span><span>Promoter notes</span></div><h2>Before<br />service</h2><p>SHEF&apos;s current technical requirements are shared directly with confirmed promoters. Include the details below with the first enquiry.</p></div>
        <div className="rider-list">{pressKit.promoterNotes.map((note) => <div key={note.label}><span>{note.label}</span><p>{note.copy}</p></div>)}</div>
      </section>
      <section className="press-contact section-pad"><p className="eyebrow">Bookings / press / partnerships</p><Link href="/booking">Prepare a proper brief</Link><div>{socials.map((social) => <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label} <ArrowUpRight /></a>)}</div></section>
    </main>
  );
}
