"use client";

import React, { useState } from "react";
import { AGENDA_DAYS, AgendaItem } from "@/app/past-editions/editionData";

export default function AgendaView({ year = 2026 }: { year?: number }) {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(1); // Default to June 2 (first full day)

  const activeDay = AGENDA_DAYS[activeDayIdx] || AGENDA_DAYS[0];

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "keynote":
        return "bg-[#C6112F]/10 text-[#C6112F] border border-[#C6112F]/30";
      case "panel":
        return "bg-[#0F1117] text-white border border-neutral-700";
      case "spotlight":
        return "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]";
      case "networking":
        return "bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]";
      case "gala":
        return "bg-[#0F1117] text-[#F59E0B] border border-[#F59E0B]/50 shadow-xs";
      case "remarks":
      case "closing":
        return "bg-[#F3F4F6] text-[#1F2937] border border-[#E5E7EB]";
      default:
        return "bg-neutral-100 text-neutral-600 border border-neutral-200";
    }
  };

  const getBadgeLabel = (type: string) => {
    if (type === "logistics" || type === "pres") return "";
    return type.toUpperCase();
  };

  return (
    <div className="w-full text-left">
      {/* 4 Day Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        {AGENDA_DAYS.map((day, idx) => {
          const isSelected = activeDayIdx === idx;
          return (
            <button
              key={day.id}
              onClick={() => setActiveDayIdx(idx)}
              className={`relative border-t-4 rounded-xl p-4 text-left transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-[#0F1117] border-[#C6112F] shadow-xl text-white scale-[1.02] ring-1 ring-[#C6112F]/30"
                  : "bg-white border-neutral-200 text-neutral-800 hover:border-[#C6112F]/40 hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <b
                  className={`block text-xs sm:text-sm font-black tracking-tight ${
                    isSelected ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {day.tab}, {year}
                </b>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                )}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-semibold block ${
                  isSelected ? "text-neutral-300" : "text-neutral-500"
                }`}
              >
                {day.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Day Schedule Container */}
      <div className="border border-neutral-200/90 rounded-2xl bg-white overflow-hidden shadow-md">
        {/* Day Header */}
        <div className="bg-[#0F1117] border-l-4 border-[#C6112F] px-6 sm:px-8 py-5 text-white flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C6112F]/15 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[#C6112F] text-[10px] font-black tracking-[0.25em] uppercase block mb-1">
              PROGRAM DAY {activeDayIdx + 1}
            </span>
            <b className="text-base sm:text-lg lg:text-xl font-black tracking-tight">
              {activeDay.title}
            </b>
          </div>
          <span className="relative z-10 text-xs font-mono tracking-wider text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            {activeDay.tab.toUpperCase()}, {year} &bull; {activeDay.sub.toUpperCase()}
          </span>
        </div>

        {/* Rows List */}
        <div className="divide-y divide-neutral-100">
          {activeDay.items.map((item: AgendaItem, idx: number) => {
            if (item.type === "mod") {
              return (
                <div
                  key={idx}
                  className="bg-[#C6112F]/5 px-6 sm:px-8 py-3 text-xs flex gap-3 items-center border-t border-b border-[#C6112F]/10"
                >
                  <span className="font-extrabold text-[#C6112F] tracking-widest uppercase text-[10px] bg-[#C6112F]/15 px-2 py-0.5 rounded-md">
                    MODERATOR
                  </span>
                  <span className="text-neutral-700 font-semibold">{item.text}</span>
                </div>
              );
            }

            const badgeLabel = getBadgeLabel(item.type);

            return (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-6 sm:px-8 py-4.5 items-baseline hover:bg-neutral-50/80 transition-colors"
              >
                {/* Column 1: Time */}
                <div className="md:col-span-2 font-mono text-xs font-bold text-neutral-600 whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F]" />
                  <span>{item.t}</span>
                </div>

                {/* Column 2: Badge */}
                <div className="md:col-span-2">
                  {badgeLabel ? (
                    <span
                      className={`inline-block text-[9px] font-black tracking-wider px-2.5 py-1 rounded-full text-center min-w-[70px] uppercase shadow-2xs ${getBadgeStyle(
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
                    <div className="text-xs sm:text-sm">
                      <strong className="text-neutral-900 font-extrabold block sm:inline mr-2">
                        {item.co}
                      </strong>
                      <span className="text-neutral-500 font-medium">
                        &mdash; {item.sp}
                      </span>
                    </div>
                  ) : item.block ? (
                    <div className="border-l-4 border-[#C6112F] bg-neutral-50/90 rounded-r-xl p-4 text-xs sm:text-sm border-t border-r border-b border-neutral-200/60 shadow-2xs">
                      <h4 className="font-extrabold text-neutral-900 mb-2 leading-snug">
                        {item.block.title}
                      </h4>
                      <div className="space-y-1 text-neutral-600 font-medium">
                        {item.block.lines.map((line, lIdx) => (
                          <div
                            key={lIdx}
                            dangerouslySetInnerHTML={{ __html: line }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-neutral-800 font-semibold leading-relaxed">
                      {item.only}
                      {item.sub && (
                        <span className="block text-xs font-medium text-neutral-500 mt-1">
                          {item.sub}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agenda Note */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-5 leading-relaxed font-medium bg-neutral-50 p-4 rounded-xl border border-neutral-200">
        <svg
          className="w-4.5 h-4.5 text-[#C6112F] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5M12 16.5v.01" />
        </svg>
        <span>
          Agenda is subject to change. 1&times;1 meetings presented by Ventum Capital Markets.
        </span>
      </div>
    </div>
  );
}

