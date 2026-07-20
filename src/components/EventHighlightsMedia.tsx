"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function EventHighlightsMedia() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#f8fafc] py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header and Media Stats Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          {/* Left Column: Text Header */}
          <div className="flex flex-col items-start text-left max-w-[480px]">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("highlights-tag", "MEDIA & HIGHLIGHTS")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#1a1f2c] tracking-tight mb-2">
              {t("highlights-title", "Event Highlights")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-3" />
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium">
              {t("highlights-desc", "Three days in Québec City — plenary sessions, privately arranged meetings and the evening programme, captured as they happened.")}
            </p>
          </div>

          {/* Right Column: 3 Media Stat Metrics */}
          <div className="flex items-center gap-6 sm:gap-10 md:gap-14 pt-2 lg:pt-0">
            {/* Stat 1: 500+ PHOTOS */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0 shadow-2xs">
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
                <span className="text-[#C6112F] font-bold text-[10px] sm:text-xs tracking-wider uppercase mt-1">
                  {t("stat-photos", "PHOTOS")}
                </span>
              </div>
            </div>

            {/* Stat 2: 50+ SPEAKERS */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0 shadow-2xs">
                <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                  50+
                </span>
                <span className="text-[#C6112F] font-bold text-[10px] sm:text-xs tracking-wider uppercase mt-1">
                  {t("nav-speakers", "SPEAKERS")}
                </span>
              </div>
            </div>

            {/* Stat 3: 100+ PRESS */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0 shadow-2xs">
                <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                  100+
                </span>
                <span className="text-[#C6112F] font-bold text-[10px] sm:text-xs tracking-wider uppercase mt-1">
                  {t("stat-press", "PRESS")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Grid Media Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Keynote Presentations */}
          <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
                alt="Keynote Presentations"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#C6112F] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {t("media-badge-speeches", "KEYNOTE SPEECHES")}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#1a1f2c] mb-2 leading-snug">
                  {t("media-title-1", "Plenary Keynotes & Strategic Insights")}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-medium mb-4">
                  {t("media-desc-1", "Watch executive keynotes from global mining leaders presenting capital strategies.")}
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider"
              >
                <span>{t("media-watch", "WATCH REPLAYS")}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 2: Executive Interviews */}
          <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                alt="Executive Interviews"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#C6112F] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {t("media-badge-interviews", "INTERVIEWS")}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#1a1f2c] mb-2 leading-snug">
                  {t("media-title-2", "C-Suite & Investor Interviews")}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-medium mb-4">
                  {t("media-desc-2", "Exclusive 1-on-1 interviews with CEOs, exploration managers, and institutional funds.")}
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider"
              >
                <span>{t("media-watch", "WATCH INTERVIEWS")}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3: Photo Gallery */}
          <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-2xs hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
                alt="Photo Gallery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#C6112F] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {t("nav-gallery", "GALLERY")}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#1a1f2c] mb-2 leading-snug">
                  {t("media-title-3", "High-Resolution Photo Gallery")}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-medium mb-4">
                  {t("media-desc-3", "Explore official photography capturing networking receptions, lounge sessions, and speeches.")}
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider"
              >
                <span>{t("media-view-gallery", "VIEW GALLERY")}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
