"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { useLanguage } from "@/context/LanguageContext";

/**
 * pdf.js parses PDFs in a Web Worker, which has to be reachable at runtime.
 *
 * `new URL(..., import.meta.url)` lets the bundler resolve the worker out of
 * node_modules and emit it as an asset, so nothing needs copying into public/.
 * (If a bundler ever chokes on that, commit the worker to
 * public/pdf.worker.min.mjs and swap this constant for "/pdf.worker.min.mjs".)
 *
 * This assignment must live in the same module that renders <Document>/<Page> —
 * setting it from a layout or provider can be overwritten back to the default
 * depending on module execution order.
 */
const PDF_WORKER_SRC = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;

/** ISO 216 (A-series) paper ratio — what makes a page read as a page. */
const PAGE_RATIO = 1.414;

/** Vertical room reserved for the toolbar, controls and page padding. */
const CHROME_HEIGHT = 280;

const MOBILE_BREAKPOINT = 768;

/**
 * Rendering every page of a long PDF to canvas up front freezes the tab, so
 * pages are handed to the flipbook a couple at a time (see the effect below).
 */
const INITIAL_PAGE_COUNT = 2;
const PAGE_BATCH_SIZE = 2;
const PAGE_BATCH_DELAY_MS = 120;

interface PageSize {
  width: number;
  height: number;
}

/** The `page-flip` instance behind the React wrapper. */
interface PageFlipInstance {
  flipNext: () => void;
  flipPrev: () => void;
  turnToPage: (page: number) => void;
}

interface FlipBookInstance {
  pageFlip: () => PageFlipInstance | undefined;
}

/**
 * react-pageflip types all ~20 of its settings as required, so using the
 * component directly would mean listing every one. Declaring just the settings
 * actually used and casting once keeps the call site honest.
 */
interface FlipBookProps {
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
  size?: "fixed" | "stretch";
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  startPage?: number;
  drawShadow?: boolean;
  flippingTime?: number;
  usePortrait?: boolean;
  startZIndex?: number;
  autoSize?: boolean;
  maxShadowOpacity?: number;
  showCover?: boolean;
  mobileScrollSupport?: boolean;
  clickEventForward?: boolean;
  useMouseEvents?: boolean;
  swipeDistance?: number;
  showPageCorners?: boolean;
  disableFlipByClick?: boolean;
  onFlip?: (event: { data: number }) => void;
  children: React.ReactNode;
}

const FlipBook = HTMLFlipBook as unknown as React.ForwardRefExoticComponent<
  FlipBookProps & React.RefAttributes<FlipBookInstance>
>;

/**
 * Page dimensions for the current viewport. Width comes from the breakpoint,
 * height follows the paper ratio, and if that overflows the viewport the height
 * is clamped and the width back-solved so the proportion still holds.
 */
