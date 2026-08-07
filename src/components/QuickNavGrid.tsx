"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function QuickNavGrid() {
  const { lang, t } = useLanguage();
  const isFr = lang === "FR";

  const buttons = [
    // Row 1
    {
      label: isFr ? "VOIR L'ORDRE DU JOUR" : "VIEW AGENDA",
      href: "/agenda",
      isPrimary: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-800 dark:text-neutral-200 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: isFr ? "S'INSCRIRE MAINTENANT" : "REGISTER NOW",
      href: "/register",
      isPrimary: true,
      icon: (
        <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l4 4m0 0l-4 4m4-4H8" />
        </svg>
      ),
    },
    {
      label: isFr ? "BROCHURE" : "BROCHURE",
      href: "/brochure",
      isExternal: false,
      isPrimary: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-800 dark:text-neutral-200 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: isFr ? "SEMAINE INTERNATIONALE DE LA MINE" : "INTERNATIONAL MINING WEEK",
      href: "/imw",
      isPrimary: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-800 dark:text-neutral-200 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
        </svg>
      ),
    },
    // Row 2
    {
      label: isFr ? "ENTREPRISES PARTICIPANTES" : "PARTICIPATING COMPANIES",
      href: "/companies",
      isPrimary: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-800 dark:text-neutral-200 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: isFr ? "CONFÉRENCIERS" : "SPEAKERS",
      href: "/speakers",
      isPrimary: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-800 dark:text-neutral-200 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      label: isFr ? "MÉDIAS ET PARTENAIRES" : "MEDIA & PARTNERS",
      href: "/sponsors",
      isPrimary: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-800 dark:text-neutral-200 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
    },
    {
      label: isFr ? "JOURNÉE DE GOLF" : "GOLF DAY",
      href: "/golf",
      isPrimary: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-neutral-800 dark:text-neutral-200 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M12 21V3l7 4-7 4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {buttons.map((btn, i) => {
          if (btn.isPrimary) {
            return (
              <Link
                key={i}
                href={btn.href}
                className="w-full h-13 sm:h-14 rounded-2xl bg-[#B80D27] hover:bg-[#9a091e] text-white px-4 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
              >
                {btn.icon}
                <span className="whitespace-nowrap">{btn.label}</span>
              </Link>
            );
          }

          if (btn.isExternal) {
            return (
              <a
                key={i}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-13 sm:h-14 rounded-2xl bg-[#eaeff4] dark:bg-slate-800/90 hover:bg-[#dce3ea] dark:hover:bg-slate-700 text-neutral-900 dark:text-slate-100 border border-neutral-300/60 dark:border-slate-700 px-3.5 sm:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 group cursor-pointer text-center"
              >
                {btn.icon}
                <span className="whitespace-nowrap">{btn.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={i}
              href={btn.href}
              className="w-full h-13 sm:h-14 rounded-2xl bg-[#eaeff4] dark:bg-slate-800/90 hover:bg-[#dce3ea] dark:hover:bg-slate-700 text-neutral-900 dark:text-slate-100 border border-neutral-300/60 dark:border-slate-700 px-3.5 sm:px-4 text-[10.5px] xs:text-[11px] sm:text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 group cursor-pointer text-center"
            >
              {btn.icon}
              <span className="whitespace-nowrap">{btn.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
