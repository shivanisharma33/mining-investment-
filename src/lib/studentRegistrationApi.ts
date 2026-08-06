export interface StudentRegistrationPayload {
  firstName: string;
  lastName: string;
  currentSchool: string;
  programAndYear?: string;
  email: string;
  phone: string;
  language?: string;
  signUpForNews?: boolean;
  resume?: string;
  resumeFileName?: string;
  interestLetter?: string;
  interestLetterFileName?: string;
}

export interface StudentRegistrationResult {
  _id?: string;
  registrationNumber?: string;
  email?: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: StudentRegistrationResult;
  errors?: Array<{ field?: string; message: string }>;
}

export const STUDENT_REGISTRATIONS_ENDPOINT = "/api/student-registrations";

export class StudentRegistrationError extends Error {
  readonly fieldErrors: Array<{ field?: string; message: string }>;

  constructor(message: string, fieldErrors: Array<{ field?: string; message: string }> = []) {
    super(message);
    this.name = "StudentRegistrationError";
    this.fieldErrors = fieldErrors;
  }
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
