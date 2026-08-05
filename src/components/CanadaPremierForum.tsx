"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function CanadaPremierForum() {
  const { lang, t } = useLanguage();
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const bullets = [
    t("forum-bullet-1", "Privately arranged 1-on-1 meetings between mining companies and international investors"),
    t("forum-bullet-2", "Keynote speakers and industry thought leaders from across the globe"),
    t("forum-bullet-3", "Promoting sustainability via the Student Sponsorship and SHE-Co initiatives"),
    t("forum-bullet-4", "Platform for ESG innovation and equality in the mining sector"),
    t("forum-bullet-5", "Accredited investors, family offices, institutions and sovereign funds"),
  ];

  return (
    <section className="relative bg-[#f4f7fa] dark:bg-[#090d16] py-16 sm:py-20 md:py-24 overflow-hidden transition-colors duration-300">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Stack, Pink Callout & Bullets */}
          <div className="lg:col-span-6 flex flex-col items-start text-left group">
            <span className="heading-badge text-xs sm:text-sm font-extrabold uppercase mb-2 block transition-all duration-300 group-hover:tracking-[0.32em]">
              {t("forum-tag", "THE CONFERENCE")}
            </span>
            <AnimatedHeading
              text={t("forum-title", "Canada's Premier Mining Forum")}
              className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3"
            />
            <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mb-6" />

            <p className="text-neutral-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-[500px] font-medium">
              {lang === "FR" ? (
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
            <div className="bg-[#f6e5e8] dark:bg-[#1e1416] border-l-4 border-[#C6112F] p-4 rounded-r-lg mb-7 w-full max-w-[500px]">
              <p className="text-[#a80d26] dark:text-[#C6112F] text-xs sm:text-[13px] font-bold leading-relaxed">
                {t("forum-highlight", "Independently sponsored by the Government of Québec and the financial and mining communities at large.")}
              </p>
            </div>

            {/* 5 Bullet Points List */}
            <div className="w-full max-w-[500px] space-y-2.5 mb-8">
              {bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-neutral-300/60 dark:border-slate-800 pb-2 text-xs sm:text-[13px] text-neutral-700 dark:text-slate-300 font-medium"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#C6112F] text-[9px] mt-1 shrink-0">◆</span>
                    <span>{bullet}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dual Connected Pill Action Buttons */}
            <div className="flex flex-col sm:inline-flex sm:flex-row w-full sm:w-auto items-stretch sm:items-center rounded-xl overflow-hidden shadow-md transition-shadow">
              <Link
                href="/about"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 uppercase transition-colors text-center shrink-0"
              >
                {t("forum-about-btn", "ABOUT THE EVENT")}
              </Link>
              <Link
                href="/register"
                className="bg-[#e2e8f0] dark:bg-slate-800 hover:bg-[#cbd5e1] dark:hover:bg-slate-700 text-neutral-900 dark:text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 uppercase flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <span>{t("nav-register", "REGISTER HERE")}</span>
                <svg
                  className="w-5 h-5 text-neutral-900 dark:text-white shrink-0"
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

          {/* Right Column: Single High-Impact Hero Image with Interactive 3D Perspective Tilt (No Overlapping Images) */}
          <div className="lg:col-span-6 relative py-6 px-2 sm:px-6 flex justify-center [perspective:1200px]">
            {/* Ambient Background Glow Orbs */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-tr from-[#C6112F]/20 via-red-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-gradient-to-bl from-amber-500/15 via-[#C6112F]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Interactive 3D Parallax Stage */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 w-full max-w-[480px] my-4 transition-transform duration-200 ease-out cursor-pointer group/stage py-4"
            >
              {/* Main Hero Photo Card (3D Layer 1, translateZ: 20px) */}
              <div
                style={{ transform: "translateZ(20px)" }}
                className="relative rounded-[26px] overflow-hidden border-[3px] border-[#C6112F] shadow-[0_25px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_rgba(198,17,47,0.3)] bg-neutral-900 group/img aspect-[4/3] transition-all duration-500"
              >
                <img
                  src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-4.jpg"
                  alt="Conference delegates networking at Mining Investment Event"
                  className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />

                {/* Dark Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Live Ribbon Badge on Top-Right */}
                <div className="absolute top-4 right-4 bg-[#C6112F] text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>TIER I GLOBAL FORUM</span>
                </div>

                {/* Caption at Bottom of Main Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 mb-1 text-[#ff4d6d] font-extrabold text-[11px] uppercase tracking-wider">
                    <i className="fi fi-rr-marker text-xs" /> QUÉBEC CITY • CANADA
                  </div>
                  <h4 className="text-white font-extrabold text-xs sm:text-sm leading-snug drop-shadow-md">
                    Canada's Premier Global Mining Forum
                  </h4>
                </div>
              </div>

              {/* Glassmorphic Floating Stat Badge 1 (Top-Left, translateZ: 60px) */}
              <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute -top-4 -left-2 sm:-left-6 z-30 bg-white/95 dark:bg-[#0e1626]/95 backdrop-blur-md border border-neutral-200/80 dark:border-[#C6112F]/50 px-3.5 sm:px-4 py-2 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-transform duration-300 group-hover/stage:scale-105"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C6112F] to-[#8a091e] text-white flex items-center justify-center text-sm shadow-md shrink-0">
                  <i className="fi fi-rr-lock leading-none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-extrabold">EXCLUSIVE</span>
                  <span className="text-xs font-black text-neutral-900 dark:text-white">By Invitation Only</span>
                </div>
              </div>

              {/* Glassmorphic Floating Stat Badge 2 (Bottom-Right, translateZ: 60px) */}
              <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute -bottom-4 -right-2 sm:-right-6 z-30 bg-white/95 dark:bg-[#0e1626]/95 backdrop-blur-md border border-neutral-200/80 dark:border-[#C6112F]/50 px-3.5 sm:px-4 py-2 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-transform duration-300 group-hover/stage:scale-105"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-sm shadow-md shrink-0">
                  <i className="fi fi-rr-handshake leading-none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-extrabold">NETWORKING</span>
                  <span className="text-xs font-black text-neutral-900 dark:text-white">1-on-1 Meetings</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
