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
      icon: <i className="fi fi-rr-user-salary text-2xl text-[#C6112F] flex items-center justify-center"></i>,
      number: "350",
      suffix: "",
      label: isFr ? "INVESTISSEURS QUALIFIÉS" : "QUALIFIED INVESTORS",
      subtext: isFr
        ? "Connecter le capital aux opportunités du monde entier."
        : "Connecting Capital With Opportunity From Around The World.",
    },
    {
      icon: <i className="fi fi-rs-building text-2xl text-[#C6112F] flex items-center justify-center"></i>,
      number: "200",
      suffix: "+",
      label: isFr ? "SOCIÉTÉS REPRÉSENTÉES" : "COMPANIES REPRESENTED",
      subtext: isFr
        ? "Sociétés minières, d'exploration et de services présentant leurs projets et solutions."
        : "Mining, Exploration And Service Companies Showcasing Their Projects And Solutions.",
    },
    {
      icon: <i className="fi fi-rr-handshake text-2xl text-[#C6112F] flex items-center justify-center"></i>,
      number: "143",
      suffix: "",
      label: isFr ? "ÉMETTEURS RENCONTRES 1-À-1" : "1X1 MEETING ISSUERS",
      subtext: isFr
        ? "Réunions pré-programmées entre investisseurs et dirigeants d'entreprises."
        : "Pre-Scheduled Meetings Between Investors And Company Executives.",
    },
    {
      icon: <i className="fi fi-rr-chart-user text-2xl text-[#C6112F] flex items-center justify-center"></i>,
      number: "65",
      suffix: "",
      label: isFr ? "PRÉSENTATIONS" : "PRESENTATIONS",
      subtext: isFr
        ? "Présentations d'entreprises, conférences et opportunités d'investissement."
        : "Company Presentations, Keynotes And Investment Spotlights Over The Event.",
    },
    {
      icon: <i className="fi fi-rs-circle-microphone text-2xl text-[#C6112F] flex items-center justify-center"></i>,
      number: "17",
      suffix: "",
      label: isFr ? "PANELS ET CONFÉRENCES" : "PANELS & KEYNOTES",
      subtext: isFr
        ? "Partenaires fiers de soutenir l'événement et la communauté minière mondiale."
        : "Proud Partners Supporting The Event And The Global Mining Community.",
    },
    {
      icon: <i className="fi fi-rr-circle-nodes text-2xl text-[#C6112F] flex items-center justify-center"></i>,
      number: "60",
      suffix: "+",
      label: isFr ? "COMMANDITAIRES & PARTENAIRES" : "SPONSORS & PARTNERS",
      subtext: isFr
        ? "Des réunions ciblées créant de vraies connexions et un impact durable."
        : "Focused Meetings Creating Real Connections And Lasting Impact.",
    },
    {
      icon: (
        <div className="relative flex items-center justify-center min-w-[28px] min-h-[28px]">
          <i className="fi fi-rr-coworking fi-sr-coworking fi-rr-users-alt text-2xl text-[#C6112F] leading-none flex items-center justify-center"></i>
          <svg className="w-6 h-6 text-[#C6112F] absolute inset-0 m-auto -z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </div>
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
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 text-center mb-12 sm:mb-16 group">
        <span className="heading-badge text-xs sm:text-sm font-extrabold uppercase block mb-2 transition-all duration-300 group-hover:tracking-[0.35em]">
          {isFr ? "L ' É V É N E M E N T  2 0 2 6" : "T H E   E V E N T   2 0 2 6"}
        </span>
        <AnimatedHeading
          text={isFr ? "L'Événement en Chiffres" : "The Event by the Numbers"}
          className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#1f2430] dark:text-white tracking-tight mb-3"
        />
        <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mx-auto mb-4" />
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
              className="relative overflow-hidden bg-white dark:bg-[#18181b] border border-neutral-300/80 dark:border-zinc-700/80 rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center justify-between min-h-[290px] shadow-sm card-shimmer interactive-card group cursor-pointer"
            >
              {/* Bottom Red Inner Gradient Glow */}
              <div className="absolute inset-x-0 bottom-0 h-28 group-hover:h-36 bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%),radial-gradient(ellipse_at_bottom_right,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%)] pointer-events-none rounded-b-2xl transition-all duration-500 opacity-80 group-hover:opacity-100" />

              {/* Hover Animated Red Top Line Accent */}
              <div className="w-0 group-hover:w-16 h-[2.5px] bg-[#C6112F] transition-all duration-300 rounded-full mb-1" />

              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Double Ringed Circular Icon Container */}
                <div className="w-14 h-14 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-[#202532] flex items-center justify-center shadow-2xs mb-4 relative group-hover:border-[#C6112F] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <div className="w-11 h-11 rounded-full border border-[#C6112F]/50 group-hover:border-[#C6112F] flex items-center justify-center transition-colors">
                    {card.icon}
                  </div>
                </div>

                {/* Number */}
                <AnimatedNumber target={card.number} suffix={card.suffix} />

                {/* Red Label */}
                <div className="text-[#C6112F] font-bold text-xs sm:text-[13px] tracking-wider uppercase mb-2 max-w-[200px] leading-snug group-hover:scale-105 transition-transform duration-300">
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
              className="relative overflow-hidden bg-white dark:bg-[#18181b] border border-neutral-300/80 dark:border-zinc-700/80 rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center justify-between min-h-[290px] shadow-sm card-shimmer interactive-card group cursor-pointer"
            >
              {/* Bottom Red Inner Gradient Glow */}
              <div className="absolute inset-x-0 bottom-0 h-28 group-hover:h-36 bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%),radial-gradient(ellipse_at_bottom_right,rgba(198,17,47,0.28)_0%,rgba(198,17,47,0.08)_45%,transparent_70%)] pointer-events-none rounded-b-2xl transition-all duration-500 opacity-80 group-hover:opacity-100" />

              {/* Hover Animated Red Top Line Accent */}
              <div className="w-0 group-hover:w-16 h-[2.5px] bg-[#C6112F] transition-all duration-300 rounded-full mb-1" />

              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Double Ringed Circular Icon Container */}
                <div className="w-14 h-14 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-[#202532] flex items-center justify-center shadow-2xs mb-4 relative group-hover:border-[#C6112F] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <div className="w-11 h-11 rounded-full border border-[#C6112F]/50 group-hover:border-[#C6112F] flex items-center justify-center transition-colors">
                    {card.icon}
                  </div>
                </div>

                {/* Number */}
                <AnimatedNumber target={card.number} suffix={card.suffix} />

                {/* Red Label */}
                <div className="text-[#C6112F] font-bold text-xs sm:text-[13px] tracking-wider uppercase mb-2 max-w-[200px] leading-snug group-hover:scale-105 transition-transform duration-300">
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

          {/* Right Column: Video Card with Red Perimeter Frame & Overlay Text */}
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
