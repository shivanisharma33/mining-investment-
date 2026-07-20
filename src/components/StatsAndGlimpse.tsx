"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

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
    <div ref={ref} className="text-3xl sm:text-4xl md:text-[40px] font-black text-neutral-900 leading-none tracking-tight">
      {formatted}
      <span>{suffix}</span>
    </div>
  );
}

export default function StatsAndGlimpse() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 9h18" />
          <circle cx="8" cy="13" r="0.8" fill="currentColor" />
          <circle cx="12" cy="13" r="0.8" fill="currentColor" />
          <circle cx="16" cy="13" r="0.8" fill="currentColor" />
          <circle cx="8" cy="16" r="0.8" fill="currentColor" />
          <circle cx="12" cy="16" r="0.8" fill="currentColor" />
          <circle cx="16" cy="16" r="0.8" fill="currentColor" />
        </svg>
      ),
      number: "15",
      suffix: "+",
      label: t("stat-years-label", "YEARS"),
      sublabel: t("stat-years-sub", "of Excellence"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      number: "500",
      suffix: "+",
      label: t("stat-investors-label", "INVESTORS"),
      sublabel: t("stat-investors-sub", "Attending"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M12 12v2" />
        </svg>
      ),
      number: "300",
      suffix: "+",
      label: t("stat-mining-label", "MINING COMPANIES"),
      sublabel: t("stat-mining-sub", "Participating"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 000 18M12 3a14.5 14.5 0 010 18" />
        </svg>
      ),
      number: "50",
      suffix: "+",
      label: t("stat-countries-label", "COUNTRIES"),
      sublabel: t("stat-countries-sub", "Represented"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5L12 16.5L15 13.5M10.5 8L13 5.5C13.5 5 14.5 5 15 5.5L18.5 9C19 9.5 19 10.5 18.5 11L15 14.5M3.5 11.5L7 8C7.5 7.5 8.5 7.5 9 8L10 9M7 11.5L4.5 14C4 14.5 4 15.5 4.5 16L7.5 19C8 19.5 9 19.5 9.5 19L14.5 14" />
        </svg>
      ),
      number: "12,000",
      suffix: "+",
      label: t("stat-meetings-label", "MEETINGS"),
      sublabel: t("stat-meetings-sub", "Held"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f4f7fa] py-14 sm:py-18">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      {/* Stats Bar */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="border border-neutral-200/90 hover:border-[#C6112F]/40 transition-all duration-300 rounded-2xl bg-white p-5 sm:p-7 md:p-8 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group flex flex-col items-center text-center gap-1.5 cursor-default transition-all duration-300 ${
                  i < stats.length - 1 ? "md:border-r md:border-neutral-200 md:px-2" : "md:px-2"
                }`}
              >
                <div className="mb-0.5 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                <div className="text-[#C6112F] font-extrabold text-[11px] sm:text-xs tracking-wider uppercase leading-snug">
                  {stat.label}
                </div>
                <div className="text-[#C6112F] font-bold text-[11px] sm:text-xs leading-none">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A Glimpse Inside THE Event */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 pt-12 md:pt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* Left Column: Text & Connected Action Buttons */}
          <div className="flex-1 flex flex-col items-start text-left max-w-[560px] lg:max-w-[520px]">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("welcome-tag", "WELCOME")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-black text-neutral-900 leading-[1.2] mb-3">
              {t("glimpse-title", "A Glimpse Inside THE Event")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-5" />

            <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed mb-8 font-medium">
              {t("glimpse-desc", "Step inside Canada's only Tier 1 global mining investment conference — where senior producers, emerging developers, institutional capital and the next generation of industry leaders converge under one roof.")}
            </p>

            {/* Connected Dual Pill Button Bar */}
            <div className="inline-flex items-center border border-neutral-300 rounded-lg overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
              <a
                href="#"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase transition-colors"
              >
                {t("discover-event", "DISCOVER THE EVENT")}
              </a>
              <a
                href="#"
                className="bg-[#dedede] hover:bg-[#d4d4d4] text-neutral-900 text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase flex items-center gap-2 border-l border-neutral-300 transition-colors"
              >
                <span>{t("nav-register", "REGISTER NOW")}</span>
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

          {/* Right Column: Video Card with Red Perimeter Frame & Overlay Text */}
          <div className="flex-1 w-full max-w-[580px] lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden border-[3px] border-[#C6112F] shadow-md bg-neutral-900 aspect-[16/9] group hover:scale-[1.01] transition-transform duration-500">
              <video
                className="w-full h-full object-cover"
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

              {/* Dark overlay tint for typography legibility */}
              <div className="absolute inset-0 bg-black/35 pointer-events-none group-hover:bg-black/25 transition-colors duration-500" />

              {/* Overlay Text inside Video */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center pointer-events-none z-10 select-none">
                <span
                  className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-transparent"
                  style={{
                    WebkitTextStroke: "1.5px #ffffff",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                  }}
                >
                  CANADA&apos;S ONLY
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black italic text-white tracking-wide my-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                  TIER 1 GLOBAL
                </h3>
                <span className="text-xs sm:text-base md:text-xl font-extrabold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  MINING INVESTMENT CONFERENCE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
