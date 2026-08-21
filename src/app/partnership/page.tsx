"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PartnershipPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white">
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/15 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-programs", "Programs")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("tier1-breadcrumb", "THE Tier 1 Conference Partnership")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("tier1-h1-1", "THE Tier 1 Conference")} <span className="text-[#C6112F]">{t("tier1-h1-2", "Partnership")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mt-6" />
          </div>
        </section>

        {/* ═══════ PARTNERSHIP OVERVIEW & SIDEBAR ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Main Content */}
              <div className="lg:col-span-7">
                <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                  {t("nav-partnership", "PARTNERSHIP")}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1f2c] tracking-tight mb-4 leading-tight">
                  {t("tier1-title-1", "Align Your Brand with")} <span className="text-[#C6112F]">{t("tier1-title-2", "Canada's Premier")}</span> {t("tier1-title-3", "Mining Conference")}
                </h2>
                <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
                  {t(
                    "tier1-sub-desc",
                    "Becoming a Tier 1 Conference Partner provides unrivalled access to decision\u00A0makers, investors, and policy\u00A0makers across the global mining industry. Our partnerships are tailored to maximize visibility and engagement throughout THE Event."
                  )}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:jchoi@irinc.ca?subject=Tier 1 Partnership Inquiry"
                    className="px-6 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-bold tracking-[0.15em] uppercase shadow-lg shadow-[#C6112F]/20 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    {t("tier1-cta-contact", "Contact Jenny Choi")}
                  </a>
                </div>
              </div>

              {/* Right Contact Sidebar Box */}
              <div className="lg:col-span-5">
                <div className="bg-[#0f1117] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white bg-[#C6112F] px-3.5 py-1 rounded-full inline-block mb-4 shadow-sm border border-rose-400/30">
                    {t("tier1-sidebar-tag", "SPONSORSHIP INQUIRY")}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-3">{t("tier1-sidebar-title", "Contact For Sponsorship")}</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-light mb-6">
                    {t("tier1-sidebar-body", "Contact for partnership/sponsorship Jenny Choi:")}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-neutral-800">
                    <a
                      href="mailto:jchoi@irinc.ca"
                      className="group flex items-center gap-3.5 text-white hover:text-rose-300 transition-colors text-sm font-bold"
                    >
                      <span className="w-10 h-10 rounded-xl bg-[#C6112F] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span className="text-white text-base">jchoi@irinc.ca</span>
                    </a>
                    <a
                      href="tel:+19055153508"
                      className="group flex items-center gap-3.5 text-white hover:text-rose-300 transition-colors text-sm font-bold"
                    >
                      <span className="w-10 h-10 rounded-xl bg-[#C6112F] text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <span className="text-white text-base">+1-905-515-3508</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
