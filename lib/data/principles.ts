export interface Principle {
  n: string;
  title: string;
  body: string;
  proof: string;
}

export const principles: Principle[] = [
  {
    n: "01",
    title: "Name the failure state.",
    body: "A timeout is not automatically a failure. I model what is known, what is unknown, and which recovery action is safe.",
    proof: "RAEF keeps dispatched writes ambiguous instead of guessing that replay is safe.",
  },
  {
    n: "02",
    title: "Prefer evidence to adjectives.",
    body: "Tests, raw artifacts, and explicit limitations carry more credibility than a claim that a system is fast or reliable.",
    proof: "This portfolio removes benchmark claims that the preserved harness cannot reproduce.",
  },
  {
    n: "03",
    title: "Use the smallest useful abstraction.",
    body: "I add indirection when a real second use case shapes it, not when a future use case is only hypothetical.",
    proof: "raplscope injects one sysfs path instead of inventing a hardware-source framework.",
  },
  {
    n: "04",
    title: "Write the reasoning down.",
    body: "I write down alternatives and costs so design decisions can be reviewed and challenged precisely.",
    proof: "Every case study on this site publishes a decision / instead-of / why / cost table and a known-limitations list.",
  },
];
