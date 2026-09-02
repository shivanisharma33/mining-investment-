"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { fetchSponsorsByYear } from "@/lib/sponsorsApi";

export type SponsorTier =
  | "presenting"
  | "platinum"
  | "gold"
  | "silver"
  | "copper"
  | "bronze"
  | "media"
  | "government"
  | "green"
  | "sustainable";

export interface SponsorItem {
  name: string;
  website: string;
  image?: string;
  tier: SponsorTier;
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
    image: "/152.png",
  },
  {
    name: "Agnico Eagle",
    website: "https://www.agnicoeagle.com",
    tier: "platinum",
    image: "/4.png",
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
    image: "/sponsors/2026/maxit_capital.png",
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
    image: "/sponsors/2026/the_money_channel_new_york_city.png",
  },
  // Silver Partners
  {
    name: "Atrium Research",
    website: "https://atriumresearch.ca",
    tier: "silver",
    image: "/sponsors/2026/atrium_research.png",
  },
  {
    name: "Canadian Securities Exchange (CSE)",
    website: "https://thecse.com",
    tier: "silver",
    image: "/sponsors/2026/canadian_securities_exchange_cse.png",
  },
  {
    name: "Caur Technologies",
    website: "https://caurtech.com",
    tier: "silver",
    image: "/43.png"
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
    name: "OR Royalties (Osisko Royalties)",
    website: "https://osiskogr.com",
    tier: "silver",
    image: "/lorroyalties.svg",
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
    image: "/agp.webp",
  },
  {
    name: "Apaton Finance",
    website: "https://apatonfinance.com",
    tier: "copper",
    image: "/apaton-finance-logo.svg",
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
    image: "/139.png",
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
    name: "Mining Discovery",
    website: "https://miningdiscovery.com",
    tier: "media",
    image: "/sponsors/2026/mining_discovery.webp",
  },
  {
    name: "BTV – Business Television",
    website: "https://www.b-tv.com/",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_17.png",
  },
  {
    name: "CEO.CA",
    website: "https://ceo.ca",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_35.png",
  },
  {
    name: "Canadian Mining Magazine",
    website: "https://canadianminingmagazine.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_19.png",
  },
  {
    name: "Faulkner & Co",
    website: "https://faulknerandco.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_54.png",
  },
  {
    name: "GBR (Global Business Reports)",
    website: "https://www.gbreports.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_26.png",
  },
  {
    name: "ITG (Independent Trading Group)",
    website: "https://itg.com",
    tier: "media",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/befa98c2-1fed-4ebe-861f-0f70e03f5f92/Independent_Trading_Group__ITG___Inc__Independent_Trading_Group.jpg?format=750w",
  },
  {
    name: "Launchpad Productions",
    website: "https://www.launchpadproductions.ca/",
    tier: "media",
    image: "/134.png",
  },
  {
    name: "Mining IR",
    website: "https://miningir.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_20.png",
  },
  {
    name: "InvestorBrandNetwork (IBN)",
    website: "https://www.ibn.fm",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_48.png",
  },
  {
    name: "Mining Hub",
    website: "https://mininghub.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_22.png",
  },
  {
    name: "Newsfile (A TMX Company)",
    website: "https://www.newsfilecorp.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_23.png",
  },
  {
    name: "Market One Media",
    website: "https://www.marketonemedia.com",
    tier: "media",
    image: "/135.png",
  },
  {
    name: "Podcast Minier",
    website: "https://podcastminier.com",
    tier: "media",
    image: "/148.png",
  },
  {
    name: "NP Promotions",
    website: "https://nppromo.ca/",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_47.png",
  },
  {
    name: "RCTV",
    website: "https://rctv.ca",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_49.png",
  },
  {
    name: "RefinedSubstance",
    website: "https://refinedsubstance.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_52.png",
  },
  {
    name: "The Prospector News",
    website: "https://theprospectornews.com",
    tier: "media",
    image: "/150.png",
  },
  {
    name: "Resource World Magazine",
    website: "https://resourceworld.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_25.png",
  },
  {
    name: "The Northern Miner",
    website: "https://www.northernminer.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_36.png",
  },
  {
    name: "XPAV Expert'Ease",
    website: "https://xpav.ca",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_37.png",
  },
  {
    name: "VID (Focused on the investor)",
    website: "https://vidconferences.com",
    tier: "media",
    image: "/sponsors/2026/vid_research_and_the_investor.png",
  },
  // Special Participation
  {
    name: "Québec",
    website: "https://www.quebec.ca",
    tier: "government",
    image: "/144.png",
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
    image: "/sponsor image/logo-capitalmarkets.svg",
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
    image: "https://www.google.com/s2/favicons?domain=ibkcapital.com&sz=128",
  },
  // Green Sponsor
  {
    name: "Kinterra Capital",
    website: "https://kinterracapital.com",
    tier: "green",
    image: "https://www.google.com/s2/favicons?domain=kinterracapital.com&sz=128",
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
    image: "https://www.google.com/s2/favicons?domain=ir.inc&sz=128",
  },
  {
    name: "MI3 Financial Communications",
    website: "https://mi3financial.com",
    tier: "silver",
    image: "https://www.google.com/s2/favicons?domain=mi3financial.com&sz=128",
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
    image: "https://www.google.com/s2/favicons?domain=digbee.com&sz=128",
  },
  {
    name: "Infor Financial",
    website: "https://inforfinancial.com",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=inforfinancial.com&sz=128",
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
    image: "/sponsors/2026/sponsor_media_17.png",
  },
  {
    name: "Canadian Mining Magazine",
    website: "https://canadianminingmagazine.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_19.png",
  },
  {
    name: "CEO.CA",
    website: "https://ceo.ca",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_35.png",
  },
  {
    name: "Kitco News",
    website: "https://www.kitco.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_18.png",
  },
  {
    name: "Market One Media",
    website: "https://www.marketonemedia.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_50.png",
  },
  {
    name: "Junior Mining Hub",
    website: "https://juniormininghub.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=juniormininghub.com&sz=128",
  },
  {
    name: "Mining Discovery",
    website: "https://miningdiscovery.com",
    tier: "media",
    image: "/sponsors/2026/mining_discovery.webp",
  },
  {
    name: "Mining Network",
    website: "https://miningnetwork.co.uk",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=miningnetwork.co.uk&sz=128",
  },
  {
    name: "Mining IR",
    website: "https://miningir.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_20.png",
  },
  {
    name: "The Northern Miner",
    website: "https://www.northernminer.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_36.png",
  },
  {
    name: "Newsfile",
    website: "https://www.newsfilecorp.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_23.png",
  },
  {
    name: "The Prospector News",
    website: "https://theprospectornews.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_53.png",
  },
  {
    name: "VID (Focused on the investor)",
    website: "https://vidconferences.com",
    tier: "media",
    image: "/sponsors/2026/vid_research_and_the_investor.png",
  },
  {
    name: "Invercio",
    website: "https://invercio.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=invercio.com&sz=128",
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
    image: "/sponsor image/logo-capitalmarkets.svg",
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
    image: "https://www.google.com/s2/favicons?domain=ibkcapital.com&sz=128",
  },
  {
    name: "Kinterra Capital",
    website: "https://kinterracapital.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=kinterracapital.com&sz=128",
  },
  {
    name: "O3 Mining",
    website: "https://o3mining.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=o3mining.com&sz=128",
  },
  {
    name: "Osisko Mining",
    website: "https://osiskomining.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=osiskomining.com&sz=128",
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
    image: "https://www.google.com/s2/favicons?domain=ir.inc&sz=128",
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
    image: "https://www.google.com/s2/favicons?domain=mi3financial.com&sz=128",
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
    image: "https://www.google.com/s2/favicons?domain=amexexploration.com&sz=128",
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
    image: "https://www.google.com/s2/favicons?domain=digbee.com&sz=128",
  },
  {
    name: "Domco Group of Canada",
    website: "https://domco.ca",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=domco.ca&sz=128",
  },
  {
    name: "Generation IACP",
    website: "https://generationiacp.com",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=generationiacp.com&sz=128",
  },
  {
    name: "GBR (Global Business Reports)",
    website: "https://www.gbreports.com",
    tier: "copper",
    image: "/sponsors/2026/sponsor_media_26.png",
  },
  {
    name: "Infor Financial",
    website: "https://inforfinancial.com",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=inforfinancial.com&sz=128",
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
    image: "/sponsors/2026/sponsor_media_17.png",
  },
  {
    name: "Canadian Mining Magazine",
    website: "https://canadianminingmagazine.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_19.png",
  },
  {
    name: "CEO.CA",
    website: "https://ceo.ca",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_35.png",
  },
  {
    name: "Ellis Martin Report",
    website: "https://ellismartinreport.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=ellismartinreport.com&sz=128",
  },
  {
    name: "Kitco News",
    website: "https://www.kitco.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_18.png",
  },
  {
    name: "Invercio",
    website: "https://invercio.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=invercio.com&sz=128",
  },
  {
    name: "Market One Media",
    website: "https://www.marketonemedia.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_50.png",
  },
  {
    name: "Mining Network",
    website: "https://miningnetwork.co.uk",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=miningnetwork.co.uk&sz=128",
  },
  {
    name: "Junior Mining Hub",
    website: "https://juniormininghub.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=juniormininghub.com&sz=128",
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
    image: "/sponsors/2026/sponsor_media_20.png",
  },
  {
    name: "Newsfile",
    website: "https://www.newsfilecorp.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_23.png",
  },
  {
    name: "The Northern Miner",
    website: "https://www.northernminer.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_36.png",
  },
  {
    name: "The Prospector News",
    website: "https://theprospectornews.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_53.png",
  },
  {
    name: "VID (Focused on the investor)",
    website: "https://vidconferences.com",
    tier: "media",
    image: "/sponsors/2026/vid_research_and_the_investor.png",
  },
];

