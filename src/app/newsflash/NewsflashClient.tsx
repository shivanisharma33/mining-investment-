"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import NewsflashSubscribeSection from "@/components/NewsflashSubscribeSection";
import { useLanguage } from "@/context/LanguageContext";
import { PressRelease } from "@/lib/newsflashApi";

// Opens a PDF in Google Docs Viewer so it displays inline instead of downloading
function openPdfUrl(rawUrl: string): string {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=false`;
}

const fallbackData: PressRelease[] = [
  {
    id: "1",
    title: "Keynote Speakers and Panels Announcement",
    slug: "keynote-speakers-and-panels-announcement",
    date: "April 14, 2026",
    summary: "THE Mining Investment Event announces its keynote speakers and panel line-up for the 2026 conference in Quebec City.",
    body: "THE Mining Investment Event of the North is pleased to announce its distinguished keynote speakers and executive panel line-up for the upcoming 2026 conference at the Centre des congrès de Québec.",
  },
  {
    id: "2",
    title: "THE Mining Investment Event Announces 2026 Issuers and Welcomes Partners",
    slug: "the-mining-investment-event-announces-2026-issuers",
    date: "February 19, 2026",
    summary: "THE Mining Investment Event unveils its 2026 issuer roster and welcomes new and returning partners.",
    body: "Organizers of THE Mining Investment Event are proud to unveil the initial lineup of participating public mining companies and sponsors.",
  },
  {
    id: "3",
    title: "In Collaboration with ITFA and AMQ, Announces International Mining Week in Quebec City",
    slug: "in-collaboration-with-itfa-and-amq-announces-international-mining-week",
    date: "October 8, 2025",
    summary: "THE Mining Investment Event, in collaboration with ITFA and AMQ, announces International Mining Week in Quebec City.",
    body: "THE Mining Investment Event, together with the International Trade and Finance Association (ITFA) and Association minière du Québec (AMQ), is thrilled to announce Quebec City's inaugural International Mining Week.",
  },
];

export default function NewsflashClient({
  initialItems,
}: {
  initialItems: PressRelease[];
}) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  // Fetched on the server, so the list is in the HTML — no client-side wait.
  const newsItems = initialItems.length > 0 ? initialItems : fallbackData;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalItem, setActiveModalItem] = useState<PressRelease | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const filteredNews = newsItems.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      (item.summary && item.summary.toLowerCase().includes(query)) ||
      (item.body && item.body.toLowerCase().includes(query))
    );
  });

  const featuredArticle = searchQuery === "" ? filteredNews[0] : null;
  const remainingNews = featuredArticle ? filteredNews.slice(1) : filteredNews;

  const totalPages = Math.max(1, Math.ceil(remainingNews.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = remainingNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f4f7fa]">
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/15 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("nav-newsflash", "THE Press Release")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("news-hero-title-1", "THE")} <span className="text-[#C6112F]">{t("news-hero-title-2", "Press Release")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mt-6" />
          </div>
        </section>

        {/* ═══════ NEWS FEED SECTION ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("news-latest-label", "LATEST PRESS RELEASES")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("news-section-title-1", "Stay Informed with")} <span className="text-[#C6112F]">{t("news-section-title-2", "THE Press Releases")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[700px] mb-10 font-medium">
              {t(
                "news-section-desc",
                "The latest press releases, announcements and official updates from THE Mining Investment Event. Subscribe to stay current with conference programming, speaker announcements, and initiative updates."
              )}
            </p>

            {/* Search Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <span className="text-xs font-bold tracking-wider text-neutral-500">
                {filteredNews.length}{" "}
                {filteredNews.length === 1 ? "press release" : "press releases"}
              </span>

              {/* Search Box */}
              <div className="relative w-full md:w-72 shrink-0">
                <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder={lang === "FR" ? "Rechercher..." : "Search updates..."}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200/90 rounded-full text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#C6112F] transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* 🌟 FEATURED RELEASE CARD 🌟 */}
            {featuredArticle && (
              <div className="mb-10">
                <article className="group relative bg-[#0f1117] rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800 hover:border-[#C6112F]/60 transition-all duration-300 overflow-hidden text-left">
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="bg-[#C6112F] text-white text-[10px] font-black tracking-[0.2em] uppercase px-3.5 py-1 rounded-full shadow-md">
                          FEATURED RELEASE
                        </span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-neutral-300 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm">
                          <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                          </svg>
                          {featuredArticle.date}
                        </span>

                        {/* PDF Badge on Featured Card */}
                        {featuredArticle.pdfUrl && (
                          <a
                            href={openPdfUrl(featuredArticle.pdfUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 shadow-md"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span>Open PDF</span>
                          </a>
                        )}
                      </div>

                      <h3
                        onClick={() => router.push(`/newsflash/${featuredArticle.slug}`)}
                        className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3 group-hover:text-[#C6112F] transition-colors duration-300 cursor-pointer"
                      >
                        {featuredArticle.title}
                      </h3>

                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal max-w-[800px] line-clamp-3">
                        {featuredArticle.summary || featuredArticle.body}
                      </p>
                    </div>

                    <div className="lg:col-span-4 flex lg:justify-end gap-3 flex-wrap">
                      <button
                        onClick={() => router.push(`/newsflash/${featuredArticle.slug}`)}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#C6112F] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#a50e27] transition-all duration-300 shadow-md group-hover:scale-105 cursor-pointer"
                      >
                        <span>Read Full Story</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* 🌟 CARDS GRID FOR NEWS ITEMS (PAGINATED) 🌟 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedNews.map((item) => {
                  const pdfUrl = item.pdfUrl;
                  const articleSlug = item.slug;

                  return (
                    <article
                      key={item.id}
                      className="group relative bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-[0_16px_36px_rgba(198,17,47,0.08)] hover:border-[#C6112F]/40 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden text-left"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6112F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Date & Type Tag */}
                        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                          <div className="px-3 py-1 bg-neutral-100/90 rounded-full text-neutral-600 font-semibold text-[11px] flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                            </svg>
                            <span>{item.date}</span>
                          </div>

                          <span className="px-3 py-1 bg-[#C6112F]/10 text-[#C6112F] group-hover:bg-[#C6112F] group-hover:text-white text-[10px] font-bold tracking-wider uppercase rounded-full transition-colors duration-300">
                            Press Release
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => router.push(`/newsflash/${articleSlug}`)}
                          className="text-base sm:text-lg font-black text-[#1a1f2c] leading-snug mb-3 group-hover:text-[#C6112F] transition-colors duration-300 cursor-pointer line-clamp-3"
                        >
                          {item.title}
                        </h3>

                        {/* Snippet / Subheading */}
                        <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                          {item.summary || item.body}
                        </p>
                      </div>

                      {/* PDF Button & Read Full News Link Footer Row */}
                      <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 mt-auto">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/newsflash/${articleSlug}`}
                            className="text-xs font-bold tracking-wider uppercase text-neutral-800 group-hover:text-[#C6112F] transition-colors inline-flex items-center gap-1"
                          >
                            <span>Read Full News</span>
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>

                        {/* 📄 View PDF Button (Shown when news contains PDF) 📄 */}
                        {pdfUrl && (
                          <a
                            href={openPdfUrl(pdfUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 rounded-full bg-[#C6112F]/10 hover:bg-[#C6112F] text-[#C6112F] hover:text-white border border-[#C6112F]/30 text-[11px] font-black tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-2xs group/pdf cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5 text-[#C6112F] group-hover/pdf:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span>VIEW PDF</span>
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
            </div>

            {/* 🌟 EXECUTIVE PAGINATION CONTROLS 🌟 */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-neutral-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
                {/* Status Readout */}
                <div className="text-xs font-semibold text-neutral-600">
                  Showing <span className="font-extrabold text-neutral-900">{startIndex + 1}</span> - <span className="font-extrabold text-neutral-900">{Math.min(startIndex + ITEMS_PER_PAGE, remainingNews.length)}</span> of <span className="font-extrabold text-[#C6112F]">{remainingNews.length}</span> press releases
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${currentPage === 1
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                        : "bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-300 shadow-2xs"
                      }`}
                  >
                    ‹ Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${isActive
                            ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20 scale-105"
                            : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 shadow-2xs"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${currentPage === totalPages
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                        : "bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-300 shadow-2xs"
                      }`}
                  >
                    Next ›
                  </button>
                </div>
              </div>
            )}

            {/* Subscribe footer */}
            <div className="mt-16 text-center bg-white border border-neutral-200/80 rounded-3xl p-8 shadow-2xs">
              <p className="text-neutral-600 text-sm font-medium">
                {t("news-subscribe-text", "For more information and to subscribe to THE Newsflash, contact")}{" "}
                <a href="mailto:jchoi@irinc.ca" className="text-[#C6112F] font-bold hover:underline ml-1">
                  jchoi@irinc.ca
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 QUICK PREVIEW MODAL IF CLICKED 🌟 */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-neutral-200/90 relative overflow-hidden my-auto max-h-[92vh] flex flex-col text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-[#C6112F] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer group"
                aria-label="Close Story"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Clean Editorial Header (NO BACKGROUND IMAGE) */}
              <div className="p-6 sm:p-8 md:p-10 border-b border-neutral-100 bg-white">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="px-3.5 py-1 bg-[#C6112F]/10 border border-[#C6112F]/20 text-[#C6112F] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Press Release
                  </span>
                  <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-full border border-neutral-200 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    {activeModalItem.date}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 leading-tight tracking-tight">
                  {activeModalItem.title}
                </h2>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-6 flex-1">
                {activeModalItem.summary && (
                  <div className="bg-rose-50/80 border-l-4 border-[#C6112F] p-5 rounded-r-2xl text-neutral-800 text-sm sm:text-base font-semibold leading-relaxed">
                    "{activeModalItem.summary}"
                  </div>
                )}

                <div className="space-y-3.5 text-neutral-700 text-sm sm:text-base leading-relaxed font-medium">
                  {activeModalItem.body
                    ? activeModalItem.body
                      .split(/\n+/)
                      .map((p) => p.trim())
                      .filter(Boolean)
                      .map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                    : null}
                </div>

                {/* PDF Option in Modal */}
                {activeModalItem.pdfUrl && (
                  <div className="p-5 bg-rose-50 border border-[#C6112F]/20 rounded-2xl flex items-center justify-between gap-4">
                    <span className="text-xs font-extrabold text-[#1a1f2c]">PDF Attachment Available</span>
                    <a
                      href={openPdfUrl(activeModalItem.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-xl bg-[#C6112F] text-white text-xs font-black uppercase shadow-md"
                    >
                      View PDF
                    </a>
                  </div>
                )}

                {/* Footer Toolbar */}
                <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Social Share Buttons */}
                  <div className="flex items-center gap-1.5 bg-neutral-50 p-1.5 rounded-xl border border-neutral-200/80 w-full sm:w-auto justify-center">
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider px-2">
                      Share:
                    </span>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        typeof window !== "undefined"
                          ? `${window.location.origin}/newsflash/${activeModalItem.slug}`
                          : ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on LinkedIn"
                      className="w-8 h-8 rounded-lg bg-white hover:bg-[#0A66C2] text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs border border-neutral-200/80"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        typeof window !== "undefined"
                          ? `${window.location.origin}/newsflash/${activeModalItem.slug}`
                          : ""
                      )}&text=${encodeURIComponent(activeModalItem.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on X (Twitter)"
                      className="w-8 h-8 rounded-lg bg-white hover:bg-black text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs border border-neutral-200/80"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        typeof window !== "undefined"
                          ? `${window.location.origin}/newsflash/${activeModalItem.slug}`
                          : ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on Facebook"
                      className="w-8 h-8 rounded-lg bg-white hover:bg-[#1877F2] text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs border border-neutral-200/80"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z" />
                      </svg>
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const slug = activeModalItem.slug;
                        setActiveModalItem(null);
                        router.push(`/newsflash/${slug}`);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                    >
                      Open Full Page
                    </button>
                    <button
                      onClick={() => setActiveModalItem(null)}
                      className="px-6 py-2.5 rounded-xl bg-[#C6112F] text-white text-xs font-black uppercase tracking-wider hover:bg-[#a50e27] transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <NewsflashSubscribeSection />
        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
