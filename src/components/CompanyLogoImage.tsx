"use client";

import React, { useState } from "react";

function getCompanyLogoBadge(name: string) {
  const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  let initials =
    words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : words[0]
      ? words[0].substring(0, 3).toUpperCase()
      : "MIN";

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
    <div
      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border ${chosenColor.border} ${chosenColor.bg} flex items-center justify-center font-extrabold tracking-wider ${chosenColor.text} text-xs shadow-2xs shrink-0 select-none`}
    >
      <span>{initials}</span>
    </div>
  );
}

const LOCAL_LOGO_MAP: { pattern: RegExp; src: string }[] = [
  { pattern: /agnico/i, src: "/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png" },
  { pattern: /arizona/i, src: "/arizona-logo.png" },
  { pattern: /auriginal|auro/i, src: "/auro-logo.png" },
  { pattern: /blue lagoon|bluejay|blue gold/i, src: "/blue-gold.png" },
  { pattern: /consolidated/i, src: "/consilated-logo.svg" },
  { pattern: /contango/i, src: "/Contango-Logo.webp" },
  { pattern: /critical elements|cre\b|sre\b/i, src: "/sre.svg" },
  { pattern: /cupani/i, src: "/cupanii.svg" },
  { pattern: /glencore|gelicer/i, src: "/gelicer.svg" },
  { pattern: /globex|globax/i, src: "/globax.png" },
  { pattern: /juno/i, src: "/juno-logo.svg" },
  { pattern: /or royalties|orroyalties/i, src: "/logo-orroyalties.svg" },
  { pattern: /morocco/i, src: "/Morocco.svg" },
  { pattern: /nouveau monde|nmg/i, src: "/NMG_Log.png" },
  { pattern: /orezone/i, src: "/Orezone.png" },
  { pattern: /thunder/i, src: "/thunder.jpeg" },
  { pattern: /tocvan|toc_logo/i, src: "/TOC_Logo_500.png" },
  { pattern: /winsome|winshear/i, src: "/winsome.svg" },
  { pattern: /quest/i, src: "/quest-corp.png" },
  { pattern: /altitude/i, src: "/altitude.png" },
  { pattern: /yukon/i, src: "/Invest_Yukon.png" },
];

const EXPLICIT_DOMAINS: Record<string, string> = {
  "ABCOURT MINES INC.": "abcourt.com",
  "ABCOURT MINES INC": "abcourt.com",
  "ABITIBI METALS": "abitibimetals.com",
  "ABRA SILVER RESOURCE CORP.": "abrasilver.com",
  "ABRA SILVER RESOURCE CORP": "abrasilver.com",
  "AGNICO EAGLE MINES LIMITED": "agnicoeagle.com",
  "AMEX EXPLORATION INC.": "amexexploration.com",
  "AMEX EXPLORATION INC": "amexexploration.com",
  "ANDEAN PRECIOUS METALS CORP.": "andeanpm.com",
  "ANDEAN PRECIOUS METALS CORP": "andeanpm.com",
  "ARIZONA METALS CORP": "arizonametals.com",
  "ATHA ENERGY CORP": "athaenergy.com",
  "AURANIA RESOURCES LTD.": "aurania.com",
  "AURANIA RESOURCES LTD": "aurania.com",
  "BRUNSWICK EXPLORATION INC.": "brwexploration.com",
  "BRUNSWICK EXPLORATION INC": "brwexploration.com",
  "BUNKER HILL MINING CORP": "bunkerhillmining.com",
  "CALIBRE MINING CORP.": "calibremining.com",
  "CALIBRE MINING CORP": "calibremining.com",
  "CANTERRA MINERALS CORPORATION": "canterraminerals.com",
  "COLLECTIVE MINING LTD.": "collectivemining.com",
  "COLLECTIVE MINING LTD": "collectivemining.com",
  "DRYDEN GOLD": "drydengold.com",
  "EXPLOITS DISCOVERY CORP.": "exploitsdiscovery.com",
  "EXPLOITS DISCOVERY CORP": "exploitsdiscovery.com",
  "FIREFLY METALS LTD": "fireflymetals.com.au",
  "FIREWEED METALS CORP.": "fireweedmetals.com",
  "FIREWEED METALS CORP": "fireweedmetals.com",
  "FIRST MINING GOLD CORP": "firstmininggold.com",
  "STRIKEPOINT GOLD INC.": "strikepointgold.com",
  "STRIKEPOINT GOLD INC": "strikepointgold.com",
  "GRID METALS CORP": "gridmetalscorp.com",
  "GLENCORE PLC / GLENCORE CANADA": "glencore.com",
  "GOLD ROYALTY CORP": "goldroyalty.com",
  "KENORLAND MINERALS LTD.": "kenorlandminerals.com",
  "KENORLAND MINERALS LTD": "kenorlandminerals.com",
  "KIRKLAND LAKE DISCOVERIES": "kirklandlakediscoveries.com",
  "LAVRAS GOLD CORP.": "lavrasgold.com",
  "LAVRAS GOLD CORP": "lavrasgold.com",
  "MAPLE GOLD MINES LTD": "maplegoldmines.com",
  "MARITIME RESOURCES CORP": "maritimeresourcescorp.com",
  "MIDLAND EXPLORATION INC.": "midlandexploration.com",
  "MIDLAND EXPLORATION INC": "midlandexploration.com",
  "MINEROS S.A.": "mineros.com.co",
  "MINEROS S.A": "mineros.com.co",
  "NEW GOLD INC.": "newgold.com",
  "NEW GOLD INC": "newgold.com",
  "NUVAU MINERALS CORP.": "nuvauminerals.com",
  "NUVAU MINERALS CORP": "nuvauminerals.com",
  "OSISKO DEVELOPMENT CORP.": "osiskodev.com",
  "OSISKO DEVELOPMENT CORP": "osiskodev.com",
  "OSISKO GOLD ROYALTIES LTD.": "osiskogr.com",
  "OSISKO GOLD ROYALTIES LTD": "osiskogr.com",
  "OSISKO METALS INCORPORATED": "osiskometals.com",
  "PATRIOT BATTERY METALS INC.": "patriotbatterymetals.com",
  "PATRIOT BATTERY METALS INC": "patriotbatterymetals.com",
  "PELOTON MINERALS CORPORATION": "pelotonminerals.com",
  "POWER METALLIC MINES INC.": "powernickel.com",
  "POWER METALLIC MINES INC": "powernickel.com",
  "QUIMBAYA GOLD INC.": "quimbayagold.com",
  "QUIMBAYA GOLD INC": "quimbayagold.com",
  "RADISSON MINING RESOURCES INC.": "radissonmining.com",
  "RADISSON MINING RESOURCES INC": "radissonmining.com",
  "RED PINE EXPLORATION": "redpineexp.com",
  "SAYONA MINING LTD.": "sayonamining.com.au",
  "SAYONA MINING LTD": "sayonamining.com.au",
  "SILVER ONE RESOURCES INC": "silverone.com",
  "SIRIOS RESOURCES INC.": "sirios.com",
  "SIRIOS RESOURCES INC": "sirios.com",
  "STRATEGIC RESOURCES INC.": "strategic-res.com",
  "STRATEGIC RESOURCES INC": "strategic-res.com",
  "TROILUS GOLD CORP": "troilusgold.com",
  "UNIGOLD INC.": "unigoldinc.com",
  "UNIGOLD INC": "unigoldinc.com",
  "VIZSLA SILVER CORP": "vizslasilvercorp.com",
  "WALLBRIDGE MINING COMPANY LIMITED": "wallbridgemining.com",
  "WESDOME GOLD MINES LTD.": "wesdome.com",
  "WESDOME GOLD MINES LTD": "wesdome.com",
  "WEST RED LAKE GOLD MINES LTD.": "westredlakegold.com",
  "WEST RED LAKE GOLD MINES LTD": "westredlakegold.com",
  "ANGUS GOLD INC.": "angusgold.com",
  "ANGUS GOLD INC": "angusgold.com",
  "MAX RESOURCE CORP": "maxresource.com",
  "Li-FT POWER LTD.": "li-ft.com",
  "LI-FT POWER LTD.": "li-ft.com",
  "LI-FT POWER LTD": "li-ft.com",
  "ORVANA MINERALS CORP": "orvana.com",
  "DOLLY VARDEN SILVER CORP": "dollyvardensilver.com",
  "VALKEA RESOURCES CORP": "valkearesources.com",
  "VIOR INC.": "vior.ca",
  "VIOR INC": "vior.ca",
  "IAMGOLD CORPORATION": "iamgold.com",
  "APOLLO SILVER CORP": "apollosilver.com",
  "WHEATON PRECIOUS METALS CORP.": "wheatonpm.com",
  "WHEATON PRECIOUS METALS CORP": "wheatonpm.com",
  "EMPEROR METALS INC.": "emperormetals.com",
  "EMPEROR METALS INC": "emperormetals.com",
  "EXIRO MINERALS CORP.": "exirominerals.com",
  "EXIRO MINERALS CORP": "exirominerals.com",
  "GOLDEN CARIBOO RESOURCES LTD": "goldencariboo.com",
  "MAGNA MINING INC.": "magnamining.com",
  "MAGNA MINING INC": "magnamining.com",
  "Q2 METALS CORP.": "q2metals.com",
  "Q2 METALS CORP": "q2metals.com",
  "MANDALAY RESOURCES CORPORATION": "mandalayresources.com",
  "SILVER X MINING CORP.": "silverx-mining.com",
  "SILVER X MINING CORP": "silverx-mining.com",
  "FIRST PHOSPHATE CORP.": "firstphosphate.com",
  "FIRST PHOSPHATE CORP": "firstphosphate.com",
  "NIOBAY METALS INC.": "niobaymetals.com",
  "NIOBAY METALS INC": "niobaymetals.com",
  "DYNASTY GOLD CORP": "dynastygold.com",
  "EQUITY METALS CORPORATION": "equitymetalscorp.com",
  "HARFANG EXPLORATION INC": "harfangexploration.com",
  "JUNO CORP.": "junocorp.com",
  "JUNO CORP": "junocorp.com",
  "STANDARD URANIUM LTD": "standarduranium.ca",
  "YUKON METALS CORP": "yukonmetalscorp.com",
  "MINES D'OR ORBEC INC.": "orbecgold.com",
  "MINES D'OR ORBEC INC": "orbecgold.com",
  "CUPANI METALS CORPORATION": "cupanimetals.com",
  "LITHIUM ROYALTY CORP": "lithiumroyaltycorp.com",
  "XXIX METALS CORP.": "xxix.ca",
  "XXIX METALS CORP": "xxix.ca",
  "XXIX METALS": "xxix.ca",
  "NEWCORE GOLD LTD.": "newcoregold.com",
  "NEWCORE GOLD LTD": "newcoregold.com",
  "OROGEN ROYALTIES INC.": "orogenroyalties.com",
  "OROGEN ROYALTIES INC": "orogenroyalties.com",
  "OPUS ONE GOLD CORPORATION": "opusonegold.com",
  "CYGNUS METALS LIMITED": "cygnusmetals.com",
  "RESOURO STRATEGIC METALS INC": "resouro.com",
  "1911 GOLD CORPORATION": "1911gold.com",
  "SPANISH MOUNTAIN GOLD": "spanishmountaingold.com",
  "NORTHISLE COPPER & GOLD INC.": "northisle.ca",
  "NORTHISLE COPPER & GOLD INC": "northisle.ca",
  "SUN SUMMIT MINERALS CORP.": "sunsummitminerals.com",
  "SUN SUMMIT MINERALS CORP": "sunsummitminerals.com",
  "NEW FOUND GOLD. CORP.": "newfoundgold.ca",
  "NEW FOUND GOLD. CORP": "newfoundgold.ca",
  "NATIONS ROYALTY CORP.": "nationsroyalty.com",
  "NATIONS ROYALTY CORP": "nationsroyalty.com",
  "PROBE GOLD INC.": "probegold.com",
  "PROBE GOLD INC": "probegold.com",
  "US GOLD CORP": "usgoldcorp.gold",
  "STILLWATER CRITICAL MINERALS CORP.": "critmin.com",
  "STILLWATER CRITICAL MINERALS CORP": "critmin.com",
  "CASCADIA MINERALS LTD.": "cascadiaminerals.com",
  "CASCADIA MINERALS LTD": "cascadiaminerals.com",
  "LATIN METALS INC": "latin-metals.com",
  "SCORPIO GOLD CORPORATION": "scorpiogold.com",
  "MINÉRAUX STRATÉGIQUES ABITIBI INC.": "criticalminerals.com",
  "MINÉRAUX STRATÉGIQUES ABITIBI INC": "criticalminerals.com",
  "STEADRIGHT CRITICAL MINERALS INC.": "criticalminerals.com",
  "STEADRIGHT CRITICAL MINERALS INC": "criticalminerals.com",
  "PINNACLE GOLD AND SILVER CORP.": "pinnaclesilverandgold.com",
  "PINNACLE GOLD AND SILVER CORP": "pinnaclesilverandgold.com",
  "PASOFINO GOLD CORP.": "pasofinogold.com",
  "PASOFINO GOLD CORP": "pasofinogold.com",
  "ALTIUS MINERALS CORPORATION": "altiusminerals.com",
  "SRQ RESOURCES INC.": "srqexploration.com",
  "SRQ RESOURCES INC": "srqexploration.com",
  "SRQ RESOURCES": "srqexploration.com",
  "BLUE LAGOON RESOURCES INC": "bluelagoonresources.com",
  "GREEN LIGHT METALS": "greenlightmetals.com",
  "PIVOTAL METALS": "pivotalmetals.com",
  "CENTERRA GOLD INC": "centerragold.com",
  "KONE MINING HOLDINGS INC.": "konemining.com",
  "KONE MINING HOLDINGS INC": "konemining.com",
  "ONYX GOLD CORP": "onyxgold.com",
  "CARTIER RESOURCES INC.": "ressourcescartier.com",
  "CARTIER RESOURCES INC": "ressourcescartier.com",
  "iMETAL RESOURCES INC.": "imetalresources.ca",
  "IMETAL RESOURCES INC.": "imetalresources.ca",
  "IMETAL RESOURCES INC": "imetalresources.ca",
  "LIBRA ENERGY MATERIALS": "libraenergymaterials.com",
  "ARGENTA SILVER CORP": "argentasilver.com",
  "WESTERN EXPLORATION INC.": "westernexploration.com",
  "WESTERN EXPLORATION INC": "westernexploration.com",
  "AXCAP VENTURES INC": "axcapventures.com",
  "COMMERCE RESOURCES CORP.": "commerceresources.com",
  "COMMERCE RESOURCES CORP": "commerceresources.com",
  "EMPRESS ROYALTY CORP": "empressroyalty.com",
  "LOYALIST EXPLORATION LIMITED": "loyalistexploration.com",
  "LOYALTIST EXPLORATION LTD.": "loyalistexploration.com",
  "LOYALTIST EXPLORATION LTD": "loyalistexploration.com",
  "NAMIB MINERALS": "namibminerals.com",
  "TARGA EXPLORATION CORP.": "targaexploration.com",
  "TARGA EXPLORATION CORP": "targaexploration.com",
  "ARGO GOLD INC.": "argogold.ca",
  "ARGO GOLD INC": "argogold.ca",
  "E POWER RESOURCES": "epowerresources.com",
  "FPX NICKEL CORP": "fpxnickel.com",
  "METALQUEST MINING INC.": "metalquestmining.com",
  "METALQUEST MINING INC": "metalquestmining.com",
  "Ni-Co ENERGY INC.": "nicoenergy.ca",
  "NI-CO ENERGY INC.": "nicoenergy.ca",
  "NI-CO ENERGY INC": "nicoenergy.ca",
  "MAGMA SILVER CORP.": "magmasilver.com",
  "MAGMA SILVER CORP": "magmasilver.com",
  "E-POWER RESOURCES INC.": "epowerresources.com",
  "E-POWER RESOURCES INC": "epowerresources.com",
  "LODE GOLD RESOURCES": "lode-gold.com",
  "QUEBEC PRECIOUS METALS": "qpmcorp.ca",
  "ABITIBI METALS CORP.": "abitibimetals.com",
  "ABITIBI METALS CORP": "abitibimetals.com",
  "E2GOLD INC.": "e2gold.ca",
  "E2GOLD INC": "e2gold.ca",
  "MAPLE GOLD MINES LTD.": "maplegoldmines.com",
  "RACKLA METALS INC.": "racklametals.com",
  "RACKLA METALS INC": "racklametals.com",
  "ADVANCED GOLD EXPLORATION": "advancedgoldexploration.com",
  "MARITIME RESOURCES CORP.": "maritimeresourcescorp.com",
  "RADISSON MINING RESOURCES": "radissonmining.com",
  "ADYTON RESOURCES CORP.": "adytonresources.com",
  "ADYTON RESOURCES CORP": "adytonresources.com",
  "EMPRESS ROYALTY CORP.": "empressroyalty.com",
  "RESOURO STRATEGIC RESOURCES": "resouro.com",
  "EMX ROYALTY CORP.": "emxroyalty.com",
  "EMX ROYALTY CORP": "emxroyalty.com",
  "SHERRITT INTERNATIONAL CORP": "sherritt.com",
  "ALAMOS GOLD INC.": "alamosgold.com",
  "ALAMOS GOLD INC": "alamosgold.com",
  "EVOLVE ROYALTIES": "evolveroyalties.com",
  "MOSAIC MINERALS CORP.": "mosaicminerals.ca",
  "MOSAIC MINERALS CORP": "mosaicminerals.ca",
  "SILVER MOUNTAIN RESOURCES": "agmr.ca",
  "ALLIED GOLD CORPORATION": "alliedgold.com",
  "NEVADA ORGANIC PHOSPHATE": "nopgold.com",
  "ASTON MINERALS LTD": "astonminerals.com",
  "FALCO RESOURCES LTD.": "falcoresources.com",
  "FALCO RESOURCES LTD": "falcoresources.com",
  "NION NICKEL INC.": "nionnickel.com",
  "NION NICKEL INC": "nionnickel.com",
  "STARCORE INTERNATIONAL MINES": "starcore.com",
  "ATEX RESOURCES INC.": "atexresources.com",
  "ATEX RESOURCES INC": "atexresources.com",
  "FIREFLY METALS LTD.": "fireflymetals.com.au",
  "NORTHERN SUPERIOR RESOURCES": "nsuperior.com",
  "STLLR GOLD INC.": "stllrgold.com",
  "STLLR GOLD INC": "stllrgold.com",
  "ATHA ENERGY CORP.": "athaenergy.com",
  "NORTHX NICKEL CORP": "northxnickel.com",
  "AVANTI GOLD CORPORATION": "avantigoldcorp.com",
  "FPX NICKEL CORP.": "fpxnickel.com",
  "NOUVEAU MONDE GRAPHITE": "nmg.ms",
  "TEMAS RESOURCES CORP.": "temasresources.com",
  "TEMAS RESOURCES CORP": "temasresources.com",
  "AYA GOLD & SILVER INC.": "ayagoldsilver.com",
  "AYA GOLD & SILVER INC": "ayagoldsilver.com",
  "GEOVIC METALS": "geovic.net",
  "BLACKBIRD CRITICAL METALS": "blackbirdmetals.ca",
  "GLENCORE PLC/GLENCORE CANADA": "glencore.com",
  "O3 MINING INC.": "o3mining.com",
  "O3 MINING INC": "o3mining.com",
  "TROILUS GOLD CORP.": "troilusgold.com",
  "BLUE THUNDER MINING INC.": "bluethundermining.com",
  "BLUE THUNDER MINING INC": "bluethundermining.com",
  "GOGOLD RESOURCES INC.": "gogoldresources.com",
  "GOGOLD RESOURCES INC": "gogoldresources.com",
  "TUDOR GOLD CORP.": "tudor-gold.com",
  "TUDOR GOLD CORP": "tudor-gold.com",
  "GOLD ROYALTY CORP.": "goldroyalty.com",
  "BUNKER HILL MINING CORP.": "bunkerhillmining.com",
  "GOLDEN CARIBOO RESOURCES": "goldencariboo.com",
  "VANADIUMCORP RESOURCE INC.": "vanadiumcorp.com",
  "VANADIUMCORP RESOURCE INC": "vanadiumcorp.com",
  "CALISTO COBRE RESOURCES.": "calistocobre.com",
  "CALISTO COBRE RESOURCES": "calistocobre.com",
  "GOLIATH RESOURCES LIMITED": "goliathresourcesltd.com",
  "OSISKO MINING INC.": "osiskomining.com",
  "OSISKO MINING INC": "osiskomining.com",
  "CANADA NICKEL COMPANY": "canadanickel.com",
  "HARFANG EXPLORATION INC.": "harfangexploration.com",
  "VISION LITHIUM INC.": "visionlithium.com",
  "VISION LITHIUM INC": "visionlithium.com",
  "HECLA MINING COMPANY": "hecla.com",
  "VIZSLA SILVER CORP.": "vizslasilvercorp.com",
  "COMET LITHIUM CORP": "cometlithium.com",
  "I80 GOLD CORP.": "i80gold.com",
  "I80 GOLD CORP": "i80gold.com",
  "PERSEVERANCE METALS": "perseverancemetals.com",
  "VOLTA METALS LTD": "voltametals.ca",
  "CONIAGAS BATTERY METALS": "coniagasbatterymetals.com",
  "PIEDMONT LITHIUM INC.": "piedmontlithium.com",
  "PIEDMONT LITHIUM INC": "piedmontlithium.com",
  "WALLBRIDGE MINING COMPANY": "wallbridgemining.com",
  "DELTA RESOURCES LIMITED": "deltaresources.ca",
  "IMETAL RESOURCES INC^^": "imetalresources.ca",
  "POWER METALS CORP.": "powermetalscorp.com",
  "POWER METALS CORP": "powermetalscorp.com",
  "DENISON MINES CORP.": "denisonmines.com",
  "DENISON MINES CORP": "denisonmines.com",
  "POWER NICKEL INC.": "powernickel.com",
  "POWER NICKEL INC": "powernickel.com",
  "WEST RED LAKE GOLD MINES": "westredlakegold.com",
  "DOLLY VARDEN SILVER CORP.": "dollyvardensilver.com",
  "PUMA EXPLORATION INC.": "explorationpuma.com",
  "PUMA EXPLORATION INC": "explorationpuma.com",
  "DORÉ COPPER MINING CORP.": "dorecopper.com",
  "DORÉ COPPER MINING CORP": "dorecopper.com",
  "LITHIUM ROYALTY CORP.": "lithiumroyaltycorp.com",
  "QC COPPER & GOLD INC.": "qccopper.com",
  "QC COPPER & GOLD INC": "qccopper.com",
  "DRYDEN GOLD CORP.": "drydengold.com",
  "DRYDEN GOLD CORP": "drydengold.com",
  "LITHIUM UNIVERSE LIMITED": "lithiumuniverse.com",
  "PUREPOINT URANIUM GROUP INC.": "purepoint.ca",
  "PUREPOINT URANIUM GROUP INC": "purepoint.ca",
  "WINSOME RESOURCES LIMITED": "winsomeresources.com.au",
};

export default function CompanyLogoImage({
  name,
  email,
  logo,
}: {
  name: string;
  email?: string;
  logo?: string;
}) {
  const [targetImgError, setTargetImgError] = useState(false);
  const [domainImgError, setDomainImgError] = useState(false);

  // Check if logo prop is passed or local map matches
  const targetLogo = logo || LOCAL_LOGO_MAP.find((item) => item.pattern.test(name))?.src;

  if (targetLogo && !targetImgError) {
    return (
      <div className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center p-1.5 bg-white border border-neutral-200/90 rounded-xl shadow-xs shrink-0 overflow-hidden group-hover:border-[#C6112F]/40 transition-colors">
        <img
          src={targetLogo}
          alt={name}
          onError={() => setTargetImgError(true)}
          className="max-h-9 max-w-[40px] w-auto h-auto object-contain"
        />
      </div>
    );
  }

  // Derive domain from explicit map, email, or company name cleaning
  const nameTrim = name.trim();
  const nameUpper = nameTrim.toUpperCase();
  const cleanUpper = nameUpper.replace(/\^\^/g, "").replace(/#/g, "").replace(/\*$/, "").replace(/\.$/, "").trim();

  let domain =
    EXPLICIT_DOMAINS[nameUpper] ||
    EXPLICIT_DOMAINS[nameTrim] ||
    EXPLICIT_DOMAINS[cleanUpper] ||
    EXPLICIT_DOMAINS[name];

  if (!domain) {
    if (email && email.includes("@")) {
      domain = email.split("@")[1].trim().toLowerCase();
    } else {
      const simplified = name
        .toLowerCase()
        .replace(/\b(inc|corp|corporation|ltd|limited|plc|co|group|s\.a\.|sa|mines|mining|resources|exploration|minerals|gold|silver|copper|metals)\b/gi, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();
      if (simplified.length > 2) {
        domain = `${simplified}.com`;
      }
    }
  }

  const googleLogoUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";

  if (googleLogoUrl && !domainImgError) {
    return (
      <div className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center p-1.5 bg-white border border-neutral-200/90 rounded-xl shadow-xs shrink-0 overflow-hidden">
        <img
          src={googleLogoUrl}
          alt={name}
          onError={() => setDomainImgError(true)}
          className="w-7 h-7 object-contain rounded-xs"
        />
      </div>
    );
  }

  return getCompanyLogoBadge(name);
}
