import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import NewsflashSubscribeSection from "@/components/NewsflashSubscribeSection";
import ShareBar from "./ShareBar";
import {
  fetchPressReleaseBySlug,
  estimateReadingTime,
} from "@/lib/newsflashApi";

// Must be a literal — Next statically analyses segment config exports.
// Keep in sync with NEWSFLASH_REVALIDATE_SECONDS in @/lib/newsflashApi.
export const revalidate = 300;

// Opens a PDF in Google Docs Viewer so it displays inline instead of downloading
function openPdfUrl(rawUrl: string): string {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=false`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const result = await fetchPressReleaseBySlug(slug);
    if (!result) return { title: "Press Release Not Found" };

    const { article } = result;
    const description =
      article.summary?.trim() ||
      article.body?.trim().slice(0, 200) ||
      "A press release from THE Mining Investment Event.";

    return {
      title: `${article.title} | THE Mining Investment Event`,
      description,
      openGraph: {
        type: "article",
        title: article.title,
        description,
        publishedTime: article.isoDate,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
      },
    };
  } catch {
    return { title: "THE Press Release" };
  }
}

export default async function NewsflashArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await fetchPressReleaseBySlug(slug);

  if (!result) notFound();

  const { article, related } = result;
  const readingMinutes = estimateReadingTime(article.body);
  const publishedOn = article.date;
  const pdfUrl = article.pdfUrl;

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f8fafc] dark:bg-[#09090b] text-left pt-24 sm:pt-28 pb-16 transition-colors duration-300">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 md:px-8 w-full">
          {/* Breadcrumb + back */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <Link
              href="/newsflash"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#18181b] hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-800 dark:text-zinc-200 text-xs font-bold transition-all border border-neutral-200/90 dark:border-zinc-800 shadow-2xs group"
            >
              <svg className="w-4 h-4 text-[#C6112F] group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>All Press Release</span>
            </Link>

            <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-zinc-400 flex-wrap">
              <Link href="/" className="hover:text-[#C6112F] transition-colors">Home</Link>
              <span className="text-[#C6112F]">›</span>
              <Link href="/newsflash" className="hover:text-[#C6112F] transition-colors">THE Press Release</Link>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-900 dark:text-white font-extrabold truncate max-w-[220px]">
                {article.title}
              </span>
            </nav>
          </div>

          <article className="bg-white dark:bg-[#121215] rounded-3xl shadow-md border border-neutral-200/90 dark:border-zinc-800 overflow-hidden transition-colors">
            {/* Header */}
            <header className="p-6 sm:p-10 md:p-12 border-b border-neutral-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                <span className="px-3.5 py-1 bg-[#C6112F]/10 dark:bg-[#C6112F]/20 border border-[#C6112F]/20 dark:border-[#C6112F]/30 text-[#C6112F] dark:text-[#ff4d6d] text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                  Press Release
                </span>
                {publishedOn && (
                  <span className="px-3.5 py-1 bg-neutral-100 dark:bg-zinc-800/80 text-neutral-700 dark:text-zinc-300 text-xs font-semibold rounded-full border border-neutral-200 dark:border-zinc-700 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    {publishedOn}
                  </span>
                )}
                <span className="px-3.5 py-1 bg-neutral-100 dark:bg-zinc-800/80 text-neutral-700 dark:text-zinc-300 text-xs font-semibold rounded-full border border-neutral-200 dark:border-zinc-700 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                  </svg>
                  {readingMinutes} min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-[42px] font-black text-neutral-900 dark:text-white leading-[1.15] tracking-tight text-balance">
                {article.title}
              </h1>

              {article.summary && (
                <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-zinc-300 leading-relaxed font-medium border-l-4 border-[#C6112F] pl-5">
                  {article.summary}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-neutral-100 dark:border-zinc-800">
                <ShareBar title={article.title} />

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
                    <span>Open PDF</span>
                  </a>
                )}
              </div>
            </header>

            {/* Body */}
            <div className="p-6 sm:p-10 md:p-12">
              {article.bodyHtml ? (
                // Strapi rich text, stripped back to semantic tags in the API
                // layer so the styles below govern how it reads.
                <div
                  className="press-body"
                  dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
                />
              ) : (
                <p className="text-sm text-neutral-500 dark:text-zinc-400 font-medium">
                  The full text of this release is available in the attached PDF.
                </p>
              )}

              {pdfUrl && (
                <div className="mt-10 p-6 bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/90 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider mb-1">
                      Official PDF press document
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-zinc-400 font-medium">
                      View the official press release exactly as issued.
                    </p>
                  </div>
                  <a
                    href={openPdfUrl(pdfUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-5 py-2.5 rounded-xl bg-[#0f1117] dark:bg-zinc-800 hover:bg-[#C6112F] dark:hover:bg-[#C6112F] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md"
                  >
                    Open PDF
                  </a>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">
                  For media enquiries, contact{" "}
                  <a href="mailto:jchoi@irinc.ca" className="text-[#C6112F] font-bold hover:underline">
                    jchoi@irinc.ca
                  </a>
                </p>
                <ShareBar title={article.title} />
              </div>
            </div>
          </article>

          {/* Related releases */}
          {related.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center gap-4 mb-6">
                <b className="text-xs font-extrabold text-[#C6112F] tracking-[0.25em] uppercase whitespace-nowrap">
                  More Press Release
                </b>
                <div className="flex-grow h-px bg-neutral-200 dark:bg-zinc-800" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/newsflash/${item.slug}`}
                    className="group bg-white dark:bg-[#121215] border border-neutral-200/90 dark:border-zinc-800 rounded-2xl p-5 shadow-2xs hover:shadow-lg hover:border-[#C6112F]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <span className="text-[10px] font-black tracking-wider uppercase text-[#C6112F] mb-2">
                      Press Release
                    </span>
                    <h3 className="text-sm font-extrabold text-[#1a1f2c] dark:text-white leading-snug line-clamp-3 group-hover:text-[#C6112F] transition-colors">
                      {item.title}
                    </h3>
                    <span className="mt-auto pt-4 text-[11px] font-semibold text-neutral-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <NewsflashSubscribeSection />
      <GetInTouchCTA />
      <Footer />
    </>
  );
}
