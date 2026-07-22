"use client";

import React, { useState, useMemo } from "react";

export interface SponsorItem {
  name: string;
  website: string;
  image?: string;
  tier: "presenting" | "platinum" | "gold" | "silver" | "copper" | "media" | "government";
}

const SPONSORS_2026: SponsorItem[] = [
  {
    "name": "Government of Québec",
    "tier": "platinum",
    "image": "/sponsors/2026/sponsor_special_1.png",
    "website": "https://www.quebec.ca"
  },
  {
    "name": "Laurentian Bank Securities",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7bef5867-7f22-43cd-92f1-87a63d2e7a20/Laurentian+Bank+Securities?format=750w",
    "website": "https://vmbl.ca"
  },
  {
    "name": "National Bank Financial Markets",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/32710a8b-b7cb-44bf-92a8-0a601abab945/fr+National+Bank.logo?format=750w",
    "website": "https://nbfm.ca"
  },
  {
    "name": "Glencore Canada",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/eef56d14-571d-4299-8058-b2352b9cf3b0/Glencore+Logo?format=750w",
    "website": "https://www.glencore.com"
  },
  {
    "name": "First Phosphate Corp.",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/a2d714b0-76ef-43bb-8e49-da998a92f7c4/First+Phosphate+logo?format=750w",
    "website": "https://firstphosphate.com"
  },
  {
    "name": "Agnico Eagle Mines Limited",
    "tier": "gold",
    "website": "https://www.agnicoeagle.com"
  },
  {
    "name": "O3 Mining Inc.",
    "tier": "gold",
    "website": "https://o3mining.com"
  },
  {
    "name": "IBK Capital Corp.",
    "tier": "gold",
    "website": "https://ibkcapital.com"
  },
  {
    "name": "Kinterra Capital",
    "tier": "gold",
    "website": "https://kinterracapital.com"
  },
  {
    "name": "Osisko Mining / Development",
    "tier": "gold",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152619513-RXNE5B7DMFP5MS2TC7XN/Jean+Robitialle.+jpeg.jpeg?format=750w",
    "website": "https://osiskodev.com"
  },
  {
    "name": "Canadian Securities Exchange (CSE)",
    "tier": "silver",
    "website": "https://thecse.com"
  },
  {
    "name": "PearTree Canada",
    "tier": "silver",
    "website": "https://peartreecanada.com"
  },
  {
    "name": "Osisko Gold Royalties",
    "tier": "silver",
    "website": "https://osiskogr.com"
  },
  {
    "name": "Stifel",
    "tier": "silver",
    "website": "https://www.stifel.com"
  },
  {
    "name": "TMX Group",
    "tier": "silver",
    "website": "https://www.tmx.com"
  },
  {
    "name": "IR.INC",
    "tier": "silver",
    "website": "https://irinc.ca"
  },
  {
    "name": "MI3 Financial Communications Inc.",
    "tier": "silver",
    "website": "https://mi3.ca"
  },
  {
    "name": "VRIFY Technology",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/8a9b493b-a8de-475a-85fe-87ec50acd64d/vrify_logo_2023_logo-black.jpg?format=750w",
    "website": "https://vrify.com"
  },
  {
    "name": "Caur Technologies",
    "tier": "silver",
    "website": "https://caur.ca"
  },
  {
    "name": "Crux Investor",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/4c151119-c45b-4f3b-b930-14cf54873e36/64ddea86f448fb2c08808739_cruxinvestor-open-graph.jpg?format=750w",
    "website": "https://cruxinvestor.com"
  },
  {
    "name": "Alliance Advisors",
    "tier": "copper",
    "website": "https://allianceadvisors.com"
  },
  {
    "name": "Amex Exploration",
    "tier": "copper",
    "website": "https://amexexploration.com"
  },
  {
    "name": "Brooks & Nelson",
    "tier": "copper",
    "website": "https://brooksandnelson.com"
  },
  {
    "name": "Cassels",
    "tier": "copper",
    "website": "https://cassels.com"
  },
  {
    "name": "CDPQ (La Caisse)",
    "tier": "copper",
    "website": "https://www.cdpq.com"
  },
  {
    "name": "Centre des congrès de Québec",
    "tier": "copper",
    "website": "https://www.convention.qc.ca"
  },
  {
    "name": "Digbee Limited",
    "tier": "copper",
    "website": "https://digbee.com"
  },
  {
    "name": "Domco Group",
    "tier": "copper",
    "website": "https://domcogroup.ca"
  },
  {
    "name": "Generation IACP",
    "tier": "copper",
    "website": "https://generationiacp.com"
  },
  {
    "name": "Global Business Reports (GBR)",
    "tier": "copper",
    "website": "https://www.gbreports.com"
  },
  {
    "name": "Infor Financial Group",
    "tier": "copper",
    "website": "https://inforfinancial.com"
  },
  {
    "name": "Outside The Box Capital",
    "tier": "copper",
    "website": "https://outsidethebox.capital"
  },
  {
    "name": "The Northern Miner",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/539da435-47b4-447f-9325-670c0aa24c1b/tnm_logo_tag_c-scaled.jpg?format=750w",
    "website": "https://www.northernminer.com"
  },
  {
    "name": "BTV (Business Television)",
    "tier": "media",
    "website": "https://btonline.com"
  },
  {
    "name": "Resource World Magazine",
    "tier": "media",
    "website": "https://resourceworld.com"
  },
  {
    "name": "CEO.CA",
    "tier": "media",
    "website": "https://ceo.ca"
  },
  {
    "name": "Kitco News",
    "tier": "media",
    "website": "https://www.kitco.com"
  },
  {
    "name": "Market One Media",
    "tier": "media",
    "website": "https://marketonemedia.com"
  },
  {
    "name": "Junior Mining Network",
    "tier": "media",
    "website": "https://juniorminingnetwork.com"
  },
  {
    "name": "Mining Discovery",
    "tier": "media",
    "website": "https://miningdiscovery.com"
  },
  {
    "name": "MiningIR",
    "tier": "media",
    "website": "https://miningir.com"
  },
  {
    "name": "Newsfile Corp.",
    "tier": "media",
    "website": "https://www.newsfilecorp.com"
  },
  {
    "name": "The Prospector News",
    "tier": "media",
    "website": "https://theprospectornews.com"
  },
  {
    "name": "VID Conferences",
    "tier": "media",
    "website": "https://vidconferences.com"
  }
];

