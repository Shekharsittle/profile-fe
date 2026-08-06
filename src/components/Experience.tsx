import { useState } from "react";
import { experience } from "../data/experience";
import { SectionHead } from "./SectionHead";

export function Experience() {
  const [activeId, setActiveId] = useState("a");
  const active = experience.find((e) => e.id === activeId)!;

  return (
    <section id="experience" className="section">
      <SectionHead num="// 02" title="Experience" sub="tap a logo" />

      <div className="grid-exp">
        {/* Grid of company cards */}
        <div className="exp-cards">
          {experience.map((exp) => {
            const isActive = exp.id === activeId;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                className="exp-card"
                data-active={isActive}
                aria-pressed={isActive}
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
        <div className="exp-panel">
          <h3
            style={{
              fontSize: "clamp(18px, 4.6vw, 22px)",
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
              <li key={i} style={{ marginBottom: 6 }}>
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
