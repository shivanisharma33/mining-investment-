/**
 * Event agendas, served by the Strapi collection
 * https://typical-butterfly-3f86e59200.strapiapp.com/api/agendas
 *
 * Strapi fields: title, eventDate, venue, city, country, pdfFile (media).
 * The media host sends `Access-Control-Allow-Origin: *`, so the PDF viewer and
 * the download helper can both read the file straight from the browser.
 */

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://typical-butterfly-3f86e59200.strapiapp.com";

export const AGENDAS_ENDPOINT = `${STRAPI_BASE_URL}/api/agendas?populate=*&sort=publishedAt:desc&pagination[pageSize]=100`;

/** Server-side cache window. Ignored when this runs in the browser. */
export const AGENDA_REVALIDATE_SECONDS = 300;

/** The shape the agenda, brochure and past-edition pages already render. */
export interface AgendaApiItem {
  _id: string;
  title: string;
  /** Derived from the PDF's file name; used for the download filename. */
  slug: string;
  year?: number;
  pdfUrl: string;
  description: string;
  eventDates: string;
  venue: string;
}

interface StrapiMedia {
  url?: string;
  name?: string;
}

interface StrapiAgenda {
  id: number;
  documentId: string;
  title?: string;
  eventDate?: string;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  pdfFile?: StrapiMedia | null;
}

interface StrapiListResponse {
  data?: StrapiAgenda[];
}

function parseYear(...values: Array<string | null | undefined>): number | undefined {
  for (const value of values) {
    const match = value?.match(/(\d{4})/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

function mapAgenda(entry: StrapiAgenda): AgendaApiItem | null {
  const pdfUrl = entry.pdfFile?.url?.trim();
  if (!pdfUrl) return null;

  const title = entry.title?.trim() || "Event Agenda";

  return {
    _id: entry.documentId,
    title,
    slug: (entry.pdfFile?.name ?? "").replace(/\.pdf$/i, "").trim() || entry.documentId,
    year: parseYear(entry.eventDate, title),
    pdfUrl,
    // Strapi has no description field; the pages supply their own copy.
    description: "",
    eventDates: entry.eventDate?.trim() || "",
    venue: [entry.venue, entry.city, entry.country]
      .map((part) => part?.trim())
      .filter(Boolean)
      .join(", "),
  };
}

/** Every published agenda that has a PDF attached, newest first. */
export async function fetchPdfAgendas(
  signal?: AbortSignal
): Promise<AgendaApiItem[]> {
  const res = await fetch(AGENDAS_ENDPOINT, {
    signal,
    next: { revalidate: AGENDA_REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Agenda request failed (${res.status})`);

  const json: StrapiListResponse = await res.json();
  const entries = Array.isArray(json?.data) ? json.data : [];

  return entries
    .map(mapAgenda)
    .filter((agenda): agenda is AgendaApiItem => agenda !== null);
}

/**
 * The PDF agenda for a given year, or null when there is none. Past editions
 * keep their bundled files in /public/documents.
 */
export async function fetchPdfAgendaByYear(
  year: number,
  signal?: AbortSignal
): Promise<AgendaApiItem | null> {
  const agendas = await fetchPdfAgendas(signal);

  const exact = agendas.find((agenda) => agenda.year === year);
  if (exact) return exact;

  // Entries whose eventDate carries no year would otherwise never match, so
  // fall back to the newest agenda when no entry states a year at all.
  const anyYearKnown = agendas.some((agenda) => agenda.year !== undefined);
  return anyYearKnown ? null : agendas[0] ?? null;
}