const SPONSORS_2025: SponsorItem[] = [
  {
    "name": "Agnico Eagle",
    "website": "https://www.agnicoeagle.com",
    "tier": "presenting",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/5a7feddc-6117-4605-8462-fbb16da1c728/AGNICO_EAGLE-Colour-Standard.png?format=750w"
  },
  {
    "name": "Glencore",
    "website": "https://www.glencore.com",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/eef56d14-571d-4299-8058-b2352b9cf3b0/Glencore+Logo?format=750w"
  },
  {
    "name": "National Bank Financial Markets",
    "website": "https://nbfm.ca",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/32710a8b-b7cb-44bf-92a8-0a601abab945/fr+National+Bank.logo?format=750w"
  },
  {
    "name": "Ventum Financial",
    "website": "https://ventumfinancial.com",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Altitude Capital Partners",
    "website": "https://www.altitudecapitalpartners.com",
    "tier": "gold",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Invest Yukon",
    "website": "https://investyukon.ca",
    "tier": "gold",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/4c151119-c45b-4f3b-b930-14cf54873e36/64ddea86f448fb2c08808739_cruxinvestor-open-graph.jpg?format=750w"
  },
  {
    "name": "MAXIT Capital",
    "website": "https://maxitcapital.com",
    "tier": "gold",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "PearTree Canada",
    "website": "https://peartreecanada.com",
    "tier": "gold",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Atrium Research",
    "website": "https://atriumresearch.ca",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7691234a-b33b-4f14-b084-c0c5d18caa32/atrium_purple_short+copy.png?format=750w"
  },
  {
    "name": "Canadian Securities Exchange (CSE)",
    "website": "https://thecse.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Caur Technologies",
    "website": "https://caur.ca",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Crux Investor",
    "website": "https://cruxinvestor.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/4c151119-c45b-4f3b-b930-14cf54873e36/64ddea86f448fb2c08808739_cruxinvestor-open-graph.jpg?format=750w"
  },
  {
    "name": "Hatch",
    "website": "https://www.hatch.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "IAMGOLD",
    "website": "https://www.iamgold.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Newfoundland & Labrador",
    "website": "https://www.gov.nl.ca",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "North American Niobium",
    "website": "https://northamericanniobium.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "OR Royalties (Osisko Royalties)",
    "website": "https://osiskogr.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Red Cloud Securities",
    "website": "https://redcloudfs.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Stifel",
    "website": "https://www.stifel.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/ec91c7d6-bc3e-4066-8ef8-a4bfea66cec8/Stifel+Logo?format=750w"
  },
  {
    "name": "TMX Group",
    "website": "https://www.tmx.com",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7b34fea3-b1ba-40d8-81b8-8aeef8543ab9/TMX-Newsfile_POS_RGB.png?format=750w"
  },
  {
    "name": "Alliance Global Partners",
    "website": "https://allianceg.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/0d7baea8-eb9b-4960-a83c-9daf1de7a223/Alliance+Advisors+Logo?format=750w"
  },
  {
    "name": "Apaton Finance",
    "website": "https://apatonfinance.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Brooks & Nelson",
    "website": "https://brooksandnelson.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/564c5c1c-7cf0-4b9a-baa8-8c1935f3f1d4/Brooks+%26+Nelson+Logo?format=750w"
  },
  {
    "name": "Cassels",
    "website": "https://cassels.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Centre des congrès de Québec",
    "website": "https://www.convention.qc.ca",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/66b22e39-7b0f-4438-bb71-2aa6eaf99e27/Qu%C3%A9bec+City+Convention+Centre.jpg?format=750w"
  },
  {
    "name": "CEO.CA",
    "website": "https://ceo.ca",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "ITG",
    "website": "https://itg.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/befa98c2-1fed-4ebe-861f-0f70e03f5f92/Independent_Trading_Group__ITG___Inc__Independent_Trading_Group.jpg?format=750w"
  },
  {
    "name": "La Caisse (CDPQ)",
    "website": "https://www.cdpq.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "MNP",
    "website": "https://www.mnp.ca",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Mercury Group",
    "website": "https://mercurygroup.ca",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Outside the Box Capital",
    "website": "https://outsidethebox.capital",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "PAL Airlines",
    "website": "https://www.palairlines.ca",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Velocity Trade",
    "website": "https://velocitytrade.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "VRIFY",
    "website": "https://vrify.com",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/8a9b493b-a8de-475a-85fe-87ec50acd64d/vrify_logo_2023_logo-black.jpg?format=750w"
  },
  {
    "name": "Canadian Mining Journal",
    "website": "https://www.canadianminingjournal.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "GBR (Global Business Reports)",
    "website": "https://www.gbreports.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "InvestorBrandNetwork (IBN)",
    "website": "https://www.ibn.fm",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Market One Media",
    "website": "https://www.marketonemedia.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Mining Discovery",
    "website": "https://miningdiscovery.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/46f34380-0bce-477d-9ba6-57d068388427/Mining+Discovery+logo+%232.png?format=750w"
  },
  {
    "name": "Mining Hub",
    "website": "https://mininghub.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/46f34380-0bce-477d-9ba6-57d068388427/Mining+Discovery+logo+%232.png?format=750w"
  },
  {
    "name": "MiningIR",
    "website": "https://miningir.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Newsfile",
    "website": "https://www.newsfilecorp.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7b34fea3-b1ba-40d8-81b8-8aeef8543ab9/TMX-Newsfile_POS_RGB.png?format=750w"
  },
  {
    "name": "Podcast Miner",
    "website": "https://podcastminer.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "RCTV",
    "website": "https://rctv.ca",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Refined Substance",
    "website": "https://refinedsubstance.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Resource World Magazine",
    "website": "https://resourceworld.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "The Northern Miner",
    "website": "https://www.northernminer.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/539da435-47b4-447f-9325-670c0aa24c1b/tnm_logo_tag_c-scaled.jpg?format=750w"
  },
  {
    "name": "The Prospector News",
    "website": "https://theprospectornews.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "VID",
    "website": "https://vidconferences.com",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  },
  {
    "name": "Government of Québec",
    "website": "https://www.quebec.ca",
    "tier": "government",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w"
  }
];

