"use client";

import React from "react";

export default function SponsorsView({ year = 2026 }: { year?: number }) {
  return (
    <div className="w-full text-left">
      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">50+</span>
            <span className="text-xs text-neutral-500 font-semibold">Global Sponsors</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">20+</span>
            <span className="text-xs text-neutral-500 font-semibold">Countries Represented</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">Tier 1</span>
            <span className="text-xs text-neutral-500 font-semibold">Industry Leaders</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.6l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.2 6.9 19l1.1-5.6-4.2-3.9 5.7-.7z" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">Strategic</span>
            <span className="text-xs text-neutral-500 font-semibold">Capital Alliances</span>
          </div>
        </div>
      </div>

      {/* Tiers Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-grow h-[1px] bg-neutral-200" />
        <b className="text-xs sm:text-sm font-extrabold text-[#C6112F] tracking-[0.25em] uppercase whitespace-nowrap">
          OFFICIAL SPONSOR TIERS
        </b>
        <div className="flex-grow h-[1px] bg-neutral-200" />
      </div>

      {/* 1. PLATINUM TIER */}
      <div className="bg-neutral-50/60 border border-neutral-200 rounded-2xl overflow-hidden mb-6 grid grid-cols-1 lg:grid-cols-12 shadow-2xs hover:border-[#C6112F]/30 transition-all">
        {/* Badge */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#78350F] p-6 text-center flex flex-col items-center justify-center gap-2 border-b lg:border-b-0 lg:border-r border-[#FCD34D]">
          <svg className="w-8 h-8 text-[#B45309]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M4 8l4 3 4-6 4 6 4-3-1.5 10h-13z" />
            <path d="M6 20.5h12" strokeLinecap="round" />
          </svg>
          <b className="text-xs font-black tracking-wider leading-tight uppercase">
            PLATINUM<br />SPONSOR
          </b>
        </div>
        {/* Cell Logo */}
        <div className="lg:col-span-3 p-6 flex flex-col justify-center items-center text-center bg-white border-b lg:border-b-0 lg:border-r border-neutral-200">
          <div className="text-[#e65400] text-4xl font-extrabold tracking-tighter leading-none select-none font-sans mb-1">
            BHP
          </div>
          <span className="text-xs font-bold text-neutral-900">BHP Group</span>
        </div>
        {/* Description */}
        <div className="lg:col-span-5 p-6 flex items-center text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
          BHP is a leading global resources company committed to creating long-term value through the discovery, development and production of major commodities.
        </div>
        {/* Visit Button */}
        <div className="lg:col-span-2 p-6 flex items-center justify-center">
          <a
            href="https://www.bhp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2.5 px-4 bg-[#C6112F] hover:bg-[#A30E26] text-white text-xs font-extrabold tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[#C6112F]/15"
          >
            VISIT WEBSITE ↗
          </a>
        </div>
      </div>

      {/* 2. GOLD TIER */}
      <div className="bg-neutral-50/60 border border-neutral-200 rounded-2xl overflow-hidden mb-6 grid grid-cols-1 lg:grid-cols-12 shadow-2xs hover:border-[#C6112F]/30 transition-all">
        {/* Badge */}
        <div className="lg:col-span-2 bg-[#FFFBEB] text-[#B45309] p-6 text-center flex flex-col items-center justify-center gap-2 border-b lg:border-b-0 lg:border-r border-[#FDE68A]">
          <svg className="w-8 h-8 text-[#D97706]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M7 4h10l4 5-9 11L3 9z" />
            <path d="M3 9h18M9.5 4L8 9l4 11 4-11-1.5-5" />
          </svg>
          <b className="text-xs font-black tracking-wider leading-tight uppercase">
            GOLD<br />SPONSORS
          </b>
        </div>
        {/* Logos Grid */}
        <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
          {/* Rio Tinto */}
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="font-serif text-[#d5001c] text-3xl font-extrabold leading-none select-none tracking-tight mb-2">
              Rio Tinto
            </div>
            <span className="text-xs font-semibold text-neutral-800">Rio Tinto</span>
          </div>
          {/* Newmont */}
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="text-[#003da6] text-2xl font-black italic leading-none select-none tracking-tight mb-2">
              Newmont
            </div>
            <span className="text-xs font-semibold text-neutral-800">Newmont Corporation</span>
          </div>
          {/* Vale */}
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="text-[#118e6f] text-2xl font-black tracking-[0.14em] leading-none select-none mb-2 flex items-center gap-1.5">
              <span className="text-[#8ec63f] text-lg select-none">&#9660;</span>VALE
            </div>
            <span className="text-xs font-semibold text-neutral-800">Vale S.A.</span>
          </div>
        </div>
      </div>

      {/* 3. SILVER TIER */}
      <div className="bg-neutral-50/60 border border-neutral-200 rounded-2xl overflow-hidden mb-6 grid grid-cols-1 lg:grid-cols-12 shadow-2xs hover:border-[#C6112F]/30 transition-all">
        {/* Badge */}
        <div className="lg:col-span-2 bg-slate-100 text-slate-800 p-6 text-center flex flex-col items-center justify-center gap-2 border-b lg:border-b-0 lg:border-r border-slate-200">
          <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M12 3.6l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.2 6.9 19l1.1-5.6-4.2-3.9 5.7-.7z" />
          </svg>
          <b className="text-xs font-black tracking-wider leading-tight uppercase">
            SILVER<br />SPONSORS
          </b>
        </div>
        {/* Logos Grid */}
        <div className="lg:col-span-10 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
          {/* Anglo American */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="text-[#00164e] text-sm font-extrabold tracking-wide leading-none select-none flex items-center gap-1 mb-2">
              <span className="text-[#0057b8] text-lg font-black select-none">&#9713;</span>AngloAmerican
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">Anglo American</span>
          </div>
          {/* Glencore */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="font-serif text-[#1a1a1a] text-lg tracking-[0.2em] font-extrabold leading-none select-none mb-2 uppercase">
              Glencore
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">Glencore plc</span>
          </div>
          {/* First Quantum */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="text-[#8a6d3b] text-xs font-extrabold tracking-wider leading-tight select-none mb-2">
              FIRST<br />QUANTUM<br /><span className="text-[7px] tracking-[0.3em] font-bold">MINERALS</span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">First Quantum Minerals</span>
          </div>
          {/* Teck */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="text-[#101820] text-3xl font-black leading-none select-none tracking-tight mb-2">
              Teck
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">Teck Resources</span>
          </div>
        </div>
      </div>

      {/* 4. BRONZE TIER */}
      <div className="bg-neutral-50/60 border border-neutral-200 rounded-2xl overflow-hidden mb-6 grid grid-cols-1 lg:grid-cols-12 shadow-2xs hover:border-[#C6112F]/30 transition-all">
        {/* Badge */}
        <div className="lg:col-span-2 bg-amber-50 text-amber-900 p-6 text-center flex flex-col items-center justify-center gap-2 border-b lg:border-b-0 lg:border-r border-amber-200">
          <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="9" r="5" />
            <path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5" />
          </svg>
          <b className="text-xs font-black tracking-wider leading-tight uppercase">
            BRONZE<br />SPONSORS
          </b>
        </div>
        {/* Logos Grid */}
        <div className="lg:col-span-10 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
          {/* Freeport */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="bg-[#111] text-white text-[9px] px-2 py-1.5 font-bold tracking-wide select-none leading-normal text-left mb-2 rounded-xs">
              <b>FCX</b>&nbsp; FREEPORT-<br />McMoRAN
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">Freeport-McMoRan</span>
          </div>
          {/* Lundin */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="text-[#c9a24b] text-base tracking-[0.16em] leading-tight font-extrabold select-none mb-2">
              LUNDIN<br />MINING
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">Lundin Mining</span>
          </div>
          {/* Nornickel */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="text-[#0077c8] text-sm font-extrabold flex items-center gap-1.5 leading-none select-none mb-2">
              <span className="w-7 h-7 rounded-full bg-[#0077c8] text-white flex items-center justify-center text-xs font-bold select-none">N</span>NORNICKEL
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">Nornickel</span>
          </div>
          {/* Hindustan Zinc */}
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="text-[#2b2b2b] text-[10px] font-extrabold flex items-center gap-1.5 leading-tight select-none mb-2 text-left">
              <span className="w-7 h-7 rounded-full border border-neutral-400 flex items-center justify-center text-[10px] text-neutral-600 font-bold select-none">HZ</span>
              <span>HINDUSTAN ZINC<br /><span className="text-[8px] text-neutral-400 font-medium">Zinc & Silver of India</span></span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-500">Hindustan Zinc Limited</span>
          </div>
        </div>
      </div>

      {/* 5. SUPPORTING PARTNERS */}
      <div className="bg-neutral-50/60 border border-neutral-200 rounded-2xl overflow-hidden mb-6 grid grid-cols-1 lg:grid-cols-12 shadow-2xs hover:border-[#C6112F]/30 transition-all">
        {/* Badge */}
        <div className="lg:col-span-2 bg-[#C6112F]/10 text-[#C6112F] p-6 text-center flex flex-col items-center justify-center gap-2 border-b lg:border-b-0 lg:border-r border-[#C6112F]/20">
          <svg className="w-8 h-8 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6S13.9 16 14.5 19" />
            <circle cx="16.5" cy="9" r="2.6" />
            <path d="M16 14.6c2.4.1 4 1.6 4.5 4.4" />
          </svg>
          <b className="text-xs font-black tracking-wider leading-tight uppercase">
            SUPPORTING<br />PARTNERS
          </b>
        </div>
        {/* Logos Grid */}
        <div className="lg:col-span-10 grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
          {/* Sandvik */}
          <div className="p-4 flex items-center justify-center text-center">
            <div className="text-[#0a4d9d] text-base font-extrabold tracking-wide border-b-2 border-[#0a4d9d] pb-0.5 select-none font-sans">
              SANDVIK
            </div>
          </div>
          {/* FLS */}
          <div className="p-4 flex items-center justify-center text-center">
            <div className="text-[#1c4fa1] text-2xl font-black leading-none tracking-tight select-none font-sans">
              FLS
            </div>
          </div>
          {/* Weir */}
          <div className="p-4 flex items-center justify-center text-center">
            <div className="text-[#1a55a5] text-2xl font-extrabold tracking-widest leading-none select-none">
              WEIR
            </div>
          </div>
          {/* Metso */}
          <div className="p-4 flex items-center justify-center text-center">
            <div className="text-[#1a1f28] text-xl font-black leading-none tracking-tight select-none">
              Metso
            </div>
          </div>
          {/* DRA */}
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <div className="text-[#00a0a8] text-lg font-black leading-none tracking-tight select-none">
              DRA
              <span className="block text-[8px] tracking-[0.25em] font-extrabold text-neutral-500 mt-0.5">GLOBAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors Call To Action Banner */}
      <div className="bg-[#0f1117] text-white border border-[#C6112F]/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-6 shadow-2xl mt-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C6112F]/15 via-transparent to-transparent pointer-events-none" />
        <div className="w-14 h-14 rounded-2xl bg-[#C6112F] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#C6112F]/30 relative z-10">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <div className="flex-1 text-center md:text-left relative z-10">
          <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase block mb-1">
            BECOME A PARTNER
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
            Partnering for a Stronger Mining Future
          </h4>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium max-w-xl">
            Our sponsors play a vital role in driving innovation, ESG excellence, and sustainable mining practices across global capital markets.
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 relative z-10 w-full sm:w-auto">
          <a
            href="mailto:jchoi@irinc.ca?subject=Sponsorship Inquiry"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-xl shadow-[#C6112F]/25 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>BECOME A SPONSOR</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="/partnership"
            className="text-xs font-bold text-neutral-300 hover:text-[#C6112F] transition-colors flex items-center gap-1.5"
          >
            <span>Sponsorship Opportunities</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

