"use client";

import React, { useState, useMemo } from "react";
import CompanyLogoImage from "@/components/CompanyLogoImage";
import { PARTICIPATING_COMPANIES, CompanyItem } from "./companiesData";

export default function CompaniesView({
  initialYear = 2026,
}: {
  initialYear?: number;
}) {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getTypeBadgeStyle = (type: string) => {
    const t = type.toUpperCase();
    if (t.includes("PRODUCER")) {
      return "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 shadow-2xs";
    } else if (t.includes("DEVELOPER")) {
      return "bg-sky-500/10 text-sky-700 border border-sky-500/30 shadow-2xs";
    } else if (t.includes("EXPLORER") || t.includes("EXPL")) {
      return "bg-amber-500/10 text-amber-700 border border-amber-500/30 shadow-2xs";
    } else if (t.includes("ROYALTY")) {
      return "bg-purple-500/10 text-purple-700 border border-purple-500/30 shadow-2xs";
    }
    return "bg-neutral-100 text-neutral-700 border border-neutral-200";
  };

  const filteredCompanies = useMemo(() => {
    return PARTICIPATING_COMPANIES.filter((company) => {
      // Filter by selected year
      if (company.year && company.year !== selectedYear) {
        return false;
      }

      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        company.name.toLowerCase().includes(q) ||
        company.ticker.toLowerCase().includes(q) ||
        company.location.toLowerCase().includes(q) ||
        company.type.toLowerCase().includes(q) ||
        company.commodities.toLowerCase().includes(q)
      );
    });
  }, [selectedYear, searchQuery]);

  return (
    <div className="w-full text-left font-sans">
      {/* ════════ MAP DIRECTORY IFRAME ════════ */}
      <div className="w-full mb-8 bg-white rounded-2xl overflow-hidden shadow-xl border border-neutral-200/90 p-2 relative z-10">
        <iframe
          src="https://mininghub.com/custom-map/the-mining-investment-event"
          width="100%"
          height="600px"
          frameBorder="0"
          allowFullScreen={true}
          allow="fullscreen"
          className="w-full rounded-xl"
          style={{ height: "600px", border: "0" }}
        ></iframe>
      </div>

      {/* ════════ TOOLBAR: YEAR SELECTOR & SEARCH ════════ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-md">
        {/* Year Selector */}
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6112F] animate-pulse shrink-0" />
          <label className="text-xs font-black tracking-widest uppercase text-neutral-500 whitespace-nowrap">
            Edition Filter:
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 px-4 text-xs sm:text-sm font-extrabold text-neutral-900 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 cursor-pointer shadow-2xs transition-all hover:border-[#C6112F]"
          >
            <option value={2026}>2026 Participating Companies</option>
            <option value={2025}>2025 Participating Companies</option>
            <option value={2024}>2024 Participating Companies</option>
            <option value={2023}>2023 Participating Companies</option>
          </select>
        </div>

        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-lg">
          <svg
            className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, ticker, location, commodity..."
            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 pl-11 pr-8 text-xs sm:text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-bold bg-neutral-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ════════ META STATS COUNTER ════════ */}
      <div className="flex items-center justify-between mb-4 px-1 text-xs sm:text-sm font-semibold text-neutral-600">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          Showing <strong className="text-neutral-900 font-extrabold">{filteredCompanies.length}</strong> of{" "}
          <strong className="text-neutral-900 font-extrabold">{PARTICIPATING_COMPANIES.length}</strong> companies
        </span>
        {searchQuery && (
          <span className="text-[#C6112F] font-extrabold text-xs">
            Filtered by: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* ════════ FULLY VISIBLE TABLE (NO SLIDER) ════════ */}
      <div className="w-full bg-white border border-neutral-200/90 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-[#0F1117] text-white text-[11px] sm:text-xs uppercase font-black tracking-widest border-b border-neutral-800 relative">
              <th className="py-4 px-3 sm:px-6 w-[34%] sm:w-[32%] text-neutral-200">
                Company Name
              </th>
              <th className="py-4 px-2 sm:px-4 w-[18%] sm:w-[18%] text-neutral-200">
                Ticker
              </th>
              <th className="py-4 px-2 sm:px-4 w-[15%] sm:w-[14%] text-neutral-200">
                Type
              </th>
              <th className="py-4 px-2 sm:px-4 w-[17%] sm:w-[18%] text-neutral-200">
                Location
              </th>
              <th className="py-4 px-3 sm:px-6 w-[16%] sm:w-[18%] text-neutral-200">
                Commodities
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs sm:text-sm font-medium">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company: CompanyItem, idx: number) => (
                <tr
                  key={idx}
                  className="even:bg-neutral-50/60 hover:bg-[#FCDDE1]/25 transition-all duration-200 group border-b border-neutral-100"
                >
                  {/* Column 1: Company Logo + Name */}
                  <td className="py-3.5 px-3 sm:px-6 align-middle">
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                      <div className="shrink-0 transform group-hover:scale-105 transition-transform duration-200">
                        <CompanyLogoImage name={company.name} email={company.email} />
                      </div>
                      <span className="text-neutral-900 font-extrabold text-xs sm:text-sm leading-snug group-hover:text-[#C6112F] transition-colors break-words">
                        {company.name}
                      </span>
                    </div>
                  </td>

                  {/* Column 2: Ticker */}
                  <td className="py-3.5 px-2 sm:px-4 align-middle">
                    <span className="inline-block bg-neutral-100/80 text-neutral-800 border border-neutral-200/80 px-2 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-bold group-hover:border-[#C6112F]/40 group-hover:text-[#C6112F] transition-colors break-words max-w-full">
                      {company.ticker}
                    </span>
                  </td>

                  {/* Column 3: Type */}
                  <td className="py-3.5 px-2 sm:px-4 align-middle">
                    <span
                      className={`inline-block text-[9px] sm:text-[10px] font-black tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase break-words ${getTypeBadgeStyle(
                        company.type
                      )}`}
                    >
                      {company.type}
                    </span>
                  </td>

                  {/* Column 4: Location */}
                  <td className="py-3.5 px-2 sm:px-4 align-middle text-neutral-700 font-semibold text-xs leading-relaxed break-words">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0 hidden sm:inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                        <circle cx="12" cy="11" r="2" />
                      </svg>
                      <span>{company.location}</span>
                    </div>
                  </td>

                  {/* Column 5: Commodities */}
                  <td className="py-3.5 px-3 sm:px-6 align-middle text-neutral-800 font-bold text-xs leading-relaxed break-words">
                    <div className="flex flex-wrap gap-1">
                      {company.commodities.split(",").map((comm, cIdx) => (
                        <span
                          key={cIdx}
                          className="bg-neutral-100 border border-neutral-200/90 text-neutral-700 text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap"
                        >
                          {comm.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-16 px-6 text-center text-neutral-500 font-bold bg-neutral-50/50"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="M20 20l-4-4" />
                    </svg>
                    <span>No companies match your search. Try resetting your search filter.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
