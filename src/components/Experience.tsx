import { useState } from "react";
import { experience } from "../data/experience";
import { SectionHead } from "./SectionHead";

export function Experience() {
  const [activeId, setActiveId] = useState("a");
  const active = experience.find((e) => e.id === activeId)!;

  return (
    <section
      id="experience"
      style={{
        padding: "56px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <SectionHead num="// 02" title="Experience" sub="click a logo" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Grid of company cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {experience.map((exp) => {
            const isActive = exp.id === activeId;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                style={{
                  border: `1px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                  borderRadius: 12,
                  padding: 16,
                  background: isActive ? "var(--accent-dim)" : "var(--panel)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  textAlign: "left",
                  transform: isActive ? "none" : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--accent)";
                    el.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--line)";
                    el.style.transform = "none";
                  }
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--line-strong)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontWeight: 700,
                    fontSize: 16,
                    color: isActive ? "#0b0c0d" : "var(--ink-dim)",
                    background: isActive ? "var(--accent)" : "var(--panel-2)",
                  }}
                >
                  {exp.initials}
                </div>
                <div
                  style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}
                >
                  {exp.company}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 11,
                    color: "var(--ink-faint)",
                  }}
                >
                  {exp.years}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: "26px 28px",
            background: "var(--panel)",
            minHeight: 380,
          }}
        >
          <h3
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}
          >
            {active.role} ·{" "}
            <span style={{ color: "var(--accent)" }}>{active.co}</span>
          </h3>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              color: "var(--ink-dim)",
              marginTop: 4,
            }}
          >
            {active.dates} · {active.location}
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--ink)",
              margin: "16px 0",
            }}
          >
            {active.summary}
          </p>
          <ul
            style={{
              margin: "10px 0 0",
              paddingLeft: 18,
              color: "var(--ink)",
              fontSize: 14,
              lineHeight: 1.7,
              listStyleType: "disc",
            }}
          >
            {active.bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  marginBottom: 6,
                  // accent bullet color via CSS
                }}
              >
                {b}
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 18,
            }}
          >
            {active.tags.map((tag) => (
              <span
                key={tag}
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
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
