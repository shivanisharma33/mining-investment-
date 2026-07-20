"use client";

import React, { useEffect, useState } from "react";
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
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("feat-event-tag", "FEATURED EVENT")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#1a1f2c] tracking-tight mb-2 leading-tight">
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
                <span>{t("feat-event-date", "3-6 JUNE 2027")}</span>
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
              <a
                href="#"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase transition-colors"
              >
                {t("nav-register", "REGISTER NOW")}
              </a>
              <a
                href="#"
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
              </a>
            </div>
          </div>

          {/* Right Column: Live Event Countdown Timer Boxes */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-6">
            {timerUnits.map((unit, i) => (
              <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                {/* Unit Label with Red Underline */}
                <span className="font-extrabold text-xs sm:text-sm text-[#1a1f2c] border-b-[2.5px] border-[#C6112F] pb-0.5 tracking-wider uppercase">
                  {unit.label}
                </span>

                {/* Number Card Box with Thin Red Perimeter Border */}
                <div className="w-18 sm:w-22 md:w-24 h-16 sm:h-20 bg-white border border-[#C6112F]/60 rounded-xl flex items-center justify-center shadow-xs hover:border-[#C6112F] transition-colors">
                  <span className="text-xl sm:text-2xl md:text-[32px] font-black text-neutral-900 leading-none">
                    {unit.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
