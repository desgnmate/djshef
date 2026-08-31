"use client";

import Image from "next/image";
import { Pause, Play, Waveform } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const previewTrack = "/audio/shef-psytrance-preview.mp3";
const featuredSet = "https://soundcloud.com/shef-699974995/psytrance-freestyle-mix-2025-07-13";
const waveformBars = [7, 12, 18, 10, 22, 15, 8, 19, 25, 13, 9, 17, 23, 11, 16, 21, 8, 14, 24, 17, 10, 20, 13, 7];

export function HeroPlayer() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(previewTrack);
    audio.preload = "metadata";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const hero = document.querySelector("#top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.12),
      { threshold: [0, 0.12, 0.5] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`hero-player${isHeroVisible ? " is-visible" : " is-collapsed"}${isPlaying ? " is-playing" : ""}`}>
      <a className="hero-player-art-link" href={featuredSet} target="_blank" rel="noreferrer" aria-label="Open SHEF's Psytrance Freestyle Mix on SoundCloud">
        <Image className="hero-player-art" src="/images/shef-stems-vault-poster.jpg" alt="SHEF performing at STEMS Official" width={200} height={200} />
      </a>
      <a className="hero-player-copy" href={featuredSet} target="_blank" rel="noreferrer" aria-label="Open SHEF's Psytrance Freestyle Mix on SoundCloud">
        <strong>Psytrance Freestyle Mix</strong><small>SHEF · 2025 preview</small>
      </a>
      <span className="hero-player-controls"><button className="hero-player-toggle" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause SHEF preview" : "Play SHEF preview"}>{isPlaying ? <Pause size={17} weight="fill" /> : <Play size={17} weight="fill" />}</button></span>
      <span className="hero-player-waveform" aria-hidden="true">{waveformBars.map((height, index) => <i className={isPlaying && index % 2 === 0 ? "is-active" : undefined} style={{ height }} key={`${height}-${index}`} />)}</span>
      <span className="hero-player-time">LOCAL PREVIEW</span>
      <button className="hero-player-mini" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause SHEF preview" : "Play SHEF preview"}>{isPlaying ? <Pause size={17} weight="fill" /> : <Waveform size={17} weight="bold" />}</button>
    </div>
  );
}
