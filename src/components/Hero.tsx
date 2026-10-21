"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as unknown as { webkitExitFullscreen?: () => void }).webkitExitFullscreen) {
        (document as unknown as { webkitExitFullscreen: () => void }).webkitExitFullscreen();
      }
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleNativeFullscreen = useCallback(() => {
    const elem = modalContainerRef.current || modalVideoRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      } else if ((elem as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
        (elem as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

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

  // Sync playback time, start playing, and auto-request fullscreen when modal opens
  useEffect(() => {
    if (!isVideoModalOpen) return;

    // Use requestAnimationFrame to ensure the modal DOM has mounted
    requestAnimationFrame(() => {
      const video = modalVideoRef.current;
      if (video && videoRef.current) {
        try {
          video.currentTime = videoRef.current.currentTime || 0;
        } catch {
          // ignore
        }
      }
      if (video) {
        video.play().catch(() => {});
      }

      // Auto-request native fullscreen on the container (needs user-gesture chain)
      const target = modalContainerRef.current;
      if (target) {
        if (target.requestFullscreen) {
          target.requestFullscreen().catch(() => {});
        } else if ((target as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
          (target as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
        }
      }
    });
  }, [isVideoModalOpen]);

  // Pause hero background video when modal is open, resume when closed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoModalOpen) {
      video.pause();
      document.body.style.overflow = "hidden";
    } else {
      video.play().catch(() => { });
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoModalOpen]);

  // Listen to native fullscreen changes (e.g. user presses Esc to exit native fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !(document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement) {
        if (isVideoModalOpen) {
          setIsVideoModalOpen(false);
          if (modalVideoRef.current) {
            modalVideoRef.current.pause();
          }
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [isVideoModalOpen]);

  // Handle escape key to close video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeVideoModal();
      }
    };
    if (isVideoModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoModalOpen, closeVideoModal]);

  return (
    <section className="relative flex-grow flex items-center justify-center overflow-hidden min-h-[85vh] md:min-h-[88vh] pt-24 pb-24 sm:pb-28">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />
      {/* Background Video (Clickable to open in full screen mode and in full colour) */}
      <div
        onClick={openVideoModal}
        className="absolute inset-0 w-full h-full bg-neutral-900 cursor-pointer group/bg"
        role="button"
        tabIndex={0}
        aria-label={lang === "FR" ? "Regarder la vidéo en plein écran" : "Watch video in full screen"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openVideoModal();
          }
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/bg:scale-[1.015]"
        >
          <source src="/fwdboardmemberphotos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Base Overlay for optimal text readability (Clickable to open video) */}
      <div
        onClick={openVideoModal}
        className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/50 via-black/35 to-black/50 z-10 cursor-pointer"
        aria-hidden="true"
      />

      {/* Centered Crimson Red Radial Spotlight Overlay - Very Soft & Subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,17,47,0.16)_0%,rgba(198,17,47,0.05)_45%,transparent_70%)] z-10 pointer-events-none mix-blend-screen" />

      {/* Content */}
      <div className="relative z-20 max-w-[1100px] w-full text-center flex flex-col items-center px-4 sm:px-6 md:px-12 pt-6 pb-6 pointer-events-none">
        {/* Main Title - The Mining Investment Event (Always stays in English) */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-white tracking-wide uppercase leading-[1.15] mb-3 md:mb-4 text-center">
          <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-x-1.5 xs:gap-x-2 sm:gap-x-3 md:gap-x-4 max-w-full text-center sm:whitespace-nowrap">
            <span className="animate-text-reveal delay-1">The</span>{" "}
            <span className="animate-text-reveal delay-2">Mining</span>{" "}
            <span className="animate-text-reveal delay-3">Investment</span>{" "}
            <span className="animate-text-reveal delay-4">Event</span>
          </div>
        </h1>

        {/* Tier 1 Global Mining Conference Tagline (Moved down below main title) */}
        <p className="text-white text-xs xs:text-sm sm:text-base md:text-lg font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase mb-2.5 sm:mb-3 leading-relaxed max-w-2xl mx-auto text-center animate-fade-in-up delay-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {t("hero-eyebrow", "Canada's Only Tier 1 Global Mining Investment Conference")}
        </p>

        {/* Date & Location in Regular Font */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-white/90 text-xs sm:text-sm md:text-base font-normal tracking-wide mb-6 sm:mb-8 animate-fade-in-up delay-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#ff3b5c] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{lang === "FR" ? "1 – 3 juin 2027" : "June 1 – 3, 2027"}</span>
          </span>
          <span className="text-white/40 font-light select-none hidden xs:inline">|</span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#ff3b5c] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{lang === "FR" ? "Ville de Québec, Canada" : "Québec City, Canada"}</span>
          </span>
        </div>

        {/* Hero Action Buttons */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-full animate-fade-in-up delay-5 pointer-events-auto">
          {/* Top Row: Agenda, Brochure, Participating Companies */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto max-w-full">
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

          {/* Bottom Row: Register Now (Positioned below the 3 buttons & a little bigger) */}
          <Link
            href="/register"
            className="bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-extrabold tracking-wider px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 border border-white/25 shadow-xl shadow-primary/35 hover:scale-105 hover:shadow-primary/50 shrink-0"
          >
            <span>{t("hero-register", "REGISTER NOW")}</span>
            <svg
              className="w-5 h-5 shrink-0"
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
        </div>
      </div>

      {/* Watch Full Video Button (Overlays bottom-right of hero video) */}
      <button
        type="button"
        onClick={openVideoModal}
        className="absolute bottom-5 sm:bottom-7 right-4 sm:right-8 z-30 inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/30 hover:border-white/60 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer group pointer-events-auto"
      >
        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-primary/40">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </span>
        <span>{lang === "FR" ? "Voir la vidéo" : "Watch Full Video"}</span>
      </button>

      {/* Full Screen Video — Only rendered when open */}
      {isVideoModalOpen && (
        <div
          ref={modalContainerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen event video"
          className="fixed inset-0 z-50 w-screen h-screen bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Full-Screen Video (Edge-to-Edge, Full Colour) */}
          <video
            ref={modalVideoRef}
            src="/fwdboardmemberphotos/hero-bg.mp4"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain bg-black"
          />

          {/* Floating Top Header Overlay */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6112F] animate-pulse" />
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-white drop-shadow-md">
                {lang === "FR" ? "Vidéo Officielle de l'Événement" : "Official Event Video"}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
              {/* Toggle Native Full Screen button */}
              <button
                type="button"
                onClick={toggleNativeFullscreen}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/25 hover:border-white/50 backdrop-blur-md hover:scale-105 shadow-lg"
                title={lang === "FR" ? "Plein écran" : "Toggle Full Screen"}
              >
                <svg className="w-4 h-4 text-[#ff4d6d]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                <span className="hidden xs:inline">{lang === "FR" ? "Plein Écran" : "Full Screen"}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeVideoModal}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/20 hover:scale-105 shadow-lg shadow-[#C6112F]/40"
                title={lang === "FR" ? "Fermer" : "Close"}
              >
                <span>{lang === "FR" ? "Fermer" : "Close"}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

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
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group select-none transition-transform duration-300 hover:-translate-y-1 focus:outline-none pointer-events-auto"
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
