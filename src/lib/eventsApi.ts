import type { AgendaDay, AgendaItem } from "@/app/past-editions/editionData";

export interface EventApiAgendaItem {
  time?: string;
  title?: string;
  description?: string;
  speaker?: string;
  location?: string;
  _id?: string;
}

export interface EventApiAgendaDay {
  day?: string;
  date?: string;
  items?: EventApiAgendaItem[];
  _id?: string;
}

export interface EventApiItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  year: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  venue?: string;
  status: string;
  isDeleted?: boolean;
  agenda?: EventApiAgendaDay[];
  interactiveAgenda?: EventApiAgendaDay[];
}

interface EventsResponse {
  success: boolean;
  message: string;
  data: EventApiItem[];
}

/**
 * Same-origin proxy for https://mining-investment-backend.vercel.app/api/events.
 * The backend returns no Access-Control-Allow-Origin header, so the browser
 * blocks a direct call — see src/app/api/events/route.ts.
 */
export const EVENTS_ENDPOINT = "/api/events";

/** Day-tab accent colours, matching the static editions palette. */
const DAY_ACCENTS = ["#3a4150", "#1479c4", "#00a58c", "#d99100"];

/**
 * Maps a session onto the badge vocabulary AgendaView already styles. The API
 * carries no session type, so it is inferred from the title and description.
 * "pres" is deliberately never inferred — that layout needs a company name.
 */
function inferItemType(item: EventApiAgendaItem): AgendaItem["type"] {
  const text = `${item.title ?? ""} ${item.description ?? ""}`.toLowerCase();

  if (/\bgala\b|casino/.test(text)) return "gala";
  if (/keynote/.test(text)) return "keynote";
  if (/\bpanel\b/.test(text)) return "panel";
  if (/spotlight|fireside/.test(text)) return "spotlight";
  if (/closing/.test(text)) return "closing";
  if (/remarks|opening address/.test(text)) return "remarks";
  if (/networking|cocktail|lounge|golf|welcome|reception|after dark/.test(text))
    return "networking";

  return "logistics";
}

/** "May 31, 2027 - Monday" -> { tab: "May 31", sub: "Monday" } */
function splitDayLabel(dayLabel: string): { tab: string; sub: string } {
  const [datePart = "", weekday = ""] = dayLabel.split(/\s+-\s+/);
  const tab = datePart.replace(/,\s*\d{4}\s*$/, "").trim();

  return { tab: tab || dayLabel, sub: weekday.trim() };
}

function buildSubtitle(item: EventApiAgendaItem): string | undefined {
  const description = item.description?.trim();
  const location = item.location?.trim();

  if (!description) return location || undefined;
  if (!location || description.toLowerCase().includes(location.toLowerCase())) {
    return description;
  }

  return `${description} — ${location}`;
}

export function mapEventAgendaToDays(event: EventApiItem): AgendaDay[] {
  const source = event.interactiveAgenda?.length
    ? event.interactiveAgenda
    : event.agenda ?? [];

  return source
    .filter((day) => day.items?.length)
    .map((day, idx) => {
      const dayLabel = day.day?.trim() || day.date || `Day ${idx + 1}`;
      const { tab, sub } = splitDayLabel(dayLabel);

      return {
        id: day._id || `day-${idx}`,
        tab,
        sub,
        title: dayLabel.toUpperCase(),
        accent: DAY_ACCENTS[idx % DAY_ACCENTS.length],
        items: (day.items ?? []).map((item) => ({
          t: item.time?.trim(),
          type: inferItemType(item),
          only: item.title?.trim(),
          sub: buildSubtitle(item),
          // Not rendered for these types, but keeps speakers searchable.
          sp: item.speaker?.trim() || undefined,
        })),
      };
    });
}

/** "May 31 – June 3, 2027" from the event's start/end dates. */
export function formatEventDates(event: EventApiItem): string | undefined {
  if (!event.startDate || !event.endDate) return undefined;

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return undefined;

  const monthDay = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

  return `${monthDay(start)} – ${monthDay(end)}, ${end.getUTCFullYear()}`;
}

/**
 * Returns the published event for a given year. Used by the 2027 agenda page
 * only — past editions keep rendering the bundled AGENDA_DAYS data.
 */
export async function fetchEventByYear(
  year: number,
  signal?: AbortSignal
): Promise<EventApiItem | null> {
  const res = await fetch(EVENTS_ENDPOINT, { signal });
  if (!res.ok) throw new Error(`Event request failed (${res.status})`);

  const json: EventsResponse = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error(json?.message || "Unexpected events response");
  }

  return (
    json.data.find(
      (item) =>
        item.year === year &&
        item.status === "published" &&
        !item.isDeleted &&
        Boolean(item.interactiveAgenda?.length || item.agenda?.length)
    ) ?? null
  );
}
