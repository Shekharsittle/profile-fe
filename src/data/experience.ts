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
    initials: "FS",
    company: "Firstsource Solutions — AI/ML Engineer",
    years: "2025 — present",
    role: "AI/ML Engineer",
    co: "Firstsource Solutions",
    dates: "May 2025 — present",
    location: "Pune, IN",
    summary:
      "Dual role as AI Architect and hands-on developer — leading end-to-end solution design, client solutioning, and full-stack implementation of Agentic AI systems for BFSI and telecom clients.",
    bullets: [
      "Designed and deployed multi-agent orchestration pipelines using LangGraph and LangChain, with FastAPI backends, Docker containerization, and Azure VM hosting with CI/CD via Azure DevOps.",
      "Architected an 8-agent LangGraph pipeline to automate loss mitigation workflows across BPM, LMS, MSP, and MIR systems for a leading bank, producing DM722 and DM712 outcomes — replacing legacy ART system end-to-end.",
      "Architected a 7-agent system to automate vendor SSH key rotation across EFT servers for a leading telecom client, reducing manual effort and security risk in vendor management operations.",
      "Designed and developed an AI-powered voice agent for a debt collections contact centre using LangGraph and LiveKit — Manager Agent owning the full customer conversation with worker agents for Validation, CIVC, I&E assessment, and Documentation.",
      "Engineered production-grade prompts from real call transcripts with verification logic, anti-hallucination guardrails, and a 5-branch decision tree handling live, deceased, third-party, and vulnerable customer scenarios.",
    ],
    tags: ["LangGraph", "LangChain", "FastAPI", "Docker", "Azure DevOps", "LiveKit"],
  },
  {
    id: "b",
    initials: "PY",
    company: "Pyrack — AI/ML Engineer II",
    years: "2024 — 2025",
    role: "AI/ML Engineer II",
    co: "Pyrack",
    dates: "Apr 2024 — May 2025",
    location: "Remote",
    summary:
      "Built RAG-based healthcare AI systems and LLM-powered chatbots for oncologists and technical support, improving answer accuracy by 50%.",
    bullets: [
      "Built a vector database using Qdrant ingesting PubMed, VA guidelines, and NCCN medical resources, powering a RAG-based chatbot for oncologists with Hybrid Search (Reciprocal Rank Fusion) — improving answer accuracy by 50%.",
      "Developed LangGraph-based hallucination checker and language checker agents integrated into the healthcare chatbot pipeline, significantly reducing factual errors.",
      "Implemented AWS Bedrock and Azure OpenAI LLM-powered AI agent for a Technical Support chatbot handling API integration queries.",
      "Built all RESTful API endpoints for the healthcare web application using Django REST Framework.",
    ],
    tags: ["Qdrant", "LangGraph", "AWS Bedrock", "Azure OpenAI", "Django REST", "RAG"],
  },
  {
    id: "c",
    initials: "SL",
    company: "Slideoo — AI/ML Engineer",
    years: "2023 — 2024",
    role: "AI/ML Engineer",
    co: "Slideoo",
    dates: "Oct 2023 — Apr 2024",
    location: "Remote",
    summary:
      "Built end-to-end AI features for an AI-powered presentation platform, including fine-tuning Llama 2 70B on proprietary data.",
    bullets: [
      "Built end-to-end AI features including Deck with AI, Web URL to Deck, PDF to Deck, Text to Deck, and YouTube to Deck using LangChain for text summarization and content extraction pipelines.",
      "Fine-tuned Llama 2 70B on proprietary dataset using A100 GPUs on Microsoft Azure; designed an AI chatbot for presentation creation using Azure OpenAI API.",
    ],
    tags: ["LangChain", "Llama 2", "Azure OpenAI", "Fine-tuning", "A100 GPUs"],
  },
  {
    id: "d",
    initials: "QP",
    company: "Quantiphi — Business Analyst, Applied AI",
    years: "2021 — 2022",
    role: "Business Analyst – Applied AI",
    co: "Quantiphi",
    dates: "Oct 2021 — Oct 2022",
    location: "Remote",
    summary:
      "Delivered AI project solutions end-to-end, utilizing GCP BigQuery for data analysis and identifying business problem areas for clients.",
    bullets: [
      "Delivered AI project solutions end-to-end, utilizing GCP BigQuery for data analysis, identifying business problem areas, and presenting findings to clients.",
      "Conducted data collection, cleansing, and ROI analysis to define project timelines and business requirements.",
    ],
    tags: ["GCP BigQuery", "Data Analysis", "ROI Analysis", "Client Solutioning"],
  },
];
