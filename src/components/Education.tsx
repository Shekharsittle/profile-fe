import { SectionHead } from "./SectionHead";

const EDU = [
  {
    lg: "IIT",
    degree: "M.Tech – Mechanical Engineering",
    school: "IIT (ISM) Dhanbad",
    yr: "CGPA 8.27 · GATE 98.6 percentile",
  },
  {
    lg: "PGP",
    degree: "PGP in Data Science & Engineering",
    school: "Great Lakes Institute of Management",
    yr: "Jul 2022 — Jul 2023",
  },
  {
    lg: "BTech",
    degree: "B.Tech – Mechanical Engineering",
    school: "JSS Academy of Technical Education",
    yr: "74.8%",
  },
  {
    lg: "GCP",
    degree: "Cloud Digital Leader",
    school: "Google Cloud Platform",
    yr: "Certification",
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
          gridAutoRows: "auto",
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
