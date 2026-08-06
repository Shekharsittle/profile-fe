import { ChatBot } from "./ChatBot";

export function Hero() {
  function handleResumeClick(e: React.MouseEvent) {
    e.preventDefault();
    alert("(placeholder) hook this to your real resume.pdf");
  }

  return (
    <section className="hero-section grid-hero">
      {/* Identity column */}
      <aside className="hero-aside">
        {/* Avatar + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative", flexShrink: 0, width: 72, height: 72 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, var(--panel), var(--panel-2))",
                border: "1px solid var(--line-strong)",
              }}
            >
              <img
                src="/photo.jpeg"
                alt="Shekhar Singh"
                width={72}
                height={72}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            {/* Online indicator — outside overflow:hidden so it renders fully */}
            <span
              style={{
                position: "absolute",
                bottom: 3,
                right: 3,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 0 2px var(--bg), 0 0 0 3px var(--accent)",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                color: "var(--ink-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              AI / ML Engineer · AI Architect
            </div>
            <h1
              style={{
                fontSize: "clamp(26px, 6.5vw, 30px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                color: "var(--ink)",
              }}
            >
              Shekhar Singh
            </h1>
          </div>
        </div>

        <p
          style={{
            fontSize: 14,
            color: "var(--ink-dim)",
            lineHeight: 1.5,
          }}
        >
          Designing and deploying production-grade Agentic AI systems — multi-agent orchestration, RAG pipelines, LLM fine-tuning, and cloud-native deployments on AWS and Azure.
        </p>

        {/* Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              padding: "4px 9px",
              border: "1px solid var(--accent)",
              borderRadius: 999,
              color: "var(--accent)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            open to roles
          </span>
          {["Pune · remote", "4+ yrs"].map((label) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                padding: "4px 9px",
                border: "1px solid var(--line-strong)",
                borderRadius: 999,
                color: "var(--ink-dim)",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="hero-actions">
          <a href="#" onClick={handleResumeClick} className="btn-solid">
            ↓ resume.pdf
          </a>
          <a href="#contact" className="btn-ghost">
            say hi →
          </a>
        </div>
      </aside>

      {/* Chat column */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ChatBot />
      </div>
    </section>
  );
}
