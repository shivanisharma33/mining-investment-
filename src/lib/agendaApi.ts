/**
 * Event agendas, served by the Strapi v5 collection
 * /api/agendas
 *
 * Strapi fields: title, eventDate, venue, city, country, pdfFile (media), publishTo.
 */

import {
  fetchStrapi,
  getStrapiMediaUrl,
  matchesPublishTo,
  type StrapiListResponse,
  type StrapiMedia,
} from "./strapi";

/** Server-side cache window (5 minutes). */
export const AGENDA_REVALIDATE_SECONDS = 300;

/** The shape the agenda, brochure and past-edition pages render. */
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

export interface StrapiAgenda {
  id: number;
  documentId: string;
  title?: string;
  eventDate?: string;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  publishTo?: string[] | string | null;
  pdfFile?: StrapiMedia | null;
}

function parseYear(...values: Array<string | null | undefined>): number | undefined {
  for (const value of values) {
    const match = value?.match(/(\d{4})/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

export function mapAgenda(entry: StrapiAgenda): AgendaApiItem | null {
  if (!matchesPublishTo(entry.publishTo)) {
    return null;
  }

  const rawUrl = entry.pdfFile?.url?.trim();
  const pdfUrl = getStrapiMediaUrl(rawUrl);
  if (!pdfUrl) return null;

  const title = entry.title?.trim() || "Event Agenda";

  return {
    _id: entry.documentId,
    title,
    slug: (entry.pdfFile?.name ?? "").replace(/\.pdf$/i, "").trim() || entry.documentId,
    year: parseYear(entry.eventDate, title),
    pdfUrl,
    description: "",
    eventDates: entry.eventDate?.trim() || "",
    venue: [entry.venue, entry.city, entry.country]
      .map((part) => part?.trim())
      .filter(Boolean)
      .join(", "),
  };
}

/** Every published agenda that has a PDF attached, newest first, filtered by publishTo. */
export async function fetchPdfAgendas(
  signal?: AbortSignal
): Promise<AgendaApiItem[]> {
  const json = await fetchStrapi<StrapiListResponse<StrapiAgenda>>("/api/agendas", {
    signal,
    revalidate: AGENDA_REVALIDATE_SECONDS,
    queryParams: {
      filterPublishTo: true,
      populate: "*",
      sort: "publishedAt:desc",
      pagination: { pageSize: 100 },
    },
  });

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

  // Fall back to the newest agenda when no entry states an exact matching year.
  const anyYearKnown = agendas.some((agenda) => agenda.year !== undefined);
  return anyYearKnown ? null : agendas[0] ?? null;
}
