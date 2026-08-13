"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import AgendaPdfViewer from "@/components/AgendaPdfViewer";
import { useLanguage } from "@/context/LanguageContext";
import { fetchBrochureByYear, BrochureApiItem } from "@/lib/brochuresApi";
import { downloadPdf } from "@/lib/downloadPdf";

const BROCHURE_YEAR = 2027;

const brochureFileName = (brochure: BrochureApiItem) =>
  `${brochure.slug || `brochure-${brochure.year || BROCHURE_YEAR}`}.pdf`;

export default function BrochurePage() {
  const { t } = useLanguage();
  const [brochure, setBrochure] = useState<BrochureApiItem | null>(null);
  const [brochureError, setBrochureError] = useState<string>("");
  const [brochureLoading, setBrochureLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!brochure?.pdfUrl || isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadPdf(brochure.pdfUrl, brochureFileName(brochure));
    } catch (err) {
      console.error("Brochure download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchBrochureByYear(BROCHURE_YEAR, controller.signal)
      .then((item) => {
        setBrochure(item);
        setBrochureLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setBrochureError(
          err instanceof Error ? err.message : "Unable to load the brochure"
        );
        setBrochureLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#0b0e14]">
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
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">Event</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">Brochure {BROCHURE_YEAR}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase block mb-3">
                  JUNE 1 - 3, {BROCHURE_YEAR} &bull; QUÉBEC CITY
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
                  THE <span className="text-[#C6112F]">Brochure {BROCHURE_YEAR}</span>
                </h1>
                <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
              </div>
              <div className="shrink-0">
                <button
                  onClick={handleDownload}
                  type="button"
                  disabled={!brochure?.pdfUrl || isDownloading}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#C6112F] text-white text-xs font-extrabold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#C6112F]/25 enabled:hover:bg-[#A30E26] enabled:hover:scale-105 enabled:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <span className="w-4 h-4 shrink-0 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  <span>
                    {isDownloading
                      ? "Preparing Download…"
                      : brochure?.pdfUrl
                      ? "Download Official PDF Brochure"
                      : "Brochure Coming Soon"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ BROCHURE CONTENT SECTION ═══════ */}
        <section className="relative w-full py-10 sm:py-14 md:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-6">
              <span className="text-[#C6112F] text-xs font-extrabold tracking-[0.25em] uppercase mb-1.5 block">
                {t("brochure-official-publication", "OFFICIAL PUBLICATION")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white tracking-tight">
                {t("brochure-section-title", `Event Brochure & Presentation ${BROCHURE_YEAR}`)}
              </h3>
            </div>

            {brochureLoading ? (
              <div className="rounded-3xl border border-neutral-200 dark:border-[#233049] bg-white dark:bg-[#131b2e] p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <span className="w-10 h-10 rounded-full border-3 border-neutral-200 dark:border-slate-700 border-t-[#C6112F] animate-spin mb-4" />
                <p className="text-sm font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider">
                  Loading brochure data...
                </p>
              </div>
            ) : brochure?.pdfUrl ? (
              <AgendaPdfViewer
                remote
                pdfUrl={brochure.pdfUrl}
                year={brochure.year ?? BROCHURE_YEAR}
                title={brochure.title}
                fileName={brochureFileName(brochure)}
                eventDates={brochure.eventDates}
                venue={brochure.venue}
              />
            ) : (
              /* ══════════ COMING SOON CARD ══════════ */
              <div className="rounded-3xl border border-neutral-200/90 dark:border-[#233049] bg-gradient-to-br from-white via-slate-50 to-neutral-100 dark:from-[#131b2e] dark:via-[#0f172a] dark:to-[#17223b] p-8 sm:p-14 text-center shadow-lg relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C6112F]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C6112F]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#C6112F]/10 text-[#C6112F] border border-[#C6112F]/20 flex items-center justify-center mb-6 shadow-inner">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#C6112F]/15 text-[#C6112F] text-xs font-black tracking-[0.2em] uppercase mb-4 border border-[#C6112F]/20">
                    {t("brochure-coming-soon-badge", "COMING SOON")}
                  </span>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
                    {t("brochure-coming-soon-title", `Official Brochure ${BROCHURE_YEAR} Coming Soon`)}
                  </h3>

                  <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-8 max-w-xl">
                    {t(
                      "brochure-coming-soon-desc",
                      `The official publication brochure for Mining Investment Event ${BROCHURE_YEAR} is currently being compiled. Register now to receive the brochure directly in your inbox upon release!`
                    )}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <a
                      href="/register"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#C6112F] hover:bg-[#a80e27] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      {t("brochure-register-now", "REGISTER FOR UPDATES")}
                    </a>

                    <a
                      href="/agenda"
                      className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-700 text-neutral-900 dark:text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xl shadow-xs hover:shadow-md transition-all text-center cursor-pointer"
                    >
                      {t("brochure-see-agenda", "SEE EVENT AGENDA")}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
