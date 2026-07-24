"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type TierKey = "PLATINUM" | "GOLD" | "SILVER" | "COPPER" | "MEDIA";

const tiers: TierKey[] = ["PLATINUM", "GOLD", "SILVER", "COPPER", "MEDIA"];

const partnerData: Record<TierKey, string[]> = {
  PLATINUM: [
    "/sponsors/2026/mining_discovery.webp",
    "/sponsers/Platinum%20Partners/5.png",
    "/sponsers/Platinum%20Partners/7.png",
    "/sponsers/Platinum%20Partners/8.png",
    "/sponsers/Platinum%20Partners/9.png",
    "/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png",
  ],
  GOLD: [
    "/sponsers/Gold%20Partners/1.pdf%20(1).png",
    "/sponsers/Gold%20Partners/1.pdf.png",
    "/sponsers/Gold%20Partners/12%20(1).png",
    "/sponsers/Gold%20Partners/peartree.8c0c95cff01a.png",
    "/sponsers/Gold%20Partners/SPONSORS%2B04.09.26%2B(1).pdf.png",
  ],
  SILVER: [
    "/sponsers/Silver%20Partners/12.png",
    "/sponsers/Silver%20Partners/12%20(2).png",
    "/sponsers/Silver%20Partners/12%20(3).png",
    "/sponsers/Silver%20Partners/12%20(4).png",
    "/sponsers/Silver%20Partners/12%20(7).png",
    "/sponsers/Silver%20Partners/12%20(8).png",
    "/sponsers/Silver%20Partners/12%20(9).png",
    "/sponsers/Silver%20Partners/12%20(10).png",
    "/sponsers/Silver%20Partners/3.png",
    "/sponsers/Silver%20Partners/642e8adf6f6728bf086ca90e_logo.svg",
    "/sponsers/Silver%20Partners/790205.avif",
  ],
  COPPER: [
    "/sponsers/Copper%20Partners/11.png",
    "/sponsers/Copper%20Partners/12.png",
    "/sponsers/Copper%20Partners/13.png",
    "/sponsers/Copper%20Partners/14.png",
    "/sponsers/Copper%20Partners/15.png",
    "/sponsers/Copper%20Partners/16.png",
    "/sponsers/Copper%20Partners/17.png",
    "/sponsers/Copper%20Partners/18.png",
    "/sponsers/Copper%20Partners/19.png",
    "/sponsers/Copper%20Partners/20.png",
    "/sponsers/Copper%20Partners/21.png",
    "/sponsers/Copper%20Partners/22.png",
  ],
  MEDIA: [
    "/sponsers/Media%20Partners/1.pdf.png",
    "/sponsers/Media%20Partners/24.png",
    "/sponsers/Media%20Partners/25.png",
    "/sponsers/Media%20Partners/26.png",
    "/sponsers/Media%20Partners/27.png",
    "/sponsers/Media%20Partners/28.png",
    "/sponsers/Media%20Partners/29.png",
    "/sponsers/Media%20Partners/30.png",
    "/sponsers/Media%20Partners/31.png",
    "/sponsers/Media%20Partners/32.png",
    "/sponsers/Media%20Partners/33.png",
    "/sponsers/Media%20Partners/34.png",
    "/sponsers/Media%20Partners/35.png",
    "/sponsers/Media%20Partners/36.png",
    "/sponsers/Media%20Partners/37.png",
    "/sponsers/Media%20Partners/39.png",
    "/sponsers/Media%20Partners/40.png",
    "/sponsers/Media%20Partners/41.png",
    "/sponsers/Media%20Partners/42.png",
    "/sponsers/Media%20Partners/43.png",
    "/sponsers/Media%20Partners/44.png",
    "/sponsers/Media%20Partners/45.png",
  ],
};

export default function FeaturedPartners() {
  const { t } = useLanguage();
  const [activeTier, setActiveTier] = useState<TierKey>("PLATINUM");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentLogos = partnerData[activeTier];

  // Repeat items to allow smooth continuous loop sliding
  const displayLogos = [...currentLogos, ...currentLogos, ...currentLogos];

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
    <section className="relative w-full bg-[#f0f4f8] py-16 sm:py-20 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
            {t("partners-tag", "FEATURED")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
            {t("partners-title", "Featured Partners")} <span className="capitalize">({activeTier.toLowerCase()})</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mb-6" />
          <p className="text-neutral-600 text-xs sm:text-sm max-w-[540px] mx-auto leading-relaxed font-medium">
            {t("partners-sub", "A spotlight on the partners powering THE Mining Investment Event. Switch tiers to explore each circle of supporters.")}
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
                className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#C6112F] text-white shadow-md scale-105"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/80 shadow-2xs"
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
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C6112F] bg-white flex items-center justify-center text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all shrink-0 shadow-md cursor-pointer z-30"
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
                    className={`shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(20%-1rem)] rounded-2xl bg-white flex items-center justify-center p-4 transition-all duration-500 transform ${
                      isCenter
                        ? "h-32 sm:h-36 border-2 border-[#C6112F] shadow-none scale-105 z-20"
                        : "h-26 sm:h-28 border border-neutral-200/80 shadow-none opacity-90 hover:opacity-100"
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
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C6112F] bg-white flex items-center justify-center text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all shrink-0 shadow-md cursor-pointer z-30"
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
