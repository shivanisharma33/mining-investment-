import type { CompanyItem } from "@/components/companiesData";
import {
  fetchStrapi,
  getStrapiMediaUrl,
  matchesPublishTo,
  type StrapiListResponse,
  type StrapiMedia,
} from "./strapi";

/**
 * Participating companies and their event editions, served by Strapi v5:
 *   /api/event-editions
 *   /api/participating-companies
 */

const PAGE_SIZE = 200;

export interface EventEdition {
  id: string;
  /** Edition label from Strapi, e.g. "Participating Companies 2027". */
  name: string;
  /** Parsed out of Strapi's `year` string, e.g. "Year 2027" → 2027. */
  year: number;
}

export interface StrapiEdition {
  id: number;
  documentId: string;
  name?: string;
  year?: string;
  publishTo?: string[] | string | null;
}

export interface StrapiCompany {
  id: number;
  documentId: string;
  companyName?: string;
  ticker?: string;
  type?: string;
  location?: string;
  industry?: string;
  website?: string;
  commodities?: unknown;
  publishTo?: string[] | string | null;
  logo?: StrapiMedia | null;
  event_edition?: StrapiEdition | null;
}

/** Strapi stores the year as a label ("Year 2027" or "2027"), not a raw number. */
function parseYear(value?: string): number | undefined {
  const match = value?.match(/(\d{4})/);
  return match ? Number(match[1]) : undefined;
}

/**
 * `commodities` is a free-form JSON field, and entries disagree on its shape:
 * one holds `{commodities: [...]}`, another `{data: {commodities: [...]}}`.
 * Bare arrays and comma-separated strings are accepted too.
 */
function parseCommodities(raw: unknown, depth = 0): string[] {
  if (!raw || depth > 4) return [];

  if (Array.isArray(raw)) {
    return raw.map((entry) => String(entry).trim()).filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw.split(",").map((entry) => entry.trim()).filter(Boolean);
  }

  if (typeof raw === "object") {
    const record = raw as Record<string, unknown>;
    if ("data" in record) return parseCommodities(record.data, depth + 1);
    if ("commodities" in record) return parseCommodities(record.commodities, depth + 1);
  }

  return [];
}

function mapEdition(entry: StrapiEdition): EventEdition | null {
  const year = parseYear(entry.year) ?? parseYear(entry.name);
  if (year === undefined) return null;

  return {
    id: entry.documentId,
    name: entry.name?.trim() || `Participating Companies ${year}`,
    year,
  };
}

/** Maps a Strapi record onto the shape the directory table already renders. */
export function mapCompany(item: StrapiCompany): CompanyItem | null {
  if (!matchesPublishTo(item.publishTo)) {
    return null;
  }

  const logoUrl = getStrapiMediaUrl(item.logo?.url) || undefined;

  return {
    _id: item.documentId,
    name: item.companyName?.trim() || "—",
    ticker: item.ticker?.trim() || "—",
    type: item.type?.trim() || "—",
    location: item.location?.trim() || "—",
    commodities: parseCommodities(item.commodities).join(", "),
    industry: item.industry?.trim() || undefined,
    website: item.website?.trim() || undefined,
    logo: logoUrl,
    year: parseYear(item.event_edition?.year) ?? parseYear(item.event_edition?.name),
    rawData: item,
  };
}

/** Event editions, newest first — drives the directory's edition filter. */
export async function fetchEventEditions(
  signal?: AbortSignal
): Promise<EventEdition[]> {
  const json = await fetchStrapi<StrapiListResponse<StrapiEdition>>(
    "/api/event-editions",
    {
      signal,
      queryParams: {
        filterPublishTo: false, // Editions collection is shared meta
        sort: "year:desc",
        pagination: { pageSize: PAGE_SIZE },
      },
    }
  );

  const entries = Array.isArray(json?.data) ? json.data : [];

  const editions = entries
    .map(mapEdition)
    .filter((edition): edition is EventEdition => edition !== null);

  return editions.sort((a, b) => b.year - a.year);
}

export interface FetchParticipatingCompaniesOptions {
  editionYear?: number;
  search?: string;
  signal?: AbortSignal;
}

/** Every participating company, across all editions or filtered by edition/search. */
export async function fetchParticipatingCompanies(
  signalOrOptions?: AbortSignal | FetchParticipatingCompaniesOptions
): Promise<CompanyItem[]> {
  const isSignal = signalOrOptions instanceof AbortSignal;
  const signal = isSignal ? signalOrOptions : signalOrOptions?.signal;
  const editionYear = !isSignal ? signalOrOptions?.editionYear : undefined;
  const search = !isSignal ? signalOrOptions?.search : undefined;

  const filters: Record<string, unknown> = {};

  if (editionYear !== undefined) {
    filters["event_edition"] = {
      $or: [
        { year: { $containsi: String(editionYear) } },
        { name: { $containsi: String(editionYear) } },
      ],
    };
  }

  if (search?.trim()) {
    const q = search.trim();
    filters["$or"] = [
      { companyName: { $containsi: q } },
      { ticker: { $containsi: q } },
      { location: { $containsi: q } },
      { industry: { $containsi: q } },
    ];
  }

  const json = await fetchStrapi<StrapiListResponse<StrapiCompany>>(
    "/api/participating-companies",
    {
      signal,
      queryParams: {
        filterPublishTo: true,
        populate: "*",
        sort: "companyName:asc",
        pagination: { pageSize: PAGE_SIZE },
        filters,
      },
    }
  );

  const entries = Array.isArray(json?.data) ? json.data : [];

  return entries
    .map(mapCompany)
    .filter((c): c is CompanyItem => c !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Companies for a single edition. Used by the 2027-specific pages. */
export async function fetchCompaniesByYear(
  year: number,
  signal?: AbortSignal
): Promise<CompanyItem[]> {
  return (await fetchParticipatingCompanies(signal)).filter(
    (company) => company.year === year
  );
}
