const STRAPI_DEFAULT_BASE_URL = "https://typical-butterfly-3f86e59200.strapiapp.com";
const STRAPI_DEFAULT_SITE_NAME = "Mining Investment Week";

function getStrapiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL?.trim();
  return (url || STRAPI_DEFAULT_BASE_URL).replace(/\/+$/, "");
}

function getSiteName() {
  return process.env.NEXT_PUBLIC_SITE_NAME?.trim() || STRAPI_DEFAULT_SITE_NAME;
}

function getStrapiUrl(path = "") {
  const base = getStrapiBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

function getStrapiMediaUrl(url) {
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

function buildStrapiQuery(params = {}) {
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

  if (typeof populate === "string") {
    searchParams.append("populate", populate);
  }

  if (typeof sort === "string") {
    searchParams.append("sort", sort);
  }

  if (pagination) {
    if (pagination.page !== undefined) searchParams.append("pagination[page]", String(pagination.page));
    if (pagination.pageSize !== undefined) searchParams.append("pagination[pageSize]", String(pagination.pageSize));
  }

  if (filterPublishTo && siteName) {
    searchParams.append("filters[publishTo][$contains]", siteName);
  }

  const flattenFilters = (obj, prefix = "filters") => {
    for (const [key, val] of Object.entries(obj)) {
      if (val === undefined || val === null) continue;
      const currentKey = `${prefix}[${key}]`;
      if (typeof val === "object" && !Array.isArray(val)) {
        flattenFilters(val, currentKey);
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

  for (const [key, val] of Object.entries(customParams)) {
    if (val !== undefined && val !== null) {
      searchParams.append(key, String(val));
    }
  }

  return searchParams.toString();
}

async function fetchStrapi(endpoint, options = {}) {
  const { queryParams, headers } = options;
  const queryString = queryParams ? buildStrapiQuery(queryParams) : "";
  const fullPath = queryString ? `${endpoint}?${queryString}` : endpoint;
  const url = getStrapiUrl(fullPath);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed for ${endpoint} (${res.status})`);
  }

  return await res.json();
}

function matchesPublishTo(publishToValue, targetSiteName = getSiteName()) {
  if (!publishToValue) return true;
  if (Array.isArray(publishToValue)) {
    return publishToValue.some((v) => typeof v === "string" && v.toLowerCase().includes(targetSiteName.toLowerCase()));
  }
  if (typeof publishToValue === "string") {
    return publishToValue.toLowerCase().includes(targetSiteName.toLowerCase());
  }
  return true;
}

const endpoints = [
  { name: "Agenda", path: "/api/agendas" },
  { name: "Articles", path: "/api/articles" },
  { name: "Brochures", path: "/api/brochures" },
  { name: "Media Partners", path: "/api/media-partners" },
  { name: "Participating Companies", path: "/api/participating-companies" },
  { name: "Press Releases", path: "/api/press-releases" },
  { name: "Speakers", path: "/api/speakers" },
];

async function runTests() {
  console.log("=========================================");
  console.log("1. ENVIRONMENT & CONFIGURATION CHECK");
  console.log("=========================================");
  console.log("Base URL:", getStrapiBaseUrl());
  console.log("Site Name:", getSiteName());
  console.log("Sample Media URL (relative):", getStrapiMediaUrl("/uploads/test.png"));
  console.log("Sample Media URL (absolute):", getStrapiMediaUrl("https://media.strapiapp.com/test.png"));
  console.log("Sample Media URL (null):", getStrapiMediaUrl(null));

  console.log("\n=========================================");
  console.log("2. PUBLISHTO QUERY BUILDER TEST");
  console.log("=========================================");
  const testQuery = buildStrapiQuery({
    filterPublishTo: true,
    populate: "*",
    sort: "publishedAt:desc",
    pagination: { pageSize: 10 },
  });
  console.log("Generated Query String:\n", testQuery);

  console.log("\n=========================================");
  console.log("3. LIVE ENDPOINT TEST WITH PUBLISHTO FILTER");
  console.log("=========================================");
  for (const ep of endpoints) {
    try {
      const res = await fetchStrapi(ep.path, {
        queryParams: {
          filterPublishTo: true,
          populate: "*",
          pagination: { pageSize: 5 },
        },
      });
      console.log(`[PASS] ${ep.name} (${ep.path}): HTTP 200 OK | Total returned: ${res?.meta?.pagination?.total ?? res?.data?.length ?? 0}`);
    } catch (err) {
      console.error(`[FAIL] ${ep.name} (${ep.path}):`, err.message);
    }
  }

  console.log("\n=========================================");
  console.log("4. MULTI-SITE ARCHITECTURE ISOLATION TEST");
  console.log("=========================================");
  const sites = [
    "Mining Investment Week",
    "International Mining Week",
    "Noble Mining Conference",
  ];

  for (const site of sites) {
    const q = buildStrapiQuery({ siteName: site, filterPublishTo: true });
    console.log(`Query for "${site}":\n  ${q}`);
  }

  console.log("\n=========================================");
  console.log("5. CLIENT-SIDE SAFETY FILTER TEST");
  console.log("=========================================");
  console.log("matchesPublishTo(['Mining Investment Week']) ->", matchesPublishTo(["Mining Investment Week"]));
  console.log("matchesPublishTo(['Mining Investment Week', 'International Mining Week']) ->", matchesPublishTo(["Mining Investment Week", "International Mining Week"]));
  console.log("matchesPublishTo(['Noble Mining Conference']) ->", matchesPublishTo(["Noble Mining Conference"], "Mining Investment Week") === false);
  console.log("matchesPublishTo(null) ->", matchesPublishTo(null));

  console.log("\nALL VERIFICATIONS COMPLETE.");
}

runTests().catch(console.error);
