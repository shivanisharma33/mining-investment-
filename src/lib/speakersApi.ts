/**
 * Event speakers, served by the Strapi collection
 * https://typical-butterfly-3f86e59200.strapiapp.com/api/speakers
 */
import { RawSpeaker } from "@/app/past-editions/editionData";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://typical-butterfly-3f86e59200.strapiapp.com";

export const SPEAKERS_ENDPOINT = `${STRAPI_BASE_URL}/api/speakers?populate=*&sort=createdAt:desc&pagination[pageSize]=200`;

/** Server-side cache window. Ignored when this runs in the browser. */
export const SPEAKERS_REVALIDATE_SECONDS = 300;

interface StrapiMedia {
  url?: string;
  name?: string;
}

interface StrapiSpeaker {
  id: number;
  documentId: string;
  name?: string;
  speakerName?: string;
  title?: string;
  position?: string;
  role?: string;
  organization?: string;
  company?: string;
  category?: "gov" | "exec" | "fin" | "mod" | string;
  type?: string;
  year?: number | string;
  eventDate?: string;
  Year?: string | number;
  image?: StrapiMedia | null;
  photo?: StrapiMedia | null;
  avatar?: StrapiMedia | null;
  headshot?: StrapiMedia | null;
  days?: number[];
}

interface StrapiListResponse {
  data?: StrapiSpeaker[];
}

function parseYear(...values: Array<string | number | null | undefined>): number | undefined {
  for (const value of values) {
    if (typeof value === "number") return value;
    const match = String(value ?? "").match(/(\d{4})/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

function parseMediaUrl(media?: StrapiMedia | null): string | undefined {
  if (!media?.url) return undefined;
  const url = media.url.trim();
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_BASE_URL}${url}`;
}

function normalizeCategory(cat?: string, type?: string, title?: string): "gov" | "exec" | "fin" | "mod" {
  const text = `${cat || ""} ${type || ""} ${title || ""}`.toLowerCase();
  if (text.includes("gov") || text.includes("minister") || text.includes("ambassador") || text.includes("keynote")) {
    return "gov";
  }
  if (text.includes("fin") || text.includes("invest") || text.includes("capital") || text.includes("fund")) {
    return "fin";
  }
  if (text.includes("mod") || text.includes("chair")) {
    return "mod";
  }
  return "exec";
}

export function mapSpeaker(entry: StrapiSpeaker): RawSpeaker | null {
  const name = entry.name?.trim() || entry.speakerName?.trim();
  if (!name) return null;

  const title = entry.title?.trim() || entry.position?.trim() || entry.role?.trim() || "Speaker";
  const organization = entry.organization?.trim() || entry.company?.trim() || "";
  const media = entry.image || entry.photo || entry.avatar || entry.headshot;
  const image = parseMediaUrl(media);
  const year = parseYear(entry.year, entry.Year, entry.eventDate, entry.title);
  const category = normalizeCategory(entry.category, entry.type, entry.title);

  return {
    name,
    title,
    organization,
    category,
    days: Array.isArray(entry.days) ? entry.days : [1, 2, 3, 4],
    image,
    year,
  };
}

export async function fetchSpeakersFromApi(
  signal?: AbortSignal
): Promise<RawSpeaker[]> {
  const res = await fetch(SPEAKERS_ENDPOINT, {
    signal,
    next: { revalidate: SPEAKERS_REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Speakers request failed (${res.status})`);

  const json: StrapiListResponse = await res.json();
  const entries = Array.isArray(json?.data) ? json.data : [];

  return entries
    .map(mapSpeaker)
    .filter((sp): sp is RawSpeaker => sp !== null);
}

export async function fetchSpeakersByYear(
  year: number,
  signal?: AbortSignal
): Promise<RawSpeaker[]> {
  const speakers = await fetchSpeakersFromApi(signal);
  return speakers.filter((sp) => sp.year === year || sp.year === undefined);
}
