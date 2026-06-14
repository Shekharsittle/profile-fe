import { SectionHead } from "./SectionHead";

const EDU = [
  {
    lg: "IT",
    degree: "M.Tech, Artificial Intelligence",
    school: "Indian Institute of Technology · Campus",
    yr: "2017 — 2019 · CGPA 8.6",
  },
  {
    lg: "BE",
    degree: "B.E., Computer Science & Engineering",
    school: "Engineering College Name · University",
    yr: "2013 — 2017 · First class",
  },
];

export function Education() {
  return (
    <section
      id="education"
      style={{
        padding: "56px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <SectionHead
        num="// 04"
        title="Education"
        sub="where I learned the basics"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        {EDU.map((e) => (
          <div
            key={e.degree}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: 18,
              background: "var(--panel)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                border: "1px solid var(--line-strong)",
                background: "var(--panel-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontWeight: 700,
                color: "var(--ink-dim)",
                flexShrink: 0,
              }}
            >
              {e.lg}
            </div>
            <div>
              <div
                style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}
              >
                {e.degree}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 12,
                  color: "var(--ink-dim)",
                  marginTop: 2,
                }}
              >
                {e.school}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  color: "var(--ink-faint)",
                  marginTop: 8,
                }}
              >
                {e.yr}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
