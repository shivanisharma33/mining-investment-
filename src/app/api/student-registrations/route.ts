import { NextRequest, NextResponse } from "next/server";
import { getStrapiUrl } from "@/lib/strapi";

const getEndpoint = () => getStrapiUrl("/api/student-sponsorships");

/** Empty strings are dropped so Strapi's enum/format checks only see real values. */
function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeLanguage(lang: unknown): string | undefined {
  if (typeof lang !== "string") return undefined;
  const l = lang.trim().toLowerCase();
  if (l === "both" || l === "bilingual") return "Bilingual";
  if (l === "french" || l === "français" || l === "francais") return "French";
  if (l === "english") return "English";
  return lang.trim();
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

    // Parse or fallback firstName and lastName
    let firstName = text(body.firstName);
    let lastName = text(body.lastName);
    const fullName = text(body.fullName);
    if ((!firstName || !lastName) && fullName) {
      const parts = fullName.split(/\s+/).filter(Boolean);
      firstName = parts[0] || fullName;
      lastName = parts.slice(1).join(" ") || parts[0];
    }

    const collegeUniversity = text(body.collegeUniversity ?? body.schoolInstitution ?? body.currentSchool);
    const province = text(body.province);
    const degreeLevel = text(body.degreeLevel);
    const areaOfStudy = text(body.areaOfStudy);
    const expectedGraduationDate = text(body.expectedGraduationDate);
    const linkedinProfile = text(body.linkedinProfile);

    const whyAttend = text(body.whyAttend);
    const uniqueSkills = text(body.uniqueSkills);
    const futureGoals = text(body.futureGoals);

    const availableDates = text(body.availableDates);
    const travelManagement = text(body.travelManagement);
    const travelOrigin = text(body.travelOrigin);
    const commitmentAgreed = body.commitmentAgreed === true || body.commitmentAgreed === "Yes" || body.commitmentAgreed === "yes";

    // Format program and year summary
    const programSummary = [degreeLevel, areaOfStudy].filter(Boolean).join(" in ");
    const gradSummary = expectedGraduationDate ? ` (Expected: ${expectedGraduationDate})` : "";
    const programYearOfStudy = text(body.programYearOfStudy ?? (programSummary ? `${programSummary}${gradSummary}` : undefined));

    // Construct full structured dossier to ensure all answers are readable in Strapi letterOfInterest field
    const dossierSections: string[] = [];

    if (body.letterOfInterest) {
      dossierSections.push(`### Candidate Cover Note\n${body.letterOfInterest}`);
    }

    dossierSections.push(`### Schooling Details
- College / University: ${collegeUniversity || "N/A"}
- Province: ${province || "N/A"}
- Degree Level: ${degreeLevel || "N/A"}
- Area of Study: ${areaOfStudy || "N/A"}
- Expected Graduation Date: ${expectedGraduationDate || "N/A"}
- LinkedIn: ${linkedinProfile || "N/A"}`);

    dossierSections.push(`### Application Questions
1. Why do you want to attend THE Student Partnership Program?
${whyAttend || "N/A"}

2. What unique skills / perspective would you bring to THE Program?
${uniqueSkills || "N/A"}

3. Where do you see yourself in the future?
${futureGoals || "N/A"}`);

    dossierSections.push(`### Availability & Logistics
- Available May 31 - June 3: ${availableDates || "N/A"}
- Travel to/from Montreal manageable: ${travelManagement || "N/A"}
- Traveling from (province / city / airport): ${travelOrigin || "N/A"}
- Full program commitment agreed: ${commitmentAgreed ? "Yes" : "No"}`);

    const compiledDossier = dossierSections.join("\n\n");

    const data: Record<string, unknown> = {
      firstName,
      lastName,
      fullName,
      email: text(body.email),
      phone: text(body.phone),
      schoolInstitution: collegeUniversity,
      programYearOfStudy,
      preferredLanguage: normalizeLanguage(body.preferredLanguage ?? body.language),
      letterOfInterest: compiledDossier,
      newsletterOptIn: body.newsletterOptIn ?? body.signUpForNews ?? false,

      // Pass all granular fields as well for custom schema attributes
      collegeUniversity,
      province,
      degreeLevel,
      areaOfStudy,
      expectedGraduationDate,
      linkedinProfile,
      whyAttend,
      uniqueSkills,
      futureGoals,
      availableDates,
      travelManagement,
      travelOrigin,
      commitmentAgreed,
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
