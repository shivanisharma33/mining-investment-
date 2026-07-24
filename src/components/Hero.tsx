"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative flex-grow flex items-center justify-center overflow-hidden min-h-screen pt-24 pb-12">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/fwdboardmemberphotos/Mining%20investment%20video%20.mov" type="video/quicktime" />
          <source src="/fwdboardmemberphotos/Mining%20investment%20video%20.mov" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay for optimal text readability */}
      <div className="absolute inset-0 bg-black/45 bg-gradient-to-b from-black/55 via-black/40 to-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[1100px] w-full text-center flex flex-col items-center px-4 sm:px-6 md:px-12 pt-8 pb-8">
        {/* Top Subtitle */}
        <p className="text-white text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase mb-2 sm:mb-3 md:mb-4 leading-relaxed max-w-xs sm:max-w-none mx-auto text-center animate-fade-in-up delay-0">
          {t("hero-eyebrow", "Canada's Only Tier I Global Mining Investment Conference")}
        </p>

        {/* Main Title - 2 Lines in French */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-white tracking-wide uppercase leading-[1.18] mb-3 md:mb-4 text-center">
          {lang === "FR" ? (
            <div className="flex flex-col items-center text-center">
              <span className="block animate-text-reveal delay-1">L&apos;Événement</span>
              <span className="block mt-1 sm:mt-2 text-primary">
                <span className="animate-text-reveal delay-2">d&apos;Investissement</span>{" "}
                <span className="animate-text-reveal delay-3">Minier</span>
              </span>
            </div>
          ) : (
            <div className="flex flex-row justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 max-w-full whitespace-nowrap text-center">
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

        {/* Double-Button Group */}
        <div className="inline-flex flex-col sm:flex-row rounded-lg border border-white/20 overflow-hidden shadow-lg max-w-full animate-fade-in-up delay-7">
          {/* Left Button - Register Now */}
          <Link
            href="/register"
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
          </Link>

          {/* Right Button - View Program */}
          <Link
            href="/agenda"
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
          </Link>
        </div>
      </div>
    </section>
  );
}
