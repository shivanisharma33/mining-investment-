"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Eagerly attempt playback as soon as enough data is buffered
    const tryPlay = () => {
      video.play().catch(() => {
        /* autoplay may be blocked; the autoPlay attr will retry */
      });
    };

    // Fire play on first frame ready
    video.addEventListener("canplay", tryPlay, { once: true });

    // If the video is already ready (cached), play immediately
    if (video.readyState >= 3) {
      tryPlay();
    }

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section className="relative flex-grow flex items-center justify-center overflow-hidden min-h-[80vh] md:min-h-[84vh] max-h-[800px] pt-24 pb-20 sm:pb-24">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/fwdboardmemberphotos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Base Overlay for optimal text readability */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/50 via-black/35 to-black/50 z-10" />

      {/* Centered Crimson Red Radial Spotlight Overlay - Very Soft & Subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,17,47,0.16)_0%,rgba(198,17,47,0.05)_45%,transparent_70%)] z-10 pointer-events-none mix-blend-screen" />

      {/* Content */}
      <div className="relative z-20 max-w-[1100px] w-full text-center flex flex-col items-center px-4 sm:px-6 md:px-12 pt-8 pb-8">
        {/* Top Subtitle Eyebrow */}
        <p className="text-white text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 leading-relaxed max-w-xs sm:max-w-none mx-auto text-center animate-fade-in-up delay-0">
          {t("hero-eyebrow", "Canada's Only Tier I Global Mining Investment Conference")}
        </p>

        {/* Date & Location Badges - Exact Image Match */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-in-up delay-1">
          {/* Date Badge */}
          <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-lg bg-black/75 backdrop-blur-md border border-neutral-600/80 shadow-md">
            <svg className="w-5 h-5 text-[#ff3b5c] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase font-sans">
              JUNE 1 – 3, 2027
            </span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-lg bg-black/75 backdrop-blur-md border border-neutral-600/80 shadow-md">
            <svg className="w-5 h-5 text-[#ff3b5c] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase font-sans">
              QUÉBEC CITY, CANADA
            </span>
          </div>
        </div>

        {/* Main Title - 2 Lines in French */}
        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-white tracking-wide uppercase leading-[1.18] mb-3 md:mb-4 text-center">
          {lang === "FR" ? (
            <div className="flex flex-col items-center text-center">
              <span className="block animate-text-reveal delay-1">L&apos;Événement</span>
              <span className="block mt-1 sm:mt-2 text-primary">
                <span className="animate-text-reveal delay-2">d&apos;Investissement</span>{" "}
                <span className="animate-text-reveal delay-3">Minier</span>
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-x-1.5 xs:gap-x-2 sm:gap-x-3 md:gap-x-4 max-w-full text-center sm:whitespace-nowrap">
              <span className="animate-text-reveal delay-1">The</span>{" "}
              <span className="animate-text-reveal delay-2">Mining</span>{" "}
              <span className="animate-text-reveal delay-3">Investment</span>{" "}
              <span className="animate-text-reveal delay-4">Event</span>
            </div>
          )}
        </h1>

        {/* Subheading / Description */}
        <p className="text-white/95 text-xs sm:text-sm md:text-base lg:text-lg max-w-[740px] mx-auto text-center font-normal leading-relaxed mb-6 md:mb-8 animate-fade-in-up delay-5">
          {lang === "FR" ? (
            t("hero-subtitle", "Rencontrer des investisseurs, découvrir des projets, sécuriser des partenariats et façonner l'avenir minier.")
          ) : (
            <>
              Meet investors, discover projects, secure partnerships
              <br className="hidden sm:inline" /> and shape the future of mining.
            </>
          )}
        </p>

        {/* Hero Action Buttons Group */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto max-w-full animate-fade-in-up delay-7">
          {/* Register Now */}
          <Link
            href="/register"
            className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-extrabold tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 border border-white/20 shadow-lg shadow-primary/30 hover:scale-105 shrink-0"
          >
            <span>{t("hero-register", "REGISTER NOW")}</span>
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 12H8m6 0l-3-3m3 3l-3 3"
              />
            </svg>
          </Link>


          {/* Agenda */}
          <Link
            href="/agenda"
            className="bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-extrabold tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-white/25 hover:border-white/50 backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md shrink-0"
          >
            <span>{lang === "FR" ? "ORDRE DU JOUR" : "AGENDA"}</span>
            <svg
              className="w-4 h-4 text-[#ff4d6d] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </Link>

          {/* Brochure */}
          <Link
            href="/brochure"
            className="bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-extrabold tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-white/25 hover:border-white/50 backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md shrink-0"
          >
            <span>{lang === "FR" ? "BROCHURE" : "BROCHURE"}</span>
            <svg
              className="w-4 h-4 text-[#ff4d6d] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </Link>

          {/* Participating Companies */}
          <Link
            href="/companies-2027"
            className="bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-extrabold tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-white/25 hover:border-white/50 backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md shrink-0"
          >
            <span>
              {lang === "FR"
                ? "SOCIÉTÉS PARTICIPANTES"
                : "PARTICIPATING COMPANIES"}
            </span>
            <svg
              className="w-4 h-4 text-[#ff4d6d] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Interactive & Engaging Scroll Down Indicator */}
      <button
        type="button"
        onClick={() => {
          const target = document.getElementById("home-content");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollBy({ top: window.innerHeight * 0.75, behavior: "smooth" });
          }
        }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group select-none transition-transform duration-300 hover:-translate-y-1 focus:outline-none"
        aria-label="Scroll down"
      >
        {/* Futuristic Mouse Scroll Capsule with Cascading Chevrons */}
        <div className="relative flex flex-col items-center">
          {/* Mouse capsule */}
          <div className="w-5 h-8 sm:w-5.5 sm:h-9 rounded-full border-[1.8px] border-white/70 group-hover:border-[#C6112F] bg-black/45 backdrop-blur-xs flex items-start justify-center pt-1.5 transition-all duration-300 shadow-md group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(198,17,47,0.5)]">
            <div className="w-1 h-2 rounded-full bg-[#C6112F] animate-scroll-wheel shadow-[0_0_10px_#C6112F]" />
          </div>

          {/* Cascading Double Chevrons */}
          <div className="flex flex-col items-center mt-0.5 pointer-events-none">
            <svg
              className="w-3.5 h-3.5 text-white/90 group-hover:text-[#C6112F] animate-chevron-1 transition-colors -mb-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <svg
              className="w-3.5 h-3.5 text-white/50 group-hover:text-[#C6112F]/80 animate-chevron-2 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </button>
    </section>
  );
}
