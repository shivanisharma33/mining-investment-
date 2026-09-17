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
export type SortField = "name" | "ticker" | "type" | "location" | "commodities";
export type SortDirection = "asc" | "desc";

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
  const [selectedCommodity, setSelectedCommodity] = useState<string>("ALL");
  const [selectedExchange, setSelectedExchange] = useState<string>("ALL");
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isMapActive, setIsMapActive] = useState<boolean>(false);

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

  // Extract all distinct commodities with counts dynamically from active edition
  const availableCommodities = useMemo(() => {
    const counts: Record<string, number> = {};
    editionCompanies.forEach((co) => {
      if (!co.commodities) return;
      const parts = co.commodities
        .split(/[,;/]/)
        .map((s) => s.trim())
        .filter(Boolean);
      parts.forEach((p) => {
        const clean = p.replace(/&#x27;s?/g, "").trim();
        if (!clean) return;
        counts[clean] = (counts[clean] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [editionCompanies]);

  // Commodity matching helper
  const matchesCommodity = (companyCommodities: string | undefined, filter: string) => {
    if (filter === "ALL") return true;
    if (!companyCommodities) return false;
    const raw = companyCommodities.toLowerCase();

    if (filter === "CRITICAL") {
      return (
        raw.includes("ree") ||
        raw.includes("critical") ||
        raw.includes("rare earth") ||
        raw.includes("battery") ||
        raw.includes("pge") ||
        raw.includes("pgm") ||
        /\b(sc|nb|ga|ta|v|ti|co|c)\b/.test(raw)
      );
    }

    if (filter === "Au") {
      return /\bau\b/.test(raw) || raw.includes("gold");
    }
    if (filter === "Cu") {
      return /\bcu\b/.test(raw) || raw.includes("copper");
    }
    if (filter === "Ag") {
      return /\bag\b/.test(raw) || raw.includes("silver");
    }
    if (filter === "Li") {
      return /\bli\b/.test(raw) || raw.includes("lithium");
    }
    if (filter === "U") {
      return /\bu\b/.test(raw) || /\bu308\b/.test(raw) || raw.includes("uranium");
    }
    if (filter === "Ni") {
      return /\bni\b/.test(raw) || raw.includes("nickel");
    }
    if (filter === "Zn") {
      return /\bzn\b/.test(raw) || raw.includes("zinc");
    }

    const normalizedFilter = filter.toLowerCase();
    const tokens = raw.split(/[,;/]/).map((s) => s.trim());
    return tokens.some((t) => t === normalizedFilter || t.includes(normalizedFilter));
  };

  // Stock Exchange / Market matching helper
  const matchesExchange = (ticker: string | undefined, filter: string) => {
    if (filter === "ALL") return true;
    if (!ticker) return false;
    const up = ticker.toUpperCase();

    if (filter === "TSX-V") {
      return up.includes("TSX-V") || up.includes("TSXV") || up.includes("TSX.V");
    }
    if (filter === "TSX") {
      const isTSXV = up.includes("TSX-V") || up.includes("TSXV") || up.includes("TSX.V");
      return !isTSXV && (up.includes("TSX:") || up.startsWith("TSX ") || up.includes("TSX"));
    }
    if (filter === "CSE") {
      return up.includes("CSE");
    }
    if (filter === "OTCQX_OTCQB") {
      return up.includes("OTCQX") || up.includes("OTCQB") || up.includes("OTC");
    }
    if (filter === "NYSE") {
      return up.includes("NYSE");
    }
    if (filter === "ASX") {
      return up.includes("ASX");
    }
    return true;
  };

  // Region / Location matching helper
  const matchesLocation = (location: string | undefined, filter: string) => {
    if (filter === "ALL") return true;
    if (!location) return false;
    const up = location.toUpperCase();

    if (filter === "CANADA") {
      return up.includes("CANADA") || /\b(QC|ON|BC|AB|SK|MB|NL|NB|NS|YT|NT|NU)\b/.test(up);
    }
    if (filter === "USA") {
      return up.includes("USA") || up.includes("UNITED STATES") || /\b(NV|AZ|CA|CO|ID|UT|WY|NM|AK|TX)\b/.test(up);
    }
    if (filter === "AUSTRALIA") {
      return up.includes("AUSTRALIA") || /\b(WA|NSW|QLD|SA|TAS|VIC)\b/.test(up);
    }
    if (filter === "LATAM") {
      return (
        up.includes("MEXICO") ||
        up.includes("CHILE") ||
        up.includes("PERU") ||
        up.includes("ARGENTINA") ||
        up.includes("BRAZIL") ||
        up.includes("COLOMBIA") ||
        up.includes("ECUADOR") ||
        up.includes("BOLIVIA") ||
        up.includes("LATAM")
      );
    }
    if (filter === "GLOBAL") {
      const isNorthAmerica = up.includes("CANADA") || up.includes("USA");
      return !isNorthAmerica;
    }
    return true;
  };

  const filteredCompanies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return editionCompanies.filter((company) => {
      // 1. Type Filter
      if (selectedType !== "ALL") {
        const typeUpper = (company.type || "").toUpperCase();
        if (!typeUpper.includes(selectedType)) return false;
      }

      // 2. Commodity Filter
      if (!matchesCommodity(company.commodities, selectedCommodity)) {
        return false;
      }

      // 3. Stock Exchange Filter
      if (!matchesExchange(company.ticker, selectedExchange)) {
        return false;
      }

      // 4. Location / Region Filter
      if (!matchesLocation(company.location, selectedLocation)) {
        return false;
      }

      // 5. Search Query Filter
      if (!q) return true;
      return (
        (company.name && company.name.toLowerCase().includes(q)) ||
        (company.ticker && company.ticker.toLowerCase().includes(q)) ||
        (company.location && company.location.toLowerCase().includes(q)) ||
        (company.type && company.type.toLowerCase().includes(q)) ||
        (company.commodities && company.commodities.toLowerCase().includes(q))
      );
    });
  }, [
    editionCompanies,
    searchQuery,
    selectedType,
    selectedCommodity,
    selectedExchange,
    selectedLocation,
  ]);

  // Excel-style column sorting with empty-values handling and tie-breaker
  const sortedCompanies = useMemo(() => {
    if (!sortField) return filteredCompanies;

    return [...filteredCompanies].sort((a, b) => {
      const rawA = a[sortField];
      const rawB = b[sortField];

      const valA = rawA ? String(rawA).trim() : "";
      const valB = rawB ? String(rawB).trim() : "";

      // Push blank/empty values to the bottom regardless of sort direction
      if (!valA && valB) return 1;
      if (valA && !valB) return -1;
      if (!valA && !valB) return 0;

      const cmp = valA.localeCompare(valB, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      if (cmp !== 0) {
        return sortDirection === "asc" ? cmp : -cmp;
      }

      // Secondary tie-breaker by company name
      const nameA = a.name ? String(a.name).trim() : "";
      const nameB = b.name ? String(b.name).trim() : "";
      return nameA.localeCompare(nameB, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });
  }, [filteredCompanies, sortField, sortDirection]);

  // Click handler for Excel-like column header sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        // Third click clears sort back to original natural order
        setSortField(null);
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const clearSort = () => {
    setSortField(null);
    setSortDirection("asc");
  };

  const typeFilterOptions: { id: CompanyTypeFilter; label: string }[] = [
    { id: "ALL", label: isFr ? "Tous les types" : "All Types" },
    { id: "PRODUCER", label: isFr ? "Producteurs" : "Producers" },
    { id: "DEVELOPER", label: isFr ? "Développeurs" : "Developers" },
    { id: "EXPLORER", label: isFr ? "Explorateurs" : "Explorers" },
    { id: "ROYALTY", label: isFr ? "Redevances" : "Royalties" },
  ];

  const topCommodityOptions = [
    { id: "ALL", label: isFr ? "Toutes" : "All", full: isFr ? "Toutes les substances" : "All Commodities" },
    { id: "Au", label: "Gold (Au)", full: isFr ? "Or (Au)" : "Gold (Au)" },
    { id: "Cu", label: "Copper (Cu)", full: isFr ? "Cuivre (Cu)" : "Copper (Cu)" },
    { id: "Ag", label: "Silver (Ag)", full: isFr ? "Argent (Ag)" : "Silver (Ag)" },
    { id: "Li", label: "Lithium (Li)", full: "Lithium (Li)" },
    { id: "U", label: "Uranium (U)", full: "Uranium (U)" },
    { id: "Ni", label: "Nickel (Ni)", full: "Nickel (Ni)" },
    { id: "Zn", label: "Zinc (Zn)", full: "Zinc (Zn)" },
    { id: "CRITICAL", label: isFr ? "Critiques / T.R." : "Critical / REE", full: isFr ? "Minéraux critiques & Terres rares" : "Critical Minerals & REEs" },
  ];

  const exchangeOptions = [
    { id: "ALL", label: isFr ? "Bourse : Toutes" : "Exchange: All" },
    { id: "TSX-V", label: "TSX-V" },
    { id: "TSX", label: "TSX" },
    { id: "CSE", label: "CSE" },
    { id: "OTCQX_OTCQB", label: "OTCQX / OTCQB" },
    { id: "NYSE", label: "NYSE / NYSE-A" },
    { id: "ASX", label: "ASX" },
  ];

  const regionOptions = [
    { id: "ALL", label: isFr ? "Région : Toutes" : "Region: All" },
    { id: "CANADA", label: isFr ? "Canada" : "Canada" },
    { id: "USA", label: isFr ? "États-Unis (USA)" : "United States (USA)" },
    { id: "AUSTRALIA", label: isFr ? "Australie" : "Australia" },
    { id: "LATAM", label: isFr ? "Amérique latine" : "Latin America" },
    { id: "GLOBAL", label: isFr ? "International" : "Global / Other" },
  ];

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
    selectedType !== "ALL" ||
    selectedCommodity !== "ALL" ||
    selectedExchange !== "ALL" ||
    selectedLocation !== "ALL" ||
    sortField !== null
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("ALL");
    setSelectedCommodity("ALL");
    setSelectedExchange("ALL");
    setSelectedLocation("ALL");
    setSortField(null);
    setSortDirection("asc");
  };

  // Check if active commodity is one of the top pills or from the dropdown
  const isCustomCommodity = Boolean(
    selectedCommodity !== "ALL" && !topCommodityOptions.some((o) => o.id === selectedCommodity)
  );

  return (
    <div className="w-full text-left font-sans">
      {/* ════════ MAP DIRECTORY IFRAME (Optional) ════════ */}
      {shouldShowMap && (
        <div
          className="w-full mb-8 bg-white dark:bg-[#18181b] rounded-2xl overflow-hidden shadow-xl border border-neutral-200/90 dark:border-zinc-800 p-2 relative z-10 group"
          onMouseLeave={() => setIsMapActive(false)}
        >
          {/* Status Badge & Unlock Button */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            {!isMapActive ? (
              <button
                type="button"
                onClick={() => setIsMapActive(true)}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-900/85 hover:bg-neutral-900 text-white backdrop-blur-md text-xs font-extrabold tracking-wide uppercase shadow-lg border border-white/20 transition-all transform hover:scale-105 flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{isFr ? "Cliquer pour interagir" : "Click to interact with map"}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsMapActive(false)}
                className="px-3.5 py-1.5 rounded-xl bg-[#C6112F] text-white text-xs font-extrabold tracking-wide uppercase shadow-lg border border-white/20 transition-all transform hover:scale-105 flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>{isFr ? "Verrouiller le défilement" : "Lock map scroll"}</span>
              </button>
            )}
          </div>

          {/* Click Overlay to activate if not active */}
          {!isMapActive && (
            <div
              onClick={() => setIsMapActive(true)}
              className="absolute inset-0 z-10 cursor-pointer bg-transparent"
              title={isFr ? "Cliquer pour interagir avec la carte" : "Click to interact with map"}
            />
          )}

          <iframe
            src="https://mininghub.com/custom-map/the-mining-investment-event"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen={true}
            allow="fullscreen"
            className={`w-full rounded-xl h-[380px] xs:h-[450px] sm:h-[550px] md:h-[600px] transition-all ${
              isMapActive ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{ border: "0" }}
          />
        </div>
      )}

      {/* ════════ SEARCH & FILTER TOOLBAR ════════ */}
      <div className="bg-neutral-50/90 dark:bg-zinc-900/60 p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-zinc-800 mb-6 shadow-2xs space-y-3.5">
        {/* Row 1: Search Bar + Sort Dropdown + Exchange Dropdown + Region Dropdown + Edition Dropdown */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-3">
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
              placeholder={t("co-search-ph", isFr ? "Rechercher par société, symbole, minerai, localisation…" : "Search by company name, ticker, commodity, location…")}
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

          {/* Quick Selectors Cluster */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            {/* Excel-style Sort Dropdown Selector */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={sortField ? `${sortField}-${sortDirection}` : "default"}
                onChange={(e) => {
                  if (e.target.value === "default") {
                    clearSort();
                  } else {
                    const [field, dir] = e.target.value.split("-") as [SortField, SortDirection];
                    setSortField(field);
                    setSortDirection(dir);
                  }
                }}
                aria-label={isFr ? "Trier la liste des sociétés" : "Sort company directory"}
                className={`w-full sm:w-auto bg-white dark:bg-zinc-800/90 border rounded-xl py-2.5 px-3 pr-7 text-xs sm:text-[13px] font-extrabold focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/15 cursor-pointer shadow-2xs transition-all appearance-none ${
                  sortField
                    ? "border-[#C6112F] text-[#C6112F] dark:text-[#ff4d6d]"
                    : "border-neutral-300/90 dark:border-zinc-700 text-neutral-900 dark:text-white hover:border-[#C6112F]"
                }`}
              >
                <option value="default">{isFr ? "Trier : Par défaut" : "Sort: Default Order"}</option>
                <option value="ticker-asc">{isFr ? "Symbole / Ticker (A → Z)" : "Ticker Symbol (A → Z)"}</option>
                <option value="ticker-desc">{isFr ? "Symbole / Ticker (Z → A)" : "Ticker Symbol (Z → A)"}</option>
                <option value="commodities-asc">{isFr ? "Substances (A → Z)" : "Commodity (A → Z)"}</option>
                <option value="commodities-desc">{isFr ? "Substances (Z → A)" : "Commodity (Z → A)"}</option>
                <option value="name-asc">{isFr ? "Société (A → Z)" : "Company Name (A → Z)"}</option>
                <option value="name-desc">{isFr ? "Société (Z → A)" : "Company Name (Z → A)"}</option>
                <option value="type-asc">{isFr ? "Type (A → Z)" : "Type (A → Z)"}</option>
                <option value="type-desc">{isFr ? "Type (Z → A)" : "Type (Z → A)"}</option>
                <option value="location-asc">{isFr ? "Localisation (A → Z)" : "Location (A → Z)"}</option>
                <option value="location-desc">{isFr ? "Localisation (Z → A)" : "Location (Z → A)"}</option>
              </select>
              <svg
                className="w-3.5 h-3.5 text-neutral-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
              </svg>
            </div>

            {/* Stock Exchange Filter Dropdown */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
                aria-label={isFr ? "Filtrer par bourse" : "Filter by stock exchange"}
                className={`w-full sm:w-auto bg-white dark:bg-zinc-800/90 border rounded-xl py-2.5 px-3 pr-7 text-xs sm:text-[13px] font-extrabold focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/15 cursor-pointer shadow-2xs transition-all appearance-none ${
                  selectedExchange !== "ALL"
                    ? "border-[#C6112F] text-[#C6112F] dark:text-[#ff4d6d]"
                    : "border-neutral-300/90 dark:border-zinc-700 text-neutral-900 dark:text-white hover:border-[#C6112F]"
                }`}
              >
                {exchangeOptions.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.label}
                  </option>
                ))}
              </select>
              <svg
                className="w-3.5 h-3.5 text-neutral-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* Region Filter Dropdown */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label={isFr ? "Filtrer par région" : "Filter by region"}
                className={`w-full sm:w-auto bg-white dark:bg-zinc-800/90 border rounded-xl py-2.5 px-3 pr-7 text-xs sm:text-[13px] font-extrabold focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/15 cursor-pointer shadow-2xs transition-all appearance-none ${
                  selectedLocation !== "ALL"
                    ? "border-[#C6112F] text-[#C6112F] dark:text-[#ff4d6d]"
                    : "border-neutral-300/90 dark:border-zinc-700 text-neutral-900 dark:text-white hover:border-[#C6112F]"
                }`}
              >
                {regionOptions.map((rg) => (
                  <option key={rg.id} value={rg.id}>
                    {rg.label}
                  </option>
                ))}
              </select>
              <svg
                className="w-3.5 h-3.5 text-neutral-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* Edition / Year Dropdown Selector */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value));
                  resetFilters();
                }}
                className="w-full sm:w-auto bg-white dark:bg-zinc-800/90 border border-neutral-300/90 dark:border-zinc-700 rounded-xl py-2.5 px-3 pr-7 text-xs sm:text-[13px] font-extrabold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/15 cursor-pointer shadow-2xs transition-all hover:border-[#C6112F] appearance-none"
              >
                {editionOptions.map((year) => (
                  <option key={year} value={year}>
                    {year} {isFr ? "Édition" : "Edition"}
                  </option>
                ))}
              </select>
              <svg
                className="w-3.5 h-3.5 text-neutral-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
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
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-[#C6112F] hover:bg-[#C6112F]/10 border border-[#C6112F]/30 transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                {isFr ? "Réinitialiser" : "Reset"}
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Commodity Filter Pills + All Commodities Dropdown */}
        <div className="pt-2.5 border-t border-neutral-200/70 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
            </svg>
            <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
              {isFr ? "Substances :" : "Commodity:"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 py-0.5">
            {topCommodityOptions.map((opt) => {
              const isSelected = selectedCommodity === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCommodity(opt.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[#C6112F] text-white shadow-xs"
                      : "bg-white dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 border border-neutral-200/90 dark:border-zinc-700 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}

            {/* Dropdown for All Other Unique Commodities in this Edition */}
            <div className="relative shrink-0">
              <select
                value={isCustomCommodity ? selectedCommodity : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedCommodity(e.target.value);
                  }
                }}
                aria-label={isFr ? "Toutes les autres substances" : "More commodities"}
                className={`py-1.5 pl-2.5 pr-6 rounded-lg text-xs font-bold border transition-all cursor-pointer appearance-none ${
                  isCustomCommodity
                    ? "bg-[#C6112F] text-white border-[#C6112F] shadow-xs"
                    : "bg-white dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 border-neutral-200/90 dark:border-zinc-700 hover:bg-neutral-100"
                }`}
              >
                <option value="" disabled>
                  {isFr ? "+ Autres substances…" : "+ More Commodities…"}
                </option>
                {availableCommodities
                  .filter((c) => !["au", "cu", "ag", "li", "u", "ni", "zn"].includes(c.name.toLowerCase()))
                  .map((c) => (
                    <option key={c.name} value={c.name} className="text-neutral-900 dark:text-white bg-white dark:bg-zinc-800">
                      {c.name} ({c.count})
                    </option>
                  ))}
              </select>
              <svg
                className={`w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isCustomCommodity ? "text-white" : "text-neutral-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 3: Quick Type Filter Chips */}
        <div className="pt-2 border-t border-neutral-200/70 dark:border-zinc-800 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 dark:text-zinc-400 mr-1 shrink-0">
            {isFr ? "Type de société :" : "Company Type:"}
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
                    : "bg-white dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 border border-neutral-200/90 dark:border-zinc-700 hover:bg-neutral-100 hover:text-neutral-900"
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
        <div className="flex items-center gap-2.5 flex-wrap">
          {isApiYear && apiLoading ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full border border-neutral-400 border-t-[#C6112F] animate-spin" />
              <span>{isFr ? "Chargement des sociétés participantes…" : "Loading participating companies…"}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {sortedCompanies.length}{" "}
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

          {/* Active Search Pill */}
          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 text-xs font-bold shadow-2xs">
              <span>
                {isFr ? "Recherche :" : "Search:"} &ldquo;{searchQuery.trim()}&rdquo;
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer text-[10px] leading-none text-neutral-500 hover:text-neutral-900"
                title={isFr ? "Effacer la recherche" : "Clear search"}
              >
                ✕
              </button>
            </span>
          )}

          {/* Active Commodity Pill */}
          {selectedCommodity !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-2xs">
              <span>
                {isFr ? "Substance :" : "Commodity:"}{" "}
                {topCommodityOptions.find((o) => o.id === selectedCommodity)?.full || selectedCommodity}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCommodity("ALL")}
                className="hover:bg-amber-500/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer text-[10px] leading-none"
                title={isFr ? "Effacer le filtre substance" : "Clear commodity filter"}
              >
                ✕
              </button>
            </span>
          )}

          {/* Active Type Pill */}
          {selectedType !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 text-sky-800 dark:text-sky-300 text-xs font-bold shadow-2xs">
              <span>
                {isFr ? "Type :" : "Type:"}{" "}
                {typeFilterOptions.find((t) => t.id === selectedType)?.label || selectedType}
              </span>
              <button
                type="button"
                onClick={() => setSelectedType("ALL")}
                className="hover:bg-sky-500/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer text-[10px] leading-none"
                title={isFr ? "Effacer le filtre type" : "Clear type filter"}
              >
                ✕
              </button>
            </span>
          )}

          {/* Active Exchange Pill */}
          {selectedExchange !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs font-bold shadow-2xs">
              <span>
                {isFr ? "Bourse :" : "Exchange:"}{" "}
                {exchangeOptions.find((e) => e.id === selectedExchange)?.label || selectedExchange}
              </span>
              <button
                type="button"
                onClick={() => setSelectedExchange("ALL")}
                className="hover:bg-purple-500/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer text-[10px] leading-none"
                title={isFr ? "Effacer le filtre bourse" : "Clear exchange filter"}
              >
                ✕
              </button>
            </span>
          )}

          {/* Active Region Pill */}
          {selectedLocation !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs">
              <span>
                {isFr ? "Région :" : "Region:"}{" "}
                {regionOptions.find((r) => r.id === selectedLocation)?.label || selectedLocation}
              </span>
              <button
                type="button"
                onClick={() => setSelectedLocation("ALL")}
                className="hover:bg-emerald-500/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer text-[10px] leading-none"
                title={isFr ? "Effacer le filtre région" : "Clear region filter"}
              >
                ✕
              </button>
            </span>
          )}

          {/* Active Sort Pill with Clear Button */}
          {sortField && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6112F]/10 dark:bg-[#C6112F]/20 border border-[#C6112F]/30 text-[#C6112F] dark:text-[#ff4d6d] text-xs font-bold shadow-2xs">
              <span>
                {isFr ? "Tri :" : "Sorted by:"}{" "}
                {sortField === "name"
                  ? (isFr ? "Société" : "Company Name")
                  : sortField === "ticker"
                  ? (isFr ? "Symbole / Ticker" : "Ticker Symbol")
                  : sortField === "type"
                  ? "Type"
                  : sortField === "location"
                  ? (isFr ? "Localisation" : "Location")
                  : (isFr ? "Substances" : "Commodities")}{" "}
                ({sortDirection === "asc" ? "A → Z" : "Z → A"})
              </span>
              <button
                type="button"
                onClick={clearSort}
                className="hover:bg-[#C6112F]/20 dark:hover:bg-[#C6112F]/40 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer text-[10px] leading-none"
                title={isFr ? "Effacer le tri" : "Clear sort"}
                aria-label={isFr ? "Effacer le tri" : "Clear sort"}
              >
                ✕
              </button>
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
                {/* Column 1: Company Name */}
                <th
                  scope="col"
                  onClick={() => handleSort("name")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSort("name");
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-sort={
                    sortField === "name"
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`py-3.5 px-5 min-w-[260px] cursor-pointer select-none transition-colors group/th ${
                    sortField === "name"
                      ? "bg-white/10 text-white"
                      : "text-neutral-200 hover:bg-white/5 hover:text-white"
                  }`}
                  title={
                    sortField === "name"
                      ? sortDirection === "asc"
                        ? isFr
                          ? "Trié par société (croissant A → Z). Cliquer pour décroissant (Z → A)."
                          : "Sorted by company name (A → Z). Click for descending (Z → A)."
                        : isFr
                          ? "Trié par société (décroissant Z → A). Cliquer pour réinitialiser."
                          : "Sorted by company name (Z → A). Click to reset."
                      : isFr
                        ? "Cliquer pour trier par société (A → Z)"
                        : "Click to sort by company name (A → Z)"
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{t("co-col-name", isFr ? "Société" : "Company Name")}</span>
                    <span className="inline-flex items-center justify-center shrink-0">
                      {sortField === "name" ? (
                        sortDirection === "asc" ? (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▲
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▼
                          </span>
                        )
                      ) : (
                        <span className="w-4 h-4 text-neutral-500 group-hover/th:text-neutral-300 transition-colors flex items-center justify-center text-xs opacity-60 group-hover/th:opacity-100">
                          ⇅
                        </span>
                      )}
                    </span>
                  </div>
                </th>

                {/* Column 2: Ticker */}
                <th
                  scope="col"
                  onClick={() => handleSort("ticker")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSort("ticker");
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-sort={
                    sortField === "ticker"
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`py-3.5 px-4 min-w-[130px] cursor-pointer select-none transition-colors group/th ${
                    sortField === "ticker"
                      ? "bg-white/10 text-white"
                      : "text-neutral-200 hover:bg-white/5 hover:text-white"
                  }`}
                  title={
                    sortField === "ticker"
                      ? sortDirection === "asc"
                        ? isFr
                          ? "Trié par symbole (croissant). Cliquer pour décroissant."
                          : "Sorted by ticker (A → Z). Click for Z → A."
                        : isFr
                          ? "Trié par symbole (décroissant). Cliquer pour réinitialiser."
                          : "Sorted by ticker (Z → A). Click to reset."
                      : isFr
                        ? "Cliquer pour trier par symbole"
                        : "Click to sort by ticker"
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{t("co-col-ticker", isFr ? "Symbole" : "Ticker")}</span>
                    <span className="inline-flex items-center justify-center shrink-0">
                      {sortField === "ticker" ? (
                        sortDirection === "asc" ? (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▲
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▼
                          </span>
                        )
                      ) : (
                        <span className="w-4 h-4 text-neutral-500 group-hover/th:text-neutral-300 transition-colors flex items-center justify-center text-xs opacity-60 group-hover/th:opacity-100">
                          ⇅
                        </span>
                      )}
                    </span>
                  </div>
                </th>

                {/* Column 3: Type */}
                <th
                  scope="col"
                  onClick={() => handleSort("type")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSort("type");
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-sort={
                    sortField === "type"
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`py-3.5 px-4 min-w-[120px] cursor-pointer select-none transition-colors group/th ${
                    sortField === "type"
                      ? "bg-white/10 text-white"
                      : "text-neutral-200 hover:bg-white/5 hover:text-white"
                  }`}
                  title={
                    sortField === "type"
                      ? sortDirection === "asc"
                        ? isFr
                          ? "Trié par type (croissant). Cliquer pour décroissant."
                          : "Sorted by type (A → Z). Click for Z → A."
                        : isFr
                          ? "Trié par type (décroissant). Cliquer pour réinitialiser."
                          : "Sorted by type (Z → A). Click to reset."
                      : isFr
                        ? "Cliquer pour trier par type"
                        : "Click to sort by type"
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{t("co-col-type", isFr ? "Type" : "Type")}</span>
                    <span className="inline-flex items-center justify-center shrink-0">
                      {sortField === "type" ? (
                        sortDirection === "asc" ? (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▲
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▼
                          </span>
                        )
                      ) : (
                        <span className="w-4 h-4 text-neutral-500 group-hover/th:text-neutral-300 transition-colors flex items-center justify-center text-xs opacity-60 group-hover/th:opacity-100">
                          ⇅
                        </span>
                      )}
                    </span>
                  </div>
                </th>

                {/* Column 4: Location */}
                <th
                  scope="col"
                  onClick={() => handleSort("location")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSort("location");
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-sort={
                    sortField === "location"
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`py-3.5 px-4 min-w-[140px] cursor-pointer select-none transition-colors group/th ${
                    sortField === "location"
                      ? "bg-white/10 text-white"
                      : "text-neutral-200 hover:bg-white/5 hover:text-white"
                  }`}
                  title={
                    sortField === "location"
                      ? sortDirection === "asc"
                        ? isFr
                          ? "Trié par localisation (croissant). Cliquer pour décroissant."
                          : "Sorted by location (A → Z). Click for Z → A."
                        : isFr
                          ? "Trié par localisation (décroissant). Cliquer pour réinitialiser."
                          : "Sorted by location (Z → A). Click to reset."
                      : isFr
                        ? "Cliquer pour trier par localisation"
                        : "Click to sort by location"
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{t("co-col-location", isFr ? "Localisation" : "Location")}</span>
                    <span className="inline-flex items-center justify-center shrink-0">
                      {sortField === "location" ? (
                        sortDirection === "asc" ? (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▲
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▼
                          </span>
                        )
                      ) : (
                        <span className="w-4 h-4 text-neutral-500 group-hover/th:text-neutral-300 transition-colors flex items-center justify-center text-xs opacity-60 group-hover/th:opacity-100">
                          ⇅
                        </span>
                      )}
                    </span>
                  </div>
                </th>

                {/* Column 5: Commodities */}
                <th
                  scope="col"
                  onClick={() => handleSort("commodities")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSort("commodities");
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-sort={
                    sortField === "commodities"
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`py-3.5 px-5 min-w-[160px] cursor-pointer select-none transition-colors group/th ${
                    sortField === "commodities"
                      ? "bg-white/10 text-white"
                      : "text-neutral-200 hover:bg-white/5 hover:text-white"
                  }`}
                  title={
                    sortField === "commodities"
                      ? sortDirection === "asc"
                        ? isFr
                          ? "Trié par substances (croissant). Cliquer pour décroissant."
                          : "Sorted by commodities (A → Z). Click for Z → A."
                        : isFr
                          ? "Trié par substances (décroissant). Cliquer pour réinitialiser."
                          : "Sorted by commodities (Z → A). Click to reset."
                      : isFr
                        ? "Cliquer pour trier par substances"
                        : "Click to sort by commodities"
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{t("co-col-commodities", isFr ? "Substances" : "Commodities")}</span>
                    <span className="inline-flex items-center justify-center shrink-0">
                      {sortField === "commodities" ? (
                        sortDirection === "asc" ? (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▲
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded bg-[#C6112F] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ▼
                          </span>
                        )
                      ) : (
                        <span className="w-4 h-4 text-neutral-500 group-hover/th:text-neutral-300 transition-colors flex items-center justify-center text-xs opacity-60 group-hover/th:opacity-100">
                          ⇅
                        </span>
                      )}
                    </span>
                  </div>
                </th>

                {/* Column 6: Website Link */}
                <th className="py-3.5 px-4 min-w-[130px] text-neutral-200 text-center select-none">
                  {t("co-col-website", isFr ? "Site Web" : "Website")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800 text-xs sm:text-sm font-medium">
              {isApiYear && apiLoading ? (
                <tr>
                  <td colSpan={6} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
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
                  <td colSpan={6} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
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
              ) : sortedCompanies.length > 0 ? (
                sortedCompanies.map((company: CompanyItem, idx: number) => (
                  <tr
                    key={company._id ?? idx}
                    className="even:bg-neutral-50/50 dark:even:bg-zinc-900/40 hover:bg-[#FCDDE1]/25 dark:hover:bg-[#C6112F]/15 transition-colors duration-150 group border-b border-neutral-100 dark:border-zinc-800/80"
                  >
                    {/* Column 1: Company Logo + Name */}
                    <td className="py-3.5 px-5 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div className="shrink-0">
                          <CompanyLogoImage name={company.name} email={company.email} logo={company.logo} website={company.website} />
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
                          {company.commodities.split(",").map((comm, cIdx) => {
                            const trimmed = comm.trim();
                            const isSelected = selectedCommodity.toLowerCase() === trimmed.toLowerCase();
                            return (
                              <button
                                key={cIdx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCommodity(isSelected ? "ALL" : trimmed);
                                }}
                                title={
                                  isSelected
                                    ? isFr
                                      ? `Désélectionner ${trimmed}`
                                      : `Deselect ${trimmed}`
                                    : isFr
                                    ? `Filtrer par ${trimmed}`
                                    : `Filter by ${trimmed}`
                                }
                                className={`border text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#C6112F] text-white border-[#C6112F] shadow-2xs scale-105"
                                    : "bg-neutral-100 dark:bg-zinc-800 border-neutral-200/90 dark:border-zinc-700 text-neutral-700 dark:text-zinc-300 hover:bg-[#C6112F]/10 hover:text-[#C6112F] hover:border-[#C6112F]/30"
                                }`}
                              >
                                {trimmed}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-neutral-400 font-normal">—</span>
                      )}
                    </td>

                    {/* Column 6: Website Link */}
                    <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap">
                      {(() => {
                        const candidateDomain = company.name
                          ? company.name
                              .toLowerCase()
                              .replace(/[^a-z0-9\s]/g, "")
                              .split(/\s+/)
                              .filter((w) => !["inc", "corp", "corporation", "ltd", "limited", "llc", "co"].includes(w))
                              .join("") + ".com"
                          : null;
                        const siteUrl =
                          company.website ||
                          (company.email && company.email.includes("@") ? `https://${company.email.split("@")[1]}` : null) ||
                          (candidateDomain ? `https://www.${candidateDomain}` : null);

                        if (!siteUrl) return <span className="text-neutral-400 dark:text-zinc-500 font-medium">—</span>;
                        const fullUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
                        return (
                          <a
                            href={fullUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-2xs hover:shadow-xs whitespace-nowrap shrink-0 min-w-max cursor-pointer"
                          >
                            <span>{isFr ? "Visiter" : "Visit"}</span>
                            <svg className="w-3 h-3 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        );
                      })()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 px-6 text-center bg-neutral-50/50 dark:bg-zinc-900/50">
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
        {sortedCompanies.length > 0 ? (
          sortedCompanies.map((company: CompanyItem, idx: number) => (
            <div
              key={company._id ?? idx}
              className="bg-white dark:bg-[#141824] rounded-xl border border-neutral-200/90 dark:border-zinc-800 p-4 shadow-2xs hover:border-[#C6112F]/40 transition-colors"
            >
              <div className="flex items-start gap-3 mb-2.5">
                <div className="shrink-0 mt-0.5">
                  <CompanyLogoImage name={company.name} email={company.email} logo={company.logo} website={company.website} />
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
                    {company.commodities.split(",").slice(0, 4).map((comm, cIdx) => {
                      const trimmed = comm.trim();
                      const isSelected = selectedCommodity.toLowerCase() === trimmed.toLowerCase();
                      return (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCommodity(isSelected ? "ALL" : trimmed);
                          }}
                          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#C6112F] text-white shadow-2xs"
                              : "bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 hover:bg-[#C6112F]/10 hover:text-[#C6112F]"
                          }`}
                        >
                          {trimmed}
                        </button>
                      );
                    })}
                  </div>
                )}
                {(() => {
                  const candidateDomain = company.name
                    ? company.name
                        .toLowerCase()
                        .replace(/[^a-z0-9\s]/g, "")
                        .split(/\s+/)
                        .filter((w) => !["inc", "corp", "corporation", "ltd", "limited", "llc", "co"].includes(w))
                        .join("") + ".com"
                    : null;
                  const siteUrl =
                    company.website ||
                    (company.email && company.email.includes("@") ? `https://${company.email.split("@")[1]}` : null) ||
                    (candidateDomain ? `https://www.${candidateDomain}` : null);
                  if (!siteUrl) return null;
                  const fullUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
                  return (
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-[#C6112F] hover:underline"
                    >
                      <span>{isFr ? "Visiter" : "Visit"}</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  );
                })()}
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

