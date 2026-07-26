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

  return (
    <div
      style={{
        border: "1px solid var(--line-strong)",
        borderRadius: 14,
        background: "linear-gradient(180deg, var(--panel), var(--bg-2))",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 540,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderBottom: "1px solid var(--line)",
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          color: "var(--ink-dim)",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
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
        <div style={{ flex: 1 }}>ai-twin · /chat</div>
        <button
          onClick={resetSession}
          title="Start a new conversation"
          disabled={messages.length <= 1 && !loading}
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            padding: "4px 9px",
            border: "1px solid var(--line-strong)",
            borderRadius: 999,
            color: "var(--ink-dim)",
            background: "transparent",
            cursor: messages.length <= 1 && !loading ? "default" : "pointer",
            opacity: messages.length <= 1 && !loading ? 0.4 : 1,
            transition: "color 0.12s, border-color 0.12s",
          }}
          onMouseEnter={(e) => {
            if (messages.length <= 1 && !loading) return;
            const el = e.currentTarget;
            el.style.color = "var(--accent)";
            el.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.color = "var(--ink-dim)";
            el.style.borderColor = "var(--line-strong)";
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
          online
        </div>
      </div>

      {/* Messages */}
      <div
        ref={bodyRef}
        style={{
          flex: 1,
          padding: "22px 22px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          overflowY: "auto",
          maxHeight: 420,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className="animate-fadeUp"
            style={{
              display: "flex",
              gap: 12,
              maxWidth: "88%",
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
                  <span
                    className="typing-dot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--ink-faint)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    className="typing-dot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--ink-faint)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    className="typing-dot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--ink-faint)",
                      display: "inline-block",
                    }}
                  />
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          padding: "0 22px 14px",
        }}
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => sendMessage(s.q)}
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              padding: "6px 10px",
              border: "1px solid var(--line-strong)",
              borderRadius: 999,
              color: "var(--ink-dim)",
              transition: "all 0.12s ease",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = "var(--accent)";
              el.style.borderColor = "var(--accent)";
              el.style.background = "var(--accent-dim)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = "var(--ink-dim)";
              el.style.borderColor = "var(--line-strong)";
              el.style.background = "transparent";
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          borderTop: "1px solid var(--line)",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--panel)",
        }}
      >
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask about his experience, stack, or anything AI/ML…"
          disabled={loading}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--ink)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 14,
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "7px 12px",
            border: "1px solid var(--line-strong)",
            borderRadius: 8,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            color: "var(--ink-dim)",
            transition: "color 0.12s, border-color 0.12s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.color = "var(--accent)";
            el.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.color = "var(--ink-dim)";
            el.style.borderColor = "var(--line-strong)";
          }}
        >
          send{" "}
          <span
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
