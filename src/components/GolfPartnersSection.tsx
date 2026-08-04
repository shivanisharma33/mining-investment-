"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function GolfPartnersSection() {
  const { t, lang } = useLanguage();

  const prizePartners = [
    {
      id: "osisko",
      name: "Osisko Development",
      content: (
        <img
          src="/image 105.svg"
          alt="Osisko Development"
          className="max-h-16 sm:max-h-20 w-auto object-contain dark:brightness-110"
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      id: "prospector",
      name: "The Prospector News",
      content: (
        <img
          src="/image 106.svg"
          alt="The Prospector Resource Investment News"
          className="max-h-16 sm:max-h-20 w-auto object-contain dark:brightness-110"
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      id: "cafe-du-monde",
      name: "Café du Monde",
      content: (
        <img
          src="/image 107.svg"
          alt="Café du Monde Brasserie Française"
          className="max-h-16 sm:max-h-20 w-auto object-contain dark:brightness-110"
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      id: "il-teatro",
      name: "IL TEATRO",
      content: (
        <img
          src="/image 109.svg"
          alt="IL TEATRO"
          className="max-h-16 sm:max-h-20 w-auto object-contain dark:brightness-110"
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      id: "ciel",
      name: "CIEL!",
      content: (
        <img
          src="/image 110.svg"
          alt="CIEL! Bistro-Bar Tournant"
          className="max-h-16 sm:max-h-20 w-auto object-contain dark:brightness-110"
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      id: "niji-sushi",
      name: "Niji SUSHI",
      content: (
        <img
          src="/image 111.svg"
          alt="Niji SUSHI"
          className="max-h-16 sm:max-h-20 w-auto object-contain dark:brightness-110"
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      id: "laurier",
      name: "Laurier Du Vallon",
      content: (
        <img
          src="/image 112.svg"
          alt="Laurier Du Vallon"
          className="max-h-16 sm:max-h-20 w-auto object-contain dark:brightness-110"
          loading="lazy"
          decoding="async"
        />
      ),
    },
  ];

  const [prizeIndex, setPrizeIndex] = useState(0);
  const [isPrizePaused, setIsPrizePaused] = useState(false);

  useEffect(() => {
    if (isPrizePaused) return;
    const interval = setInterval(() => {
      setPrizeIndex((prev) => (prev + 1) % prizePartners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPrizePaused, prizePartners.length]);

  const handlePrizePrev = () => {
    setPrizeIndex((prev) => (prev - 1 + prizePartners.length) % prizePartners.length);
  };

  const handlePrizeNext = () => {
    setPrizeIndex((prev) => (prev + 1) % prizePartners.length);
  };

  // Duplicate list for infinite loop sliding
  const displayPrizePartners = [...prizePartners, ...prizePartners, ...prizePartners];

  return (
    <section className="relative w-full bg-white dark:bg-[#0e1626] py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* ═════════════════════════════════════════════════════════ */}
        {/* SUBSECTION 1: PARTENAIRES DORÉ PARTNER */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2b354f] dark:text-white tracking-wider uppercase">
            {lang === "FR" ? "PARTENAIRES DORÉ" : "DORÉ PARTNERS"}
          </h2>
          <div className="w-14 sm:w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mt-2.5" />
        </div>

        {/* 4-Card Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Card 1: Antimony Resources Corp */}
          <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/antimony_resources_corp.png"
              alt="Antimony Resources Corp"
              className="max-h-16 sm:max-h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Card 2: Genesis */}
          <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/genesis_wings.png"
              alt="Genesis"
              className="max-h-16 sm:max-h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Card 3: National Bank of Canada Capital Markets */}
          <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/national_bank_capital_markets.png"
              alt="National Bank of Canada Capital Markets"
              className="max-h-16 sm:max-h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Card 4: Ventum Financial */}
          <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
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
        <div className="w-full h-[1.5px] bg-[#e58a99]/70 dark:bg-[#C6112F]/40 my-10 sm:my-14 rounded-full" />

        {/* ═════════════════════════════════════════════════════════ */}
        {/* SUBSECTION 2: PARTENAIRES PRIX / PRIZE PARTNERS (SLIDER) */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2b354f] dark:text-white tracking-wider uppercase">
            {lang === "FR" ? "PARTENAIRES PRIX" : "PRIZE PARTNERS"}
          </h2>
          <div className="w-14 sm:w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mt-2.5" />
        </div>

        {/* Prize Partners Slider Container */}
        <div
          className="relative flex items-center gap-2 sm:gap-4 [--prize-slide-w:100%] sm:[--prize-slide-w:50%] md:[--prize-slide-w:33.333%] lg:[--prize-slide-w:25%]"
          onMouseEnter={() => setIsPrizePaused(true)}
          onMouseLeave={() => setIsPrizePaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={handlePrizePrev}
            aria-label="Previous partner"
            className="w-10 h-10 rounded-full border border-[#C6112F] bg-white dark:bg-[#182236] flex items-center justify-center text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all shrink-0 shadow-md cursor-pointer z-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Viewport Mask for Slider */}
          <div className="w-full overflow-hidden py-3">
            <div
              className="flex items-center transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${prizeIndex} * var(--prize-slide-w, 25%)))`,
              }}
            >
              {displayPrizePartners.map((partner, idx) => (
                <div
                  key={`${partner.id}-${idx}`}
                  className="shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
                >
                  <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/50 transition-all duration-300 group">
                    {partner.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handlePrizeNext}
            aria-label="Next partner"
            className="w-10 h-10 rounded-full border border-[#C6112F] bg-white dark:bg-[#182236] flex items-center justify-center text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all shrink-0 shadow-md cursor-pointer z-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {prizePartners.map((partner, idx) => (
            <button
              key={`dot-${partner.id}`}
              onClick={() => setPrizeIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                prizeIndex % prizePartners.length === idx
                  ? "w-8 bg-[#C6112F]"
                  : "w-2.5 bg-neutral-300 dark:bg-slate-700 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full h-[1.5px] bg-[#e58a99]/70 dark:bg-[#C6112F]/40 my-10 sm:my-14" />

        {/* ═════════════════════════════════════════════════════════ */}
        {/* SUBSECTION 3: PROMOTIONAL PARTNERS */}
        {/* ═════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#2b354f] dark:text-white tracking-wider uppercase">
            {lang === "FR" ? "PARTENAIRES PROMOTIONNELS" : "PROMOTIONAL PARTNERS"}
          </h2>
          <div className="w-14 sm:w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mt-2.5" />
        </div>

        {/* 3 Centered Partner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-[860px] mx-auto gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* NP Partners */}
          <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-serif text-4xl font-bold text-[#203a43] leading-none tracking-tight">NP</span>
              <span className="font-serif italic text-[11px] text-[#556b2f] tracking-wide mt-0.5">Partners</span>
            </div>
          </div>

          {/* XPAV Expert'Ease */}
          <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/xpav_expert_ease.png"
              alt="XPAV Expert'Ease"
              className="max-h-14 sm:max-h-16 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Stifel (Red/Blue Diamond S Logo) */}
          <div style={{ backgroundColor: "#ffffff" }} className="border border-neutral-200 dark:border-neutral-300 rounded-xl h-28 sm:h-32 flex items-center justify-center p-5 shadow-2xs hover:shadow-sm transition-all duration-300 group">
            <img
              src="/sponsors/2026/stifel.svg"
              alt="Stifel"
              className="max-h-14 sm:max-h-16 w-auto object-contain"
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
