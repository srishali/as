import { FORM_URLS } from "../config/site.config";

export type FormType = "exhibitor" | "visitor" | "contact";

export type RegistrationPayload = {
  type: FormType;
  action?: "register" | "send_pass"; // <-- Added action routing
  id?: string;
  personal: Record<string, string>;
  company?: Record<string, string>;
  interest?: string;
  message?: string;
  passImage?: string;
  passPdf?: string;
  attachImage?: boolean;
  attachPdf?: boolean;
  attachments?: { url: string; name: string }[];
};

export type SubmissionResult = {
  ok: boolean;
  id?: string;
  offline?: boolean;
  status?: number;
  error?: string;
};

export async function submitRegistration(
  payload: RegistrationPayload
): Promise<SubmissionResult> {
  const formUrls: Record<string, string> = FORM_URLS;
  const url = formUrls[payload.type] || "";

  if (!url) {
    console.info("[Registration Submission Payload - Backend disabled]", payload);
    return { ok: true, offline: true };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    let data: { ok?: boolean; id?: string; error?: string } = {};
    try {
      data = await res.json();
    } catch {
      // If response is not JSON, check HTTP status
      if (!res.ok) {
        return { ok: false, status: res.status, error: `HTTP Error ${res.status}` };
      }
    }

    return {
      ok: data.ok !== false && res.ok,
      id: data.id,
      status: res.status,
      error: data.error,
    };
  } catch (err) {
    console.error("[Submission Failed]", err);
    return { ok: false, error: String(err) };
  }
}
