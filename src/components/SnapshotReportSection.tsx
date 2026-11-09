"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SnapshotReportSection() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto transition-colors duration-300">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c0f17] via-[#151b28] to-[#0c0f17] text-white p-8 sm:p-12 md:p-14 border border-neutral-800 shadow-2xl">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6112F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C6112F]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Information */}
          <div className="max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#ff6b81] uppercase">
                {isFr ? "PUBLICATION OFFICIELLE DE L'ÉVÉNEMENT" : "OFFICIAL EVENT PUBLICATION"}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              THE Snapshot Report
            </h2>

            {/* Accent divider */}
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-5" />

            {/* Description */}
            <p className="text-neutral-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-4">
              {isFr
                ? "Produit par Atrium, le Rapport SnapShot met en lumière les entreprises participantes pour les commanditaires et les investisseurs présents."
                : "Produced by Atrium, THE Snapshot Report highlights participating companies for the sponsors and investors attending."}
            </p>

            <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              {isFr
                ? "Lisez le rapport numérique officiel FlippingBook présentant des entrevues de dirigeants, les faits saillants de la conférence, des galeries photos et des statistiques du marché."
                : "Read the official FlippingBook digital report featuring executive interviews, conference highlights, photo galleries and market statistics."}
            </p>
          </div>

          {/* Right Column: Interactive CTA Button & Book Badge */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
            <a
              href="https://online.flippingbook.com/view/213558062/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#C6112F]/30 hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>{isFr ? "Lire le Rapport SnapShot" : "Read Snapshot Report"}</span>
              <span className="text-base leading-none group-hover:translate-x-1 transition-transform duration-300">
                ↗
              </span>
            </a>

            <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span>{isFr ? "Édition Numérique FlippingBook" : "FlippingBook Digital Edition"}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

