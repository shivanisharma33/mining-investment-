"use client";

import React, { useState, useRef } from "react";

interface AgendaPdfViewerProps {
  pdfUrl?: string;
  totalPages?: number;
  fileName?: string;
  year?: number;
}

export default function AgendaPdfViewer({
  pdfUrl = "/documents/2026-agenda.pdf",
  totalPages = 4,
  fileName = "2026-agenda.pdf",
  year = 2026,
}: AgendaPdfViewerProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
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

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, "_blank");
    if (printWindow) {
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
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
    <div ref={containerRef} className="w-full bg-[#F3F5F8] border border-neutral-200/90 rounded-3xl p-3 sm:p-6 shadow-sm">
      {/* ════════ TOP ACTION BUTTONS BAR ════════ */}
      <div className="bg-white/80 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border border-neutral-200/90 shadow-2xs mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* 1. DOWNLOAD PDF */}
          <a
            href={pdfUrl}
            download={fileName}
            className="w-full py-3 px-4 bg-[#C6112F] hover:bg-[#a80e27] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-center"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>DOWNLOAD PDF</span>
          </a>

          {/* 2. OPEN PDF */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-white/90 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 text-center"
          >
            <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>OPEN PDF</span>
          </a>

          {/* 3. SHARE */}
          <button
            onClick={handleShare}
            type="button"
            className="w-full py-3 px-4 bg-white/90 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 text-center cursor-pointer relative"
          >
            <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>{copied ? "COPIED!" : "SHARE"}</span>
          </button>

          {/* 4. PRINT */}
          <button
            onClick={handlePrint}
            type="button"
            className="w-full py-3 px-4 bg-white/90 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
          >
            <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>PRINT</span>
          </button>
        </div>
      </div>

      {/* ════════ PDF TOOLBAR & CONTROLS ════════ */}
      <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-neutral-200/90 shadow-2xs mb-4 flex flex-wrap items-center justify-between gap-3">
        {/* Page Switcher Control */}
        <div className="bg-[#F8FAFC] border border-neutral-300/80 rounded-xl px-3 py-2 flex items-center gap-3 text-xs font-mono font-extrabold text-neutral-800 shadow-2xs">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-neutral-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
            title="Previous Page"
          >
            ‹
          </button>
          <span className="tracking-wider">
            PAGE {currentPage} OF {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-neutral-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
            title="Next Page"
          >
            ›
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="bg-[#F8FAFC] border border-neutral-300/80 rounded-xl px-3 py-2 flex items-center gap-3 text-xs font-mono font-extrabold text-neutral-800 shadow-2xs">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-neutral-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all text-sm"
            title="Zoom Out"
          >
            −
          </button>
          <span className="min-w-[45px] text-center tracking-wider">{zoomLevel}%</span>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-neutral-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all text-sm"
            title="Zoom In"
          >
            +
          </button>
        </div>

        {/* Search Field */}
        <div className="bg-[#F8FAFC] border border-neutral-300/80 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-neutral-600 shadow-2xs flex-grow max-w-[280px]">
          <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document..."
            className="bg-transparent border-none outline-hidden text-neutral-800 placeholder-neutral-400 text-xs w-full font-sans"
          />
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={handleFullscreen}
          type="button"
          className="bg-[#F8FAFC] border border-neutral-300/80 hover:bg-neutral-100 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-extrabold uppercase text-neutral-800 shadow-2xs transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 text-neutral-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>FULLSCREEN</span>
        </button>
      </div>

      {/* ════════ EMBEDDED PDF IFRAME VIEWER ════════ */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xl overflow-hidden p-1.5 sm:p-3">
        <iframe
          src={`${pdfUrl}#page=${currentPage}&zoom=${zoomLevel}&toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-[750px] sm:h-[920px] rounded-xl border border-neutral-200"
          title={`${year} Agenda Document`}
        />
      </div>
    </div>
  );
}
