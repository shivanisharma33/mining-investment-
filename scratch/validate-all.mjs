const STRAPI_BASE_URL = "https://typical-butterfly-3f86e59200.strapiapp.com";

async function testParticipatingCompanies() {
  console.log("=== Testing Participating Companies API ===");
  const url = `${STRAPI_BASE_URL}/api/participating-companies?filters[publishTo][$eq]=Mining%20Investment%20Event&populate=*&pagination[pageSize]=100&sort=companyName:asc`;
  const res = await fetch(url);
  const json = await res.json();

  console.log("Response status:", res.status);
  console.log("Pagination total:", json.meta?.pagination?.total);
  console.log("Items returned:", json.data?.length);

  // Verify defensive filter
  const validCompanies = json.data.filter((item) => {
    if (item.publishTo === "Mining Investment Event") return true;
    if (Array.isArray(item.publishTo) && item.publishTo.includes("Mining Investment Event")) return true;
    return false;
  });

  console.log("Defensively validated companies count:", validCompanies.length);
  const sample = validCompanies[0];
  console.log("Sample company:", {
    name: sample.companyName,
    ticker: sample.ticker,
    type: sample.type,
    location: sample.location,
    commodities: sample.commodities,
    website: sample.website,
    publishTo: sample.publishTo,
    hasLogo: Boolean(sample.logo?.url),
    logoUrl: sample.logo?.url
  });

  const nullPublishTo = json.data.filter(item => !item.publishTo);
  console.log("Companies with null publishTo in result (should be 0):", nullPublishTo.length);
}

async function testMediaPartners() {
  console.log("\n=== Testing Media & Partners API ===");
  const url = `${STRAPI_BASE_URL}/api/media-partners?filters[Year][$eq]=Media%20%26%20Partners%202027&populate=*&pagination[pageSize]=100`;
  const res = await fetch(url);
  const json = await res.json();

  console.log("Response status:", res.status);
  console.log("Pagination total:", json.meta?.pagination?.total);
  console.log("Items returned:", json.data?.length);

  // Filter out Noble Mining Conference
  const theEventPartners = json.data.filter((item) => {
    if (item.publishTo && typeof item.publishTo === "string" && item.publishTo.includes("Noble")) return false;
    if (!item.name?.trim()) return false;
    return true;
  });

  console.log("THE Event 2027 media partners count:", theEventPartners.length);
  const sample = theEventPartners.find(p => p.logo);
  console.log("Sample media partner with logo:", {
    name: sample.name,
    Year: sample.Year,
    Type: sample.Type,
    tier: sample.tier,
    publishTo: sample.publishTo,
    hasLogo: Boolean(sample.logo?.url),
    logoUrl: sample.logo?.url
  });
}

async function main() {
  await testParticipatingCompanies();
  await testMediaPartners();
}

main().catch(console.error);
