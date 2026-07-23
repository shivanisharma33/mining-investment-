"use client";

import React, { useState, useMemo } from "react";

export interface SponsorItem {
  name: string;
  website: string;
  image?: string;
  tier: "presenting" | "platinum" | "gold" | "silver" | "copper" | "media" | "government" | "green" | "sustainable";
}

const SPONSORS_2026: SponsorItem[] = [
  // Platinum Partners
  {
    name: "Glencore",
    website: "https://www.glencore.com",
    tier: "platinum",
    image: "/sponsors/2026/glencore.svg",
  },
  {
    name: "National Bank Financial Markets",
    website: "https://nbfm.ca",
    tier: "platinum",
    image: "/sponsor image/logo-capitalmarkets.svg",
  },
  {
    name: "Ventum Financial",
    website: "https://ventumfinancial.com",
    tier: "platinum",
    image: "/sponsors/2026/ventum_financial.png",
  },
  {
    name: "Agnico Eagle",
    website: "https://www.agnicoeagle.com",
    tier: "platinum",
    image: "/sponsors/2026/agnico_eagle.ico",
  },
  // Gold Partners
  {
    name: "Altitude Capital Partners",
    website: "https://altitudecapitalpartners.ca/",
    tier: "gold",
    image: "/altitude.png",
  },
  {
    name: "Invest Yukon",
    website: "https://investyukon.ca",
    tier: "gold",
    image: "/Invest_Yukon.png",
  },
  {
    name: "MAXIT Capital",
    website: "https://www.maxitcapital.com/",
    tier: "gold",
  },
  {
    name: "PearTree Canada",
    website: "https://peartreecanada.com",
    tier: "gold",
    image: "/sponsors/2026/peartree_canada.png",
  },
  {
    name: "THE MONEY CHANNEL NEW YORK CITY",
    website: "https://www.moneychannelnyc.com/",
    tier: "gold",
    image: "/sponsors/2026/the_money_channel_new_york_city.svg",
  },
  // Silver Partners
  {
    name: "Atrium Research",
    website: "https://atriumresearch.ca",
    tier: "silver",
    image: "/sponsors/2026/atrium_research.ico",
  },
  {
    name: "Canadian Securities Exchange (CSE)",
    website: "https://thecse.com",
    tier: "silver",
    image: "/sponsors/2026/canadian_securities_exchange_cse.png",
  },
  {
    name: "Caur Technologies",
    website: "https://caur.ca",
    tier: "silver",
    image: "/sponsor image/cour.jpg",
  },
  {
    name: "Crux Investor",
    website: "https://cruxinvestor.com",
    tier: "silver",
    image: "/sponsors/2026/crux_investor.svg",
  },
  {
    name: "Hatch",
    website: "https://www.hatch.com",
    tier: "silver",
    image: "/sponsors/2026/hatch.png",
  },
  {
    name: "IAMGOLD",
    website: "https://www.iamgold.com",
    tier: "silver",
    image: "/sponsor image/IAMGOLD-Logo-N.png",
  },
  {
    name: "Government of Newfoundland & Labrador",
    website: "https://www.gov.nl.ca",
    tier: "silver",
    image: "/sponsors/2026/government_of_newfoundland_labrador.svg",
  },
  {
    name: "North American Niobium",
    website: "https://northamericanniobium.com",
    tier: "silver",
    image: "/sponsors/2026/north_american_niobium.png",
  },
  {
    name: "OR Royalties (Osisko Royalties)",
    website: "https://osiskogr.com",
    tier: "silver",
    image: "/sponsors/2026/or_royalties_osisko_royalties.svg",
  },
  {
    name: "Red Cloud Securities",
    website: "https://redcloudfs.com",
    tier: "silver",
    image: "/sponsors/2026/red_cloud_securities.png",
  },
  {
    name: "Stifel",
    website: "https://www.stifel.com",
    tier: "silver",
    image: "/sponsors/2026/stifel.svg",
  },
  {
    name: "TMX Group",
    website: "https://www.tmx.com",
    tier: "silver",
    image: "/sponsors/2026/tmx_group.png",
  },
  // Copper Partners
  {
    name: "Alliance Global Partners",
    website: "https://allianceg.com",
    tier: "copper",
    image: "/sponsors/2026/alliance_global_partners.ico",
  },
  {
    name: "Apaton Finance",
    website: "https://apatonfinance.com",
    tier: "copper",
    image: "/sponsors/2026/apaton_finance.ico",
  },
  {
    name: "Brooks & Nelson",
    website: "https://brooksandnelson.com",
    tier: "copper",
    image: "/sponsors/2026/brooks_nelson.png",
  },
  {
    name: "Cassels",
    website: "https://cassels.com",
    tier: "copper",
    image: "/sponsors/2026/cassels.ico",
  },
  {
    name: "Centre des congrès de Québec",
    website: "https://www.convention.qc.ca",
    tier: "copper",
    image: "/sponsors/2026/centre_des_congr_s_de_qu_bec.png",
  },
  {
    name: "INFOR FINANCIAL INC.",
    website: "https://inforfg.com/",
    tier: "copper",
    image: "/sponsor image/inforfg-logo-f.png",
  },
  {
    name: "La Caisse (CDPQ)",
    website: "https://www.cdpq.com",
    tier: "copper",
    image: "/sponsors/2026/la_caisse_cdpq.svg",
  },
  {
    name: "MNP",
    website: "https://www.mnp.ca",
    tier: "copper",
  },
  {
    name: "Mercury Group",
    website: "https://mercurygroup.ca",
    tier: "copper",
    image: "/sponsors/2026/mercury_group.png",
  },
  {
    name: "PAL Airlines",
    website: "https://www.palairlines.ca",
    tier: "copper",
    image: "/sponsors/2026/pal_airlines.png",
  },
  {
    name: "Outside the Box Capital",
    website: "https://outsidethebox.capital",
    tier: "copper",
    image: "/sponsors/2026/outside_the_box_capital.png",
  },
  {
    name: "Velocity Trade",
    website: "https://velocitytrade.com",
    tier: "copper",
    image: "/sponsors/2026/velocity_trade.png",
  },
  {
    name: "VRIFY",
    website: "https://vrify.com",
    tier: "copper",
    image: "/sponsors/2026/vrify.png",
  },
  // Media & Partners
  {
    name: "B Tv",
    website: "https://www.b-tv.com/",
    tier: "media",
  },
  {
    name: "Canadian Mining Journal",
    website: "https://www.canadianminingjournal.com",
    tier: "media",
    image: "/sponsors/2026/canadian_mining_journal.png",
  },
  {
    name: "CEO.CA",
    website: "https://ceo.ca",
    tier: "media",
    image: "/sponsors/2026/ceo_ca.png",
  },
  {
    name: "GBR (Global Business Reports)",
    website: "https://www.gbreports.com",
    tier: "media",
    image: "/sponsors/2026/gbr_global_business_reports.ico",
  },
  {
    name: "ITG (Investment Technology Group)",
    website: "https://itg.com",
    tier: "media",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/befa98c2-1fed-4ebe-861f-0f70e03f5f92/Independent_Trading_Group__ITG___Inc__Independent_Trading_Group.jpg?format=750w",
  },
  {
    name: "Launch Pad Productions",
    website: "https://www.launchpadproductions.ca/",
    tier: "media",
  },
  {
    name: "MiningIR",
    website: "https://miningir.com",
    tier: "media",
    image: "/sponsors/2026/miningir.png",
  },
  {
    name: "InvestorBrandNetwork (IBN)",
    website: "https://www.ibn.fm",
    tier: "media",
    image: "/sponsors/2026/investorbrandnetwork_ibn.svg",
  },
  {
    name: "Mining Discovery",
    website: "https://miningdiscovery.com",
    tier: "media",
    image: "/sponsors/2026/mining_discovery.webp",
  },
  {
    name: "Mining Hub",
    website: "https://mininghub.com",
    tier: "media",
    image: "/sponsors/2026/mining_hub.svg",
  },
  {
    name: "Newsfile",
    website: "https://www.newsfilecorp.com",
    tier: "media",
    image: "/sponsors/2026/newsfile.png",
  },
  {
    name: "Market One Media",
    website: "https://www.marketonemedia.com",
    tier: "media",
  },
  {
    name: "Podcast Miner",
    website: "https://podcastminer.com",
    tier: "media",
  },
  {
    name: "NP Promotion",
    website: "https://nppromo.ca/",
    tier: "media",
  },
  {
    name: "RCTV",
    website: "https://rctv.ca",
    tier: "media",
  },
  {
    name: "Refined Substance",
    website: "https://refinedsubstance.com",
    tier: "media",
    image: "/sponsors/2026/refined_substance.png",
  },
  {
    name: "The Northern Miner",
    website: "https://www.northernminer.com",
    tier: "media",
    image: "/sponsors/2026/the_northern_miner.png",
  },
  {
    name: "The Prospector News",
    website: "https://theprospectornews.com",
    tier: "media",
    image: "/sponsors/2026/the_prospector_news.png",
  },
  {
    name: "Resource World Magazine",
    website: "https://resourceworld.com",
    tier: "media",
    image: "/sponsors/2026/resource_world_magazine.ico",
  },
  {
    name: "XPAV Expert'Ease",
    website: "https://xpav.ca",
    tier: "media",
    image: "/sponsors/2026/xpav_expert_ease.png",
  },
  {
    name: "VID (Research and the Investor)",
    website: "https://vidconferences.com",
    tier: "media",
    image: "/sponsors/2026/vid_research_and_the_investor.png",
  },
  // Special Participation
  {
    name: "Québec",
    website: "https://www.quebec.ca",
    tier: "government",
    image: "/sponsors/2026/qu_bec.png",
  },
];

