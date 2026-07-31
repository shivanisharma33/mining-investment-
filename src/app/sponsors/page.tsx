"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import SponsorsView, { SponsorItem } from "@/components/SponsorsView";
import { useLanguage } from "@/context/LanguageContext";
import { fetchSponsorsByYear } from "@/lib/sponsorsApi";

const SPONSORS_YEAR = 2027;

export default function SponsorsPage() {
  const { t } = useLanguage();
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [sponsorsError, setSponsorsError] = useState<string>("");
  const [sponsorsLoading, setSponsorsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchSponsorsByYear(SPONSORS_YEAR, controller.signal)
      .then((items) => {
        setSponsors(items);
        setSponsorsLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setSponsorsError(
          err instanceof Error ? err.message : "Unable to load sponsors"
        );
        setSponsorsLoading(false);
      });

    return () => controller.abort();
  }, []);

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
              <span className="text-white font-semibold">Sponsors 2027</span>
            </div>
            <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase block mb-3">
              2027 GLOBAL MINING LEADERSHIP & PARTNERS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
              Our <span className="text-[#C6112F]">Sponsors 2027</span>
            </h1>
            <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
          </div>
        </section>

        {/* ═══════ SPONSORS VIEW CONTENT ═══════ */}
        <section className="relative w-full py-14 sm:py-18 md:py-22">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              SUPPORT & INDUSTRY PARTNERSHIPS 2027
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] dark:text-white tracking-tight mb-3">
              THE Event 2027 Sponsors & Partners
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-[720px] mb-10">
              We thank our world-class sponsors and partners for their generous support in making the Mining Investment Event a premier global platform for collaboration, innovation, and sustainable capital growth.
            </p>

            {/* Shared Sponsors Component */}
            {sponsorsLoading ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-10 flex items-center justify-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 border-neutral-200 border-t-[#C6112F] animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Loading sponsors…
                </span>
              </div>
            ) : sponsorsError ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
                <p className="font-extrabold text-sm text-neutral-800 mb-1">
                  Unable to load the {SPONSORS_YEAR} sponsors
                </p>
                <p className="text-xs text-neutral-500">{sponsorsError}</p>
              </div>
            ) : (
              <SponsorsView year={SPONSORS_YEAR} sponsors={sponsors} />
            )}
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}

