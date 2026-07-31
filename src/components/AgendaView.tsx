"use client";

import React, { useState } from "react";
import { AGENDA_DAYS, AgendaDay, AgendaItem } from "@/app/past-editions/editionData";
import { useLanguage } from "@/context/LanguageContext";

interface AgendaViewProps {
  year?: number;
  /**
   * Schedule to render. Supplied by the events API for 2027; past editions omit
   * it and keep using the bundled AGENDA_DAYS data.
   */
  days?: AgendaDay[];
  eventDates?: string;
  venue?: string;
  city?: string;
}

export default function AgendaView({
  year = 2026,
  days,
  eventDates,
  venue,
  city,
}: AgendaViewProps) {
  const { t } = useLanguage();
  const [activeDayIdx, setActiveDayIdx] = useState<number>(1); // Default to June 2 (first full day)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const agendaDays = days?.length ? days : AGENDA_DAYS;
  const activeDay = agendaDays[activeDayIdx] || agendaDays[0];

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "keynote":
        return "bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-rose-950/70 dark:to-pink-950/70 text-[#9f1239] dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60 shadow-2xs";
      case "panel":
        return "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-950/70 dark:to-indigo-950/70 text-[#6b21a8] dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 shadow-2xs";
      case "spotlight":
        return "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-950/70 dark:to-yellow-950/70 text-[#92400e] dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 shadow-2xs";
      case "networking":
        return "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/70 dark:to-teal-950/70 text-[#137333] dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs";
      case "gala":
        return "bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-950 text-amber-300 border border-amber-500/30 shadow-md";
      case "remarks":
      case "closing":
        return "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-950/70 dark:to-indigo-950/70 text-[#1d4ed8] dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs";
      default:
        return "bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-slate-300 border border-neutral-200 dark:border-slate-700";
    }
  };

  const getBadgeLabel = (type: string) => {
    if (type === "logistics" || type === "pres") return "";
    return type.toUpperCase();
  };

  // Filter items based on searchQuery & categoryFilter
  const filteredItems = activeDay.items.filter((item: AgendaItem) => {
    // Category check
    if (categoryFilter !== "all") {
      if (categoryFilter === "keynote" && item.type !== "keynote" && item.type !== "remarks") return false;
      if (categoryFilter === "pres" && item.type !== "pres") return false;
      if (categoryFilter === "panel" && item.type !== "panel" && item.type !== "spotlight") return false;
      if (categoryFilter === "networking" && item.type !== "networking" && item.type !== "gala") return false;
    }

    // Search check
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchCompany = item.co?.toLowerCase().includes(query);
    const matchSpeaker = item.sp?.toLowerCase().includes(query);
    const matchOnly = item.only?.toLowerCase().includes(query);
    const matchSub = item.sub?.toLowerCase().includes(query);
    const matchBlockTitle = item.block?.title.toLowerCase().includes(query);
    const matchBlockLines = item.block?.lines.some((l) => l.toLowerCase().includes(query));
    const matchText = item.text?.toLowerCase().includes(query);

    return (
      matchCompany ||
      matchSpeaker ||
      matchOnly ||
      matchSub ||
      matchBlockTitle ||
      matchBlockLines ||
      matchText
    );
  });

  return (
    <div className="w-full text-left">
      {/* Top Header & Stats Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
          <span className="text-[#C6112F] text-xs font-black tracking-[0.2em] uppercase">
            {year} {t("agenda-official-programme", "OFFICIAL PROGRAMME")}
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#101828] dark:text-white tracking-tight mb-4 leading-tight">
          {t("agenda-the", "The")} <span className="text-[#C6112F]">{t("agenda-title", "Agenda")}</span>
        </h2>
        <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-medium">
          {t("agenda-desc")}
        </p>

        {/* 3 Premium Info Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/80 dark:bg-[#131b2e]/90 border border-neutral-200/90 dark:border-[#233049] rounded-2xl p-4 sm:p-5 md:p-6 shadow-md backdrop-blur-md transition-all duration-300">
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C6112F] to-[#8a091e] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#C6112F]/25">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">{t("agenda-date-label", "Date")}</span>
              <b className="block text-sm sm:text-base font-extrabold text-[#101828] dark:text-white">
                {eventDates ?? `June 1 – 4, ${year}`}
              </b>
              <span className="text-xs text-[#C6112F] font-extrabold">{t("agenda-4-days", "4 Days Event")}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-[#233049] pt-4 md:pt-2 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 dark:from-slate-700 dark:to-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">{t("agenda-venue-label", "Venue")}</span>
              <b className="block text-sm sm:text-base font-extrabold text-[#101828] dark:text-white">
                {venue ?? t("agenda-venue-name", "Centre des Congrès")}
              </b>
              <span className="text-xs text-neutral-500 dark:text-slate-400 font-medium">{city ?? t("agenda-venue-city", "Quebec City, Canada")}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-[#233049] pt-4 md:pt-2 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shrink-0 shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">{t("agenda-location-label", "Location")}</span>
              <b className="block text-sm sm:text-base font-extrabold text-[#101828] dark:text-white">
                {t("agenda-room", "Room 400 C")}
              </b>
              <span className="text-xs text-neutral-500 dark:text-slate-400 font-medium">{t("agenda-meetings", "1×1 Meetings in 400 A-B")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Search & Filter Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 bg-neutral-100/80 dark:bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-neutral-200/80 dark:border-[#233049]">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("agenda-search-ph", "Search company, speaker, or session...")}
            className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#131b2e] border border-neutral-300 dark:border-[#233049] rounded-xl text-xs sm:text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C6112F]/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: t("agenda-all", "All Sessions") },
            { id: "keynote", label: t("agenda-keynotes", "Keynotes & Remarks") },
            { id: "pres", label: t("agenda-corporate", "Corporate Presentations") },
            { id: "panel", label: t("agenda-panels", "Panels & Spotlights") },
            { id: "networking", label: t("agenda-networking", "Networking & Gala") },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? "bg-[#C6112F] text-white shadow-xs"
                  : "bg-white dark:bg-[#131b2e] text-neutral-600 dark:text-slate-300 border border-neutral-200 dark:border-[#233049] hover:border-[#C6112F]/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Day Tabs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        {agendaDays.map((day, idx) => {
          const isSelected = activeDayIdx === idx;
          const tabTopBorderColor =
            idx === 0
              ? "border-t-neutral-800 dark:border-t-slate-400"
              : idx === 1
              ? "border-t-[#C6112F]"
              : idx === 2
              ? "border-t-emerald-500"
              : "border-t-amber-500";

          return (
            <button
              key={day.id}
              onClick={() => setActiveDayIdx(idx)}
              className={`relative rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? "bg-gradient-to-br from-[#C6112F] via-[#b00e29] to-[#8a091e] border-[#C6112F] shadow-xl shadow-[#C6112F]/30 text-white scale-[1.02]"
                  : `bg-white dark:bg-[#131b2e] border-neutral-200/90 dark:border-[#233049] text-neutral-800 dark:text-slate-200 hover:border-neutral-300 dark:hover:border-slate-600 hover:-translate-y-1 hover:shadow-lg border-t-4 ${tabTopBorderColor}`
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <b className={`block text-sm sm:text-base font-black ${isSelected ? "text-white" : "text-[#101828] dark:text-white"}`}>
                  {day.tab}, {year}
                </b>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-slate-300"}`}>
                  {day.items.length} {t("agenda-items", "Items")}
                </span>
              </div>
              <span className={`text-xs font-semibold block ${isSelected ? "text-rose-100" : "text-neutral-400 dark:text-slate-400"}`}>
                {day.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Day Schedule Container */}
      <div className="border border-neutral-200/90 dark:border-[#233049] rounded-2xl bg-white dark:bg-[#131b2e] overflow-hidden shadow-lg transition-colors duration-300">
        {/* Primary Title Bar (Active Banner) */}
        <div className="bg-gradient-to-r from-[#0f1117] via-[#1a1f2c] to-[#0f1117] dark:from-[#090d16] dark:via-[#131b2e] dark:to-[#090d16] border-l-4 border-[#C6112F] px-6 sm:px-8 py-4 sm:py-5 text-white flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[#C6112F] text-[10px] font-extrabold tracking-[0.2em] uppercase block mb-0.5">
              {t("agenda-day", "DAY")} {activeDayIdx + 1} {t("agenda-session-timeline", "SESSION TIMELINE")}
            </span>
            <b className="text-base sm:text-lg font-black tracking-wide uppercase text-white">
              {activeDay.title}
            </b>
          </div>
          <span className="text-xs font-bold tracking-wider text-neutral-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 uppercase">
            {activeDay.tab.toUpperCase()}, {year} &bull; {activeDay.sub.toUpperCase()}
          </span>
        </div>

        {/* Rows List */}
        <div className="divide-y divide-neutral-100 dark:divide-[#233049]/60">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 dark:text-slate-400">
              <svg className="w-10 h-10 mx-auto text-neutral-300 dark:text-slate-600 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="font-extrabold text-sm text-neutral-700 dark:text-slate-200 mb-1">{t("agenda-no-results", "No matching sessions found")}</p>
              <p className="text-xs">{t("agenda-no-results-sub", "Try clearing your search query or switching filters.")}</p>
            </div>
          ) : (
            filteredItems.map((item: AgendaItem, idx: number) => {
              if (item.type === "mod") {
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-neutral-100/90 via-neutral-50 to-neutral-100/90 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-slate-900/80 px-6 sm:px-8 py-3 text-xs flex gap-3 items-center border-t border-b border-neutral-200/80 dark:border-[#233049]"
                  >
                    <span className="font-black text-[#C6112F] dark:text-rose-400 tracking-widest uppercase text-[10px] bg-[#C6112F]/10 dark:bg-[#C6112F]/20 px-2 py-0.5 rounded">
                      {t("agenda-moderator", "MODERATOR")}
                    </span>
                    <span className="text-neutral-800 dark:text-slate-200 font-bold">{item.text}</span>
                  </div>
                );
              }

              const badgeLabel = getBadgeLabel(item.type);

              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-6 sm:px-8 py-4 items-baseline hover:bg-gradient-to-r hover:from-rose-50/40 hover:via-transparent hover:to-transparent dark:hover:from-rose-950/20 transition-all duration-200 group"
                >
                  {/* Column 1: Time */}
                  <div className="md:col-span-2 font-mono text-xs sm:text-sm font-bold text-neutral-600 dark:text-slate-400 whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] group-hover:scale-125 transition-transform" />
                    <span>{item.t}</span>
                  </div>

                  {/* Column 2: Badge */}
                  <div className="md:col-span-2">
                    {badgeLabel ? (
                      <span
                        className={`inline-block text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md text-center uppercase ${getBadgeStyle(
                          item.type
                        )}`}
                      >
                        {badgeLabel}
                      </span>
                    ) : (
                      <div className="h-0 w-0 md:h-1" />
                    )}
                  </div>

                  {/* Column 3: Details */}
                  <div className="md:col-span-8">
                    {item.type === "pres" ? (
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <strong className="text-neutral-900 dark:text-white font-black group-hover:text-[#C6112F] dark:group-hover:text-rose-400 transition-colors mr-2">
                          {item.co}
                        </strong>
                        <span className="text-neutral-500 dark:text-slate-400 font-normal">
                          &mdash; {item.sp}
                        </span>
                      </div>
                    ) : item.block ? (
                      <div className="border-l-4 border-[#C6112F] bg-gradient-to-r from-[#C6112F]/5 via-rose-50/30 to-transparent dark:from-[#C6112F]/15 dark:via-slate-900/40 dark:to-transparent rounded-r-xl p-4.5 text-xs sm:text-sm border-t border-r border-b border-[#C6112F]/20 dark:border-[#C6112F]/30 shadow-xs group-hover:shadow-md transition-all">
                        <h4 className="font-extrabold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                          {item.block.title}
                        </h4>
                        <div className="space-y-1 text-neutral-600 dark:text-slate-300 font-normal leading-relaxed">
                          {item.block.lines.map((line, lIdx) => (
                            <div
                              key={lIdx}
                              dangerouslySetInnerHTML={{ __html: line }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs sm:text-sm text-neutral-800 dark:text-slate-200 font-bold leading-relaxed">
                        {item.only}
                        {item.sub && (
                          <span className="block text-xs font-normal text-neutral-500 dark:text-slate-400 mt-0.5">
                            {item.sub}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Agenda Note */}
      <div className="flex items-center gap-2.5 text-xs text-neutral-500 dark:text-slate-400 mt-6 leading-relaxed font-medium bg-neutral-50 dark:bg-slate-900/50 p-4 rounded-xl border border-neutral-200 dark:border-[#233049] shadow-2xs">
        <svg
          className="w-5 h-5 text-[#C6112F] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5M12 16.5v.01" />
        </svg>
        <span>
          {t("agenda-note", "Agenda is subject to change. 1×1 meetings presented by Ventum Capital Markets.")}
        </span>
      </div>
    </div>
  );
}

