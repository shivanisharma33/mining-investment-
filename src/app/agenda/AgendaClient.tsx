"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import AgendaPdfViewer from "@/components/AgendaPdfViewer";
import { useLanguage } from "@/context/LanguageContext";
import type { AgendaApiItem } from "@/lib/agendaApi";
import { downloadPdf } from "@/lib/downloadPdf";

const AGENDA_YEAR = 2027;

/** Used only when the API has no agenda record for this edition. */
const FALLBACK_DATES = "June 1 - 3, 2027";
const FALLBACK_VENUE = "Centre des congrès de Québec, Québec City";
const FALLBACK_DESCRIPTION =
  "Explore the complete agenda to discover event details, key themes, speaker highlights, session schedule, and networking opportunities.";

const agendaFileName = (agenda: AgendaApiItem) =>
  `${agenda.slug || `agenda-${agenda.year ?? AGENDA_YEAR}`}.pdf`;

export default function AgendaClient({
  agenda,
  agendaError = "",
}: {
  /** Fetched on the server, so the agenda is in the HTML on first paint. */
  agenda: AgendaApiItem | null;
  agendaError?: string;
}) {
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!agenda?.pdfUrl || isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadPdf(agenda.pdfUrl, agendaFileName(agenda));
    } catch (err) {
      console.error("Agenda download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const agendaYear = agenda?.year ?? AGENDA_YEAR;
  const agendaDates = agenda?.eventDates || FALLBACK_DATES;
  const agendaVenue = agenda?.venue || FALLBACK_VENUE;

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#0c0d12] transition-colors duration-300">
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
              <span className="text-white font-semibold">Agenda {agendaYear}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[#C6112F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase block mb-3">
                  {agendaDates} &bull; {agendaVenue}
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
                  THE <span className="text-[#C6112F]">Agenda {agendaYear}</span>
                </h1>
                <div className="w-20 h-[3.5px] bg-[#C6112F] mt-6 rounded-full" />
              </div>
              <div className="shrink-0">
                <button
                  onClick={handleDownload}
                  type="button"
                  disabled={!agenda?.pdfUrl || isDownloading}
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
                      : "Download Official PDF Agenda"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ AGENDA PDF VIEWER ═══════ */}
        <section className="relative w-full py-10 sm:py-14 md:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-8">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-1.5 block">
                OFFICIAL PROGRAMME
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white tracking-tight">
                {agenda?.title || `Official ${agendaYear} Event Agenda (PDF)`}
              </h3>
            </div>

            {agendaError ? (
              <div className="rounded-2xl border border-neutral-200 dark:border-[#233049] bg-white dark:bg-[#131b2e] p-10 text-center">
                <p className="font-extrabold text-sm text-neutral-800 dark:text-white mb-1">
                  Unable to load the {AGENDA_YEAR} agenda
                </p>
                <p className="text-xs text-neutral-500 dark:text-slate-400">{agendaError}</p>
              </div>
            ) : agenda ? (
              <AgendaPdfViewer
                remote
                year={agenda.year}
                pdfUrl={agenda.pdfUrl}
                title={agenda.title}
                description={agenda.description || FALLBACK_DESCRIPTION}
                eventDates={agenda.eventDates}
                venue={agenda.venue}
                fileName={agendaFileName(agenda)}
              />
            ) : (
              <AgendaPdfViewer
                year={AGENDA_YEAR}
                title={`THE Mining Investment Event ${AGENDA_YEAR}`}
                description={FALLBACK_DESCRIPTION}
                eventDates={FALLBACK_DATES}
                venue={FALLBACK_VENUE}
                pdfUrl="/documents/2026-agenda.pdf"
                fileName="agenda-2027.pdf"
              />
            )}
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
