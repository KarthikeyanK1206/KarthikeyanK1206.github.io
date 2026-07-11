export type ProjectStatus = "Course prototype" | "Shipped tool";

export interface Decision {
  decision: string;
  insteadOf: string;
  because: string;
  cost: string;
}

export interface Evidence {
  value: string;
  label: string;
  detail: string;
}

export interface ArchitectureStep {
  title: string;
  body: string;
}

export interface CaseHeadings {
  problem: string;
  scope: string;
  architecture: string;
  decisions: string;
  validation: string;
  lessons: string;
  future: string;
}

export interface CaseBridge {
  text: string;
  href: string;
  label: string;
}

export interface CaseChallenge {
  title: string;
  body: string[];
}

export interface TerminalSample {
  title: string;
  code: string;
  caption: string;
}

export interface CaseScreenshot {
  srcLight: string;
  srcDark: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface CaseDoc {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  kind: string;
  status: ProjectStatus;
  period: string;
  context: string;
  focus: string;
  chapterRole: string;
  stack: string[];
  summary: string;
  signalLine: string;
  evidence: Evidence[];
  problem: string[];
  motivation: string[];
  constraints: string[];
  ownership: string[];
  architecture: ArchitectureStep[];
  decisions: Decision[];
  validation: string[];
  limitations: string[];
  lessons: string[];
  future: string[];
  challenge: CaseChallenge;
  headings: CaseHeadings;
  bridge: CaseBridge;
  terminal?: TerminalSample;
  screenshot?: CaseScreenshot;
  external?: { href: string; label: string };
}

export const docs: CaseDoc[] = [
  {
    id: "SYS-01",
    slug: "nimbusvault",
    title: "NimbusVault",
    subtitle:
      "A distributed object-store prototype that adjusts replication per chunk while preserving a readable transition path.",
    kind: "Distributed storage",
    status: "Course prototype",
    period: "2026",
    context: "Group Project · USC distributed systems",
    focus: "Metadata replication, adaptive policy, reconfiguration, and failure testing",
    chapterRole: "Breadth · distributed control planes",
    stack: ["C++17", "gRPC", "Protocol Buffers", "RocksDB", "CMake"],
    summary:
      "NimbusVault explores a practical storage question: should a cold object and a hot object pay the same replication cost? The implementation combines a fixed-leader quorum metadata log, versioned chunk storage, heartbeat-driven access windows, and staged replica-set changes. It is a bounded prototype, not a full Raft implementation or a production-ready object store.",
    signalLine:
      "Fixed-leader quorum WAL · RF 2/3/5 tiers · staged replica reconfiguration",
    evidence: [
      {
        value: "2 / 3 / 5",
        label: "replicas by tier",
        detail: "Cold, warm, and hot policy targets are explicit in configuration.",
      },
      {
        value: "2-stage",
        label: "reconfiguration",
        detail: "Commit START, copy and verify, then commit the stable set.",
      },
      {
        value: "10 + 8",
        label: "test artifacts",
        detail: "Ten unit-test files and eight integration scenarios are authored in the repo.",
      },
    ],
    problem: [
      "A fixed replication factor is operationally simple, but it spends the same storage budget on rarely read chunks as it does on hot chunks that could benefit from more read replicas.",
      "Changing a replica set is also a correctness problem: readers need a valid location while bytes are moving, and metadata cannot announce a stable state before the new copies exist.",
    ],
    motivation: [
      "Use the project to study the control plane behind adaptive storage, not just the CRUD surface of an object store.",
      "Make recovery and transition states visible enough to discuss in a design review.",
    ],
    constraints: [
      "Graduate-course scope favored a fixed coordinator over leader election and membership changes.",
      "The system had to run as local C++ services with gRPC contracts and RocksDB persistence.",
      "Replica movement needed a readable fallback path during transition.",
      "The preserved benchmark harness is not strong enough to support comparative performance claims.",
    ],
    ownership: [
      "Focused on the metadata plane: quorum log replication, tier policy, reconfiguration flow, and failure-oriented test artifacts.",
      "The repository is presented as a Group Project; this case study separates the area of focus from the behavior of the team-built system.",
    ],
    architecture: [
      {
        title: "Persist metadata intent",
        body: "The fixed coordinator appends metadata operations to a RocksDB-backed write-ahead log before applying them.",
      },
      {
        title: "Replicate before apply",
        body: "AppendEntry RPCs go to two followers concurrently; the coordinator applies after a quorum acknowledges or returns unavailable on timeout.",
      },
      {
        title: "Store versioned chunks",
        body: "Storage nodes keep versioned chunk keys. Reads resolve metadata, then try current replicas and the old set while a move is in progress.",
      },
      {
        title: "Move through an explicit transition",
        body: "Heartbeat windows classify chunks into cold, warm, or hot tiers. Reconfiguration commits START, copies and verifies replicas, then commits the stable set.",
      },
    ],
    decisions: [
      {
        decision: "Fixed leader with quorum WAL",
        insteadOf: "Full Raft with election and membership",
        because: "It isolated ordered durable metadata within the course risk budget.",
        cost: "No automatic failover; this must not be described as full Raft.",
      },
      {
        decision: "Old and new read sets during transition",
        insteadOf: "Atomic metadata swap before copying",
        because: "Readers retain a fallback location while new replicas are created.",
        cost: "Temporary extra capacity and a need for explicit abort or rollback handling.",
      },
      {
        decision: "Asymmetric per-window hysteresis",
        insteadOf: "Move replicas on every threshold crossing",
        because: "Three hot windows promote; five cold windows demote, reducing churn from brief spikes.",
        cost: "Adaptation is slower, and the current classifier uses the window rate rather than the computed EWMA.",
      },
      {
        decision: "Full replication",
        insteadOf: "Erasure coding",
        because: "Copy and repair paths stay understandable in a prototype centered on control-plane behavior.",
        cost: "Cold data pays a higher storage cost than an erasure-coded design.",
      },
    ],
    validation: [
      "The repository contains ten GoogleTest source files covering the WAL, placement, policy, recovery, client behavior, and replica repair.",
      "Eight shell scenarios exercise service loss, reconfiguration, and follower behavior. They are authored test artifacts, not a claimed green CI run.",
      "This portfolio deliberately omits the earlier throughput, tail-latency, and linearizability claims because the preserved artifacts do not substantiate them.",
    ],
    limitations: [
      "The coordinator is fixed; there is no election, redirect path, or membership protocol.",
      "Writes still carry payloads through the metadata coordinator rather than using a clean allocate-then-direct-write data path.",
      "Concurrent mutation paths need stronger serialization and value-copy boundaries.",
      "DELETE and snapshot behavior need physical garbage collection, periodic compaction, and bounded recovery work.",
    ],
    lessons: [
      "A transition state is part of the public read contract, not an implementation detail.",
      "Scope is a design decision: a fixed leader is defensible only when the missing failover behavior is named clearly.",
      "A benchmark is another system. If it cannot change the variable it labels, its numbers are not evidence.",
    ],
    future: [
      "Replace the fixed leader with a complete consensus and membership path.",
      "Split allocation and commit so object bytes bypass the metadata service.",
      "Add transition aborts, physical deletion, periodic snapshots, WAL compaction, deadlines, and TLS.",
      "Rebuild the A/B harness and carry values through a real concurrent-history checker.",
    ],
    challenge: {
      title: "Keeping reads valid while the bytes move",
      body: [
        "The naive way to change a replica set is to update metadata first and copy afterward. That breaks the moment a read arrives mid-copy: metadata points at replicas that do not exist yet, and the old copies are already unreachable. The opposite order fails differently — copy first, and a crash leaves orphaned replicas no one can find.",
        "The implementation splits the move into commitments with a fallback. A quorum-committed RECONFIGURE_START marks the chunk as transitioning before any bytes move; reads consult the current set and fall back to the old set for the whole window; only after copies are created and verified does a second quorum commit, RECONFIGURE_COMMIT, publish the stable set.",
        "The honest cost: the transition consumes extra capacity while both sets exist, and abort paths for a move that dies halfway still need explicit rollback handling — which is why that item sits in the limitations list rather than the claims.",
      ],
    },
    headings: {
      problem: "Why one replication factor cannot fit every chunk",
      scope: "The course risk budget, and my slice of the system",
      architecture: "How a chunk moves without breaking readers",
      decisions: "Four decisions that shaped the control plane",
      validation: "What the tests cover — and what they don't",
      lessons: "What NimbusVault taught me",
      future: "If I kept building",
    },
    bridge: {
      text: "NimbusVault trusts every number its clocks and counters report. The next project is about what it takes to make a measured number trustworthy in the first place.",
      href: "/work/raplscope",
      label: "Next chapter: raplscope",
    },
  },
  {
    id: "TOOL-02",
    slug: "raplscope",
    title: "raplscope",
    subtitle:
      "A zero-dependency Go CLI that measures whole-system energy like /usr/bin/time measures elapsed time.",
    kind: "Linux systems tool",
    status: "Shipped tool",
    period: "Samsung PRISM, 2023 · current version rebuilt",
    context: "Project internship deliverable",
    focus: "End-to-end CLI design, counter math, process lifecycle, output, and testing",
    chapterRole: "Craft · a finished Unix tool",
    stack: ["Go", "Linux", "sysfs", "RAPL", "HTML", "CSV"],
    summary:
      "raplscope reads cumulative RAPL energy counters exposed by Linux, corrects counter wraparound, and reports joules and power for either a time window or the exact lifetime of a wrapped command. Its strongest engineering quality is restraint: raw I/O, pure math, process lifecycle, and rendering are kept separate and testable.",
    signalLine:
      "Boundary-snapshot totals · wrap-safe deltas · Unix-compatible process semantics",
    evidence: [
      {
        value: "0",
        label: "runtime dependencies",
        detail: "The Go module uses the standard library and ships as one binary.",
      },
      {
        value: "10 ms",
        label: "minimum interval",
        detail: "Input validation rejects sampling intervals below the supported floor.",
      },
      {
        value: "12",
        label: "test functions",
        detail: "Fake-sysfs, wrap math, aggregation, and output behavior are covered in source.",
      },
    ],
    problem: [
      "Linux exposes energy as cumulative microjoule counters, not a convenient per-process metric. Counters wrap, domains can overlap, permissions vary, and ticker intervals jitter under load.",
      "A command wrapper must also behave like a Unix tool: preserve the child's streams, forward signals, report after exit, and return the child's status.",
    ],
    motivation: [
      "Make energy measurement usable in the same workflow where engineers already use /usr/bin/time.",
      "Keep the measurement model explicit enough that a user can understand what the number includes and excludes.",
    ],
    constraints: [
      "RAPL is a whole-package measurement and normally requires bare-metal Linux plus elevated permissions.",
      "The tool cannot attribute package energy to one process simply because it wraps that process.",
      "A sampling interval may jitter, and a short command may finish before the first ticker event.",
      "Virtual CI environments generally do not expose real RAPL hardware.",
    ],
    ownership: [
      "Built the CLI, sysfs reader, accumulation model, wrap mode, output formats, test seam, and browser-based CSV visualization.",
      "The current source is presented as a rebuilt continuation of the Samsung PRISM project rather than implying every current line shipped during the original internship window.",
    ],
    architecture: [
      {
        title: "Discover trustworthy domains",
        body: "An injectable Reader walks the powercap tree and admits top-level package domains while excluding overlapping subdomains and duplicate sources.",
      },
      {
        title: "Separate I/O from math",
        body: "The Reader returns raw cumulative values. A pure Accumulator owns wrap correction, elapsed-time power, totals, and peak tracking.",
      },
      {
        title: "Measure the real boundary",
        body: "Initial and final snapshots define total energy, so a 50 ms command still measures correctly even when no ticker event fires.",
      },
      {
        title: "Preserve process semantics",
        body: "Wrap mode inherits the child's streams, forwards SIGINT and SIGTERM, prints the report to stderr, and maps normal or signal exits back to the shell.",
      },
    ],
    decisions: [
      {
        decision: "Inject the sysfs root",
        insteadOf: "Create a broad hardware-source interface",
        because: "The real variability needed for tests is the filesystem location, not a hypothetical second implementation.",
        cost: "A future GPU or battery source will require a deliberately shaped abstraction.",
      },
      {
        decision: "Boundary snapshots define totals",
        insteadOf: "Sum periodic ticker samples",
        because: "Short commands and partial final intervals otherwise lose energy from the total.",
        cost: "Ticker samples remain necessary for time-series and interval-average peak estimates.",
      },
      {
        decision: "Use actual monotonic elapsed time",
        insteadOf: "Divide by the configured interval",
        because: "Scheduler jitter changes the real interval precisely when the machine is busy.",
        cost: "Each sample carries timing state, but avoids biased power estimates.",
      },
      {
        decision: "Top-level package domains only",
        insteadOf: "Sum every RAPL directory",
        because: "Core, DRAM, psys, and package domains can overlap and silently double count.",
        cost: "The default report is intentionally less granular.",
      },
    ],
    validation: [
      "Fake-sysfs tests cover discovery, excluded domains, permissions, reads, and counter values without requiring root or hardware.",
      "Table-driven tests cover normal and wrapped deltas, multi-domain totals, average and peak behavior, and output formats.",
      "The repo does not contain an automated signal and child-lifecycle suite, so those semantics are documented as an improvement area rather than overclaimed.",
    ],
    limitations: [
      "Results are system-wide package energy, not isolated per-process attribution.",
      "Peak power is an interval average; it is not an instantaneous hardware peak.",
      "One wrap can be detected per sample interval; multiple wraps within one interval are information-theoretically ambiguous.",
      "Sampling or CSV failures can return while a wrapped child still needs stronger process-group cleanup.",
    ],
    lessons: [
      "Derive a total from the most direct measurement; use sampling only for values that need time resolution.",
      "Test seams can be smaller than abstractions. A path parameter was enough to make hardware-bound logic testable.",
      "Command-line correctness includes streams, signals, and exit codes, not only the headline calculation.",
    ],
    future: [
      "Add process-group lifecycle tests and guaranteed child cleanup on measurement failures.",
      "Detect suspend, counter reset, and hardware topology changes during a run.",
      "Add real-hardware validation artifacts and an optional energy-budget exit condition.",
    ],
    challenge: {
      title: "The command that ended before the first sample",
      body: [
        "The obvious accumulation model sums energy deltas at every ticker event. It fails for short commands: a 50 ms command exits before a 1-second ticker ever fires, so a sample-summing tool reports zero energy for work that plainly consumed some. Partial final intervals leak energy the same way, just less visibly.",
        "raplscope inverts the model. Totals come from two snapshots — one when the measurement window opens, one when it closes — so the total is exact for any duration, including commands shorter than one interval. Ticker samples still run, but only for what genuinely needs time resolution: the CSV time series and interval-average peak power.",
        "The same discipline produced the wrap handling: a cumulative counter that resets at max_energy_range_uj means every delta must be wrap-corrected, and a table-driven test locks in both the normal and wrapped paths.",
      ],
    },
    headings: {
      problem: "Four ways an energy counter can mislead you",
      scope: "One binary, rebuilt end to end",
      architecture: "From raw counters to a number you can trust",
      decisions: "Restraint as a design decision",
      validation: "Tested without root or hardware",
      lessons: "What raplscope taught me",
      future: "What a v2 needs",
    },
    bridge: {
      text: "raplscope measures a system from the outside. The next project asks a harder question: what should a system do when it cannot know whether its own last action succeeded?",
      href: "/work/raef",
      label: "Next chapter: RAEF",
    },
    terminal: {
      title: "raplscope wrapping a command",
      code: `$ sudo raplscope -- gzip -9 big.iso

command        gzip -9 big.iso
exit code      0
package-0      412.33 J
total energy   412.33 J
average power  28.71 W
peak power     34.02 W
elapsed        14.363 s
samples        14`,
      caption:
        "Sample session from the project README. The report goes to stderr so the child owns stdout, and the shell receives the child's exit status — the /usr/bin/time convention.",
    },
    screenshot: {
      srcLight: "/work/raplscope-dashboard-light.png",
      srcDark: "/work/raplscope-dashboard-dark.png",
      width: 1120,
      height: 1260,
      alt: "The bundled energy-viz.html dashboard: KPI tiles for total energy, average power, peak power, and elapsed time above a power-draw chart and a cumulative-energy chart.",
      caption:
        "The bundled energy-viz.html dashboard rendering a -csv time series in the browser — the visualization end of the CSV output path.",
    },
    external: {
      href: "https://github.com/KarthikeyanK1206/raplscope",
      label: "View source",
    },
  },
  {
    id: "AI-03",
    slug: "raef",
    title: "RAEF",
    subtitle:
      "A local-first runtime prototype for classifying ambiguous LLM tool writes after a process crash.",
    kind: "AI agent infrastructure",
    status: "Course prototype",
    period: "2026",
    context: "Group Project · USC fault-tolerant systems",
    focus: "Durable intent logging, execution identity, recovery states, and test design",
    chapterRole: "Frontier · reliability for AI agents",
    stack: ["Python", "SQLite", "WAL", "LangChain", "OpenRouter"],
    summary:
      "RAEF starts from the dangerous window between sending a state-changing tool call and receiving its reply. It records deterministic execution identity and durable transaction state so a restart can distinguish intent-only work from a dispatched, locally ambiguous write. The current prototype models capability-aware recovery and explicit handoff; it does not claim universal exactly-once execution.",
    signalLine:
      "Log before send · deterministic execution identity · safety-first handoff",
    evidence: [
      {
        value: "SHA-256",
        label: "execution identity",
        detail: "Run, plan item, tool, and canonical arguments form a repeatable ID.",
      },
      {
        value: "FULL",
        label: "SQLite sync mode",
        detail: "The local runtime uses WAL journaling with synchronous durability enabled.",
      },
      {
        value: "25",
        label: "test functions",
        detail: "WAL, projections, recovery classification, verification, and timing are covered in source.",
      },
    ],
    problem: [
      "If an agent crashes after a remote write is accepted but before the acknowledgement arrives, local state cannot tell whether replay is safe. Replaying may duplicate a payment; skipping may lose a real action.",
      "The correct next step depends on what the target can do: deduplicate an execution ID, expose a check API, reveal distinguishable state, or provide no reliable evidence at all.",
    ],
    motivation: [
      "Move fault tolerance out of prompt text and into a runtime protocol with durable states.",
      "Make uncertainty explicit instead of hiding it behind an 'exactly once' slogan.",
    ],
    constraints: [
      "External tools expose different idempotency and verification capabilities.",
      "The runtime is intentionally local-first and single-node, using SQLite rather than a fleet-scale control plane.",
      "A generic exception is not necessarily an ambiguous failure; adapters must classify the boundary correctly.",
      "The preserved demo injects nine phases, but it does not prove a full crash-point by capability correctness matrix.",
    ],
    ownership: [
      "Focused on the durable transaction model, deterministic identity, recovery classification, and repository test coverage.",
      "The repository is presented as a Group Project; claims describe implemented behavior without attributing the full team-built system to one person.",
    ],
    architecture: [
      {
        title: "Derive stable identity",
        body: "The runtime hashes the run, plan item, tool name, and canonical arguments so the same logical call can be recognized after restart.",
      },
      {
        title: "Log before send",
        body: "Writes record durable intent and a dispatch marker before the adapter crosses the external side-effect boundary.",
      },
      {
        title: "Classify restart state",
        body: "Intent-only work can replay; dispatched work becomes wait or handoff unless target evidence resolves it.",
      },
      {
        title: "Keep observations durable",
        body: "Planner state, messages, results, checkpoints, and timing spans share the SQLite runtime so interrupted work remains inspectable.",
      },
    ],
    decisions: [
      {
        decision: "Safety-first handoff",
        insteadOf: "Blindly replay expired dispatched work",
        because: "A locally ambiguous write may already have committed remotely.",
        cost: "Progress can pause until an operator or a target-specific check resolves the state.",
      },
      {
        decision: "Deterministic execution IDs",
        insteadOf: "Fresh random IDs after every restart",
        because: "A target that supports deduplication can recognize the same logical attempt.",
        cost: "Intentionally repeated identical calls require an explicit invocation key.",
      },
      {
        decision: "SQLite local-first runtime",
        insteadOf: "Start with a broker and distributed database",
        because: "It keeps the durability protocol easy to run, inspect, and test on one node.",
        cost: "It is not yet a multi-process or fleet-scale runtime.",
      },
      {
        decision: "Capability-aware guarantees",
        insteadOf: "One universal recovery promise",
        because: "Deduplication, check APIs, visible state, and opaque tools support different safe actions.",
        cost: "Adapters need a precise contract and the orchestrator must select the correct path.",
      },
    ],
    validation: [
      "Twenty-five pytest functions cover WAL and checkpoint projections, concurrent message writes, recovery classifications, handoff reuse, verifier decisions, and interrupted timing spans.",
      "The demo contains nine unique injection phases, but its driver checks process completion rather than asserting remote side-effect cardinality.",
      "This portfolio therefore describes the protocol and test surface, not 'zero duplicates across nine crash points.'",
    ],
    limitations: [
      "The verifier and restart coordinator are separate paths; dispatched work is not automatically probed before every recovery action.",
      "The simple function adapter can discard execution identity, so idempotency depends on a compatible target adapter.",
      "There is no automated crash-point by target-capability matrix proving end-to-end side-effect counts.",
      "Synchronous JSON observation mirrors and unused dependencies add avoidable cost and maintenance surface.",
    ],
    lessons: [
      "Exactly-once is a capability contract across a boundary, not a local database setting.",
      "An explicit 'unknown' state is safer than collapsing uncertainty into success or failure.",
      "A fault-injection demo becomes evidence only when it asserts the external invariant, not just process exit.",
    ],
    future: [
      "Integrate verification policy and restart orchestration into one capability-aware path.",
      "Build a crash-phase by capability-tier matrix that asserts side-effect cardinality.",
      "Formalize adapter ambiguity and idempotency contracts, then add a multi-process persistence backend.",
      "Move observations to asynchronous OpenTelemetry-style export and trim unused dependencies.",
    ],
    challenge: {
      title: "When an exception is not a failure",
      body: [
        "Python gives a tool adapter exactly one vocabulary for trouble: raise. But after a write crosses the process boundary, an exception can mean two opposite things — the request never arrived, or it committed and only the acknowledgement was lost. Collapsing both into 'failed, retry' is precisely how an agent pays for the same flight twice.",
        "RAEF makes the distinction a typed, durable state instead of a guess. Adapters raise a dedicated ambiguity error for the cannot-know case; the transaction manager records the write as pending recovery rather than failed; and on restart, the classifier routes it by what the target can actually answer — deduplicate by execution ID, probe a check API, or hand off to an operator.",
        "The unresolved edge is documented rather than hidden: a generic adapter can still swallow the execution identity that deduplication depends on, which is why the capability contract sits in the limitations and future-work lists.",
      ],
    },
    headings: {
      problem: "The dangerous window between send and acknowledge",
      scope: "Local-first on purpose, and my slice of the runtime",
      architecture: "Log first, then send, then classify the restart",
      decisions: "Choosing safety over blind progress",
      validation: "Twenty-five tests — and the claim they don't make",
      lessons: "What RAEF taught me",
      future: "From prototype to protocol",
    },
    bridge: {
      text: "The durable-workflow instinct behind RAEF came from a year of building on Temporal in production. That year — and the rest of the timeline — is the next page.",
      href: "/experience",
      label: "Continue to Experience",
    },
  },
];

export const featuredDocs = docs;

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