const SPONSORS_2023: SponsorItem[] = [
  // Special Sponsor
  {
    name: "Government of Québec",
    website: "https://www.quebec.ca",
    tier: "government",
    image: "/sponsors/2026/qu_bec.png",
  },
  // Premier Sponsor
  {
    name: "Laurentian Bank Securities",
    website: "https://www.lb-securities.ca",
    tier: "presenting",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7bef5867-7f22-43cd-92f1-87a63d2e7a20/Laurentian+Bank+Securities?format=750w",
  },
  // Platinum Sponsor
  {
    name: "National Bank Financial Markets",
    website: "https://nbfm.ca",
    tier: "platinum",
    image: "/sponsor image/logo-capitalmarkets.svg",
  },
  // Gold Sponsors
  {
    name: "BMO",
    website: "https://www.bmo.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=bmo.com&sz=128",
  },
  {
    name: "IBK Capital Corp.",
    website: "https://www.ibkcapital.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=ibkcapital.com&sz=128",
  },
  {
    name: "Maple Gold Mines",
    website: "https://maplegoldmines.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=maplegoldmines.com&sz=128",
  },
  {
    name: "O3 Mining",
    website: "https://o3mining.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=o3mining.com&sz=128",
  },
  {
    name: "JDS Energy & Mining Inc.",
    website: "https://www.jdsmining.ca/",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=jdsmining.ca&sz=128",
  },
  {
    name: "Troilus Gold",
    website: "https://www.troilusgold.com",
    tier: "gold",
    image: "https://www.google.com/s2/favicons?domain=troilusgold.com&sz=128",
  },
  // Silver Sponsors
  {
    name: "PearTree Financial",
    website: "https://www.peartreefinancial.com",
    tier: "silver",
    image: "/sponsors/2026/peartree_canada.png",
  },
  {
    name: "Stifel / GMP Securities",
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
  {
    name: "MI3 Financial Communications",
    website: "https://mi3financial.com",
    tier: "silver",
    image: "https://www.google.com/s2/favicons?domain=mi3financial.com&sz=128",
  },
  {
    name: "Invest Yukon",
    website: "https://investyukon.ca",
    tier: "silver",
    image: "/Invest_Yukon.png",
  },
  // ESG / Sustainable Sponsor
  {
    name: "Socialsuite",
    website: "https://www.socialsuitehq.com",
    tier: "sustainable",
    image: "https://www.google.com/s2/favicons?domain=socialsuitehq.com&sz=128",
  },
  // Copper Sponsors
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
    name: "Infor Financial",
    website: "https://inforfinancial.com",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=inforfinancial.com&sz=128",
  },
  {
    name: "Crux Investor",
    website: "https://cruxinvestor.com",
    tier: "copper",
    image: "/sponsors/2026/crux_investor.svg",
  },
  {
    name: "Generation IACP",
    website: "https://generationiacp.com",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=generationiacp.com&sz=128",
  },
  {
    name: "Alliance Advisors",
    website: "https://allianceadvisors.com",
    tier: "copper",
    image: "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/0d7baea8-eb9b-4960-a83c-9daf1de7a223/Alliance+Advisors+Logo?format=750w",
  },
  {
    name: "Amvest Capital",
    website: "https://amvestcapital.com",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=amvestcapital.com&sz=128",
  },
  {
    name: "VRIFY",
    website: "https://vrify.com",
    tier: "copper",
    image: "/sponsors/2026/vrify.png",
  },
  {
    name: "Outside the Box Capital",
    website: "https://outsidethebox.capital",
    tier: "copper",
    image: "/sponsors/2026/outside_the_box_capital.png",
  },
  {
    name: "Brooks & Nelson",
    website: "https://brooksandnelson.com",
    tier: "copper",
    image: "/sponsors/2026/brooks_nelson.png",
  },
  {
    name: "AMEX Exploration",
    website: "https://amexexploration.com",
    tier: "copper",
    image: "https://www.google.com/s2/favicons?domain=amexexploration.com&sz=128",
  },
  {
    name: "GBR (Global Business Reports)",
    website: "https://www.gbreports.com",
    tier: "copper",
    image: "/sponsors/2026/sponsor_media_26.png",
  },
  // Media & Partners
  {
    name: "BTV – Business Television",
    website: "https://www.b-tv.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_17.png",
  },
  {
    name: "Newsfile",
    website: "https://www.newsfilecorp.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_23.png",
  },
  {
    name: "Mining Network",
    website: "https://miningnetwork.co.uk/",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=miningnetwork.co.uk&sz=128",
  },
  {
    name: "Simply Better Marketing",
    website: "https://simplybettermarketing.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=simplybettermarketing.com&sz=128",
  },
  {
    name: "IR.INC",
    website: "https://ir.inc",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=ir.inc&sz=128",
  },
  {
    name: "Resource World Magazine",
    website: "https://resourceworld.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_25.png",
  },
  {
    name: "The Northern Miner",
    website: "https://www.northernminer.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_36.png",
  },
  {
    name: "Kitco News",
    website: "https://www.kitco.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_18.png",
  },
  {
    name: "GBR (Global Business Reports)",
    website: "https://www.gbreports.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_26.png",
  },
  {
    name: "NP Promotions",
    website: "https://nppromo.ca/",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_47.png",
  },
  {
    name: "XPAV Expert'Ease",
    website: "https://xpav.ca",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_37.png",
  },
  {
    name: "The Prospector News",
    website: "https://theprospectornews.com",
    tier: "media",
    image: "/sponsors/2026/sponsor_media_53.png",
  },
  {
    name: "LFG Equities",
    website: "https://lfgequities.com/",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=lfgequities.com&sz=128",
  },
  {
    name: "Québec City Business Destination",
    website: "https://www.quebeccite.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=quebeccite.com&sz=128",
  },
  {
    name: "EBL Consultants envr.",
    website: "mailto:eblconsultants@gmail.com",
    tier: "media",
    image: "https://www.google.com/s2/favicons?domain=eblconsultants.com&sz=128",
  },
];

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
      referrerPolicy="no-referrer"
      className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
      style={sponsor.name === "Outside the Box Capital" ? { filter: "brightness(0)" } : undefined}
      onError={() => setHasError(true)}
    />
  );
}

