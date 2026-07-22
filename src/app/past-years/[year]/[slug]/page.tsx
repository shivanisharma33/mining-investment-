"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgendaPdfViewer from "@/components/AgendaPdfViewer";
import AgendaView from "@/components/AgendaView";
import SponsorsView from "@/components/SponsorsView";

const DOCUMENTS_DATA: Record<
  string,
  {
    title: string;
    description: string;
    file: string;
    bytes: number;
    year: number;
    category: string;
  }
> = {
  "2026-brochure": {
    year: 2026,
    category: "Brochure",
    title: "2026 Event Brochure",
    description:
      "The official brochure for THE Mining Investment Event 2026 — programme, format and what to expect in Québec City.",
    file: "/documents/2026-brochure.pdf",
    bytes: 2126464,
  },
  "2026-agenda": {
    year: 2026,
    category: "Agenda",
    title: "2026 Event Agenda",
    description:
      "The full running order for the 2026 event — sessions, timings and the schedule across all days.",
    file: "/documents/2026-agenda.pdf",
    bytes: 863269,
  },
  "2026-sponsors": {
    year: 2026,
    category: "Sponsors",
    title: "2026 Sponsorship Prospectus",
    description:
      "Sponsorship tiers, partner benefits and the prospectus for organisations supporting the 2026 event.",
    file: "/documents/2026-sponsors.pdf",
    bytes: 1239987,
  },
  "2025-brochure": {
    year: 2025,
    category: "Brochure",
    title: "2025 Event Brochure",
    description:
      "The official brochure for THE Mining Investment Event 2025 — programme, format and what to expect in Québec City.",
    file: "/documents/2025-brochure.pdf",
    bytes: 1745556,
  },
  "2024-brochure": {
    year: 2024,
    category: "Brochure",
    title: "2024 Event Brochure",
    description:
      "The official brochure for THE Mining Investment Event 2024 — programme, format and what to expect in Québec City.",
    file: "/documents/2024-brochure.pdf",
    bytes: 2395921,
  },
  "2024-agenda": {
    year: 2024,
    category: "Agenda",
    title: "2024 Event Agenda",
    description:
      "The full running order for the 2024 event — sessions, timings and the schedule across all days.",
    file: "/documents/2024-agenda.pdf",
    bytes: 2254187,
  },
  "2023-agenda": {
    year: 2023,
    category: "Agenda",
    title: "2023 Event Agenda",
    description:
      "The full running order for the 2023 event — sessions, timings and the schedule across all days.",
    file: "/documents/2023-agenda.pdf",
    bytes: 1877437,
  },
};

export default function PastYearDocumentPage() {
  const params = useParams();
  const year = params?.year as string;
  const slug = params?.slug as string;
  const key = `${year}-${slug}`;

  const [viewMode, setViewMode] = useState<"pdf" | "interactive">("pdf");

  const doc = DOCUMENTS_DATA[key] || {
    year: Number(year) || 2026,
    category: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Brochure",
    title: `${year || 2026} Event ${slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Brochure"}`,
    description: "The official document for THE Mining Investment Event.",
    file: "/documents/2026-brochure.pdf",
    bytes: 1995281,
  };

  const isAgenda = slug === "agenda" || key === "2026-agenda";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-neutral-900 font-sans pt-24">
        {/* ══════ HERO ══════ */}
        <section className="relative w-full bg-[#0f1117] text-white py-16 sm:py-20 border-b border-[#C6112F]">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mb-4 font-bold">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span className="text-[#C6112F]">›</span>
              <a href="/past-editions" className="hover:text-white transition-colors">
                Past Years
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">
                {doc.year} {doc.category}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#C6112F] text-white font-black text-xs px-2.5 py-1 rounded-md">
                {doc.year}
              </span>
              <span className="bg-neutral-800 text-neutral-300 font-bold text-xs px-2.5 py-1 rounded-md border border-neutral-700">
                {doc.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3">
              {doc.title}
            </h1>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-300 text-sm sm:text-base max-w-[760px] font-medium leading-relaxed">
              {doc.description}
            </p>
          </div>
        </section>

        {/* ══════ MAIN CONTENT ══════ */}
        <section className="py-12 bg-neutral-50 min-h-[700px]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* If agenda, show optional view mode toggle at top */}
            {isAgenda && (
              <div className="flex items-center justify-end mb-6">
                <div className="flex items-center bg-neutral-100 p-1.5 rounded-xl border border-neutral-200 gap-1">
                  <button
                    onClick={() => setViewMode("pdf")}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${viewMode === "pdf"
                        ? "bg-[#0f1117] text-white shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
                      }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>PDF Viewer</span>
                  </button>
                  <button
                    onClick={() => setViewMode("interactive")}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${viewMode === "interactive"
                        ? "bg-[#0f1117] text-white shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
                      }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Interactive Schedule</span>
                  </button>
                </div>
              </div>
            )}

            {/* Display Component */}
            {slug === "sponsors" ? (
              <SponsorsView year={Number(year) || 2025} />
            ) : viewMode === "pdf" ? (
              <AgendaPdfViewer pdfUrl={doc.file} year={doc.year} fileName={`${key}.pdf`} />
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xl mb-12">
                <AgendaView year={doc.year} />
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
