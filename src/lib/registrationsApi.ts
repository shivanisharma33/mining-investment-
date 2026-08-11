export interface InvestorRegistrationPayload {
  companyName: string;
  firstName: string;
  lastName: string;
  businessTitle?: string;
  city?: string;
  country?: string;
  email: string;
  phone?: string;
  signUpForNews?: boolean;
  assetsUnderManagement?: string;
  investorType?: string;
  tellUsAboutYourself?: string;
}

/** Values accepted by the backend's projectStage enum. */
export type ProjectStage =
  | "Explorer"
  | "Developer"
  | "Producer"
  | "Royalty"
  | "Project Generator";

export interface CompanyRegistrationPayload {
  companyName: string;
  marketCap?: string;
  primaryExchangeTicker?: string;
  commodity?: string;
  projectStage?: ProjectStage;
  location?: string;
  email: string;
  tellUsAboutYourself?: string;
  signUpForNews?: boolean;
}

export interface RegistrationResult {
  _id?: string;
  registrationNumber?: string;
  email?: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: RegistrationResult;
  errors?: Array<{ field?: string; message: string }>;
}

/**
 * Same-origin proxies for the backend's registration endpoints —
 * see src/app/api/investor-registrations/ and src/app/api/company-registrations/.
 */
export const INVESTOR_REGISTRATIONS_ENDPOINT = "/api/investor-registrations";
export const COMPANY_REGISTRATIONS_ENDPOINT = "/api/company-registrations";

export class RegistrationError extends Error {
  readonly fieldErrors: Array<{ field?: string; message: string }>;

  constructor(message: string, fieldErrors: Array<{ field?: string; message: string }> = []) {
    super(message);
    this.name = "RegistrationError";
    this.fieldErrors = fieldErrors;
  }
}

async function submitRegistration(
  endpoint: string,
  payload: InvestorRegistrationPayload | CompanyRegistrationPayload,
  signal?: AbortSignal
): Promise<RegistrationResult> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  const json: ApiResponse = await res
    .json()
    .catch(() => ({ success: false, message: `Registration failed (${res.status})` }));

  if (!res.ok || !json?.success) {
    throw new RegistrationError(
      json?.message || `Registration failed (${res.status})`,
      json?.errors ?? []
    );
  }

  return json.data ?? {};
}

export function submitInvestorRegistration(
  payload: InvestorRegistrationPayload,
  signal?: AbortSignal
): Promise<RegistrationResult> {
  return submitRegistration(INVESTOR_REGISTRATIONS_ENDPOINT, payload, signal);
}

export function submitCompanyRegistration(
  payload: CompanyRegistrationPayload,
  signal?: AbortSignal
): Promise<RegistrationResult> {
  return submitRegistration(COMPANY_REGISTRATIONS_ENDPOINT, payload, signal);
}
