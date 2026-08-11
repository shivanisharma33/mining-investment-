import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side proxy for newsletter subscribers.
 * Forwards requests to Strapi endpoint https://typical-butterfly-3f86e59200.strapiapp.com/api/subscribers
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, fullName } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const payload = {
      data: {
        email: email.trim(),
        ...(fullName ? { fullName: fullName.trim() } : {}),
      },
    };

    const res = await fetch(
      "https://typical-butterfly-3f86e59200.strapiapp.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.error?.message || `Subscription failed (${res.status})`,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully.",
        data: data.data,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Subscribers API Proxy Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Proxy Error",
      },
      { status: 500 }
    );
  }
}
