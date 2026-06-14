import { SectionHead } from "./SectionHead";

const STATS = [
  { n: "4+", l: "years in AI/ML" },
  { n: "8+", l: "agents in prod" },
  { n: "04", l: "companies" },
  { n: "98.6", l: "GATE percentile" },
];

export function About() {
  return (
    <section
      id="about"
      style={{
        padding: "56px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <SectionHead num="// 01" title="About" sub="a brief intro" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--ink)",
              marginBottom: 14,
              maxWidth: "56ch",
            }}
          >
            I'm an AI/ML Engineer and AI Architect with 4+ years of experience
            designing and deploying production-grade Agentic AI systems for BFSI,
            healthcare, and telecom clients.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--ink-dim)",
              marginBottom: 14,
              maxWidth: "56ch",
            }}
          >
            My expertise spans multi-agent orchestration with LangGraph and LangChain,
            RAG pipelines, LLM fine-tuning, and cloud-native deployments on AWS and
            Azure. I own end-to-end architecture — from system design and client
            solutioning to backend implementation and CI/CD delivery.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--ink-dim)",
              maxWidth: "56ch",
            }}
          >
            M.Tech from IIT (ISM) Dhanbad (CGPA 8.27, GATE 98.6 percentile). When
            not building agents, I'm exploring new LLM architectures and mentoring
            engineers breaking into the AI field.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.l}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 16,
                background: "var(--panel)",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 30,
                  fontWeight: 500,
                  color: "var(--accent)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 10,
                  color: "var(--ink-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  marginTop: 8,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
