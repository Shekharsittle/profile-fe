import { useEffect, useRef, useState } from "react";

interface Message {
  role: "ai" | "user";
  text: string;
  typing?: boolean;
}

const CANNED: Record<string, string> = {
  hire: "In 3 lines: 6+ years shipping ML to production, strong evaluation & MLOps habits, and prior lead experience at Company A. Want examples of any of those?",
  project:
    "The one he's most proud of is the customer-support RAG system — 200k docs, ~45 QPS, and ~24% ticket deflection. He built the eval harness from scratch to catch hallucinations early.",
  stack:
    "Core: Python, PyTorch, HF Transformers. Infra: Docker, K8s, Airflow, MLflow, AWS. He's also been writing Rust for perf-critical inference paths lately.",
  years:
    "6+ years end-to-end — from classical ML (forecasting, recsys) through modern LLM/RAG systems.",
  avail:
    "Currently at Company A with a 60-day notice. Open to roles for the right team — prefers senior/staff IC positions with real platform ownership.",
  resume:
    "You can download it from the button in the hero, or email him directly at hi@shekhar.dev and he'll send the latest.",
  contact:
    "Quickest paths: hi@shekhar.dev, LinkedIn /in/shekhar-singh, or book a 15-min intro via the Contact section below.",
  default:
    "Good question. In short — I know Shekhar's work across RAG, recsys, forecasting, and MLOps. Ask me something specific (why hire him, top project, stack, availability, etc.) and I'll dig in.",
};

function classify(q: string): string {
  const s = q.toLowerCase();
  if (/hire|fit|why.*you|strength/.test(s)) return "hire";
  if (/project|case|built|shipped/.test(s)) return "project";
  if (/stack|tool|framework|language|tech/.test(s)) return "stack";
  if (/year|experience|how long|seniority/.test(s)) return "years";
  if (/notice|avail|start|join|when/.test(s)) return "avail";
  if (/resume|cv|pdf/.test(s)) return "resume";
  if (/contact|email|reach|linkedin/.test(s)) return "contact";
  return "default";
}

// TODO: Replace mockReply with your FastAPI + Gemini backend.
// Example:
//   async function askBackend(message: string, history: Message[]) {
//     const res = await fetch('https://your-api.example.com/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message, history })
//     });
//     const data = await res.json();
//     return data.reply as string;
//   }
function mockReply(q: string): Promise<string> {
  return new Promise((resolve) => {
    const delay = 400 + Math.random() * 600;
    setTimeout(() => resolve(CANNED[classify(q)]), delay);
  });
}

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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hey 👋 — I'm an AI twin of Shekhar. I know his work, projects, stack, and what he's looking for. Ask me anything, or try a suggested prompt below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    // typing indicator
    setMessages((prev) => [
      ...prev,
      { role: "ai", text: "", typing: true },
    ]);

    // TODO: swap with askBackend(text, messages) for live responses
    const reply = await mockReply(text);

    setMessages((prev) => {
      const next = [...prev];
      next[next.length - 1] = { role: "ai", text: reply };
      return next;
    });
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = input.trim();
    setInput("");
    sendMessage(v);
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
