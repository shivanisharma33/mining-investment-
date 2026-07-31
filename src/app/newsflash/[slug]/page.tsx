import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import ShareBar from "./ShareBar";
import {
  fetchArticleBySlug,
  parseArticleContent,
  estimateReadingTime,
  formatArticleDate,
  extractPdfUrl,
  type ArticleBlock,
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
    const result = await fetchArticleBySlug(slug);
    if (!result) return { title: "Press Release Not Found" };

    const { article } = result;
    const description =
      article.subheading?.trim() ||
      article.content?.trim().slice(0, 200) ||
      "A press release from THE Mining Investment Event.";

    return {
      title: `${article.title} | THE Mining Investment Event`,
      description,
      openGraph: {
        type: "article",
        title: article.title,
        description,
        publishedTime: article.publishedAt || article.createdAt,
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

/** Turns bare URLs and email addresses in press-release text into links. */
function withLinks(text: string): React.ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s<>"')]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g);

  return parts.map((part, idx) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C6112F] font-semibold underline decoration-[#C6112F]/30 underline-offset-2 hover:decoration-[#C6112F] break-words"
        >
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
      return (
        <a
          key={idx}
          href={`mailto:${part}`}
          className="text-[#C6112F] font-semibold underline decoration-[#C6112F]/30 underline-offset-2 hover:decoration-[#C6112F]"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          return (
            <h2
              key={idx}
              className="text-lg sm:text-xl font-black text-[#1a1f2c] tracking-tight pt-4 flex items-center gap-3"
            >
              <span className="w-1.5 h-5 bg-[#C6112F] rounded-full shrink-0" />
              <span>{block.text}</span>
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={idx} className="space-y-2.5 pl-1">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3 text-[15px] sm:text-base text-neutral-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] mt-2.5 shrink-0" />
                  <span>{withLinks(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-[#C6112F]/40 bg-neutral-50 rounded-r-2xl px-5 sm:px-6 py-4 text-[15px] sm:text-lg text-neutral-800 italic leading-relaxed"
            >
              {withLinks(block.text)}
            </blockquote>
          );
        }

        return (
          <p key={idx} className="text-[15px] sm:text-base text-neutral-700 leading-[1.85]">
            {block.label && (
              <b className="font-extrabold text-[#1a1f2c]">{block.label}: </b>
            )}
            {withLinks(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export default async function NewsflashArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await fetchArticleBySlug(slug);

  if (!result) notFound();

  const { article, related } = result;
  const blocks = parseArticleContent(article.content);
  const readingMinutes = estimateReadingTime(article.content);
  const publishedOn = formatArticleDate(article);
  const pdfUrl = extractPdfUrl(article);

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f8fafc] text-left pt-24 sm:pt-28 pb-16">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 md:px-8 w-full">
          {/* Breadcrumb + back */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <Link
              href="/newsflash"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold transition-all border border-neutral-200/90 shadow-2xs group"
            >
              <svg className="w-4 h-4 text-[#C6112F] group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>All Press Releases</span>
            </Link>

            <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500 flex-wrap">
              <Link href="/" className="hover:text-[#C6112F] transition-colors">Home</Link>
              <span className="text-[#C6112F]">›</span>
              <Link href="/newsflash" className="hover:text-[#C6112F] transition-colors">THE Press Release</Link>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-900 font-extrabold truncate max-w-[220px]">
                {article.title}
              </span>
            </nav>
          </div>

          <article className="bg-white rounded-3xl shadow-md border border-neutral-200/90 overflow-hidden">
            {/* Header */}
            <header className="p-6 sm:p-10 md:p-12 border-b border-neutral-100">
              <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                <span className="px-3.5 py-1 bg-[#C6112F]/10 border border-[#C6112F]/20 text-[#C6112F] text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                  {article.category || "Newsflash"}
                </span>
                {publishedOn && (
                  <span className="px-3.5 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-full border border-neutral-200 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    {publishedOn}
                  </span>
                )}
                <span className="px-3.5 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-full border border-neutral-200 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                  </svg>
                  {readingMinutes} min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-[42px] font-black text-neutral-900 leading-[1.15] tracking-tight text-balance">
                {article.title}
              </h1>

              {article.subheading && (
                <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed font-medium border-l-4 border-[#C6112F] pl-5">
                  {article.subheading}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-neutral-100">
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
              {blocks.length > 0 ? (
                <ArticleBody blocks={blocks} />
              ) : (
                <p className="text-sm text-neutral-500 font-medium">
                  The full text of this release is available in the attached PDF.
                </p>
              )}

              {pdfUrl && (
                <div className="mt-10 p-6 bg-neutral-50 border border-neutral-200/90 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider mb-1">
                      Official PDF press document
                    </h3>
                    <p className="text-xs text-neutral-600 font-medium">
                      View the official press release exactly as issued.
                    </p>
                  </div>
                  <a
                    href={openPdfUrl(pdfUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-5 py-2.5 rounded-xl bg-[#0f1117] hover:bg-[#C6112F] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md"
                  >
                    Open PDF
                  </a>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-neutral-500 font-medium">
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
                  More Press Releases
                </b>
                <div className="flex-grow h-px bg-neutral-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((item) => (
                  <Link
                    key={item._id}
                    href={`/newsflash/${item.slug || item._id}`}
                    className="group bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-lg hover:border-[#C6112F]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <span className="text-[10px] font-black tracking-wider uppercase text-[#C6112F] mb-2">
                      {item.category || "Newsflash"}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#1a1f2c] leading-snug line-clamp-3 group-hover:text-[#C6112F] transition-colors">
                      {item.title}
                    </h3>
                    <span className="mt-auto pt-4 text-[11px] font-semibold text-neutral-500">
                      {formatArticleDate(item)}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <GetInTouchCTA />
      <Footer />
    </>
  );
}
