/**
 * Client for the FastAPI contact endpoint.
 *
 * Base-URL resolution mirrors chatApi.ts — see the comment there for why the
 * production default is same-origin.
 */

const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.PROD ? "" : "http://localhost:8000");

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  /** Honeypot — must stay empty; a value marks the sender as a bot. */
  website?: string;
}

/**
 * Submit the contact form. Resolves on success; rejects with a user-presentable
 * message on validation, rate-limit, or transport failure.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection and try again.");
  }

  if (response.status === 429) {
    throw new Error("Too many messages sent — please try again a bit later.");
  }

  // The API returns {detail} for errors and {ok, detail} for success. A body
  // that isn't JSON at all (proxy error page, gateway timeout) must not throw
  // past the catch and surface as an unhandled rejection.
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = body?.detail;
    // FastAPI validation errors come back as an array of issue objects, which
    // would render as "[object Object]" if used directly.
    throw new Error(
      typeof detail === "string"
        ? detail
        : "Something went wrong sending your message. Please try again.",
    );
  }

  return body?.detail ?? "Thanks — your message has been sent.";
}
