"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CanadaPremierForum() {
  const { lang, t } = useLanguage();

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
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
              {t("forum-title", "Canada's Premier Mining Forum")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

            <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed mb-6 max-w-[500px] font-medium">
              {lang === "fr" ? (
                t(
                  "forum-desc",
                  "THE Mining Investment Event est un rassemblement sur invitation uniquement qui réunit les sociétés minières, les investisseurs, les institutions et les autorités gouvernementales les plus influents au monde dans le cadre historique de la ville de Québec."
                )
              ) : (
                <>
                  THE Mining Investment Event is an invitation-only gathering that brings together the world's most influential mining companies, investors, institutions and government authorities{" "}
                  in the historic setting of<br className="hidden sm:inline" /> Québec City.
                </>
              )}
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
                </div>
              ))}
            </div>

            {/* Dual Connected Pill Action Buttons */}
            <div className="inline-flex items-center border border-neutral-300 rounded-lg overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
              <Link
                href="/about"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 uppercase transition-colors"
              >
                {t("forum-about-btn", "ABOUT THE EVENT")}
              </Link>
              <Link
                href="/register"
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
              </Link>
            </div>
          </div>

          {/* Right Column: Adorable Multi-Layered Image Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end py-6 pr-2 sm:pr-6">
            {/* Top-Right Floating Glassmorphism Badge */}
            <div className="absolute -top-3 right-2 sm:top-0 sm:right-6 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-200 shadow-md flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6112F] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black text-[#1a1f2c] tracking-wider uppercase">
                QUÉBEC CITY • CANADA
              </span>
            </div>

            {/* Background Soft Red Glow Ambient Circle */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#C6112F]/10 rounded-full blur-3xl pointer-events-none z-0" />

            {/* Primary Hero Image Card */}
            <div className="relative z-10 rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.08)] w-full max-w-[460px] aspect-[4/3] bg-neutral-900 group">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
                alt="Conference delegates networking"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Image Tag */}
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase bg-[#C6112F] px-3 py-1 rounded-full">
                  TIER 1 GLOBAL FORUM
                </span>
              </div>
            </div>

            {/* Overlapping Accent Card with Clean White Frame */}
            <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-2 z-20 w-[46%] sm:w-[48%] rounded-2xl overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(0,0,0,0.14)] aspect-[4/3] bg-white group/small hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
                alt="Student delegates group"
                className="w-full h-full object-cover group-hover/small:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
