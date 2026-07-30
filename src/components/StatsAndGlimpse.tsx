"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
    <div ref={ref} className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] font-black text-neutral-900 dark:text-slate-100 leading-none tracking-tight">
      {formatted}
      <span>{suffix}</span>
    </div>
  );
}

export default function StatsAndGlimpse() {
  const { lang, t } = useLanguage();
  const isFr = lang === "FR";

  const cards = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v3m0 0a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000-3" />
        </svg>
      ),
      number: "350",
      suffix: "",
      label: isFr ? "INVESTISSEURS QUALIFIÉS" : "QUALIFIED INVESTORS",
      subtext: isFr
        ? "Connecter le capital aux opportunités du monde entier."
        : "Connecting Capital With Opportunity From Around The World.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      number: "200",
      suffix: "+",
      label: isFr ? "SOCIÉTÉS REPRÉSENTÉES" : "COMPANIES REPRESENTED",
      subtext: isFr
        ? "Sociétés minières, d'exploration et de services présentant leurs projets et solutions."
        : "Mining, Exploration And Service Companies Showcasing Their Projects And Solutions.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      number: "143",
      suffix: "",
      label: isFr ? "ÉMETTEURS RENCONTRES 1-À-1" : "1X1 MEETING ISSUERS",
      subtext: isFr
        ? "Réunions pré-programmées entre investisseurs et dirigeants d'entreprises."
        : "Pre-Scheduled Meetings Between Investors And Company Executives.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12a2.25 2.25 0 002.25-2.25V3M3.75 3h16.5M3.75 3L12 12m4.5-4.5L12 12m0 0v9" />
        </svg>
      ),
      number: "65",
      suffix: "",
      label: isFr ? "PRÉSENTATIONS" : "PRESENTATIONS",
      subtext: isFr
        ? "Présentations d'entreprises, conférences et opportunités d'investissement."
        : "Company Presentations, Keynotes And Investment Spotlights Over The Event.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 003-3V4.5a3 3 0 10-6 0v8.25a3 3 0 003 3z" />
        </svg>
      ),
      number: "17",
      suffix: "",
      label: isFr ? "PANELS ET CONFÉRENCES" : "PANELS & KEYNOTES",
      subtext: isFr
        ? "Partenaires fiers de soutenir l'événement et la communauté minière mondiale."
        : "Proud Partners Supporting The Event And The Global Mining Community.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      number: "60",
      suffix: "+",
      label: isFr ? "COMMANDITAIRES & PARTENAIRES" : "SPONSORS & PARTNERS",
      subtext: isFr
        ? "Des réunions ciblées créant de vraies connexions et un impact durable."
        : "Focused Meetings Creating Real Connections And Lasting Impact.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6 0 3.375 3.375 0 016 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      number: "3500",
      suffix: "",
      label: isFr ? "RÉUNIONS 1-À-1 / 3 JOURS" : "1X1 MEETINGS/ 3 DAYS",
      subtext: isFr
        ? "Connecter le capital aux opportunités du monde entier."
        : "Connecting Capital With Opportunity From Around The World.",
    },
  ];

  const topRowCards = cards.slice(0, 4);
  const bottomRowCards = cards.slice(4);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 transition-colors duration-300 bg-gradient-to-b from-[#f8f9fa] via-[#eef0f5] to-[#f8f9fa] dark:from-[#0d111a] dark:via-[#131926] dark:to-[#0d111a]">
      {/* ════════ HEADER SECTION MATCHING EXACT IMAGE ════════ */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 text-center mb-12 sm:mb-16">
        <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase block mb-2">
          {isFr ? "L ' É V É N E M E N T  2 0 2 6" : "T H E   E V E N T   2 0 2 6"}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#1f2430] dark:text-white tracking-tight mb-3">
          {isFr ? "L'Événement en Chiffres" : "The Event by the Numbers"}
        </h2>
        <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          {isFr
            ? "Une plateforme mondiale connectant les investisseurs, les sociétés et les leaders façonnant l'avenir de l'industrie minière et de l'investissement."
            : "A global platform connecting investors, companies and leaders driving the future of mining and resource investment."}
        </p>
      </div>

      {/* ════════ STAGGERED CARDS GRID (4 TOP + 3 BOTTOM CENTERED) ════════ */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
        {/* Top Row: 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {topRowCards.map((card, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-white dark:bg-[#18181b] border border-neutral-300/80 dark:border-zinc-700/80 rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center justify-between min-h-[290px] shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Bottom Red Inner Gradient Glow (left & right bottom, not in bottom center) */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%),radial-gradient(ellipse_at_bottom_right,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%)] pointer-events-none rounded-b-2xl transition-opacity duration-300 opacity-80 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Double Ringed Circular Icon Container */}
                <div className="w-14 h-14 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-[#202532] flex items-center justify-center shadow-2xs mb-4 relative group-hover:border-[#C6112F] transition-colors">
                  <div className="w-11 h-11 rounded-full border border-[#C6112F]/50 flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>

                {/* Number */}
                <AnimatedNumber target={card.number} suffix={card.suffix} />

                {/* Red Label */}
                <div className="text-[#C6112F] font-bold text-xs sm:text-[13px] tracking-wider uppercase mb-2 max-w-[200px] leading-snug">
                  {card.label}
                </div>

                {/* Subtext */}
                <p className="text-neutral-600 dark:text-zinc-300 text-xs font-medium leading-relaxed max-w-[220px]">
                  {card.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: 3 Cards Centered */}
        <div className="max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7">
          {bottomRowCards.map((card, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-white dark:bg-[#18181b] border border-neutral-300/80 dark:border-zinc-700/80 rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center justify-between min-h-[290px] shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Bottom Red Inner Gradient Glow (left & right bottom, not in bottom center) */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%),radial-gradient(ellipse_at_bottom_right,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%)] pointer-events-none rounded-b-2xl transition-opacity duration-300 opacity-80 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Double Ringed Circular Icon Container */}
                <div className="w-14 h-14 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-[#202532] flex items-center justify-center shadow-2xs mb-4 relative group-hover:border-[#C6112F] transition-colors">
                  <div className="w-11 h-11 rounded-full border border-[#C6112F]/50 flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>

                {/* Number */}
                <AnimatedNumber target={card.number} suffix={card.suffix} />

                {/* Red Label */}
                <div className="text-[#C6112F] font-bold text-xs sm:text-[13px] tracking-wider uppercase mb-2 max-w-[200px] leading-snug">
                  {card.label}
                </div>

                {/* Subtext */}
                <p className="text-neutral-600 dark:text-zinc-300 text-xs font-medium leading-relaxed max-w-[220px]">
                  {card.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════ A GLIMPSE INSIDE THE EVENT VIDEO SECTION ════════ */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 bg-white/80 dark:bg-[#131b2e]/80 p-8 sm:p-12 rounded-3xl border border-neutral-200/90 dark:border-[#233049] shadow-xl backdrop-blur-xs">
          {/* Left Column: Text & Connected Action Buttons */}
          <div className="flex-1 flex flex-col items-start text-left max-w-[560px] lg:max-w-[520px]">
            <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("welcome-tag", "WELCOME")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3">
              {t("glimpse-title", "A Glimpse Inside THE Event")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
