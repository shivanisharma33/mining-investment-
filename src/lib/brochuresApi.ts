/**
 * Event brochures, served by the Strapi v5 collection
 * /api/brochures
 *
 * Strapi fields: title, eventDate, year, venue, city, country, pdfFile (media), publishTo.
 */

import {
  fetchStrapi,
  getStrapiMediaUrl,
  matchesPublishTo,
  type StrapiListResponse,
  type StrapiMedia,
} from "./strapi";

/** Server-side cache window (5 minutes). */
export const BROCHURE_REVALIDATE_SECONDS = 300;

export interface BrochureApiItem {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  pdfUrl: string;
  description?: string;
  eventDates?: string;
  venue?: string;
}

export interface StrapiBrochure {
  id: number;
  documentId: string;
  title?: string;
  name?: string;
  eventDate?: string;
  year?: number | string;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  publishTo?: string[] | string | null;
  pdfFile?: StrapiMedia | null;
  pdf?: StrapiMedia | null;
  file?: StrapiMedia | null;
  document?: StrapiMedia | null;
  url?: string | null;
}

function parseYear(...values: Array<string | null | undefined>): number | undefined {
  for (const value of values) {
    const match = value?.match(/(\d{4})/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

export function mapBrochure(entry: StrapiBrochure): BrochureApiItem | null {
  if (!matchesPublishTo(entry.publishTo)) {
    return null;
  }

  const media = entry.pdfFile || entry.pdf || entry.file || entry.document;
  const rawUrl = media?.url || entry.url || undefined;
  const pdfUrl = getStrapiMediaUrl(rawUrl);

  if (!pdfUrl) return null;

  const title = entry.title?.trim() || entry.name?.trim() || "Event Brochure";
  const slug = (media?.name ?? "").replace(/\.pdf$/i, "").trim() || entry.documentId || String(entry.id);
  const year = parseYear(String(entry.year ?? ""), entry.eventDate, title);

  return {
    _id: entry.documentId || String(entry.id),
    title,
    slug,
    year,
    pdfUrl,
    description: "",
    eventDates: entry.eventDate?.trim() || "",
    venue: [entry.venue, entry.city, entry.country]
      .map((part) => part?.trim())
      .filter(Boolean)
      .join(", "),
  };
}

/** Every published brochure that has a PDF attached, newest first, filtered by publishTo. */
export async function fetchBrochures(
  signal?: AbortSignal
): Promise<BrochureApiItem[]> {
  const json = await fetchStrapi<StrapiListResponse<StrapiBrochure>>("/api/brochures", {
    signal,
    revalidate: BROCHURE_REVALIDATE_SECONDS,
    queryParams: {
      filterPublishTo: true,
      populate: "*",
      sort: "publishedAt:desc",
      pagination: { pageSize: 100 },
    },
  });

  const entries = Array.isArray(json?.data) ? json.data : [];

  return entries
    .map(mapBrochure)
    .filter((b): b is BrochureApiItem => b !== null);
}

/**
 * The PDF brochure for a given year, or null when there is none.
 */
export async function fetchBrochureByYear(
  year: number,
  signal?: AbortSignal
): Promise<BrochureApiItem | null> {
  const brochures = await fetchBrochures(signal);

  const exact = brochures.find((b) => b.year === year);
  if (exact) return exact;

  const anyYearKnown = brochures.some((b) => b.year !== undefined);
  return anyYearKnown ? null : brochures[0] ?? null;
}
