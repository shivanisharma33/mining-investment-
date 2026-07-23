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
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      number: "350",
      suffix: "",
      label: t("stat-investors-label", "QUALIFIED INVESTORS"),
      sublabel: t("stat-investors-sub", "Attending"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M12 12v2" />
        </svg>
      ),
      number: "200",
      suffix: "+",
      label: t("stat-mining-label", "COMPANIES"),
      sublabel: t("stat-mining-sub", "Represented"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      number: "143",
      suffix: "",
      label: t("stat-users-label", "1-ON-1 USERS"),
      sublabel: t("stat-users-sub", "Meeting"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8M12 17v4M3 4h18M4 4v13h16V4" />
        </svg>
      ),
      number: "65",
      suffix: "",
      label: t("stat-presentations-label", "PRESENTATIONS"),
      sublabel: t("stat-presentations-sub", "Delivered"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      number: "17",
      suffix: "",
      label: t("stat-panels-label", "PANELS & KEYNOTES"),
      sublabel: t("stat-panels-sub", "Held"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.242.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.773-.569-.373-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
        </svg>
      ),
      number: "60",
      suffix: "+",
      label: t("stat-partners-label", "SPONSORS & PARTNERS"),
      sublabel: t("stat-partners-sub", "Supporting"),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-neutral-900 group-hover:text-[#C6112F] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      number: "3,500",
      suffix: "",
      label: t("stat-meetings-label", "1-ON-1 MEETINGS"),
      sublabel: t("stat-meetings-sub", "Over 3 Days"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f4f7fa] py-14 sm:py-18">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      {/* Stats Bar */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="border border-neutral-200/90 hover:border-[#C6112F]/40 transition-all duration-300 rounded-2xl bg-white p-5 sm:p-7 md:p-8 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 lg:gap-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group flex flex-col items-center text-center gap-1.5 cursor-default transition-all duration-300 ${
                  i < stats.length - 1 ? "lg:border-r lg:border-neutral-200 lg:px-1" : "lg:px-1"
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
