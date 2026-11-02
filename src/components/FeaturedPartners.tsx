"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

type TierKey = "ALL" | "GOLD" | "PLATINUM" | "SILVER" | "COPPER" | "MEDIA";

const tiers: TierKey[] = ["ALL", "GOLD", "PLATINUM", "SILVER", "COPPER", "MEDIA"];

interface PartnerItem {
  name: string;
  logo: string;
  isTbd?: boolean;
  aspect?: "wide" | "square" | "standard";
}

const partnerData: Record<Exclude<TierKey, "ALL">, PartnerItem[]> = {
  GOLD: [
    { name: "Agnico Eagle", logo: "/sponsors/trimmed/agnico_eagle.png", aspect: "standard" },
    { name: "Ventum Financial", logo: "/sponsors/trimmed/ventum_financial.png", aspect: "standard" },
    { name: "Glencore", logo: "/sponsors/trimmed/glencore.png", aspect: "wide" },
    { name: "National Bank Financial Markets", logo: "/sponsors/trimmed/national_bank_financial_markets.png", aspect: "standard", isTbd: true },
  ],
  PLATINUM: [
    { name: "Altitude Capital Partners", logo: "/sponsors/trimmed/altitude_capital_partners.png", aspect: "square" },
    { name: "THE MONEY CHANNEL NEW YORK CITY", logo: "/sponsors/trimmed/the_money_channel_new_york_city.png", aspect: "standard" },
    { name: "MAXIT Capital", logo: "/sponsors/trimmed/maxit_capital.png", aspect: "standard", isTbd: true },
    { name: "Hatch", logo: "/sponsors/trimmed/hatch.png", aspect: "wide" },
    { name: "PearTree Canada", logo: "/sponsors/trimmed/peartree_canada.png", aspect: "wide", isTbd: true },
  ],
  SILVER: [
    { name: "Canadian Securities Exchange (CSE)", logo: "/sponsors/trimmed/canadian_securities_exchange_cse_.png", aspect: "wide" },
    { name: "Caur Technologies", logo: "/sponsors/trimmed/caur_technologies.png", aspect: "standard" },
    { name: "OR Royalties", logo: "/sponsors/trimmed/or_royalties.png", aspect: "standard" },
    { name: "TMX Group / TSX", logo: "/sponsors/trimmed/tmx_group_tsx.png", aspect: "standard" },
    { name: "Crux Investor", logo: "/sponsors/trimmed/crux_investor.png", aspect: "wide" },
    { name: "Epic Gold Corp", logo: "/sponsors/trimmed/epic_gold_corp.png", aspect: "square" },
    { name: "Nebari Partners", logo: "/sponsors/trimmed/nebari_partners.png", aspect: "wide" },
    { name: "Noble Capital Markets", logo: "/sponsors/trimmed/noble_capital_markets.png", aspect: "wide" },
    { name: "Atrium Research", logo: "/sponsors/trimmed/atrium_research.png", aspect: "standard", isTbd: true },
    { name: "IAMGOLD", logo: "/sponsors/trimmed/iamgold.png", aspect: "wide", isTbd: true },
    { name: "Government of Newfoundland & Labrador", logo: "/sponsors/trimmed/government_of_newfoundland_labrador.png", aspect: "standard", isTbd: true },
    { name: "Red Cloud Securities", logo: "/sponsors/trimmed/red_cloud_securities.png", aspect: "wide", isTbd: true },
    { name: "Stifel", logo: "/sponsors/trimmed/stifel.png", aspect: "standard", isTbd: true },
    { name: "Alliance Global Partners (AGP/ADP)", logo: "/sponsors/trimmed/alliance_global_partners_agp_adp_.png", aspect: "standard", isTbd: true },
    { name: "Maxum", logo: "/sponsors/trimmed/maxum.png", aspect: "wide", isTbd: true },
  ],
  COPPER: [
    { name: "Outside the Box Capital", logo: "/sponsors/trimmed/outside_the_box_capital.png", aspect: "square" },
    { name: "INFOR FINANCIAL INC.", logo: "/sponsors/trimmed/infor_financial_inc_.png", aspect: "wide", isTbd: true },
    { name: "Brooks & Nelson", logo: "/sponsors/trimmed/brooks_nelson.png", aspect: "wide" },
    { name: "La Caisse (CDPQ)", logo: "/sponsors/trimmed/la_caisse_cdpq_.png", aspect: "wide", isTbd: true },
    { name: "Apaton Finance", logo: "/sponsors/trimmed/apaton_finance.png", aspect: "standard", isTbd: true },
    { name: "VRIFY", logo: "/sponsors/trimmed/vrify.png", aspect: "wide", isTbd: true },
    { name: "Cassels", logo: "/sponsors/trimmed/cassels.png", aspect: "wide", isTbd: true },
    { name: "MNP", logo: "/sponsors/trimmed/mnp.png", aspect: "standard", isTbd: true },
    { name: "Velocity Trade", logo: "/sponsors/trimmed/velocity_trade.png", aspect: "standard", isTbd: true },
    { name: "Independent Trading Group (ITG)", logo: "/sponsors/trimmed/independent_trading_group_itg_.png", aspect: "wide", isTbd: true },
    { name: "Mercury Group", logo: "/sponsors/trimmed/mercury_group.png", aspect: "standard" },
  ],
  MEDIA: [
    { name: "Newsfile", logo: "/sponsors/trimmed/newsfile.png", aspect: "square" },
    { name: "Mining Discovery", logo: "/sponsors/trimmed/mining_discovery.png", aspect: "standard" },
    { name: "Canadian Mining Magazine", logo: "/sponsors/trimmed/canadian_mining_magazine.png", aspect: "standard", isTbd: true },
    { name: "RefinedSubstance", logo: "/sponsors/trimmed/refinedsubstance.png", aspect: "wide" },
    { name: "Mining Hub", logo: "/sponsors/trimmed/mining_hub.png", aspect: "square", isTbd: true },
    { name: "DEL Communications", logo: "/sponsors/trimmed/del_communications.png", aspect: "square", isTbd: true },
  ],
};