const SPONSORS_2025: SponsorItem[] = [
  // Special Sponsor
  {
    name: "Government of Québec",
    website: "https://www.quebec.ca",
    tier: "government",
    image: "/sponsors/2026/qu_bec.png",
  },
  // Platinum Sponsors
  {
    name: "Laurentian Bank Securities",
    website: "https://www.lb-securities.ca",
    tier: "platinum",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7bef5867-7f22-43cd-92f1-87a63d2e7a20/Laurentian+Bank+Securities?format=750w",
  },
  {
    name: "National Bank Financial Markets",
    website: "https://nbfm.ca",
    tier: "platinum",
    image: "/sponsors/2026/national_bank_financial_markets.png",
  },
  // Gold Sponsors
  {
    name: "First Phosphate",
    website: "https://firstphosphate.com",
    tier: "gold",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/a2d714b0-76ef-43bb-8e49-da998a92f7c4/First+Phosphate+logo?format=750w",
  },
  {
    name: "Glencore",
    website: "https://www.glencore.com",
    tier: "gold",
    image: "/sponsors/2026/glencore.svg",
  },
  {
    name: "IBK Capital Corp.",
    website: "https://www.ibkcapital.com",
    tier: "gold",
  },
  // Green Sponsor
  {
    name: "Kinterra Capital",
    website: "https://kinterracapital.com",
    tier: "green",
  },
  // Sustainable Sponsor
  {
    name: "Osisko Gold Royalties",
    website: "https://osiskogr.com",
    tier: "sustainable",
    image: "/sponsors/2026/or_royalties_osisko_royalties.svg",
  },
  // Silver Sponsors
  {
    name: "Canadian Securities Exchange (CSE)",
    website: "https://thecse.com",
    tier: "silver",
    image: "/sponsors/2026/canadian_securities_exchange_cse.png",
  },
  {
    name: "Crux Investor",
    website: "https://cruxinvestor.com",
    tier: "silver",
    image: "/sponsors/2026/crux_investor.svg",
  },
  {
    name: "IR.INC Capital Market Advisory",
    website: "https://ir.inc",
    tier: "silver",
  },
  {
    name: "MI3 Financial Communications",
    website: "https://mi3financial.com",
    tier: "silver",
  },
  {
    name: "PearTree Financial",
    website: "https://www.peartreefinancial.com",
    tier: "silver",
    image: "/sponsors/2026/peartree_canada.png",
  },
  {
    name: "Stifel",
    website: "https://www.stifel.com",
    tier: "silver",
    image: "/sponsors/2026/stifel.svg",
  },
  {
    name: "VRIFY",
    website: "https://vrify.com",
    tier: "silver",
    image: "/sponsors/2026/vrify.png",
  },
  {
    name: "TMX Group",
    website: "https://www.tmx.com",
    tier: "silver",
    image: "/sponsors/2026/tmx_group.png",
  },
  // Copper Sponsors
  {
    name: "Alliance Advisors",
    website: "https://allianceadvisors.com",
    tier: "copper",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/0d7baea8-eb9b-4960-a83c-9daf1de7a223/Alliance+Advisors+Logo?format=750w",
  },
  {
    name: "Brooks & Nelson",
    website: "https://brooksandnelson.com",
    tier: "copper",
    image: "/sponsors/2026/brooks_nelson.png",
  },
  {
    name: "CDPQ",
    website: "https://www.cdpq.com",
    tier: "copper",
    image: "/sponsors/2026/la_caisse_cdpq.svg",
  },
  {
    name: "Cassels",
    website: "https://cassels.com",
    tier: "copper",
    image: "/sponsors/2026/cassels.ico",
  },
  {
    name: "Centre des congrès de Québec",
    website: "https://www.convention.qc.ca",
    tier: "copper",
    image: "/sponsors/2026/centre_des_congr_s_de_qu_bec.png",
  },
  {
    name: "Digbee",
    website: "https://digbee.com",
    tier: "copper",
  },
  {
    name: "Infor Financial",
    website: "https://inforfinancial.com",
    tier: "copper",
  },
  {
    name: "Outside the Box Capital",
    website: "https://outsidethebox.capital",
    tier: "copper",
    image: "/sponsors/2026/outside_the_box_capital.png",
  },
  // Media & Partners
  {
    name: "BTV – Business Television",
    website: "https://www.b-tv.com",
    tier: "media",
  },
  {
    name: "Canadian Mining Magazine",
    website: "https://canadianminingmagazine.com",
    tier: "media",
  },
  {
    name: "CEO.CA",
    website: "https://ceo.ca",
    tier: "media",
    image: "/sponsors/2026/ceo_ca.png",
  },
  {
    name: "Kitco News",
    website: "https://www.kitco.com",
    tier: "media",
  },
  {
    name: "Market One Media",
    website: "https://www.marketonemedia.com",
    tier: "media",
  },
  {
    name: "Junior Mining Hub",
    website: "https://juniormininghub.com",
    tier: "media",
  },
  {
    name: "Mining Discovery",
    website: "https://miningdiscovery.com",
    tier: "media",
    image: "/sponsors/2026/mining_discovery.webp",
  },
  {
    name: "Mining Network",
    website: "https://miningnetwork.com",
    tier: "media",
  },
  {
    name: "Mining IR",
    website: "https://miningir.com",
    tier: "media",
    image: "/sponsors/2026/miningir.png",
  },
  {
    name: "The Northern Miner",
    website: "https://www.northernminer.com",
    tier: "media",
    image: "/sponsors/2026/the_northern_miner.png",
  },
  {
    name: "Newsfile",
    website: "https://www.newsfilecorp.com",
    tier: "media",
    image: "/sponsors/2026/newsfile.png",
  },
  {
    name: "The Prospector News",
    website: "https://theprospectornews.com",
    tier: "media",
    image: "/sponsors/2026/the_prospector_news.png",
  },
  {
    name: "VID (Focused on the Investor)",
    website: "https://vidconferences.com",
    tier: "media",
    image: "/sponsors/2026/vid_research_and_the_investor.png",
  },
  {
    name: "Invercio",
    website: "https://invercio.com",
    tier: "media",
  },
];

