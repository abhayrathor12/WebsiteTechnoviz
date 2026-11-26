// API calls for the Master Portal (/masterportal). Kept separate from src/api.ts.
// Local backend: set VITE_PORTAL_API_URL=http://127.0.0.1:8000/api/portal in a .env file.
const PORTAL_API_URL: string =
  import.meta.env.VITE_PORTAL_API_URL || "https://websiteBackend.pythonanywhere.com/api/portal";

const TOKEN_KEY = "mp_token";

export interface PortalUser {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export type OptionKey = "A" | "B" | "C" | "D";

export interface QuestionInput {
  text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: OptionKey;
}

export interface AdminQuestion extends QuestionInput {
  id: number;
  order: number;
}

export interface AdminQuestionList {
  evaluation: { slug: string; title: string };
  attempts_count: number;
  questions: AdminQuestion[];
}

// ─── Participant ───

export type EvaluationStatus = "done" | "open" | "locked";

export interface EvaluationProgress {
  slug: string;
  title: string;
  order: number;
  status: EvaluationStatus;
  question_count: number;
  score: number | null;
  total: number | null;
  submitted_at: string | null;
}

// ─── Knowledge Check (Pre-Masterclass Questions) ───
// The questions come from the backend (portal/knowledge_check.py).

export interface KnowledgeQuestion {
  key: string;
  text: string;
  type: "single" | "multi" | "text";
  options?: string[];
  hint?: string;
  required?: boolean;
  /** Extra text box shown when this option is picked (e.g. "Other") */
  other?: { key: string; label: string; when: string };
  /** Extra (optional) text box shown for every option except "unless" */
  detail?: { key: string; label: string; unless: string };
}

export type KnowledgeAnswers = Record<string, string | string[]>;

export interface KnowledgeCheckData {
  questions: KnowledgeQuestion[];
  answers: KnowledgeAnswers | null;
  submitted_at: string | null;
  updated_at: string | null;
  /** e.g. "Sat, 12 Dec 2026 at 10:00 AM IST", null when not scheduled yet */
  masterclass_when: string | null;
}

export interface Progress {
  evaluations: EvaluationProgress[];
  /** Evaluations open when the user's webinar starts */
  waiting_for_webinar: boolean;
  evaluations_locked_until: string | null; // ISO date-time, null = webinar not scheduled yet
  schedule_message: string | null;
  all_done: boolean;
  /** Pre-Masterclass Questions saved at least once */
  knowledge_check_done: boolean;
  /** Admin switches this on per user; until then downloads are blocked */
  certificate_enabled: boolean;
  certificate_downloaded: boolean;
  linkedin_downloaded: boolean;
  /** Only when all evaluations are done */
  certificate: CertificateInfo | null;
}

export interface CertificateInfo {
  name: string;
  completed_on: string; // YYYY-MM-DD (the masterclass date)
  certificate_id: string;
  /** Website /verify-certificate link that the QR code opens */
  verify_url: string;
  /** QR code rows, "1" = dark module */
  qr: string[];
}

/** Public certificate check (website /verify-certificate page) */
export type CertificateVerification =
  | {
      status: "verified";
      certificate_id: string;
      name: string;
      course: string;
      format: string;
      completed_on: string; // YYYY-MM-DD
      issued_by: string;
      trainer: string;
    }
  | { status: "not_issued"; certificate_id: string; message: string };

export type Options = Record<OptionKey, string>;

export interface OpenEvaluation {
  evaluation: { slug: string; title: string };
  status: "open";
  questions: { id: number; text: string; options: Options }[];
}

export interface ResultQuestion {
  id: number;
  text: string;
  options: Options;
  correct: OptionKey;
  selected: OptionKey;
  is_correct: boolean;
}

export interface EvaluationResult {
  evaluation: { slug: string; title: string };
  status: "done";
  score: number;
  total: number;
  submitted_at: string;
  questions: ResultQuestion[];
}

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
  status: number; // 0 = network error
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage blocked (private mode) - the session simply won't survive a reload
  }
}

