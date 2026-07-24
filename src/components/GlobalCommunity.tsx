"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function GlobalCommunity() {
  const { t } = useLanguage();

  const communityStats = [
    {
      icon: (
        <svg className="w-9 h-9 text-neutral-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4" />
        </svg>
      ),
      number: "100+",
      label: t("stat-mining-label", "MINING COMPANIES"),
    },
    {
      icon: (
        <svg className="w-9 h-9 text-neutral-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      number: "800+",
      label: t("stat-participants", "PARTICIPANTS"),
    },
    {
      icon: (
        <svg className="w-9 h-9 text-neutral-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-5.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
        </svg>
      ),
      number: "50+",
      label: t("stat-student-sponsors", "STUDENTS SPONSORS"),
    },
    {
      icon: (
        <svg className="w-9 h-9 text-neutral-800 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      number: "3 " + t("timer-days", "Days"),
      label: t("stat-program-label", "PROGRAM"),
    },
  ];

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Section: Text Stack & Red Dotted World Map Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Title & Action Button */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("map-tag", "GLOBAL PRESENCE")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
              {t("map-title", "Where the World's Mining Converges")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

            <p className="text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed mb-6 max-w-[420px]">
              {t("map-desc", "Explore the international network of companies, investors, and delegations gathering in Québec City.")}
            </p>

            <Link
              href="/companies"
              className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider uppercase px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all inline-block"
            >
              {t("map-cta", "VIEW GLOBAL PARTICIPATION")}
            </Link>
          </div>

          {/* Right Column: 3D Dotted Red World Map Graphic Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[580px] aspect-[2.2/1] flex items-center justify-center overflow-hidden">
              <img
                src="/image%2015%20(2).avif"
                alt="Global Mining Community World Map"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: 4 Red-Bordered Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {communityStats.map((stat, i) => (
            <div
              key={i}
              className="border border-[#C6112F]/60 rounded-2xl p-5 sm:p-6 bg-white shadow-2xs flex items-center gap-4 hover:border-[#C6112F] transition-all duration-300"
            >
              {stat.icon}
              <div className="flex flex-col text-left leading-none">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none mb-1">
                  {stat.number}
                </span>
                <span className="text-[#C6112F] font-bold text-[10px] sm:text-xs tracking-wider uppercase leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
