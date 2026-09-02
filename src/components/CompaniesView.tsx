"use client";

import React, { useState, useMemo } from "react";
import CompanyLogoImage from "@/components/CompanyLogoImage";
import { PARTICIPATING_COMPANIES, CompanyItem } from "./companiesData";
import type { EventEdition } from "@/lib/companiesApi";
import { useLanguage } from "@/context/LanguageContext";

/** Editions that only exist in the bundled dataset, newest first. */
const BUNDLED_YEARS = [2026, 2025, 2024, 2023];

interface CompaniesViewProps {
  initialYear?: number;
  /**
   * Companies from the API. Editions with no Strapi entry fall back to the
   * bundled PARTICIPATING_COMPANIES.
   */
  apiCompanies?: CompanyItem[];
  /** Single API-backed year. Superseded by `editions` when that is supplied. */
  apiYear?: number;
  /** Event editions from Strapi — each one becomes a filter option. */
  editions?: EventEdition[];
  apiLoading?: boolean;
  apiError?: string;
  showMap?: boolean;
}

type CompanyTypeFilter = "ALL" | "PRODUCER" | "DEVELOPER" | "EXPLORER" | "ROYALTY";

export default function CompaniesView({
  initialYear = 2026,
  apiCompanies,
  apiYear,
  editions,
  apiLoading = false,
  apiError = "",
  showMap,
}: CompaniesViewProps) {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<CompanyTypeFilter>("ALL");

  // Years Strapi answers for; everything else comes from the bundled dataset.
  const apiYears = useMemo(() => {
    if (editions?.length) return editions.map((edition) => edition.year);
    return apiYear !== undefined ? [apiYear] : [];
  }, [editions, apiYear]);

  const editionOptions = useMemo(() => {
    const years = new Set([...apiYears, ...BUNDLED_YEARS, selectedYear]);
    return [...years].sort((a, b) => b - a);
  }, [apiYears, selectedYear]);

  const isApiYear = apiYears.includes(selectedYear);
  const shouldShowMap = showMap !== undefined ? showMap : selectedYear !== 2027;

  const getTypeBadgeStyle = (type: string) => {
    const upper = (type || "").toUpperCase();
    if (upper.includes("PRODUCER")) {
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30";
    } else if (upper.includes("DEVELOPER")) {
      return "bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30";
    } else if (upper.includes("EXPLORER") || upper.includes("EXPL")) {
      return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30";
    } else if (upper.includes("ROYALTY")) {
      return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30";
    }
    return "bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 border border-neutral-200 dark:border-zinc-700";
  };

  // Every company in the selected edition, before the search box narrows it.
  const editionCompanies = useMemo(() => {
    if (isApiYear) {
      const items = apiCompanies ?? [];
      return editions?.length
        ? items.filter((company) => !company.year || company.year === selectedYear)
        : items;
    }

    return PARTICIPATING_COMPANIES.filter(
      (company) => !company.year || company.year === selectedYear
    );
  }, [isApiYear, apiCompanies, editions, selectedYear]);

  const filteredCompanies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return editionCompanies.filter((company) => {
      // Type Filter
      if (selectedType !== "ALL") {
        const typeUpper = (company.type || "").toUpperCase();
        if (!typeUpper.includes(selectedType)) return false;
      }

      // Search Query Filter
      if (!q) return true;
      return (
        (company.name && company.name.toLowerCase().includes(q)) ||
        (company.ticker && company.ticker.toLowerCase().includes(q)) ||
        (company.location && company.location.toLowerCase().includes(q)) ||
        (company.type && company.type.toLowerCase().includes(q)) ||
        (company.commodities && company.commodities.toLowerCase().includes(q))
      );
    });
  }, [editionCompanies, searchQuery, selectedType]);

  const typeFilterOptions: { id: CompanyTypeFilter; label: string }[] = [
    { id: "ALL", label: isFr ? "Tous les types" : "All Types" },
    { id: "PRODUCER", label: isFr ? "Producteurs" : "Producers" },
    { id: "DEVELOPER", label: isFr ? "Développeurs" : "Developers" },
    { id: "EXPLORER", label: isFr ? "Explorateurs" : "Explorers" },
    { id: "ROYALTY", label: isFr ? "Redevances" : "Royalties" },
  ];

  const hasActiveFilters = Boolean(searchQuery.trim() || selectedType !== "ALL");

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("ALL");
  };

  return (
    <div className="w-full text-left font-sans">
      {/* ════════ MAP DIRECTORY IFRAME (Optional) ════════ */}
      {shouldShowMap && (
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
          />
        </div>
      )}

      {/* ════════ SEARCH & FILTER TOOLBAR ════════ */}
      <div className="bg-neutral-50/90 dark:bg-zinc-900/60 p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-zinc-800 mb-6 shadow-2xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          {/* Modern Search Bar */}
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 text-neutral-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M20 20l-4-4" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("co-search-ph", isFr ? "Rechercher par société, ticker, localisation, minerai…" : "Search by company name, ticker, commodity, location…")}
              className="w-full bg-white dark:bg-zinc-800/90 border border-neutral-300/90 dark:border-zinc-700 rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/15 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white text-xs font-bold bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-full w-5 h-5 flex items-center justify-center transition-colors cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Edition / Year Dropdown Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value));
                  resetFilters();
                }}
                className="w-full sm:w-auto bg-white dark:bg-zinc-800/90 border border-neutral-300/90 dark:border-zinc-700 rounded-xl py-2.5 px-3.5 pr-8 text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/15 cursor-pointer shadow-2xs transition-all hover:border-[#C6112F] appearance-none"
              >
                {editionOptions.map((year) => (
                  <option key={year} value={year}>
                    {year} {isFr ? "Édition" : "Edition"}
                  </option>
                ))}
              </select>
              <svg
                className="w-4 h-4 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-[#C6112F] hover:bg-[#C6112F]/10 border border-[#C6112F]/30 transition-colors whitespace-nowrap cursor-pointer"
              >
                {isFr ? "Réinitialiser" : "Reset"}
              </button>
            )}
          </div>
        </div>

        {/* Quick Type Filter Chips */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-3.5 mt-3.5 border-t border-neutral-200/70 dark:border-zinc-800 no-scrollbar">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mr-1 shrink-0">
            {isFr ? "Filtrer :" : "Filter:"}
          </span>
          {typeFilterOptions.map((opt) => {
            const isSelected = selectedType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedType(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#C6112F] text-white shadow-xs"
                    : "bg-white dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 border border-neutral-200/90 dark:border-zinc-700 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ════════ DIRECTORY HEADER META COUNTER ════════ */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2.5">
          {isApiYear && apiLoading ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full border border-neutral-400 border-t-[#C6112F] animate-spin" />
              <span>{isFr ? "Chargement des sociétés participantes…" : "Loading participating companies…"}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {filteredCompanies.length}{" "}
                {isFr ? "Sociétés confirmées" : "Confirmed Companies"}
              </span>
            </span>
          )}
          {!apiLoading && hasActiveFilters && (
            <span className="text-xs font-semibold text-neutral-500 dark:text-zinc-400">
              {isFr
                ? `(sur un total de ${editionCompanies.length})`
                : `(out of ${editionCompanies.length} total)`}
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium">
              {isFr ? "Filtres actifs" : "Active filters applied"}
            </span>
            <button
              onClick={resetFilters}
              className="text-xs font-extrabold text-[#C6112F] hover:underline cursor-pointer"
            >
              {isFr ? "Effacer tout" : "Clear all"}
            </button>
          </div>
        )}
      </div>

      {/* ════════ DESKTOP / TABLET DIRECTORY TABLE ════════ */}
      <div className="hidden sm:block w-full bg-white dark:bg-[#141824] rounded-2xl overflow-hidden shadow-md border border-neutral-200/90 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#0f1117] text-white text-[11px] uppercase font-black tracking-wider border-b border-neutral-800">
                <th className="py-3.5 px-5 min-w-[260px] text-neutral-200">
                  {t("co-col-name", isFr ? "Société" : "Company Name")}
                </th>
                <th className="py-3.5 px-4 min-w-[130px] text-neutral-200">
                  {t("co-col-ticker", isFr ? "Symbole" : "Ticker")}
                </th>
                <th className="py-3.5 px-4 min-w-[120px] text-neutral-200">
                  {t("co-col-type", isFr ? "Type" : "Type")}
                </th>
                <th className="py-3.5 px-4 min-w-[140px] text-neutral-200">
                  {t("co-col-location", isFr ? "Localisation" : "Location")}
                </th>
                <th className="py-3.5 px-5 min-w-[160px] text-neutral-200">
                  {t("co-col-commodities", isFr ? "Substances" : "Commodities")}
                </th>
                {isApiYear && (
                  <th className="py-3.5 px-4 min-w-[130px] text-neutral-200 text-center">
                    {t("co-col-website", isFr ? "Site Web" : "Website")}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800 text-xs sm:text-sm font-medium">
              {isApiYear && apiLoading ? (
                <tr>
                  <td colSpan={isApiYear ? 6 : 5} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <span className="w-7 h-7 rounded-full border-2 border-neutral-200 dark:border-zinc-700 border-t-[#C6112F] animate-spin" />
                      <span className="text-neutral-600 dark:text-zinc-300 font-bold text-sm">
                        {isFr ? "Chargement des entreprises participantes…" : "Loading participating companies…"}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : isApiYear && apiError ? (
                <tr>
                  <td colSpan={isApiYear ? 6 : 5} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-neutral-800 dark:text-white font-extrabold text-sm">
                        {isFr
                          ? "Impossible de charger les entreprises participantes. Veuillez réessayer."
                          : "Unable to load participating companies. Please try again."}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">{apiError}</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCompanies.length > 0 ? (
                filteredCompanies.map((company: CompanyItem, idx: number) => (
                  <tr
                    key={company._id ?? idx}
                    className="even:bg-neutral-50/50 dark:even:bg-zinc-900/40 hover:bg-[#FCDDE1]/25 dark:hover:bg-[#C6112F]/15 transition-colors duration-150 group border-b border-neutral-100 dark:border-zinc-800/80"
                  >
                    {/* Column 1: Company Logo + Name */}
                    <td className="py-3.5 px-5 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div className="shrink-0">
                          <CompanyLogoImage name={company.name} email={company.email} logo={company.logo} />
                        </div>
                        <span className="text-neutral-900 dark:text-white font-extrabold text-xs sm:text-[13px] leading-snug group-hover:text-[#C6112F] dark:group-hover:text-[#ff4d6d] transition-colors">
                          {company.name}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Ticker */}
                    <td className="py-3.5 px-4 align-middle">
                      {company.ticker ? (
                        <span className="inline-block bg-neutral-100/90 dark:bg-zinc-800/90 text-neutral-800 dark:text-zinc-200 border border-neutral-200/90 dark:border-zinc-700 px-2 py-1 rounded-md font-mono text-[11px] font-bold group-hover:border-[#C6112F]/40 group-hover:text-[#C6112F] dark:group-hover:text-[#ff4d6d] transition-colors whitespace-nowrap">
                          {company.ticker}
                        </span>
                      ) : (
                        <span className="text-neutral-400 font-mono text-xs">—</span>
                      )}
                    </td>

                    {/* Column 3: Type */}
                    <td className="py-3.5 px-4 align-middle">
                      {company.type ? (
                        <span
                          className={`inline-block text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full uppercase whitespace-nowrap ${getTypeBadgeStyle(
                            company.type
                          )}`}
                        >
                          {company.type}
                        </span>
                      ) : (
                        <span className="text-neutral-400 text-xs">—</span>
                      )}
                    </td>

                    {/* Column 4: Location */}
                    <td className="py-3.5 px-4 align-middle text-neutral-700 dark:text-zinc-300 font-medium text-xs leading-relaxed whitespace-nowrap">
                      {company.location ? (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-zinc-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                            <circle cx="12" cy="11" r="2" />
                          </svg>
                          <span>{company.location}</span>
                        </div>
                      ) : (
                        <span className="text-neutral-400">—</span>
                      )}
                    </td>

                    {/* Column 5: Commodities */}
                    <td className="py-3.5 px-5 align-middle text-neutral-800 dark:text-zinc-200 font-bold text-xs leading-relaxed">
                      {company.commodities ? (
                        <div className="flex flex-wrap gap-1">
                          {company.commodities.split(",").map((comm, cIdx) => (
                            <span
                              key={cIdx}
                              className="bg-neutral-100 dark:bg-zinc-800 border border-neutral-200/90 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap"
                            >
                              {comm.trim()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-neutral-400 font-normal">—</span>
                      )}
                    </td>

                    {/* Column 6: Website Link */}
                    {isApiYear && (
                      <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap">
                        {company.website ? (
                          <a
                            href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-2xs hover:shadow-xs whitespace-nowrap shrink-0 min-w-max cursor-pointer"
                          >
                            <span>{isFr ? "Visiter" : "Visit"}</span>
                            <svg className="w-3 h-3 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        ) : (
                          <span className="text-neutral-400 dark:text-zinc-500 font-medium">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isApiYear ? 6 : 5} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-md mx-auto">
                      <svg className="w-9 h-9 text-neutral-300 dark:text-zinc-600 mb-1" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6.5" />
                        <path d="M20 20l-4-4" />
                      </svg>
                      <p className="text-sm font-extrabold text-neutral-800 dark:text-white">
                        {isFr ? "Aucune entreprise participante trouvée" : "No participating companies found"}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-zinc-400 leading-relaxed">
                        {searchQuery.trim()
                          ? isFr
                            ? "Aucune entreprise ne correspond à vos critères de recherche. Essayez de réinitialiser le filtre."
                            : "No companies match your search criteria. Try adjusting your search query or filters."
                          : isFr
                            ? `Aucune entreprise n'a encore été publiée pour l'édition ${selectedYear}.`
                            : `No participating companies found.`}
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={resetFilters}
                          className="mt-3 px-4 py-2 bg-[#C6112F] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#a80d26] transition-colors cursor-pointer"
                        >
                          {isFr ? "Réinitialiser les filtres" : "Reset Filters"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ════════ MOBILE RESPONSIVE CARD VIEW (< 640px) ════════ */}
      <div className="block sm:hidden space-y-3">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company: CompanyItem, idx: number) => (
            <div
              key={company._id ?? idx}
              className="bg-white dark:bg-[#141824] rounded-xl border border-neutral-200/90 dark:border-zinc-800 p-4 shadow-2xs hover:border-[#C6112F]/40 transition-colors"
            >
              <div className="flex items-start gap-3 mb-2.5">
                <div className="shrink-0 mt-0.5">
                  <CompanyLogoImage name={company.name} email={company.email} logo={company.logo} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white leading-tight mb-1">
                    {company.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {company.ticker && (
                      <span className="inline-block bg-neutral-100 text-neutral-800 border border-neutral-200 px-1.5 py-0.5 rounded font-mono text-[10px] font-bold">
                        {company.ticker}
                      </span>
                    )}
                    {company.type && (
                      <span
                        className={`inline-block text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-full uppercase ${getTypeBadgeStyle(
                          company.type
                        )}`}
                      >
                        {company.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                {company.location && (
                  <div className="flex items-center gap-1 text-neutral-600 dark:text-zinc-400 font-medium">
                    <svg className="w-3 h-3 text-neutral-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                      <circle cx="12" cy="11" r="2" />
                    </svg>
                    <span>{company.location}</span>
                  </div>
                )}
                {company.commodities && (
                  <div className="flex flex-wrap gap-1">
                    {company.commodities.split(",").slice(0, 3).map((comm, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-neutral-100 text-neutral-700 text-[10px] px-1.5 py-0.5 rounded font-semibold"
                      >
                        {comm.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-4 bg-white dark:bg-[#141824] rounded-2xl border border-neutral-200 dark:border-zinc-800">
            <p className="text-xs font-bold text-neutral-700 dark:text-zinc-300 mb-2">
              {isFr ? "Aucune société correspondante" : "No companies found"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 bg-[#C6112F] text-white text-xs font-bold rounded-lg"
              >
                {isFr ? "Réinitialiser" : "Reset"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

