"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedHeading from "@/components/AnimatedHeading";

function AnimatedNumber({ target, suffix }: { target: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const numericTarget = parseInt(target.replace(/,/g, ""), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = numericTarget / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
              setCount(numericTarget);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericTarget]);

  const formatted = count.toLocaleString();

  return (
    <div ref={ref} className="text-base sm:text-lg md:text-xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
      {formatted}
      <span>{suffix}</span>
    </div>
  );
}

function StatIconBadge({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 dark:bg-zinc-800/90 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
      {/* Red Arc Accent in Top Right */}
      <div className="absolute -top-[1.5px] -right-[1.5px] w-4.5 h-4.5 border-t-2 border-r-2 border-[#C6112F] rounded-tr-full pointer-events-none" />
      <div className="text-neutral-700 dark:text-zinc-200 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

export default function StatsAndGlimpse() {
  const { lang, t } = useLanguage();
  const isFr = lang === "FR";

  const cards = [
    {
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-700 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      number: "350",
      suffix: "",
      label: isFr ? "INVESTISSEURS QUALIFIÉS" : "QUALIFIED INVESTORS",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-700 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5M13.5 6.75h1.5M9 10.5h1.5M13.5 10.5h1.5M9 14.25h1.5M13.5 14.25h1.5M9 18h1.5M13.5 18h1.5" />
        </svg>
      ),
      number: "200",
      suffix: "+",
      label: isFr ? "SOCIÉTÉS REPRÉSENTÉES" : "COMPANIES REPRESENTED",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-700 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      number: "143",
      suffix: "",
      label: isFr ? "ÉMETTEURS RENCONTRES 1-À-1" : "1X1 MEETING ISSUERS",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-700 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      number: "65",
      suffix: "",
      label: isFr ? "PRÉSENTATIONS" : "PRESENTATIONS",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-700 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 003-3V4.5a3 3 0 10-6 0v8.25a3 3 0 003 3z" />
        </svg>
      ),
      number: "17",
      suffix: "",
      label: isFr ? "PANELS ET CONFÉRENCES" : "PANELS & KEYNOTES",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-700 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.5 1.5 0 00-3 0v1.5m3.15 3h1.5a1.5 1.5 0 011.5 1.5v2.25m-6-3.75V12m6 0a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 01-1.5-1.5M16.5 7.5V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V7.5" />
        </svg>
      ),
      number: "60",
      suffix: "+",
      label: isFr ? "COMMANDITAIRES & PARTENAIRES" : "SPONSORS & PARTNERS",
    },
    {
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-700 dark:text-zinc-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      number: "3500",
      suffix: "",
      label: isFr ? (
        <>
          RÉUNIONS 1-À-1 /<br />3 JOURS
        </>
      ) : (
        <>
          1X1 MEETINGS /<br />3 DAYS
        </>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden py-14 sm:py-18 transition-colors duration-300 bg-gradient-to-b from-[#f8f9fa] via-[#f1f3f7] to-[#f8f9fa] dark:from-[#0d111a] dark:via-[#131926] dark:to-[#0d111a]">
      {/* ════════ HEADER SECTION MATCHING EXACT IMAGE ════════ */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 text-center mb-10 sm:mb-12 group">
        <span className="heading-badge text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] block mb-2 transition-all duration-300">
          {isFr ? "L'ÉVÉNEMENT 2026" : "THE EVENT 2026"}
        </span>
        <AnimatedHeading
          text={isFr ? "L'Événement en Chiffres" : "The Event by the Numbers"}
          className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#1f2430] dark:text-white tracking-tight mb-3"
        />
        <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          {isFr
            ? "Une plateforme mondiale connectant les investisseurs, les sociétés et les leaders façonnant l'avenir de l'industrie minière et de l'investissement."
            : "A global platform connecting investors, companies, and leaders driving the future of mining and resource investment."}
        </p>
      </div>

      {/* ════════ SINGLE 1-LINE HORIZONTAL STATS ROW (EXACT MATCH TO IMAGE) ════════ */}
      <div className="relative z-10 max-w-[1380px] w-full mx-auto px-3 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
            >
              {/* Icon Badge with Red Arc */}
              <StatIconBadge icon={card.icon} />

              {/* Red Vertical Line Divider */}
              <div className="w-[1px] h-8 sm:h-9 bg-[#C6112F]/30 shrink-0" />

              {/* Number & Red Label (2 Lines) */}
              <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                <AnimatedNumber target={card.number} suffix={card.suffix} />
                <span className="text-[#C6112F] font-medium text-[10px] sm:text-[11px] tracking-tight uppercase leading-[1.15] mt-0.5 line-clamp-2 max-w-full">
                  {card.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════ A GLIMPSE INSIDE THE EVENT VIDEO SECTION ════════ */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-18">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 bg-white/80 dark:bg-[#131b2e]/80 p-8 sm:p-12 rounded-3xl border border-neutral-200/90 dark:border-[#233049] shadow-xl backdrop-blur-xs">
          {/* Left Column: Text & Connected Action Buttons */}
          <div className="flex-1 flex flex-col items-start text-left max-w-[560px] lg:max-w-[520px] group">
            <span className="heading-badge text-xs sm:text-sm font-extrabold uppercase mb-2 block transition-all duration-300 group-hover:tracking-[0.32em]">
              {t("welcome-tag", "WELCOME")}
            </span>
            <AnimatedHeading
              text={t("glimpse-title", "A Glimpse Inside THE Event")}
              className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3"
            />
            <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mb-6" />

            <p className="text-neutral-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-8 font-medium">
              {t("glimpse-desc", "Step inside Canada's only Tier 1 global mining investment conference — where senior producers, emerging developers, institutional capital and the next generation of industry leaders converge under one roof.")}
            </p>

            {/* Connected Dual Pill Button Bar */}
            <div className="inline-flex items-center border border-neutral-300 dark:border-[#233049] rounded-lg overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
              <Link
                href="/about"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase transition-colors"
              >
                {t("discover-event", "DISCOVER THE EVENT")}
              </Link>
              <Link
                href="/register"
                className="bg-[#dedede] dark:bg-slate-700 hover:bg-[#d4d4d4] dark:hover:bg-slate-600 text-neutral-900 dark:text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase flex items-center gap-2 border-l border-neutral-300 dark:border-[#233049] transition-colors"
              >
                <span>{t("nav-register", "REGISTER NOW")}</span>
                <svg
                  className="w-4 h-4 text-neutral-900 dark:text-white shrink-0"
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

          {/* Right Column: Video Card with Red Perimeter Frame */}
          <div className="flex-1 w-full max-w-[580px] lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden border-[3px] border-[#C6112F] shadow-md bg-neutral-900 aspect-[16/9] group card-shimmer hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(198,17,47,0.25)] transition-all duration-500 cursor-pointer">
              <video
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="https://www.themininginvestmentevent.com/s/The-Event-Main-Video-Final-1.mov"
                  type="video/mp4"
                />
                <source
                  src="https://www.themininginvestmentevent.com/s/The-Event-Main-Video-Final-1.mov"
                  type="video/quicktime"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
