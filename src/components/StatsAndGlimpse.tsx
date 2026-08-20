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
      icon: <i className="fi fi-rr-user-salary text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />,
      number: "350",
      suffix: "",
      label: isFr ? (
        <>
          INVESTISSEURS<br />QUALIFIÉS
        </>
      ) : (
        <>
          QUALIFIED<br />INVESTORS
        </>
      ),
    },
    {
      icon: <i className="fi fi-rs-building text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />,
      number: "200",
      suffix: "+",
      label: isFr ? (
        <>
          SOCIÉTÉS<br />REPRÉSENTÉES
        </>
      ) : (
        <>
          COMPANIES<br />REPRESENTED
        </>
      ),
    },
    {
      icon: <i className="fi fi-rr-chart-user text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />,
      number: "65",
      suffix: "",
      label: isFr ? "PRÉSENTATIONS" : "PRESENTATIONS",
    },
    {
      icon: <i className="fi fi-rs-circle-microphone text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />,
      number: "17",
      suffix: "",
      label: isFr ? (
        <>
          PANELS ET<br />CONFÉRENCES
        </>
      ) : (
        <>
          PANELS &<br />KEYNOTES
        </>
      ),
    },
    {
      icon: <i className="fi fi-rr-handshake text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />,
      number: "60",
      suffix: "+",
      label: isFr ? (
        <>
          MÉDIAS<br />& PARTENAIRES
        </>
      ) : (
        <>
          MEDIA &<br />PARTNERS
        </>
      ),
    },
    {
      icon: <i className="fi fi-rr-coworking text-sm sm:text-base leading-none text-neutral-700 dark:text-zinc-200" />,
      number: "3,500",
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
      {/* ════════ A GLIMPSE INSIDE THE EVENT VIDEO SECTION (FIRST) ════════ */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 mb-14 sm:mb-18">
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
              {t("glimpse-desc", "The Mining Investment Event (THE Event) is an exclusive, invitation-only conference centered on mining investments. THE Event brings together investors, mining companies, supply chain partners, governments, and industry experts. THE Event promotes idea exchange and discussions in a private environment, fostering open dialogue on geopolitics, trade, and investment.")}
            </p>

            {/* Connected Dual Pill Button Bar */}
            <div className="inline-flex items-stretch border border-neutral-300 dark:border-[#233049] rounded-lg overflow-hidden shadow-2xs hover:shadow-xs transition-shadow bg-[#C6112F]">
              <Link
                href="/about"
                className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase transition-colors flex items-center justify-center self-stretch"
              >
                {t("discover-event", "DISCOVER THE EVENT")}
              </Link>
              <Link
                href="/register"
                className="bg-[#dedede] dark:bg-slate-700 hover:bg-[#d4d4d4] dark:hover:bg-slate-600 text-neutral-900 dark:text-white text-xs sm:text-[13px] font-extrabold tracking-wider px-6 sm:px-7 py-3.5 uppercase flex items-center gap-2 border-l border-neutral-300 dark:border-[#233049] transition-colors self-stretch"
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

          {/* Right Column: Video Card with Red Perimeter Frame & Click to Watch Helper Note */}
          <div className="flex-1 w-full max-w-[580px] lg:max-w-none flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden border-[3px] border-[#C6112F] shadow-md bg-neutral-900 aspect-[16/9] group card-shimmer hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(198,17,47,0.25)] transition-all duration-500 cursor-pointer">
              <video
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
              >
                <source
                  src="/output_progressive_17378ef1-fb4d-4325-a4f2-b0379c3cd087.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            {/* Click to watch prompt note */}
            <div className="mt-3.5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-[#1a2338] border border-neutral-200 dark:border-[#233049] text-xs font-semibold text-neutral-700 dark:text-slate-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-ping" />
              <svg className="w-3.5 h-3.5 text-[#C6112F] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{t("glimpse-video-note", "Click on the video to watch event highlights")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ HEADER SECTION: THE EVENT 2026 BY THE NUMBERS (SECOND) ════════ */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8 text-center mb-10 sm:mb-12 group">
        <span className="heading-badge text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] block mb-2 transition-all duration-300">
          {isFr ? "L'ÉVÉNEMENT 2026" : "THE EVENT 2026"}
        </span>
        <AnimatedHeading
          text={t("numbers-title", isFr ? "L'Événement 2026 en Chiffres" : "THE Event 2026 by the Numbers")}
          className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#1f2430] dark:text-white tracking-tight mb-3"
        />
        <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-zinc-300 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          {t("numbers-desc", isFr
            ? "Une plateforme mondiale connectant les investisseurs, les entreprises, les chaînes d'approvisionnement et les leaders façonnant l'avenir de l'industrie minière et de l'investissement."
            : "A global platform connecting investors, companies, supply chains and leaders driving the future of mining and resource investment.")}
        </p>
      </div>

      {/* ════════ SINGLE 1-LINE HORIZONTAL STATS ROW ════════ */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#141824] border border-neutral-200/90 dark:border-zinc-800 rounded-xl p-3 sm:p-3.5 flex items-center gap-2 sm:gap-2.5 shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer overflow-hidden min-w-0 h-full"
            >
              {/* Icon Badge with Red Arc */}
              <StatIconBadge icon={card.icon} />

              {/* Red Vertical Line Divider */}
              <div className="w-[1px] h-8 sm:h-9 bg-[#C6112F]/30 shrink-0" />

              {/* Number & Red Label */}
              <div className="flex flex-col items-start justify-center overflow-hidden min-w-0 flex-1">
                <AnimatedNumber target={card.number} suffix={card.suffix} />
                <span className="text-[#C6112F] font-bold text-[9px] sm:text-[10px] xl:text-[10.5px] tracking-tight uppercase leading-[1.15] mt-0.5 max-w-full">
                  {card.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
