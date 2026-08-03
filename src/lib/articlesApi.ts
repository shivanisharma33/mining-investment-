export interface ApiArticleCoverImage {
  url?: string;
  publicId?: string;
}

export interface ApiArticle {
  _id: string;
  title: string;
  slug?: string;
  coverImage?: ApiArticleCoverImage | string;
  pdfUrl?: string;
  pdfPublicId?: string;
  publishDate?: string;
  description?: string;
  status?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ArticlesResponse {
  success?: boolean;
  data?: ApiArticle[];
}

const ARTICLES_UPSTREAM =
  "https://mining-investment-backend.vercel.app/api/articles?limit=100";

/** Same cache window the other backend collections use — the upstream is slow. */
export const ARTICLES_REVALIDATE_SECONDS = 300;

/** Route the shelf and the reader both link to. */
export function articleHref(article: ApiArticle): string {
  return `/news/articles/${encodeURIComponent(article.slug || article._id)}`;
}

export function getCoverImageUrl(article: ApiArticle): string | null {
  const cover = article.coverImage;
  if (!cover) return null;

  const raw = typeof cover === "string" ? cover : cover.url;
  return raw?.trim() ? raw.trim() : null;
}

/**
 * The backend stores article PDFs as Cloudinary *raw* uploads: no `.pdf`
 * extension and served as application/octet-stream, so they can only be
 * rendered after being re-tagged client-side (see downloadPdf / the reader).
 */
export function getArticlePdfUrl(article: ApiArticle): string | null {
  const raw = article.pdfUrl?.trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) return null;
  return raw;
}

/** `silver-wolf` → `silver-wolf.pdf`, for the download filename. */
export function articlePdfFileName(article: ApiArticle): string {
  const base = (article.slug || article.title || "article")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "article"}.pdf`;
}

function publishedDate(article: ApiArticle): Date | null {
  const raw = article.publishDate || article.createdAt;
  if (!raw) return null;

  const parsed = new Date(raw);
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

/** Newest first, drafts and soft-deleted entries removed. */
function toPublishedList(items: ApiArticle[]): ApiArticle[] {
  return items
    .filter((item) => !item.isDeleted)
    .filter((item) => !item.status || item.status === "published")
    .sort((a, b) => {
      const aTime = publishedDate(a)?.getTime() ?? 0;
      const bTime = publishedDate(b)?.getTime() ?? 0;
      return bTime - aTime;
    });
}

/** Shapes an upstream payload of unknown provenance into the published list. */
export function normalizeArticlesResponse(json: unknown): ApiArticle[] {
  const data = (json as ArticlesResponse | null)?.data;
  return Array.isArray(data) ? toPublishedList(data) : [];
}

/**
 * Server-side list fetch, shared by the reader page and the `/api/articles`
 * proxy the client shelf calls. Cached so neither pays the upstream latency.
 */
export async function fetchArticles(): Promise<ApiArticle[]> {
  const res = await fetch(ARTICLES_UPSTREAM, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`Articles request failed (${res.status})`);

  return normalizeArticlesResponse(await res.json());
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

  const article = items.find(
    (item) => item.slug === decoded || item._id === decoded || item.slug === slug
  );
  if (!article) return null;

  return {
    article,
    related: items.filter((item) => item._id !== article._id).slice(0, 4),
  };
}
