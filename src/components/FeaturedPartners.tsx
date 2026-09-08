"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type TierKey = "PLATINUM" | "GOLD" | "SILVER" | "COPPER" | "MEDIA";

const tiers: TierKey[] = ["PLATINUM", "GOLD", "SILVER", "COPPER", "MEDIA"];

const partnerData: Record<TierKey, string[]> = {
  PLATINUM: [
    "/sponsors/2026/glencore.svg",
    "/sponsor image/logo-capitalmarkets.svg",
    "/Ventum.webp",
    "/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png",
  ],
  GOLD: [
    "/altitude.png",
    "/Invest_Yukon.png",
    "/LOGOS Mining (10).png",
    "/sponsors/2026/maxit_capital.png",
    "/peartree_0c7d9a1777.png",
    "/sponsors/2026/the_money_channel_new_york_city.png",
  ],
  SILVER: [
    "/sponsors/2026/atrium_research.png",
    "/sponsors/2026/canadian_securities_exchange_cse.svg",
    "/43.png",
    "/sponsors/2026/crux_investor.svg",
    "/sponsors/2026/hatch.png",
    "/sponsor image/IAMGOLD-Logo-N.png",
    "/sponsors/2026/government_of_newfoundland_labrador.svg",
    "/lorroyalties.svg",
    "/sponsers/LOGOS Mining (3).png",
    "/sponsors/2026/stifel.svg",
    "/sponsers/176.png",
  ],
  COPPER: [
    "/agp.webp",
    "/apaton-finance-logo.svg",
    "/brooks-nelson.png",
    "/sponsers/128.png",
    "/sponsers/cassels.svg",
    "/sponsers/center.svg",
    "/sponsor image/inforfg-logo-f.png",
    "/sponsors/2026/la_caisse_cdpq.svg",
    "/139.png",
    "/sponsers/38.png",
    "/sponsers/pal_airlines.svg",
    "/sponsors/2026/outside_the_box_capital.png",
    "/151.png",
    "/sponsors/2026/40.png",
  ],
  MEDIA: [
    "/sponsors/2026/mining_discovery.webp",
    "/btv.png",
    "/ceo_ca.png",
    "/cmj.png",
    "/sponsers/150.png",
    "/sponsers/itg.png",
    "/134.png",
    "/sponsors/2026/sponsor_media_20.png",
    "/sponsers/157.png",
    "/sponsor image/ibn.svg",
    "/gbr.webp",
    "/sponsors/2026/newsfile.png",
    "/sponsors/2026/the_prospector_news.png",
    "/tnm.png",
  ],
};

export default function FeaturedPartners() {
  const { t } = useLanguage();
  const [activeTier, setActiveTier] = useState<TierKey>("PLATINUM");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentLogos = (partnerData[activeTier] || []).filter(Boolean);

  // Ensure displayLogos has enough items to fill the viewport track completely
  let displayLogos: string[] = [];
  if (currentLogos.length > 0) {
    while (displayLogos.length < 20) {
      displayLogos = [...displayLogos, ...currentLogos];
    }
  }

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentLogos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, currentLogos.length, activeTier]);

  const handleTabChange = (tier: TierKey) => {
    setActiveTier(tier);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? currentLogos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentLogos.length);
  };

  return (
    <section className="relative w-full bg-[#f0f4f8] dark:bg-[#090d16] py-12 sm:py-14 md:py-16 overflow-hidden transition-colors duration-300">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
            {t("partners-tag", "FEATURED")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3">
            {t("partners-title", "Featured Partners")} <span className="capitalize">({activeTier.toLowerCase()})</span>
          </h2>
          <div className="w-16 h-1 bg-[#C6112F] mx-auto mb-4 rounded-full" />
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 dark:text-slate-400 font-medium leading-relaxed">
            {t(
              "partners-desc",
              "A spotlight on the partners powering THE Mining Investment Event. Switch tiers to explore each circle of supporters."
            )}
          </p>
        </div>

        {/* Tier Selector Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          {tiers.map((tier) => {
            const isActive = tier === activeTier;
            return (
              <button
                key={tier}
                onClick={() => handleTabChange(tier)}
                className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${isActive
                  ? "bg-[#C6112F] text-white shadow-md scale-105"
                  : "bg-white dark:bg-[#131b2e] text-neutral-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-[#1e293b] hover:text-neutral-900 dark:hover:text-white border border-neutral-200/80 dark:border-[#233049] shadow-2xs"
                  }`}
              >
                {tier}
              </button>
            );
          })}
        </div>

        {/* Partner Logos Physical Track Slider Row */}
        <div
          className="relative flex items-center gap-4 sm:gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Carousel Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous partner"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C6112F] bg-white dark:bg-[#131b2e] flex items-center justify-center text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all shrink-0 shadow-md cursor-pointer z-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Viewport Mask for 5 Card Display */}
          <div className="w-full overflow-hidden py-4 px-1">
            <div
              className="flex items-center gap-4 sm:gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% / 5 + 1rem)))`,
              }}
            >
              {displayLogos.map((logoPath, idx) => {
                const relativeIndex = (idx - currentIndex + displayLogos.length) % currentLogos.length;
                const isCenter = relativeIndex === 2;
                return (
                  <div
                    key={`${logoPath}-${idx}`}
                    style={{ backgroundColor: "#ffffff" }}
                    className={`shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(20%-1rem)] rounded-2xl flex items-center justify-center p-4 transition-all duration-500 transform ${isCenter
                      ? "h-32 sm:h-36 border-2 border-[#C6112F] scale-105 z-20"
                      : "h-26 sm:h-28 border border-neutral-200 dark:border-neutral-300 opacity-95 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={logoPath}
                      alt={`${activeTier} Partner Logo ${idx + 1}`}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-108"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Carousel Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next partner"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C6112F] bg-white dark:bg-[#131b2e] flex items-center justify-center text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all shrink-0 shadow-md cursor-pointer z-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
