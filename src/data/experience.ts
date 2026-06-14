export interface Experience {
  id: string;
  initials: string;
  company: string;
  years: string;
  role: string;
  co: string;
  dates: string;
  location: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    id: "a",
    initials: "CA",
    company: "Company A — Senior AI/ML Engineer",
    years: "2023 — present",
    role: "Senior AI/ML Engineer",
    co: "Company A",
    dates: "Jan 2023 — present",
    location: "Bangalore, IN · hybrid",
    summary:
      "Lead the RAG and LLM evaluation workstream on the platform team. Own the path from research spike to production SLOs.",
    bullets: [
      "Designed and shipped a RAG system serving ~45 QPS at p95 < 900ms, with a custom hallucination eval harness.",
      "Built internal LLM gateway (routing, caching, cost guardrails) adopted by 8 product teams.",
      "Mentor 4 ML engineers; drive the quarterly model-quality review.",
      "Reduced inference cost per conversation by 42% through smart prompt compression + caching.",
    ],
    tags: ["PyTorch", "LangChain", "Weaviate", "Kubernetes", "AWS", "LLM Eval"],
  },
  {
    id: "b",
    initials: "CB",
    company: "Company B — ML Engineer",
    years: "2021 — 2023",
    role: "ML Engineer",
    co: "Company B",
    dates: "Mar 2021 — Dec 2022",
    location: "Remote",
    summary:
      "Owned the recommender system and training pipelines for a product used by ~2M MAU.",
    bullets: [
      "Rebuilt the candidate-generation pipeline on Ray; training time 6h → 55min.",
      "Shipped two-tower retrieval model with +18% CTR over baseline.",
      "Introduced feature store + lineage (Feast + MLflow), eliminating a class of training/serving skew bugs.",
    ],
    tags: ["TensorFlow", "Ray", "Feast", "MLflow", "GCP"],
  },
  {
    id: "c",
    initials: "CC",
    company: "Company C — Data Scientist",
    years: "2019 — 2021",
    role: "Data Scientist",
    co: "Company C",
    dates: "Jul 2019 — Feb 2021",
    location: "Bangalore, IN",
    summary:
      "Demand forecasting and anomaly detection across the supply-chain org.",
    bullets: [
      "Built a hierarchical forecasting system for 1.2k SKUs; reduced MAPE by 31%.",
      "Productionized real-time anomaly detection on Kafka streams; caught 7 major supplier issues in year 1.",
      "Mentored interns on ML fundamentals and production practices.",
    ],
    tags: ["XGBoost", "Prophet", "Airflow", "Snowflake", "Spark"],
  },
  {
    id: "d",
    initials: "CD",
    company: "Company D — ML Intern → Associate",
    years: "2018 — 2019",
    role: "Associate ML Engineer",
    co: "Company D",
    dates: "Jun 2018 — Jun 2019",
    location: "Remote",
    summary:
      "First ML role — classical NLP pipelines for a document-understanding product.",
    bullets: [
      "Shipped a document classifier (F1 0.91) used by the core product flow.",
      "Owned labeling pipeline + active-learning loop that cut annotation cost by 40%.",
      "Wrote onboarding docs still used by the team.",
    ],
    tags: ["scikit-learn", "spaCy", "FastAPI", "Docker"],
  },
];
