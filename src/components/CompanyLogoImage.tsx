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
  { pattern: /stllr|stl/i, src: "/stl.avif" },
  { pattern: /thunder/i, src: "/thunder.jpeg" },
  { pattern: /tocvan|toc_logo/i, src: "/TOC_Logo_500.png" },
  { pattern: /winsome|winshear/i, src: "/winsome.svg" },
  { pattern: /quest/i, src: "/quest-corp.png" },
  { pattern: /altitude/i, src: "/altitude.png" },
  { pattern: /yukon/i, src: "/Invest_Yukon.png" },
];

export default function CompanyLogoImage({
  name,
  email,
  logo,
}: {
  name: string;
  email?: string;
  logo?: string;
}) {
  const [imgError, setImgError] = useState(false);

  // Check if logo prop is passed or local map matches
  const targetLogo = logo || LOCAL_LOGO_MAP.find((item) => item.pattern.test(name))?.src;

  if (targetLogo && !imgError) {
    return (
      <div className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center p-1.5 bg-white border border-neutral-200/90 rounded-xl shadow-xs shrink-0 overflow-hidden group-hover:border-[#C6112F]/40 transition-colors">
        <img
          src={targetLogo}
          alt={name}
          onError={() => setImgError(true)}
          className="max-h-9 max-w-[40px] w-auto h-auto object-contain"
        />
      </div>
    );
  }

  // Derive domain from email or company name
  let domain = "";
  if (email && email.includes("@")) {
    domain = email.split("@")[1].trim().toLowerCase();
  } else {
    const simplified = name
      .toLowerCase()
      .replace(/\b(inc|corp|corporation|ltd|limited|plc|co|group|s\.a\.|sa)\b/gi, "")
      .replace(/[^a-z0-9]/g, "")
      .trim();
    if (simplified.length > 2) {
      domain = `${simplified}.com`;
    }
  }

  // Google Favicon & Logo API URL
  const googleLogoUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";

  if (googleLogoUrl && !imgError) {
    return (
      <div className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center p-1.5 bg-white border border-neutral-200/90 rounded-xl shadow-xs shrink-0 overflow-hidden">
        <img
          src={googleLogoUrl}
          alt={name}
          onError={() => setImgError(true)}
          className="w-7 h-7 object-contain rounded-xs"
        />
      </div>
    );
  }

  return getCompanyLogoBadge(name);
}
