import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import ArticleFlipbookSection from "@/components/ArticleFlipbookSection";
import {
  fetchArticleBySlug,
  articleHref,
  articlePdfFileName,
  formatArticleDate,
  getArticlePdfUrl,
  getCoverImageUrl,
} from "@/lib/articlesApi";

// Must be a literal — Next statically analyses segment config exports.
// Keep in sync with ARTICLES_REVALIDATE_SECONDS in @/lib/articlesApi.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const result = await fetchArticleBySlug(slug);
    if (!result) return { title: "Publication Not Found" };

    const { article } = result;
    const description =
      article.description?.trim() ||
      `${article.title} — a corporate publication featured at THE Mining Investment Event.`;
    const cover = getCoverImageUrl(article);

    return {
      title: `${article.title} | THE Mining Investment Event`,
      description,
      openGraph: {
        type: "article",
        title: article.title,
        description,
        publishedTime: article.publishDate,
        images: cover ? [cover] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
        images: cover ? [cover] : undefined,
      },
    };
  } catch {
    return { title: "Company Publication" };
  }
}

export default async function CompanyArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await fetchArticleBySlug(slug);

  if (!result) notFound();

  const { article, related } = result;
  const pdfUrl = getArticlePdfUrl(article);
  const coverUrl = getCoverImageUrl(article);
  const publishedOn = formatArticleDate(article);

  return (
    <>
      <Navbar />
      <main className="flex flex-col grow w-full bg-[#f8fafc] dark:bg-[#080d17] text-left pt-24 sm:pt-28 pb-16 transition-colors">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 w-full">
          {/* Back link + breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0e1626] hover:bg-neutral-100 dark:hover:bg-slate-800 text-neutral-800 dark:text-slate-200 text-xs font-bold transition-all border border-neutral-200/90 dark:border-[#233049] shadow-2xs group"
            >
              <svg className="w-4 h-4 text-[#C6112F] group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>All Company Articles</span>
            </Link>

            <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-slate-400 flex-wrap">
              <Link href="/" className="hover:text-[#C6112F] transition-colors">Home</Link>
              <span className="text-[#C6112F]">›</span>
              <Link href="/news" className="hover:text-[#C6112F] transition-colors">THE News</Link>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-900 dark:text-white font-extrabold truncate max-w-[220px]">
                {article.title}
              </span>
            </nav>
          </div>

          {/* Header */}
          <header className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-[#233049] bg-white dark:bg-[#0e1626] shadow-sm p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              {coverUrl && (
                <div className="relative w-32 sm:w-40 shrink-0 aspect-[1/1.38] rounded-r-sm overflow-hidden border-t border-b border-r border-stone-300/80 dark:border-slate-700 shadow-[8px_16px_28px_rgba(0,0,0,0.18)] mx-auto sm:mx-0">
                  <img
                    src={coverUrl}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                  <span className="px-3.5 py-1 bg-[#C6112F]/10 border border-[#C6112F]/20 text-[#C6112F] dark:text-[#ff4d6d] text-[11px] font-black uppercase tracking-[0.2em] rounded-full">
                    Company Article
                  </span>
                  {publishedOn && (
                    <span className="px-3.5 py-1 bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 text-xs font-semibold rounded-full border border-neutral-200 dark:border-slate-700 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                      </svg>
                      {publishedOn}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-[42px] font-black text-neutral-900 dark:text-white leading-[1.15] tracking-tight text-balance">
                  {article.title}
                </h1>

                {article.description?.trim() && (
                  <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-slate-300 leading-relaxed font-medium border-l-4 border-[#C6112F] pl-5">
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          </header>

          {/* Publication reader — falls back to its own empty state without a PDF */}
          <ArticleFlipbookSection
            title={article.title}
            subtitle={publishedOn}
            pdfUrl={pdfUrl}
            coverImageUrl={coverUrl}
            description={article.description}
            fileName={articlePdfFileName(article)}
          />

          {/* More publications */}
          {related.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center gap-4 mb-6">
                <b className="text-xs font-extrabold text-[#C6112F] tracking-[0.25em] uppercase whitespace-nowrap">
                  More Company Articles
                </b>
                <div className="grow h-px bg-neutral-200 dark:bg-slate-800" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {related.map((item) => {
                  const itemCover = getCoverImageUrl(item);

                  return (
                    <Link
                      key={item._id}
                      href={articleHref(item)}
                      className="group flex flex-col"
                    >
                      <div className="relative w-full aspect-[1/1.38] rounded-r-sm overflow-hidden border-t border-b border-r border-stone-300/80 dark:border-slate-700 bg-white dark:bg-[#1a2334] shadow-[6px_12px_22px_rgba(0,0,0,0.15)] group-hover:shadow-[10px_18px_30px_rgba(198,17,47,0.25)] group-hover:-translate-y-1.5 transition-all duration-300">
                        {itemCover ? (
                          <img
                            src={itemCover}
                            alt={item.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#2b1116] to-[#0f1117] flex items-center justify-center p-4">
                            <span className="text-xs font-black text-white text-center leading-tight uppercase line-clamp-4">
                              {item.title}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
                      </div>

                      <span className="text-xs font-extrabold text-[#1a1f2c] dark:text-slate-100 mt-3 leading-snug line-clamp-2 group-hover:text-[#C6112F] dark:group-hover:text-[#ff4d6d] transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-500 dark:text-slate-400 mt-1">
                        {formatArticleDate(item)}
                      </span>
                    </Link>
                  );
                })}
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
