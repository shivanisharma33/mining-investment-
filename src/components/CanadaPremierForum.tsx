"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CanadaPremierForum() {
  const { t } = useLanguage();

  const bullets = [
    t("forum-bullet-1", "Privately arranged 1-on-1 meetings between mining companies and international investors"),
    t("forum-bullet-2", "Keynote speakers and industry thought leaders from across the globe"),
    t("forum-bullet-3", "Promoting sustainability via the Student Sponsorship and SHE-Co initiatives"),
    t("forum-bullet-4", "Platform for ESG innovation and equality in the mining sector"),
    t("forum-bullet-5", "Accredited investors, family offices, institutions and sovereign funds"),
  ];

  return (
    <section className="relative bg-[#f4f7fa] py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Stack, Pink Callout & Bullets */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("forum-tag", "THE CONFERENCE")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#1a1f2c] leading-[1.2] mb-3">
              {t("forum-title", "Canada's Premier Mining Forum")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

            <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed mb-6 max-w-[500px] font-medium">
              {t("forum-desc", "THE Mining Investment Event is an invitation-only gathering that brings together the world's most influential mining companies, investors, institutions and government authorities in the historic setting of Québec City.")}
            </p>

            {/* Pink Tint Highlight Callout Box */}
            <div className="bg-[#f6e5e8] border-l-4 border-[#C6112F] p-4 rounded-r-lg mb-7 w-full max-w-[500px]">
              <p className="text-[#a80d26] text-xs sm:text-[13px] font-bold leading-relaxed">
                {t("forum-highlight", "Independently sponsored by the Government of Québec and the financial and mining communities at large.")}
              </p>
            </div>

            {/* 5 Bullet Points List */}
            <div className="w-full max-w-[500px] space-y-2.5 mb-8">
              {bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-neutral-300/60 pb-2 text-xs sm:text-[13px] text-neutral-700 font-medium"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#C6112F] text-[9px] mt-1 shrink-0">◆</span>
                    <span>{bullet}</span>
                  </div>
                  {idx === 1 && (
                    <span className="w-2 h-2 rounded-full bg-[#C6112F] shrink-0 ml-2" />
                  )}
                </div>
              ))}
            </div>

            {/* Connected Dual Pill Action Buttons */}
            <div className="inline-flex items-center border border-neutral-400 rounded-lg overflow-hidden shadow-sm">
              <a
                href="#"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 uppercase transition-colors"
              >
                {t("forum-about-btn", "ABOUT THE EVENT")}
              </a>
              <a
                href="#"
                className="bg-[#dedede] hover:bg-[#d0d0d0] text-neutral-900 text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 uppercase flex items-center gap-2 border-l border-neutral-400 transition-colors"
              >
                <span>{t("nav-register", "REGISTER NOW")}</span>
                <svg
                  className="w-5 h-5 text-neutral-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 8.5L14 12L10.5 15.5M14 12H8.5"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Stacked Images with Red Perimeter Borders */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end pl-4 sm:pl-8 py-6">
            {/* Red Accent Frame Box Behind Bottom Left */}
            <div className="absolute left-0 sm:left-2 bottom-0 w-36 sm:w-44 h-36 sm:h-44 border-[2px] border-[#C6112F] rounded-2xl z-0 pointer-events-none" />

            {/* Main Reception Attendees Image Card */}
            <div className="relative z-10 rounded-2xl overflow-hidden border-[3px] border-[#C6112F] shadow-[0_15px_35px_rgba(0,0,0,0.15)] w-full max-w-[500px] aspect-[4/3] bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
                alt="Conference delegates networking"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Small Student Delegates Image Card */}
            <div className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-[44%] sm:w-[48%] rounded-xl overflow-hidden border-[3px] border-[#C6112F] shadow-[0_15px_30px_rgba(0,0,0,0.25)] aspect-[4/3] bg-white">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
                alt="Student delegates group"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
