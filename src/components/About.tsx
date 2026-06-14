import { SectionHead } from "./SectionHead";

const STATS = [
  { n: "6+", l: "years shipping ML" },
  { n: "12", l: "models in prod" },
  { n: "04", l: "companies" },
  { n: "∞", l: "curiosity" },
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
            I'm an AI/ML engineer who's spent the last six years taking models
            from notebook to production — recommendation systems, forecasting
            pipelines, and lately, retrieval-augmented LLM applications that
            serve real users at real scale.
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
            I care about the unglamorous parts: evaluation harnesses, data
            contracts, observability, and the boring engineering discipline that
            turns a demo into a dependable system. I lean generalist — comfortable
            owning a model from data ingestion through inference infra, and
            collaborating with PMs, designers, and platform teams to ship the
            whole thing.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--ink-dim)",
              maxWidth: "56ch",
            }}
          >
            Outside work: reading ML papers over coffee, tinkering with small
            home-lab GPUs, and mentoring juniors breaking into the field.
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