// Uniform identical dimensions across ALL logo cards
const UNIFORM_CARD_CLASS =
  "shrink-0 w-48 sm:w-52 md:w-56 h-24 sm:h-[104px] md:h-28 !bg-white rounded-2xl flex items-center justify-center p-3 sm:p-3.5 md:p-4 border border-neutral-200/90 dark:border-neutral-300/40 shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300 relative group cursor-pointer";

const getLogoClass = (aspect?: "wide" | "square" | "standard", name?: string) => {
  if (name === "Altitude Capital Partners" || name === "Mining Hub") {
    return "w-auto max-w-[88%] sm:max-w-[90%] max-h-[74px] sm:max-h-[82px] md:max-h-[88px] object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105";
  }
  if (aspect === "square") {
    return "w-auto max-w-[80%] sm:max-w-[84%] max-h-[70px] sm:max-h-[78px] md:max-h-[84px] object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105";
  }
  if (aspect === "wide") {
    return "w-auto max-w-[88%] sm:max-w-[90%] max-h-10 sm:max-h-12 md:max-h-[50px] object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105";
  }
  return "w-auto max-w-[82%] sm:max-w-[85%] max-h-12 sm:max-h-14 md:max-h-[58px] object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105";
};

export default function FeaturedPartners() {
  const { t } = useLanguage();
  const [activeTier, setActiveTier] = useState<TierKey>("ALL");

  const currentLogos = useMemo(() => {
    if (activeTier === "ALL") {
      // Hierarchical order: Gold -> Platinum -> Silver -> Copper -> Media
      return [
        ...partnerData.GOLD,
        ...partnerData.PLATINUM,
        ...partnerData.SILVER,
        ...partnerData.COPPER,
        ...partnerData.MEDIA,
      ];
    }
    return partnerData[activeTier] || [];
  }, [activeTier]);

  /** Build an infinite seamless sliding loop track in ONE single row */
  const { marqueeTrack, duration } = useMemo(() => {
    if (currentLogos.length === 0) return { marqueeTrack: [], duration: 30 };

    let setA: PartnerItem[] = [];
    while (setA.length < 16) {
      setA = [...setA, ...currentLogos];
    }
    const fullTrack = [...setA, ...setA];
    // Scale duration so sliding speed feels consistent
    const duration = Math.max(30, Math.round(setA.length * 2.3));
    return { marqueeTrack: fullTrack, duration };
  }, [currentLogos]);

  return (
    <section
      id="home-content"
      className="relative w-full bg-[#f0f4f8] dark:bg-[#090d16] py-14 sm:py-16 md:py-20 overflow-hidden transition-colors duration-300"
    >
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
            {t("partners-tag", "FEATURED")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3">
            {t("partners-title", "2027 Featured Partners")}
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
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12 relative z-20">
          {tiers.map((tier) => {
            const isActive = tier === activeTier;
            return (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
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

      {/* ═══════════════ ONE SINGLE SLIDER ROW ═══════════════ */}
      <div className="w-full">
        <div className="sponsor-marquee-container relative w-full overflow-hidden py-2">
          {/* Edge Vignette Overlays for smooth entry/exit */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#f0f4f8] dark:from-[#090d16] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#f0f4f8] dark:from-[#090d16] to-transparent z-10" />

          <div
            key={activeTier}
            className="animate-sponsor-roll flex items-center gap-4 sm:gap-5 md:gap-6"
            style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
          >
            {marqueeTrack.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                style={{ backgroundColor: "#ffffff" }}
                title={item.name}
                className={UNIFORM_CARD_CLASS}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  loading="lazy"
                  className={getLogoClass(item.aspect, item.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
