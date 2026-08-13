/**
 * Event brochures, served by the Strapi collection
 * https://typical-butterfly-3f86e59200.strapiapp.com/api/brochures
 */

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://typical-butterfly-3f86e59200.strapiapp.com";

export const BROCHURES_ENDPOINT = `${STRAPI_BASE_URL}/api/brochures?populate=*&sort=publishedAt:desc&pagination[pageSize]=100`;

/** Server-side cache window. Ignored when this runs in the browser. */
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

interface StrapiMedia {
  url?: string;
  name?: string;
}

interface StrapiBrochure {
  id: number;
  documentId: string;
  title?: string;
  name?: string;
  eventDate?: string;
  year?: number | string;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  pdfFile?: StrapiMedia | null;
  pdf?: StrapiMedia | null;
  file?: StrapiMedia | null;
  document?: StrapiMedia | null;
  url?: string | null;
}

interface StrapiListResponse {
  data?: StrapiBrochure[];
}

function parseYear(...values: Array<string | null | undefined>): number | undefined {
  for (const value of values) {
    const match = value?.match(/(\d{4})/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

function parseMediaUrl(urlRaw?: string): string | undefined {
  if (!urlRaw) return undefined;
  const trimmed = urlRaw.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `${STRAPI_BASE_URL}${trimmed}`;
}

export function mapBrochure(entry: StrapiBrochure): BrochureApiItem | null {
  const media = entry.pdfFile || entry.pdf || entry.file || entry.document;
  const pdfUrl = parseMediaUrl(media?.url || entry.url || undefined);

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

/** Every published brochure that has a PDF attached, newest first. */
export async function fetchBrochures(
  signal?: AbortSignal
): Promise<BrochureApiItem[]> {
  const res = await fetch(BROCHURES_ENDPOINT, {
    signal,
    next: { revalidate: BROCHURE_REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Brochure request failed (${res.status})`);

  const json: StrapiListResponse = await res.json();
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
