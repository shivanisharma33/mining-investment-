"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import CompaniesView from "@/components/CompaniesView";
import type { CompanyItem } from "@/components/companiesData";
import { useLanguage } from "@/context/LanguageContext";
import {
  fetchEventEditions,
  fetchParticipatingCompanies,
  type EventEdition,
} from "@/lib/companiesApi";

/** Used until the editions request answers, and if it returns nothing. */
const FALLBACK_YEAR = 2027;

export default function CompaniesPage() {
  const { t } = useLanguage();
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [editions, setEditions] = useState<EventEdition[]>([]);
  const [companiesError, setCompaniesError] = useState<string>("");
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchEventEditions(controller.signal),
      fetchParticipatingCompanies(controller.signal),
    ])
      .then(([editionList, companyList]) => {
        setEditions(editionList);
        setCompanies(companyList);
        setCompaniesLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setCompaniesError(
          err instanceof Error ? err.message : "Unable to load companies"
        );
        setCompaniesLoading(false);
      });

    return () => controller.abort();
  }, []);

  // The newest edition names the page; the filter can still reach the others.
  const currentEdition = editions[0];
  const currentYear = currentEdition?.year ?? FALLBACK_YEAR;

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white">
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/20 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">Event</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">
                {currentEdition?.name ?? `Participating Companies ${currentYear}`}
              </span>
            </div>
            <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase block mb-3">
              {currentYear} DIRECTORY & CONFIRMED PARTICIPANTS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
              Participating <span className="text-[#C6112F]">Companies {currentYear}</span>
            </h1>
            <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
          </div>
        </section>

        {/* ═══════ COMPANIES TABLE SECTION ═══════ */}
        <section className="relative w-full py-14 sm:py-18 md:py-22">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {currentYear} CONFIRMED DELEGATIONS & EXHIBITORS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] dark:text-white tracking-tight mb-3">
              Confirmed for THE Event {currentYear}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-[720px] mb-10">
              Producers, developers, and explorers connecting with global capital across four days in Quebec City. Check back for daily updates.
            </p>

            {/* Render Table Component */}
            <CompaniesView
              key={currentYear}
              initialYear={currentYear}
              // Keeps the spinner up while the editions request is still out.
              apiYear={currentYear}
              editions={editions}
              apiCompanies={companies}
              apiLoading={companiesLoading}
              apiError={companiesError}
            />
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