function getResponsivePageSize(): PageSize {
  if (typeof window === "undefined") {
    return { width: 420, height: Math.round(420 * PAGE_RATIO) };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let width: number;
  if (viewportWidth < 480) {
    width = Math.min(360, viewportWidth - 24);
  } else if (viewportWidth < MOBILE_BREAKPOINT) {
    width = Math.min(460, viewportWidth - 40);
  } else {
    // Desktop shows a two-page spread, so a page gets half the viewport.
    width = Math.min(420, Math.floor((viewportWidth - 160) / 2));
  }

  width = Math.max(200, width);
  let height = Math.round(width * PAGE_RATIO);

  const maxHeight = viewportHeight - CHROME_HEIGHT;
  if (maxHeight > 200 && height > maxHeight) {
    height = maxHeight;
    width = Math.round(height / PAGE_RATIO);
  }

  return { width, height };
}

export interface FlipbookViewerProps {
  title: string;
  subtitle?: string;
  pdfUrl?: string | null;
  coverImageUrl?: string | null;
  description?: string;
  onBack?: () => void;
  onClose?: () => void;
}

export default function FlipbookViewer({
  title,
  subtitle,
  pdfUrl,
  coverImageUrl,
  description,
  onBack,
  onClose,
}: FlipbookViewerProps) {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const bookRef = useRef<FlipBookInstance>(null);

  const [numPages, setNumPages] = useState<number>(0);
  /** Desktop: left-hand page of the current spread, reported by onFlip. */
  const [rawIdx, setRawIdx] = useState<number>(0);
  /** Mobile: 1-based page number, driven by the buttons. */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visiblePageCount, setVisiblePageCount] =
    useState<number>(INITIAL_PAGE_COUNT);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loadProgress, setLoadProgress] = useState<number>(0);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<PageSize>({
    width: 420,
    height: Math.round(420 * PAGE_RATIO),
  });

  // Viewport-derived layout, re-checked on every resize.
  useEffect(() => {
    const sync = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setPageSize(getResponsivePageSize());
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /**
   * Walks visiblePageCount up to numPages, two pages at a time. The effect
   * re-triggers through its own visiblePageCount dependency and stops once the
   * guard is satisfied, so the first spread is interactive almost immediately
   * while the rest fills in behind the reader.
   */
  useEffect(() => {
    if (isMobile || visiblePageCount >= numPages) return;

    const timer = window.setTimeout(() => {
      setVisiblePageCount((prev) => Math.min(numPages, prev + PAGE_BATCH_SIZE));
    }, PAGE_BATCH_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [isMobile, numPages, visiblePageCount]);

  const handleLoadSuccess = useCallback(({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    setVisiblePageCount(Math.min(total, INITIAL_PAGE_COUNT));
    setLoading(false);
    setError("");
  }, []);

  const handleLoadError = useCallback(
    (cause: Error) => {
      console.error("Flipbook PDF load failed:", cause);
      setLoading(false);
      setError(
        isFr
          ? "Impossible de charger cette publication."
          : "This publication could not be loaded."
      );
    },
    [isFr]
  );

  const handleLoadProgress = useCallback(
    ({ loaded, total }: { loaded: number; total: number }) => {
      if (!total) return;
      setLoadProgress(Math.min(100, Math.round((loaded / total) * 100)));
    },
    []
  );

  const goNext = useCallback(() => {
    if (isMobile) {
      setCurrentPage((prev) => Math.min(numPages, prev + 1));
      return;
    }
    bookRef.current?.pageFlip()?.flipNext();
  }, [isMobile, numPages]);

  const goPrev = useCallback(() => {
    if (isMobile) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
      return;
    }
    bookRef.current?.pageFlip()?.flipPrev();
  }, [isMobile]);

  // Arrow keys read as page turns once a publication is open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      else if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const atStart = isMobile ? currentPage <= 1 : rawIdx <= 0;
  const atEnd = isMobile
    ? currentPage >= numPages
    : numPages > 0 && rawIdx >= numPages - 1;

  /** "1 / 24" on a cover or mobile, "2–3 / 24" on a desktop spread. */
  const pageLabel = useMemo(() => {
    if (!numPages) return "";
    if (isMobile) return `${currentPage} / ${numPages}`;
    if (rawIdx === 0) return `1 / ${numPages}`;

    const right = Math.min(rawIdx + 2, numPages);
    return rawIdx + 1 === right
      ? `${right} / ${numPages}`
      : `${rawIdx + 1}–${right} / ${numPages}`;
  }, [isMobile, currentPage, rawIdx, numPages]);

  // Empty state short-circuits before any pdf.js code runs.
  if (!pdfUrl) {
    return (
      <div className="w-full rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-[#233049] bg-white dark:bg-[#0e1626] shadow-sm p-10 sm:p-14 text-center">
        <span className="text-4xl mb-3 block">📄</span>
        <h2 className="text-base sm:text-lg font-black text-neutral-800 dark:text-white mb-2">
          {isFr
            ? `« ${title} » n'est pas encore disponible à la lecture`
            : `${title} is not available to read yet`}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          {description?.trim() ||
            (isFr
              ? "Le document de cette publication n'a pas encore été publié. Revenez bientôt."
              : "The document for this publication has not been published yet. Please check back soon.")}
        </p>
      </div>
    );
  }

  const pageProps = {
    width: pageSize.width,
    // Flat canvas pages: no text selection, no in-PDF search, no live links.
    renderTextLayer: false,
    renderAnnotationLayer: false,
    loading: <PagePlaceholder size={pageSize} />,
  };

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-[#233049] bg-white dark:bg-[#0e1626] shadow-sm overflow-hidden">
      {/* TOP BAR */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-neutral-200/90 dark:border-[#233049] bg-neutral-50 dark:bg-[#131b2e]">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              aria-label={isFr ? "Retour" : "Back"}
              className="shrink-0 w-9 h-9 rounded-xl bg-white dark:bg-[#0e1626] border border-neutral-200/90 dark:border-[#233049] text-neutral-700 dark:text-slate-300 hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] flex items-center justify-center transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
          )}

          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-800 dark:text-white truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] font-semibold text-neutral-400 dark:text-slate-500 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {pageLabel && (
            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider text-neutral-500 dark:text-slate-400 tabular-nums">
              {pageLabel}
            </span>
          )}

          {onClose && (
            <button
              onClick={onClose}
              aria-label={isFr ? "Fermer" : "Close"}
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#0e1626] border border-neutral-200/90 dark:border-[#233049] text-neutral-700 dark:text-slate-300 hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] flex items-center justify-center transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* STAGE */}
      <div className="relative w-full bg-neutral-100 dark:bg-[#080d17] px-4 py-8 sm:py-10 flex flex-col items-center justify-center min-h-[520px]">
        {/* Blurred cover backdrop while the document downloads */}
        {coverImageUrl && loading && (
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-25 blur-2xl scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${coverImageUrl})` }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center w-full">
          <Document
            file={pdfUrl}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
            onSourceError={handleLoadError}
            onLoadProgress={handleLoadProgress}
            loading={<LoadingState progress={loadProgress} isFr={isFr} />}
            error={
              <ErrorState
                isFr={isFr}
                message={
                  isFr
                    ? "Impossible de charger cette publication."
                    : "This publication could not be loaded."
                }
              />
            }
            noData={
              <ErrorState
                isFr={isFr}
                message={isFr ? "Aucun document spécifié." : "No document specified."}
              />
            }
            className="flex justify-center w-full"
          >
            {error ? null : isMobile ? (
              // Phones drop the flip entirely — a spread is unreadable, and the
              // gesture fights with scrolling.
              <div
                className="shadow-[0_18px_40px_rgba(0,0,0,0.25)] bg-white"
                style={{ width: pageSize.width }}
              >
                <Page pageNumber={currentPage} {...pageProps} />
              </div>
            ) : numPages > 0 ? (
              <FlipBook
                ref={bookRef}
                width={pageSize.width}
                height={pageSize.height}
                size="fixed"
                minWidth={200}
                maxWidth={600}
                minHeight={280}
                maxHeight={900}
                startPage={0}
                drawShadow
                flippingTime={700}
                usePortrait={false}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.5}
                showCover
                mobileScrollSupport
                clickEventForward={false}
                useMouseEvents
                swipeDistance={30}
                showPageCorners
                disableFlipByClick={false}
                onFlip={(event) => setRawIdx(event.data)}
                className="flipbook-shadow"
              >
                {Array.from({ length: visiblePageCount }, (_, idx) => (
                  <div key={idx} className="bg-white overflow-hidden">
                    <Page pageNumber={idx + 1} {...pageProps} />
                  </div>
                ))}
              </FlipBook>
            ) : null}
          </Document>

          {/* CONTROLS */}
          {!loading && !error && numPages > 0 && (
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={goPrev}
                disabled={atStart}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#0e1626] border border-neutral-200/90 dark:border-[#233049] text-neutral-800 dark:text-slate-200 text-[11px] font-black uppercase tracking-wider transition-all shadow-2xs hover:bg-[#C6112F] hover:text-white hover:border-[#C6112F] disabled:opacity-40 disabled:pointer-events-none cursor-pointer inline-flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">
                  {isFr ? "Précédent" : "Previous"}
                </span>
              </button>

              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 dark:text-slate-400 tabular-nums min-w-[86px] text-center">
                {pageLabel}
              </span>

              <button
                onClick={goNext}
                disabled={atEnd}
                className="px-5 py-2.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-[11px] font-black uppercase tracking-wider transition-all shadow-md disabled:opacity-40 disabled:pointer-events-none cursor-pointer inline-flex items-center gap-2"
              >
                <span className="hidden sm:inline">
                  {isFr ? "Suivant" : "Next"}
                </span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {!loading && !error && !isMobile && numPages > 1 && (
            <p className="mt-4 text-[11px] font-semibold text-neutral-400 dark:text-slate-500 text-center">
              {isFr
                ? "Faites glisser le coin d'une page pour la tourner, ou utilisez les flèches du clavier"
                : "Drag a page corner to turn it, or use the arrow keys"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PagePlaceholder({ size }: { size: PageSize }) {
  return (
    <div
      className="bg-white dark:bg-slate-200 animate-pulse"
      style={{ width: size.width, height: size.height }}
    />
  );
}

function LoadingState({ progress, isFr }: { progress: number; isFr: boolean }) {
  const label = isFr ? "Chargement de la publication" : "Loading publication";

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-10 h-10 rounded-full border-[3px] border-neutral-300 dark:border-slate-700 border-t-[#C6112F] animate-spin" />
      <span className="text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-slate-400">
        {label}
        {progress > 0 ? ` — ${progress}%` : "…"}
      </span>
    </div>
  );
}

function ErrorState({ message, isFr }: { message: string; isFr: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center px-6">
      <span className="text-4xl">⚠️</span>
      <h3 className="text-base font-bold text-neutral-800 dark:text-white">
        {message}
      </h3>
      <p className="text-xs text-neutral-500 dark:text-slate-400 max-w-sm">
        {isFr
          ? "Vous pouvez toujours télécharger la publication pour la lire hors ligne."
          : "You can still download the publication to read it offline."}
      </p>
    </div>
  );
}
