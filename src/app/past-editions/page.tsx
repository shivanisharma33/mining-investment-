"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const years = [2026, 2025, 2024, 2023];

const editionCards = [
  {
    year: 2026,
    title: "The Biggest Edition Yet",
    titleFr: "La plus grande édition à ce jour",
    desc: "Uniting global leaders for impactful conversations and investments.",
    descFr: "Rassembler les dirigeants mondiaux pour des conversations et des investissements impactants.",
    image: "/Mining Investment Post 2.avif",
    isGrayscale: false,
  },
  {
    year: 2025,
    title: "Driving Global Investment",
    titleFr: "Propulser l'investissement mondial",
    desc: "Connecting capital with opportunity across the mining value chain.",
    descFr: "Connecter le capital aux opportunités dans toute la chaîne de valeur minière.",
    image: "/image%2015%20(2).avif",
    isGrayscale: true,
  },
  {
    year: 2024,
    title: "Critical Minerals Focus",
    titleFr: "Focus sur les minéraux critiques",
    desc: "Exploring the future of critical minerals and sustainable growth.",
    descFr: "Explorer l'avenir des minéraux critiques et de la croissance durable.",
    image: "/Mining Investment Post 3.avif",
    isGrayscale: true,
  },
  {
    year: 2023,
    title: "Building New Partnerships",
    titleFr: "Bâtir de nouveaux partenariats",
    desc: "Strengthening relationships that drive the mining industry forward.",
    descFr: "Renforcer les relations qui font progresser l'industrie minière.",
    image: "/Mining Investment Post (1) 2.avif",
    isGrayscale: true,
  },
];

const impactStats = [
  {
    value: "50+",
    label: "SPEAKERS",
    labelFr: "CONFÉRENCIERS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.287a6 6 0 010 7.427M11 6H7a2 2 0 00-2 2v8a2 2 0 002 2h4l5 5V1L11 6z" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "INVESTORS",
    labelFr: "INVESTISSEURS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    value: "300+",
    label: "MINING COMPANIES",
    labelFr: "SOCIÉTÉS MINIÈRES",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 5h4v2h-4V5z" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "COUNTRIES",
    labelFr: "PAYS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
      </svg>
    ),
  },
  {
    value: "12,000+",
    label: "MEETINGS",
    labelFr: "RÉUNIONS",
    icon: (
      <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5L10 14.5L14.5 10M17 11.5L14 8.5L9.5 13M4 10l3-3 4 4M20 14l-3 3-4-4" />
      </svg>
    ),
  },
];

