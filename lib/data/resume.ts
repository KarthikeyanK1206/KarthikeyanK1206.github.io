export const resume = {
  pdfPath: "/resume/Karthikeyan-Kumaraguruparan-Resume.pdf",
  meta: {
    fileName: "Karthikeyan-Kumaraguruparan-Resume.pdf",
    fileSize: "162 KB",
    pages: 1,
    updated: "July 2026",
    target: "New-grad backend/infrastructure SDE roles · available May 2027",
  },
  summary:
    "Backend and distributed-systems engineer: a year-long software engineering internship building production multi-tenant services (Node.js, Temporal, AWS), now completing an MS in Computer Science at USC. Systems projects on failure behavior, all open source with green CI. Seeking new-grad backend/infrastructure SDE roles, available May 2027.",
  education: [
    {
      school: "University of Southern California",
      degree: "Master of Science in Computer Science",
      place: "Los Angeles, CA",
      period: "Aug 2025 - May 2027",
      detail:
        "GPA 3.53 / 4.00 · Distributed Systems · Algorithms and Data Structures · Database Management",
    },
    {
      school: "Kumaraguru College of Technology",
      degree: "BE in Computer Science and Engineering",
      place: "Coimbatore, India",
      period: "Nov 2020 - May 2024",
      detail: "GPA 9.23 / 10.0",
    },
  ],
  experience: [
    {
      org: "Clar Technologies · client: Skuchain",
      title: "Software Engineer Intern",
      place: "Coimbatore, India",
      period: "Jul 2023 - Jul 2024",
      bullets: [
        "Built Node.js and Express microservices for a multi-tenant supply-chain-financing platform, using Temporal for durable workflows.",
        "Developed AWS Lambda onboarding and key-management flows for 500+ users and documented 8+ partner REST APIs.",
        "Reduced environment provisioning from 60 minutes to 5 minutes with Ansible and operated Nginx for 12 months without a recorded outage.",
        "Containerized services with Docker and standardized Jenkins delivery workflows across the distributed team.",
      ],
    },
    {
      org: "Samsung PRISM · Samsung R&D Institute India",
      title: "Project Intern",
      place: "Remote",
      period: "Mar 2023 - Sep 2023",
      bullets: [
        "Created a Go CLI for whole-system energy and power measurement using Linux RAPL counters exposed through powercap sysfs.",
        "Designed wrap-safe deltas, monotonic elapsed-time math, and boundary snapshots for short commands.",
        "Implemented /usr/bin/time-style command wrapping with inherited streams, signal forwarding, exit-code propagation, and JSON/CSV output.",
        "Made hardware-bound logic testable without root access through an injectable fake-sysfs path.",
      ],
    },
  ],
  skills: [
    {
      group: "Languages",
      items: ["Go", "Python", "C++", "TypeScript", "SQL", "Bash"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express", "REST", "gRPC", "Protocol Buffers", "Temporal", "Microservices"],
    },
    {
      group: "Cloud and delivery",
      items: ["AWS Lambda", "API Gateway", "IAM", "KMS", "Docker", "Jenkins", "GitHub Actions", "Ansible", "Nginx", "Linux"],
    },
    {
      group: "Data and systems",
      items: ["MongoDB", "RocksDB", "SQLite", "Quorum replication", "Write-ahead logging", "Crash recovery"],
    },
  ],
  publication: {
    citation:
      '"IoT Based Smart IV Drip Stand," research collaboration, IEEE conference, October 2021.',
    href: "https://ieeexplore.ieee.org/document/9675560",
  },
};
