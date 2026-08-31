import Image from "next/image";
import Link from "next/link";
import { siInstagram, siSoundcloud } from "simple-icons";
import { appearances, gallery, mixes, socials } from "@/data/site";
import { BrandIcon } from "@/components/brand-icon";
import { HeroPlayer } from "@/components/hero-player";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

const flavourNotes = ["House", "Hard bounce", "R&B", "Psytrance", "Techno", "No set menu"];

export default function Home() {
  return (
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-media" data-parallax="hero">
          <Image className="hero-image-base" src="/images/shef-drive-1196.jpg" alt="SHEF in a black leather studio portrait" fill priority sizes="100vw" />
          <Image className="hero-image-curtain" src="/images/shef-drive-orange-45450.jpg" alt="" fill priority sizes="100vw" aria-hidden="true" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-chrome">
          <div className="hero-transmission">
            <p className="eyebrow">Tonight&apos;s menu</p>
            <div className="hero-tour-marquee" aria-label={`SHEF sound: ${flavourNotes.join(", ")}`}>
              <div className="hero-tour-track" aria-hidden="true">
                {[0, 1].map((loop) => (
                  <span className="hero-tour-loop" key={loop}>
                    {flavourNotes.map((note, index) => <span className="hero-tour-location" key={`${loop}-${note}-${index}`}>{note}<i>✶</i></span>)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-lockup">
          <p className="hero-kicker">DJ / AUS ↔ HCMC</p>
          <h1 className="hero-title" id="hero-title"><span className="hero-line"><span>SHEF</span></span></h1>
          <p className="hero-edition">Cooking heat without a fixed recipe.</p>
        </div>
        <HeroPlayer />
      </section>

      <section className="manifesto section-pad" aria-labelledby="manifesto-title">
        <div className="section-code"><span>001</span><span>The approach</span></div>
        <h2 id="manifesto-title" data-reveal>No set<br />menu.</h2>
        <div className="manifesto-foot" data-reveal>
          <p>SHEF moves by instinct: soulful R&B into house, deep grooves into hard bounce, techno into psytrance. The only rule is that the room leaves hotter than it arrived.</p>
          <p className="eyebrow">Vietnamese–Australian<br />HCMC · Melbourne · beyond</p>
        </div>
      </section>

      <section className="music-section" id="music" aria-labelledby="music-title">
        <div className="music-image" data-parallax>
          <Image src="/images/shef-live.jpg" alt="SHEF working the decks at STEMS Official" fill sizes="(max-width: 820px) 100vw, 46vw" />
          <span className="image-code">STEMS / NAARM</span>
        </div>
        <div className="music-content section-pad">
          <div className="section-code"><span>002</span><span>On rotation</span></div>
          <h2 id="music-title" data-reveal>Fresh<br />from the pass</h2>
          <div className="release-list" data-reveal>
            {mixes.map((mix, index) => (
              <a href={mix.href} target="_blank" rel="noreferrer" className="release-row" key={mix.title}>
                <span className="release-number">0{index + 1}</span>
                <span><strong>{mix.title}</strong><small>{mix.note}</small></span>
                <span className="release-year">{mix.year}</span>
                <ArrowUpRight className="icon-arrow release-arrow" />
              </a>
            ))}
          </div>
          <div className="music-links">
            <a href="https://soundcloud.com/shef-699974995" target="_blank" rel="noreferrer"><BrandIcon icon={siSoundcloud} /> SoundCloud</a>
            <a href="https://www.instagram.com/shef.dj/" target="_blank" rel="noreferrer"><BrandIcon icon={siInstagram} /> Instagram</a>
          </div>
        </div>
      </section>

      <section className="tour-section section-pad" id="sets" aria-labelledby="sets-title">
        <div className="section-code section-code-wide"><span>003</span><span>Selected sessions</span><span>Recent plates</span></div>
        <div className="tour-heading">
          <h2 id="sets-title" data-reveal>Where she<br />cooked</h2>
          <div className="tour-intro" data-reveal>
            <p>Club rooms, warehouse energy, radio airwaves, and an R&B world tour stop. Different settings; the same appetite.</p>
            <span className="tour-link-note"><strong>04</strong> featured sessions</span>
          </div>
        </div>
        <div className="tour-layout">
          <div className="tour-visual-pin">
            <div className="tour-visual" data-parallax>
              <video className="tour-visual-video" autoPlay loop muted playsInline preload="metadata" poster="/images/shef-stems-vault-poster.jpg" aria-label="SHEF performing at STEMS Official">
                <source src="/videos/shef-stems-vault.mp4" type="video/mp4" />
              </video>
              <span className="image-code">LIVE / MELBOURNE</span>
            </div>
          </div>
          <div className="tour-list">
            {appearances.map((show) => (
              <a className="tour-row" href={show.href} target="_blank" rel="noreferrer" key={`${show.year}-${show.city}`} aria-label={`${show.city} — ${show.venue}`}>
                <time>{show.year}</time>
                <span className="tour-city"><strong>{show.city}</strong><small>{show.venue}</small></span>
                <span className="tour-country">{show.note}</span>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section" id="story" aria-labelledby="story-title">
        <div className="story-copy section-pad">
          <div className="section-code"><span>004</span><span>About SHEF</span></div>
          <h2 id="story-title" data-reveal>Just a<br />shef.</h2>
          <div className="story-body" data-reveal>
            <p className="story-lead">Vietnamese–Australian roots. Melbourne club instincts. A growing orbit between Australia, HCMC, and wherever the next room is ready.</p>
            <p>SHEF is a cross-genre DJ who treats a set like a shared table: familiar flavours, unexpected combinations, and enough heat to keep everyone leaning in.</p>
            <p>Her public mixes move from deep house and R&B to techno, hard bounce, and psytrance. That range is the point—she reads the room first and serves the right plate next.</p>
            <Link href="/press-kit" className="text-link">Read the press kit <ArrowUpRight /></Link>
          </div>
        </div>
        <div className="story-image" data-parallax>
          <Image src="/images/shef-green.jpg" alt="SHEF in a green look surrounded by red roses" fill sizes="(max-width: 820px) 100vw, 50vw" />
          <span className="image-code">AFTER HOURS / 2026</span>
        </div>
      </section>

      <section className="archive-section" id="archive" aria-labelledby="archive-title">
        <div className="archive-head">
          <div className="section-code"><span>005</span><span>Visual diary</span></div>
          <h2 id="archive-title">Plates & places</h2>
          <p className="eyebrow archive-direction">Drag / scroll to travel <ArrowRight /></p>
        </div>
        <div className="archive-track">
          {gallery.map((item, index) => (
            <figure className={`archive-frame frame-${index + 1}`} key={item.src}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 820px) 82vw, 40vw" />
              <figcaption><span>{item.code}</span><span>0{index + 1} / 0{gallery.length}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="booking-cta" id="contact" aria-labelledby="booking-title">
        <Image src="/images/shef-drive-orange-45390.jpg" alt="SHEF in a coral editorial portrait" fill sizes="100vw" />
        <div className="booking-shade" aria-hidden="true" />
        <div className="booking-copy section-pad">
          <div className="section-code"><span>006</span><span>Bookings</span></div>
          <h2 id="booking-title" data-reveal>Put SHEF<br />on the menu.</h2>
          <div className="booking-actions" data-reveal>
            <Link className="button button-light" href="/booking">Build an enquiry <ArrowUpRight /></Link>
            <Link className="button button-ghost" href="/press-kit">Open press kit <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      <footer id="footer" className="site-footer section-pad">
        <div className="footer-top">
          <div className="footer-wordmark" aria-label="SHEF">SHEF<span>✶</span></div>
          <div className="footer-booking"><span className="eyebrow">Bookings</span><Link href="/booking">Prepare an enquiry <ArrowUpRight /></Link></div>
          <div className="footer-follow"><span className="eyebrow">Follow</span>{socials.map((social) => <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label} <ArrowUpRight /></a>)}</div>
          <div className="footer-orbit"><span className="eyebrow">Orbit</span><strong>Melbourne ↔ HCMC</strong><small>House · Bounce · R&amp;B · Techno</small></div>
        </div>
        <div className="footer-bottom"><span>© 2026 SHEF</span><span>Cook good · eat good</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div>
      </footer>
    </main>
  );
}
