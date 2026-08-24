"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface AgendaPdfViewerProps {
  pdfUrl?: string;
  totalPages?: number;
  fileName?: string;
  year?: number;
  title?: string;
  description?: string;
  fileSize?: string;
  /**
   * Download the PDF into a blob before rendering it. Required for the remote
   * Cloudinary files returned by the agenda API: they are served as
   * application/octet-stream with no .pdf extension, so browsers refuse to
   * render them inline and save them as an unknown file type. Local files under
   * /public/documents (past editions) leave this off and behave as before.
   */
  remote?: boolean;
  eventDates?: string;
  venue?: string;
  hideHeader?: boolean;
}

/** Approximate page count read straight from the PDF's object structure. */
function detectPageCount(buffer: ArrayBuffer): number {
  const text = new TextDecoder("iso-8859-1").decode(buffer);

  const pageObjects = text.match(/\/Type\s*\/Page[^s]/g);
  if (pageObjects && pageObjects.length > 0) {
    return Math.min(pageObjects.length, 200);
  }

  // Fallback: the page-tree /Count entry (only readable on uncompressed PDFs).
  const counts = Array.from(text.matchAll(/\/Count\s+(\d+)/g)).map((m) =>
    Number(m[1])
  );
  return counts.length ? Math.min(Math.max(...counts), 200) : 1;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AgendaPdfViewer({
  pdfUrl = "/documents/2026-agenda.pdf",
  totalPages = 4,
  fileName = "agenda.pdf",
  year = 2027,
  title = "Event Agenda",
  description = "Explore the complete agenda to discover event details, key themes, speaker highlights, session schedule, and networking opportunities.",
  fileSize = "0.9 MB",
  remote = false,
  eventDates,
  venue,
  hideHeader = true,
}: AgendaPdfViewerProps) {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [remotePages, setRemotePages] = useState<number>(0);
  const [remoteSize, setRemoteSize] = useState<string>("");
  const [loadError, setLoadError] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!remote || !pdfUrl) return;

    const controller = new AbortController();
    let objectUrl = "";

    (async () => {
      try {
        const res = await fetch(pdfUrl, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const buffer = await res.arrayBuffer();
        if (controller.signal.aborted) return;

        // Re-tag as application/pdf so the browser renders it inline and the
        // download saves a real .pdf instead of an extension-less blob.
        objectUrl = URL.createObjectURL(
          new Blob([buffer], { type: "application/pdf" })
        );

        setBlobUrl(objectUrl);
        setRemotePages(detectPageCount(buffer));
        setRemoteSize(formatFileSize(buffer.byteLength));
        setLoadError("");
      } catch (err) {
        if (controller.signal.aborted) return;
        setLoadError(err instanceof Error ? err.message : "Unable to load PDF");
      }
    })();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [remote, pdfUrl]);

  const isLoading = remote && !blobUrl && !loadError;
  const resolvedUrl = remote ? blobUrl : pdfUrl;
  const resolvedPages = remote ? remotePages || 1 : totalPages;
  const resolvedSize = remote ? remoteSize || fileSize : fileSize;
  const activePage = Math.min(currentPage, resolvedPages);
  const downloadName = fileName.toLowerCase().endsWith(".pdf")
    ? fileName
    : `${fileName}.pdf`;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(resolvedPages, prev + 1));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(200, prev + 25));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(50, prev - 25));
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full text-left">
      {/* ════════ HERO & STATS HEADER MATCHING SCREENSHOT 1 ════════ */}
      <div className="mb-8">
        {!hideHeader && (
          <>
            <span className="text-[#C6112F] text-xs font-black tracking-[0.2em] uppercase block mb-1">
              {isFr ? `ÉDITION ${year}` : `${year} EDITION`}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#101828] dark:text-white tracking-tight mb-3">
              {title}
            </h2>
            <p className="text-neutral-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-normal">
              {description}
            </p>
          </>
        )}

        {/* 3 Info Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 bg-white dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-2xl p-5 md:p-6 shadow-2xs divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-[#233049] transition-colors duration-300">
          {/* Card 1: Date */}
          <div className="md:pr-6 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-slate-800/80 flex items-center justify-center text-neutral-700 dark:text-slate-200 shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
              </svg>
            </div>
            <div>
              <b className="block text-sm sm:text-base font-extrabold text-[#101828] dark:text-white">
                {eventDates ?? (isFr ? `1er – 4 juin ${year}` : `June 1 – 4, ${year}`)}
              </b>
              <span className="text-xs text-neutral-400 dark:text-slate-400 font-medium">
                {isFr ? "Événement de 4 jours" : "4 Days Event"}
              </span>
            </div>
          </div>

          {/* Card 2: Location */}
          <div className="pt-4 md:pt-0 md:px-6 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-slate-800/80 flex items-center justify-center text-neutral-700 dark:text-slate-200 shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <b className="block text-sm sm:text-base font-extrabold text-[#101828] dark:text-white">
                {venue ?? "Centre des Congrès de Québec"}
              </b>
              <span className="text-xs text-neutral-400 dark:text-slate-400 font-medium">
                {isFr ? "Ville de Québec, Canada" : "Quebec City, Canada"}
              </span>
            </div>
          </div>

          {/* Card 3: PDF Document Meta */}
          <div className="pt-4 md:pt-0 md:pl-6 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-slate-800/80 flex items-center justify-center text-neutral-700 dark:text-slate-200 shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <b className="block text-sm sm:text-base font-extrabold text-[#101828] dark:text-white">
                {isLoading
                  ? isFr
                    ? "Chargement du PDF…"
                    : "Loading PDF…"
                  : `PDF, ${resolvedSize} — ${resolvedPages} ${isFr ? "Pages" : "Pages"}`}
              </b>
              <span className="text-xs text-neutral-400 dark:text-slate-400 font-medium">
                {isFr ? "Ordre du jour • Sujet à changement" : "THE Agenda • Subject to change"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ BROCHURE VIEWER MAIN CONTAINER ════════ */}
      <div className="bg-[#F8FAFC] dark:bg-slate-900/60 border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-2.5 sm:p-5 shadow-sm mb-6">
        {/* Mobile Fullscreen Banner */}
        <div className="sm:hidden mb-3 bg-[#C6112F]/10 border border-[#C6112F]/30 p-3 rounded-2xl flex items-center justify-between gap-2 text-xs font-bold text-[#C6112F]">
          <span>{isFr ? "Visualisation PDF Mobile" : "Mobile PDF Reader"}</span>
          {resolvedUrl && (
            <a
              href={resolvedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white font-extrabold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>{isFr ? "Plein Écran ↗" : "Open Fullscreen ↗"}</span>
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
          {/* Left Sidebar Thumbnails (Page 1, 2, 3, 4) */}
          <div className="lg:col-span-3 flex lg:flex-col gap-2.5 sm:gap-3.5 overflow-x-auto lg:overflow-y-auto max-h-[220px] sm:max-h-[350px] lg:max-h-[750px] p-2.5 sm:p-3 bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200/80 dark:border-[#233049] items-center shrink-0 w-full min-w-0">
            {resolvedUrl && Array.from({ length: resolvedPages }, (_, i) => i + 1).map((pgNum) => {
              const isSelected = activePage === pgNum;
              return (
                <button
                  key={pgNum}
                  onClick={() => setCurrentPage(pgNum)}
                  className={`flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer shrink-0 ${isSelected
                      ? "border-[#C6112F] bg-rose-50/50 dark:bg-rose-950/20 shadow-md ring-2 ring-[#C6112F]/20 scale-[1.02]"
                      : "border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 bg-neutral-50 dark:bg-slate-900 hover:scale-[1.01]"
                    }`}
                >
                  {/* Miniature PDF Page Live Preview Container */}
                  <div className="w-[85px] sm:w-[105px] h-[110px] sm:h-[136px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-neutral-300 dark:border-slate-700 relative shadow-2xs">
                    <object
                      data={`${resolvedUrl}#page=${pgNum}&toolbar=0&navpanes=0&view=FitH`}
                      type="application/pdf"
                      className="w-[315px] h-[408px] border-none pointer-events-none origin-top-left transform scale-[0.27] sm:scale-[0.333]"
                    >
                      <iframe
                        src={`${resolvedUrl}#page=${pgNum}&toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-[315px] h-[408px] border-none pointer-events-none origin-top-left transform scale-[0.27] sm:scale-[0.333]"
                        title={`Page ${pgNum} preview`}
                      />
                    </object>
                  </div>
                  <span className={`text-[11px] sm:text-xs font-black ${isSelected ? "text-[#C6112F]" : "text-neutral-500 dark:text-slate-400"}`}>
                    {pgNum}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Main PDF Preview Area */}
          <div className="lg:col-span-9 flex flex-col gap-3 min-w-0">
            {/* Embedded PDF iframe */}
            <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200/90 dark:border-[#233049] shadow-md overflow-hidden p-1.5 sm:p-2">
              {loadError ? (
                <div className="w-full h-[400px] xs:h-[480px] sm:h-[680px] md:h-[780px] rounded-xl border border-neutral-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 text-center px-6">
                  <svg className="w-10 h-10 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5M12 16.5v.01" />
                  </svg>
                  <p className="font-extrabold text-sm text-neutral-800 dark:text-white">
                    {isFr ? "Impossible de charger le PDF" : "Unable to load the PDF"}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-slate-400">{loadError}</p>
                </div>
              ) : !resolvedUrl ? (
                <div className="w-full h-[400px] xs:h-[480px] sm:h-[680px] md:h-[780px] rounded-xl border border-neutral-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
                  <span className="w-8 h-8 rounded-full border-2 border-neutral-200 dark:border-slate-700 border-t-[#C6112F] animate-spin" />
                  <p className="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider">
                    {isFr ? "Chargement du document…" : "Loading document…"}
                  </p>
                </div>
              ) : (
                <object
                  key={`${resolvedUrl}-page-${activePage}-zoom-${zoomLevel}`}
                  data={`${resolvedUrl}#page=${activePage}&zoom=${zoomLevel}&toolbar=0&navpanes=0`}
                  type="application/pdf"
                  className="w-full h-[450px] xs:h-[540px] sm:h-[680px] md:h-[780px] rounded-xl border border-neutral-200 dark:border-slate-800 transition-all duration-300"
                >
                  <iframe
                    key={`iframe-${resolvedUrl}-page-${activePage}-zoom-${zoomLevel}`}
                    src={`${resolvedUrl}#page=${activePage}&zoom=${zoomLevel}&toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full rounded-xl border-none"
                    title={`${year} Brochure Document`}
                  />
                </object>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="bg-white dark:bg-[#131b2e] p-2.5 sm:p-3 rounded-2xl border border-neutral-200/90 dark:border-[#233049] shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
              {/* Page Control */}
              <div className="bg-neutral-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 flex items-center gap-2 sm:gap-3 text-xs font-mono font-extrabold text-neutral-800 dark:text-white">
                <button
                  onClick={handlePrevPage}
                  disabled={activePage <= 1}
                  className="w-7 h-7 rounded flex items-center justify-center text-neutral-700 dark:text-slate-200 hover:bg-neutral-200 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer transition-all text-sm font-black"
                >
                  ‹
                </button>
                <span className="text-[11px] sm:text-xs">
                  {activePage} / {resolvedPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={activePage >= resolvedPages}
                  className="w-7 h-7 rounded flex items-center justify-center text-neutral-700 dark:text-slate-200 hover:bg-neutral-200 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer transition-all text-sm font-black"
                >
                  ›
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="bg-neutral-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 flex items-center gap-2 sm:gap-3 text-xs font-mono font-extrabold text-neutral-800 dark:text-white">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  className="w-7 h-7 rounded flex items-center justify-center text-neutral-700 dark:text-slate-200 hover:bg-neutral-200 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer transition-all text-sm font-black"
                >
                  −
                </button>
                <span className="min-w-[36px] sm:min-w-[40px] text-center text-[11px] sm:text-xs">{zoomLevel}%</span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  className="w-7 h-7 rounded flex items-center justify-center text-neutral-700 dark:text-slate-200 hover:bg-neutral-200 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer transition-all text-sm font-black"
                >
                  +
                </button>
              </div>

              {/* Search Control */}
              <div className="bg-neutral-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded-xl px-3 py-1 flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-slate-300 flex-grow max-w-full xs:max-w-[200px] sm:max-w-[240px]">
                <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search document..."
                  className="bg-transparent border-none outline-none text-neutral-800 dark:text-white placeholder-neutral-400 text-xs w-full font-sans"
                />
              </div>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                type="button"
                className="bg-neutral-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-extrabold uppercase text-neutral-800 dark:text-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 text-neutral-700 dark:text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="hidden xs:inline">Fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ BOTTOM PROMINENT ACTION BUTTONS ════════ */}
      {(() => {
        const isAgenda =
          (fileName && fileName.toLowerCase().includes("agenda")) ||
          (title && title.toLowerCase().includes("agenda")) ||
          (pdfUrl && pdfUrl.toLowerCase().includes("agenda"));
        const docLabel = isAgenda
          ? isFr ? "L'AGENDA" : "AGENDA"
          : isFr ? "LA BROCHURE" : "BROCHURE";

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DOWNLOAD BUTTON */}
            <a
              href={resolvedUrl || undefined}
              download={downloadName}
              type="application/pdf"
              aria-disabled={!resolvedUrl}
              className={`w-full py-4 px-6 bg-[#C6112F] text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-[#C6112F]/20 transition-all duration-300 flex items-center justify-center gap-3 text-center ${
                resolvedUrl
                  ? "hover:bg-[#a80e27] hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                  : "opacity-60 pointer-events-none"
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>
                {resolvedUrl
                  ? `${isFr ? "TÉLÉCHARGER" : "DOWNLOAD"} ${docLabel}`
                  : isFr ? "PRÉPARATION..." : "PREPARING DOWNLOAD…"}
              </span>
            </a>

            {/* SHARE BUTTON */}
            <button
              onClick={handleShare}
              type="button"
              className="w-full py-4 px-6 bg-white dark:bg-[#131b2e] border border-neutral-300 dark:border-[#233049] hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-800 dark:text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 text-center cursor-pointer"
            >
              <svg className="w-5 h-5 text-neutral-600 dark:text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span>
                {copied
                  ? isFr ? "LIEN COPIÉ DANS LE PRESSE-PAPIERS !" : "LINK COPIED TO CLIPBOARD!"
                  : `${isFr ? "PARTAGER" : "SHARE"} ${docLabel}`}
              </span>
            </button>
          </div>
        );
      })()}
    </div>
  );
}
