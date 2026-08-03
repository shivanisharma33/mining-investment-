import { NextResponse } from "next/server";

/**
 * Server-side proxy for the companies endpoint. The backend sends no CORS
 * headers, so the browser cannot call it directly — this keeps the request
 * same-origin.
 */
export async function GET() {
  try {
    const res = await fetch(
      "https://mining-investment-backend.vercel.app/api/companies?limit=1000",
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
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
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: unknown) {
    console.error("Proxy Companies Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Proxy Error",
      },
      { status: 500 }
    );
  }
}
