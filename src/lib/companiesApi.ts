import type { CompanyItem } from "@/components/companiesData";

export interface CompanyApiItem {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  website?: string;
  ticker?: string;
  type?: string;
  location?: string;
  industry?: string;
  employees?: string;
  headquarters?: string;
  commodities?: string[];
  year: number;
  contactEmail?: string;
  contactPhone?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  status: string;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  logo?: {
    url?: string;
    publicId?: string;
  };
}

interface CompaniesResponse {
  success: boolean;
  message: string;
  data: CompanyApiItem[];
}

/**
 * Same-origin proxy for https://mining-investment-backend.vercel.app/api/companies.
 * The backend returns no Access-Control-Allow-Origin header, so the browser
 * blocks a direct call — see src/app/api/companies/route.ts.
 */
export const COMPANIES_ENDPOINT = "/api/companies";

/** Maps an API record onto the shape the directory table already renders. */
export function mapCompany(item: CompanyApiItem): CompanyItem {
  return {
    _id: item._id,
    slug: item.slug,
    name: item.name,
    description: item.description?.trim() || undefined,
    ticker: item.ticker?.trim() || "—",
    type: item.type?.trim() || "—",
    location: item.location?.trim() || "—",
    industry: item.industry?.trim() || undefined,
    employees: item.employees?.trim() || undefined,
    headquarters: item.headquarters?.trim() || undefined,
    commodities: (item.commodities ?? []).filter(Boolean).join(", "),
    email: item.contactEmail?.trim() || undefined,
    contactPhone: item.contactPhone?.trim() || undefined,
    website: item.website?.trim() || undefined,
    social: item.social,
    status: item.status,
    isFeatured: item.isFeatured,
    seoTitle: item.seoTitle?.trim() || undefined,
    seoDescription: item.seoDescription?.trim() || undefined,
    isDeleted: item.isDeleted,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    logo: item.logo?.url || undefined,
    year: item.year,
    rawData: item,
  };
}

/**
 * Published companies for a given year, sorted by name. Used by the 2027
 * directory only — past editions keep using the bundled dataset.
 */
export async function fetchCompaniesByYear(
  year: number,
  signal?: AbortSignal
): Promise<CompanyItem[]> {
  const res = await fetch(COMPANIES_ENDPOINT, { signal });
  if (!res.ok) throw new Error(`Companies request failed (${res.status})`);

  const json: CompaniesResponse = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error(json?.message || "Unexpected companies response");
  }

  return json.data
    .filter(
      (item) =>
        item.year === year && item.status === "published" && !item.isDeleted
    )
    .map(mapCompany)
    .sort((a, b) => a.name.localeCompare(b.name));
}
