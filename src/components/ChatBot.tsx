import { useEffect, useRef, useState } from "react";
import { streamChat } from "../lib/chatApi";
import { Markdown } from "./Markdown";

interface Message {
  role: "ai" | "user";
  text: string;
  typing?: boolean;
}

const GREETING: Message = {
  role: "ai",
  text: "Hey 👋 — I'm an AI twin of Shekhar. I know his work, projects, stack, and what he's looking for. Ask me anything, or try a suggested prompt below.",
};

const SUGGESTIONS = [
  { label: "Why hire him?", q: "Why should we hire Shekhar?" },
  { label: "Top project", q: "Walk me through Shekhar's top project." },
  { label: "ML stack", q: "What's Shekhar's ML stack?" },
  {
    label: "Years of experience",
    q: "How many years of ML experience does Shekhar have?",
  },
  { label: "Availability", q: "What's his notice period and availability?" },
  { label: "Resume", q: "Can I get his resume?" },
];

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Session id from the backend, kept in a ref so it survives re-renders and
  // is readable inside the async streaming closure without re-triggering it.
  const sessionIdRef = useRef<string | null>(null);
  // Controller for the in-flight stream, so it can be aborted on unmount.
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== inputRef.current &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Replace the last (AI) message in place — used to stream tokens into it.
  function updateLastAiMessage(message: Message) {
    setMessages((prev) => {
      const next = [...prev];
      next[next.length - 1] = message;
      return next;
    });
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    // Placeholder AI bubble showing the typing indicator until the first
    // chunk arrives, then progressively filled as the stream comes in.
    setMessages((prev) => [...prev, { role: "ai", text: "", typing: true }]);

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = "";

    try {
      await streamChat({
        message: text,
        sessionId: sessionIdRef.current,
        signal: controller.signal,
        onSessionId: (id) => {
          sessionIdRef.current = id;
        },
        onChunk: (chunk) => {
          reply += chunk;
          updateLastAiMessage({ role: "ai", text: reply, typing: false });
        },
      });
      // Guard against an empty stream so the typing dots never linger.
      updateLastAiMessage({ role: "ai", text: reply || "…", typing: false });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      updateLastAiMessage({
        role: "ai",
        text: "Sorry — I couldn't reach the server. Please try again.",
      });
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = input.trim();
    setInput("");
    sendMessage(v);
  }

  // Start a fresh conversation: abort any in-flight stream, clear the session
  // id (so the next message gets a new one from the backend), and reset the
  // transcript to the greeting.
  function resetSession() {
    abortRef.current?.abort();
    abortRef.current = null;
    sessionIdRef.current = null;
    setInput("");
    setLoading(false);
    setMessages([GREETING]);
    inputRef.current?.focus();
  }

  const isFresh = messages.length <= 1 && !loading;

  return (
    <div className="chat-card">
      {/* Header */}
      <div className="chat-head">
        <div className="chat-dots">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--line-strong)",
              }}
            />
          ))}
        </div>
        <div className="chat-title">ai-twin · /chat</div>
        <button
          onClick={resetSession}
          title="Start a new conversation"
          disabled={isFresh}
          className="btn-outline"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            padding: "6px 9px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          + new chat
        </button>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--accent)",
            flexShrink: 0,
          }}
        >
          <span
            className="dot-pulse"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          <span className="chat-online-label">online</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={bodyRef} className="chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="animate-fadeUp chat-msg"
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                background:
                  msg.role === "ai" ? "var(--accent)" : "var(--panel-2)",
                color: msg.role === "ai" ? "#0b0c0d" : "var(--ink-dim)",
                border:
                  msg.role === "user" ? "1px solid var(--line-strong)" : "none",
              }}
            >
              {msg.role === "user" ? "YOU" : "AI"}
            </div>
            <div
              className="chat-bubble"
              style={{
                padding: "11px 14px",
                borderRadius: 12,
                background:
                  msg.role === "user"
                    ? "var(--accent-dim)"
                    : "var(--panel-2)",
                border:
                  msg.role === "user"
                    ? "1px solid transparent"
                    : "1px solid var(--line)",
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--ink)",
              }}
            >
              {msg.role === "ai" && (
                <span
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--ink-faint)",
                    marginBottom: 4,
                  }}
                >
                  shekhar's ai twin
                </span>
              )}
              {msg.typing ? (
                <span
                  style={{
                    display: "inline-flex",
                    gap: 4,
                    alignItems: "center",
                    padding: "2px 0",
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--ink-faint)",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </span>
              ) : msg.role === "ai" ? (
                <Markdown>{msg.text}</Markdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="chat-suggest">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => sendMessage(s.q)}
            disabled={loading}
            className="btn-outline btn-fill"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              padding: "7px 11px",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="chat-form">
        <span
          style={{
            color: "var(--accent)",
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 14,
          }}
        >
          ›
        </span>
        <input
          ref={inputRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask about his experience, stack, or anything AI/ML…"
          aria-label="Ask the AI twin a question"
          // Mirrors the backend's ChatRequest max_length so a long message is
          // stopped at the input instead of bouncing off validation as a 422.
          maxLength={2000}
          disabled={loading}
          enterKeyHint="send"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="sentences"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-outline"
          style={{
            borderRadius: 8,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            padding: "8px 12px",
            flexShrink: 0,
          }}
        >
          send{" "}
          <span
            className="chat-kbd"
            style={{
              fontSize: 10,
              padding: "2px 6px",
              border: "1px solid var(--line-strong)",
              borderRadius: 4,
              color: "var(--ink-faint)",
            }}
          >
            ↵
          </span>
        </button>
      </form>
    </div>
  );
}
