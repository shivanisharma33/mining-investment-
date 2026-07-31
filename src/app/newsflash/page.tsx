import NewsflashClient from "./NewsflashClient";
import { fetchNewsflashList, ApiNewsflashItem } from "@/lib/newsflashApi";

// Must be a literal — Next statically analyses segment config exports.
// Keep in sync with NEWSFLASH_REVALIDATE_SECONDS in @/lib/newsflashApi.
export const revalidate = 300;

export default async function NewsflashPage() {
  let items: ApiNewsflashItem[] = [];

  try {
    items = await fetchNewsflashList();
  } catch (error) {
    // The client renders its bundled fallback entries when the list is empty.
    console.error("Failed to fetch newsflash list:", error);
  }

  return <NewsflashClient initialItems={items} />;
}
