import Image from "next/image";
import Link from "next/link";
import { siInstagram, siSoundcloud } from "simple-icons";
import { BrandIcon } from "@/components/brand-icon";
import { HeroPlayer } from "@/components/hero-player";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { getSiteContent } from "@/lib/content";

export default async function Home() {
  const site = await getSiteContent();
  const { settings, mixes, appearances, gallery, socials } = site;
  const featuredMix = mixes[3] ?? mixes[0];
  const socialLink = (label: string, fallback: string) => socials.find((social) => social.label.toLowerCase() === label.toLowerCase())?.href ?? fallback;

  return (
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-media" data-parallax="hero">
          <Image className="hero-image-base" src={settings.heroBaseImage} alt="SHEF in a black leather studio portrait" fill priority sizes="100vw" />
          <Image className="hero-image-curtain" src={settings.heroCurtainImage} alt="" fill priority sizes="100vw" aria-hidden="true" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-chrome">
          <div className="hero-transmission">
            <p className="eyebrow">Tonight&apos;s menu</p>
            <div className="hero-tour-marquee" aria-label={`SHEF sound: ${settings.flavourNotes.join(", ")}`}>
              <div className="hero-tour-track" aria-hidden="true">
                {[0, 1].map((loop) => (
                  <span className="hero-tour-loop" key={loop}>
                    {settings.flavourNotes.map((note, index) => <span className="hero-tour-location" key={`${loop}-${note}-${index}`}>{note}<i>✶</i></span>)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-lockup">
          <p className="hero-kicker">{settings.heroKicker}</p>
          <h1 className="hero-title" id="hero-title"><span className="hero-line"><span>{settings.heroTitle}</span></span></h1>
          <p className="hero-edition">{settings.heroEdition}</p>
        </div>
        <HeroPlayer
          title={featuredMix?.title}
          subtitle={featuredMix ? `${featuredMix.note} · ${featuredMix.year} preview` : undefined}
          artwork={featuredMix?.coverImage}
          previewTrack={featuredMix?.previewUrl}
          featuredSet={featuredMix?.href}
        />
      </section>

      <section className="manifesto section-pad" aria-labelledby="manifesto-title">
        <div className="section-code"><span>001</span><span>The approach</span></div>
        <h2 id="manifesto-title" data-reveal>{settings.manifestoHeadline[0]}<br />{settings.manifestoHeadline[1]}</h2>
        <div className="manifesto-foot" data-reveal>
          <p>{settings.manifestoBody}</p>
          <p className="eyebrow">{settings.manifestoRegion[0]}<br />{settings.manifestoRegion[1]}</p>
        </div>
      </section>

      <section className="music-section" id="music" aria-labelledby="music-title">
        <div className="music-image" data-parallax>
          <Image src={settings.musicImage} alt="SHEF working the decks at STEMS Official" fill sizes="(max-width: 820px) 100vw, 46vw" />
          <span className="image-code">{settings.musicImageCode}</span>
        </div>
        <div className="music-content section-pad">
          <div className="section-code"><span>002</span><span>On rotation</span></div>
          <h2 id="music-title" data-reveal>{settings.musicHeadline[0]}<br />{settings.musicHeadline[1]}</h2>
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
            <a href={socialLink("SoundCloud", "https://soundcloud.com/shef-699974995")} target="_blank" rel="noreferrer"><BrandIcon icon={siSoundcloud} /> SoundCloud</a>
            <a href={socialLink("Instagram", "https://www.instagram.com/shef.dj/")} target="_blank" rel="noreferrer"><BrandIcon icon={siInstagram} /> Instagram</a>
          </div>
        </div>
      </section>

      <section className="tour-section section-pad" id="sets" aria-labelledby="sets-title">
        <div className="section-code section-code-wide"><span>003</span><span>Selected sessions</span><span>Recent plates</span></div>
        <div className="tour-heading">
          <h2 id="sets-title" data-reveal>{settings.sessionsHeadline[0]}<br />{settings.sessionsHeadline[1]}</h2>
          <div className="tour-intro" data-reveal>
            <p>{settings.sessionsIntro}</p>
            <span className="tour-link-note"><strong>{String(appearances.length).padStart(2, "0")}</strong> {settings.sessionsFeaturedLabel}</span>
          </div>
        </div>
        <div className="tour-layout">
          <div className="tour-visual-pin">
            <div className="tour-visual" data-parallax>
              <video className="tour-visual-video" autoPlay loop muted playsInline preload="metadata" poster={settings.sessionsVideoPoster} aria-label="SHEF performing at STEMS Official">
                <source src={settings.sessionsVideo} type="video/mp4" />
              </video>
              <span className="image-code">{settings.sessionsImageCode}</span>
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
          <h2 id="story-title" data-reveal>{settings.aboutHeadline[0]}<br />{settings.aboutHeadline[1]}</h2>
          <div className="story-body" data-reveal>
            <p className="story-lead">{settings.aboutLead}</p>
            {settings.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <Link href="/press-kit" className="text-link">Read the press kit <ArrowUpRight /></Link>
          </div>
        </div>
        <div className="story-image" data-parallax>
          <Image src={settings.aboutImage} alt={settings.aboutImageAlt} fill sizes="(max-width: 820px) 100vw, 50vw" />
          <span className="image-code">{settings.aboutImageCode}</span>
        </div>
      </section>

      <section className="archive-section" id="archive" aria-labelledby="archive-title">
        <div className="archive-head">
          <div className="section-code"><span>005</span><span>Visual diary</span></div>
          <h2 id="archive-title">{settings.archiveHeadline}</h2>
          <p className="eyebrow archive-direction">{settings.archiveDirection} <ArrowRight /></p>
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
        <Image src={settings.bookingImage} alt={settings.bookingImageAlt} fill sizes="100vw" />
        <div className="booking-shade" aria-hidden="true" />
        <div className="booking-copy section-pad">
          <div className="section-code"><span>006</span><span>Bookings</span></div>
          <h2 id="booking-title" data-reveal>{settings.bookingHeadline[0]}<br />{settings.bookingHeadline[1]}</h2>
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
          <div className="footer-orbit"><span className="eyebrow">Orbit</span><strong>{settings.footerOrbitHeading}</strong><small>{settings.footerOrbitSubline}</small></div>
        </div>
        <div className="footer-bottom"><span>© 2026 SHEF</span><span>Cook good · eat good</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span></div>
      </footer>
    </main>
  );
}
