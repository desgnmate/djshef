"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionDirector() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname.startsWith("/studio")) {
      document.querySelector<HTMLElement>(".page-loader")?.style.setProperty("display", "none");
      document.querySelector<HTMLElement>(".scroll-progress")?.style.setProperty("display", "none");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scope = document.body;

    const context = gsap.context(() => {
      gsap.set(".site-header", { autoAlpha: 1 });
      gsap.to(".page-loader", {
        autoAlpha: 0,
        duration: reduceMotion ? 0.01 : 0.28,
        ease: "power2.out",
        delay: reduceMotion ? 0 : 1.18,
        onComplete: () => gsap.set(".page-loader", { display: "none" }),
      });

      if (reduceMotion) return;

      gsap.from(".hero-line > span", {
        yPercent: 112,
        duration: 1.15,
        stagger: 0.1,
        delay: 1.02,
        ease: "power4.out",
      });

      gsap.from(".hero-chrome > *, .hero-lockup > :not(.hero-title)", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.08,
        delay: 1.28,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 56,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const media = element.querySelector<HTMLElement>("img, video");
        if (!media) return;
        const isHero = element.dataset.parallax === "hero";
        gsap.fromTo(media, { yPercent: isHero ? -1.5 : -6, scale: isHero ? 1.025 : 1.08 }, {
          yPercent: isHero ? 2.5 : 6,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".tour-row").forEach((row, index) => {
        gsap.from(row, {
          opacity: 0,
          x: index % 2 === 0 ? -24 : 24,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });

      const gallery = document.querySelector<HTMLElement>(".archive-section");
      const track = document.querySelector<HTMLElement>(".archive-track");
      if (gallery && track && window.innerWidth > 820) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: gallery,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 },
      });
    }, scope);

    return () => context.revert();
  }, [pathname]);

  return null;
}
