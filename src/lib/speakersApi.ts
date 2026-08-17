/**
 * Event speakers, served by the Strapi v5 collection
 * /api/speakers
 */
import { RawSpeaker } from "@/app/past-editions/editionData";
import {
  fetchStrapi,
  getStrapiMediaUrl,
  matchesPublishTo,
  type StrapiListResponse,
  type StrapiMedia,
} from "./strapi";

/** Server-side cache window (5 minutes). */
export const SPEAKERS_REVALIDATE_SECONDS = 300;

export interface StrapiSpeaker {
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
  publishTo?: string[] | string | null;
  profileImage?: StrapiMedia | null;
  image?: StrapiMedia | null;
  photo?: StrapiMedia | null;
  avatar?: StrapiMedia | null;
  headshot?: StrapiMedia | null;
  days?: number[];
}

function parseYear(...values: Array<string | number | null | undefined>): number | undefined {
  for (const value of values) {
    if (typeof value === "number") return value;
    const match = String(value ?? "").match(/(\d{4})/);
    if (match) return Number(match[1]);
  }
  return undefined;
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
  if (!matchesPublishTo(entry.publishTo)) {
    return null;
  }

  const name = entry.name?.trim() || entry.speakerName?.trim();
  if (!name) return null;

  const title = entry.title?.trim() || entry.position?.trim() || entry.role?.trim() || "Speaker";
  const organization = entry.organization?.trim() || entry.company?.trim() || "";
  const media = entry.profileImage || entry.image || entry.photo || entry.avatar || entry.headshot;
  const image = getStrapiMediaUrl(media?.url) || undefined;
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

export interface FetchSpeakersOptions {
  year?: number;
  category?: string;
  search?: string;
  signal?: AbortSignal;
}

export async function fetchSpeakersFromApi(
  optionsOrSignal?: AbortSignal | FetchSpeakersOptions
): Promise<RawSpeaker[]> {
  const isSignal = optionsOrSignal instanceof AbortSignal;
  const signal = isSignal ? optionsOrSignal : optionsOrSignal?.signal;
  const year = !isSignal ? optionsOrSignal?.year : undefined;
  const category = !isSignal ? optionsOrSignal?.category : undefined;
  const search = !isSignal ? optionsOrSignal?.search : undefined;

  const filters: Record<string, unknown> = {};

  if (year !== undefined) {
    filters["$or"] = [
      { year: { $containsi: String(year) } },
      { Year: { $containsi: String(year) } },
      { eventDate: { $containsi: String(year) } },
    ];
  }

  if (category) {
    filters["category"] = { $containsi: category };
  }

  if (search?.trim()) {
    const q = search.trim();
    filters["$or"] = [
      { name: { $containsi: q } },
      { speakerName: { $containsi: q } },
      { title: { $containsi: q } },
      { organization: { $containsi: q } },
    ];
  }

  const json = await fetchStrapi<StrapiListResponse<StrapiSpeaker>>("/api/speakers", {
    signal,
    revalidate: SPEAKERS_REVALIDATE_SECONDS,
    queryParams: {
      filterPublishTo: true,
      populate: "*",
      sort: "createdAt:desc",
      pagination: { pageSize: 200 },
      filters,
    },
  });

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
