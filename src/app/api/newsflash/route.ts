import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://mining-investment-backend.vercel.app/api/newsflash?limit=200", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
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
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
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