const SPONSORS_2024: SponsorItem[] = [
  {
    "name": "Government of Québec",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/24c9f57a-fcc7-447e-b07c-73b98a6781bc/Quebec+Goverment?format=750w",
    "website": "https://www.quebec.ca"
  },
  {
    "name": "Laurentian Bank Securities",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/7bef5867-7f22-43cd-92f1-87a63d2e7a20/Laurentian+Bank+Securities?format=750w",
    "website": "https://vmbl.ca"
  },
  {
    "name": "National Bank Financial Markets",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/32710a8b-b7cb-44bf-92a8-0a601abab945/fr+National+Bank.logo?format=750w",
    "website": "https://nbfm.ca"
  },
  {
    "name": "IBK Capital Corp.",
    "tier": "platinum",
    "website": "https://ibkcapital.com"
  },
  {
    "name": "Kinterra Capital",
    "tier": "platinum",
    "website": "https://kinterracapital.com"
  },
  {
    "name": "O3 Mining Inc.",
    "tier": "platinum",
    "website": "https://o3mining.com"
  },
  {
    "name": "Osisko Mining / Development",
    "tier": "platinum",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152619513-RXNE5B7DMFP5MS2TC7XN/Jean+Robitialle.+jpeg.jpeg?format=750w",
    "website": "https://osiskodev.com"
  },
  {
    "name": "First Phosphate Corp.",
    "tier": "gold",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/a2d714b0-76ef-43bb-8e49-da998a92f7c4/First+Phosphate+logo?format=750w",
    "website": "https://firstphosphate.com"
  },
  {
    "name": "Glencore Canada",
    "tier": "gold",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/eef56d14-571d-4299-8058-b2352b9cf3b0/Glencore+Logo?format=750w",
    "website": "https://www.glencore.com"
  },
  {
    "name": "Osisko Gold Royalties",
    "tier": "silver",
    "website": "https://osiskogr.com"
  },
  {
    "name": "Canadian Securities Exchange (CSE)",
    "tier": "silver",
    "website": "https://thecse.com"
  },
  {
    "name": "PearTree Canada",
    "tier": "silver",
    "website": "https://peartreecanada.com"
  },
  {
    "name": "IR.INC",
    "tier": "silver",
    "website": "https://irinc.ca"
  },
  {
    "name": "Stifel",
    "tier": "silver",
    "website": "https://www.stifel.com"
  },
  {
    "name": "MI3 Financial Communications Inc.",
    "tier": "silver",
    "website": "https://mi3.ca"
  },
  {
    "name": "TMX Group",
    "tier": "silver",
    "website": "https://www.tmx.com"
  },
  {
    "name": "VRIFY Technology",
    "tier": "silver",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/8a9b493b-a8de-475a-85fe-87ec50acd64d/vrify_logo_2023_logo-black.jpg?format=750w",
    "website": "https://vrify.com"
  },
  {
    "name": "Alliance Advisors",
    "tier": "copper",
    "website": "https://allianceadvisors.com"
  },
  {
    "name": "Amex Exploration",
    "tier": "copper",
    "website": "https://amexexploration.com"
  },
  {
    "name": "Brooks & Nelson",
    "tier": "copper",
    "website": "https://brooksandnelson.com"
  },
  {
    "name": "Cassels",
    "tier": "copper",
    "website": "https://cassels.com"
  },
  {
    "name": "CDPQ (La Caisse)",
    "tier": "copper",
    "website": "https://www.cdpq.com"
  },
  {
    "name": "Centre des congrès de Québec",
    "tier": "copper",
    "website": "https://www.convention.qc.ca"
  },
  {
    "name": "Crux Investor",
    "tier": "copper",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/4c151119-c45b-4f3b-b930-14cf54873e36/64ddea86f448fb2c08808739_cruxinvestor-open-graph.jpg?format=750w",
    "website": "https://cruxinvestor.com"
  },
  {
    "name": "Digbee Limited",
    "tier": "copper",
    "website": "https://digbee.com"
  },
  {
    "name": "Domco",
    "tier": "copper",
    "website": "https://domcogroup.ca"
  },
  {
    "name": "Generation IACP",
    "tier": "copper",
    "website": "https://generationiacp.com"
  },
  {
    "name": "GBR (Global Business Reports)",
    "tier": "copper",
    "website": "https://www.gbreports.com"
  },
  {
    "name": "Infor Financial Group",
    "tier": "copper",
    "website": "https://inforfinancial.com"
  },
  {
    "name": "Outside The Box Capital",
    "tier": "copper",
    "website": "https://outsidethebox.capital"
  },
  {
    "name": "BTV (Business Television)",
    "tier": "media",
    "website": "https://btonline.com"
  },
  {
    "name": "Resource World Magazine",
    "tier": "media",
    "website": "https://resourceworld.com"
  },
  {
    "name": "CEO.CA",
    "tier": "media",
    "website": "https://ceo.ca"
  },
  {
    "name": "EUR Media",
    "tier": "media",
    "website": "https://eurmedia.ca"
  },
  {
    "name": "Kitco News",
    "tier": "media",
    "website": "https://www.kitco.com"
  },
  {
    "name": "Market One Media",
    "tier": "media",
    "website": "https://marketonemedia.com"
  },
  {
    "name": "Junior Mining Network",
    "tier": "media",
    "website": "https://juniorminingnetwork.com"
  },
  {
    "name": "Mining Discovery",
    "tier": "media",
    "website": "https://miningdiscovery.com"
  },
  {
    "name": "MiningIR",
    "tier": "media",
    "website": "https://miningir.com"
  },
  {
    "name": "Newsfile Corp.",
    "tier": "media",
    "website": "https://www.newsfilecorp.com"
  },
  {
    "name": "The Northern Miner",
    "tier": "media",
    "image": "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/539da435-47b4-447f-9325-670c0aa24c1b/tnm_logo_tag_c-scaled.jpg?format=750w",
    "website": "https://www.northernminer.com"
  },
  {
    "name": "The Prospector News",
    "tier": "media",
    "website": "https://theprospectornews.com"
  },
  {
    "name": "VID Conferences",
    "tier": "media",
    "website": "https://vidconferences.com"
  }
];

