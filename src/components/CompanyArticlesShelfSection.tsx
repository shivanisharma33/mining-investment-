"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  type ApiArticle,
  articleHref,
  fetchArticles,
  formatIssueLabel,
  getCoverImageUrl,
} from "@/lib/articlesApi";

export interface CompanyArticlesShelfProps {
  onViewAll?: () => void;
  ctaLabel?: string;
  hideCtaButton?: boolean;
}

/** Covers shown on the /news overview before the "view all" button. */
const PREVIEW_COUNT = 4;

export default function CompanyArticlesShelfSection({
  onViewAll,
  ctaLabel,
  hideCtaButton = false,
}: CompanyArticlesShelfProps) {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const router = useRouter();

  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Strapi sends CORS headers, so this calls it directly — no proxy needed.
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setArticles(await fetchArticles(controller.signal));
        setLoadError(false);
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        console.error("Company articles fetch failed:", error);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const displayedArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const list = articles.filter(
      (article) =>
        q === "" ||
        article.title?.toLowerCase().includes(q) ||
        article.description?.toLowerCase().includes(q)
    );

    return hideCtaButton ? list : list.slice(0, PREVIEW_COUNT);
  }, [articles, searchQuery, hideCtaButton]);

  /** Covers are shelved under their publication month, newest issue first. */
  const groupedByIssue = useMemo(() => {
    const groups: Record<string, ApiArticle[]> = {};

    displayedArticles.forEach((article) => {
      const label = formatIssueLabel(article, isFr);
      (groups[label] ||= []).push(article);
    });

    return Object.entries(groups);
  }, [displayedArticles, isFr]);

  const openArticle = (article: ApiArticle) => {
    router.push(articleHref(article));
  };

  return (
    <section className="relative w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto transition-colors duration-300">
      {/* SECTION HEADER MATCHING SITE-WIDE DESIGN SYSTEM */}
      <div className="text-center mb-8">
        <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block mb-2">
          {isFr ? "PUBLICATIONS & RAPPORTS" : "FEATURED PUBLICATIONS"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-3">
          {isFr ? "Articles d'Entreprises" : "Company Articles"}
        </h2>
        <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          {isFr
            ? "Découvrez les derniers rapports, analyses et publications exclusives des entreprises minières participantes."
            : "Explore in-depth corporate reports, development updates, and exclusive publications from participating mining leaders."}
        </p>
      </div>

      {/* SEARCH BAR (DEDICATED ARTICLES PAGE ONLY) */}
      {hideCtaButton && !loading && !loadError && articles.length > 0 && (
        <div className="flex justify-end mb-8">
          <div className="relative w-full md:w-72 shrink-0">
            <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder={isFr ? "Rechercher une publication..." : "Search publications..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0e1626] border border-neutral-200/90 dark:border-[#233049] rounded-full text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#C6112F] transition-colors shadow-2xs"
            />
          </div>
        </div>
      )}

      {/* SHELF CONTAINER MATCHING SITE THEME */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-[#233049] bg-white dark:bg-[#0e1626] p-6 sm:p-10 md:p-12 shadow-sm transition-colors">
        {loading ? (
          <ShelfSkeleton count={hideCtaButton ? 4 : PREVIEW_COUNT} />
        ) : loadError ? (
          <div className="py-12 text-center">
            <span className="text-4xl mb-2 block">⚠️</span>
            <h3 className="text-base font-bold text-neutral-800 dark:text-white mb-1">
              {isFr ? "Publications indisponibles" : "Publications Unavailable"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400">
              {isFr
                ? "Impossible de charger les publications pour le moment. Veuillez réessayer plus tard."
                : "We couldn't load the publications right now. Please try again later."}
            </p>
          </div>
        ) : groupedByIssue.length === 0 ? (
          <div className="py-12 text-center">
            <span className="text-4xl mb-2 block">🔍</span>
            <h3 className="text-base font-bold text-neutral-800 dark:text-white mb-1">
              {isFr ? "Aucune publication trouvée" : "No Publications Found"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400">
              {searchQuery
                ? isFr
                  ? "Essayez de modifier votre recherche."
                  : "Try adjusting your search terms."
                : isFr
                  ? "De nouvelles publications d'entreprises seront bientôt disponibles."
                  : "New company publications will be available here soon."}
            </p>
          </div>
        ) : (
          groupedByIssue.map(([issueLabel, issueArticles], groupIdx) => (
            <div key={issueLabel} className={groupIdx > 0 ? "mt-12 pt-10 border-t border-neutral-200/80 dark:border-slate-800" : ""}>
              {/* MONTH / YEAR HEADER */}
              <div className="mb-8 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C6112F] shrink-0" />
                <span className="text-[#C6112F] dark:text-[#ff4d6d] font-black text-xs sm:text-sm tracking-[0.25em] uppercase">
                  {issueLabel}
                </span>
                <span className="text-[11px] font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  ({issueArticles.length}{" "}
                  {issueArticles.length === 1
                    ? isFr ? "Rapport" : "Report"
                    : isFr ? "Rapports" : "Reports"})
                </span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-slate-800" />
              </div>

              {/* 3D BOOK COVERS GRID */}
              <div className={gridClassFor(issueArticles.length)}>
                {issueArticles.map((article) => (
                  <BookCover
                    key={article._id}
                    article={article}
                    onOpen={() => openArticle(article)}
                    readLabel={isFr ? "LIRE LA PUBLICATION" : "READ PUBLICATION"}
                  />
                ))}
              </div>
            </div>
          ))
        )}

        {/* VIEW ALL ARTICLES BUTTON */}
        {!hideCtaButton && !loading && !loadError && articles.length > 0 && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              onClick={onViewAll}
              className="group px-7 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{ctaLabel || (isFr ? "VOIR TOUS LES ARTICLES D'ENTREPRISES" : "VIEW ALL COMPANY ARTICLES")}</span>
              <svg
                className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Small counts stay centred instead of stretching across the full shelf. */
function gridClassFor(count: number): string {
  const base = "grid gap-6 sm:gap-8 justify-items-center items-end w-full";

  if (count === 1) return `${base} grid-cols-1 max-w-sm mx-auto`;
  if (count === 2) return `${base} grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto`;
  if (count === 3) return `${base} grid-cols-1 sm:grid-cols-3`;
  if (count === 4) return `${base} grid-cols-2 sm:grid-cols-3 md:grid-cols-4`;
  return `${base} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`;
}

function BookCover({
  article,
  onOpen,
  readLabel,
}: {
  article: ApiArticle;
  onOpen: () => void;
  readLabel: string;
}) {
  const coverUrl = getCoverImageUrl(article);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group flex flex-col items-center cursor-pointer select-none w-full focus:outline-none"
    >
      {/* 3D BOOK COVER WRAPPER WITH REALISTIC SPINE & SHADOW */}
      <div className="relative w-full max-w-[240px] sm:max-w-[265px] md:max-w-[280px] aspect-[1/1.38] rounded-r-sm overflow-hidden border-t border-b border-r border-stone-300/80 dark:border-slate-700 bg-white dark:bg-[#1a2334] shadow-[8px_16px_28px_rgba(0,0,0,0.18)] group-hover:shadow-[12px_24px_38px_rgba(198,17,47,0.28)] group-hover:-translate-y-2 group-hover:rotate-1 group-focus-visible:ring-2 group-focus-visible:ring-[#C6112F] transition-all duration-300 transform mx-auto">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={article.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // No cover uploaded — fall back to a typographic cover.
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#2b1116] to-[#0f1117] flex items-center justify-center p-5">
            <span className="text-sm font-black text-white text-center leading-tight uppercase tracking-wide line-clamp-5">
              {article.title}
            </span>
          </div>
        )}

        {/* LEFT SPINE 3D SHADOW OVERLAY */}
        <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/45 via-black/15 to-transparent z-30 pointer-events-none" />

        {/* RIGHT PAGE STACK 3D EDGE */}
        <div className="absolute inset-y-0 right-0 w-[5px] bg-gradient-to-l from-stone-100 via-stone-200 to-stone-300 border-l border-stone-300/60 z-30 pointer-events-none" />

        {/* HOVER READ PROMPT */}
        <div className="absolute inset-0 z-20 flex items-end justify-center bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 p-4 pointer-events-none">
          <span className="px-3.5 py-2 rounded-lg bg-[#C6112F] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
            {readLabel}
          </span>
        </div>
      </div>

      {/* ARTICLE TITLE LABEL BELOW */}
      <span className="text-xs sm:text-sm font-extrabold text-[#1a1f2c] dark:text-slate-100 text-center mt-3.5 tracking-tight group-hover:text-[#C6112F] dark:group-hover:text-[#ff4d6d] transition-colors line-clamp-2">
        {article.title}
      </span>
    </div>
  );
}

function ShelfSkeleton({ count }: { count: number }) {
  return (
    <div className={gridClassFor(count)}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col items-center w-full">
          <div className="w-full max-w-[240px] sm:max-w-[265px] md:max-w-[280px] aspect-[1/1.38] rounded-r-sm bg-neutral-200/80 dark:bg-slate-800 animate-pulse" />
          <div className="h-3 w-2/3 mt-3.5 rounded-full bg-neutral-200/80 dark:bg-slate-800 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
