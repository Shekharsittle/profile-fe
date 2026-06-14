import { SectionHead } from "./SectionHead";

const SKILL_GROUPS = [
  {
    title: "ml / dl",
    skills: [
      "PyTorch",
      "TensorFlow",
      "JAX",
      "HF Transformers",
      "LangChain",
      "RAG",
      "LLM Eval",
      "Fine-tuning",
    ],
  },
  {
    title: "mlops / infra",
    skills: [
      "Docker",
      "Kubernetes",
      "Airflow",
      "MLflow",
      "Ray",
      "Triton",
      "AWS",
      "GCP",
    ],
  },
  {
    title: "data",
    skills: [
      "Spark",
      "dbt",
      "Snowflake",
      "Postgres",
      "Redis",
      "Kafka",
      "Weaviate",
      "Pinecone",
    ],
  },
  {
    title: "languages",
    skills: ["Python", "SQL", "TypeScript", "Go", "Rust*", "Bash"],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "56px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <SectionHead num="// 03" title="Skills" sub="the stack" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.title}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: 18,
              background: "var(--panel)",
            }}
          >
            <h3
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                marginBottom: 12,
              }}
            >
              {group.title}
            </h3>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 12,
                    padding: "4px 9px",
                    border: "1px solid var(--line-strong)",
                    borderRadius: 6,
                    color: "var(--ink)",
                    background: "var(--panel-2)",
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
