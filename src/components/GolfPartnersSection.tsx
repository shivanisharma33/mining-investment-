"use client";

import React from "react";
import Image from "next/image";

export default function GolfPartnersSection() {
  return (
    <section className="relative w-full bg-white dark:bg-[#0e1626] py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* ═════════════════════════════════════════════════════════ */}
        {/* SUBSECTION 1: PARTENAIRES DORÉ PARTNER */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2b354f] dark:text-white tracking-wider uppercase">
            PARTENAIRES DORÉ PARTNER
          </h2>
          <div className="w-14 sm:w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mt-2.5" />
        </div>

        {/* 4-Card Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Card 1: Antimony Resources Corp */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/antimony_resources_corp.png"
              alt="Antimony Resources Corp"
              className="max-h-16 sm:max-h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Card 2: Genesis */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/genesis_wings.png"
              alt="Genesis"
              className="max-h-16 sm:max-h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Card 3: National Bank of Canada Capital Markets */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/national_bank_capital_markets.png"
              alt="National Bank of Canada Capital Markets"
              className="max-h-16 sm:max-h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Card 4: Ventum Financial */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/ventum_financial_exact.png"
              alt="Ventum Financial"
              className="max-h-16 sm:max-h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Horizontal Divider Line matching mockup */}
        <div className="w-full h-[1.5px] bg-[#e58a99]/70 dark:bg-[#C6112F]/40 my-10 sm:my-14" />

        {/* ═════════════════════════════════════════════════════════ */}
        {/* SUBSECTION 2: PARTENAIRES PRIX / PRIZE PARTNERS */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2b354f] dark:text-white tracking-wider uppercase">
            PARTENAIRES PRIX / PRIZE PARTNERS
          </h2>
          <div className="w-14 sm:w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mt-2.5" />
        </div>

        {/* Top Row: 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Prize Partner 1: Osisko Development */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/or_royalties_osisko_royalties.svg"
              alt="Osisko Development"
              className="max-h-14 sm:max-h-16 w-auto object-contain dark:brightness-110"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Prize Partner 2: THE PROSPECTOR Resource Investment News */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/the_prospector_news.png"
              alt="The Prospector Resource Investment News"
              className="max-h-14 sm:max-h-16 w-auto object-contain dark:brightness-110"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Prize Partner 3: Café du Monde Brasserie Française */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-black text-base text-[#2f3e46] dark:text-slate-200 tracking-tight leading-tight">CAFÉ</span>
              <span className="font-semibold text-[10px] text-[#2f3e46] dark:text-slate-300 tracking-widest uppercase my-0.5">— DU —</span>
              <span className="font-black text-base text-[#2f3e46] dark:text-slate-200 tracking-tight leading-tight">MONDE</span>
              <span className="text-[8px] font-bold text-[#0077b6] tracking-widest uppercase border-t border-b border-[#0077b6]/30 px-2 py-0.5 mt-1">BRASSERIE FRANÇAISE</span>
            </div>
          </div>

          {/* Prize Partner 4: IL TEATRO */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <div className="bg-black text-white p-3 rounded-lg flex flex-col items-center justify-center w-28 h-20 shadow-xs">
              {/* Palm/fountain emblem */}
              <svg className="w-8 h-8 text-white mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15 8L19 4L16 11L22 13L15 15L17 22L12 17L7 22L9 15L2 13L8 11L5 4L9 8L12 2Z" />
              </svg>
              <span className="font-black text-[10px] tracking-widest uppercase">IL TEATRO</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Centered Cards matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-[960px] mx-auto gap-4 sm:gap-6">
          {/* Prize Partner 5: CIEL! Bistro-Bar Tournant */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <div className="w-24 h-24 rounded-full border border-neutral-300 bg-white flex flex-col items-center justify-center text-center p-2 shadow-2xs">
              <span className="text-[7px] font-bold text-neutral-500 uppercase tracking-widest">BISTRO • BAR</span>
              <span className="font-black text-xl text-neutral-900 leading-none my-0.5">ciel!</span>
              <span className="text-[6.5px] font-bold text-neutral-500 uppercase tracking-widest">TOURNANT</span>
            </div>
          </div>

          {/* Prize Partner 6: Niji SUSHI */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <div className="bg-black text-white p-3.5 rounded-lg flex flex-col items-center justify-center w-28 h-20 shadow-xs">
              <span className="font-serif italic text-2xl font-bold leading-none mb-1">Niji</span>
              <span className="font-extrabold text-[9px] tracking-widest uppercase text-neutral-300">SUSHI</span>
            </div>
          </div>

          {/* Prize Partner 7: Laurier Du Vallon */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <div className="bg-white p-3 rounded-lg flex flex-col items-center justify-center w-40 h-20 shadow-2xs">
              <div className="w-6 h-5 mb-1 text-[#e65c00]">
                {/* Ribbon origami icon */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16l-8 8zM4 20l8-8 8 8z" />
                </svg>
              </div>
              <span className="font-bold text-xs text-[#e65c00] leading-none">Laurier Du Vallon</span>
              <span className="text-[7px] font-semibold text-neutral-500 uppercase tracking-wider mt-1">VOYAGES ET DÉCOUVERTES</span>
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line matching mockup */}
        <div className="w-full h-[1.5px] bg-[#e58a99]/70 dark:bg-[#C6112F]/40 my-10 sm:my-14" />

        {/* ═════════════════════════════════════════════════════════ */}
        {/* SUBSECTION 3: PROMOTIONAL PARTNERS */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2b354f] dark:text-white tracking-wider uppercase">
            PROMOTIONAL PARTNERS
          </h2>
          <div className="w-14 sm:w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mt-2.5" />
        </div>

        {/* 3 Centered Partner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-[860px] mx-auto gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* NP Partners */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-serif text-4xl font-bold text-[#8facc0] leading-none tracking-tight">NP</span>
              <span className="font-serif italic text-[11px] text-[#b0aaa0] tracking-wide mt-0.5">Partners</span>
            </div>
          </div>

          {/* XPAV Expert'Ease */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/xpav_expert_ease.png"
              alt="XPAV Expert'Ease"
              className="max-h-14 sm:max-h-16 w-auto object-contain dark:brightness-110"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Stifel (Red/Blue Diamond S Logo) */}
          <div className="bg-[#eeeff2] dark:bg-[#182236] border border-neutral-300/80 dark:border-slate-700/80 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/stifel.svg"
              alt="Stifel"
              className="max-h-14 sm:max-h-16 w-auto object-contain dark:brightness-110"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Red Horizontal Divider */}
        <div className="w-full h-[2.5px] bg-[#C6112F] my-10 sm:my-14 rounded-full" />

        {/* ═════════════════════════════════════════════════════════ */}
        {/* PHOTO GALLERY MASONRY GRID */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Photo 1 — Tall Left (spans 2 rows) */}
          <div className="row-span-2 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-slate-800 group">
            <img
              src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-25.jpg"
              alt="Golf group photo on fairway"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Photo 2 — Top Right Small */}
          <div className="rounded-2xl overflow-hidden bg-neutral-200 dark:bg-slate-800 group">
            <img
              src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-27.jpg"
              alt="Golfers on the course"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Photo 3 — Top Far Right (spans 2 columns on md) */}
          <div className="col-span-1 md:col-span-2 row-span-1 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-slate-800 group">
            <img
              src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-30.jpg"
              alt="Group of golfers posing"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 aspect-[16/10]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Photo 4 — Middle Center (spans 2 columns on md) */}
          <div className="col-span-1 md:col-span-2 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-slate-800 group">
            <img
              src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-34.jpg"
              alt="Golfers networking on green"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 aspect-[16/10]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Photo 5 — Bottom Left Small */}
          <div className="rounded-2xl overflow-hidden bg-neutral-200 dark:bg-slate-800 group">
            <img
              src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-37.jpg"
              alt="Golfers walking fairway"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Photo 6 — Bottom Center */}
          <div className="rounded-2xl overflow-hidden bg-neutral-200 dark:bg-slate-800 group">
            <img
              src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-40.jpg"
              alt="Golf day participants"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
