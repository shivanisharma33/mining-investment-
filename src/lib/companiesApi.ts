import type { CompanyItem } from "@/components/companiesData";

/**
 * Participating companies and their event editions, served by Strapi:
 *   https://typical-butterfly-3f86e59200.strapiapp.com/api/event-editions
 *   https://typical-butterfly-3f86e59200.strapiapp.com/api/participating-companies
 *
 * Strapi answers cross-origin requests, so these run straight from the browser
 * — no same-origin proxy route needed.
 */
const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://typical-butterfly-3f86e59200.strapiapp.com";

/** pageSize covers both collections in a single request. */
const PAGE_SIZE = 200;

export const EVENT_EDITIONS_ENDPOINT = `${STRAPI_BASE_URL}/api/event-editions?sort=year:desc&pagination[pageSize]=${PAGE_SIZE}`;
export const PARTICIPATING_COMPANIES_ENDPOINT = `${STRAPI_BASE_URL}/api/participating-companies?populate=*&sort=companyName:asc&pagination[pageSize]=${PAGE_SIZE}`;

export interface EventEdition {
  id: string;
  /** Edition label from Strapi, e.g. "Participating Companies 2027". */
  name: string;
  /** Parsed out of Strapi's `year` string, e.g. "Year 2027" → 2027. */
  year: number;
}

interface StrapiEdition {
  id: number;
  documentId: string;
  name?: string;
  year?: string;
}

interface StrapiCompany {
  id: number;
  documentId: string;
  companyName?: string;
  ticker?: string;
  type?: string;
  location?: string;
  industry?: string;
  website?: string;
  commodities?: unknown;
  logo?: { url?: string } | null;
  event_edition?: StrapiEdition | null;
}

interface StrapiListResponse<T> {
  data?: T[];
}

/** Strapi stores the year as a label ("Year 2027"), not a number. */
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
export function mapCompany(item: StrapiCompany): CompanyItem {
  return {
    _id: item.documentId,
    name: item.companyName?.trim() || "—",
    ticker: item.ticker?.trim() || "—",
    type: item.type?.trim() || "—",
    location: item.location?.trim() || "—",
    commodities: parseCommodities(item.commodities).join(", "),
    industry: item.industry?.trim() || undefined,
    website: item.website?.trim() || undefined,
    logo: item.logo?.url || undefined,
    year: parseYear(item.event_edition?.year) ?? parseYear(item.event_edition?.name),
    rawData: item,
  };
}

async function fetchList<T>(url: string, signal?: AbortSignal): Promise<T[]> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);

  const json: StrapiListResponse<T> = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

/** Event editions, newest first — drives the directory's edition filter. */
export async function fetchEventEditions(
  signal?: AbortSignal
): Promise<EventEdition[]> {
  const editions = (await fetchList<StrapiEdition>(EVENT_EDITIONS_ENDPOINT, signal))
    .map(mapEdition)
    .filter((edition): edition is EventEdition => edition !== null);

  return editions.sort((a, b) => b.year - a.year);
}

/** Every participating company, across all editions, sorted by name. */
export async function fetchParticipatingCompanies(
  signal?: AbortSignal
): Promise<CompanyItem[]> {
  const companies = await fetchList<StrapiCompany>(
    PARTICIPATING_COMPANIES_ENDPOINT,
    signal
  );

  return companies.map(mapCompany).sort((a, b) => a.name.localeCompare(b.name));
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
