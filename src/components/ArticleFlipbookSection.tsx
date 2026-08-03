"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { downloadPdf } from "@/lib/downloadPdf";

/**
 * pdf.js touches browser-only globals (DOMMatrix, window, Promise.withResolvers),
 * so the viewer must never execute on the server. `ssr: false` is only allowed
 * from a Client Component, which is why this wrapper exists between the reader
 * page (a Server Component) and the viewer.
 */
const FlipbookViewer = dynamic(
  () => import("@/components/flipbook/FlipbookViewer"),
  { ssr: false, loading: () => <ReaderSkeleton /> }
);

interface ArticleFlipbookSectionProps {
  title: string;
  subtitle?: string;
  pdfUrl?: string | null;
  coverImageUrl?: string | null;
  description?: string;
  fileName: string;
}

export default function ArticleFlipbookSection({
  title,
  subtitle,
  pdfUrl,
  coverImageUrl,
  description,
  fileName,
}: ArticleFlipbookSectionProps) {
  const { lang } = useLanguage();
  const isFr = lang === "FR";
  const [downloading, setDownloading] = useState(false);

  /**
   * Article PDFs are Cloudinary raw uploads served as application/octet-stream
   * with no extension, and `<a download>` is ignored cross-origin — so the bytes
   * are fetched and re-tagged before saving. See @/lib/downloadPdf.
   */
  const handleDownload = async () => {
    if (!pdfUrl) return;

    setDownloading(true);
    try {
      await downloadPdf(pdfUrl, fileName);
    } catch (error) {
      console.error("Article PDF download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section>
      <FlipbookViewer
        title={title}
        subtitle={subtitle}
        pdfUrl={pdfUrl}
        coverImageUrl={coverImageUrl}
        description={description}
      />

      {pdfUrl && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-200/90 dark:border-[#233049] bg-white dark:bg-[#0e1626] shadow-sm px-5 sm:px-6 py-4">
          <div className="min-w-0">
            <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider mb-0.5">
              {isFr ? "Lire hors ligne" : "Read offline"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 font-medium">
              {isFr
                ? "Téléchargez la publication complète au format PDF."
                : "Download the full publication as a PDF."}
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] disabled:opacity-60 text-white text-[11px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:cursor-wait inline-flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5M4 20h16" />
            </svg>
            <span>
              {downloading
                ? isFr ? "Téléchargement…" : "Downloading…"
                : isFr ? "Télécharger le PDF" : "Download PDF"}
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

/** Holds the reader's footprint while the pdf.js chunk downloads. */
function ReaderSkeleton() {
  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-[#233049] bg-white dark:bg-[#0e1626] shadow-sm overflow-hidden">
      <div className="h-[57px] border-b border-neutral-200/90 dark:border-[#233049] bg-neutral-50 dark:bg-[#131b2e]" />
      <div className="min-h-[520px] bg-neutral-100 dark:bg-[#080d17] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-[3px] border-neutral-300 dark:border-slate-700 border-t-[#C6112F] animate-spin" />
        <span className="text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-slate-400">
          Loading reader…
        </span>
      </div>
    </div>
  );
}
