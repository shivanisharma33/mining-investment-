import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side proxy for investor registration submissions. The backend accepts
 * these unauthenticated but sends no CORS headers, so the browser cannot POST
 * to it directly — this keeps the request same-origin.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(
      "https://mining-investment-backend.vercel.app/api/investor-registrations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    // Pass the backend's payload straight through so validation errors survive.
    const data = await res.json().catch(() => ({
      success: false,
      message: `Registration failed (${res.status})`,
    }));

    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    console.error("Proxy Investor Registration Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Proxy Error",
      },
      { status: 500 }
    );
  }
}
