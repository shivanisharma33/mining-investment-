export interface StudentRegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  schoolInstitution?: string;
  programYearOfStudy?: string;
  preferredLanguage?: string;
  letterOfInterest?: string;
  newsletterOptIn?: boolean;
  /** Strapi upload id of the resume file, from uploadStudentFile(). */
  resumeCv?: number;
  /** Strapi upload id of the letter of interest attachment. */
  transcript?: number;
}

export interface StudentRegistrationResult {
  id?: number;
  documentId?: string;
  registrationNumber?: string;
  email?: string;
}

export interface UploadedFile {
  id: number;
  name: string;
  url: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: StudentRegistrationResult;
  errors?: Array<{ field?: string; message: string }>;
}

export const STUDENT_REGISTRATIONS_ENDPOINT = "/api/student-registrations";

/**
 * Strapi is reachable from the browser (it reflects the request origin in its
 * CORS headers), so files go straight there instead of through our own route —
 * that keeps large uploads clear of the serverless request body limit.
 */
import { getStrapiBaseUrl } from "./strapi";

export const STRAPI_BASE_URL = getStrapiBaseUrl();

/** Matches the "Max 10MB" promise made on the application form. */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export class StudentRegistrationError extends Error {
  readonly fieldErrors: Array<{ field?: string; message: string }>;

  constructor(message: string, fieldErrors: Array<{ field?: string; message: string }> = []) {
    super(message);
    this.name = "StudentRegistrationError";
    this.fieldErrors = fieldErrors;
  }
}

export async function uploadStudentFile(
  file: File,
  signal?: AbortSignal
): Promise<UploadedFile> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new StudentRegistrationError(
      `"${file.name}" is larger than 10MB. Please upload a smaller file.`
    );
  }

  const body = new FormData();
  body.append("files", file);

  const res = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
    method: "POST",
    body,
    signal,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new StudentRegistrationError(
      json?.error?.message || `Upload of "${file.name}" failed (${res.status}).`
    );
  }

  // Strapi returns an array, one entry per uploaded file.
  const uploaded = Array.isArray(json) ? json[0] : null;
  if (!uploaded?.id) {
    throw new StudentRegistrationError(`Upload of "${file.name}" failed. Please try again.`);
  }

  return { id: uploaded.id, name: uploaded.name, url: uploaded.url };
}

export async function submitStudentRegistration(
  payload: StudentRegistrationPayload,
  signal?: AbortSignal
): Promise<StudentRegistrationResult> {
  const res = await fetch(STUDENT_REGISTRATIONS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  const json: ApiResponse = await res
    .json()
    .catch(() => ({ success: false, message: `Registration failed (${res.status})` }));

  if (!res.ok || !json?.success) {
    throw new StudentRegistrationError(
      json?.message || `Registration failed (${res.status})`,
      json?.errors ?? []
    );
  }

  return json.data ?? {};
}
