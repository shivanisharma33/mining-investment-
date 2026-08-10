"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function EventByTheNumbers() {
  const { lang, t } = useLanguage();
  const isFr = lang === "FR";

  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(4); // Default to 2026
  const [activeLegend, setActiveLegend] = useState<{
    name: string;
    percent: string;
    color: string;
    desc: string;
  } | null>(null);

  const [flipDegree, setFlipDegree] = useState<number>(0);
  const [hasFlippedOnScroll, setHasFlippedOnScroll] = useState<boolean>(false);
  const donutRef = useRef<HTMLDivElement>(null);

  const legendItems = isFr
    ? [
        { name: "Family Offices", percent: "20%", color: "#C6112F", desc: "Partenaires en capital-investissement à long terme" },
        { name: "Investisseurs HNW", percent: "25%", color: "#6366f1", desc: "Investisseurs accrédités à valeur nette élevée" },
        { name: "Investisseurs Individuels", percent: "10%", color: "#06b6d4", desc: "Liquidité et acheteurs du marché public" },
        { name: "Fonds Ressources", percent: "25%", color: "#f59e0b", desc: "Fonds institutionnels miniers et de transition" },
        { name: "Acheteurs Buy-Side", percent: "20%", color: "#374151", desc: "Gestionnaires d'actifs et développement d'affaires" },
      ]
    : [
        { name: "Family Offices", percent: "20%", color: "#C6112F", desc: "Long-term private equity partners" },
        { name: "HNW Investors", percent: "25%", color: "#6366f1", desc: "Accredited high net worth investors" },
        { name: "Retail Investors", percent: "10%", color: "#06b6d4", desc: "Public market liquidity & market buyers" },
        { name: "Resource Funds", percent: "25%", color: "#f59e0b", desc: "Mining & energy transition institutional funds" },
        { name: "Buy Side", percent: "20%", color: "#374151", desc: "Asset managers & corporate development" },
      ];

  const currentDisplayLegend = activeLegend || legendItems[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFlippedOnScroll) {
            setHasFlippedOnScroll(true);
            setFlipDegree((prev) => prev + 360);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (donutRef.current) {
      observer.observe(donutRef.current);
    }

    return () => observer.disconnect();
  }, [hasFlippedOnScroll]);

  const Y_AXIS_MAX = 1450;
  const yearlyData = [
    { year: 2022, total: 250, investors: 61, delegates: 189, heightPct: Math.round((250 / Y_AXIS_MAX) * 100), yoy: "+0%" },
    { year: 2023, total: 600, investors: 200, delegates: 400, heightPct: Math.round((600 / Y_AXIS_MAX) * 100), yoy: "+140%" },
    { year: 2024, total: 800, investors: 250, delegates: 550, heightPct: Math.round((800 / Y_AXIS_MAX) * 100), yoy: "+33%" },
    { year: 2025, total: 1045, investors: 300, delegates: 745, heightPct: Math.round((1045 / Y_AXIS_MAX) * 100), yoy: "+31%" },
    { year: 2026, total: 1400, investors: 350, delegates: 1050, heightPct: Math.round((1400 / Y_AXIS_MAX) * 100), yoy: "+38%", highlight: "38% Y-O-Y" },
  ];

  const selectedYear = yearlyData[selectedYearIndex];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header matching exact design */}
      <span className="text-[#C6112F] font-extrabold text-xs sm:text-sm tracking-[0.18em] uppercase text-center block mb-2">
        {isFr ? "L'ÉVÉNEMENT 2026" : "THE EVENT 2026"}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1f2430] dark:text-white text-center mb-3 tracking-tight">
        {isFr ? "L'Événement en Chiffres" : "The Event by the Numbers"}
      </h2>
      <div className="w-16 h-[3px] bg-[#C6112F] mx-auto rounded-full mb-4" />
      <p className="text-neutral-600 dark:text-zinc-300 text-xs sm:text-sm text-center font-medium max-w-xl mx-auto mb-10 leading-relaxed">
        {isFr
          ? "Une plateforme mondiale reliant investisseurs, entreprises et leaders qui façonnent l'avenir de l'investissement minier."
          : "A global platform connecting investors, companies and leaders driving the future of mining and resource investment."}
      </p>

      {/* ════════ SINGLE 1-LINE HORIZONTAL STATS ROW ════════ */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2 lg:gap-2.5">
          {/* Card 1: Qualified Investors */}
          <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
            <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
              <i className="fi fi-rr-user-salary text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
            <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
              <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">350</div>
              <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                {isFr ? (
                  <>
                    INVESTISSEURS<br />QUALIFIÉS
                  </>
                ) : (
                  <>
                    QUALIFIED<br />INVESTORS
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Card 2: Companies Represented */}
          <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
            <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
              <i className="fi fi-rs-building text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
            <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
              <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">200+</div>
              <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                {isFr ? (
                  <>
                    SOCIÉTÉS<br />REPRÉSENTÉES
                  </>
                ) : (
                  <>
                    COMPANIES<br />REPRESENTED
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Card 3: 1x1 Meeting Issuers */}
          <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
            <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
              <img
                src="/meeting-table.svg"
                alt="1x1 Meeting"
                className="w-4 h-4 object-contain dark:invert"
              />
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
            <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
              <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">143</div>
              <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                {isFr ? (
                  <>
                    RENCONTRES<br />1-À-1 ÉMETTEURS
                  </>
                ) : (
                  <>
                    1X1 MEETING<br />ISSUERS
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Card 4: Presentations */}
          <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
            <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
              <i className="fi fi-rr-chart-user text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
            <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
              <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">65</div>
              <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                PRESENTATIONS
              </span>
            </div>
          </div>

          {/* Card 5: Panels & Keynotes */}
          <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
            <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
              <i className="fi fi-rs-circle-microphone text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
            <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
              <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">17</div>
              <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                {isFr ? (
                  <>
                    PANELS ET<br />CONFÉRENCES
                  </>
                ) : (
                  <>
                    PANELS &<br />KEYNOTES
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Card 6: Sponsors & Partners */}
          <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
            <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
              <i className="fi fi-rr-handshake text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
            <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
              <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">60+</div>
              <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                {isFr ? (
                  <>
                    MÉDIAS<br />& PARTENAIRES
                  </>
                ) : (
                  <>
                    MEDIA &<br />PARTNERS
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Card 7: 1x1 Meetings / 3 Days */}
          <div className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0">
            <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
              <div className="absolute -top-[1.5px] -right-[1.5px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
              <i className="fi fi-rr-coworking text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-[#C6112F]/30 shrink-0" />
            <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
              <div className="text-sm sm:text-base xl:text-lg font-black text-neutral-900 dark:text-white leading-tight tracking-tight">3,500</div>
              <span className="text-[#C6112F] font-medium text-[8px] sm:text-[9px] xl:text-[9.5px] tracking-tight uppercase leading-[1.1] mt-0.5 max-w-full">
                {isFr ? (
                  <>
                    RÉUNIONS 1-À-1 /<br />3 JOURS
                  </>
                ) : (
                  <>
                    1X1 MEETINGS /<br />3 DAYS
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Lower Cards (Growth & Investor Profile) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: Growth Profile */}
        <div className="bg-[#f0f2f5] dark:bg-[#121215] border border-neutral-300/90 dark:border-zinc-800 hover:border-[#C6112F]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 shadow-xs hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#C6112F] font-bold text-xs tracking-widest uppercase block">
                {isFr ? "CROISSANCE AU FIL DU TEMPS" : "GROWTH OVER TIME"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C6112F]/10 text-[#C6112F] dark:text-red-400 text-[10px] font-black uppercase tracking-wider animate-pulse">
                {isFr ? "EXPANSION DE 5X" : "5X EXPANSION"}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f2430] dark:text-white mb-2">
              {isFr ? "Profil de Croissance - 500%" : "Growth Profile - 500%"}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm font-medium mb-4">
              {isFr
                ? "Croissance forte et constante des délégués et de la participation des investisseurs."
                : "Strong and consistent growth in delegates and investor participation."}
            </p>

            {/* Interactive Year Selector Tabs */}
            <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
              {yearlyData.map((d, idx) => {
                const isSelected = selectedYearIndex === idx;
                return (
                  <button
                    key={d.year}
                    onClick={() => setSelectedYearIndex(idx)}
                    onMouseEnter={() => setSelectedYearIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20 scale-105"
                        : "bg-white dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-zinc-700 border border-neutral-200/80 dark:border-zinc-700"
                    }`}
                  >
                    {d.year}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bar Chart Container with Y-Axis Gridlines */}
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-neutral-200/90 dark:border-zinc-800 p-5 sm:p-6 shadow-2xs relative">
            {/* Chart Legend & Selected Year Detail Banner */}
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-bold text-neutral-700 dark:text-neutral-200">
                  <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-slate-400 to-slate-200 inline-block shadow-2xs border border-slate-300" />
                  {isFr ? "Délégués" : "Delegates"}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[#C6112F] dark:text-red-400">
                  <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-[#C6112F] to-[#ff4d6d] inline-block shadow-2xs" />
                  {isFr ? "Investisseurs" : "Investors"}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-rose-50 dark:bg-red-950/60 border border-[#C6112F]/30 px-3 py-1 rounded-xl text-[11px] font-extrabold text-[#C6112F] dark:text-red-400 shadow-2xs">
                <span>{selectedYear.year}:</span>
                <span>{selectedYear.total} {isFr ? "Total" : "Total"}</span>
                <span className="text-neutral-300 font-normal">|</span>
                <span>{selectedYear.investors} {isFr ? "Investisseurs" : "Investors"}</span>
                <span className="bg-[#C6112F] text-white text-[9px] px-1.5 py-0.5 rounded-md ml-1 font-black shadow-xs">
                  {selectedYear.yoy}
                </span>
              </div>
            </div>

            {/* Stacked Bars Container with Gridlines & Y-Axis */}
            <div className="relative h-96 pt-6 pb-2 pl-8 pr-2 flex items-end justify-between gap-3 border-b border-neutral-200 dark:border-zinc-800">
              {/* Background Gridlines */}
              <div className="absolute inset-0 pl-8 pr-2 pointer-events-none flex flex-col justify-between py-2">
                {[1400, 1000, 600, 200, 0].map((val) => (
                  <div key={val} className="w-full flex items-center gap-2">
                    <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 w-5 text-right shrink-0">
                      {val}
                    </span>
                    <div className="w-full border-b border-dashed border-neutral-200/80 dark:border-zinc-800" />
                  </div>
                ))}
              </div>

              {/* Interactive Stacked 3D Metallic Pillars */}
              {yearlyData.map((d, idx) => {
                const isSelected = selectedYearIndex === idx;
                return (
                  <div
                    key={d.year}
                    onClick={() => setSelectedYearIndex(idx)}
                    onMouseEnter={() => setSelectedYearIndex(idx)}
                    className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative z-10"
                  >
                    {/* Y-O-Y Badge */}
                    {d.highlight && (
                      <span className="text-[#C6112F] text-[9px] font-black bg-rose-50 border border-[#C6112F]/40 px-2 py-0.5 rounded-full mb-1 shadow-xs animate-bounce">
                        {d.highlight}
                      </span>
                    )}

                    {/* Number on top */}
                    <span
                      className={`text-[10px] font-bold mb-1 transition-all duration-300 ${
                        isSelected ? "text-[#C6112F] font-black scale-110" : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      {d.total}
                    </span>

                    {/* 3D Metallic Glass Pillar Container */}
                    <div
                      className={`w-full max-w-[36px] sm:max-w-[42px] bg-gradient-to-t from-slate-400 via-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-500 rounded-t-lg relative flex flex-col justify-end overflow-hidden origin-bottom transition-all duration-700 ease-out shadow-sm group-hover:scale-105 group-hover:shadow-md border border-slate-300/80 ${
                        isSelected
                          ? "ring-2 ring-[#C6112F] shadow-[0_10px_25px_rgba(198,17,47,0.3)] scale-105"
                          : ""
                      }`}
                      style={{
                        height: `${d.heightPct}%`,
                      }}
                    >
                      {/* Glossy 3D Highlight Strip */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-white/40 z-20 pointer-events-none" />

                      {/* Investor Segment (Ruby Red Gradient Bottom) */}
                      <div
                        className="w-full bg-gradient-to-t from-[#900B21] via-[#C6112F] to-[#ff4d6d] flex items-center justify-center transition-all duration-700 ease-out shadow-inner origin-bottom border-t border-white/30"
                        style={{ height: `${(d.investors / d.total) * 100}%` }}
                      >
                        <span className="text-[8px] font-black text-white tracking-tighter shadow-xs">
                          {d.investors}
                        </span>
                      </div>
                    </div>

                    {/* Year Label */}
                    <span
                      className={`text-[11px] font-bold mt-2.5 transition-all duration-300 ${
                        isSelected ? "text-[#C6112F] font-black scale-110" : "text-neutral-600 dark:text-neutral-300"
                      }`}
                    >
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Card: Diverse Investor Mix */}
        <div className="bg-[#f0f2f5] dark:bg-[#121215] border border-neutral-300/90 dark:border-zinc-800 hover:border-[#C6112F]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 shadow-xs hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#C6112F] font-bold text-xs tracking-widest uppercase block">
                {isFr ? "PROFIL D'INVESTISSEUR" : "INVESTOR PROFILE"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-[10px] font-black uppercase tracking-wider animate-pulse">
                {isFr ? "MIX ÉQUILIBRÉ" : "BALANCED MIX"}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f2430] dark:text-white mb-2">
              {isFr ? "Mix d'Investisseurs Diversifié" : "Diverse Investor Mix"}
            </h3>
            <div className="w-14 h-[3px] bg-[#C6112F] rounded-full my-2" />
            <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm font-medium mb-6">
              {isFr
                ? "Un éventail équilibré d'investisseurs stimulant des connexions et opportunités uniques."
                : "A balanced mix of investor types driving meaningful connections and investment opportunities."}
            </p>
          </div>

          {/* Donut Chart Container with SVG 3D Depth & Orbiting Satellites */}
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-neutral-200/90 dark:border-zinc-800 p-6 shadow-2xs flex flex-col items-center justify-center gap-6">
            {/* Ultra-Realistic 3D SVG Donut Chart Callout */}
            <div
              ref={donutRef}
              className="relative flex items-center justify-center p-3"
            >
              {/* Outer Dashed Orbit Ring */}
              <div className="absolute -inset-3.5 rounded-full border-2 border-dashed border-[#C6112F]/30 animate-[spin_20s_linear_infinite] pointer-events-none" />

              {/* Reverse Inner Orbit Ring */}
              <div className="absolute -inset-1.5 rounded-full border border-indigo-400/30 animate-[spin_14s_linear_infinite_reverse] pointer-events-none" />

              {/* Orbiting Glowing Satellite Circle */}
              <div className="absolute -inset-2.5 rounded-full animate-[spin_8s_linear_infinite] pointer-events-none">
                <div className="w-3.5 h-3.5 rounded-full bg-[#C6112F] shadow-[0_0_14px_#C6112F] border-2 border-white -top-1.5 left-1/2 -translate-x-1/2 absolute" />
              </div>

              {/* Concentric Pulse Circles (Circle-on-Circle Animation) */}
              <div className="absolute w-40 h-40 rounded-full border-2 border-rose-300/30 animate-ping pointer-events-none opacity-40" />
              <div className="absolute w-44 h-44 rounded-full border border-[#C6112F]/20 animate-pulse pointer-events-none opacity-40" />

              {/* Vector SVG 3D Donut Chart */}
              <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 160 160">
                  <defs>
                    <filter id="donutShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.16" />
                    </filter>
                  </defs>

                  {/* Background Track Ring */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="22"
                    className="opacity-50 dark:stroke-zinc-800"
                  />

                  {/* Interactive Slices with Stroke Dasharray (Circumference ~ 376.99) */}
                  {[
                    { name: legendItems[0].name, pct: 0.20, color: "#C6112F", dashLength: 75.4, dashOffset: 0 },
                    { name: legendItems[1].name, pct: 0.25, color: "#6366f1", dashLength: 94.2, dashOffset: -75.4 },
                    { name: legendItems[2].name, pct: 0.10, color: "#06b6d4", dashLength: 37.7, dashOffset: -169.6 },
                    { name: legendItems[3].name, pct: 0.25, color: "#f59e0b", dashLength: 94.2, dashOffset: -207.3 },
                    { name: legendItems[4].name, pct: 0.20, color: "#374151", dashLength: 75.4, dashOffset: -301.5 },
                  ].map((slice, idx) => {
                    const isHovered = currentDisplayLegend.name === slice.name;
                    return (
                      <circle
                        key={slice.name}
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke={slice.color}
                        strokeWidth={isHovered ? "26" : "22"}
                        strokeDasharray={`${slice.dashLength - 2} ${376.99 - (slice.dashLength - 2)}`}
                        strokeDashoffset={slice.dashOffset}
                        filter="url(#donutShadow)"
                        className="transition-all duration-500 ease-out cursor-pointer"
                        style={{
                          opacity: isHovered ? 1 : 0.88,
                          transformOrigin: "center",
                          transform: isHovered ? "scale(1.06)" : "scale(1)",
                        }}
                        onClick={() => setActiveLegend(legendItems[idx])}
                        onMouseEnter={() => setActiveLegend(legendItems[idx])}
                      />
                    );
                  })}
                </svg>

                {/* Upright Glassmorphic Center Hole Dial */}
                <div className="absolute w-28 h-28 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.08)] text-center px-2 py-2 border border-neutral-200/90 dark:border-zinc-800 z-20 group cursor-pointer transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-1.5 mb-2 bg-neutral-100/90 dark:bg-zinc-800/90 px-3 py-1 rounded-full border border-neutral-200/80 dark:border-zinc-700 shadow-2xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: currentDisplayLegend.color }}
                    />
                    <span className="text-xs font-black tracking-wider uppercase text-neutral-700 dark:text-neutral-200">
                      {currentDisplayLegend.percent}
                    </span>
                  </div>

                  <span
                    className="text-4xl font-black leading-none mb-1 tracking-tight transition-colors duration-300"
                    style={{ color: currentDisplayLegend.color }}
                  >
                    {currentDisplayLegend.percent}
                  </span>
                  <span className="text-xs font-extrabold text-neutral-800 dark:text-white uppercase tracking-tight leading-tight text-center px-2">
                    {currentDisplayLegend.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Color Legend — grid row below chart */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full text-xs font-bold text-neutral-700 dark:text-neutral-200">
              {legendItems.map((item) => {
                const isActive = currentDisplayLegend.name === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setActiveLegend(item);
                      setFlipDegree((prev) => prev + 180);
                    }}
                    onMouseEnter={() => {
                      setActiveLegend(item);
                      setFlipDegree((prev) => prev + 180);
                    }}
                    onMouseLeave={() => setActiveLegend(null)}
                    className={`flex flex-col gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-neutral-100/90 dark:bg-zinc-800/90 border-neutral-300 dark:border-zinc-700 shadow-sm scale-105 text-[#1f2430] dark:text-white"
                        : "bg-white dark:bg-zinc-900 border-transparent hover:bg-neutral-50 dark:hover:bg-zinc-800 hover:border-neutral-200 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-xs transition-transform shadow-2xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-extrabold">{item.name}</span>
                      </div>
                      <span
                        className="font-black text-xs ml-2"
                        style={{ color: item.color }}
                      >
                        {item.percent}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium pl-5 line-clamp-1">
                      {item.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
