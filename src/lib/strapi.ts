/**
 * Centralized Strapi v5 API Utility
 *
 * Provides typed helpers for URL construction, media URL normalization,
 * query parameter generation (including server-side `publishTo` filtering),
 * and standard fetch operations against Strapi v5 backend.
 */

export const STRAPI_DEFAULT_BASE_URL =
  "https://typical-butterfly-3f86e59200.strapiapp.com";

export const STRAPI_DEFAULT_SITE_NAME = "Mining Investment Event";

/**
 * Returns the base URL for the Strapi instance.
 */
export function getStrapiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL?.trim();
  return (url || STRAPI_DEFAULT_BASE_URL).replace(/\/+$/, "");
}

/**
 * Returns the active site name used for filtering multi-tenant content.
 */
export function getSiteName(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_NAME?.trim() || STRAPI_DEFAULT_SITE_NAME
  );
}

/**
 * Constructs an absolute Strapi API URL for a given path.
 *
 * @param path - API path (e.g. `/api/agendas` or `api/speakers`)
 */
export function getStrapiUrl(path: string = ""): string {
  const base = getStrapiBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Resolves a Strapi media URL to an absolute URL.
 * Supports:
 * - Relative URLs from Strapi local uploads (e.g., `/uploads/image.png`)
 * - Absolute URLs from Cloud storage providers (e.g., `https://...media.strapiapp.com/...`)
 * - Handles null / undefined / empty values gracefully.
 */
export function getStrapiMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("//")) {
    return trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
  }

  const base = getStrapiBaseUrl();
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${base}${cleanPath}`;
}

/* ── Strapi v5 Common Types ────────────────────────────────────────────── */

export interface StrapiMedia {
  id?: number;
  documentId?: string;
  name?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  url?: string;
  formats?: Record<string, { url?: string; width?: number; height?: number }> | null;
  ext?: string;
  mime?: string;
  size?: number;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination?: StrapiPagination;
}

export interface StrapiListResponse<T> {
  data?: T[];
  meta?: StrapiMeta;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
}

export interface StrapiSingleResponse<T> {
  data?: T | null;
  meta?: StrapiMeta;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
}

/* ── Query Builder Options ─────────────────────────────────────────────── */

export interface StrapiFilterField {
  [operator: string]: string | number | boolean | Array<string | number> | undefined;
}

export interface StrapiQueryParams {
  /**
   * Whether to apply the `publishTo` multi-value enumeration filter.
   * Defaults to true for all shared content types.
   */
  filterPublishTo?: boolean;
  /**
   * Custom site name override for `publishTo` filtering.
   * Defaults to `getSiteName()`.
   */
  siteName?: string;
  /**
   * Relations/media populate strategy (e.g. `*` or `['pdfFile', 'coverImage']` or `{ pdfFile: true }`).
   */
  populate?: string | string[] | Record<string, unknown>;
  /**
   * Sort expression (e.g. `publishedAt:desc` or `['date:desc', 'title:asc']`).
   */
  sort?: string | string[];
  /**
   * Pagination options.
   */
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  /**
   * Additional custom filter expressions.
   */
  filters?: Record<string, StrapiFilterField | Record<string, unknown> | unknown>;
  /**
   * Raw additional search params.
   */
  customParams?: Record<string, string | number | boolean | undefined>;
}

/**
 * Builds a query string for Strapi v5 API endpoints.
 */
export function buildStrapiQuery(params: StrapiQueryParams = {}): string {
  const searchParams = new URLSearchParams();
  const {
    filterPublishTo = true,
    siteName = getSiteName(),
    populate = "*",
    sort,
    pagination,
    filters = {},
    customParams = {},
  } = params;

  // 1. Populate
  if (typeof populate === "string") {
    searchParams.append("populate", populate);
  } else if (Array.isArray(populate)) {
    populate.forEach((field, idx) => {
      searchParams.append(`populate[${idx}]`, field);
    });
  } else if (typeof populate === "object" && populate !== null) {
    Object.entries(populate).forEach(([key, value]) => {
      searchParams.append(`populate[${key}]`, typeof value === "object" ? JSON.stringify(value) : String(value));
    });
  }

  // 2. Sort
  if (typeof sort === "string") {
    searchParams.append("sort", sort);
  } else if (Array.isArray(sort)) {
    sort.forEach((s, idx) => {
      searchParams.append(`sort[${idx}]`, s);
    });
  }

  // 3. Pagination
  if (pagination) {
    if (pagination.page !== undefined) searchParams.append("pagination[page]", String(pagination.page));
    if (pagination.pageSize !== undefined) searchParams.append("pagination[pageSize]", String(pagination.pageSize));
    if (pagination.start !== undefined) searchParams.append("pagination[start]", String(pagination.start));
    if (pagination.limit !== undefined) searchParams.append("pagination[limit]", String(pagination.limit));
  }

  // 4. publishTo Filter (multi-value enumeration in Strapi v5 uses $contains / $containsi)
  if (filterPublishTo && siteName) {
    searchParams.append("filters[publishTo][$contains]", siteName);
  }

  // 5. Additional filters
  const flattenFilters = (obj: Record<string, unknown>, prefix: string = "filters") => {
    for (const [key, val] of Object.entries(obj)) {
      if (val === undefined || val === null) continue;
      const currentKey = `${prefix}[${key}]`;
      if (typeof val === "object" && !Array.isArray(val)) {
        flattenFilters(val as Record<string, unknown>, currentKey);
      } else if (Array.isArray(val)) {
        val.forEach((item, idx) => {
          searchParams.append(`${currentKey}[${idx}]`, String(item));
        });
      } else {
        searchParams.append(currentKey, String(val));
      }
    }
  };

  flattenFilters(filters);

  // 6. Custom extra params
  for (const [key, val] of Object.entries(customParams)) {
    if (val !== undefined && val !== null) {
      searchParams.append(key, String(val));
    }
  }

  return searchParams.toString();
}

/* ── Fetch Helper ──────────────────────────────────────────────────────── */

export interface FetchStrapiOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
  queryParams?: StrapiQueryParams;
}

/**
 * Fetch wrapper for Strapi v5 endpoints.
 *
 * @param endpoint - Endpoint path (e.g. `/api/agendas`)
 * @param options - Fetch options and query parameters
 */
export async function fetchStrapi<T>(
  endpoint: string,
  options: FetchStrapiOptions = {}
): Promise<T> {
  const { queryParams, revalidate, tags, headers, signal, ...rest } = options;

  const queryString = queryParams ? buildStrapiQuery(queryParams) : "";
  const fullPath = queryString ? `${endpoint}?${queryString}` : endpoint;
  const url = fullPath.startsWith("http://") || fullPath.startsWith("https://")
    ? fullPath
    : getStrapiUrl(fullPath);

  const fetchOptions: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
    ...rest,
    signal,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (revalidate !== undefined || tags !== undefined) {
    fetchOptions.next = {
      ...(revalidate !== undefined ? { revalidate } : {}),
      ...(tags !== undefined ? { tags } : {}),
    };
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    let errorDetail = "";
    try {
      const errJson = await res.json();
      errorDetail = errJson?.error?.message || JSON.stringify(errJson);
    } catch {
      errorDetail = await res.text().catch(() => "");
    }
    throw new Error(
      `Strapi request failed for ${endpoint} (${res.status} ${res.statusText})${
        errorDetail ? `: ${errorDetail}` : ""
      }`
    );
  }

  return (await res.json()) as T;
}

/**
 * Client-side verification helper to confirm a record belongs to the current site.
 * Used as an additional safeguard on mapped data.
 */
export function matchesPublishTo(
  publishToValue: unknown,
  targetSiteName: string = getSiteName()
): boolean {
  if (!publishToValue) return true; // If field was empty during development/creation

  if (Array.isArray(publishToValue)) {
    return publishToValue.some(
      (v) => typeof v === "string" && v.toLowerCase().includes(targetSiteName.toLowerCase())
    );
  }

  if (typeof publishToValue === "string") {
    return publishToValue.toLowerCase().includes(targetSiteName.toLowerCase());
  }

  return false;
}
