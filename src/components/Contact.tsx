import { useState } from "react";
import { sendContactMessage } from "../lib/contactApi";
import { SectionHead } from "./SectionHead";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; detail: string }
  | { kind: "error"; detail: string };

const LINKS = [
  { k: "email", label: "shekhar.singhh9@gmail.com", href: "mailto:shekhar.singhh9@gmail.com" },
  { k: "phone", label: "+91 8448519835", href: "tel:+918448519835" },
  { k: "linkedin", label: "/in/shekhar-singhh9", href: "https://linkedin.com/in/shekhar-singhh9" },
  { k: "github", label: "/Shekharsittle", href: "https://github.com/Shekharsittle" },
  { k: "resume", label: "download resume.pdf ↓", href: "#" },
];

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 10,
  color: "var(--ink-dim)",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    // Honeypot — hidden from real users, so anything here means a bot.
    website: "",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const sending = status.kind === "sending";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setStatus({ kind: "sending" });

    try {
      const detail = await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        message: formData.message.trim(),
        website: formData.website,
      });
      setStatus({ kind: "sent", detail });
      // Clear on success so a stray second submit can't resend the same note.
      setFormData({ name: "", email: "", company: "", message: "", website: "" });
    } catch (err) {
      setStatus({ kind: "error", detail: (err as Error).message });
    }
  }

  return (
    <section id="contact" className="section">
      <SectionHead num="// 05" title="Get in Touch" sub="I reply within 24h" />

      <div className="grid-contact">
        {/* Direct channels */}
        <div className="contact-card">
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
            Fastest way to reach me — or drop a message in the form and I'll
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
              <a key={link.k} href={link.href} className="contact-link">
                <span className="contact-link-key">{link.k}</span>
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
          <div className="grid-pair" style={{ gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="cf-name" style={labelStyle}>
                name
              </label>
              <input
                id="cf-name"
                className="field"
                required
                maxLength={100}
                disabled={sending}
                placeholder="Jane Doe"
                autoComplete="name"
                enterKeyHint="next"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="cf-email" style={labelStyle}>
                email
              </label>
              <input
                id="cf-email"
                className="field"
                type="email"
                required
                maxLength={254}
                disabled={sending}
                placeholder="jane@company.com"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="off"
                autoCorrect="off"
                enterKeyHint="next"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="cf-company" style={labelStyle}>
              company / role
            </label>
            <input
              id="cf-company"
              className="field"
              maxLength={150}
              disabled={sending}
              placeholder="Acme · Hiring Manager"
              autoComplete="organization"
              enterKeyHint="next"
              value={formData.company}
              onChange={(e) =>
                setFormData((p) => ({ ...p, company: e.target.value }))
              }
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="cf-message" style={labelStyle}>
              message
            </label>
            <textarea
              id="cf-message"
              className="field"
              required
              // Mirrors ContactRequest.message max_length on the backend, so
              // an over-long note is stopped here instead of 422-ing.
              maxLength={4000}
              disabled={sending}
              placeholder="Hi Shekhar, we're hiring for…"
              enterKeyHint="send"
              value={formData.message}
              onChange={(e) =>
                setFormData((p) => ({ ...p, message: e.target.value }))
              }
              style={{ resize: "vertical", minHeight: 110 }}
            />
          </div>

          {/* Honeypot: parked far off-screen, hidden from screen readers
              (aria-hidden) and from tab order (tabIndex -1), so no real user
              can reach it and any value means a bot. Positioned rather than
              `display:none`, which some bots deliberately skip. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: -9999,
              top: "auto",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor="cf-website">website</label>
            <input
              id="cf-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(e) =>
                setFormData((p) => ({ ...p, website: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            className="btn-solid"
            disabled={sending}
            style={{ padding: "12px 14px", opacity: sending ? 0.6 : 1 }}
          >
            {sending ? "sending…" : "send message →"}
          </button>

          {/* aria-live so the outcome is announced, not just shown. */}
          <div
            role="status"
            aria-live="polite"
            style={{
              minHeight: 18,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              lineHeight: 1.5,
              color:
                status.kind === "error" ? "#ff6b6b" : "var(--accent)",
            }}
          >
            {status.kind === "sent" || status.kind === "error"
              ? status.detail
              : ""}
          </div>
        </form>
      </div>
    </section>
  );
}
