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
  if (item.pdfUrl && typeof item.pdfUrl === "string" && item.pdfUrl.trim()) {
    rawUrl = item.pdfUrl.trim();
  } else if (item.pdf && typeof item.pdf === "string" && item.pdf.trim()) {
    rawUrl = item.pdf.trim();
  } else if (item.pdfAttachment) {
    if (typeof item.pdfAttachment === "string" && item.pdfAttachment.trim()) {
      rawUrl = item.pdfAttachment.trim();
    } else if (typeof item.pdfAttachment === "object" && item.pdfAttachment.url && typeof item.pdfAttachment.url === "string") {
      rawUrl = item.pdfAttachment.url.trim();
    }
  }

  if (!rawUrl && item.content && typeof item.content === "string") {
    const match = item.content.match(/(https?:\/\/[^\s"']+\.pdf|\/[^\s"']+\.pdf)/i);
    if (match) rawUrl = match[0];
  }

  // Only return a PDF URL if one was attached from the backend
  if (!rawUrl) return null;

  // Convert localhost / relative backend paths to live backend server URL
  if (rawUrl.startsWith("http://localhost:5000") || rawUrl.startsWith("http://localhost:3000") || rawUrl.startsWith("http://127.0.0.1:5000")) {
    rawUrl = rawUrl.replace(/^http:\/\/(localhost|127\.0\.0\.1):(5000|3000)/, "https://mining-investment-backend.vercel.app");
  } else if (rawUrl.startsWith("/uploads/")) {
    rawUrl = `https://mining-investment-backend.vercel.app${rawUrl}`;
  } else if (rawUrl.startsWith("uploads/")) {
    rawUrl = `https://mining-investment-backend.vercel.app/${rawUrl}`;
  } else if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://") && !rawUrl.startsWith("/")) {
    rawUrl = "/" + rawUrl;
  }

  return rawUrl;
}

// Opens a PDF in Google Docs Viewer so it displays inline instead of downloading
function openPdfUrl(rawUrl: string): string {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=false`;
}

export default function SingleNewsflashPage() {
  const params = useParams();
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [article, setArticle] = useState<ApiNewsflashItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);

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
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = article?.title || "THE Mining Investment Event Newsflash";

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareTitle)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;

  const handleCopyLink = async () => {
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

  const coverImage = article?.image || "/news/hero_1.png";

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f8fafc] text-left pt-24 sm:pt-28 pb-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 w-full">
          {/* Top Header Actions / Breadcrumb Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <button
              onClick={() => router.push("/newsflash")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold transition-all cursor-pointer border border-neutral-200/90 shadow-2xs group"
            >
              <svg className="w-4 h-4 text-[#C6112F] group-hover:-translate-x-0.5 transition-transform" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to All Newsflash</span>
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500 flex-wrap">
              <a href="/" className="hover:text-[#C6112F] transition-colors">{t("nav-home", "Home")}</a>
              <span>&lt;</span>
              <a href="/newsflash" className="hover:text-[#C6112F] transition-colors">{t("nav-newsflash", "THE Newsflash")}</a>
              <span>&lt;</span>
              <span className="text-neutral-900 font-extrabold truncate max-w-[200px]">
                {article?.title || "Article"}
              </span>
            </nav>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-neutral-200/80 my-8">
              <div className="w-12 h-12 border-4 border-[#C6112F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-neutral-600 font-bold text-sm">Loading Full Article...</p>
            </div>
          ) : error || !article ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-neutral-200/80 my-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-3">{error || "Article Not Found"}</h3>
              <button
                onClick={() => router.push("/newsflash")}
                className="px-6 py-2.5 bg-[#C6112F] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
              >
                Return to Newsflash
              </button>
            </div>
          ) : (
            <article className="bg-white rounded-3xl shadow-md border border-neutral-200/90 overflow-hidden">
              {/* Clean White Article Header (NO BACKGROUND IMAGE) */}
              <div className="p-6 sm:p-10 md:p-12 border-b border-neutral-100 bg-white">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3.5 py-1 bg-[#C6112F]/10 border border-[#C6112F]/20 text-[#C6112F] text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                    {article.category || "Newsflash"}
                  </span>
                  <span className="px-3.5 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-full border border-neutral-200 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    {article.date || article.publishedAt?.slice(0, 10) || "Recent Release"}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-900 leading-tight tracking-tight mb-6">
                  {article.title}
                </h1>

                {/* Publisher Avatar & Share Action Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-neutral-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#C6112F] text-white font-black text-lg flex items-center justify-center shadow-md shrink-0">
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

                  {/* PDF Button + Social Share Controls */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Social Share Buttons */}
                    <div className="flex items-center gap-1.5 bg-neutral-50 p-1.5 rounded-xl border border-neutral-200/80">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider px-2 hidden xs:inline-block">
                        Share:
                      </span>
                      <a
                        href={linkedinShareUrl}
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
                        href={twitterShareUrl}
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
                        href={facebookShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on Facebook"
                        className="w-8 h-8 rounded-lg bg-white hover:bg-[#1877F2] text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-2xs border border-neutral-200/80"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z" />
                        </svg>
                      </a>
                      <button
                        onClick={handleCopyLink}
                        title="Copy News Link"
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold transition-all border border-neutral-200/80 flex items-center gap-1 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 text-neutral-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.75v-6.75" />
                        </svg>
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>

                    {pdfUrl && (
                      <a
                        href={openPdfUrl(pdfUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span>OPEN PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Article Body Content */}
              <div className="p-6 sm:p-10 md:p-12 text-left space-y-6">
                {article.subheading && (
                  <div className="bg-rose-50/90 border-l-4 border-[#C6112F] p-5 sm:p-6 rounded-r-2xl text-neutral-900 text-base sm:text-lg font-semibold leading-relaxed shadow-2xs">
                    "{article.subheading}"
                  </div>
                )}

                <div className="space-y-4 text-neutral-800 text-base sm:text-lg leading-relaxed font-normal">
                  {article.content
                    ? article.content
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

                {pdfUrl && (
                  <div className="mt-8 p-6 bg-neutral-50 border border-neutral-200/90 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                    <div>
                      <h4 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider mb-1">
                        Official PDF Press Document Attached
                      </h4>
                      <p className="text-xs text-neutral-600 font-medium">
                        Click below to view the official press release PDF file.
                      </p>
                    </div>
                    <a
                      href={openPdfUrl(pdfUrl!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-[#C6112F] text-white text-xs font-black uppercase tracking-wider hover:bg-[#a50e27] transition-all shadow-md shrink-0"
                    >
                      View PDF
                    </a>
                  </div>
                )}

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
                      className="px-6 py-2.5 rounded-xl bg-neutral-100 text-neutral-800 hover:bg-neutral-200 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      All Newsflash
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>

        <div className="mt-16">
          <GetInTouchCTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
