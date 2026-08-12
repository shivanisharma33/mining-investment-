import AgendaClient from "./AgendaClient";
import { fetchPdfAgendaByYear, type AgendaApiItem } from "@/lib/agendaApi";

// Must be a literal — Next statically analyses segment config exports.
// Keep in sync with AGENDA_REVALIDATE_SECONDS in @/lib/agendaApi.
export const revalidate = 300;

const AGENDA_YEAR = 2027;

export default async function AgendaPage() {
  let agenda: AgendaApiItem | null = null;
  let agendaError = "";

  // Fetched here rather than in the browser so the title, dates, venue and PDF
  // link are in the server-rendered HTML instead of arriving after a spinner.
  try {
    agenda = await fetchPdfAgendaByYear(AGENDA_YEAR);
  } catch (error) {
    console.error("Failed to fetch the agenda:", error);
    agendaError =
      error instanceof Error ? error.message : "Unable to load the agenda";
  }

  return <AgendaClient agenda={agenda} agendaError={agendaError} />;
}
