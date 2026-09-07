"use client";

import React, { useState } from "react";

function getCompanyLogoBadge(name: string) {
  const cleanName = (name || "").replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  const initials =
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
  const charCode = (name || "").charCodeAt(0) || 0;
  const chosenColor = colors[charCode % colors.length];

  return (
    <div
      style={{ backgroundColor: "#ffffff" }}
      className={`logo-white-bg w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-neutral-200 !bg-white flex items-center justify-center font-extrabold tracking-wider ${chosenColor.text} text-xs shadow-2xs shrink-0 select-none`}
    >
      <span>{initials}</span>
    </div>
  );
}

function getDomainFromCompany(name: string, website?: string, email?: string): string | null {
  if (website) {
    try {
      const urlStr = website.startsWith("http") ? website : `https://${website}`;
      const hostname = new URL(urlStr).hostname.replace(/^www\./, "");
      if (hostname && !hostname.includes("newswire.com")) return hostname;
    } catch { }
  }
  if (email && email.includes("@")) {
    const domain = email.split("@")[1]?.trim();
    if (domain) return domain;
  }
  if (name) {
    const cleanKey = name.toLowerCase().trim();
    const DOMAIN_MAP: Record<string, string> = {
      "abcourt mines inc.": "abcourt.ca",
      "abcourt mines": "abcourt.ca",
      "agnico eagle mines limited": "agnicoeagle.com",
      "amex exploration inc.": "amexexploration.com",
      "archer exploration corp.": "archerexploration.com",
      "arizona sonoran copper company inc.": "arizonasonoran.com",
      "avanti gold corporation": "avantigoldcorp.com",
      "avanti gold": "avantigoldcorp.com",
      "baselode energy corp.": "baselode.com",
      "blackbird critical metals": "blackbirdcm.com",
      "blue thunder mining inc.": "bluethundermining.com",
      "blue thunder mining": "bluethundermining.com",
      "bonterra resources inc.": "btrgold.com",
      "bonterra resources": "btrgold.com",
      "brunswick exploration inc.": "brwexplo.ca",
      "brunswick exploration": "brwexplo.ca",
      "canada nickel company inc.": "canadanickel.com",
      "cartier resources inc.": "ressourcescartier.com",
      "doré copper mining corp.": "dorecopper.com",
      "dore copper mining corp.": "dorecopper.com",
      "e-power resources inc.": "e-powerresources.com",
      "e-power resources": "e-powerresources.com",
      "emerita resources corp.": "emeritaresources.com",
      "empress royalty corp.": "empressroyalty.com",
      "emx royalty corp.": "emxroyalty.com",
      "epic gold corp.": "epicgoldcorp.com",
      "epic gold": "epicgoldcorp.com",
      "eu gold mining inc.": "eugoldmining.com",
      "exiro minerals corp.": "exirominerals.com",
      "exiro minerals corp": "exirominerals.com",
      "exiro minerals": "exirominerals.com",
      "exiro": "exirominerals.com",
      "exploits discovery corp.": "epicgoldcorp.com",
      "exploits discovery": "epicgoldcorp.com",
      "firefly metals ltd.": "fireflymetals.com.au",
      "firefly metals": "fireflymetals.com.au",
      "fireweed metals corp.": "fireweedmetals.com",
      "first mining gold corp.": "firstmininggold.com",
      "first phosphate corp.": "firstphosphate.com",
      "first phosphate": "firstphosphate.com",
      "fury gold mines limited": "furygoldmines.com",
      "generation mining limited": "genmining.com",
      "geovic metals": "geovicmining.com",
      "glencore plc / glencore canada": "glencore.ca",
      "glencore plc/glencore canada": "glencore.ca",
      "glencore plc": "glencore.ca",
      "glencore canada": "glencore.ca",
      "glencore": "glencore.ca",
      "go metals corp.": "gometals.ca",
      "go metals": "gometals.ca",
      "gold royalty corp.": "goldroyalty.com",
      "golden cariboo resources": "goldencariboo.com",
      "golden cariboo": "goldencariboo.com",
      "goliath resources limited": "goliathresourcesltd.com",
      "harfang exploration inc.": "harfangexploration.com",
      "hecla mining company": "hecla-mining.com",
      "hycroft mining corp.": "hycroftmining.com",
      "ion energy ltd.": "ionenergy.ca",
      "jaguar mining inc.": "jaguarmining.com",
      "juggernaut exploration inc.": "juggernautexploration.com",
      "kirkland lake discoveries corp.": "kirklandlakediscoveries.com",
      "kirkland lake discoveries": "kirklandlakediscoveries.com",
      "lavras gold corp.": "lavrasgold.com",
      "li-ft power ltd.": "li-ft.com",
      "lithiumbank resources corp.": "lithiumbank.ca",
      "lithium royalty corp.": "lithiumroyalty.com",
      "lithium royalty corp": "lithiumroyalty.com",
      "lithium royalty": "lithiumroyalty.com",
      "lode gold resources": "lode-gold.com",
      "lode gold resources inc.": "lode-gold.com",
      "lomiko metals inc.": "lomiko.com",
      "maple gold mines ltd.": "maplegoldmines.com",
      "maple gold mines": "maplegoldmines.com",
      "medaro gold resources corp.": "medaromining.com",
      "medaro gold resources": "medaromining.com",
      "medaro mining": "medaromining.com",
      "medaro": "medaromining.com",
      "metals energy corp.": "metalenergy.ca",
      "metal energy corp.": "metalenergy.ca",
      "metals energy": "metalenergy.ca",
      "metal energy": "metalenergy.ca",
      "midland exploration inc.": "midlandexploration.com",
      "mineros s.a.": "mineros.com.co",
      "mineros sa": "mineros.com.co",
      "mineros": "mineros.com.co",
      "mosaic minerals corp.": "mosaicminerals.ca",
      "mosaic minerals corp": "mosaicminerals.ca",
      "mosaic minerals": "mosaicminerals.ca",
      "mundoro capital ltd.": "mundoro.com",
      "nickel creek platinum corp.": "nickelcreekplatinum.com",
      "northern superior resources inc.": "nsuperior.com",
      "northern superior resources": "nsuperior.com",
      "northwest copper corp.": "northwestcopper.ca",
      "nouveau monde graphite inc.": "nmg.com",
      "nouveau monde graphite": "nmg.com",
      "nuvau minerals corp.": "nuvauminerals.com",
      "o3 mining inc.": "o3mining.com",
      "o3 mining": "o3mining.com",
      "omai gold mines corp.": "omaigoldmines.com",
      "orford mining corporation": "orfordmining.com",
      "osisko development corp.": "osiskodev.com",
      "osisko gold royalties ltd.": "osiskogr.com",
      "osisko gold royalties": "osiskogr.com",
      "osisko metals incorporated": "osiskometals.com",
      "osisko mining inc.": "osiskomining.com",
      "palladium one mining inc.": "palladiumoneinc.com",
      "paramount gold nevada corp.": "paramountnevada.com",
      "patriot battery metals inc.": "patriotbatterymetals.com",
      "power nickel inc.": "powernickel.com",
      "prospector metals corp.": "prospectormetalscorp.com",
      "prospector metals": "prospectormetalscorp.com",
      "ptx metals inc.": "ptxmetals.com",
      "ptx metals": "ptxmetals.com",
      "qc copper & gold inc.": "qccopper.com",
      "quebec nickel corp.": "quebecnickel.com",
      "quebec precious metals corp.": "qpmcorp.ca",
      "quebec precious metals corp": "qpmcorp.ca",
      "quebec precious metals": "qpmcorp.ca",
      "rackla metals inc.": "racklametals.com",
      "red pine exploration inc.": "redpineexp.com",
      "resouro strategic resources": "resouro.com",
      "resouro strategic resources inc.": "resouro.com",
      "ridgeline minerals corp.": "ridgelineminerals.com",
      "sayona mining limited": "sayonamining.com.au",
      "sayona mining ltd.": "sayonamining.com.au",
      "sayona mining ltd": "sayonamining.com.au",
      "sayona mining": "sayonamining.com.au",
      "sayona": "sayonamining.com.au",
      "sherritt international corp": "sherritt.com",
      "sherritt international corp.": "sherritt.com",
      "sherritt international": "sherritt.com",
      "signal gold inc.": "signalgold.com",
      "sirios resources inc.": "sirios.com",
      "sirios resources": "sirios.com",
      "skyharbour resources ltd.": "skyharbourltd.com",
      "srq resources inc.": "srqexploration.com",
      "srq resources": "srqexploration.com",
      "starcore international mines": "starcore.com",
      "starcore international": "starcore.com",
      "stelmine canada ltd.": "stelmine.com",
      "steppe gold ltd.": "steppegold.com",
      "stillwater critical minerals corp.": "criticalminerals.com",
      "strategic resources inc.": "strategic-res.com",
      "talisker resources ltd.": "taliskerresources.com",
      "thunder gold corp.": "thundergoldcorp.com",
      "troilus gold corp.": "troilusmining.com",
      "troilus gold": "troilusmining.com",
      "troilus mining corp.": "troilusmining.com",
      "troilus mining": "troilusmining.com",
      "unigold inc.": "unigoldinc.com",
      "unigold": "unigoldinc.com",
      "vanadiumcorp resource inc.": "vanadiumcorp.com",
      "vanstar mining resources inc.": "vanstarmining.com",
      "vision lithium inc.": "visionlithium.com",
      "vision lithium": "visionlithium.com",
      "wallbridge mining company": "wallbridgemining.com",
      "wesdome gold mines ltd.": "wesdome.com",
      "west red lake gold mines ltd.": "westredlakegold.com",
      "western copper and gold corp.": "westerncopperandgold.com",
      "steadright critical minerals inc.": "steadright.ca",
      "steadright critical minerals": "steadright.ca",
      "radisson mining resources inc.": "radissonmining.com",
      "radisson mining resources": "radissonmining.com",
      "puma exploration inc.": "explorationpuma.com",
      "puma exploration": "explorationpuma.com",
      "leopard lake gold corp.": "leopardlake.ca",
      "leopard lake gold": "leopardlake.ca",
      "imetal resources inc.": "imetalresources.ca",
      "imetal resources inc": "imetalresources.ca",
      "imetal resources inc^^": "imetalresources.ca",
      "imetal resources": "imetalresources.ca",
      "imetal": "imetalresources.ca",
      "astra exploration inc.": "astra-exploration.com",
      "astra exploration": "astra-exploration.com",
      "beauce gold fields inc.": "beaucegold.com",
      "beauce gold fields": "beaucegold.com",
      "calisto cobre resources corp.": "calistocobre.com",
      "calisto cobre resources": "calistocobre.com",
      "calisto cobre": "calistocobre.com",
      "copperzone resources limited": "copperzone-resources.com",
      "copperzone resources": "copperzone-resources.com",
      "delta resources limited": "deltaresources.ca",
      "delta resources": "deltaresources.ca",
      "e2gold inc.": "e2gold.ca",
      "e2gold": "e2gold.ca",
      "electro metals & mining": "electrometalsandmining.com",
      "electro metals and mining": "electrometalsandmining.com",
      "electro metals and mining corp.": "electrometalsandmining.com",
      "platinex inc.": "ptxmetals.com",
      "wesdome gold mines": "wesdome.com",
      "wesdome": "wesdome.com",
      "west red lake gold mines": "westredlakegold.com",
      "west red lake gold": "westredlakegold.com",
      "wheaton precious metals corp.": "wheatonpm.com",
      "wheaton precious metals": "wheatonpm.com",
      "wheaton": "wheatonpm.com",
      "winsome resources limited": "winsomeresources.ca",
      "winsome resources": "winsomeresources.ca",
      "purepoint uranium group inc.": "purepoint.ca",
      "purepoint uranium group": "purepoint.ca",
      "purepoint uranium": "purepoint.ca",
      "lithium universe limited": "lithiumuniverse.com",
      "lithium universe": "lithiumuniverse.com",
      "dryden gold corp.": "drydengold.com",
      "dryden gold": "drydengold.com",
      "q2 metals corp.": "q2metals.com",
      "q2 metals corp": "q2metals.com",
      "q2 metals": "q2metals.com",
      "cupani metals corporation": "cupanimetals.com",
      "cupani metals corp": "cupanimetals.com",
      "cupani metals": "cupanimetals.com",
      "argenta silver corp.": "argentasilver.com",
      "argenta silver corp": "argentasilver.com",
      "argenta silver": "argentasilver.com",
      "pinnacle gold and silver corp.": "pinnaclesilverandgold.com",
      "pinnacle gold and silver corp": "pinnaclesilverandgold.com",
      "pinnacle gold and silver": "pinnaclesilverandgold.com",
      "pinnacle silver and gold corp.": "pinnaclesilverandgold.com",
      "pinnacle silver and gold corp": "pinnaclesilverandgold.com",
      "pinnacle silver and gold": "pinnaclesilverandgold.com",
      "pinnacle silver & gold corp.": "pinnaclesilverandgold.com",
      "pinnacle silver & gold": "pinnaclesilverandgold.com",
      "capitan silver corp.": "capitansilver.com",
      "capitan silver corp": "capitansilver.com",
      "capitan silver": "capitansilver.com",
      "wallbridge mining company limited": "wallbridgemining.com",
      "south kirkland gold": "southkirklandgold.com",
      "tocvan ventures corp.": "tocvan.com",
      "tocvan ventures corp": "tocvan.com",
      "tocvan ventures": "tocvan.com",
      "questcorp mining inc.": "questcorpmining.ca",
      "questcorp mining inc": "questcorpmining.ca",
      "thunder gold corp": "thundergoldcorp.com",
      "mont royal resources limited": "montroyalres.com",
      "mont royal resources": "montroyalres.com",
      "loyalist exploration limited": "loyalistexploration.com",
      "loyalist exploration ltd.": "loyalistexploration.com",
      "loyaltist exploration ltd.": "loyalistexploration.com",
      "loyalist exploration": "loyalistexploration.com",
      "loyaltist exploration": "loyalistexploration.com",
      "loyalist": "loyalistexploration.com",
      "juno corp.": "junocorp.com",
      "juno corp": "junocorp.com",
      "gt resources inc.": "gtresourcesinc.com",
      "gt resources": "gtresourcesinc.com",
      "gr silver mining ltd.": "grsilvermining.com",
      "gr silver mining": "grsilvermining.com",
      "globex mining enterprises inc.": "globexmining.com",
      "globex mining enterprises": "globexmining.com",
      "globex mining": "globexmining.com",
      "equity metals corporation": "equitymetalscorporation.com",
      "equity metals": "equitymetalscorporation.com",
      "critical elements lithium corporation": "cecorp.ca",
      "critical elements lithium": "cecorp.ca",
      "bluejay gold inc.": "bluejaygoldcorp.com",
      "bluejay gold": "bluejaygoldcorp.com",
      "arizona metals corp.": "arizonametalscorp.com",
      "arizona metals corp": "arizonametalscorp.com",
      "arizona gold & silver inc.": "arizonagoldsilver.com",
      "arizona gold & silver inc": "arizonagoldsilver.com",
      "arizona gold & silver": "arizonagoldsilver.com",
      "consolidated lithium metals inc.": "consolidatedlithium.com",
      "consolidated lithium metals": "consolidatedlithium.com",
      "contango silver & gold inc.": "contangoore.com",
      "contango silver & gold": "contangoore.com",
      "contango ore": "contangoore.com",
      "morocco strategic minerals corporation": "moroccosm.com",
      "morocco strategic minerals": "moroccosm.com",
      "morocco": "moroccosm.com",
      "orezone gold corporation": "orezone.com",
      "orezone gold": "orezone.com",
      "orezone": "orezone.com",
      "or royalties inc": "orroyalties.com",
      "or royalties inc.": "orroyalties.com",
      "or royalties": "orroyalties.com"
    };

    if (DOMAIN_MAP[cleanKey]) {
      return DOMAIN_MAP[cleanKey];
    }

    const words = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => !["inc", "corp", "corporation", "ltd", "limited", "llc", "co", "company"].includes(w));
    if (words.length > 0) {
      return `${words.join("")}.com`;
    }
  }
  return null;
}

