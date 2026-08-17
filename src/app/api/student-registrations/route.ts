import { NextRequest, NextResponse } from "next/server";
import { getStrapiUrl } from "@/lib/strapi";

const getEndpoint = () => getStrapiUrl("/api/student-sponsorships");

/** Empty strings are dropped so Strapi's enum/format checks only see real values. */
function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Server-side proxy for student sponsorship applications, forwarded to the
 * Strapi collection https://typical-butterfly-3f86e59200.strapiapp.com/api/student-sponsorships
 *
 * The resume itself is uploaded to Strapi from the browser; `resumeCv` here is
 * the resulting upload id for the entry's media field.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data: Record<string, unknown> = {
      firstName: text(body.firstName),
      lastName: text(body.lastName),
      email: text(body.email),
      phone: text(body.phone),
      schoolInstitution: text(body.schoolInstitution ?? body.currentSchool),
      programYearOfStudy: text(body.programYearOfStudy ?? body.programAndYear),
      preferredLanguage: text(body.preferredLanguage ?? body.language),
      letterOfInterest: text(body.letterOfInterest ?? body.interestLetter),
      newsletterOptIn: body.newsletterOptIn ?? body.signUpForNews ?? false,
    };

    // Media fields take the id returned by Strapi's /api/upload.
    if (typeof body.resumeCv === "number") {
      data.resumeCv = body.resumeCv;
    }
    if (typeof body.transcript === "number") {
      data.transcript = body.transcript;
    }

    for (const key of Object.keys(data)) {
      if (data[key] === undefined) delete data[key];
    }

    const res = await fetch(getEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
      cache: "no-store",
    });

    const payload = await res.json().catch(() => null);

    if (!res.ok || payload?.success === false) {
      // Keep the backend's per-field messages so the form can surface them.
      return NextResponse.json(
        {
          success: false,
          message:
            payload?.message ||
            payload?.error?.message ||
            `Application failed (${res.status})`,
          errors: payload?.errors ?? [],
        },
        { status: res.ok ? 400 : res.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: payload?.message ?? "Application received.",
        data: payload?.data ?? {},
      },
      { status: res.status }
    );
  } catch (error: unknown) {
    console.error("Proxy Student Sponsorship Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Proxy Error",
      },
      { status: 500 }
    );
  }
}
