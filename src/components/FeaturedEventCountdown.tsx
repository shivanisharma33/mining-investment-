"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedHeading from "@/components/AnimatedHeading";

import QuickNavGrid from "@/components/QuickNavGrid";

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
    <section className="relative w-full bg-white dark:bg-[#0b101c] py-12 sm:py-14 md:py-16 overflow-hidden border-y border-neutral-200/80 dark:border-[#233049] transition-colors duration-300">
      {/* Background Watermark Text: COMING SOON (Stacked behind countdown) */}
      <div className="absolute top-28 sm:top-32 left-0 right-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06] z-0">
        <span className="text-[50px] xs:text-[80px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black tracking-[0.18em] leading-[0.8] text-neutral-900 uppercase">
          COMING
        </span>
        <span className="text-[50px] xs:text-[80px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black tracking-[0.18em] leading-[0.8] text-neutral-900 uppercase">
          SOON
        </span>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 text-center group">
        {/* Top Tag & Title */}
        <span className="heading-badge text-xs sm:text-sm font-extrabold uppercase block mb-2 transition-all duration-300 group-hover:tracking-[0.3em]">
          {t("feat-event-tag", "FEATURED EVENT")}
        </span>
        <AnimatedHeading
          text={t("feat-event-title", "THE MINING INVESTMENT EVENT 2027")}
          className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-[#1a1f2c] dark:text-white tracking-tight uppercase mb-3"
        />
        <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline mx-auto rounded-full mb-10" />

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
                <div className="w-16 sm:w-24 md:w-28 h-14 sm:h-20 md:h-22 bg-gradient-to-b from-[#a80d26] via-[#C6112F] to-[#8a091e] border border-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#C6112F]/25 relative overflow-hidden group card-shimmer hover:scale-108 hover:shadow-[0_12px_28px_rgba(198,17,47,0.45)] transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wider tabular-nums drop-shadow-md group-hover:scale-105 transition-transform duration-300">
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

        {/* Section Title - Single Line */}
        <div className="w-full max-w-5xl mx-auto mt-4 mb-8 sm:mb-10 px-2">
          <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[42px] font-black text-[#1a1f2c] dark:text-white tracking-tight leading-tight sm:whitespace-nowrap text-center">
            {t("countdown-subtitle", "Where Global Mining Leaders Connect")}
          </h3>
          <div className="w-16 sm:w-20 h-[3.5px] bg-[#C6112F] rounded-full mx-auto mt-3.5 sm:mt-4" />
        </div>

        {/* 8 Action Buttons Grid */}
        <QuickNavGrid />
      </div>
    </section>
  );
}
