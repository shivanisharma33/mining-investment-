"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import CompaniesView from "@/components/CompaniesView";
import { useLanguage } from "@/context/LanguageContext";

export default function CompaniesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white">
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/20 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">Participating Companies</span>
            </div>
            <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase block mb-3">
              DIRECTORY & CONFIRMED PARTICIPANTS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
              Participating <span className="text-[#C6112F]">Companies</span>
            </h1>
            <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
          </div>
        </section>

        {/* ═══════ COMPANIES TABLE SECTION ═══════ */}
        <section className="relative w-full py-14 sm:py-18 md:py-22">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              CONFIRMED DELEGATIONS & EXHIBITORS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              Confirmed for THE Event
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[720px] mb-10">
              Producers, developers, and explorers connecting with global capital across four days in Quebec City. Check back for daily updates.
            </p>

            {/* Render Table Component */}
            <CompaniesView initialYear={2026} />
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
