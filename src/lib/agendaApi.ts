export interface AgendaApiItem {
  _id: string;
  title: string;
  slug: string;
  year: number;
  pdfUrl: string;
  pdfPublicId?: string;
  scheduleType: "pdf" | "interactive" | string;
  eventDates: string;
  venue: string;
  description: string;
  status: string;
  isDeleted?: boolean;
}

interface AgendasResponse {
  success: boolean;
  message: string;
  data: AgendaApiItem[];
}


export const AGENDAS_ENDPOINT = "/api/agendas";

/**
 * Returns the published PDF agenda for a given year, or null when the backend
 * has no PDF schedule for it. Used by the 2027 agenda page only — past editions
 * keep their bundled files in /public/documents.
 */
export async function fetchPdfAgendaByYear(
  year: number,
  signal?: AbortSignal
): Promise<AgendaApiItem | null> {
  const res = await fetch(AGENDAS_ENDPOINT, { signal });
  if (!res.ok) throw new Error(`Agenda request failed (${res.status})`);

  const json: AgendasResponse = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error(json?.message || "Unexpected agenda response");
  }

  return (
    json.data.find(
      (item) =>
        item.year === year &&
        item.status === "published" &&
        !item.isDeleted &&
        item.scheduleType === "pdf" &&
        Boolean(item.pdfUrl)
    ) ?? null
  );
}
