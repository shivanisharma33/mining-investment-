import { NextResponse } from "next/server";
import { ARTICLES_REVALIDATE_SECONDS } from "@/lib/articlesApi";

export async function GET() {
  try {
    const res = await fetch(
      "https://mining-investment-backend.vercel.app/api/articles?limit=100",
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: `Failed to fetch external API: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": `public, s-maxage=${ARTICLES_REVALIDATE_SECONDS}, stale-while-revalidate=${ARTICLES_REVALIDATE_SECONDS * 2}`,
      },
    });
  } catch (error) {
    console.error("Proxy Articles Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error)?.message || "Internal Proxy Error",
      },
      { status: 500 }
    );
  }
}