export default function SponsorsView({ year = 2026 }: { year?: number }) {
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: "All Sponsors" },
    { id: "presenting", label: "Presenting Sponsor" },
    { id: "platinum", label: "Platinum Sponsors" },
    { id: "gold", label: "Gold Sponsors" },
    { id: "silver", label: "Silver Sponsors" },
    { id: "copper", label: "Copper Sponsors" },
    { id: "media", label: "Media Partners" },
    { id: "government", label: "Government / Special" },
  ];

  const filteredSponsors = useMemo(() => {
    if (selectedCategory === "all") return SPONSORS_2025;
    return SPONSORS_2025.filter((s) => s.tier === selectedCategory);
  }, [selectedCategory]);

  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case "presenting":
        return "bg-rose-500/10 text-[#C6112F] border-[#C6112F]/40";
      case "platinum":
        return "bg-amber-500/10 text-amber-800 border-amber-500/30";
      case "gold":
        return "bg-yellow-500/10 text-yellow-800 border-yellow-500/30";
      case "silver":
        return "bg-slate-500/10 text-slate-800 border-slate-500/30";
      case "copper":
        return "bg-orange-500/10 text-orange-800 border-orange-500/30";
      case "government":
        return "bg-emerald-500/10 text-emerald-800 border-emerald-500/30";
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
      case "silver":
        return "Silver Sponsor";
      case "copper":
        return "Copper Sponsor";
      case "government":
        return "Government / Special";
      case "media":
      default:
        return "Media Partner";
    }
  };

  return (
    <div className="w-full text-left font-sans">
      {/* Year Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6112F] animate-pulse shrink-0" />
          <span className="text-xs font-black tracking-widest uppercase text-neutral-500 whitespace-nowrap">
            Sponsor Edition:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedYear(2026)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${selectedYear === 2026
                  ? "bg-[#C6112F] text-white shadow-md"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
            >
              2026 Sponsors
            </button>
            <button
              onClick={() => setSelectedYear(2025)}
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
          Showing {selectedYear === 2025 ? filteredSponsors.length : 50}+ Official Sponsors
        </span>
      </div>

      {/* Tier Category Filters Row */}
      {selectedYear === 2025 && (
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
      )}

      {/* ════════ 2025 SPONSORS GRID ════════ */}
      {selectedYear === 2025 ? (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-grow h-[1px] bg-neutral-200" />
            <b className="text-xs sm:text-sm font-extrabold text-[#C6112F] tracking-[0.25em] uppercase whitespace-nowrap">
              OFFICIAL 2025 SPONSORS & PARTNERS
            </b>
            <div className="flex-grow h-[1px] bg-neutral-200" />
          </div>

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
                  <img
                    src={sponsor.image || ""}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
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
        </div>
      ) : (
        /* ════════ 2026 SPONSORS TIERS ════════ */
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-grow h-[1px] bg-neutral-200" />
            <b className="text-xs sm:text-sm font-extrabold text-[#C6112F] tracking-[0.25em] uppercase whitespace-nowrap">
              OFFICIAL 2026 SPONSOR TIERS
            </b>
            <div className="flex-grow h-[1px] bg-neutral-200" />
          </div>

          <div className="bg-neutral-50/60 border border-neutral-200 rounded-2xl overflow-hidden mb-6 grid grid-cols-1 lg:grid-cols-12 shadow-2xs hover:border-[#C6112F]/30 transition-all">
            <div className="lg:col-span-2 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#78350F] p-6 text-center flex flex-col items-center justify-center gap-2 border-b lg:border-b-0 lg:border-r border-[#FCD34D]">
              <b className="text-xs font-black tracking-wider leading-tight uppercase">
                PLATINUM<br />SPONSOR
              </b>
            </div>
            <div className="lg:col-span-3 p-6 flex flex-col justify-center items-center text-center bg-white border-b lg:border-b-0 lg:border-r border-neutral-200">
              <div className="text-[#e65400] text-4xl font-extrabold tracking-tighter leading-none select-none font-sans mb-1">
                BHP
              </div>
              <span className="text-xs font-bold text-neutral-900">BHP Group</span>
            </div>
            <div className="lg:col-span-5 p-6 flex items-center text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
              BHP is a leading global resources company committed to creating long-term value.
            </div>
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
        </div>
      )}

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
        </div>
      </div>
    </div>
  );
}
