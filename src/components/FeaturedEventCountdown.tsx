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
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 overflow-hidden border-y border-neutral-200/80">
      {/* Background Watermark Text: COMING SOON (Stacked behind countdown) */}
      <div className="absolute top-28 sm:top-32 left-0 right-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06] z-0">
        <span className="text-[100px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black tracking-[0.18em] leading-[0.8] text-neutral-900 uppercase">
          COMING
        </span>
        <span className="text-[100px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black tracking-[0.18em] leading-[0.8] text-neutral-900 uppercase">
          SOON
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Tag & Title */}
        <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase block mb-2">
          {t("feat-event-tag", "FEATURED EVENT")}
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1a1f2c] tracking-tight uppercase mb-3">
          {t("feat-event-title", "THE MINING INVESTMENT EVENT 2027")}
        </h2>
        <div className="w-16 h-[2.5px] bg-[#C6112F] mx-auto rounded-full mb-10" />

        {/* Live Digital Countdown Timer Row */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-10">
          {timerUnits.map((unit, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                {/* Small Top Label */}
                <span className="text-[9px] sm:text-xs font-black tracking-[0.2em] text-neutral-900 uppercase mb-2">
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
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base font-extrabold text-[#1a1f2c] mb-10">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{t("feat-event-date", "3-6 JUNE 2027")}</span>
          </div>

          <span className="text-neutral-300 font-normal">|</span>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{t("feat-event-loc", "QUÉBEC CITY, CANADA")}</span>
          </div>
        </div>

        {/* Subtitle & Description */}
        <div className="max-w-2xl mx-auto mb-10">
          <h3 className="text-xl sm:text-3xl font-extrabold text-[#1a1f2c] mb-2">
            Where Global Mining Leaders Connect
          </h3>
          <div className="w-14 h-[2px] bg-[#C6112F] mx-auto rounded-full mb-4" />
          <p className="text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed">
            A premier gathering of investors, mining companies, government, innovators and industry experts driving the future of mining.
          </p>
        </div>

        {/* 6 Action Buttons Grid (2 Rows of 3 Buttons - Exact Mockup Alignment) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
          {/* Row 1 */}
          <Link
            href="/agenda"
            className="w-full bg-[#e5e7eb] hover:bg-[#d1d5db] text-neutral-900 border border-neutral-300/80 rounded-xl px-5 py-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-2xs group"
          >
            <svg className="w-4 h-4 text-neutral-800 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            <span>VIEW AGENDA</span>
          </Link>

          <Link
            href="/register"
            className="w-full bg-[#a80d26] hover:bg-[#8a091e] text-white rounded-xl px-5 py-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center transition-all shadow-md hover:scale-105"
          >
            <span>REGISTER NOW</span>
          </Link>

          <Link
            href="/brochure"
            className="w-full bg-[#e5e7eb] hover:bg-[#d1d5db] text-neutral-900 border border-neutral-300/80 rounded-xl px-5 py-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-2xs group"
          >
            <svg className="w-4 h-4 text-neutral-800 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span>BROCHURE</span>
          </Link>

          {/* Row 2 */}
          <Link
            href="/issuers"
            className="w-full bg-[#e5e7eb] hover:bg-[#d1d5db] text-neutral-900 border border-neutral-300/80 rounded-xl px-5 py-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-2xs group"
          >
            <svg className="w-4 h-4 text-neutral-800 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
            <span>PARTICIPANT COMPANIES</span>
          </Link>

          <Link
            href="/speakers"
            className="w-full bg-[#e5e7eb] hover:bg-[#d1d5db] text-neutral-900 border border-neutral-300/80 rounded-xl px-5 py-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-2xs group"
          >
            <svg className="w-4 h-4 text-neutral-800 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>OUR SPEAKER</span>
          </Link>

          <Link
            href="/sponsors"
            className="w-full bg-[#e5e7eb] hover:bg-[#d1d5db] text-neutral-900 border border-neutral-300/80 rounded-xl px-5 py-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-2xs group"
          >
            <svg className="w-4 h-4 text-neutral-800 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
            </svg>
            <span>OUR SPONSOR</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
