/**
 * Company articles, served by the Strapi collection
 * https://typical-butterfly-3f86e59200.strapiapp.com/api/articles
 *
 * Strapi fields: title, date, coverImage (media), pdfFile (media). Strapi sends
 * CORS headers, so the shelf can call this straight from the browser.
 */

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://typical-butterfly-3f86e59200.strapiapp.com";

export const ARTICLES_ENDPOINT = `${STRAPI_BASE_URL}/api/articles?populate=*&sort=date:desc&pagination[pageSize]=100`;

/** Server-side cache window. Ignored when this runs in the browser. */
export const ARTICLES_REVALIDATE_SECONDS = 300;

export interface ApiArticle {
  /** Strapi documentId — stable across edits. */
  _id: string;
  title: string;
  /** Title slug with the numeric id appended; articles can share a title. */
  slug: string;
  coverImage?: string;
  pdfUrl?: string;
  publishDate?: string;
  description?: string;
}

interface StrapiMedia {
  url?: string;
  name?: string;
}

interface StrapiArticle {
  id: number;
  documentId: string;
  title?: string;
  date?: string;
  coverImage?: StrapiMedia | null;
  pdfFile?: StrapiMedia | null;
  publishedAt?: string;
}

interface StrapiListResponse {
  data?: StrapiArticle[];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "");
}

function mapArticle(entry: StrapiArticle): ApiArticle {
  const title = entry.title?.trim() || "Untitled publication";
  const base = slugify(title);

  return {
    _id: entry.documentId,
    title,
    // Articles repeat titles across issues, so the id keeps URLs distinct.
    slug: base ? `${base}-${entry.id}` : String(entry.id),
    coverImage: entry.coverImage?.url?.trim() || undefined,
    pdfUrl: entry.pdfFile?.url?.trim() || undefined,
    publishDate: entry.date || entry.publishedAt?.slice(0, 10),
  };
}

/** Route the shelf and the reader both link to. */
export function articleHref(article: ApiArticle): string {
  return `/news/articles/${encodeURIComponent(article.slug || article._id)}`;
}

export function getCoverImageUrl(article: ApiArticle): string | null {
  return article.coverImage?.trim() || null;
}

export function getArticlePdfUrl(article: ApiArticle): string | null {
  const raw = article.pdfUrl?.trim();
  if (!raw) return null;
  return /^https?:\/\//i.test(raw) ? raw : null;
}

/** `auro-metals-inc-2` → `auro-metals-inc-2.pdf`, for the download filename. */
export function articlePdfFileName(article: ApiArticle): string {
  const base = slugify(article.slug || article.title || "article");
  return `${base || "article"}.pdf`;
}

function publishedDate(article: ApiArticle): Date | null {
  if (!article.publishDate) return null;

  const parsed = new Date(article.publishDate);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** "August 3, 2026" — the byline date on the reader page. */
export function formatArticleDate(article: ApiArticle, isFr = false): string {
  const parsed = publishedDate(article);
  if (!parsed) return "";

  return parsed.toLocaleDateString(isFr ? "fr-CA" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * "AUGUST 2026" — the shelf groups covers under the issue they belong to, the
 * way the hardcoded list it replaced was grouped by month.
 */
export function formatIssueLabel(article: ApiArticle, isFr = false): string {
  const parsed = publishedDate(article);
  if (!parsed) return isFr ? "NON DATÉ" : "UNDATED";

  return parsed
    .toLocaleDateString(isFr ? "fr-CA" : "en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}

/**
 * The article list, newest first. Runs on the server for the reader page and
 * in the browser for the shelf; `next.revalidate` is ignored in the browser.
 */
export async function fetchArticles(signal?: AbortSignal): Promise<ApiArticle[]> {
  const res = await fetch(ARTICLES_ENDPOINT, {
    signal,
    next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`Articles request failed (${res.status})`);

  const json: StrapiListResponse = await res.json();
  const entries = Array.isArray(json?.data) ? json.data : [];

  return entries
    .map(mapArticle)
    .sort((a, b) => {
      const aTime = publishedDate(a)?.getTime() ?? 0;
      const bTime = publishedDate(b)?.getTime() ?? 0;
      return bTime - aTime;
    });
}

/**
 * Single article for the reader page, plus the rest of the shelf for the
 * "more publications" strip. Shares the cached list, so no extra request.
 */
export async function fetchArticleBySlug(
  slug: string
): Promise<{ article: ApiArticle; related: ApiArticle[] } | null> {
  const items = await fetchArticles();
  const decoded = decodeURIComponent(slug);

  const article =
    items.find((item) => item.slug === decoded || item.slug === slug) ??
    // Falls back to the documentId so a bare-id link still resolves.
    items.find((item) => item._id === decoded);

  if (!article) return null;

  return {
    article,
    related: items.filter((item) => item._id !== article._id).slice(0, 4),
  };
}