const SPONSORS_2024: SponsorItem[] = [
  // Special Sponsor
  {
    name: "Government of Québec",
    website: "https://www.quebec.ca",
    tier: "government",
    image: "/sponsors/2026/qu_bec.png",
  },
  // Platinum Sponsors
  {
    name: "Laurentian Bank Securities",
    website: "https://www.lb-securities.ca",
    tier: "platinum",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7bef5867-7f22-43cd-92f1-87a63d2e7a20/Laurentian+Bank+Securities?format=750w",
  },
  {
    name: "National Bank Financial Markets",
    website: "https://nbfm.ca",
    tier: "platinum",
    image: "/sponsors/2026/national_bank_financial_markets.png",
  },
  // Gold Sponsors
  {
    name: "First Phosphate",
    website: "https://firstphosphate.com",
    tier: "gold",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/a2d714b0-76ef-43bb-8e49-da998a92f7c4/First+Phosphate+logo?format=750w",
  },
  {
    name: "Glencore",
    website: "https://www.glencore.com",
    tier: "gold",
    image: "/sponsors/2026/glencore.svg",
  },
  {
    name: "IBK Capital Corp.",
    website: "https://www.ibkcapital.com",
    tier: "gold",
  },
  {
    name: "Kinterra Capital",
    website: "https://kinterracapital.com",
    tier: "gold",
  },
  {
    name: "O3 Mining",
    website: "https://o3mining.com",
    tier: "gold",
  },
  {
    name: "Osisko Mining",
    website: "https://osiskomining.com",
    tier: "gold",
  },
  // Silver Sponsors
  {
    name: "Osisko Gold Royalties",
    website: "https://osiskogr.com",
    tier: "silver",
    image: "/sponsors/2026/or_royalties_osisko_royalties.svg",
  },
  {
    name: "Canadian Securities Exchange (CSE)",
    website: "https://thecse.com",
    tier: "silver",
    image: "/sponsors/2026/canadian_securities_exchange_cse.png",
  },
  {
    name: "PearTree Financial",
    website: "https://peartreefinancial.com",
    tier: "silver",
    image: "/sponsors/2026/peartree_canada.png",
  },
  {
    name: "IR.INC",
    website: "https://ir.inc",
    tier: "silver",
  },
  {
    name: "Stifel",
    website: "https://www.stifel.com",
    tier: "silver",
    image: "/sponsors/2026/stifel.svg",
  },
  {
    name: "MI3 Financial Communications",
    website: "https://mi3financial.com",
    tier: "silver",
  },
  {
    name: "TMX Group",
    website: "https://www.tmx.com",
    tier: "silver",
    image: "/sponsors/2026/tmx_group.png",
  },
  // Copper Sponsors
  {
    name: "Alliance Advisors",
    website: "https://allianceadvisors.com",
    tier: "copper",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/0d7baea8-eb9b-4960-a83c-9daf1de7a223/Alliance+Advisors+Logo?format=750w",
  },
  {
    name: "AMEX Exploration",
    website: "https://amexexploration.com",
    tier: "copper",
  },
  {
    name: "Cassels",
    website: "https://cassels.com",
    tier: "copper",
    image: "/sponsors/2026/cassels.ico",
  },
  {
    name: "Brooks & Nelson",
    website: "https://brooksandnelson.com",
    tier: "copper",
    image: "/sponsors/2026/brooks_nelson.png",
  },
  {
    name: "CDPQ",
    website: "https://www.cdpq.com",
    tier: "copper",
    image: "/sponsors/2026/la_caisse_cdpq.svg",
  },
  {
    name: "Centre des congrès de Québec",
    website: "https://www.convention.qc.ca",
    tier: "copper",
    image: "/sponsors/2026/centre_des_congr_s_de_qu_bec.png",
  },
  {
    name: "Crux Investor",
    website: "https://cruxinvestor.com",
    tier: "copper",
    image: "/sponsors/2026/crux_investor.svg",
  },
  {
    name: "Digbee",
    website: "https://digbee.com",
    tier: "copper",
  },
  {
    name: "Domco Group of Canada",
    website: "https://domco.ca",
    tier: "copper",
  },
  {
    name: "Generation IACP",
    website: "https://generationiacp.com",
    tier: "copper",
  },
  {
    name: "GBR (Global Business Reports)",
    website: "https://www.gbreports.com",
    tier: "copper",
  },
  {
    name: "Infor Financial",
    website: "https://inforfinancial.com",
    tier: "copper",
  },
  {
    name: "Outside the Box Capital",
    website: "https://outsidethebox.capital",
    tier: "copper",
    image: "/sponsors/2026/outside_the_box_capital.png",
  },
  {
    name: "VRIFY",
    website: "https://vrify.com",
    tier: "copper",
    image: "/sponsors/2026/vrify.png",
  },
  // Media & Partners
  {
    name: "BTV – Business Television",
    website: "https://www.b-tv.com",
    tier: "media",
  },
  {
    name: "Canadian Mining Magazine",
    website: "https://canadianminingmagazine.com",
    tier: "media",
  },
  {
    name: "CEO.CA",
    website: "https://ceo.ca",
    tier: "media",
    image: "/sponsors/2026/ceo_ca.png",
  },
  {
    name: "Ellis Martin Report",
    website: "https://ellismartinreport.com",
    tier: "media",
  },
  {
    name: "Kitco News",
    website: "https://www.kitco.com",
    tier: "media",
  },
  {
    name: "Market One Media",
    website: "https://www.marketonemedia.com",
    tier: "media",
  },
  {
    name: "Mining Discovery",
    website: "https://miningdiscovery.com",
    tier: "media",
    image: "/sponsors/2026/mining_discovery.webp",
  },
  {
    name: "Mining IR",
    website: "https://miningir.com",
    tier: "media",
    image: "/sponsors/2026/miningir.png",
  },
  {
    name: "The Northern Miner",
    website: "https://www.northernminer.com",
    tier: "media",
    image: "/sponsors/2026/the_northern_miner.png",
  },
  {
    name: "Newsfile",
    website: "https://www.newsfilecorp.com",
    tier: "media",
    image: "/sponsors/2026/newsfile.png",
  },
  {
    name: "The Prospector News",
    website: "https://theprospectornews.com",
    tier: "media",
    image: "/sponsors/2026/the_prospector_news.png",
  },
  {
    name: "VID Media",
    website: "https://vidmedia.ca",
    tier: "media",
  },
  {
    name: "Junior Mining Network",
    website: "https://www.juniorminingnetwork.com",
    tier: "media",
  },
  {
    name: "Mining Hub",
    website: "https://mininghub.com",
    tier: "media",
  },
  {
    name: "Invercio",
    website: "https://invercio.com",
    tier: "media",
  },
];

