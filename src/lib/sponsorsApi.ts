import type { SponsorItem, SponsorTier } from "@/components/SponsorsView";
import {
  fetchStrapi,
  getStrapiMediaUrl,
  type StrapiListResponse,
  type StrapiMedia,
} from "./strapi";

/**
 * Media & partners, served by the Strapi v5 collection
 * /api/media-partners
 *
 * Strapi fields: name, website, tier, Type, Year, displayOrder, logo (media), publishTo.
 */

export interface StrapiMediaPartner {
  id: number;
  documentId: string;
  name?: string;
  website?: string;
  tier?: string;
  Type?: string;
  Year?: string;
  displayOrder?: number;
  publishTo?: string[] | string | null;
  logo?: StrapiMedia | null;
}

/** Display order of the tiers, highest first. */
export const TIER_RANK: SponsorTier[] = [
  "presenting",
  "platinum",
  "gold",
  "green",
  "sustainable",
  "silver",
  "copper",
  "bronze",
  "government",
  "media",
];

const KNOWN_TIERS = new Set<string>(TIER_RANK);

function matchTier(value?: string): SponsorTier | null {
  const normalized = value?.trim().toLowerCase() ?? "";
  return KNOWN_TIERS.has(normalized) ? (normalized as SponsorTier) : null;
}

/**
 * `Type` carries the real tier; `tier` may read "MEDIA & PARTNERS".
 * Anything unrecognised lands in the media tier.
 */
export function normalizeTier(entry: StrapiMediaPartner): SponsorTier {
  return matchTier(entry.Type) ?? matchTier(entry.tier) ?? "media";
}

/** Converts a year number or string into Strapi's exact Year field format (e.g. "Media & Partners 2027"). */
export function formatMediaPartnersYear(year: number | string = 2027): string {
  if (typeof year === "string" && year.startsWith("Media & Partners")) {
    return year;
  }
  return `Media & Partners ${year}`;
}

/** Strapi stores the edition as a label ("Media & Partners 2027" or "2027"). */
export function parseYear(value?: string): number | undefined {
  const match = value?.match(/(\d{4})/);
  return match ? Number(match[1]) : undefined;
}

export function mapSponsor(entry: StrapiMediaPartner): SponsorItem {
  const logoUrl = getStrapiMediaUrl(entry.logo?.url) || undefined;

  return {
    name: entry.name?.trim() || "",
    website: entry.website?.trim() ?? "",
    image: logoUrl,
    tier: normalizeTier(entry),
  };
}

export interface FetchSponsorsOptions {
  year?: number | string;
  tier?: string;
  signal?: AbortSignal;
}

/**
 * Fetches media partners from Strapi v5 with server-side Year and populate filtering.
 */
export async function fetchSponsors(
  options: FetchSponsorsOptions = {}
): Promise<SponsorItem[]> {
  const { year = 2027, tier, signal } = options;
  const yearFilterValue = formatMediaPartnersYear(year);

  // Build server-side filters
  const filters: Record<string, unknown> = {
    Year: { $eq: yearFilterValue },
  };

  // Tier filter: "ALL MEDIA & PARTNERS" is not a Strapi tier.
  if (tier && !tier.toUpperCase().includes("ALL")) {
    const cleanTier = tier.replace(/MEDIA\s*&\s*PARTNERS/i, "").trim();
    if (cleanTier) {
      filters["$or"] = [
        { Type: { $containsi: cleanTier } },
        { tier: { $containsi: cleanTier } },
      ];
    }
  }

  let page = 1;
  const pageSize = 100;
  const allEntries: StrapiMediaPartner[] = [];

  const initialJson = await fetchStrapi<StrapiListResponse<StrapiMediaPartner>>(
    "/api/media-partners",
    {
      signal,
      queryParams: {
        filterPublishTo: false, // We handle exact Year query and event filtering explicitly
        populate: "*",
        pagination: { page, pageSize },
        filters,
      },
    }
  );

  const initialData = Array.isArray(initialJson?.data) ? initialJson.data : [];
  allEntries.push(...initialData);

  const totalPages = initialJson?.meta?.pagination?.pageCount ?? 1;

  while (page < totalPages) {
    page++;
    const nextPageJson = await fetchStrapi<StrapiListResponse<StrapiMediaPartner>>(
      "/api/media-partners",
      {
        signal,
        queryParams: {
          filterPublishTo: false,
          populate: "*",
          pagination: { page, pageSize },
          filters,
        },
      }
    );
    const nextData = Array.isArray(nextPageJson?.data) ? nextPageJson.data : [];
    allEntries.push(...nextData);
  }

  return allEntries
    .filter((entry) => {
      // Exclude records belonging to other events (e.g., Noble Mining Conference)
      if (entry.publishTo && typeof entry.publishTo === "string" && entry.publishTo.includes("Noble")) {
        return false;
      }
      if (!entry.name?.trim()) return false;
      return true;
    })
    .map((entry) => ({ entry, sponsor: mapSponsor(entry) }))
    .sort((a, b) => {
      const tierDiff =
        TIER_RANK.indexOf(a.sponsor.tier) - TIER_RANK.indexOf(b.sponsor.tier);
      if (tierDiff !== 0) return tierDiff;

      const orderDiff = (a.entry.displayOrder ?? 0) - (b.entry.displayOrder ?? 0);
      if (orderDiff !== 0) return orderDiff;

      return a.sponsor.name.localeCompare(b.sponsor.name);
    })
    .map(({ sponsor }) => sponsor);
}

/**
 * Media & partners for a year, ordered by tier then by Strapi's displayOrder.
 */
export async function fetchSponsorsByYear(
  year: number | string = 2027,
  signal?: AbortSignal
): Promise<SponsorItem[]> {
  return fetchSponsors({ year, signal });
}
