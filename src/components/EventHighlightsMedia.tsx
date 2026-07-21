"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function EventHighlightsMedia() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#f4f7fa] py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Section: Header & Media Stats Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          {/* Left Column: Text Header */}
          <div className="flex flex-col items-start text-left max-w-[520px]">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("highlights-tag", "MEDIA")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-2">
              {t("highlights-title", "Event Highlights")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-3" />
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium">
              {t(
                "highlights-desc",
                "Three days in Québec City — plenary sessions, privately arranged meetings and the evening programme, captured as they happened."
              )}
            </p>
          </div>

          {/* Right Column: 3 Media Stat Metrics matching reference screenshot */}
          <div className="flex items-center gap-6 sm:gap-10 md:gap-14 pt-2 lg:pt-0 shrink-0">
            {/* Stat 1: 500+ PHOTOS */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0 shadow-2xs">
                <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                  500+
                </span>
                <span className="text-[#C6112F] font-extrabold text-[10px] sm:text-xs tracking-wider uppercase mt-1">
                  {t("stat-photos", "PHOTOS")}
                </span>
              </div>
            </div>

            {/* Stat 2: 50+ SPEAKERS */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0 shadow-2xs">
                <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                  50+
                </span>
                <span className="text-[#C6112F] font-extrabold text-[10px] sm:text-xs tracking-wider uppercase mt-1">
                  {t("nav-speakers", "SPEAKERS")}
                </span>
              </div>
            </div>

            {/* Stat 3: 3 DAYS OF EVENTS */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0 shadow-2xs">
                <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                  3
                </span>
                <span className="text-[#C6112F] font-extrabold text-[10px] sm:text-xs tracking-wider uppercase mt-1">
                  {t("stat-days-events", "DAYS OF EVENTS")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Asymmetric Photo Masonry Grid matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Column 1 (Left Side) */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Top Item: Tall Vertical Executive Photo */}
            <div className="group relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
              <img
                src="./image 31.avif"
                alt="Executive delegates networking reception"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Row: 2 Small Photos */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="group relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Student delegates collaborating"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="group relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
                <img
                  src="./image 26 copy.avif"
                  alt="Delegates group at evening reception"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Wide Banner: Close-up Microphone */}
            <div className="group relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80"
                alt="Stage microphone close-up"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Column 2 (Right Side) */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Top Row: 2 Small Photos */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="group relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Student delegates collaborating"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="group relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
                <img
                src="./image 26 copy.avif"
                   alt="Delegates group at evening reception"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Middle Wide Banner: Close-up Microphone */}
            <div className="group relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80"
                alt="Stage microphone close-up"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Item: Tall Vertical Executive Photo */}
            <div className="group relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-xs hover:shadow-md transition-all">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                alt="Executive delegates networking reception"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
