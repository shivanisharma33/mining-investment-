"use client";

import React, { useState, useMemo } from "react";
import { SPEAKERS, RawSpeaker } from "@/app/past-editions/editionData";

export default function SpeakersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "gov":
        return {
          label: "KEYNOTE",
          avGrad: "from-[#C6112F] to-[#7A0011]",
          badge: "bg-[#C6112F]/10 text-[#C6112F] border border-[#C6112F]/30",
        };
      case "exec":
        return {
          label: "EXECUTIVE",
          avGrad: "from-[#0F1117] to-[#1F2430]",
          badge: "bg-[#0F1117] text-white border border-neutral-700",
        };
      case "fin":
        return {
          label: "FINANCE",
          avGrad: "from-[#B45309] to-[#78350F]",
          badge: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
        };
      case "mod":
      default:
        return {
          label: "MODERATOR",
          avGrad: "from-[#334155] to-[#1E293B]",
          badge: "bg-slate-100 text-slate-800 border border-slate-300",
        };
    }
  };

  const getDayColor = (day: number) => {
    switch (day) {
      case 2:
        return "bg-[#C6112F]";
      case 3:
        return "bg-[#0B7A66]";
      case 4:
        return "bg-[#D97706]";
      default:
        return "bg-neutral-600";
    }
  };

  const getInitials = (name: string) => {
    const cleaned = name
      .replace(/^(The Hon\.|The Honourable|Grand Chief|Dr\.)\s+/i, "")
      .split(" ")
      .filter(Boolean);
    if (cleaned.length === 0) return "";
    const first = cleaned[0][0];
    const last = cleaned.length > 1 ? cleaned[cleaned.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  // Filter speakers based on states
  const filteredSpeakers = useMemo(() => {
    return SPEAKERS.filter((s) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        `${s.name} ${s.title} ${s.organization}`
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      const matchesCategory = categoryFilter === "" || s.category === categoryFilter;
      const matchesDay =
        dayFilter === "" || s.days.includes(parseInt(dayFilter, 10));

      return matchesSearch && matchesCategory && matchesDay;
    });
  }, [searchTerm, categoryFilter, dayFilter]);

  const uniqueOrgs = useMemo(() => {
    return new Set(SPEAKERS.map((s) => s.organization)).size;
  }, []);

  return (
    <div className="w-full text-left">
      {/* 3 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.4" />
              <path d="M5.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black text-neutral-900 block leading-tight">
              {SPEAKERS.length}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">Featured Speakers</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M4 9h16M9 9v11" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black text-neutral-900 block leading-tight">
              {uniqueOrgs}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">Represented Organizations</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M4 9.5h16M8 3v4M16 3v4" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black text-neutral-900 block leading-tight">4</span>
            <span className="text-xs text-neutral-500 font-semibold">Days of Programming</span>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Select Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search input */}
        <div className="flex-1 min-w-[260px] relative">
          <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search speaker, title or organization..."
            className="w-full bg-white border border-neutral-300 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all shadow-2xs"
          />
        </div>

        {/* Category dropdown */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-neutral-300 rounded-xl py-2.5 px-3 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#C6112F] cursor-pointer shadow-2xs"
        >
          <option value="">All Categories</option>
          <option value="gov">Government & Keynotes</option>
          <option value="exec">Company Executives</option>
          <option value="fin">Finance & Institutions</option>
          <option value="mod">Moderators & Media</option>
        </select>

        {/* Day dropdown */}
        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          className="bg-white border border-neutral-300 rounded-xl py-2.5 px-3 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#C6112F] cursor-pointer shadow-2xs"
        >
          <option value="">All Days</option>
          <option value="2">June 2 — Producers & Developers</option>
          <option value="3">June 3 — Critical Metals</option>
          <option value="4">June 4 — Explorers & Developers</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200 text-xs sm:text-sm text-neutral-500 font-medium">
        <span>
          Showing <strong className="text-neutral-900">{filteredSpeakers.length}</strong> of{" "}
          <strong className="text-neutral-900">{SPEAKERS.length}</strong> speakers
        </span>
      </div>

      {/* Speakers Grid */}
      {filteredSpeakers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSpeakers.map((speaker, idx) => {
            const styles = getCategoryStyles(speaker.category);
            return (
              <article
                key={idx}
                className="bg-white border border-neutral-200/90 rounded-2xl p-6 text-center shadow-2xs hover:shadow-xl hover:border-[#C6112F]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Initials Avatar */}
                  <div
                    className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-black text-xl text-white shadow-md bg-gradient-to-br ${styles.avGrad} border-4 border-white ring-2 ring-neutral-200 group-hover:ring-[#C6112F]/40 transition-all`}
                  >
                    {getInitials(speaker.name)}
                  </div>
                  {/* Name */}
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight mb-1 group-hover:text-[#C6112F] transition-colors">
                    {speaker.name}
                  </h3>
                  {/* Role Title */}
                  <div className="text-[11px] sm:text-xs text-neutral-500 font-medium leading-relaxed mb-2 min-h-[32px] flex items-center justify-center">
                    {speaker.title}
                  </div>
                  {/* Company/Org */}
                  <div className="text-xs font-bold text-[#C6112F] mb-4">
                    {speaker.organization}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex justify-center gap-1.5 flex-wrap pt-3 border-t border-neutral-100">
                  <span
                    className={`text-[9px] font-black tracking-wider px-2.5 py-0.5 rounded-full uppercase ${styles.badge}`}
                  >
                    {styles.label}
                  </span>
                  {speaker.days.map((day) => (
                    <span
                      key={day}
                      className={`text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full text-white shadow-2xs ${getDayColor(
                        day
                      )}`}
                    >
                      JUN {day}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 border border-dashed border-neutral-300 rounded-2xl bg-neutral-50/50">
          <h4 className="text-base font-bold text-neutral-800 mb-1">No speakers found</h4>
          <p className="text-xs text-neutral-500 font-medium">
            Try a different search term or clear your filters.
          </p>
        </div>
      )}
    </div>
  );
}

