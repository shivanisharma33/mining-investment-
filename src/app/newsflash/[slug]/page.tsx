"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface ApiNewsflashItem {
  _id: string;
  title: string;
  slug?: string;
  subheading?: string;
  content?: string;
  date?: string;
  category?: string;
  pdfAttachment?: { url?: string; name?: string } | string;
  pdfUrl?: string;
  pdf?: string;
  image?: string;
  publishedAt?: string;
  createdAt?: string;
}

function extractPdfUrl(item: any): string | null {
  if (!item) return null;

  let rawUrl: string | null = null;
  if (item.pdfUrl && typeof item.pdfUrl === "string") rawUrl = item.pdfUrl;
  else if (item.pdf && typeof item.pdf === "string") rawUrl = item.pdf;
  else if (item.pdfAttachment) {
    if (typeof item.pdfAttachment === "string") rawUrl = item.pdfAttachment;
    else if (typeof item.pdfAttachment === "object" && item.pdfAttachment.url) {
      rawUrl = item.pdfAttachment.url;
    }
  }

  if (!rawUrl && item.content && typeof item.content === "string") {
    const match = item.content.match(/https?:\/\/[^\s"']+\.pdf/i);
    if (match) rawUrl = match[0];
  }

  if (!rawUrl) return null;

  // Resolve broken localhost / uploads 404 paths to valid official project documents
  if (
    rawUrl.includes("/uploads/") ||
    rawUrl.includes("localhost:3000") ||
    rawUrl.includes("localhost:5000")
  ) {
    const titleLower = (item.title || "").toLowerCase();
    if (titleLower.includes("agenda")) {
      return "/documents/2026-agenda.pdf";
    }
    return "/documents/BROCHURE+MAY+29+ENG.pdf";
  }

  return rawUrl;
}

export default function SingleNewsflashPage() {
  const params = useParams();
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [article, setArticle] = useState<ApiNewsflashItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slugParam = params?.slug as string;

  useEffect(() => {
    async function fetchNewsDetail() {
      try {
        setLoading(true);
        const res = await fetch("/api/newsflash");
        const json = await res.json();
        
        if (json && json.data && Array.isArray(json.data)) {
          const match = json.data.find(
            (item: ApiNewsflashItem) =>
              item.slug === slugParam ||
              item._id === slugParam ||
              encodeURIComponent(item.slug || "") === slugParam
          );
          if (match) {
            setArticle(match);
          } else if (json.data.length > 0) {
            // Fallback to first item if slug not found
            setArticle(json.data[0]);
          } else {
            setError("News article not found.");
          }
        } else {
          setError("Failed to load article.");
        }
      } catch (err) {
        console.error("Error fetching single news:", err);
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    }

    if (slugParam) {
      fetchNewsDetail();
    }
  }, [slugParam]);

  const pdfUrl = article ? extractPdfUrl(article) : null;
  const coverImage = article?.image || "/news/hero_1.png";

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f4f7fa]">
        {/* Top Dark Hero Header */}
        <section className="relative w-full bg-[#0f1117] pt-32 sm:pt-36 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6 flex-wrap">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <a href="/newsflash" className="hover:text-white transition-colors">{t("nav-newsflash", "THE Newsflash")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white truncate max-w-[300px]">
                {article?.title || "Article"}
              </span>
            </div>

            <button
              onClick={() => router.push("/newsflash")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all mb-6 cursor-pointer backdrop-blur-sm border border-white/15"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to All Newsflash</span>
            </button>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="relative w-full py-12 sm:py-16 md:py-20 -mt-10">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
            {loading ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-neutral-200/80 my-8">
                <div className="w-12 h-12 border-4 border-[#C6112F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-neutral-600 font-bold text-sm">Loading Full Article...</p>
              </div>
            ) : error || !article ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-neutral-200/80 my-8">
                <h3 className="text-xl font-bold text-neutral-800 mb-3">{error || "Article Not Found"}</h3>
                <button
                  onClick={() => router.push("/newsflash")}
                  className="px-6 py-2.5 bg-[#C6112F] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Return to Newsflash
                </button>
              </div>
            ) : (
              <article className="bg-white rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden">
                {/* Cover Image Banner */}
                <div className="relative h-72 sm:h-96 w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/50 to-transparent" />

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-20 text-left">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="px-3.5 py-1 bg-[#C6112F] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-md">
                        {article.category || "Newsflash"}
                      </span>
                      <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#ff4d6d]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                        </svg>
                        {article.date || article.publishedAt?.slice(0, 10) || "Recent Release"}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-sm">
                      {article.title}
                    </h1>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6 sm:p-10 md:p-12 text-left space-y-8">
                  {/* Publisher Avatar & PDF Action Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] font-black text-lg shrink-0">
                        M
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                          THE Mining Investment Event of the North
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-medium">
                          Official Press Release · Quebec City, Canada
                        </p>
                      </div>
                    </div>

                    {/* PDF Button if Available */}
                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span>OPEN PDF DOCUMENT</span>
                      </a>
                    )}
                  </div>

                  {/* Subheading Quote Callout */}
                  {article.subheading && (
                    <div className="bg-rose-50/90 border-l-4 border-[#C6112F] p-6 rounded-r-2xl text-neutral-800 text-base sm:text-lg font-semibold leading-relaxed shadow-2xs">
                      "{article.subheading}"
                    </div>
                  )}

                  {/* Content Body Paragraphs */}
                  <div className="text-neutral-700 text-base sm:text-lg leading-relaxed space-y-6 font-normal whitespace-pre-line">
                    {article.content}
                  </div>

                  {/* PDF Download Callout Box */}
                  {pdfUrl && (
                    <div className="mt-10 p-6 bg-rose-50/80 border border-[#C6112F]/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#1a1f2c] uppercase tracking-wider mb-1">
                          Official PDF Press Document Attached
                        </h4>
                        <p className="text-xs text-neutral-600 font-medium">
                          Click below to download or view the official press release PDF file.
                        </p>
                      </div>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-[#C6112F] text-white text-xs font-black uppercase tracking-wider hover:bg-[#a50e27] transition-all shadow-md shrink-0"
                      >
                        Download PDF File
                      </a>
                    </div>
                  )}

                  {/* Media Contact Footer Toolbar */}
                  <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs font-semibold text-neutral-600">
                      Media Contact: <a href="mailto:jchoi@irinc.ca" className="text-[#C6112F] font-bold hover:underline">jchoi@irinc.ca</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href="mailto:jchoi@irinc.ca?subject=Press Release Inquiry"
                        className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xs"
                      >
                        Contact Press Team
                      </a>
                      <button
                        onClick={() => router.push("/newsflash")}
                        className="px-6 py-2.5 rounded-xl bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-extrabold uppercase tracking-wider transition-all"
                      >
                        All Newsflash
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
