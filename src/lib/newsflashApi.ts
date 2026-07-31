export interface ApiNewsflashItem {
  _id: string;
  title: string;
  slug?: string;
  subheading?: string;
  content?: string;
  date?: string;
  category?: string;
  pdfAttachment?: { url?: string; name?: string } | string;
  pdfUrl?: string;
  pdf?: string;
  image?: string;
  publishedAt?: string;
  createdAt?: string;
}

interface NewsflashResponse {
  success?: boolean;
  data?: ApiNewsflashItem[];
}

const NEWSFLASH_UPSTREAM =
  "https://mining-investment-backend.vercel.app/api/newsflash?limit=200";

/** The backend takes ~1.2s per call, so cache it well away from the request path. */
export const NEWSFLASH_REVALIDATE_SECONDS = 300;

/** Snippet length — cards line-clamp to 3 lines, so this is already generous. */
const SNIPPET_LENGTH = 400;

export function extractPdfUrl(
  item: ApiNewsflashItem | null | undefined
): string | null {
  if (!item) return null;

  let rawUrl: string | null = null;
  if (item.pdfUrl && typeof item.pdfUrl === "string" && item.pdfUrl.trim()) {
    rawUrl = item.pdfUrl.trim();
  } else if (item.pdf && typeof item.pdf === "string" && item.pdf.trim()) {
    rawUrl = item.pdf.trim();
  } else if (item.pdfAttachment) {
    if (typeof item.pdfAttachment === "string" && item.pdfAttachment.trim()) {
      rawUrl = item.pdfAttachment.trim();
    } else if (
      typeof item.pdfAttachment === "object" &&
      item.pdfAttachment.url &&
      typeof item.pdfAttachment.url === "string"
    ) {
      rawUrl = item.pdfAttachment.url.trim();
    }
  }

  if (!rawUrl && item.content && typeof item.content === "string") {
    const match = item.content.match(
      /(https?:\/\/[^\s"']+\.pdf|\/[^\s"']+\.pdf)/i
    );
    if (match) rawUrl = match[0];
  }

  // Only return a PDF URL if one was attached from the backend
  if (!rawUrl) return null;

  // Hide PDF button for dummy / placeholder URLs from backend
  const lower = rawUrl.toLowerCase();
  if (
    lower.includes("example.com") ||
    lower.includes("dummy") ||
    lower.includes("placeholder") ||
    lower.includes("test.pdf") ||
    lower.includes("sample.pdf")
  ) {
    return null;
  }

  // Convert localhost / relative backend paths to live backend server URL
  if (
    rawUrl.startsWith("http://localhost:5000") ||
    rawUrl.startsWith("http://localhost:3000") ||
    rawUrl.startsWith("http://127.0.0.1:5000")
  ) {
    rawUrl = rawUrl.replace(
      /^http:\/\/(localhost|127\.0\.0\.1):(5000|3000)/,
      "https://mining-investment-backend.vercel.app"
    );
  } else if (rawUrl.startsWith("/uploads/")) {
    rawUrl = `https://mining-investment-backend.vercel.app${rawUrl}`;
  } else if (rawUrl.startsWith("uploads/")) {
    rawUrl = `https://mining-investment-backend.vercel.app/${rawUrl}`;
  } else if (
    !rawUrl.startsWith("http://") &&
    !rawUrl.startsWith("https://") &&
    !rawUrl.startsWith("/")
  ) {
    rawUrl = "/" + rawUrl;
  }

  return rawUrl;
}

/**
 * Trims a list entry down to what the cards actually render. Full article
 * bodies are ~80% of the response but are only needed on the detail page, and
 * the PDF link is resolved here while the full content is still available.
 */
function toListItem(item: ApiNewsflashItem): ApiNewsflashItem {
  const pdfUrl = extractPdfUrl(item);
  const content = item.content?.trim() ?? "";

  return {
    _id: item._id,
    title: item.title,
    slug: item.slug,
    subheading: item.subheading,
    category: item.category,
    date: item.date,
    image: item.image,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    content:
      content.length > SNIPPET_LENGTH
        ? `${content.slice(0, SNIPPET_LENGTH)}…`
        : content,
    // Pre-resolved so extractPdfUrl() on the client returns it without the
    // full content to scan.
    pdfUrl: pdfUrl ?? undefined,
  };
}

/**
 * Server-side list fetch. Runs on the server so the browser never waits on the
 * slow upstream call, and the result is shared across visitors via the Next
 * data cache.
 */
async function fetchNewsflashRaw(): Promise<ApiNewsflashItem[]> {
  const res = await fetch(NEWSFLASH_UPSTREAM, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: NEWSFLASH_REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`Newsflash request failed (${res.status})`);

  const json: NewsflashResponse = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

export async function fetchNewsflashList(): Promise<ApiNewsflashItem[]> {
  return (await fetchNewsflashRaw()).map(toListItem);
}

/**
 * Full article for a slug, with content intact. Shares the cached upstream
 * response with the list page, so opening an article costs no extra request.
 */
export async function fetchArticleBySlug(
  slug: string
): Promise<{ article: ApiNewsflashItem; related: ApiNewsflashItem[] } | null> {
  const items = await fetchNewsflashRaw();
  const decoded = decodeURIComponent(slug);

  const article = items.find(
    (item) => item.slug === decoded || item._id === decoded || item.slug === slug
  );
  if (!article) return null;

  const sameCategory = items.filter(
    (item) => item._id !== article._id && item.category === article.category
  );
  const others = items.filter(
    (item) => item._id !== article._id && item.category !== article.category
  );

  return {
    article,
    related: [...sameCategory, ...others].slice(0, 3).map(toListItem),
  };
}

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; label?: string; text: string };

const BULLET_PATTERN = /^[·•‣▪]\s*|^-\s+/;

/**
 * Press releases arrive as plain text with blank-line separated blocks. This
 * recovers the structure the source document had — section headings, bullet
 * lists, pull quotes, and "Label: value" lines — so the page reads like an
 * article instead of one undifferentiated wall of paragraphs.
 */
export function parseArticleContent(content?: string): ArticleBlock[] {
  if (!content?.trim()) return [];

  const chunks = content
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const blocks: ArticleBlock[] = [];

  for (const chunk of chunks) {
    if (BULLET_PATTERN.test(chunk)) {
      const items = chunk
        .split(/\n+/)
        .map((line) => line.replace(BULLET_PATTERN, "").trim())
        .filter(Boolean);

      const previous = blocks[blocks.length - 1];
      if (previous?.type === "list") {
        previous.items.push(...items);
      } else {
        blocks.push({ type: "list", items });
      }
      continue;
    }

    // Short, unpunctuated lines are section headings in the source document.
    if (chunk.length <= 60 && !/[.!?]$/.test(chunk)) {
      blocks.push({ type: "heading", text: chunk.replace(/:$/, "") });
      continue;
    }

    if (/^[“"]/.test(chunk)) {
      blocks.push({ type: "quote", text: chunk });
      continue;
    }

    // "IAMGOLD Track Winners: Team 8 — …" reads better with the label lifted out.
    const labelled = chunk.match(/^([^:\n]{2,40}):\s+([\s\S]+)$/);
    if (labelled) {
      blocks.push({ type: "paragraph", label: labelled[1], text: labelled[2] });
      continue;
    }

    blocks.push({ type: "paragraph", text: chunk });
  }

  return blocks;
}

export function estimateReadingTime(content?: string): number {
  const words = content?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

export function formatArticleDate(item: ApiNewsflashItem): string {
  if (item.date?.trim()) return item.date.trim();

  const raw = item.publishedAt || item.createdAt;
  if (!raw) return "";

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
