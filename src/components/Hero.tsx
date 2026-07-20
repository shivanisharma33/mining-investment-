"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative flex-grow flex items-center justify-center overflow-hidden min-h-screen pt-24 pb-12">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />
      {/* Background Image */}
      <img
        src="/Mining Investment Post 2.avif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] w-full text-center flex flex-col items-center px-4 sm:px-6 md:px-12 pt-8 pb-8">
        {/* Top Subtitle */}
        <p className="text-primary text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-xs sm:max-w-none mx-auto animate-fade-in-up delay-0">
          {t("hero-eyebrow", "Canada's Only Tier I Global Mining Investment Conference")}
        </p>

        {/* Main Title - 2 Lines in French */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-white tracking-wide uppercase leading-[1.18] mb-6 md:mb-8 drop-shadow-lg text-center">
          {lang === "FR" ? (
            <div className="flex flex-col items-center">
              <span className="block animate-text-reveal delay-1">L&apos;Événement</span>
              <span className="block mt-1 sm:mt-2 text-primary drop-shadow-md">
                <span className="animate-text-reveal delay-2">d&apos;Investissement</span>{" "}
                <span className="animate-text-reveal delay-3">Minier</span>
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 max-w-full">
              <span className="animate-text-reveal delay-1">The</span>{" "}
              <span className="animate-text-reveal delay-2">Mining</span>{" "}
              <span className="animate-text-reveal delay-3">Investment</span>{" "}
              <span className="animate-text-reveal delay-4">Event</span>
            </div>
          )}
        </h1>

        {/* Subheading / Description */}
        <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg max-w-[720px] mx-auto font-normal leading-relaxed mb-10 md:mb-12 animate-fade-in-up delay-5">
          {t("hero-subtitle", "Meet investors, discover projects, secure partnerships and shape the future of mining.")}
        </p>

        {/* Double-Button Group */}
        <div className="inline-flex flex-col sm:flex-row rounded-lg border border-white/20 overflow-hidden shadow-lg max-w-full animate-fade-in-up delay-7">
          {/* Left Button - Register Now */}
          <a
            href="#"
            className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-extrabold tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center gap-2.5 transition-all duration-300 border-b sm:border-b-0 sm:border-r border-white/20 shrink-0"
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
          </a>

          {/* Right Button - View Program */}
          <a
            href="#"
            className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-extrabold tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center gap-2.5 transition-all duration-300 shrink-0 backdrop-blur-sm"
          >
            <span>{t("hero-program", "VIEW PROGRAM")}</span>
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
          </a>
        </div>
      </div>
    </section>
  );
}