// Called when the backend says the token is no longer valid (logged out or deactivated)
let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

export async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<ApiResult<T>> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Token ${token}`;

  try {
    const res = await fetch(`${PORTAL_API_URL}${path}`, {
      method: options.method || "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
    const data = await res.json().catch(() => null);

    if (res.status === 401 && token && onUnauthorized) onUnauthorized();

    if (!res.ok) {
      const message =
        (data && (data.message || data.detail)) || `Request failed (${res.status})`;
      return { data: null, error: message, status: res.status };
    }
    return { data: data as T, error: null, status: res.status };
  } catch {
    return {
      data: null,
      error: "Could not reach the server. Please check your connection.",
      status: 0,
    };
  }
}

/** Downloads a file from the portal API and saves it. Returns an error message or null. */
export async function downloadFile(path: string, filename: string): Promise<string | null> {
  const token = getToken();
  try {
    const res = await fetch(`${PORTAL_API_URL}${path}`, {
      headers: token ? { Authorization: `Token ${token}` } : {},
    });
    if (!res.ok) {
      if (res.status === 401 && token && onUnauthorized) onUnauthorized();
      const data = await res.json().catch(() => null);
      return (data && (data.message || data.detail)) || `Download failed (${res.status})`;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    return null;
  } catch {
    return "Could not reach the server. Please check your connection.";
  }
}

export const portalApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: PortalUser }>("/login/", {
      method: "POST",
      body: { email, password },
    }),
  logout: () => request<{ message: string }>("/logout/", { method: "POST" }),
  me: () => request<PortalUser>("/me/"),
  changePassword: (current_password: string, new_password: string) =>
    request<{ message: string }>("/change-password/", {
      method: "POST",
      body: { current_password, new_password },
    }),

  // Forgot password: OTP by email -> verify -> new password
  forgotPassword: (email: string) =>
    request<{ message: string; expires_in: number }>("/forgot-password/", {
      method: "POST",
      body: { email },
    }),
  verifyOtp: (email: string, otp: string) =>
    request<{ reset_token: string }>("/verify-otp/", { method: "POST", body: { email, otp } }),
  resetPassword: (email: string, reset_token: string, password: string) =>
    request<{ message: string }>("/reset-password/", {
      method: "POST",
      body: { email, reset_token, password },
    }),

  // Participant
  progress: () => request<Progress>("/progress/"),
  knowledgeCheck: () => request<KnowledgeCheckData>("/knowledge-check/"),
  saveKnowledgeCheck: (answers: KnowledgeAnswers) =>
    request<KnowledgeCheckData>("/knowledge-check/", { method: "POST", body: { answers } }),
  verifyCertificate: (certificateId: string) =>
    request<CertificateVerification>(
      `/verify-certificate/${encodeURIComponent(certificateId)}/`
    ),
  evaluation: (slug: string) =>
    request<OpenEvaluation | EvaluationResult>(`/evaluations/${slug}/`),
  submitEvaluation: (slug: string, answers: Record<number, OptionKey>) =>
    request<EvaluationResult>(`/evaluations/${slug}/submit/`, {
      method: "POST",
      body: { answers },
    }),

  // Admin: question manager
  adminQuestions: (slug: string) =>
    request<AdminQuestionList>(`/admin/evaluations/${slug}/questions/`),
  adminCreateQuestion: (slug: string, q: QuestionInput) =>
    request<AdminQuestion>(`/admin/evaluations/${slug}/questions/`, { method: "POST", body: q }),
  adminUpdateQuestion: (id: number, q: QuestionInput) =>
    request<AdminQuestion>(`/admin/questions/${id}/`, { method: "PUT", body: q }),
  adminDeleteQuestion: (id: number) =>
    request<null>(`/admin/questions/${id}/`, { method: "DELETE" }),
};
