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
      className={`w-9 h-9 rounded-lg border ${chosenColor.border} ${chosenColor.bg} flex items-center justify-center font-extrabold tracking-wider ${chosenColor.text} text-[11px] shadow-2xs shrink-0 select-none`}
    >
      <span>{initials}</span>
    </div>
  );
}

export default function CompanyLogoImage({
  name,
  email,
}: {
  name: string;
  email?: string;
}) {
  const [imgError, setImgError] = useState(false);

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

  // Local overrides for specific major logos
  if (name.toLowerCase().includes("agnico")) {
    return (
      <div className="h-9 w-9 flex items-center justify-center p-1 bg-white border border-neutral-200 rounded-lg shadow-2xs shrink-0">
        <img
          src="/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png"
          alt={name}
          className="max-h-7 max-w-[28px] object-contain"
        />
      </div>
    );
  }

  // Google Favicon & Logo API URL
  const googleLogoUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";

  if (googleLogoUrl && !imgError) {
    return (
      <div className="h-9 w-9 flex items-center justify-center p-1 bg-white border border-neutral-200/90 rounded-lg shadow-2xs shrink-0 overflow-hidden">
        <img
          src={googleLogoUrl}
          alt={name}
          onError={() => setImgError(true)}
          className="w-5 h-5 object-contain rounded-xs"
        />
      </div>
    );
  }

  return getCompanyLogoBadge(name);
}
