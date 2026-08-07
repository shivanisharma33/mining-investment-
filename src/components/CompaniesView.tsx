"use client";

import React, { useState, useMemo } from "react";
import CompanyLogoImage from "@/components/CompanyLogoImage";
import { PARTICIPATING_COMPANIES, CompanyItem } from "./companiesData";
import { useLanguage } from "@/context/LanguageContext";

interface CompaniesViewProps {
  initialYear?: number;
  /**
   * Companies for `apiYear`, supplied by the companies API for 2027. Past
   * editions omit these and keep using the bundled PARTICIPATING_COMPANIES.
   */
  apiCompanies?: CompanyItem[];
  apiYear?: number;
  apiLoading?: boolean;
  apiError?: string;
}





export default function CompaniesView({
  initialYear = 2026,
  apiCompanies,
  apiYear,
  apiLoading = false,
  apiError = "",
}: CompaniesViewProps) {
  const { t, lang } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isApiYear = apiYear !== undefined && selectedYear === apiYear;

  const getTypeBadgeStyle = (type: string) => {
    const t = type.toUpperCase();
    if (t.includes("PRODUCER")) {
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-2xs";
    } else if (t.includes("DEVELOPER")) {
      return "bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30 shadow-2xs";
    } else if (t.includes("EXPLORER") || t.includes("EXPL")) {
      return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-2xs";
    } else if (t.includes("ROYALTY")) {
      return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30 shadow-2xs";
    }
    return "bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 border border-neutral-200 dark:border-zinc-700";
  };

  // Every company in the selected edition, before the search box narrows it.
  const editionCompanies = useMemo(() => {
    if (isApiYear) return apiCompanies ?? [];
    return PARTICIPATING_COMPANIES.filter(
      (company) => !company.year || company.year === selectedYear
    );
  }, [isApiYear, apiCompanies, selectedYear]);

  const filteredCompanies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return editionCompanies;

    return editionCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(q) ||
        company.ticker.toLowerCase().includes(q) ||
        company.location.toLowerCase().includes(q) ||
        company.type.toLowerCase().includes(q) ||
        company.commodities.toLowerCase().includes(q)
    );
  }, [editionCompanies, searchQuery]);

  return (
    <div className="w-full text-left font-sans">
      {/* ════════ MAP DIRECTORY IFRAME ════════ */}
      <div className="w-full mb-8 bg-white dark:bg-[#18181b] rounded-2xl overflow-hidden shadow-xl border border-neutral-200/90 dark:border-zinc-800 p-2 relative z-10">
        <iframe
          src="https://mininghub.com/custom-map/the-mining-investment-event"
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen={true}
          allow="fullscreen"
          className="w-full rounded-xl h-[380px] xs:h-[450px] sm:h-[550px] md:h-[600px]"
          style={{ border: "0" }}
        ></iframe>
      </div>

      {/* ════════ TOOLBAR: YEAR SELECTOR & SEARCH ════════ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 bg-white dark:bg-[#18181b] p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-zinc-800 shadow-md">
        {/* Year Selector */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6112F] animate-pulse shrink-0" />
          <label className="text-xs font-black tracking-widest uppercase text-neutral-500 dark:text-zinc-400 whitespace-nowrap">
            {t("co-filter-label", "Edition Filter")}:
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-neutral-50 dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-xl py-2 sm:py-2.5 px-3.5 sm:px-4 text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 cursor-pointer shadow-2xs transition-all hover:border-[#C6112F] w-full xs:w-auto"
          >
            <option value={2027}>2027 {lang === "FR" ? "Sociétés Participantes" : "Participating Companies"}</option>
            <option value={2026}>2026 {lang === "FR" ? "Sociétés Participantes" : "Participating Companies"}</option>
            <option value={2025}>2025 {lang === "FR" ? "Sociétés Participantes" : "Participating Companies"}</option>
            <option value={2024}>2024 {lang === "FR" ? "Sociétés Participantes" : "Participating Companies"}</option>
            <option value={2023}>2023 {lang === "FR" ? "Sociétés Participantes" : "Participating Companies"}</option>
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
            placeholder={t("co-search-ph", "Search company, ticker, location, commodity...")}
            className="w-full bg-neutral-50 dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-xl py-2.5 pl-11 pr-8 text-xs sm:text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white text-xs font-bold bg-neutral-200 dark:bg-zinc-700 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ════════ META STATS COUNTER ════════ */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-1 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          {lang === "FR" ? (
            <>Affichage de <strong className="text-neutral-900 dark:text-white font-extrabold">{filteredCompanies.length}</strong> sur <strong className="text-neutral-900 dark:text-white font-extrabold">{editionCompanies.length}</strong> sociétés</>
          ) : (
            <>Showing <strong className="text-neutral-900 dark:text-white font-extrabold">{filteredCompanies.length}</strong> of <strong className="text-neutral-900 dark:text-white font-extrabold">{editionCompanies.length}</strong> companies</>
          )}
        </span>
        {searchQuery && (
          <span className="text-[#C6112F] font-extrabold text-xs">
            {lang === "FR" ? "Filtré par :" : "Filtered by:"} &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* ════════ FULLY VISIBLE TABLE (NO SLIDER) ════════ */}
      {/* ════════ DIRECTORY TABLE ════════ */}
      <div className="w-full bg-white dark:bg-[#18181b] rounded-2xl overflow-hidden shadow-xl border border-neutral-200/90 dark:border-zinc-800 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-[#0F1117] text-white text-[11px] sm:text-xs uppercase font-black tracking-widest border-b border-neutral-800 relative">
              <th className="py-4 px-4 sm:px-6 min-w-[220px] text-neutral-200">
                {t("co-col-name", "Company Name")}
              </th>
              <th className="py-4 px-3 sm:px-4 min-w-[130px] text-neutral-200">
                {t("co-col-ticker", "Ticker")}
              </th>
              <th className="py-4 px-3 sm:px-4 min-w-[120px] text-neutral-200">
                {t("co-col-type", "Type")}
              </th>
              <th className="py-4 px-3 sm:px-4 min-w-[140px] text-neutral-200">
                {t("co-col-location", "Location")}
              </th>
              <th className="py-4 px-4 sm:px-6 min-w-[150px] text-neutral-200">
                {t("co-col-commodities", "Commodities")}
              </th>
              {isApiYear && (
                <>
                  <th className="py-4 px-4 sm:px-6 min-w-[170px] text-neutral-200">
                    {t("co-col-industry", "Industry")}
                  </th>
                  <th className="py-4 px-4 sm:px-6 min-w-[150px] text-neutral-200 text-center">
                    {t("co-col-website", "Website")}
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800 text-xs sm:text-sm font-medium">
            {isApiYear && apiLoading ? (
              <tr>
                <td colSpan={isApiYear ? 7 : 5} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="w-7 h-7 rounded-full border-2 border-neutral-200 dark:border-zinc-700 border-t-[#C6112F] animate-spin" />
                    <span className="text-neutral-500 dark:text-zinc-400 font-bold">
                      {lang === "FR" ? "Chargement des sociétés…" : "Loading companies…"}
                    </span>
                  </div>
                </td>
              </tr>
            ) : isApiYear && apiError ? (
              <tr>
                <td colSpan={isApiYear ? 7 : 5} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-neutral-800 dark:text-white font-extrabold">
                      {lang === "FR"
                        ? "Impossible de charger les sociétés"
                        : "Unable to load the company directory"}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">{apiError}</span>
                  </div>
                </td>
              </tr>
            ) : filteredCompanies.length > 0 ? (
              filteredCompanies.map((company: CompanyItem, idx: number) => (
                <tr
                  key={company._id ?? idx}
                  className="even:bg-neutral-50/60 dark:even:bg-zinc-900/50 hover:bg-[#FCDDE1]/25 dark:hover:bg-[#C6112F]/15 transition-all duration-200 group border-b border-neutral-100 dark:border-zinc-800/80"
                >
                  {/* Column 1: Company Logo + Name */}
                  <td className="py-4 px-4 sm:px-6 align-middle">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="shrink-0 transform group-hover:scale-105 transition-transform duration-200">
                        <CompanyLogoImage name={company.name} email={company.email} logo={company.logo} />
                      </div>
                      <span className="text-neutral-900 dark:text-white font-extrabold text-xs sm:text-sm leading-snug group-hover:text-[#C6112F] dark:group-hover:text-[#ff4d6d] transition-colors">
                        {company.name}
                      </span>
                    </div>
                  </td>

                  {/* Column 2: Ticker */}
                  <td className="py-4 px-3 sm:px-4 align-middle">
                    <span className="inline-block bg-neutral-100/80 dark:bg-zinc-800/90 text-neutral-800 dark:text-zinc-200 border border-neutral-200/80 dark:border-zinc-700 px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-bold group-hover:border-[#C6112F]/40 group-hover:text-[#C6112F] dark:group-hover:text-[#ff4d6d] transition-colors whitespace-nowrap">
                      {company.ticker}
                    </span>
                  </td>

                  {/* Column 3: Type */}
                  <td className="py-4 px-3 sm:px-4 align-middle">
                    <span
                      className={`inline-block text-[9px] sm:text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full uppercase whitespace-nowrap ${getTypeBadgeStyle(
                        company.type
                      )}`}
                    >
                      {company.type}
                    </span>
                  </td>

                  {/* Column 4: Location */}
                  <td className="py-4 px-3 sm:px-4 align-middle text-neutral-700 dark:text-zinc-300 font-semibold text-xs leading-relaxed whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                        <circle cx="12" cy="11" r="2" />
                      </svg>
                      <span>{company.location}</span>
                    </div>
                  </td>

                  {/* Column 5: Commodities */}
                  <td className="py-4 px-4 sm:px-6 align-middle text-neutral-800 dark:text-zinc-200 font-bold text-xs leading-relaxed">
                    <div className="flex flex-wrap gap-1">
                      {company.commodities.split(",").map((comm, cIdx) => (
                        <span
                          key={cIdx}
                          className="bg-neutral-100 dark:bg-zinc-800 border border-neutral-200/90 dark:border-zinc-700 text-neutral-700 dark:text-zinc-200 text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap"
                        >
                          {comm.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  {isApiYear && (
                    <>
                      <td className="py-4 px-4 sm:px-6 align-middle text-neutral-700 dark:text-zinc-300 text-xs font-semibold leading-normal">
                        {company.industry || "—"}
                      </td>
                      <td className="py-4 px-4 sm:px-6 align-middle text-center whitespace-nowrap">
                        {company.website ? (
                          <a
                            href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 bg-[#C6112F] hover:bg-[#a80d26] active:scale-95 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0 min-w-max cursor-pointer"
                          >
                            <span className="whitespace-nowrap inline-block shrink-0">Visit Website</span>
                            <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        ) : (
                          <span className="text-neutral-400 dark:text-zinc-500 font-medium">—</span>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isApiYear ? 7 : 5} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-8 h-8 text-neutral-400 dark:text-zinc-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="M20 20l-4-4" />
                    </svg>
                    <span className="text-neutral-600 dark:text-zinc-400">
                      {searchQuery.trim()
                        ? lang === "FR"
                          ? "Aucune société ne correspond à votre recherche. Essayez de réinitialiser le filtre."
                          : "No companies match your search. Try resetting your search filter."
                        : lang === "FR"
                          ? `Aucune société n'a encore été publiée pour l'édition ${selectedYear}.`
                          : `No companies have been published for the ${selectedYear} edition yet.`}
                    </span>
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

