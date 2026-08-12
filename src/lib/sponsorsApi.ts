import type { SponsorItem, SponsorTier } from "@/components/SponsorsView";

/**
 * Media & partners, served by the Strapi collection
 * https://typical-butterfly-3f86e59200.strapiapp.com/api/media-partners
 *
 * Strapi answers cross-origin requests, so this runs straight from the browser.
 */
const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://typical-butterfly-3f86e59200.strapiapp.com";

export const SPONSORS_ENDPOINT = `${STRAPI_BASE_URL}/api/media-partners?populate=*&pagination[pageSize]=200`;

interface StrapiMediaPartner {
  id: number;
  documentId: string;
  name?: string;
  website?: string;
  /** Uniformly "MEDIA & PARTNERS" on every record — see normalizeTier(). */
  tier?: string;
  /** Where the real tier lives: Platinum, Gold, Silver, Copper, Bronze, … */
  Type?: string;
  /** Edition label, e.g. "Media & Partners 2027". */
  Year?: string;
  displayOrder?: number;
  logo?: { url?: string } | null;
}

interface StrapiListResponse {
  data?: StrapiMediaPartner[];
}

/** Display order of the tiers, highest first. */
const TIER_RANK: SponsorTier[] = [
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
 * `Type` carries the real tier; the `tier` field reads "MEDIA & PARTNERS" on
 * every record, so relying on it would flatten the whole grid into one band.
 * Anything unrecognised ("MEDIA & PARTNERS" itself) lands in the media tier.
 */
function normalizeTier(entry: StrapiMediaPartner): SponsorTier {
  return matchTier(entry.Type) ?? matchTier(entry.tier) ?? "media";
}

/** Strapi stores the edition as a label ("Media & Partners 2027"). */
function parseYear(value?: string): number | undefined {
  const match = value?.match(/(\d{4})/);
  return match ? Number(match[1]) : undefined;
}

export function mapSponsor(entry: StrapiMediaPartner): SponsorItem {
  return {
    name: entry.name?.trim() || "",
    website: entry.website?.trim() ?? "",
    image: entry.logo?.url || undefined,
    tier: normalizeTier(entry),
  };
}

/**
 * Media & partners for a year, ordered by tier then by Strapi's displayOrder,
 * so the grid stays grouped the way the static lists were.
 */
export async function fetchSponsorsByYear(
  year: number,
  signal?: AbortSignal
): Promise<SponsorItem[]> {
  const res = await fetch(SPONSORS_ENDPOINT, { signal });
  if (!res.ok) throw new Error(`Sponsors request failed (${res.status})`);

  const json: StrapiListResponse = await res.json();
  const entries = Array.isArray(json?.data) ? json.data : [];

  return entries
    .filter((entry) => {
      if (!entry.name?.trim()) return false;
      const entryYear = parseYear(entry.Year);
      // Records with no year stated still belong to the current edition.
      return entryYear === undefined || entryYear === year;
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
