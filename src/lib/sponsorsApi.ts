import type { SponsorItem, SponsorTier } from "@/components/SponsorsView";

export interface SponsorApiItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  tier?: string;
  year: number;
  order?: number;
  status: string;
  isDeleted?: boolean;
  logo?: {
    url?: string;
    publicId?: string;
  };
}

interface SponsorsResponse {
  success: boolean;
  message: string;
  data: SponsorApiItem[];
}

/**
 * Same-origin proxy for https://mining-investment-backend.vercel.app/api/sponsors.
 * The backend returns no Access-Control-Allow-Origin header, so the browser
 * blocks a direct call — see src/app/api/sponsors/route.ts.
 */
export const SPONSORS_ENDPOINT = "/api/sponsors";

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

function normalizeTier(tier?: string): SponsorTier {
  const value = tier?.trim().toLowerCase() ?? "";
  return KNOWN_TIERS.has(value) ? (value as SponsorTier) : "media";
}

export function mapSponsor(item: SponsorApiItem): SponsorItem {
  return {
    name: item.name,
    website: item.website?.trim() ?? "",
    image: item.logo?.url || undefined,
    tier: normalizeTier(item.tier),
  };
}

/**
 * Published sponsors for a year, ordered by tier then by the backend's `order`
 * field, so the grid stays grouped the way the static lists were.
 */
export async function fetchSponsorsByYear(
  year: number,
  signal?: AbortSignal
): Promise<SponsorItem[]> {
  const res = await fetch(SPONSORS_ENDPOINT, { signal });
  if (!res.ok) throw new Error(`Sponsors request failed (${res.status})`);

  const json: SponsorsResponse = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error(json?.message || "Unexpected sponsors response");
  }

  return json.data
    .filter(
      (item) =>
        item.year === year && item.status === "published" && !item.isDeleted
    )
    .map((item) => ({ item, sponsor: mapSponsor(item) }))
    .sort((a, b) => {
      const tierDiff =
        TIER_RANK.indexOf(a.sponsor.tier) - TIER_RANK.indexOf(b.sponsor.tier);
      if (tierDiff !== 0) return tierDiff;

      const orderDiff = (a.item.order ?? 0) - (b.item.order ?? 0);
      if (orderDiff !== 0) return orderDiff;

      return a.sponsor.name.localeCompare(b.sponsor.name);
    })
    .map(({ sponsor }) => sponsor);
}
