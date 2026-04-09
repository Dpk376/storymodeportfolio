export const portfolioData = {
  engineer: {
    name: "Deepak Kumar",
    role: "Senior Backend Engineer",
    tagline: "Distributed Systems | Java, Kafka, AWS | High-Throughput Event Pipelines",
    summary: "5 years building distributed systems and high-throughput event-driven platforms. Millions of events per day. Zero compromise on reliability.",
    email: "deepakpersonal376@gmail.com",
    phone: "8667768959",
    github: "https://github.com/deepakabi",
    linkedin: "https://linkedin.com/in/deepak-kumar",
    portfolio: "https://deepak-kumar.dev"
  },

  experience: [
    {
      role: "SDE II",
      company: "Tata Consultancy Services (TCS)",
      period: "May 2022 – Feb 2026",
      domain: "Financial Trading Systems",
      keyMetric: "40% API latency reduction",
      scale: "Millions of events per day",
      stack: ["Java", "Spring Boot", "Apache Kafka", "PostgreSQL", "Kubernetes", "AWS"]
    },
    {
      role: "Blockchain Developer", 
      company: "Tata Consultancy Services (TCS)",
      period: "May 2021 – May 2022",
      domain: "Ethereum / Web3",
      keyMetric: "50+ scenario-based problem sets created",
      stack: ["Solidity", "Ethereum", "Smart Contracts"]
    }
  ],

  projects: [
    {
      id: "qubits-of-dpk",
      name: "Qubits of DPK",
      type: "Education Platform",
      problem: "How do engineers learn distributed systems in production context?",
      solution: "Platform with real architecture case studies and system design experiments",
      stack: ["Spring Boot", "PostgreSQL", "React"],
      outcome: "Live education platform"
    },
    {
      id: "purple-creation",
      name: "Purple Creation",
      type: "Production Web Platform",
      problem: "Production web presence with performance at scale",
      solution: "Next.js + Vercel with optimized hosting and content delivery",
      stack: ["Next.js", "Vercel", "TailwindCSS"],
      outcome: "Production deployed, performance tuned"
    },
    {
      id: "kb-associates",
      name: "KB Associates",
      type: "Business Web Platform",
      problem: "Business needed reliable production web platform with service workflows",
      solution: "Full workflow implementation with optimized cloud hosting",
      stack: ["Cloud hosting", "Service workflows"],
      outcome: "Production deployed"
    },
    {
      id: "apache-fineract-gsoc",
      name: "Apache Fineract — GSoC 2026",
      type: "Open Source Contribution",
      problem: "RestAssured tests lacked type safety and maintainability",
      solution: "Migrated to type-safe Feign clients (FINERACT-2441)",
      stack: ["Java", "Spring Boot", "Apache Fineract", "Feign"],
      impact: "5+ merged PRs, 20+ migrated tests, 30+ commits",
      outcome: "Globally used open-source banking platform"
    }
  ],

  openSource: {
    project: "Apache Fineract",
    program: "Google Summer of Code 2026",
    jira: "FINERACT-2441",
    prs: 5,
    tests: 20,
    commits: 30
  },

  research: {
    title: "Metaplay — A Decentralized Content Marketplace Architecture",
    platform: "Zenodo",
    date: "March 2026",
    url: "zenodo.org/records/19161365"
  },

  certifications: [
    "AWS Certified Solutions Architect (2026)",
    "Microsoft Azure Developer Associate (2026)"
  ],

  education: [
    { degree: "MCA", university: "Sastra University", cgpa: 8.5 },
    { degree: "BSc Computer Science", university: "Sri Krishna Arts & Science College", cgpa: 8.0 }
  ],

  skills: {
    languages: ["Java", "Python", "Shell Script"],
    frameworks: ["Spring Boot", "REST APIs", "Microservices", "Event-Driven Systems"],
    messaging: ["Apache Kafka"],
    cloud: ["AWS EC2", "AWS S3", "Multi-AZ", "Azure", "Kubernetes", "Docker"],
    databases: ["PostgreSQL", "MySQL", "MariaDB"],
    tools: ["Linux", "Git", "GitHub Copilot", "Distributed Tracing", "Log Analysis"],
    blockchain: ["Solidity", "Ethereum", "Smart Contracts"]
  }
}
