import { NextResponse } from "next/server";

/**
 * Server-side proxy for the agendas endpoint. The backend sends no CORS headers,
 * so the browser cannot call it directly — this keeps the request same-origin.
 */
export async function GET() {
  try {
    const res = await fetch(
      "https://mining-investment-backend.vercel.app/api/agendas?limit=200",
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
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
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error: unknown) {
    console.error("Proxy Agendas Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Proxy Error",
      },
      { status: 500 }
    );
  }
}
