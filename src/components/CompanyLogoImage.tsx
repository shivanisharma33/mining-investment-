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
    const words = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => !["inc", "corp", "corporation", "ltd", "limited", "llc", "co"].includes(w));
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
      <div className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center p-1 bg-white border border-neutral-200/90 rounded-xl shadow-xs shrink-0 overflow-hidden group-hover:border-[#C6112F]/40 transition-colors">
        <img
          src={faviconUrl}
          alt={name}
          onError={() => setTargetImgError(true)}
          className="max-h-9 max-w-[40px] w-auto h-auto object-contain"
        />
      </div>
    );
  }

  // Graceful fallback to company initials badge
  return getCompanyLogoBadge(name);
}
