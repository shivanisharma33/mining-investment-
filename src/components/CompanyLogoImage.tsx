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
      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border ${chosenColor.border} ${chosenColor.bg} flex items-center justify-center font-extrabold tracking-wider ${chosenColor.text} text-xs shadow-2xs shrink-0 select-none`}
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
    } catch {}
  }
  if (email && email.includes("@")) {
    const domain = email.split("@")[1]?.trim();
    if (domain) return domain;
  }
  if (name) {
    const cleanKey = name.toLowerCase().trim();
    const DOMAIN_MAP: Record<string, string> = {
      "agnico eagle mines limited": "agnicoeagle.com",
      "amex exploration inc.": "amexexploration.com",
      "archer exploration corp.": "archerexploration.com",
      "arizona sonoran copper company inc.": "arizonasonoran.com",
      "baselode energy corp.": "baselode.com",
      "bonterra resources inc.": "bonterraresources.com",
      "brunswick exploration inc.": "brunsdex.com",
      "canada nickel company inc.": "canadanickel.com",
      "cartier resources inc.": "ressourcescartier.com",
      "doré copper mining corp.": "dorecopper.com",
      "dore copper mining corp.": "dorecopper.com",
      "emerita resources corp.": "emeritaresources.com",
      "empress royalty corp.": "empressroyalty.com",
      "emx royalty corp.": "emxroyalty.com",
      "eu gold mining inc.": "eugoldmining.com",
      "exiro minerals corp.": "exirominerals.com",
      "exploits discovery corp.": "exploitsdiscovery.com",
      "fireweed metals corp.": "fireweedmetals.com",
      "first mining gold corp.": "firstmininggold.com",
      "first phosphate corp.": "firstphosphate.com",
      "first phosphate": "firstphosphate.com",
      "fury gold mines limited": "furygoldmines.com",
      "generation mining limited": "genmining.com",
      "go metals corp.": "gometals.ca",
      "gold royalty corp.": "goldroyalty.com",
      "goliath resources limited": "goliathresourcesltd.com",
      "harfang exploration inc.": "harfangexploration.com",
      "hecla mining company": "hecla-mining.com",
      "hycroft mining corp.": "hycroftmining.com",
      "ion energy ltd.": "ionenergy.ca",
      "jaguar mining inc.": "jaguarmining.com",
      "juggernaut exploration inc.": "juggernautexploration.com",
      "kirkland lake discoveries corp.": "kldiscoveries.com",
      "lavras gold corp.": "lavrasgold.com",
      "li-ft power ltd.": "li-ft.com",
      "lithiumbank resources corp.": "lithiumbank.ca",
      "lomiko metals inc.": "lomiko.com",
      "maple gold mines ltd.": "maplegoldmines.com",
      "maple gold mines": "maplegoldmines.com",
      "midland exploration inc.": "midlandexploration.com",
      "mundoro capital ltd.": "mundoro.com",
      "nickel creek platinum corp.": "nickelcreekplatinum.com",
      "northern superior resources inc.": "nsuperior.com",
      "northwest copper corp.": "northwestcopper.ca",
      "nouveau monde graphite inc.": "nouveaumonde.ca",
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
      "prospector metals corp.": "prospectormetals.com",
      "qc copper & gold inc.": "qccopper.com",
      "quebec nickel corp.": "quebecnickel.com",
      "rackla metals inc.": "racklametals.com",
      "red pine exploration inc.": "redpineexp.com",
      "ridgeline minerals corp.": "ridgelineminerals.com",
      "sayona mining limited": "sayonamining.com.au",
      "signal gold inc.": "signalgold.com",
      "sirios resources inc.": "sirios.com",
      "skyharbour resources ltd.": "skyharbourltd.com",
      "stelmine canada ltd.": "stelmine.com",
      "steppe gold ltd.": "steppegold.com",
      "stillwater critical minerals corp.": "criticalminerals.com",
      "strategic resources inc.": "strategic-res.com",
      "talisker resources ltd.": "taliskerresources.com",
      "thunder gold corp.": "thundergoldcorp.com",
      "troilus gold corp.": "troilusgold.com",
      "troilus gold": "troilusgold.com",
      "vanadiumcorp resource inc.": "vanadiumcorp.com",
      "vanstar mining resources inc.": "vanstarmining.com",
      "vision lithium inc.": "visionlithium.com",
      "wallbridge mining company": "wallbridgemining.com",
      "wesdome gold mines ltd.": "wesdome.com",
      "west red lake gold mines ltd.": "westredlakegold.com",
      "western copper and gold corp.": "westerncopperandgold.com"
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
  const [targetImgError, setTargetImgError] = useState(false);

  const domain = getDomainFromCompany(name, website, email);
  const faviconUrl = logo || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null);

  if (faviconUrl && !targetImgError) {
    return (
      <div className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center p-1.5 bg-neutral-50 dark:bg-zinc-800/80 border border-neutral-200/80 dark:border-zinc-700/80 rounded-xl shadow-2xs shrink-0 overflow-hidden group-hover:border-[#C6112F]/40 transition-all">
        <img
          src={faviconUrl}
          alt={name}
          onError={() => setTargetImgError(true)}
          className="max-h-8 max-w-[36px] w-auto h-auto object-contain filter drop-shadow-xs"
        />
      </div>
    );
  }

  // Graceful fallback to company initials badge
  return getCompanyLogoBadge(name);
}