const sidebarTabs = [
  {
    id: "overview",
    label: "OVERVIEW",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: "companies",
    label: "Participating Companies",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "brochures",
    label: "Brochures",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "agenda",
    label: "Agenda",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "sponsors",
    label: "Sponsors",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
];

// Complete 140+ Participating Companies Dataset extracted from Google Spreadsheet
const rawCompaniesData = [
  { name: "1911 GOLD CORPORATION", ticker: "TSX-V: AUMB", email: "Update@1911gold.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "ABCOURT MINES INC.", ticker: "TSX-V: ABI", email: "info@abcourt.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "AGNICO EAGLE MINES LIMITED", ticker: "TSX: AEM | NYSE: AEM", email: "info@agnicoeagle.com", country: "Global", sector: "Gold Mining", type: "Producer" },
  { name: "ALAMOS GOLD INC.", ticker: "TSX: AGI | NYSE: AGI", email: "info@alamosgold.com", country: "Canada", sector: "Gold Mining", type: "Producer" },
  { name: "ALKANE RESOURCES LIMITED", ticker: "TSX: ALK | ASX: ALK", email: "info@alkres.com", country: "Australia", sector: "Gold & Antimony", type: "Producer" },
  { name: "ANDEAN PRECIOUS METALS CORP.", ticker: "TSX: APM", email: "info@andeanpm.com", country: "Mexico", sector: "Gold & Silver", type: "Producer" },
  { name: "APEX CRITICAL METALS CORP", ticker: "CSE: APXC", email: "info@apexcriticalmetals.com", country: "Canada", sector: "Rare Earths & Niobium", type: "Explorer" },
  { name: "ARGENTA SILVER CORP", ticker: "TSX-V: AGAG", email: "info@argentasilver.com", country: "Argentina", sector: "Silver Mining", type: "Explorer" },
  { name: "ARGO GOLD INC.", ticker: "TSX-V: ARQ", email: "jbaker@argogold.ca", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "ARIZONA GOLD & SILVER INC.", ticker: "TSX-V: AZS", email: "info@arizonagoldsilver.com", country: "USA", sector: "Gold & Silver", type: "Explorer" },
  { name: "ARIZONA METALS CORP.", ticker: "TSX: AMC", email: "info@arizonametals.com", country: "USA", sector: "Gold, Copper & Zinc", type: "Developer" },
  { name: "ASTRA EXPLORATION INC", ticker: "TSX-V: ASTR", email: "info@astra-exploration.com", country: "Chile", sector: "Gold & Silver", type: "Explorer" },
  { name: "ATHA ENERGY CORP", ticker: "TSX-V: SASK", email: "info@athaenergy.com", country: "Canada", sector: "Uranium", type: "Developer" },
  { name: "ATLAS SALT INC.", ticker: "TSX-V: ATLAS", email: "info@atlassalt.com", country: "Canada", sector: "Industrial Minerals", type: "Developer" },
  { name: "AURIGINAL MINING CORP", ticker: "TSX-V: AUME", email: "info@auriginal.ca", country: "Canada", sector: "Gold & Copper", type: "Explorer" },
  { name: "AURION RESOURCES LTD.", ticker: "TSX-V: AU", email: "info@aurionresources.ca", country: "Finland", sector: "Gold & Silver", type: "Developer" },
  { name: "AVANTI GOLD CORP", ticker: "CSE: AGC", email: "info@avantigoldcorp.com", country: "DRC", sector: "Gold Mining", type: "Explorer" },
  { name: "AZIMUT EXPLORATION INC.", ticker: "TSX-V: AZM", email: "info@azimut-exploration.com", country: "Canada", sector: "Gold, Copper & Lithium", type: "Explorer" },
  { name: "BLUE LAGOON RESOURCES INC", ticker: "CSE: BLLG", email: "info@bluelagoonresources.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "BONTERRA RESOURCES INC.", ticker: "TSX-V: BTR", email: "info@btrgold.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "BHP Group", ticker: "ASX: BHP | NYSE: BHP", email: "info@bhp.com", country: "Australia", sector: "Mining & Metals", type: "Producer" },
  { name: "Rio Tinto", ticker: "LSE: RIO | NYSE: RIO", email: "info@riotinto.com", country: "United Kingdom", sector: "Mining & Metals", type: "Producer" },
  { name: "Newmont Corporation", ticker: "NYSE: NEM | TSX: NGT", email: "info@newmont.com", country: "United States", sector: "Gold Mining", type: "Producer" },
  { name: "Vale S.A.", ticker: "NYSE: VALE", email: "info@vale.com", country: "Brazil", sector: "Mining & Metals", type: "Producer" },
  { name: "Anglo American", ticker: "LSE: AAL", email: "info@angloamerican.com", country: "South Africa", sector: "Mining & Metals", type: "Producer" },
  { name: "Glencore plc", ticker: "LSE: GLEN", email: "info@glencore.com", country: "Switzerland", sector: "Commodities Trading", type: "Producer" },
  { name: "BRIXTON METALS CORPORATION", ticker: "TSX-V: BBB", email: "info@brixtonmetals.com", country: "Canada", sector: "Copper, Gold & Silver", type: "Explorer" },
  { name: "BRUNSWICK EXPLORATION", ticker: "TSX: BRW", email: "info@brwexplo.ca", country: "Canada", sector: "Lithium", type: "Explorer" },
  { name: "CARTIER RESOURCES INC.", ticker: "TSX-V: ECR", email: "philippe.cloutier@ressourcescartier.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "CASCADIA MINERALS LTD", ticker: "TSX-V: CAM", email: "info@cascadiaminerals.com", country: "Canada", sector: "Gold & Copper", type: "Explorer" },
  { name: "CASSIAR GOLD CORP.", ticker: "TSX-V: GLDC", email: "jasons@cassiargold.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "CENTERRA GOLD INC.", ticker: "TSX: CG | NYSE: CGAU", email: "info@centerragold.com", country: "Canada", sector: "Gold & Copper", type: "Producer" },
  { name: "CERRADO GOLD INC.", ticker: "TSX-V: CERT", email: "info@cerradogold.com", country: "Argentina", sector: "Gold Mining", type: "Producer" },
  { name: "CERRO DE PASCO RESOURCES INC", ticker: "TSX-V: CDPR", email: "info@pascoresources.com", country: "Peru", sector: "Copper, Zinc & Gold", type: "Developer" },
  { name: "COLLECTIVE MINING LTD", ticker: "TSX: CNL | NYSE: CNL", email: "info@collectivemining.com", country: "Colombia", sector: "Gold & Silver", type: "Developer" },
  { name: "COMMERCE RESOURCES CORP.", ticker: "TSX-V: CCE", email: "hello@cimply.com.au", country: "Canada", sector: "Rare Earths", type: "Developer" },
  { name: "CRITICAL ELEMENTS LITHIUM CORPORATION", ticker: "TSX-V: CRE", email: "info@celithium.com", country: "Canada", sector: "Lithium", type: "Developer" },
  { name: "CUPANI METALS CORPORATION", ticker: "CSE: CUPA", email: "info@cupanimetals.com", country: "Canada", sector: "Copper Mining", type: "Explorer" },
  { name: "CYGNUS METALS LIMITED", ticker: "TSX-V: CYG", email: "info@cygnusmetals.com", country: "Canada", sector: "Gold & Copper", type: "Explorer" },
  { name: "DOLLY VARDEN SILVER CORP", ticker: "TSX-V: DV", email: "info@dollyvardensilver.com", country: "Canada", sector: "Silver & Gold", type: "Developer" },
  { name: "DOMESTIC METALS CORP", ticker: "TSX-V: DMCU", email: "info@domesticmetals.com", country: "USA", sector: "Copper & Gold", type: "Explorer" },
  { name: "DRYDEN GOLD CORP", ticker: "TSX-V: DRY", email: "ir@drydengold.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "DUMONT NICKEL INC.", ticker: "PRIVATE", email: "info@dumontnickel.com", country: "Canada", sector: "Nickel & Cobalt", type: "Developer" },
  { name: "DYNASTY GOLD CORP", ticker: "TSX-V: DYG", email: "info@dynastygoldcorp.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "ELEMENT 29 RESOURCES INC.", ticker: "TSX-V: ECU", email: "info@e29copper.com", country: "Peru", sector: "Copper Mining", type: "Developer" },
  { name: "EMPEROR METALS INC.", ticker: "CSE: AUOZ", email: "info@emperormetals.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "EQUINOX GOLD CORP.", ticker: "TSX: EQX | NYSE: EQX", email: "ryan.king@equinoxgold.com", country: "Canada", sector: "Gold Mining", type: "Producer" },
  { name: "EQUITY METALS CORPORATION", ticker: "TSX-V: EQTY", email: "info@mnxltd.com", country: "Canada", sector: "Gold, Silver & Copper", type: "Explorer" },
  { name: "ERANOVA METALS INC.", ticker: "TSX-V: NOVA", email: "meades@stuhini.com", country: "Canada", sector: "Molybdenum", type: "Developer" },
  { name: "ES GOLD CORP", ticker: "CSE: ESAU", email: "info@esgold.com", country: "Canada", sector: "Gold & Silver", type: "Explorer" },
  { name: "EXIRO NICKEL COMPANY", ticker: "PRIVATE", email: "info@exironickel.ca", country: "Canada", sector: "Nickel", type: "Explorer" },
  { name: "EXPLOITS DISCOVERY CORP.", ticker: "CSE: NFLD", email: "investors@exploits.gold", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "FALCON COPPER CORP", ticker: "PRIVATE", email: "info@falconcopper.com", country: "USA", sector: "Copper Mining", type: "Explorer" },
  { name: "FIREFLY METALS LTD", ticker: "TSX: FFM | ASX: FFM", email: "info@fireflymetals.com.au", country: "Canada", sector: "Copper & Gold", type: "Developer" },
  { name: "FIRST CANADIAN GRAPHITE INC", ticker: "TSX: FCI", email: "info@firstcanadiangraphite.com", country: "Canada", sector: "Graphite", type: "Developer" },
  { name: "FIRST MINING GOLD CORP", ticker: "TSX: FF", email: "info@firstmininggold.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "FIRST PHOSPHATE CORP.", ticker: "CSE: PHOS", email: "questions@firstphosphate.com", country: "Canada", sector: "Battery & Phosphate", type: "Developer" },
  { name: "FORMATION METALS INC", ticker: "CSE: FOMO", email: "ir@formationmetalsinc.com", country: "Canada", sector: "Polymetallic", type: "Explorer" },
  { name: "FPX NICKEL CORP", ticker: "TSX-V: FPX", email: "ceo@fpxnickel.com", country: "Canada", sector: "Nickel", type: "Developer" },
  { name: "GEOMEGA RESOURCES INC.", ticker: "TSX-V: GMA", email: "kmugerman@geomega.ca", country: "Canada", sector: "Rare Earths", type: "Developer" },
  { name: "GOLDEN CARIBOO RESOURCES LTD.", ticker: "CSE: GCC", email: "info@goldencariboo.com", country: "Canada", sector: "Gold & Silver", type: "Explorer" },
  { name: "GR SILVER MINING LTD.", ticker: "TSX-V: GRSL", email: "info@grsilvermining.com", country: "Mexico", sector: "Silver Mining", type: "Developer" },
  { name: "GREENLIGHT METALS INC.", ticker: "TSX-V: GRL", email: "info@greenlightmetals.com", country: "USA", sector: "Copper, Zinc & Gold", type: "Explorer" },
  { name: "GUANAJUATO SILVER COMPANY", ticker: "TSX-V: GSVR", email: "info@gsilver.com", country: "Mexico", sector: "Silver & Gold", type: "Producer" },
  { name: "GUNNISON COPPER CORP", ticker: "TSX: GCU", email: "Info@gunnisoncopper.com", country: "USA", sector: "Copper Mining", type: "Developer" },
  { name: "HARFANG EXPLORATION INC.", ticker: "TSX-V: HAR", email: "info@harfangexploration.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "HELIOSTAR METALS LTD.", ticker: "TSX-V: HSTR", email: "info@heliostarmetals.com", country: "Mexico", sector: "Gold Mining", type: "Producer" },
  { name: "HI VIEW RESOURCES INC", ticker: "CSE: HVW", email: "info@hiviewresources.com", country: "Canada", sector: "Gold & Copper", type: "Explorer" },
  { name: "IAMGOLD CORPORATION", ticker: "TSX: IMG | NYSE: IAG", email: "info@iamgold.com", country: "Canada", sector: "Gold Mining", type: "Producer" },
  { name: "JUNO CORP.", ticker: "PRIVATE", email: "info@junocorp.ca", country: "Canada", sector: "Copper & Gold", type: "Explorer" },
  { name: "KIRKLAND LAKE DISCOVERIES", ticker: "TSX-V: KLDC", email: "info@kirklandlakediscoveries.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "LAFLEUR MINERALS INC.", ticker: "CSE: LFLR", email: "info@lafleurminerals.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "LAHONTAN GOLD CORP.", ticker: "TSX-V: LG", email: "info@lahontangoldcorp.com", country: "USA", sector: "Gold Mining", type: "Developer" },
  { name: "LATIN METALS INC", ticker: "TSX-V: LMS", email: "Info@latin-metals.com", country: "Peru", sector: "Gold, Silver & Copper", type: "Explorer" },
  { name: "LAVRAS GOLD CORP.", ticker: "TSX-V: LGC", email: "info@lavrasgold.com", country: "Brazil", sector: "Gold Mining", type: "Developer" },
  { name: "LEVIATHAN METALS CORP.", ticker: "TSX-V: LVX", email: "info@leviathanmetals.com", country: "Botswana", sector: "Copper & Zinc", type: "Explorer" },
  { name: "Li-FT POWER LTD", ticker: "TSX-V: LIFT", email: "info@li-ft.com", country: "Canada", sector: "Lithium", type: "Developer" },
  { name: "LOMIKO METALS INC.", ticker: "TSX-V: LMR", email: "communaute@lomiko.com", country: "Canada", sector: "Graphite", type: "Developer" },
  { name: "LOYALIST EXPLORATION LIMITED", ticker: "CSE: PNGC", email: "efarr@loyalistexploration.com", country: "Canada", sector: "Gold & Rare Earths", type: "Explorer" },
  { name: "MAGMA SILVER CORP.", ticker: "TSX-V: MGMA", email: "info@magmasilver.com", country: "Peru", sector: "Gold & Silver", type: "Explorer" },
  { name: "MAPLE GOLD MINES LTD", ticker: "OTCQX: MGMLF", email: "info@maplegoldmines.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "MCFARLANE LAKE MINING LIMITED", ticker: "CSE: MLM", email: "info@mcfarlanelakemining.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "MIDLAND EXPLORATION INC.", ticker: "TSX-V: MD", email: "info@midlandexploration.com", country: "Canada", sector: "Gold & PGEs", type: "Explorer" },
  { name: "MINAURUM SILVER INC.", ticker: "TSX-V: MGG", email: "info@minaurum.com", country: "Mexico", sector: "Gold & Silver", type: "Developer" },
  { name: "MINERA ALAMOS INC", ticker: "TSX-V: MAI", email: "info@mineraalamos.com", country: "Mexico", sector: "Gold Mining", type: "Producer" },
  { name: "MINEROS S.A.", ticker: "TSX: MSA", email: "info@mineros.com.co", country: "Chile", sector: "Gold Mining", type: "Producer" },
  { name: "MITHRIL SILVER AND GOLD LIMITED", ticker: "TSX-V: MSG | ASX: MTH", email: "investors@mithrilsilvergold.com", country: "Mexico", sector: "Silver & Gold", type: "Developer" },
  { name: "NEW AGE METALS INC.", ticker: "TSX-V: NAM", email: "info@newagemetals.com", country: "Canada", sector: "Lithium & PGEs", type: "Explorer" },
  { name: "NEW FOUND GOLD CORP.", ticker: "TSX-V: NFG | NYSE: NFGC", email: "contact@newfoundgold.ca", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "NEW PACIFIC METALS CORP.", ticker: "TSX: NUAG | NYSE: NEWP", email: "invest@newpacificmetals.com", country: "Bolivia", sector: "Silver Mining", type: "Developer" },
  { name: "NEXGOLD MINING CORP", ticker: "TSX-V: NEXG", email: "info@nexgold.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "NICOLA MINING INC", ticker: "TSX-V: NIM", email: "info@nicolamining.com", country: "Canada", sector: "Copper, Silver & Gold", type: "Developer" },
  { name: "NORTH ATLANTIC TITANIUM CORP", ticker: "CSE: NATO", email: "info@natitanium.com", country: "Canada", sector: "Titanium", type: "Explorer" },
  { name: "NORTHISLE COPPER & GOLD INC.", ticker: "TSX-V: NCX", email: "info@northisle.ca", country: "Canada", sector: "Copper & Gold", type: "Developer" },
  { name: "NUVAU MINERALS CORP", ticker: "TSX-V: NMC", email: "info@nuvauminerals.com", country: "Canada", sector: "Zinc & Copper", type: "Explorer" },
  { name: "ONYX GOLD CORP", ticker: "TSX-V: ONYX", email: "information@onyxgold.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "OR ROYALTIES INC", ticker: "TSX: OR | NYSE: OR", email: "info@ORroyalties.com", country: "Global", sector: "Royalties", type: "Producer" },
  { name: "ORVANA MINERALS CORP.", ticker: "TSX: ORV", email: "nmenendez@orvana.com", country: "Spain", sector: "Gold, Copper & Silver", type: "Producer" },
  { name: "OSISKO DEVELOPMENT CORP.", ticker: "TSX-V: ODV | NYSE: ODV", email: "info@osiskodev.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "OUTCROP SILVER CORPORATION", ticker: "TSX: OCG", email: "info@outcropsilver.com", country: "Colombia", sector: "Silver Mining", type: "Developer" },
  { name: "PANTHER METALS PLC", ticker: "LSE: PALM", email: "info@panthermetals.co.uk", country: "Canada", sector: "Polymetallic", type: "Explorer" },
  { name: "PELANGIO EXPLORATION INC.", ticker: "TSX-V: PX", email: "info@pelangio.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "PELOTON MINERALS CORPORATION", ticker: "CSE: PMC", email: "pelotonminerals45@gmail.com", country: "USA", sector: "Lithium & Rare Earths", type: "Explorer" },
  { name: "PERSEVERANCE METALS INC.", ticker: "TSX-V: PMI", email: "info@perseverancemetals.com", country: "Canada", sector: "Nickel & Copper", type: "Explorer" },
  { name: "PMET RESOURCES INC", ticker: "TSX: PMET | ASX: PMT", email: "eroy@pmet.ca", country: "Canada", sector: "Lithium", type: "Developer" },
  { name: "POWER METALLIC MINES INC.", ticker: "TSX-V: PNPN", email: "duncan@powermetallic.com", country: "Canada", sector: "Polymetallic", type: "Explorer" },
  { name: "Q2 METALS CORP.", ticker: "TSX-V: QTWO", email: "info@q2metals.com", country: "Canada", sector: "Lithium", type: "Explorer" },
  { name: "RADISSON MINING RESOURCES INC.", ticker: "TSX-V: RDS", email: "info@radissonmining.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "RESOURO STRATEGIC METALS INC.", ticker: "TSX-V: RSM", email: "info@resouro.com", country: "Brazil", sector: "Rare Earths & Titanium", type: "Developer" },
  { name: "RPX GOLD INC", ticker: "TSX-V: RPX", email: "info@rpxgold.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "SAN CRISTOBAL MINING", ticker: "PRIVATE", email: "info@sancristobal.com", country: "Bolivia", sector: "Silver, Zinc & Lead", type: "Producer" },
  { name: "SAUDI GOLD REFINERY CO.", ticker: "PRIVATE", email: "info@sgr-sa.com", country: "Saudi Arabia", sector: "Gold Refining", type: "Producer" },
  { name: "SCANDIUM CANADA LIMITED", ticker: "TSX-V: SCD", email: "info@scandium-canada.com", country: "Canada", sector: "Scandium", type: "Developer" },
  { name: "SCORPIO GOLD CORP", ticker: "TSX-V: SGN", email: "ir@scorpiogold.com", country: "USA", sector: "Gold Mining", type: "Developer" },
  { name: "SCOTTIE RESOURCES CORP.", ticker: "TSX-V: SCOT", email: "brad@scottieresources.com", country: "Canada", sector: "Gold & Silver", type: "Explorer" },
  { name: "SCOUT DISCOVERIES CORP.", ticker: "PRIVATE", email: "info@scoutdiscoveries.com", country: "USA", sector: "Gold, Silver & Copper", type: "Explorer" },
  { name: "SEARCH MINERALS", ticker: "TSX-V: SMY", email: "info@searchminerals.ca", country: "Canada", sector: "Rare Earths", type: "Developer" },
  { name: "SELKIRK COPPER MINES INC.", ticker: "TSX-V: SCMI", email: "info@selkirkcopper.com", country: "Canada", sector: "Copper, Gold & Silver", type: "Explorer" },
  { name: "SERABI GOLD PLC", ticker: "TSX: SBI", email: "contact@serabigold.com", country: "Brazil", sector: "Gold Mining", type: "Producer" },
  { name: "SILVER ONE RESOURCES INC", ticker: "TSX-V: SVE", email: "info@silverone.com", country: "USA", sector: "Silver Mining", type: "Explorer" },
  { name: "SILVER X MINING CORP", ticker: "TSX-V: AGX", email: "info@silverxmining.com", country: "Peru", sector: "Silver Mining", type: "Producer" },
  { name: "SIRIOS RESOURCES INC.", ticker: "TSX-V: SOI", email: "info@sirios.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "SKEENA RESOURCES LIMITED", ticker: "TSX: SKE | NYSE: SKE", email: "info@skeenaresources.com", country: "Canada", sector: "Gold, Silver & Copper", type: "Developer" },
  { name: "SOUTH KIRKLAND GOLD", ticker: "PRIVATE", email: "info@southkirkland.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "SPANISH MOUNTAIN GOLD LTD", ticker: "TSX-V: SPA", email: "info@spanishmountaingold.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "STANDARD URANIUM LTD", ticker: "TSX-V: STND", email: "info@standarduranium.ca", country: "Canada", sector: "Uranium", type: "Explorer" },
  { name: "STLLR GOLD INC.", ticker: "TSX: STLR", email: "info@stllrgold.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "SUMMIT ROYALTIES LTD", ticker: "PRIVATE", email: "info@summit-royalties.com", country: "Global", sector: "Royalties", type: "Producer" },
  { name: "SUN SUMMIT MINERALS CORP.", ticker: "TSX-V: SMN", email: "info@sunsummitminerals.com", country: "Canada", sector: "Gold, Silver & Copper", type: "Explorer" },
  { name: "SURGE COPPER CORP.", ticker: "TSX-V: SURG", email: "info@surgecopper.com", country: "Canada", sector: "Copper & Molybdenum", type: "Developer" },
  { name: "TALISKER RESOURCES LTD", ticker: "TSX: TSK", email: "info@taliskerresources.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "TARGA EXPLORATION CORP.", ticker: "CSE: TEX", email: "info@targaexploration.com", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "TRIDENT RESOURCES CORP.", ticker: "TSX-V: ROCK", email: "Info@tridentresourcescorp.com", country: "Canada", sector: "Gold & Copper", type: "Explorer" },
  { name: "TROILUS GOLD CORPORATION", ticker: "TSX: TLG", email: "info@troilusgold.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "TRONIC METALS", ticker: "PRIVATE", email: "info@tronicmetals.com", country: "Africa", sector: "Battery Metals", type: "Explorer" },
  { name: "URANIUM X DISCOVERY CORP.", ticker: "CSE: STMN", email: "info@uraniumx.ca", country: "Canada", sector: "Uranium", type: "Explorer" },
  { name: "US GOLD CORP", ticker: "NASDAQ: USAU", email: "info@usgoldcorp.gold", country: "USA", sector: "Gold & Copper", type: "Developer" },
  { name: "VALKEA RESOURCES CORP", ticker: "TSX-V: OZ", email: "info@valkea.ca", country: "Finland", sector: "Gold Mining", type: "Explorer" },
  { name: "VANADIUMCORP RESOURCE INC.", ticker: "TSX-V: VRB", email: "info@vanadiumcorp.com", country: "Canada", sector: "Vanadium", type: "Developer" },
  { name: "VIOR GOLD CORPORATION INC", ticker: "TSX-V: VIO", email: "info@vior.ca", country: "Canada", sector: "Gold & Nickel", type: "Explorer" },
  { name: "VIZSLA SILVER CORP", ticker: "TSX-V: VZLA | NYSE: VZLA", email: "info@vizslasilver.ca", country: "Mexico", sector: "Silver Mining", type: "Developer" },
  { name: "VOLTA METALS LTD.", ticker: "CSE: VLTA", email: "info@voltametals.ca", country: "Canada", sector: "Critical Metals", type: "Explorer" },
  { name: "WALLBRIDGE MINING COMPANY", ticker: "TSX: WM", email: "info@wallbridgemining.com", country: "Canada", sector: "Gold Mining", type: "Developer" },
  { name: "WESDOME GOLD MINES LTD.", ticker: "TSX: WDO", email: "info@wesdome.com", country: "Canada", sector: "Gold Mining", type: "Producer" },
  { name: "WHITE GOLD CORP", ticker: "TSX-V: WGO", email: "ir@whitegoldcorp.ca", country: "Canada", sector: "Gold Mining", type: "Explorer" },
  { name: "WINSHEAR GOLD CORP", ticker: "TSX-V: WINS", email: "info@winshear.com", country: "Canada", sector: "Gold & Nickel", type: "Explorer" },
  { name: "XXIX METAL CORP.", ticker: "TSX-V: XXIX", email: "info@xxix.ca", country: "Canada", sector: "Copper Mining", type: "Explorer" },
  { name: "YUKON METALS CORP", ticker: "CSE: YMC", email: "info@yukonmetals.com", country: "Canada", sector: "Copper, Gold & Silver", type: "Explorer" },
];

// Helper to generate initials & color badges for company logos
function getCompanyLogoBadge(name: string) {
  const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  let initials = words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0].substring(0, 3).toUpperCase();

  // Custom brand color palette
  const colors = [
    { bg: "bg-[#e65400]/10", text: "text-[#e65400]", border: "border-[#e65400]/30" },
    { bg: "bg-[#d5001c]/10", text: "text-[#d5001c]", border: "border-[#d5001c]/30" },
    { bg: "bg-[#003da6]/10", text: "text-[#003da6]", border: "border-[#003da6]/30" },
    { bg: "bg-[#118e6f]/10", text: "text-[#118e6f]", border: "border-[#118e6f]/30" },
    { bg: "bg-[#00164e]/10", text: "text-[#00164e]", border: "border-[#00164e]/30" },
    { bg: "bg-[#8a6d3b]/10", text: "text-[#8a6d3b]", border: "border-[#8a6d3b]/30" },
    { bg: "bg-[#0077c8]/10", text: "text-[#0077c8]", border: "border-[#0077c8]/30" },
    { bg: "bg-[#b58500]/10", text: "text-[#b58500]", border: "border-[#b58500]/30" },
    { bg: "bg-[#C6112F]/10", text: "text-[#C6112F]", border: "border-[#C6112F]/30" },
  ];
  const charCode = name.charCodeAt(0) || 0;
  const chosenColor = colors[charCode % colors.length];

  return (
    <div className={`px-4 py-2 rounded-xl border ${chosenColor.border} ${chosenColor.bg} flex items-center justify-center font-extrabold tracking-wider ${chosenColor.text} text-sm sm:text-base shadow-xs`}>
      <span>{initials}</span>
    </div>
  );
}

// Interactive Google Logo Image Loader
function CompanyLogoImage({ name, email }: { name: string; email?: string }) {
  const [imgError, setImgError] = useState(false);
  const domain = email && email.includes("@") ? email.split("@")[1].trim().toLowerCase() : "";

  // Local overrides for specific logos
  if (name.toLowerCase().includes("agnico")) {
    return (
      <div className="h-12 flex items-center justify-center px-3 py-1.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs">
        <img
          src="/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png"
          alt={name}
          className="max-h-9 max-w-[130px] object-contain"
        />
      </div>
    );
  }

  // Google Favicon & Logo API URL
  const googleLogoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";

  if (googleLogoUrl && !imgError) {
    return (
      <div className="h-12 w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs group-hover:border-[#C6112F]/40 transition-colors">
        <img
          src={googleLogoUrl}
          alt={name}
          onError={() => setImgError(true)}
          className="w-6 h-6 object-contain shrink-0 rounded-sm"
        />
        <span className="text-xs font-extrabold text-neutral-800 tracking-tight truncate max-w-[110px]">
          {name.split(" ")[0]}
        </span>
      </div>
    );
  }

  return getCompanyLogoBadge(name);
}

// Extracted Brochure Page Renderer matching the official 4-page AGENDA PDF
function BrochurePageCanvas({ pageNumber, editionYear }: { pageNumber: number; editionYear: number }) {
  if (pageNumber === 1) {
    return (
      <div className="w-full bg-[#008ba3] text-white aspect-[640/852] p-5 sm:p-7 relative overflow-hidden shadow-2xl rounded-xl text-left border border-neutral-200 flex flex-col justify-between">
        <div>
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/30 mb-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-white/80 block">NATIONAL BANK &bull; VENTUM</span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">THE AGENDA</h2>
              <span className="text-xs font-bold text-white/90">June 1-4, 2026, Quebec City &bull; Centre des Congrès</span>
            </div>
            <div className="w-14 h-14 rounded-full bg-white text-[#008ba3] p-1.5 flex flex-col items-center justify-center text-center font-black leading-none shrink-0 shadow-md">
              <span className="text-[7px] tracking-wider text-neutral-600">QUEBEC CITY</span>
              <span className="text-[9px] font-extrabold text-[#C6112F]">THE</span>
              <span className="text-[8px] font-bold text-neutral-900">EVENT</span>
            </div>
          </div>

          {/* June 1 Section */}
          <div className="bg-[#005f73] p-2.5 rounded-lg mb-3 border border-white/20">
            <div className="flex items-center justify-between text-xs font-black uppercase mb-1">
              <span className="text-amber-300">JUNE 1, 2026</span>
              <span className="text-white/80 text-[10px]">ICONIC GOLF DAY &bull; PRE-REGISTRATION</span>
            </div>
            <div className="space-y-1 text-[11px] font-medium text-white/90">
              <div className="flex justify-between">
                <span>6:45 AM – 3:30 PM</span>
                <span className="font-bold">Iconic Golf Day – La Tempête</span>
              </div>
              <div className="flex justify-between">
                <span>5:00 – 9:00 PM</span>
                <span className="font-bold">Welcome Event & Pre-Registration (CAUR Tech & ITFA)</span>
              </div>
            </div>
          </div>

          {/* June 2 Section */}
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/20 space-y-2 text-xs">
            <div className="flex items-center justify-between font-black uppercase text-amber-300 pb-1 border-b border-white/20">
              <span>JUNE 2, 2026 &bull; PRODUCERS & DEVELOPERS</span>
              <span className="text-[10px] text-white">ROOM 400C</span>
            </div>

            <div className="space-y-1.5 text-[11px] font-medium">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-200 shrink-0">8:05 AM</span>
                <span>Keynote: Claude Guay, Parliamentary Secretary to Minister of Energy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-200 shrink-0">8:30 AM</span>
                <span>Keynote: Kateri Champagne-Jourdain, Minister of Natural Resources, Quebec</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-200 shrink-0">8:45 AM</span>
                <span>Presentations: Agnico Eagle, IAMGOLD, Equinox Gold, Hemlo Mining, Orezone</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-200 shrink-0">10:00 AM</span>
                <span>Fireside Panel: How Technology Is Redefining The Mining Lifecycle</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-200 shrink-0">12:15 PM</span>
                <span>Panel: Next-gen Mining Capital & Production-linked Finance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-200 shrink-0">2:45 PM</span>
                <span>Minister Spotlight: Hon. Jagrup Brar, Minister of Mining, BC</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-200 shrink-0">5:00 PM</span>
                <span>Keynote: Pete Hoekstra, U.S. Ambassador to Canada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/30 flex justify-between items-center text-[10px] font-bold text-white/80 uppercase">
          <span>PAGE 1 OF 4 &bull; OFFICIAL AGENDA</span>
          <span>JUNE 1-2, 2026</span>
        </div>
      </div>
    );
  }

  if (pageNumber === 2) {
    return (
      <div className="w-full bg-[#008b8b] text-white aspect-[640/852] p-5 sm:p-7 relative overflow-hidden shadow-2xl rounded-xl text-left border border-neutral-200 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/30 mb-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-amber-300 block">JUNE 3, 2026 &bull; WEDNESDAY</span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">CRITICAL METALS & TRANSITION ENERGY</h2>
            </div>
            <span className="text-xs font-bold text-white/80">ROOM 400C</span>
          </div>

          <div className="space-y-2.5 text-xs font-medium">
            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-200 block text-[11px]">8:05 AM KEYNOTE</span>
              <span>Jocelyn Douhéret &mdash; Québec Strategy for Critical and Strategic Minerals</span>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20 space-y-1 text-[11px]">
              <span className="font-bold text-amber-200 block">PRESENTATIONS (8:30 – 9:45 AM)</span>
              <div>Glencore Plc &bull; White Gold Corp &bull; New Pacific Metals &bull; PMET Resources &bull; NorthIsle</div>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-200 block text-[11px]">9:45 AM PANEL</span>
              <span>Beyond The Mine: The Physical Silver Scarcity (New Pacific, Outcrop Silver, Contango)</span>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-200 block text-[11px]">12:15 PM QUEBEC SPOTLIGHT</span>
              <span>Québec&apos;s Financing Ecosystem For Critical Minerals (Investissement Québec, SIDEX, La Caisse)</span>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-200 block text-[11px]">2:45 PM PANEL</span>
              <span>Powering the Transition: Critical Metals (Gunnison, Cerro De Pasco, Northisle, Juno Corp)</span>
            </div>

            <div className="p-2.5 bg-[#005f5f] rounded-lg border border-amber-300/40 text-center font-bold text-[11px]">
              6:00 PM Sponsors Cocktails &bull; 9:00 PM International Mining Week After Dark Event
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/30 flex justify-between items-center text-[10px] font-bold text-white/80 uppercase">
          <span>PAGE 2 OF 4 &bull; OFFICIAL AGENDA</span>
          <span>JUNE 3, 2026</span>
        </div>
      </div>
    );
  }

  if (pageNumber === 3) {
    return (
      <div className="w-full bg-[#d97706] text-white aspect-[640/852] p-5 sm:p-7 relative overflow-hidden shadow-2xl rounded-xl text-left border border-neutral-200 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/30 mb-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-amber-100 block">JUNE 4, 2026 &bull; THURSDAY</span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">EXPLORERS & DEVELOPERS</h2>
            </div>
            <span className="text-xs font-bold text-white/80">ROOM 400C</span>
          </div>

          <div className="space-y-2.5 text-xs font-medium">
            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-100 block text-[11px]">8:05 AM KEYNOTE</span>
              <span>Adrian Day (Adrian Day Asset Management) &mdash; Apart From Gold, What Else?</span>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-100 block text-[11px]">9:45 AM YUKON SPOTLIGHT</span>
              <span>Cascadia Minerals &bull; Onyx Gold &bull; Selkirk Copper &bull; White Gold Corp</span>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-100 block text-[11px]">12:00 PM NEWFOUNDLAND & LABRADOR SPOTLIGHT</span>
              <span>Government Opening &bull; Atlas Salt &bull; Equinox Gold &bull; Firefly Metals &bull; New Found Gold</span>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-100 block text-[11px]">1:45 PM PANEL</span>
              <span>What Makes a Successful Junior? (Radisson Mining, Dryden Gold, Blue Lagoon, Maple Gold)</span>
            </div>

            <div className="p-2.5 bg-white/10 rounded-lg border border-white/20">
              <span className="font-bold text-amber-100 block text-[11px]">3:15 PM KEYNOTE</span>
              <span>The Hon. Kody Blois, Parliamentary Secretary to the Prime Minister</span>
            </div>

            <div className="p-2.5 bg-[#b45309] rounded-lg border border-amber-200/40 text-center font-bold text-[11px]">
              3:45 PM SHE-Co & Student Awards &bull; 4:00 PM Au Revoir Cocktails (Red Cloud Lounge)
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/30 flex justify-between items-center text-[10px] font-bold text-white/80 uppercase">
          <span>PAGE 3 OF 4 &bull; OFFICIAL AGENDA</span>
          <span>JUNE 4, 2026</span>
        </div>
      </div>
    );
  }

  // Page 4: Official Sponsors Grid
  return (
    <div className="w-full bg-white text-neutral-900 aspect-[640/852] p-5 sm:p-7 relative overflow-hidden shadow-2xl rounded-xl text-left border border-neutral-200 flex flex-col justify-between">
      <div>
        <div className="text-center pb-3 border-b border-neutral-200 mb-4">
          <span className="text-[10px] font-extrabold text-[#C6112F] tracking-[0.25em] uppercase block">OFFICIAL SPONSORS & PARTNERS</span>
          <h2 className="text-lg sm:text-xl font-black text-neutral-900">Mining Investment Event 2026</h2>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase text-[#C6112F] tracking-wider block mb-1">PLATINUM PARTNERS</span>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-center">
              <img src="/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png" alt="Agnico Eagle" className="max-h-8 object-contain" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block mb-1">GOLD PARTNERS</span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-neutral-800">
              <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg">Altitude Capital</div>
              <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg">Invest Yukon</div>
              <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg">Maxit Capital</div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider block mb-1">SILVER PARTNERS</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold text-neutral-700">
              <div className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">CAUR Tech</div>
              <div className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">Hatch</div>
              <div className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">IAMGOLD</div>
              <div className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">Stifel</div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-[#008ba3] tracking-wider block mb-1">SPECIAL PARTICIPATION</span>
            <div className="p-2 bg-[#FCDDE1] border border-[#F5C2C7] text-[#8A1224] rounded-lg font-extrabold text-xs text-center">
              Gouvernement du Québec &bull; Québec Strategy for Strategic Minerals
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-200 flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase">
        <span>PAGE 4 OF 4 &bull; SPONSORS GRID</span>
        <span>THE MINING INVESTMENT EVENT</span>
      </div>
    </div>
  );
}

export default function PastEditionsPage() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";

  // State: null means main Past Editions directory page
  const [viewingEdition, setViewingEdition] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Participating Companies Filters State
  const [companySearch, setCompanySearch] = useState<string>("");
  const [sectorFilter, setSectorFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [sortFilter, setSortFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleLimit, setVisibleLimit] = useState<number>(52);

  // Brochure Viewer State
  const [brochurePage, setBrochurePage] = useState<number>(1);
  const [brochureZoom, setBrochureZoom] = useState<number>(100);

  // Options extracted dynamically
  const sectorOptions = Array.from(new Set(rawCompaniesData.map((c) => c.sector))).sort();
  const countryOptions = Array.from(new Set(rawCompaniesData.map((c) => c.country))).sort();

  // Filter and sort companies
  const filteredCompanies = rawCompaniesData
    .filter((c) => {
      const matchesSearch =
        companySearch.trim() === "" ||
        `${c.name} ${c.ticker} ${c.sector} ${c.country} ${c.email}`.toLowerCase().includes(companySearch.trim().toLowerCase());
      const matchesSector = sectorFilter === "" || c.sector === sectorFilter;
      const matchesCountry = countryFilter === "" || c.country === countryFilter;
      const matchesType = typeFilter === "" || c.type === typeFilter;
      return matchesSearch && matchesSector && matchesCountry && matchesType;
    })
    .sort((a, b) => {
      if (sortFilter === "az") return a.name.localeCompare(b.name);
      if (sortFilter === "za") return b.name.localeCompare(a.name);
      if (sortFilter === "country") return a.country.localeCompare(b.country);
      return 0;
    });

  // Directory search filter
  const filteredCards = editionCards.filter((c) =>
    searchQuery.trim() === "" ? true : c.year.toString().includes(searchQuery.trim())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-neutral-900 font-sans antialiased overflow-x-hidden pt-20 sm:pt-24">

        {/* ════════════════════════════════════════════════════════════════
            MODE A: SINGLE EDITION DETAIL VIEW (Shown when an edition card is clicked)
           ════════════════════════════════════════════════════════════════ */}
        {viewingEdition !== null ? (
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">

            {/* Outer Container Card */}
            <div className="bg-white border border-neutral-200/90 rounded-2xl shadow-sm overflow-hidden mb-8">

              {/* Breadcrumb Header Bar */}
              <div className="px-6 sm:px-8 py-4 border-b border-neutral-200/80 bg-white flex items-center justify-between">
                <nav className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-neutral-500 uppercase">
                  <Link href="/" className="hover:text-[#C6112F] transition-colors">
                    HOME
                  </Link>
                  <span>&lt;</span>
                  <button
                    onClick={() => setViewingEdition(null)}
                    className="hover:text-[#C6112F] transition-colors uppercase cursor-pointer"
                  >
                    {isFr ? "ÉDITION PRÉCÉDENTE" : "PAST EDITION"}
                  </button>
                  <span>&lt;</span>
                  <span className="text-neutral-900 font-extrabold">{viewingEdition}</span>
                </nav>

                <button
                  onClick={() => setViewingEdition(null)}
                  className="text-xs font-bold text-[#C6112F] hover:underline flex items-center gap-1 group"
                >
                  <span className="transform group-hover:-translate-x-0.5 transition-transform">&larr; {isFr ? "Retour aux éditions" : "Back to all editions"}</span>
                </button>
              </div>

              {/* Two-Column Grid: Left Sidebar & Right Detail Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">

                {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
                <div className="lg:col-span-3 border-r border-neutral-200/80 bg-[#fdfefe] p-6 flex flex-col items-stretch">
                  <div>
                    {/* Menu Item List */}
                    <div className="space-y-2 mb-6">
                      {sidebarTabs.map((tab) => {
                        const isSelected = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-lg text-xs sm:text-sm font-bold transition-all text-left ${isSelected
                                ? "bg-[#FCDDE1] text-[#8A1224] border-l-4 border-[#C6112F] shadow-xs"
                                : "text-neutral-600 hover:bg-neutral-100/90 hover:text-neutral-900"
                              }`}
                          >
                            <span className={isSelected ? "text-[#C6112F]" : "text-neutral-500"}>
                              {tab.icon}
                            </span>
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Links Card directly below Sponsors */}
                  <div className="mt-2 bg-[#f8f9fa] border border-neutral-300/80 rounded-2xl p-6 text-left shadow-xs">
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#C6112F] tracking-tight mb-6">
                      QUICK LINKS
                    </h4>
                    <div className="space-y-4 text-xs sm:text-sm font-medium text-neutral-700">
                      <a
                        href="/register"
                        className="flex items-center justify-between hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7]"
                      >
                        <span>Register For 2027</span>
                        <svg className="w-5 h-5 text-neutral-500 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>

                      <button
                        onClick={() => setActiveTab("brochures")}
                        className="w-full flex items-center justify-between hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7] text-left cursor-pointer"
                      >
                        <span>Download Brochure</span>
                        <svg className="w-5 h-5 text-neutral-500 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>

                      <a
                        href="mailto:jchoi@irinc.ca"
                        className="flex items-center justify-between hover:text-[#C6112F] transition-colors pb-3 border-b border-[#F5C2C7]"
                      >
                        <span>Contact Us</span>
                        <svg className="w-5 h-5 text-neutral-500 hover:text-[#C6112F] stroke-current shrink-0 ml-2 transition-colors" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ═══════════════ RIGHT MAIN CONTENT AREA ═══════════════ */}
                <div className="lg:col-span-9 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-left">
                  {activeTab === "companies" ? (
                    /* ════════ PARTICIPATING COMPANIES TAB VIEW ════════ */
                    <div>
                      {/* Eyebrow Label */}
                      <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                        {viewingEdition} EDITION
                      </span>

                      {/* Title */}
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
                        Participating Companies
                      </h1>

                      {/* Lede description */}
                      <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[700px] mb-8">
                        Connect with leading mining companies, investors, technology providers, and service partners driving the future of the mining industry.
                      </p>

                      {/* 4 Stat Cards Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white border border-neutral-200/90 rounded-xl p-5 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="9" cy="8" r="3.2" />
                              <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6S13.9 16 14.5 19" />
                              <circle cx="16.5" cy="9" r="2.6" />
                              <path d="M16 14.6c2.4.1 4 1.6 4.5 4.4" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">{rawCompaniesData.length}+</span>
                            <span className="text-xs text-neutral-500 font-medium">Companies</span>
                          </div>
                        </div>

                        <div className="bg-white border border-neutral-200/90 rounded-xl p-5 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">{countryOptions.length}+</span>
                            <span className="text-xs text-neutral-500 font-medium">Countries</span>
                          </div>
                        </div>

                        <div className="bg-white border border-neutral-200/90 rounded-xl p-5 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.8 5.5L19 10l-5.2 1.5L12 17l-1.8-5.5L5 10l5.2-1.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">{sectorOptions.length}+</span>
                            <span className="text-xs text-neutral-500 font-medium">Sectors</span>
                          </div>
                        </div>

                        <div className="bg-white border border-neutral-200/90 rounded-xl p-5 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="9" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18M4.5 7.5h15M4.5 16.5h15" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-xl sm:text-2xl font-black text-neutral-900 block leading-tight">Global</span>
                            <span className="text-xs text-neutral-500 font-medium">Network</span>
                          </div>
                        </div>
                      </div>

                      {/* Controls Bar: Search & Select Filters */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {/* Search input */}
                        <div className="flex-1 min-w-[240px] relative">
                          <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="6.5" />
                            <path d="M20 20l-4-4" />
                          </svg>
                          <input
                            type="search"
                            value={companySearch}
                            onChange={(e) => setCompanySearch(e.target.value)}
                            placeholder="Search company name, ticker, keyword or country..."
                            className="w-full bg-white border border-neutral-300 rounded-lg py-2.5 pl-10 pr-4 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all"
                          />
                        </div>

                        {/* Sector dropdown */}
                        <select
                          value={sectorFilter}
                          onChange={(e) => setSectorFilter(e.target.value)}
                          className="bg-white border border-neutral-300 rounded-lg py-2.5 px-3 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#C6112F] cursor-pointer"
                        >
                          <option value="">All Sectors</option>
                          {sectorOptions.map((sec) => (
                            <option key={sec} value={sec}>{sec}</option>
                          ))}
                        </select>

                        {/* Country dropdown */}
                        <select
                          value={countryFilter}
                          onChange={(e) => setCountryFilter(e.target.value)}
                          className="bg-white border border-neutral-300 rounded-lg py-2.5 px-3 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#C6112F] cursor-pointer"
                        >
                          <option value="">All Countries</option>
                          {countryOptions.map((cou) => (
                            <option key={cou} value={cou}>{cou}</option>
                          ))}
                        </select>

                        {/* Type dropdown */}
                        <select
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                          className="bg-white border border-neutral-300 rounded-lg py-2.5 px-3 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#C6112F] cursor-pointer"
                        >
                          <option value="">All Company Types</option>
                          <option value="Producer">Producer</option>
                          <option value="Developer">Developer</option>
                          <option value="Explorer">Explorer</option>
                        </select>

                        {/* Sort dropdown */}
                        <select
                          value={sortFilter}
                          onChange={(e) => setSortFilter(e.target.value)}
                          className="bg-white border border-neutral-300 rounded-lg py-2.5 px-3 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#C6112F] cursor-pointer"
                        >
                          <option value="">Sort By</option>
                          <option value="az">Name A–Z</option>
                          <option value="za">Name Z–A</option>
                          <option value="country">Country</option>
                        </select>
                      </div>

                      {/* Results Row & View Mode Toggle */}
                      <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200">
                        <div className="text-xs sm:text-sm text-neutral-500 font-medium">
                          {filteredCompanies.length > 0 ? (
                            <span>
                              Showing <strong className="text-neutral-800">1 – {Math.min(visibleLimit, filteredCompanies.length)}</strong> of{" "}
                              <strong className="text-neutral-800">{filteredCompanies.length}</strong> companies
                            </span>
                          ) : (
                            <span>Showing <strong className="text-neutral-800">0</strong> companies</span>
                          )}
                        </div>

                        {/* Grid / List Mode Toggle */}
                        <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#FCDDE1] text-[#C6112F]" : "bg-white text-neutral-500 hover:text-neutral-900"}`}
                            title="Grid View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="4" y="4" width="7" height="7" rx="1" />
                              <rect x="13" y="4" width="7" height="7" rx="1" />
                              <rect x="4" y="13" width="7" height="7" rx="1" />
                              <rect x="13" y="13" width="7" height="7" rx="1" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#FCDDE1] text-[#C6112F]" : "bg-white text-neutral-500 hover:text-neutral-900"}`}
                            title="List View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" d="M5 6h14M5 12h14M5 18h14" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Companies Display Container */}
                      {filteredCompanies.length > 0 ? (
                        <>
                          <div
                            className={
                              viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                                : "flex flex-col gap-3"
                            }
                          >
                            {filteredCompanies.slice(0, visibleLimit).map((comp, idx) => (
                              <div
                                key={idx}
                                className={`bg-white border border-neutral-200/90 rounded-xl transition-all hover:shadow-lg hover:border-neutral-300 group flex ${viewMode === "grid"
                                    ? "flex-col p-6 text-center justify-between"
                                    : "flex-row items-center justify-between p-4"
                                  }`}
                              >
                                {/* Logo Badge */}
                                <div className={viewMode === "grid" ? "h-14 flex items-center justify-center mb-3" : "w-36 shrink-0"}>
                                  <CompanyLogoImage name={comp.name} email={comp.email} />
                                </div>

                                {/* Title & Metadata */}
                                <div className={viewMode === "grid" ? "mb-4" : "flex-1 px-4 text-left"}>
                                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 mb-1 leading-snug">
                                    {comp.name}
                                  </h3>

                                  {/* Stock Ticker */}
                                  <div className="text-[11px] font-bold text-[#C6112F] mb-2 tracking-wide uppercase">
                                    {comp.ticker}
                                  </div>

                                  <div className="flex items-center justify-center gap-3 text-xs text-neutral-500 font-medium flex-wrap">
                                    <span className="flex items-center gap-1">
                                      <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                        <path d="M4 9h16M9 9v11" />
                                      </svg>
                                      {comp.sector}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                                        <circle cx="12" cy="11" r="2.3" />
                                      </svg>
                                      {comp.country}
                                    </span>
                                  </div>
                                </div>

                                {/* Contact Email / View Profile Link */}
                                <a
                                  href={comp.email ? `mailto:${comp.email}` : "#"}
                                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#C6112F] hover:underline pt-3 border-t border-neutral-100 group-hover:gap-2.5 transition-all"
                                >
                                  <span>View Profile</span>
                                  <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                                  </svg>
                                </a>
                              </div>
                            ))}
                          </div>

                          {/* View All Logos Button */}
                          {visibleLimit < filteredCompanies.length && (
                            <div className="flex justify-center mt-10">
                              <button
                                onClick={() => setVisibleLimit(filteredCompanies.length)}
                                className="bg-[#C6112F] hover:bg-[#a80e27] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                              >
                                <span>VIEW ALL LOGOS ({filteredCompanies.length} COMPANIES)</span>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        /* Empty State */
                        <div className="text-center py-16 px-4 border border-dashed border-neutral-300 rounded-xl bg-neutral-50/50">
                          <h4 className="text-base font-bold text-neutral-800 mb-1">No companies found</h4>
                          <p className="text-xs text-neutral-500 font-medium">Try a different search term or clear your filters.</p>
                        </div>
                      )}
                    </div>
                  ) : activeTab === "brochures" ? (
                    /* ════════ BROCHURES TAB VIEW ════════ */
                    <div>
                      {/* Eyebrow Label */}
                      <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
                        {viewingEdition} EDITION
                      </span>

                      {/* Title */}
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
                        Event Brochure {viewingEdition}
                      </h1>

                      {/* Lede description */}
                      <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[720px] mb-8">
                        Explore the complete brochure to discover event details, key themes, speaker highlights, agenda overview, and sponsorship opportunities.
                      </p>

                      {/* 3 Meta Info Items Row */}
                      <div className="flex flex-wrap items-center gap-6 md:gap-10 pb-8 mb-8 border-b border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="4" y="5" width="16" height="15" rx="2" />
                              <path d="M4 9.5h16M8 3v4M16 3v4" />
                            </svg>
                          </div>
                          <div>
                            <b className="block text-neutral-900 font-extrabold text-sm sm:text-base">June 3 – 6, {viewingEdition}</b>
                            <span className="text-neutral-500 text-xs">3 Days Event</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <b className="block text-neutral-900 font-extrabold text-sm sm:text-base">Centre des congrès de Québec</b>
                            <span className="text-neutral-500 text-xs">Québec City, Canada</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#FCDDE1] flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <b className="block text-neutral-900 font-extrabold text-sm sm:text-base">PDF, 12.4 MB</b>
                            <span className="text-neutral-500 text-xs">Official Brochure File</span>
                          </div>
                        </div>
                      </div>

                      {/* Official Unmodified PDF Document Viewer */}
                      <div className="w-full bg-[#f8fafc] border border-neutral-200/90 rounded-2xl overflow-hidden shadow-lg p-2 sm:p-4 mb-8">
                        <iframe
                          src={`/AGENDA_june_2026.pdf#page=${brochurePage}&toolbar=1&navpanes=1&scrollbar=1`}
                          className="w-full h-[750px] sm:h-[900px] rounded-xl border border-neutral-300/80 shadow-md bg-white"
                          title="Official Event Agenda & Brochure PDF"
                        />
                      </div>

                      {/* 2 Main Action Buttons Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        <a
                          href="/AGENDA_june_2026.pdf"
                          download="AGENDA_June_1-4_2026.pdf"
                          className="w-full py-4 px-6 bg-[#C6112F] hover:bg-[#a80e27] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>DOWNLOAD OFFICIAL AGENDA (PDF)</span>
                        </a>

                        <button
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              navigator.clipboard.writeText(window.location.href);
                              alert("Brochure link copied to clipboard!");
                            }
                          }}
                          className="w-full py-4 px-6 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span>SHARE BROCHURE</span>
                        </button>
                      </div>

                      {/* 5 Feature Highlight Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-xs">
                        <div className="p-4 text-center">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <h4 className="text-sm font-extrabold text-neutral-900 mb-1">Full Agenda</h4>
                          <p className="text-xs text-neutral-500 font-medium leading-relaxed">Explore sessions, panels and keynote discussions.</p>
                        </div>

                        <div className="p-4 text-center">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="8" r="3.4" />
                              <path d="M5.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
                            </svg>
                          </div>
                          <h4 className="text-sm font-extrabold text-neutral-900 mb-1">Expert Speakers</h4>
                          <p className="text-xs text-neutral-500 font-medium leading-relaxed">Discover global leaders and industry experts.</p>
                        </div>

                        <div className="p-4 text-center">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="8.5" />
                              <circle cx="12" cy="12" r="4.8" />
                              <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                            </svg>
                          </div>
                          <h4 className="text-sm font-extrabold text-neutral-900 mb-1">Investment Opportunities</h4>
                          <p className="text-xs text-neutral-500 font-medium leading-relaxed">Connect with projects and high-growth opportunities.</p>
                        </div>

                        <div className="p-4 text-center">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <h4 className="text-sm font-extrabold text-neutral-900 mb-1">Networking</h4>
                          <p className="text-xs text-neutral-500 font-medium leading-relaxed">Build valuable relationships with key decision makers.</p>
                        </div>

                        <div className="p-4 text-center">
                          <div className="w-12 h-12 rounded-xl bg-[#FCDDE1] flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                          </div>
                          <h4 className="text-sm font-extrabold text-neutral-900 mb-1">Sponsors & Partners</h4>
                          <p className="text-xs text-neutral-500 font-medium leading-relaxed">Meet our sponsors and service partners.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ════════ DEFAULT OVERVIEW TAB VIEW ════════ */
                    <div>
                      {/* Eyebrow Label */}
                      <span className="text-[#C6112F] text-[11px] sm:text-xs font-extrabold tracking-[0.3em] uppercase mb-2 block">
                        T H E &nbsp; M I N I N G &nbsp; I N V E S T M E N T &nbsp; E V E N T
                      </span>

                      {/* Main Title */}
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
                        {viewingEdition} Edition
                      </h1>

                      {/* Red Underline Accent Bar */}
                      <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mb-4" />

                      {/* Subtitle Description */}
                      <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-[700px] mb-6">
                        The premier global mining investment event bringing together investors, mining companies, governments and industry leaders.
                      </p>

                      {/* Date & Location Row */}
                      <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-extrabold text-neutral-800 uppercase mb-8">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="16" rx="2" />
                            <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                          </svg>
                          <span>3-6 JUNE 2027</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>QUÉBEC CITY, CANADA</span>
                        </div>
                      </div>

                      {/* 4 Stat Columns Divider Grid */}
                      <div className="py-6 border-y border-neutral-200/90 grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 text-left">
                        <div className="flex flex-col items-start pr-4 sm:border-r sm:border-neutral-300/80">
                          <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                            300+
                          </span>
                          <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                            PARTICIPATING COMPANIES
                          </span>
                        </div>

                        <div className="flex flex-col items-start pr-4 sm:border-r sm:border-neutral-300/80">
                          <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                            50+
                          </span>
                          <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                            SPEAKERS
                          </span>
                        </div>

                        <div className="flex flex-col items-start pr-4 sm:border-r sm:border-neutral-300/80">
                          <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                            50+
                          </span>
                          <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                            COUNTRIES
                          </span>
                        </div>

                        <div className="flex flex-col items-start">
                          <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none mb-2">
                            500+
                          </span>
                          <span className="text-[#C6112F] text-[10px] sm:text-xs font-extrabold tracking-wider uppercase">
                            ATTENDEES
                          </span>
                        </div>
                      </div>

                      {/* Quebec City Flag Hero Feature Image */}
                      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-[#C6112F]/40 shadow-sm mb-8 bg-neutral-900">
                        <img
                          src="/Mining%20Investment%20Post%202.avif"
                          alt="Québec City harbor with Canadian flag"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Two Large Action Buttons Row */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                        <a
                          href="https://online.flippingbook.com/view/213558062/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-8 py-3.5 bg-[#C6112F] hover:bg-[#a80e27] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-lg shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-0.5"
                        >
                          VIEW BROCHURE
                        </a>

                        <a
                          href="/register"
                          className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#333] hover:bg-neutral-50 text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-lg shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-0.5"
                        >
                          SEE AGENDA
                        </a>
                      </div>

                      {/* About THE EVENT Section */}
                      <div className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-2">
                          About THE EVENT
                        </h2>
                        <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />

                        <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium max-w-[760px]">
                          Mining Investment Event {viewingEdition} is the world&apos;s leading mining investment conference, where global capital meets opportunity. Join top mining executives, investors, analysts, government representatives and service providers for three days of deal-making, insightful discussions, and strategic networking.
                        </p>

                        {/* 4 Bullet Points */}
                        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 font-medium max-w-[500px]">
                          {[
                            "Discover new investment opportunities",
                            "Connect with global mining leaders",
                            "Gain exclusive market and industry insights",
                            "Build valuable partnerships",
                          ].map((bullet, i) => (
                            <div key={i} className="flex items-center gap-3 pb-2 border-b border-neutral-200/60">
                              <span className="w-1.5 h-1.5 bg-[#C6112F] rounded-xs shrink-0" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* EVENT OVERVIEW Dark Crimson Red Banner */}
                      <div className="bg-gradient-to-br from-[#800016] via-[#730214] to-[#54020e] rounded-xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-white/10">
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase mb-2">
                          EVENT OVERVIEW
                        </h3>
                        <div className="w-16 h-[2.5px] bg-white rounded-full mb-4" />

                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-8 max-w-[760px] font-medium">
                          The {viewingEdition} edition will focus on investment trends, critical minerals, sustainable development and innovation shaping the future of mining.
                        </p>

                        {/* 3 Feature Pillars Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-white/20">

                          {/* INVEST Pillar */}
                          <div className="flex flex-col items-start text-left md:pr-6 md:border-r md:border-white/20">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="12" cy="12" r="1" />
                              </svg>
                            </div>
                            <h4 className="text-lg font-black tracking-wider uppercase mb-1 pb-1 border-b-2 border-white/80 w-fit">
                              INVEST
                            </h4>
                            <p className="text-xs text-white/80 leading-relaxed font-medium mt-2">
                              Explore new projects and high-potential opportunities across the global mining landscape.
                            </p>
                          </div>

                          {/* CONNECT Pillar */}
                          <div className="flex flex-col items-start text-left md:pr-6 md:border-r md:border-white/20">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <h4 className="text-lg font-black tracking-wider uppercase mb-1 pb-1 border-b-2 border-white/80 w-fit">
                              CONNECT
                            </h4>
                            <p className="text-xs text-white/80 leading-relaxed font-medium mt-2">
                              Network with investors, mining companies and industry leaders from around the world.
                            </p>
                          </div>

                          {/* GROW Pillar */}
                          <div className="flex flex-col items-start text-left">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <h4 className="text-lg font-black tracking-wider uppercase mb-1 pb-1 border-b-2 border-white/80 w-fit">
                              GROW
                            </h4>
                            <p className="text-xs text-white/80 leading-relaxed font-medium mt-2">
                              Stay ahead with exclusive insights, market updates, and expert-led discussions.
                            </p>
                          </div>

                        </div>
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* ═══════════════ BOTTOM RED PAST EDITION YEAR SWITCHER BAR ═══════════════ */}
            <div className="w-full bg-[#C6112F] py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md text-white rounded-2xl">
              <span className="text-base sm:text-lg font-extrabold tracking-widest uppercase text-white">
                PAST EDITION
              </span>

              <div className="flex items-center gap-6 sm:gap-12 md:gap-16">
                {years.map((year) => {
                  const isSelected = viewingEdition === year;
                  return (
                    <button
                      key={year}
                      onClick={() => setViewingEdition(year)}
                      className={`text-base sm:text-lg font-bold transition-all duration-200 cursor-pointer ${isSelected
                          ? "bg-white text-[#C6112F] px-6 py-2 rounded-lg shadow-md font-extrabold scale-105"
                          : "text-white opacity-95 hover:opacity-100 px-3 py-2"
                        }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* ════════════════════════════════════════════════════════════════
              MODE B: MAIN PAST EDITIONS OVERVIEW DIRECTORY PAGE
             (Default view when navigating to /past-editions)
             ════════════════════════════════════════════════════════════════ */
          <>
            {/* Hero Section */}
            <section className="relative w-full bg-white pt-2 pb-16 md:pt-4 md:pb-20 overflow-hidden border-b border-neutral-100">
              <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  {/* Left Column - Content */}
                  <div className="lg:col-span-6 flex flex-col items-start text-left">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[11px] md:text-xs font-bold tracking-[0.15em] text-neutral-500 uppercase mb-6">
                      <Link href="/" className="hover:text-[#C6112F] transition-colors">
                        HOME
                      </Link>
                      <span>&lt;</span>
                      <span className="text-neutral-800 font-extrabold">
                        {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITION"}
                      </span>
                    </nav>

                    {/* Eyebrow Label */}
                    <span className="text-[#C6112F] text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase mb-3 block">
                      {isFr ? "ÉDITIONS PRÉCÉDENTES" : "PAST EDITIONS"}
                    </span>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] font-black text-neutral-900 tracking-tight mb-4 max-w-[540px]">
                      {isFr
                        ? "Explorez des Années d'Excellence en Investissement Minier"
                        : "Explore Years of Mining Investment Excellence"}
                    </h1>

                    {/* Decorative Red Line */}
                    <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mb-6" />

                    {/* Description Subtext */}
                    <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-[480px]">
                      {isFr
                        ? "Revivez chaque édition à travers les programmes, les conférenciers, les entreprises participantes, les brochures et les commanditaires."
                        : "Relive every edition through agendas, speakers, participating companies, brochures and sponsors."}
                    </p>

                    {/* Search Bar Input */}
                    <div className="relative w-full max-w-[460px]">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={
                          isFr ? "Rechercher l'année de l'édition..." : "Search Edition Year..."
                        }
                        className="w-full bg-[#f8fafc] text-neutral-800 text-sm sm:text-base font-medium placeholder-neutral-400 border border-neutral-300 rounded-full py-3.5 pl-6 pr-14 shadow-inner focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all"
                      />
                      <button
                        type="button"
                        aria-label="Search"
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#C6112F] transition-colors p-1"
                      >
                        <svg
                          className="w-5 h-5 stroke-current"
                          fill="none"
                          strokeWidth="2.2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Dotted Globe Image */}
                  <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,17,47,0.08),transparent_65%)] pointer-events-none rounded-full" />
                    <div className="relative w-[320px] sm:w-[440px] md:w-[500px] lg:w-[540px] aspect-square flex items-center justify-center">
                      <Image
                        src="/image%2034.png"
                        alt="Mining Investment Event Globe"
                        width={600}
                        height={600}
                        priority
                        className="w-full h-full object-contain select-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Interactive Metallic Year Timeline Navigation Bar */}
                <div className="mt-12 md:mt-16 w-full max-w-[1100px] mx-auto bg-gradient-to-b from-[#ffffff] via-[#f3f5f8] to-[#d4d9df] border border-[#a2aab4] rounded-2xl py-6 px-6 sm:px-12 shadow-[0_6px_16px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,0.95)]">
                  <div className="relative w-full">

                    {/* Connecting Horizontal Line passing through center of dots */}
                    <div className="absolute bottom-[11px] left-[12.5%] right-[12.5%] h-[2px] bg-[#8a94a0] z-0" />

                    {/* Year Nodes Grid */}
                    <div className="relative z-10 grid grid-cols-4 items-center justify-items-center">
                      {years.map((year, idx) => {
                        const isFirst = idx === 0; // 2026
                        return (
                          <button
                            key={year}
                            onClick={() => setViewingEdition(year)}
                            className="group flex flex-col items-center cursor-pointer focus:outline-none"
                          >
                            {/* Year Label Text */}
                            <span
                              className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-3 transition-all duration-200 ${isFirst ? "text-[#C6112F]" : "text-neutral-900 group-hover:text-[#C6112F]"
                                }`}
                            >
                              {year}
                            </span>

                            {/* Node Bullet Circle */}
                            <div className="relative flex items-center justify-center h-6">
                              <div
                                className={`w-5 h-5 rounded-full transition-all duration-200 ${isFirst
                                    ? "bg-[#C6112F] border-2 border-[#C6112F] ring-4 ring-[#C6112F]/20 shadow-sm"
                                    : "bg-white border-2 border-[#78828e] group-hover:border-[#C6112F] group-hover:bg-[#C6112F]"
                                  }`}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Editions Grid & Impact Section */}
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-[1320px] mx-auto px-6 md:px-12">

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {filteredCards.map((card) => {
                    return (
                      <div
                        key={card.year}
                        onClick={() => setViewingEdition(card.year)}
                        className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:border-[#C6112F] hover:-translate-y-1"
                      >
                        {/* Top Photo */}
                        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-100">
                          <Image
                            src={card.image}
                            alt={card.year.toString()}
                            fill
                            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${card.isGrayscale ? "grayscale contrast-105" : ""
                              }`}
                          />
                        </div>

                        {/* Card Content Body */}
                        <div className="p-6 flex flex-col items-start text-left flex-grow justify-between">
                          <div>
                            {/* Year */}
                            <span className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2 block">
                              {card.year}
                            </span>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-bold text-[#C6112F] leading-snug mb-3">
                              {isFr ? card.titleFr : card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                              {isFr ? card.descFr : card.desc}
                            </p>
                          </div>

                          {/* View Archive Button */}
                          <div className="w-full pt-2">
                            <div className="w-full rounded-xl py-3 px-4 text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-between transition-all duration-200 bg-white border border-[#C6112F]/40 text-[#C6112F] group-hover:bg-[#C6112F] group-hover:text-white group-hover:border-[#C6112F] shadow-sm">
                              <span>{isFr ? "VOIR L'ARCHIVE" : "VIEW ARCHIVE"}</span>
                              <svg
                                className="w-4 h-4 fill-none stroke-current transform group-hover:translate-x-0.5 transition-transform"
                                strokeWidth="2.2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Impact Stats Container */}
                <div className="w-full bg-gradient-to-b from-[#ffffff] via-[#fcfdfe] to-[#f4f7fa] border border-neutral-300/80 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm text-left mb-16">
                  <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase mb-8 block">
                    {isFr ? "NOTRE IMPACT AU FIL DES ANS" : "OUR IMPACT OVER THE YEARS"}
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0">
                    {impactStats.map((stat, idx) => {
                      const isLast = idx === impactStats.length - 1;
                      return (
                        <div
                          key={stat.label}
                          className={`flex flex-col items-start text-left group ${!isLast ? "lg:border-r lg:border-neutral-200/90 lg:pr-8" : ""
                            } ${idx !== 0 ? "lg:pl-8" : ""}`}
                        >
                          {/* Icon */}
                          <div className="mb-4 text-neutral-900 transform group-hover:scale-110 transition-transform duration-200">{stat.icon}</div>

                          {/* Value */}
                          <span className="text-3xl sm:text-4xl lg:text-[40px] font-black text-neutral-900 tracking-tight leading-none mb-3">
                            {stat.value}
                          </span>

                          {/* Label */}
                          <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.15em] text-[#C6112F] uppercase">
                            {isFr ? stat.labelFr : stat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4 Photo Thumbnails Gallery Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    "/Mining Investment Post 2.avif",
                    "/image%2015%20(2).avif",
                    "/Mining Investment Post 3.avif",
                    "/Mining Investment Post (1) 2.avif",
                  ].map((imgSrc, index) => (
                    <div
                      key={index}
                      className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-[#C6112F]/60 shadow-sm group hover:border-[#C6112F] hover:shadow-md transition-all duration-300 bg-white"
                    >
                      <Image
                        src={imgSrc}
                        alt={`Event photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {/* Centered Explore All Edition Button */}
                <div className="flex justify-center">
                  <Link
                    href="/media"
                    className="bg-[#C6112F] hover:bg-[#a80d26] border border-[#a80d26] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg inline-flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>{isFr ? "VOIR TOUTES LES ÉDITIONS" : "EXPLORE ALL EDITION"}</span>
                    <svg
                      className="w-5 h-5 text-white shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 8.5L14 12L10.5 15.5M14 12H8.5"
                      />
                    </svg>
                  </Link>
                </div>

              </div>
            </section>
          </>
        )}

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
