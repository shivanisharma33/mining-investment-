"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedEventCountdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: "300",
    hours: "20",
    minutes: "44",
    seconds: "36",
  });

  useEffect(() => {
    const targetDate = new Date("2027-06-03T09:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "0", hours: "00", minutes: "00", seconds: "00" });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerUnits = [
    { label: t("timer-days", "DAYS"), value: timeLeft.days },
    { label: t("timer-hrs", "HOURS"), value: timeLeft.hours },
    { label: t("timer-min", "MINUTES"), value: timeLeft.minutes },
    { label: t("timer-sec", "SECONDS"), value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full bg-white dark:bg-[#0b101c] py-16 sm:py-20 md:py-24 overflow-hidden border-y border-neutral-200/80 dark:border-[#233049] transition-colors duration-300">
      {/* Background Watermark Text: COMING SOON (Stacked behind countdown) */}
      <div className="absolute top-28 sm:top-32 left-0 right-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06] z-0">
        <span className="text-[50px] xs:text-[80px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black tracking-[0.18em] leading-[0.8] text-neutral-900 uppercase">
          COMING
        </span>
        <span className="text-[50px] xs:text-[80px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black tracking-[0.18em] leading-[0.8] text-neutral-900 uppercase">
          SOON
        </span>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 text-center">
        {/* Top Tag & Title */}
        <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase block mb-2">
          {t("feat-event-tag", "FEATURED EVENT")}
        </span>
        <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-[#1a1f2c] dark:text-white tracking-tight uppercase mb-3">
          {t("feat-event-title", "THE MINING INVESTMENT EVENT 2027")}
        </h2>
        <div className="w-16 h-[2.5px] bg-[#C6112F] mx-auto rounded-full mb-10" />

        {/* Live Digital Countdown Timer Row */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-10">
          {timerUnits.map((unit, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                {/* Small Top Label */}
                <span className="text-[9px] sm:text-xs font-black tracking-[0.2em] text-neutral-900 dark:text-slate-200 uppercase mb-2">
                  {unit.label}
                </span>

                {/* Crimson Red Digital Box */}
                <div className="w-16 sm:w-24 md:w-28 h-14 sm:h-20 md:h-22 bg-gradient-to-b from-[#a80d26] via-[#C6112F] to-[#8a091e] border border-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#C6112F]/25 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wider tabular-nums drop-shadow-md">
                    {unit.value}
                  </span>
                </div>
              </div>

              {/* Pulsing Colon Separator */}
              {i < timerUnits.length - 1 && (
                <div className="flex flex-col justify-center pt-5">
                  <span className="text-xl sm:text-3xl font-black text-[#C6112F] animate-pulse select-none">
                    :
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Date and Location Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base font-extrabold text-[#1a1f2c] dark:text-slate-100 mb-10">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-neutral-800 dark:text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{t("feat-event-date", "3-6 JUNE 2027")}</span>
          </div>

          <span className="text-neutral-300 font-normal">|</span>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-neutral-800 dark:text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{t("feat-event-loc", "QUÉBEC CITY, CANADA")}</span>
          </div>
        </div>

        {/* Subtitle & Description */}
        <div className="max-w-2xl mx-auto mb-10">
          <h3 className="text-xl sm:text-3xl font-extrabold text-[#1a1f2c] dark:text-white mb-1">
            Where Global Mining Leaders Connect
          </h3>
          <div className="w-14 sm:w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mt-2.5 mb-4" />
          <p className="text-neutral-600 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
            A premier gathering of investors, mining companies, government, innovators and industry experts driving the future of mining.
          </p>
        </div>

        {/* 8 Action Buttons Grid arranged in 2 Lines (4 Columns per line on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 max-w-[1240px] mx-auto">
          {/* Line 1 - Button 1 */}
          <Link
            href="/agenda"
            className="w-full h-14 sm:h-16 bg-[#e5e7eb] dark:bg-slate-700 hover:bg-[#d1d5db] dark:hover:bg-slate-600 text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-[#233049] rounded-2xl px-2.5 sm:px-3.5 lg:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-normal sm:tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs group text-center"
          >
            <svg className="w-4 h-4 text-neutral-800 dark:text-slate-200 group-hover:scale-110 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            <span className="whitespace-nowrap">VIEW AGENDA</span>
          </Link>

          {/* Line 1 - Button 2 */}
          <Link
            href="/register"
            className="w-full h-14 sm:h-16 bg-[#a80d26] hover:bg-[#8a091e] text-white rounded-2xl px-2.5 sm:px-3.5 lg:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-normal sm:tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.02] text-center"
          >
            <span className="whitespace-nowrap">REGISTER NOW</span>
          </Link>

          {/* Line 1 - Button 3 */}
          <Link
            href="/past-years/2027/2027-brochure"
            className="w-full h-14 sm:h-16 bg-[#e5e7eb] dark:bg-slate-700 hover:bg-[#d1d5db] dark:hover:bg-slate-600 text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-[#233049] rounded-2xl px-2.5 sm:px-3.5 lg:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-normal sm:tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs group text-center"
          >
            <svg className="w-4 h-4 text-neutral-800 dark:text-slate-200 group-hover:scale-110 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="whitespace-nowrap">BROCHURE</span>
          </Link>

          {/* Line 1 - Button 4 */}
          <Link
            href="/imw"
            className="w-full h-14 sm:h-16 bg-[#e5e7eb] dark:bg-slate-700 hover:bg-[#d1d5db] dark:hover:bg-slate-600 text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-[#233049] rounded-2xl px-2 sm:px-3 lg:px-3.5 text-[9.5px] xs:text-[10px] sm:text-[11px] lg:text-xs font-black tracking-tight sm:tracking-normal uppercase flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-xs group text-center"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-800 dark:text-slate-200 group-hover:scale-110 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
            </svg>
            <span className="whitespace-nowrap">INTERNATIONAL MINING WEEK</span>
          </Link>

          {/* Line 2 - Button 5 */}
          <Link
            href="/companies"
            className="w-full h-14 sm:h-16 bg-[#e5e7eb] dark:bg-slate-700 hover:bg-[#d1d5db] dark:hover:bg-slate-600 text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-[#233049] rounded-2xl px-2 sm:px-3 lg:px-3.5 text-[9.5px] xs:text-[10px] sm:text-[11px] lg:text-xs font-black tracking-tight sm:tracking-normal uppercase flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-xs group text-center"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-800 dark:text-slate-200 group-hover:scale-110 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
            <span className="whitespace-nowrap">PARTICIPATING COMPANIES</span>
          </Link>

          {/* Line 2 - Button 6 */}
          <Link
            href="/speakers"
            className="w-full h-14 sm:h-16 bg-[#e5e7eb] dark:bg-slate-700 hover:bg-[#d1d5db] dark:hover:bg-slate-600 text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-[#233049] rounded-2xl px-2.5 sm:px-3.5 lg:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-normal sm:tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs group text-center"
          >
            <svg className="w-4 h-4 text-neutral-800 dark:text-slate-200 group-hover:scale-110 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="whitespace-nowrap">OUR SPEAKERS</span>
          </Link>

          {/* Line 2 - Button 7 */}
          <Link
            href="/sponsors"
            className="w-full h-14 sm:h-16 bg-[#e5e7eb] dark:bg-slate-700 hover:bg-[#d1d5db] dark:hover:bg-slate-600 text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-[#233049] rounded-2xl px-2.5 sm:px-3.5 lg:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-normal sm:tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs group text-center"
          >
            <svg className="w-4 h-4 text-neutral-800 dark:text-slate-200 group-hover:scale-110 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
            </svg>
            <span className="whitespace-nowrap">OUR SPONSORS</span>
          </Link>

          {/* Line 2 - Button 8 */}
          <Link
            href="/golf"
            className="w-full h-14 sm:h-16 bg-[#e5e7eb] dark:bg-slate-700 hover:bg-[#d1d5db] dark:hover:bg-slate-600 text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-[#233049] rounded-2xl px-2.5 sm:px-3.5 lg:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-normal sm:tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs group text-center"
          >
            <svg className="w-4 h-4 text-neutral-800 dark:text-slate-200 group-hover:scale-110 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M12 3v18M12 3l7 4-7 4" />
            </svg>
            <span className="whitespace-nowrap">ICONIC GOLF DAY</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
