import { ChatBot } from "./ChatBot";

export function Hero() {
  function handleResumeClick(e: React.MouseEvent) {
    e.preventDefault();
    alert("(placeholder) hook this to your real resume.pdf");
  }

  return (
    <section
      style={{
        padding: "40px 0 40px",
        display: "grid",
        gridTemplateColumns: "340px 1fr",
        gap: 44,
        alignItems: "start",
        borderTop: "none",
      }}
    >
      {/* Identity column */}
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          position: "sticky",
          top: 84,
        }}
      >
        {/* Avatar + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              position: "relative",
              width: 72,
              height: 72,
              flexShrink: 0,
              borderRadius: "50%",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, var(--panel), var(--panel-2))",
              border: "1px solid var(--line-strong)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundPosition: "left center",
              backgroundSize: "contain",
            }}
          >
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                color: "var(--ink-faint)",
                fontSize: 8,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
              }}
            >
              photo
            </span>
            {/* Online indicator */}
            <span
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 0 2px var(--panel), 0 0 0 3px var(--accent)",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                color: "var(--ink-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              AI / ML Engineer
            </div>
            <h1
              style={{
                fontSize: 30,
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
          Shipping ML systems that actually make it to production — RAG, LLM
          evaluation, and platform work.
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
          {["Bangalore · remote", "6+ yrs"].map((label) => (
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
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <a
            href="#"
            onClick={handleResumeClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 14px",
              border: "1px solid var(--accent)",
              borderRadius: 8,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              color: "#0b0c0d",
              background: "var(--accent)",
              transition: "filter 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "none";
            }}
          >
            ↓ resume.pdf
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 14px",
              border: "1px solid var(--line-strong)",
              borderRadius: 8,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              color: "var(--ink)",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--accent)";
              el.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--line-strong)";
              el.style.color = "var(--ink)";
            }}
          >
            say hi →
          </a>
        </div>
      </aside>

      {/* Chat column */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ChatBot />
      </div>
    </section>
  );
}
