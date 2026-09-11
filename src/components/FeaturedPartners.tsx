"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

type TierKey = "ALL" | "PLATINUM" | "GOLD" | "SILVER" | "COPPER" | "MEDIA";

const tiers: TierKey[] = ["ALL", "PLATINUM", "GOLD", "SILVER", "COPPER", "MEDIA"];

const partnerData: Record<Exclude<TierKey, "ALL">, string[]> = {
  PLATINUM: [
    "/sponsors/2026/glencore.svg",
    "/sponsor image/logo-capitalmarkets.svg",
    "/Ventum.webp",
    "/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png",
  ],
  GOLD: [
    "/altitude.png",
    "/Invest_Yukon.png",
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
    "/sponsers/137.png",
    "/sponsers/150.png",
    "/sponsers/itg.png",
    "/134.png",
    "/sponsors/2026/sponsor_media_20.png",
    "/sponsers/157.png",
    "/ibn.png",
    "/sponsors/2026/sponsor_media_26.png",
    "/sponsors/2026/newsfile.png",
    "/pros.png",
    "/sponsors/2026/sponsor_media_54.png",
  ],
};

export default function FeaturedPartners() {
  const { t } = useLanguage();
  const [activeTier, setActiveTier] = useState<TierKey>("ALL");

  const baseLogos = useMemo(() => {
    if (activeTier === "ALL") {
      return Object.values(partnerData).flat();
    }
    return partnerData[activeTier] || [];
  }, [activeTier]);

  const { marqueeLogos, duration } = useMemo(() => {
    const list = baseLogos.filter(Boolean);
    if (list.length === 0) return { marqueeLogos: [], duration: 30 };

    // Build Set A with at least 16 items so it comfortably exceeds any screen width
    let setA: string[] = [];
    while (setA.length < 16) {
      setA = [...setA, ...list];
    }

    // Duplicate Set A to create seamless infinite loop [Set A, Set A]
    const fullTrack = [...setA, ...setA];
    // Smooth, elegant rolling speed (~2.2s per card, minimum 26s)
    const dur = Math.max(26, Math.round(setA.length * 2.2));

    return { marqueeLogos: fullTrack, duration: dur };
  }, [baseLogos]);

  const handleTabChange = (tier: TierKey) => {
    setActiveTier(tier);
  };

  return (
    <section
      id="home-content"
      className="relative w-full bg-[#f0f4f8] dark:bg-[#090d16] py-12 sm:py-14 md:py-16 overflow-hidden transition-colors duration-300"
    >
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      {/* Edge Gradient Vignette Overlays for smooth entry/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#f0f4f8] dark:from-[#090d16] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#f0f4f8] dark:from-[#090d16] to-transparent z-10" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
            {t("partners-tag", "FEATURED")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3">
            {t("partners-title", "Featured Partners")}{" "}
            {activeTier !== "ALL" && (
              <span className="capitalize">({activeTier.toLowerCase()})</span>
            )}
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
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 relative z-20">
          {tiers.map((tier) => {
            const isActive = tier === activeTier;
            return (
              <button
                key={tier}
                onClick={() => handleTabChange(tier)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#C6112F] text-white shadow-md scale-105"
                    : "bg-white dark:bg-[#131b2e] text-neutral-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-[#1e293b] hover:text-neutral-900 dark:hover:text-white border border-neutral-200/80 dark:border-[#233049] shadow-2xs"
                }`}
              >
                {tier}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continually Rolling Sponsors Marquee Track */}
      <div className="sponsor-marquee-container relative w-full overflow-hidden py-3">
        <div
          key={activeTier}
          className="animate-sponsor-roll flex items-center gap-4 sm:gap-6"
          style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        >
          {marqueeLogos.map((logoPath, idx) => (
            <div
              key={`${logoPath}-${idx}`}
              style={{ backgroundColor: "#ffffff" }}
              className="shrink-0 w-44 sm:w-52 md:w-56 h-24 sm:h-28 rounded-2xl flex items-center justify-center p-4 border border-neutral-200/90 dark:border-neutral-300/40 shadow-xs hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={logoPath}
                alt={`Partner Logo ${idx + 1}`}
                loading="lazy"
                className="max-h-full max-w-full object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
