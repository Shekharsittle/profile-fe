import { useState } from "react";
import { SectionHead } from "./SectionHead";

const LINKS = [
  { k: "email", label: "hi@shekhar.dev", href: "mailto:hi@shekhar.dev" },
  { k: "linkedin", label: "/in/shekhar-singh", href: "#" },
  { k: "github", label: "/shekhar-singh", href: "#" },
  { k: "calendar", label: "book a 15-min intro →", href: "#" },
  { k: "resume", label: "download resume.pdf ↓", href: "#" },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("(placeholder) message sent — wire up your form endpoint here");
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--panel)",
    border: "1px solid var(--line-strong)",
    borderRadius: 8,
    padding: "10px 12px",
    color: "var(--ink)",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.12s",
    width: "100%",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "56px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <SectionHead num="// 05" title="Get in Touch" sub="I reply within 24h" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* Direct channels */}
        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: 28,
            background: "var(--panel)",
          }}
        >
          <h3
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 8,
              color: "var(--ink)",
            }}
          >
            Direct channels
          </h3>
          <p
            style={{
              color: "var(--ink-dim)",
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 18,
            }}
          >
            Fastest way to reach me — or drop a message on the right and I'll
            get back.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 13,
            }}
          >
            {LINKS.map((link) => (
              <a
                key={link.k}
                href={link.href}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  color: "var(--ink)",
                  padding: "8px 0",
                  borderBottom: "1px dashed var(--line)",
                  transition: "color 0.12s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                }}
              >
                <span
                  style={{
                    color: "var(--ink-faint)",
                    minWidth: 80,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                  }}
                >
                  {link.k}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 10,
                  color: "var(--ink-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                }}
              >
                name
              </label>
              <input
                required
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                style={inputStyle}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "var(--accent)")
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "var(--line-strong)")
                }
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 10,
                  color: "var(--ink-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                }}
              >
                email
              </label>
              <input
                type="email"
                required
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                style={inputStyle}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "var(--accent)")
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "var(--line-strong)")
                }
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 10,
                color: "var(--ink-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              company / role
            </label>
            <input
              placeholder="Acme · Hiring Manager"
              value={formData.company}
              onChange={(e) =>
                setFormData((p) => ({ ...p, company: e.target.value }))
              }
              style={inputStyle}
              onFocus={(e) =>
                ((e.target as HTMLInputElement).style.borderColor =
                  "var(--accent)")
              }
              onBlur={(e) =>
                ((e.target as HTMLInputElement).style.borderColor =
                  "var(--line-strong)")
              }
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 10,
                color: "var(--ink-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              message
            </label>
            <textarea
              required
              placeholder="Hi Shekhar, we're hiring for…"
              value={formData.message}
              onChange={(e) =>
                setFormData((p) => ({ ...p, message: e.target.value }))
              }
              style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
              onFocus={(e) =>
                ((e.target as HTMLTextAreaElement).style.borderColor =
                  "var(--accent)")
              }
              onBlur={(e) =>
                ((e.target as HTMLTextAreaElement).style.borderColor =
                  "var(--line-strong)")
              }
            />
          </div>

          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "9px 14px",
              border: "1px solid var(--accent)",
              borderRadius: 8,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              color: "#0b0c0d",
              background: "var(--accent)",
              transition: "filter 0.15s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "none";
            }}
          >
            send message →
          </button>
        </form>
      </div>
    </section>
  );
}
