import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://mining-investment-backend.vercel.app/api/newsflash?limit=200", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Upstream takes ~1.2s per call — cache well away from the request path
    });

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
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: any) {
    console.error("Proxy Newsflash Error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Proxy Error" },
      { status: 500 }
    );
  }
}
