"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

type TierKey = "ALL" | "GOLD" | "PLATINUM" | "SILVER" | "COPPER" | "MEDIA";

const tiers: TierKey[] = ["ALL", "GOLD", "PLATINUM", "SILVER", "COPPER", "MEDIA"];

interface PartnerItem {
  name: string;
  logo: string;
  isTbd?: boolean;
}

const partnerData: Record<Exclude<TierKey, "ALL">, PartnerItem[]> = {
  GOLD: [
    { name: "Altitude Capital Partners", logo: "/altitude.png" },
    { name: "THE MONEY CHANNEL NEW YORK CITY", logo: "/sponsors/2026/the_money_channel_new_york_city.png" },
    { name: "MAXIT Capital", logo: "/sponsors/2026/maxit_capital.png", isTbd: true },
    { name: "PearTree Canada", logo: "/peartree_0c7d9a1777.png", isTbd: true },
    { name: "Epic Gold Corp", logo: "/sponsors/2026/epic_gold.webp" },
    { name: "Noble Capital Markets", logo: "/sponsors/2026/noble_capital.png" },
  ],
  PLATINUM: [
    { name: "Agnico Eagle", logo: "/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png" },
    { name: "Ventum Financial", logo: "/Ventum.webp" },
    { name: "Glencore", logo: "/sponsors/2026/glencore.svg" },
    { name: "National Bank Financial Markets", logo: "/sponsor image/logo-capitalmarkets.svg", isTbd: true },
  ],
  SILVER: [
    { name: "Canadian Securities Exchange (CSE)", logo: "/sponsors/2026/canadian_securities_exchange_cse.svg" },
    { name: "Caur Technologies", logo: "/43.png" },
    { name: "OR Royalties", logo: "/lorroyalties.svg" },
    { name: "Hatch", logo: "/sponsors/2026/hatch.png" },
    { name: "TMX Group / TSX", logo: "/sponsers/176.png" },
    { name: "Crux Investor", logo: "/sponsors/2026/crux_investor.svg" },
    { name: "Atrium Research", logo: "/sponsors/2026/atrium_research.png", isTbd: true },
    { name: "IAMGOLD", logo: "/sponsor image/IAMGOLD-Logo-N.png", isTbd: true },
    { name: "Government of Newfoundland & Labrador", logo: "/sponsors/2026/government_of_newfoundland_labrador.svg", isTbd: true },
    { name: "Red Cloud Securities", logo: "/sponsers/LOGOS Mining (3).png", isTbd: true },
    { name: "Stifel", logo: "/sponsors/2026/stifel.svg", isTbd: true },
  ],
  COPPER: [
    { name: "Outside the Box Capital", logo: "/sponsors/2026/outside_the_box_capital.png" },
    { name: "INFOR FINANCIAL INC.", logo: "/sponsor image/inforfg-logo-f.png", isTbd: true },
    { name: "Brooks & Nelson", logo: "/brooks-nelson.png" },
    { name: "La Caisse (CDPQ)", logo: "/sponsors/2026/la_caisse_cdpq.svg", isTbd: true },
    { name: "Apaton Finance", logo: "/apaton-finance-logo.svg", isTbd: true },
    { name: "VRIFY", logo: "/sponsors/2026/40.png", isTbd: true },
    { name: "Cassels", logo: "/sponsers/cassels.svg", isTbd: true },
    { name: "MNP", logo: "/139.png", isTbd: true },
    { name: "Velocity Trade", logo: "/151.png", isTbd: true },
    { name: "Mercury Group", logo: "/sponsers/38.png" },
    { name: "Alliance Global Partners (AGP/ADP)", logo: "/agp.webp", isTbd: true },
    { name: "Nebari Partners", logo: "/sponsors/2026/nebari.png" },
    { name: "Maxum", logo: "/sponsors/2026/maxum.svg", isTbd: true },
  ],
  MEDIA: [
    { name: "Newsfile", logo: "/sponsors/2026/newsfile.png" },
    { name: "Mining Discovery", logo: "/sponsors/2026/mining_discovery.webp" },
    { name: "Canadian Mining Magazine", logo: "/sponsers/137.png", isTbd: true },
    { name: "RefinedSubstance", logo: "/sponsers/Refined-Substance-Logo2.png" },
    { name: "Mining Hub", logo: "/sponsors/2026/mining_hub.svg", isTbd: true },
    { name: "Independent Trading Group (ITG)", logo: "/sponsers/itg.png", isTbd: true },
    { name: "DEL Communications", logo: "/sponsors/2026/del_communications.png", isTbd: true },
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
    const list = baseLogos.filter((item) => Boolean(item && item.logo));
    if (list.length === 0) return { marqueeLogos: [], duration: 30 };

    // Build Set A with at least 16 items so it comfortably exceeds any screen width
    let setA: PartnerItem[] = [];
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
            {t("partners-title", "2027 Featured Partners")}{" "}
            {activeTier !== "ALL" && (
              <span className="capitalize">({activeTier.toLowerCase()})</span>
            )}
          </h2>
          <div className="w-16 h-1 bg-[#C6112F] mx-auto mb-4 rounded-full" />
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 dark:text-slate-400 font-medium leading-relaxed">
            {t(
              "partners-sub",
              "A spotlight on the partners powering THE Mining Investment Event. Switch tiers to explore each circle of supporters."
            )}
          </p>
        </div>

        {/* Tier Selector Tabs Bar (Ordered: ALL, GOLD, PLATINUM, SILVER, COPPER, MEDIA) */}
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
                {tier === "ALL" ? t("news-filter-all", "ALL") : tier}
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
          {marqueeLogos.map((item, idx) => (
            <div
              key={`${item.logo}-${idx}`}
              style={{ backgroundColor: "#ffffff" }}
              title={item.isTbd ? `${item.name} (TBD)` : item.name}
              className="shrink-0 w-44 sm:w-52 md:w-56 h-24 sm:h-28 rounded-2xl flex items-center justify-center p-4 border border-neutral-200/90 dark:border-neutral-300/40 shadow-xs hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.logo}
                alt={item.name}
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