interface SponsorsViewProps {
  year?: number;
  /**
   * Sponsors for `year`, supplied by the sponsors API for 2027. Past editions
   * omit it and keep using the bundled SPONSORS_* lists.
   */
  sponsors?: SponsorItem[];
}

const STATIC_YEARS = [2026, 2025, 2024, 2023];

const staticSponsorsFor = (year: number): SponsorItem[] =>
  year === 2026
    ? SPONSORS_2026
    : year === 2025
      ? SPONSORS_2025
      : year === 2024
        ? SPONSORS_2024
        : SPONSORS_2023;

export default function SponsorsView({ year = 2027, sponsors }: SponsorsViewProps) {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [fetched2027Sponsors, setFetched2027Sponsors] = useState<SponsorItem[] | null>(null);

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  useEffect(() => {
    if (selectedYear === 2027 && (!sponsors || sponsors.length === 0) && fetched2027Sponsors === null) {
      let cancelled = false;
      fetchSponsorsByYear(2027)
        .then((items) => {
          if (!cancelled) setFetched2027Sponsors(items);
        })
        .catch(() => {
          if (!cancelled) setFetched2027Sponsors([]);
        });
      return () => {
        cancelled = true;
      };
    }
  }, [selectedYear, sponsors, fetched2027Sponsors]);

  const hasApiSponsors = Boolean(
    (sponsors && sponsors.length > 0) || (fetched2027Sponsors && fetched2027Sponsors.length > 0)
  );

  const yearOptions = useMemo(
    () =>
      Array.from(new Set([year, ...STATIC_YEARS])).sort((a, b) => b - a),
    [year]
  );

  const activeList = useMemo(() => {
    if (STATIC_YEARS.includes(selectedYear)) {
      return staticSponsorsFor(selectedYear);
    }
    if (selectedYear === 2027) {
      if (sponsors && sponsors.length > 0) return sponsors;
      return fetched2027Sponsors ?? [];
    }
    if (sponsors && sponsors.length > 0) {
      return sponsors;
    }
    return staticSponsorsFor(selectedYear);
  }, [sponsors, selectedYear, fetched2027Sponsors]);

  const filterOptions = useMemo(() => {
    const baseOptions = [
      { id: "all", label: t("sp-all", "All Sponsors") },
      { id: "platinum", label: t("sp-platinum", "Platinum Sponsors") },
      { id: "gold", label: t("sp-gold", "Gold Sponsors") },
      { id: "silver", label: t("sp-silver", "Silver Sponsors") },
      { id: "copper", label: t("sp-copper", "Copper Sponsors") },
      { id: "media", label: t("sp-partners", "Partners") },
      { id: "government", label: selectedYear === 2025 ? t("sp-special", "Special Sponsors") : t("sp-government", "Government / Special") },
    ];

    const hasPresenting = activeList.some((s) => s.tier === "presenting");
    const hasGreen = activeList.some((s) => s.tier === "green");
    const hasSustainable = activeList.some((s) => s.tier === "sustainable");
    const hasBronze = activeList.some((s) => s.tier === "bronze");

    // Only offer tiers this edition actually has.
    const options = baseOptions.filter(
      (opt) => opt.id === "all" || activeList.some((s) => s.tier === opt.id)
    );

    if (hasPresenting) {
      options.splice(1, 0, { id: "presenting", label: t("sp-premier", "Premier Sponsor") });
    }
    if (hasGreen) {
      options.splice(options.findIndex(o => o.id === "gold") + 1, 0, { id: "green", label: t("sp-green", "Green Sponsors") });
    }
    if (hasSustainable) {
      options.splice(options.findIndex(o => o.id === "gold") + 1, 0, { id: "sustainable", label: t("sp-esg", "ESG Sponsor") });
    }
    if (hasBronze) {
      const copperIdx = options.findIndex((o) => o.id === "copper");
      const insertAt = copperIdx >= 0 ? copperIdx + 1 : options.length;
      options.splice(insertAt, 0, { id: "bronze", label: t("sp-bronze", "Bronze Sponsors") });
    }

    return options;
  }, [selectedYear, activeList, t]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSponsors = useMemo(() => {
    let list = selectedCategory === "all" ? activeList : activeList.filter((s) => s.tier === selectedCategory);
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.tier && s.tier.toLowerCase().includes(q))
      );
    }
    // The grid reads A-Z by name; each card's tier badge still carries the ranking.
    return [...list].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
  }, [activeList, selectedCategory, searchQuery]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedCategory("all");
    setSearchQuery("");
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
      case "bronze":
        return "bg-amber-700/10 text-amber-900 border-amber-700/30";
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
        return "PREMIER MEDIA & PARTNER";
      case "platinum":
        return "PLATINUM MEDIA & PARTNER";
      case "gold":
        return "GOLD MEDIA & PARTNER";
      case "green":
        return "GREEN MEDIA & PARTNER";
      case "sustainable":
        return "ESG MEDIA & PARTNER";
      case "silver":
        return "SILVER MEDIA & PARTNER";
      case "copper":
        return "COPPER MEDIA & PARTNER";
      case "bronze":
        return "BRONZE MEDIA & PARTNER";
      case "government":
        return "GOVERNMENT & SPECIAL";
      case "media":
      default:
        return "MEDIA & PARTNER";
    }
  };

  return (
    <div className="w-full text-left font-sans">
      {/* ════════ REFINED EDITION SELECTOR & SEARCH TOOLBAR ════════ */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 mb-5 bg-white dark:bg-[#141824] p-3.5 sm:p-4 rounded-2xl border border-neutral-200/90 dark:border-zinc-800 shadow-2xs">
        {/* Left Side: Edition Label & Buttons (Strictly in 1 line) */}
        <div className="flex items-center gap-2.5 flex-nowrap overflow-x-auto no-scrollbar shrink-0 py-0.5">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse shrink-0" />
            <span className="text-[11px] font-black tracking-wider uppercase text-neutral-500 dark:text-zinc-400 whitespace-nowrap">
              {t("sp-edition", "Media & Partner Edition:")}
            </span>
          </div>

          {/* Primary Year Button (e.g. 2027) */}
          <button
            onClick={() => handleYearChange(year)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${selectedYear === year
              ? "bg-[#C6112F] text-white shadow-xs"
              : "bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200/80 dark:hover:bg-zinc-700 border border-neutral-200/60 dark:border-zinc-700"
              }`}
          >
            {year} {t("sp-sponsors", "Media & Partners")}
          </button>

          {/* Other Editions Dropdown */}
          <div className="relative inline-flex items-center shrink-0">
            <select
              value={selectedYear !== year ? selectedYear : "OTHER"}
              onChange={(e) => {
                const val = e.target.value;
                if (val && val !== "OTHER") {
                  handleYearChange(Number(val));
                }
              }}
              className={`rounded-xl py-2 pl-3.5 pr-8 text-xs font-extrabold cursor-pointer transition-all shadow-2xs outline-none focus:outline-none focus:ring-2 focus:ring-[#C6112F]/20 appearance-none border ${selectedYear !== year
                ? "bg-[#C6112F] text-white border-[#C6112F] shadow-xs"
                : "bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 border-neutral-200/90 dark:border-zinc-700 hover:bg-neutral-200/80 hover:text-neutral-900"
                }`}
            >
              <option value="OTHER" className="bg-white text-neutral-800 dark:bg-zinc-800 dark:text-white font-bold">
                {isFr ? "Autres éditions" : "Other Editions"}
              </option>
              {yearOptions
                .filter((y) => y !== year)
                .map((yearOption) => (
                  <option
                    key={yearOption}
                    value={yearOption}
                    className="bg-white text-neutral-900 dark:bg-zinc-800 dark:text-white font-bold"
                  >
                    {yearOption} {t("sp-sponsors", "Media & Partners")}
                  </option>
                ))}
            </select>
            <svg
              className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${selectedYear !== year ? "text-white" : "text-neutral-500"
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {/* Right Side: Partner Search Bar */}
        <div className="relative w-full sm:w-48 md:w-52 lg:w-56 shrink-0">
          <svg
            className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isFr ? "Rechercher…" : "Search partners…"}
            className="w-full bg-neutral-50 dark:bg-zinc-800 border border-neutral-200/90 dark:border-zinc-700 rounded-xl py-2 pl-9 pr-8 text-xs font-semibold text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/15 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white text-xs font-bold bg-neutral-200 dark:bg-zinc-700 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ════════ CATEGORY FILTERS (FLEX-WRAP, NO SCROLLBAR ON DESKTOP) ════════ */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filterOptions.map((opt) => {
          const isSelected = selectedCategory === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelectedCategory(opt.id)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all whitespace-nowrap border cursor-pointer ${isSelected
                ? "bg-[#C6112F] text-white border-[#C6112F] shadow-xs"
                : "bg-white dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 border-neutral-200/90 dark:border-zinc-700 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-grow h-[1px] bg-neutral-200 dark:bg-zinc-800" />
          <b className="text-[11px] sm:text-xs font-extrabold text-[#C6112F] tracking-[0.25em] uppercase whitespace-nowrap">
            {t("sp-official-year", "OFFICIAL")} {selectedYear} {t("sp-sponsors-partners", "MEDIA & PARTNERS")}
          </b>
          <div className="flex-grow h-[1px] bg-neutral-200 dark:bg-zinc-800" />
        </div>

        {filteredSponsors.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200/60">
            <p className="text-neutral-500 text-sm font-bold">{t("sp-no-sponsors", "No sponsors found in this category.")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {filteredSponsors.map((sponsor, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: "#ffffff" }}
                className="border border-neutral-200 dark:border-neutral-300 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-xl hover:border-[#C6112F]/40 hover:-translate-y-1.5 transition-all duration-300 group min-h-[240px]"
              >


                <div
                  style={{ backgroundColor: "#f8fafc" }}
                  className="w-full h-24 flex items-center justify-center mb-4 p-2 rounded-xl border border-neutral-200 transition-colors"
                >
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
                      <span>{t("sp-visit-website", "Visit Website")}</span>
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
            {t("sp-become-partner", "BECOME A PARTNER")}
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
            {t("sp-become-partner-title", "Partnering for a Stronger Mining Future")}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium max-w-xl">
            {t("sp-become-partner-desc", "Our sponsors play a vital role in driving innovation, ESG excellence, and sustainable mining practices across global capital markets.")}
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 relative z-10 w-full sm:w-auto">
          <a
            href="mailto:jchoi@irinc.ca?subject=Sponsorship Inquiry"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-xl shadow-[#C6112F]/25 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>{t("sp-become-sponsor-btn", "BECOME A SPONSOR")}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
