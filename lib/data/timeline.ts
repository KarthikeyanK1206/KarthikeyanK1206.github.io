export interface RoleBullet {
  context: string;
  action: string;
}

export interface RoleEntry {
  period: string;
  title: string;
  organization: string;
  location: string;
  narrative: string;
  bullets: RoleBullet[];
  related?: { href: string; label: string };
}

export interface EducationEntry {
  period: string;
  title: string;
  organization: string;
  location: string;
  summary: string;
  highlights: { text: string; href?: string }[];
}

export const roles: RoleEntry[] = [
  {
    period: "Jul 2023 - Jul 2024",
    title: "Software Engineer Intern",
    organization: "Clar Technologies · client: Skuchain",
    location: "Coimbatore, India",
    narrative:
      "A year inside a production multi-tenant supply-chain-financing platform, working on a distributed team across services, cloud onboarding, and the delivery pipeline that shipped all of it. The work covered durable workflows, documented APIs, repeatable environments, and delivery processes that did not depend on manual steps.",
    bullets: [
      {
        context: "Financing operations run as long, multi-step processes that must survive restarts and partial failures.",
        action:
          "Built Node.js and Express microservices orchestrated with Temporal, so multi-step state lived in durable workflow histories instead of ad-hoc job flags — the model that later seeded RAEF.",
      },
      {
        context: "New tenants needed cryptographic key setup without manual operations work.",
        action:
          "Built serverless onboarding flows on AWS Lambda with API Gateway, IAM, and KMS serving 500+ users, and documented 8+ partner REST APIs so external integrators could onboard from the docs alone.",
      },
      {
        context: "Environment setup was a manual hour of steps that differed per machine.",
        action:
          "Wrote Ansible playbooks that cut provisioning from about 60 minutes to about 5, and standardized Docker images and Jenkins pipelines across the distributed team, so a release meant running the pipeline, not remembering the steps.",
      },
      {
        context: "The platform fronted everything with a single Nginx reverse proxy.",
        action:
          "Operated it for 12 months without a recorded outage.",
      },
    ],
    related: { href: "/work/raef", label: "Durable workflows led to RAEF" },
  },
  {
    period: "Mar 2023 - Sep 2023",
    title: "Project Intern",
    organization: "Samsung PRISM · Samsung R&D Institute India",
    location: "Remote",
    narrative:
      "A remote research internship with a clear brief and no scaffolding: build a Linux energy-measurement tool from kernel interfaces I had never touched. The constraint that shaped everything was testability — RAPL needs root and bare-metal hardware, and CI has neither.",
    bullets: [
      {
        context: "Linux exposes energy only as cumulative microjoule counters that wrap and overlap across domains.",
        action:
          "Learned the powercap/RAPL subsystem from kernel documentation and built a Go CLI that reports joules and watts for a time window or for exactly as long as a wrapped command runs.",
      },
      {
        context: "Short commands and scheduler jitter silently corrupt naive interval sampling.",
        action:
          "Derived totals from boundary snapshots with monotonic-clock power math, so a 50 ms command measures correctly even when no ticker event ever fires.",
      },
      {
        context: "The hardware dependency threatened to make the core logic untestable.",
        action:
          "Injected the sysfs root as a parameter, so a fake counter tree in a temp directory stands in for real hardware — the whole test seam is one path.",
      },
    ],
    related: { href: "/work/raplscope", label: "The tool became raplscope, since rebuilt end to end" },
  },
];

export const education: EducationEntry[] = [
  {
    period: "Aug 2025 - May 2027",
    title: "MS in Computer Science",
    organization: "University of Southern California",
    location: "Los Angeles, CA",
    summary:
      "Graduate work centered on distributed systems, algorithms, databases, and fault-tolerant software. GPA 3.53 / 4.00. The two systems projects below are where the coursework became running code.",
    highlights: [
      { text: "Built the metadata plane of a quorum-replicated object store with adaptive replica tiers.", href: "/work/nimbusvault" },
      { text: "Built the durable transaction core of a crash-recovery runtime for state-changing LLM-agent tool calls.", href: "/work/raef" },
    ],
  },
  {
    period: "Nov 2020 - May 2024",
    title: "BE in Computer Science and Engineering",
    organization: "Kumaraguru College of Technology",
    location: "Coimbatore, India",
    summary:
      "GPA 9.23 / 10.0. Contributed to an IEEE conference publication on an IoT medical device as an undergraduate research collaboration.",
    highlights: [],
  },
];
