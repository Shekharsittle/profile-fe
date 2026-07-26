/**
 * Client for the FastAPI chat backend.
 *
 * `streamChat` consumes the `/api/v1/chat/stream` Server-Sent Events endpoint
 * using `fetch` + a streaming `ReadableStream` reader. The native `EventSource`
 * API can't be used here because it only supports GET requests, while our
 * endpoint is a POST carrying a JSON body.
 */

// Base URL of the backend. Defaults to the local dev server; override in
// production via a `VITE_API_BASE_URL` env var (see .env.example).
const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export interface StreamChatOptions {
  /** The user's message. */
  message: string;
  /** Existing session id to continue a conversation, if any. */
  sessionId?: string | null;
  /** Abort signal to cancel an in-flight stream. */
  signal?: AbortSignal;
  /** Called for each text chunk as it arrives. */
  onChunk: (text: string) => void;
  /** Called once with the session id returned by the server. */
  onSessionId?: (sessionId: string) => void;
}

/**
 * POST a message and stream the reply. Resolves when the stream completes,
 * rejects on network/HTTP error or a server-sent `error` event.
 */
export async function streamChat({
  message,
  sessionId,
  signal,
  onChunk,
  onSessionId,
}: StreamChatOptions): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId ?? undefined }),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`Chat request failed (${response.status})`);
  }

  const returnedSessionId = response.headers.get("X-Session-Id");
  if (returnedSessionId) onSessionId?.(returnedSessionId);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Normalise CRLF so event splitting is consistent, then process every
    // complete event (terminated by a blank line) currently in the buffer.
    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");

    let sep: number;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      handleFrame(frame, onChunk);
    }
  }

  // Flush any trailing frame not terminated by a blank line.
  if (buffer.trim()) handleFrame(buffer, onChunk);
}

/**
 * Parse a single SSE frame and dispatch it. Reassembles multi-line data by
 * joining `data:` lines with `\n` (mirrors the backend's line-splitting).
 */
function handleFrame(frame: string, onChunk: (text: string) => void): void {
  let event = "message";
  const dataLines: string[] = [];

  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) {
      event = line.slice("event:".length).trim();
    } else if (line.startsWith("data:")) {
      // Strip "data:" and a single optional leading space (SSE convention),
      // preserving any further leading whitespace that is real content.
      let data = line.slice("data:".length);
      if (data.startsWith(" ")) data = data.slice(1);
      dataLines.push(data);
    }
  }

  const data = dataLines.join("\n");

  if (event === "done") return; // final "[DONE]" marker — nothing to render
  if (event === "error") throw new Error(data || "Streaming failed");
  if (data) onChunk(data);
}
