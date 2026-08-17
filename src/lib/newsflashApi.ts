/**
 * Press releases, served by the Strapi v5 collection
 * /api/press-releases
 *
 * Strapi fields: title, date, shortDescription, longDescription (rich text HTML),
 * isFeatured, pdfFile (media), publishTo.
 */

import {
  fetchStrapi,
  getStrapiMediaUrl,
  matchesPublishTo,
  type StrapiListResponse,
  type StrapiMedia,
} from "./strapi";

/** Cache window (5 minutes). */
export const NEWSFLASH_REVALIDATE_SECONDS = 300;

/** Snippet length — cards line-clamp to 3 lines, so this is generous. */
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

export interface StrapiPressRelease {
  id: number;
  documentId: string;
  title?: string;
  date?: string;
  shortDescription?: string;
  longDescription?: string;
  isFeatured?: boolean | null;
  publishTo?: string[] | string | null;
  pdfFile?: StrapiMedia | null;
  publishedAt?: string;
  createdAt?: string;
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
 * Strips out invasive inline formatting while preserving semantic markup and links.
 */
function sanitizeHtml(raw?: string): string {
  if (!raw?.trim()) return "";

  const html = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(DROP_WITH_CONTENT, "")
    .replace(TAG, (full, rawName: string, attrs: string) => {
      let tag = rawName.toLowerCase();
      // Demote h1 so headings stay structured.
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

export function toPressRelease(entry: StrapiPressRelease): PressRelease | null {
  if (!matchesPublishTo(entry.publishTo)) {
    return null;
  }

  const title = entry.title?.trim() || "Untitled press release";
  const base = slugify(title);
  const isoDate = entry.date || entry.publishedAt?.slice(0, 10);
  const pdfUrl = getStrapiMediaUrl(entry.pdfFile?.url) || undefined;

  return {
    id: entry.documentId,
    title,
    slug: base ? `${base}-${entry.id}` : String(entry.id),
    date: formatPressDate(isoDate),
    isoDate,
    summary: entry.shortDescription?.trim() || undefined,
    body: htmlToText(entry.longDescription),
    bodyHtml: sanitizeHtml(entry.longDescription),
    pdfUrl,
    isFeatured: entry.isFeatured === true,
  };
}

/** Cards only need a snippet; full bodies are omitted for list items. */
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
 * Fetches published press releases with publishTo filtering.
 */
async function fetchPressReleasesRaw(): Promise<PressRelease[]> {
  const json = await fetchStrapi<StrapiListResponse<StrapiPressRelease>>(
    "/api/press-releases",
    {
      revalidate: NEWSFLASH_REVALIDATE_SECONDS,
      queryParams: {
        filterPublishTo: true,
        populate: "*",
        sort: "date:desc",
        pagination: { pageSize: 100 },
      },
    }
  );

  const entries = Array.isArray(json?.data) ? json.data : [];
  const items = entries
    .map(toPressRelease)
    .filter((pr): pr is PressRelease => pr !== null);

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