export default function CompanyLogoImage({
  name,
  email,
  logo,
  website,
}: {
  name: string;
  email?: string;
  logo?: string;
  website?: string;
}) {
  const [imgSourceIndex, setImgSourceIndex] = useState(0);

  const domain = getDomainFromCompany(name, website, email);

  React.useEffect(() => {
    setImgSourceIndex(0);
  }, [domain, logo, name, website]);

  const sources = React.useMemo(() => {
    const list: string[] = [];
    const lowerName = (name || "").toLowerCase();
    if (logo) {
      list.push(logo);
    }
    if (lowerName.includes("glencore")) {
      list.push("/sponsors/2026/glencore.svg");
      list.push("https://www.google.com/s2/favicons?domain=glencore.ca&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/glencore.ca.ico");
      list.push("https://glencore.ca/favicon.ico");
    } else if (lowerName.includes("gr silver")) {
      list.push("https://www.google.com/s2/favicons?domain=grsilvermining.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/grsilvermining.com.ico");
      list.push("https://icon.horse/icon/grsilvermining.com");
      list.push("https://grsilvermining.com/favicon.ico");
    } else if (lowerName.includes("loyalist") || lowerName.includes("loyaltist")) {
      list.unshift("/loyal-logo.webp");
      list.push("/loyal-logo.webp");
      list.push("https://loyalistexploration.com/favicon.ico");
      list.push("https://www.google.com/s2/favicons?domain=loyalistexploration.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/loyalistexploration.com.ico");
      list.push("https://icon.horse/icon/loyalistexploration.com");
    } else if (lowerName.includes("lithium royalty")) {
      list.push("https://www.lithiumroyalty.com/favicon.ico");
      list.push("https://www.google.com/s2/favicons?domain=lithiumroyalty.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/lithiumroyalty.com.ico");
      list.push("https://icon.horse/icon/lithiumroyalty.com");
    } else if (lowerName.includes("ptx metals")) {
      list.push("https://www.google.com/s2/favicons?domain=ptxmetals.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/ptxmetals.com.ico");
      list.push("https://icon.horse/icon/ptxmetals.com");
      list.push("https://ptxmetals.com/favicon.ico");
    } else if (lowerName.includes("metal energy") || lowerName.includes("metals energy")) {
      list.push("https://www.google.com/s2/favicons?domain=metalenergy.ca&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/metalenergy.ca.ico");
      list.push("https://icon.horse/icon/metalenergy.ca");
      list.push("https://metalenergy.ca/favicon.ico");
    } else if (lowerName.includes("medaro")) {
      list.push("https://www.google.com/s2/favicons?domain=medaromining.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/medaromining.com.ico");
      list.push("https://icon.horse/icon/medaromining.com");
      list.push("https://medaromining.com/favicon.ico");
    } else if (lowerName.includes("vision lithium")) {
      list.push("https://www.google.com/s2/favicons?domain=visionlithium.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/visionlithium.com.ico");
      list.push("https://icon.horse/icon/visionlithium.com");
      list.push("https://visionlithium.com/favicon.ico");
    } else if (lowerName.includes("quebec precious") || lowerName.includes("qpm")) {
      list.unshift("/5555.jpg");
      list.push("/5555.jpg");
      list.push("https://qpmcorp.ca/favicon.ico");
      list.push("https://www.google.com/s2/favicons?domain=qpmcorp.ca&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/qpmcorp.ca.ico");
      list.push("https://icon.horse/icon/qpmcorp.ca");
    } else if (lowerName.includes("go metals")) {
      list.push("https://www.google.com/s2/favicons?domain=gometals.ca&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/gometals.ca.ico");
      list.push("https://icon.horse/icon/gometals.ca");
      list.push("https://gometals.ca/favicon.ico");
    } else if (lowerName.includes("copperzone")) {
      list.push("https://www.google.com/s2/favicons?domain=copperzone-resources.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/copperzone-resources.com.ico");
      list.push("https://icon.horse/icon/copperzone-resources.com");
      list.push("https://copperzone-resources.com/favicon.ico");
    } else if (lowerName.includes("osisko gold royalties") || lowerName === "osisko gold") {
      list.push("/sponsors/2026/or_royalties_osisko_royalties.svg");
      list.push("https://www.google.com/s2/favicons?domain=osiskogr.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/osiskogr.com.ico");
      list.push("https://icon.horse/icon/osiskogr.com");
      list.push("https://www.osiskogr.com/favicon.ico");
    } else if (lowerName.includes("northern superior")) {
      list.push("https://www.google.com/s2/favicons?domain=nsuperior.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/nsuperior.com.ico");
      list.push("https://icon.horse/icon/nsuperior.com");
      list.push("https://nsuperior.com/favicon.ico");
    } else if (lowerName.includes("geovic")) {
      list.push("https://www.google.com/s2/favicons?domain=geovicmining.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/geovicmining.com.ico");
      list.push("https://icon.horse/icon/geovicmining.com");
      list.push("https://geovicmining.com/favicon.ico");
    } else if (lowerName.includes("blackbird")) {
      list.push("https://www.google.com/s2/favicons?domain=blackbirdcm.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/blackbirdcm.com.ico");
      list.push("https://icon.horse/icon/blackbirdcm.com");
      list.push("https://blackbirdcm.com/favicon.ico");
    } else if (lowerName.includes("blue thunder")) {
      list.push("https://www.google.com/s2/favicons?domain=bluethundermining.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/bluethundermining.com.ico");
      list.push("https://icon.horse/icon/bluethundermining.com");
      list.push("https://bluethundermining.com/favicon.ico");
    } else if (lowerName.includes("cupani")) {
      list.push("/cupani-logo.svg");
      list.push("/cupanii.svg");
      list.push("https://cupanimetals.com/wp-content/uploads/2026/02/logo.svg");
      list.push("https://www.google.com/s2/favicons?domain=cupanimetals.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/cupanimetals.com.ico");
      list.push("https://icon.horse/icon/cupanimetals.com");
      list.push("https://cupanimetals.com/favicon.ico");
    } else if (lowerName.includes("imetal")) {
      list.push("https://imetalresources.ca/wp-content/uploads/2022/05/iMetal-Resources-TSXV-IMR-OTCBB-ADTFF-FSE-A7V2-icon1.png");
      list.push("https://www.google.com/s2/favicons?domain=imetalresources.ca&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/imetalresources.ca.ico");
      list.push("https://icon.horse/icon/imetalresources.ca");
      list.push("https://imetalresources.ca/favicon.ico");
    } else if (lowerName.includes("morocco")) {
      list.push("/Morocco.svg");
      list.push("https://www.google.com/s2/favicons?domain=moroccosm.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/moroccosm.com.ico");
      list.push("https://www.moroccosm.com/favicon.ico");
    } else if (lowerName.includes("orezone")) {
      list.push("/Orezone.png");
      list.push("https://www.google.com/s2/favicons?domain=orezone.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/orezone.com.ico");
      list.push("https://orezone.com/favicon.ico");
    } else if (lowerName.includes("or royalties")) {
      list.push("/sponsors/2026/or_royalties_osisko_royalties.svg");
      list.push("/logo-orroyalties.svg");
      list.push("https://www.google.com/s2/favicons?domain=orroyalties.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/orroyalties.com.ico");
      list.push("https://orroyalties.com/favicon.ico");
    } else if (lowerName.includes("q2 metals")) {
      list.push("/q2-metals-favicon.png");
      list.push("/q2-metals-logo.svg");
      list.push("https://q2metals.com/wp-content/uploads/2026/06/cropped-Logo-1-1-192x192.png");
      list.push("https://www.google.com/s2/favicons?domain=q2metals.com&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/q2metals.com.ico");
      list.push("https://icon.horse/icon/q2metals.com");
      list.push("https://q2metals.com/favicon.ico");
    } else if (lowerName.includes("sayona")) {
      list.push("/sayona-mining.png");
      list.push("https://www.google.com/s2/favicons?domain=sayonamining.com.au&sz=128");
      list.push("https://icons.duckduckgo.com/ip3/sayonamining.com.au.ico");
      list.push("https://icon.horse/icon/sayonamining.com.au");
      list.push("https://sayonamining.com.au/favicon.ico");
    } else if (lowerName.includes("exiro")) {
      list.push("/exiro-favicon.png");
      list.push("/exiro-minerals.png");
      list.push("https://www.exirominerals.com/_archive/favicon.png");
      list.push("https://icons.duckduckgo.com/ip3/exirominerals.com.ico");
      list.push("https://icon.horse/icon/exirominerals.com");
    } else if (lowerName.includes("o3 mining")) {
      list.push("/o3_mining_logo.png");
    } else if (lowerName.includes("abcourt")) {
      list.push("/abcourt.png");
      list.push("https://www.abcourt.ca/wp-content/uploads/2024/06/ABCOURTMINESINC-LogoVectorization-02.png");
    } else if (lowerName.includes("capitan silver")) {
      list.push("/capitansilver-favicon.png");
    } else if (lowerName.includes("tocvan")) {
      list.push("/TOC_Logo_500.png");
    } else if (lowerName.includes("questcorp")) {
      list.push("/quest-corp.png");
    } else if (lowerName.includes("thunder gold")) {
      list.push("/thunder.jpeg");
    } else if (lowerName.includes("juno")) {
      list.push("/juno-logo.svg");
    } else if (lowerName.includes("nouveau monde")) {
      list.push("/NMG_Log.png");
    } else if (lowerName.includes("arizona gold")) {
      list.push("/arizona-gold.png");
    } else if (lowerName.includes("arizona metals")) {
      list.push("/arizona-metals-favicon.ico");
      list.push("/arizona-logo.png");
    }
    if (domain) {
      list.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      list.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
      list.push(`https://icon.horse/icon/${domain}`);
      list.push(`https://unavatar.io/${domain}?fallback=false`);
      list.push(`https://${domain}/favicon.ico`);
      const parts = domain.split(".");
      if (parts.length > 2) {
        const rootDomain = parts.slice(-2).join(".");
        list.push(`https://www.google.com/s2/favicons?domain=${rootDomain}&sz=128`);
        list.push(`https://icons.duckduckgo.com/ip3/${rootDomain}.ico`);
      }
    }
    return list;
  }, [logo, domain, name]);

  const currentUrl = sources[imgSourceIndex];

  if (currentUrl && imgSourceIndex < sources.length) {
    const isWhiteOnTransparent = Boolean(
      currentUrl &&
        (currentUrl.includes("arizona-logo.png") || currentUrl.includes("exiro-minerals.png"))
    );
    return (
      <div
        style={{ backgroundColor: "#ffffff" }}
        className="logo-white-bg h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center p-1.5 bg-white border border-neutral-200 rounded-xl shadow-2xs shrink-0 overflow-hidden group-hover:border-[#C6112F]/40 transition-all"
      >
        <img
          src={currentUrl}
          alt={name}
          onError={() => setImgSourceIndex((prev) => prev + 1)}
          style={{ backgroundColor: "#ffffff" }}
          className={`logo-white-bg max-h-8 max-w-[36px] w-auto h-auto object-contain filter drop-shadow-xs rounded-sm ${
            isWhiteOnTransparent ? "brightness-0" : ""
          }`}
        />
      </div>
    );
  }

  // Graceful fallback to company initials badge
  return getCompanyLogoBadge(name);
}
