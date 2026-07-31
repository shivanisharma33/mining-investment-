import NewsflashClient from "./NewsflashClient";
import {
  fetchNewsflashList,
  NEWSFLASH_REVALIDATE_SECONDS,
  ApiNewsflashItem,
} from "@/lib/newsflashApi";

export const revalidate = NEWSFLASH_REVALIDATE_SECONDS;

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
