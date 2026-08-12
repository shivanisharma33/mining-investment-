/**
 * Press releases, served by the Strapi collection
 * https://typical-butterfly-3f86e59200.strapiapp.com/api/press-releases
 *
 * Strapi fields: title, date, shortDescription, longDescription (rich text
 * HTML), isFeatured, pdfFile (media).
 */

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://typical-butterfly-3f86e59200.strapiapp.com";

/** pageSize covers the whole collection in one request — it holds ~16 entries. */
const PRESS_RELEASES_ENDPOINT = `${STRAPI_BASE_URL}/api/press-releases?populate=*&sort=date:desc&pagination[pageSize]=100`;

/** Strapi answers in ~1s, so keep the result off the request path. */
export const NEWSFLASH_REVALIDATE_SECONDS = 300;

/** Snippet length — cards line-clamp to 3 lines, so this is already generous. */
const SNIPPET_LENGTH = 400;

export interface PressRelease {
  /** Strapi documentId — stable across edits. */
  id: string;
  title: string;
  /** Title slug with the numeric id appended; several releases share a title. */
  slug: string;
  /** Formatted for display, e.g. "July 10, 2026". */
  date: string;
  /** Raw `YYYY-MM-DD` from Strapi, for <time> and sorting. */
  isoDate?: string;
  summary?: string;
  /** Plain text, used for search, snippets and reading time. */
  body?: string;
  /** Sanitised HTML, rendered on the article page. */
  bodyHtml?: string;
  pdfUrl?: string;
  isFeatured?: boolean;
}

interface StrapiMedia {
  url?: string;
  name?: string;
}

interface StrapiPressRelease {
  id: number;
  documentId: string;
  title?: string;
  date?: string;
  shortDescription?: string;
  longDescription?: string;
  isFeatured?: boolean | null;
  pdfFile?: StrapiMedia | null;
  publishedAt?: string;
  createdAt?: string;
}

interface StrapiListResponse {
  data?: StrapiPressRelease[];
}

/* ── HTML handling ─────────────────────────────────────────────────────── */

/** Semantic tags worth keeping; everything else is unwrapped. */
const KEEP_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s",
  "a", "ul", "ol", "li", "h2", "h3", "h4", "blockquote",
]);

const DROP_WITH_CONTENT = /<(script|style|iframe|object|embed)\b[\s\S]*?<\/\1\s*>/gi;
const TAG = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;

/**
 * Bodies are pasted out of Word, so every tag carries inline styles that fight
 * the page (18.3px Helvetica, forced white background, justified text). This
 * keeps the structure and the links, and drops the styling so the site's own
 * typography applies. Dropping attributes also removes the XSS surface of
 * rendering CMS HTML directly.
 */
function sanitizeHtml(raw?: string): string {
  if (!raw?.trim()) return "";

  const html = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(DROP_WITH_CONTENT, "")
    .replace(TAG, (full, rawName: string, attrs: string) => {
      let tag = rawName.toLowerCase();
      // The page already has an <h1>; demote so headings stay in order.
      if (tag === "h1") tag = "h2";
      if (tag === "h5" || tag === "h6") tag = "h4";

      if (!KEEP_TAGS.has(tag)) return "";
      if (full.startsWith("</")) return `</${tag}>`;
      if (tag === "br") return "<br />";

      if (tag === "a") {
        const match = attrs.match(/href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
        const href = (match?.[1] ?? match?.[2] ?? match?.[3] ?? "").trim();
        if (!/^(?:https?:|mailto:|tel:|\/)/i.test(href)) return "";
        const safe = href.replace(/"/g, "&quot;").replace(/</g, "&lt;");
        // mailto:/tel: hand off to the OS, so a new tab would just flash open.
        const newTab = /^https?:/i.test(href)
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${safe}"${newTab}>`;
      }

      return `<${tag}>`;
    })
    .replace(/<p>(?:\s|&nbsp;|<br \/>)*<\/p>/gi, "");

  return html.trim();
}

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "'", "&apos;": "'", "&ldquo;": "“", "&rdquo;": "”",
  "&lsquo;": "‘", "&rsquo;": "’", "&hellip;": "…", "&mdash;": "—", "&ndash;": "–",
};

function htmlToText(raw?: string): string {
  if (!raw?.trim()) return "";

  return raw
    .replace(DROP_WITH_CONTENT, "")
    .replace(/<\/(?:p|div|h[1-6]|li|blockquote)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ── Mapping ───────────────────────────────────────────────────────────── */

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

export function formatPressDate(isoDate?: string): string {
  if (!isoDate) return "";

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function toPressRelease(entry: StrapiPressRelease): PressRelease {
  const title = entry.title?.trim() || "Untitled press release";
  const base = slugify(title);
  const isoDate = entry.date || entry.publishedAt?.slice(0, 10);

  return {
    id: entry.documentId,
    title,
    // Five releases share a title, so the id keeps every URL distinct — and
    // stable, which a positional "-2" suffix would not be.
    slug: base ? `${base}-${entry.id}` : String(entry.id),
    date: formatPressDate(isoDate),
    isoDate,
    summary: entry.shortDescription?.trim() || undefined,
    body: htmlToText(entry.longDescription),
    bodyHtml: sanitizeHtml(entry.longDescription),
    pdfUrl: entry.pdfFile?.url?.trim() || undefined,
    isFeatured: entry.isFeatured === true,
  };
}

/** Cards only need a snippet; full bodies are ~80% of the payload. */
function toListItem(item: PressRelease): PressRelease {
  const body = item.body ?? "";

  return {
    ...item,
    body: body.length > SNIPPET_LENGTH ? `${body.slice(0, SNIPPET_LENGTH)}…` : body,
    bodyHtml: undefined,
  };
}

/* ── Fetching ──────────────────────────────────────────────────────────── */

/**
 * Runs on the server so the browser never waits on Strapi, and the response is
 * shared across visitors through the Next data cache. The article page reuses
 * this same cached list, so opening a release costs no extra request.
 */
async function fetchPressReleasesRaw(): Promise<PressRelease[]> {
  const res = await fetch(PRESS_RELEASES_ENDPOINT, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: NEWSFLASH_REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`Press release request failed (${res.status})`);

  const json: StrapiListResponse = await res.json();
  const items = Array.isArray(json?.data) ? json.data.map(toPressRelease) : [];

  // Strapi already sorts by date; flagged releases are lifted to the top.
  return [...items.filter((i) => i.isFeatured), ...items.filter((i) => !i.isFeatured)];
}

export async function fetchPressReleaseList(): Promise<PressRelease[]> {
  return (await fetchPressReleasesRaw()).map(toListItem);
}

export async function fetchPressReleaseBySlug(
  slug: string
): Promise<{ article: PressRelease; related: PressRelease[] } | null> {
  const items = await fetchPressReleasesRaw();
  const decoded = decodeURIComponent(slug);

  const article =
    items.find((item) => item.slug === decoded || item.slug === slug) ??
    // Falls back to the documentId so a bare-id link still resolves.
    items.find((item) => item.id === decoded);

  if (!article) return null;

  return {
    article,
    related: items.filter((item) => item.id !== article.id).slice(0, 3).map(toListItem),
  };
}

export function estimateReadingTime(text?: string): number {
  const words = text?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}
