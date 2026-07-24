"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SPEAKERS, SPEAKERS_2025, SPEAKERS_2024, SPEAKERS_2023, RawSpeaker } from "@/app/past-editions/editionData";

export default function SpeakersView({ year = 2026 }: { year?: number }) {
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    if (year) {
      setSelectedYear(year);
    }
  }, [year]);

  const speakersList = useMemo(() => {
    if (selectedYear === 2023) return SPEAKERS_2023 || [];
    if (selectedYear === 2024) return SPEAKERS_2024 || [];
    if (selectedYear === 2025) return SPEAKERS_2025 || [];
    return SPEAKERS;
  }, [selectedYear]);

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

  const getInitials = (name: string) => {
    const cleaned = name
      .replace(/^(The Hon.|The Honourable|Grand Chief|Dr.)s+/i, "")
      .split(" ")
      .filter(Boolean);
    if (cleaned.length === 0) return "";
    const first = cleaned[0][0];
    const last = cleaned.length > 1 ? cleaned[cleaned.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  const filteredSpeakers = useMemo(() => {
    return speakersList.filter((s) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        `${s.name} ${s.title} ${s.organization}`
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      const matchesCategory = categoryFilter === "" || s.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [speakersList, searchTerm, categoryFilter]);

  const uniqueOrgs = useMemo(() => {
    return new Set(speakersList.map((s) => s.organization)).size;
  }, [speakersList]);

  return (
    <div className="w-full text-left font-sans">
      {/* Edition Filter Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6112F] animate-pulse shrink-0" />
          <span className="text-xs font-black tracking-widest uppercase text-neutral-500 whitespace-nowrap">
            Speaker Edition:
          </span>
          <div className="flex gap-2">
            {[2026, 2025, 2024].map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${selectedYear === y
                    ? "bg-[#C6112F] text-white shadow-md"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
              >
                {y} Speakers
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-bold text-neutral-500">
          Showing {filteredSpeakers.length} of {speakersList.length} Official {selectedYear} Speakers
        </span>
      </div>

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
              {speakersList.length}
            </span>
            <span className="text-xs text-neutral-500 font-semibold">Featured Speakers</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M8 2v4M16 2v4M3 9h18" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black text-neutral-900 block leading-tight">
              4 Days
            </span>
            <span className="text-xs text-neutral-500 font-semibold">Live Conference</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black text-neutral-900 block leading-tight">
              {uniqueOrgs}+
            </span>
            <span className="text-xs text-neutral-500 font-semibold">Organisations</span>
          </div>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-neutral-50/70 p-4 rounded-2xl border border-neutral-200/80">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name, title or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 shadow-2xs"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-extrabold text-neutral-900 focus:outline-none focus:border-[#C6112F] shadow-2xs cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="gov">Keynotes & Government</option>
          <option value="exec">Corporate Executives</option>
          <option value="fin">Finance & Investors</option>
          <option value="mod">Moderators</option>
        </select>
      </div>

      {/* Speakers Cards Grid */}
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
                  {/* Speaker Photo / Avatar */}
                  {speaker.image ? (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full rounded-full object-cover shadow-md border-4 border-white ring-2 ring-neutral-200 group-hover:ring-[#C6112F]/50 group-hover:scale-105 transition-all"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 flex items-center justify-center font-black text-2xl text-white shadow-md bg-gradient-to-br ${styles.avGrad} border-4 border-white ring-2 ring-neutral-200 group-hover:ring-[#C6112F]/40 transition-all`}
                    >
                      {getInitials(speaker.name)}
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight mb-1 group-hover:text-[#C6112F] transition-colors">
                    {speaker.name}
                  </h3>

                  {/* Title / Role */}
                  <div className="text-[11px] sm:text-xs text-neutral-500 font-medium leading-relaxed mb-2 min-h-[28px] flex items-center justify-center">
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
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
          <p className="text-neutral-500 font-semibold text-sm">
            No speakers matched your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