const SPONSORS_2023: SponsorItem[] = SPONSORS_2024;

function SponsorLogo({ sponsor }: { sponsor: SponsorItem }) {
  const [hasError, setHasError] = useState(false);

  // Generate initials
  const initials = useMemo(() => {
    return sponsor.name
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  }, [sponsor.name]);

  if (!sponsor.image || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 border border-neutral-100 group-hover:from-neutral-100 group-hover:to-white transition-all duration-300">
        <span className="text-lg font-black tracking-wider text-neutral-400 group-hover:text-[#C6112F] transition-colors select-none">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={sponsor.image}
      alt={sponsor.name}
      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
      onError={() => setHasError(true)}
    />
  );
}

export default function SponsorsView({ year = 2026 }: { year?: number }) {
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filterOptions = useMemo(() => {
    const baseOptions = [
      { id: "all", label: "All Sponsors" },
      { id: "platinum", label: "Platinum Sponsors" },
      { id: "gold", label: "Gold Sponsors" },
      { id: "silver", label: "Silver Sponsors" },
      { id: "copper", label: "Copper Sponsors" },
      { id: "media", label: "Media Partners" },
      { id: "government", label: selectedYear === 2025 ? "Special Sponsors" : "Government / Special" },
    ];
    
    const activeList =
      selectedYear === 2026
        ? SPONSORS_2026
        : selectedYear === 2025
        ? SPONSORS_2025
        : selectedYear === 2024
        ? SPONSORS_2024
        : SPONSORS_2023;
    const hasPresenting = activeList.some((s) => s.tier === "presenting");
    const hasGreen = activeList.some((s) => s.tier === "green");
    const hasSustainable = activeList.some((s) => s.tier === "sustainable");
    
    const options = [...baseOptions];
    
    if (hasPresenting) {
      options.splice(1, 0, { id: "presenting", label: "Presenting Sponsor" });
    }
    if (hasGreen) {
      options.splice(options.findIndex(o => o.id === "gold") + 1, 0, { id: "green", label: "Green Sponsors" });
    }
    if (hasSustainable) {
      options.splice(options.findIndex(o => o.id === "gold") + 1, 0, { id: "sustainable", label: "Sustainable Sponsors" });
    }
    
    return options;
  }, [selectedYear]);
 
  const filteredSponsors = useMemo(() => {
    const list =
      selectedYear === 2026
        ? SPONSORS_2026
        : selectedYear === 2025
        ? SPONSORS_2025
        : selectedYear === 2024
        ? SPONSORS_2024
        : SPONSORS_2023;
    if (selectedCategory === "all") return list;
    return list.filter((s) => s.tier === selectedCategory);
  }, [selectedYear, selectedCategory]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedCategory("all");
  };

  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case "presenting":
        return "bg-rose-500/10 text-[#C6112F] border-[#C6112F]/40";
      case "platinum":
        return "bg-amber-500/10 text-amber-800 border-amber-500/30";
      case "gold":
        return "bg-yellow-500/10 text-yellow-800 border-yellow-500/30";
      case "green":
        return "bg-emerald-500/10 text-emerald-800 border-emerald-500/30";
      case "sustainable":
        return "bg-teal-500/10 text-teal-800 border-teal-500/30";
      case "silver":
        return "bg-slate-500/10 text-slate-800 border-slate-500/30";
      case "copper":
        return "bg-orange-500/10 text-orange-800 border-orange-500/30";
      case "government":
        return "bg-indigo-500/10 text-indigo-800 border-indigo-500/30";
      case "media":
      default:
        return "bg-purple-500/10 text-purple-800 border-purple-500/30";
    }
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case "presenting":
        return "Presenting Sponsor";
      case "platinum":
        return "Platinum Sponsor";
      case "gold":
        return "Gold Sponsor";
      case "green":
        return "Green Sponsor";
      case "sustainable":
        return "Sustainable Sponsor";
      case "silver":
        return "Silver Sponsor";
      case "copper":
        return "Copper Sponsor";
      case "government":
        return selectedYear === 2025 ? "Special Sponsor" : "Government / Special";
      case "media":
      default:
        return "Media Partner";
    }
  };

  return (
    <div className="w-full text-left font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6112F] animate-pulse shrink-0" />
          <span className="text-xs font-black tracking-widest uppercase text-neutral-500 whitespace-nowrap">
            Sponsor Edition:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleYearChange(2026)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${selectedYear === 2026
                  ? "bg-[#C6112F] text-white shadow-md"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
            >
              2026 Sponsors
            </button>
            <button
              onClick={() => handleYearChange(2025)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${selectedYear === 2025
                  ? "bg-[#C6112F] text-white shadow-md"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
            >
              2025 Sponsors
            </button>
          </div>
        </div>

        <span className="text-xs font-bold text-neutral-500">
          Showing {filteredSponsors.length} Official Sponsors
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {filterOptions.map((opt) => {
          const isSelected = selectedCategory === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelectedCategory(opt.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap shrink-0 border ${isSelected
                  ? "bg-[#C6112F] text-white border-[#C6112F] shadow-md scale-105"
                  : "bg-white text-neutral-600 border-neutral-200/90 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-grow h-[1px] bg-neutral-200" />
          <b className="text-xs sm:text-sm font-extrabold text-[#C6112F] tracking-[0.25em] uppercase whitespace-nowrap">
            OFFICIAL {selectedYear} SPONSORS & PARTNERS
          </b>
          <div className="flex-grow h-[1px] bg-neutral-200" />
        </div>

        {filteredSponsors.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200/60">
            <p className="text-neutral-500 text-sm font-bold">No sponsors found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {filteredSponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200/90 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-xl hover:border-[#C6112F]/40 hover:-translate-y-1.5 transition-all duration-300 group min-h-[240px]"
              >
                <span
                  className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border mb-3 ${getTierBadgeStyle(
                    sponsor.tier
                  )}`}
                >
                  {getTierLabel(sponsor.tier)}
                </span>

                <div className="w-full h-24 flex items-center justify-center mb-4 p-2 bg-neutral-50/50 rounded-xl border border-neutral-100 group-hover:bg-white transition-colors">
                  <SponsorLogo sponsor={sponsor} />
                </div>

                <div className="w-full">
                  <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 group-hover:text-[#C6112F] transition-colors leading-snug mb-2">
                    {sponsor.name}
                  </h4>
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#C6112F] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Visit Website</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
        </div>
      </div>
    </div>
  );
}
