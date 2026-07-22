"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import AgendaView from "@/components/AgendaView";
import AgendaPdfViewer from "@/components/AgendaPdfViewer";
import { useLanguage } from "@/context/LanguageContext";

export default function AgendaPage() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<"pdf" | "interactive">("pdf");

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
              <span className="text-neutral-400">{t("nav-past-years", "Past Edition")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">Agenda</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase block mb-3">
                  JUNE 1 - 4, 2026 &bull; QUEBEC CITY
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
                  THE <span className="text-[#C6112F]">Agenda</span>
                </h1>
                <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
              </div>
              <div className="shrink-0">
                <a
                  href="/documents/2026-agenda.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#A30E26] text-white text-xs font-extrabold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#C6112F]/25 hover:scale-105"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Official PDF Agenda</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ AGENDA VIEW CONTENT ═══════ */}
        <section className="relative w-full py-14 sm:py-18 md:py-22">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                  SCHEDULE & SESSION DETAILS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
                  Event Agenda & Schedule
                </h2>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center bg-neutral-100 p-1.5 rounded-xl border border-neutral-200 gap-1">
                <button
                  onClick={() => setViewMode("pdf")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "pdf"
                      ? "bg-[#0f1117] text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>PDF Viewer</span>
                </button>
                <button
                  onClick={() => setViewMode("interactive")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "interactive"
                      ? "bg-[#0f1117] text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Interactive Schedule</span>
                </button>
              </div>
            </div>

            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[720px] mb-10">
              Four days of keynotes, corporate presentations, panels, and networking bringing together producers, developers, and explorers from across the global mining industry.
            </p>

            {/* Display Mode Content */}
            {viewMode === "pdf" ? (
              <AgendaPdfViewer year={2026} pdfUrl="/documents/2026-agenda.pdf" />
            ) : (
              <AgendaView year={2026} />
            )}
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
