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
      if (hostname) return hostname;
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
      "lode gold resources": "lode-gold.com",
      "lode gold resources inc.": "lode-gold.com",
      "lomiko metals inc.": "lomiko.com",
      "maple gold mines ltd.": "maplegoldmines.com",
      "maple gold mines": "maplegoldmines.com",
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
      "northwest copper corp.": "northwestcopper.ca",
      "nouveau monde graphite inc.": "nmg.com",
      "nouveau monde graphite": "nmg.com",
      "nuvau minerals corp.": "nuvauminerals.com",
      "o3 mining inc.": "o3mining.com",
      "o3 mining": "o3mining.com",
      "omai gold mines corp.": "omaigoldmines.com",
      "orford mining corporation": "orfordmining.com",
      "osisko development corp.": "osiskodev.com",
      "osisko metals incorporated": "osiskometals.com",
      "osisko mining inc.": "osiskomining.com",
      "palladium one mining inc.": "palladiumoneinc.com",
      "paramount gold nevada corp.": "paramountnevada.com",
      "patriot battery metals inc.": "patriotbatterymetals.com",
      "power nickel inc.": "powernickel.com",
      "prospector metals corp.": "prospectormetalscorp.com",
      "prospector metals": "prospectormetalscorp.com",
      "qc copper & gold inc.": "qccopper.com",
      "quebec nickel corp.": "quebecnickel.com",
      "rackla metals inc.": "racklametals.com",
      "red pine exploration inc.": "redpineexp.com",
      "resouro strategic resources": "resouro.com",
      "resouro strategic resources inc.": "resouro.com",
      "ridgeline minerals corp.": "ridgelineminerals.com",
      "sayona mining limited": "sayonamining.com.au",
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
      "metal energy corp.": "metalenergy.ca",
      "metal energy": "metalenergy.ca",
      "leopard lake gold corp.": "leopardlake.ca",
      "leopard lake gold": "leopardlake.ca",
      "imetal resources inc.": "imetalresources.ca",
      "imetal resources": "imetalresources.ca",
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
      "ptx metals inc.": "ptxmetals.com",
      "ptx metals": "ptxmetals.com",
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
      "imetal resources inc": "imetalresources.ca",
      "pinnacle gold and silver corp.": "pinnaclesilverandgold.com",
      "pinnacle gold and silver corp": "pinnaclesilverandgold.com",
      "pinnacle gold and silver": "pinnaclesilverandgold.com",
      "pinnacle silver and gold corp.": "pinnaclesilverandgold.com",
      "pinnacle silver and gold corp": "pinnaclesilverandgold.com",
      "pinnacle silver and gold": "pinnaclesilverandgold.com",
      "pinnacle silver & gold corp.": "pinnaclesilverandgold.com",
      "pinnacle silver & gold": "pinnaclesilverandgold.com"
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
    } else if (lowerName.includes("o3 mining")) {
      list.push("/o3_mining_logo.png");
    } else if (lowerName.includes("abcourt")) {
      list.push("/abcourt.png");
      list.push("https://www.abcourt.ca/wp-content/uploads/2024/06/ABCOURTMINESINC-LogoVectorization-02.png");
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
          className="logo-white-bg max-h-8 max-w-[36px] w-auto h-auto object-contain filter drop-shadow-xs rounded-sm"
        />
      </div>
    );
  }

  // Graceful fallback to company initials badge
  return getCompanyLogoBadge(name);
}
