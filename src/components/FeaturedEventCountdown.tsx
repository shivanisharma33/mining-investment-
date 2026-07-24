"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedEventCountdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2027-06-01T09:00:00").getTime();

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
    { label: t("timer-hrs", "HRS"), value: timeLeft.hours },
    { label: t("timer-min", "MIN"), value: timeLeft.minutes },
    { label: t("timer-sec", "SEC"), value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full bg-[#f0f4f8] py-12 sm:py-16 overflow-hidden">
      {/* Bottom Accent Red Border Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-12">
          {/* Left Column: Event Details & Action Buttons */}
          <div className="flex-1 flex flex-col items-start text-left">
            <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("feat-event-tag", "FEATURED EVENT")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
              {t("feat-event-title", "THE MINING INVESTMENT EVENT")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

            {/* Date and Location */}
            <div className="space-y-3 mb-7">
              <div className="flex items-center gap-3 text-[#1a1f2c] font-extrabold text-sm sm:text-base tracking-wide">
                <div className="w-8 h-8 rounded-md bg-white border border-neutral-300 flex items-center justify-center shrink-0 shadow-2xs">
                  <svg
                    className="w-5 h-5 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
                    <circle cx="7.5" cy="13" r="0.8" fill="currentColor" />
                    <circle cx="12" cy="13" r="0.8" fill="currentColor" />
                    <circle cx="16.5" cy="13" r="0.8" fill="currentColor" />
                  </svg>
                </div>
                <span>{t("feat-event-date", "1-3 JUNE 2027")}</span>
              </div>

              <div className="flex items-center gap-3 text-[#1a1f2c] font-extrabold text-sm sm:text-base tracking-wide">
                <div className="w-8 h-8 rounded-md bg-white border border-neutral-300 flex items-center justify-center shrink-0 shadow-2xs">
                  <svg
                    className="w-5 h-5 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z"
                    />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                </div>
                <span>{t("feat-event-loc", "QUÉBEC CITY, CANADA")}</span>
              </div>
            </div>

            {/* Connected Pill Buttons */}
            <div className="inline-flex items-center border border-neutral-300 rounded-lg overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
              <Link
                href="/register"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase transition-colors"
              >
                {t("nav-register", "REGISTER NOW")}
              </Link>
              <Link
                href="/agenda"
                className="bg-[#dedede] hover:bg-[#d4d4d4] text-neutral-900 text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase flex items-center gap-2 border-l border-neutral-300 transition-colors"
              >
                <span>{t("feat-event-agenda", "VIEW AGENDA")}</span>
                <svg
                  className="w-4 h-4 text-neutral-900 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 8.5L14 12L10.5 15.5M14 12H8.5"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Event Digital Countdown Timer */}
          <div className="flex items-center gap-2 sm:gap-3.5 md:gap-4">
            {timerUnits.map((unit, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  {/* Digital Display Box */}
                  <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 bg-[#0f1117] border border-neutral-800 rounded-xl flex items-center justify-center shadow-md overflow-hidden group">
                    {/* Top Red Accent Indicator Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#C6112F]" />

                    {/* Digital Monospace Number */}
                    <span className="font-mono text-xl sm:text-2xl md:text-[34px] font-black text-white tracking-wider tabular-nums drop-shadow-[0_2px_10px_rgba(198,17,47,0.35)]">
                      {unit.value}
                    </span>
                  </div>

                  {/* Unit Label Underneath */}
                  <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-neutral-600 uppercase mt-2.5">
                    {unit.label}
                  </span>
                </div>

                {/* Pulsing Digital Colon Separator */}
                {i < timerUnits.length - 1 && (
                  <div className="flex flex-col justify-center pb-6">
                    <span className="font-mono text-lg sm:text-2xl font-black text-[#C6112F] animate-pulse select-none">
                      :
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
