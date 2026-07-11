type StepProps = {
  marker: string;
  title: string;
  detail: string;
  accent?: boolean;
};

function Step({ marker, title, detail, accent = false }: StepProps) {
  return (
    <li className={`diagram-step${accent ? " diagram-step-accent" : ""}`}>
      <span className="diagram-marker">{marker}</span>
      <strong>{title}</strong>
      <span>{detail}</span>
    </li>
  );
}

function Heading({ type, title }: { type: string; title: string }) {
  return (
    <div className="architecture-heading">
      <span>{type}</span>
      <strong>{title}</strong>
    </div>
  );
}

export function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "nimbusvault") {
    return (
      <figure className="architecture-figure" aria-labelledby="nimbus-map-caption">
        <Heading type="State workflow" title="Replica reconfiguration without a broken read window" />
        <ol className="diagram-flow diagram-flow-four" aria-hidden="true">
          <Step marker="01" title="Stable old set" detail="Readers use the current replicas" />
          <Step marker="02" title="Commit START" detail="Quorum WAL records old + new sets" accent />
          <Step marker="03" title="Copy and verify" detail="New set first; old set remains fallback" />
          <Step marker="04" title="Commit stable set" detail="Quorum COMMIT clears the old set" />
        </ol>
        <figcaption id="nimbus-map-caption">
          Text equivalent: a chunk starts with one stable replica set. After a quorum commits RECONFIGURE_START, reads try the new set and can fall back to the old set while replicas are copied and verified. A quorum-committed RECONFIGURE_COMMIT then makes the new set stable and removes the fallback metadata.
        </figcaption>
      </figure>
    );
  }

  if (slug === "raplscope") {
    return (
      <figure className="architecture-figure" aria-labelledby="raplscope-map-caption">
        <Heading type="Data flow" title="One counter stream, two measurement roles" />
        <div className="diagram-split" aria-hidden="true">
          <div className="diagram-source">
            <span className="diagram-marker">SOURCE</span>
            <strong>RAPL package counters</strong>
            <span>Reader snapshots cumulative energy_uj</span>
          </div>
          <div className="diagram-branches">
            <div className="diagram-branch diagram-branch-accent">
              <span className="diagram-branch-label">BOUNDARIES</span>
              <strong>Initial + final snapshots</strong>
              <span>Wrap-safe delta → total energy → average power</span>
            </div>
            <div className="diagram-branch">
              <span className="diagram-branch-label">TICKER</span>
              <strong>Periodic snapshots</strong>
              <span>Actual elapsed time → interval power → peak, live lines, CSV</span>
            </div>
          </div>
        </div>
        <figcaption id="raplscope-map-caption">
          Text equivalent: the Reader takes cumulative package-energy snapshots. The initial and final boundary snapshots define wrap-corrected total energy and average power, including commands shorter than one tick. Periodic snapshots use actual elapsed time for interval power, the peak estimate, live output, and optional CSV rows.
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="architecture-figure" aria-labelledby="raef-map-caption">
      <Heading type="Recovery state machine" title="The last durable state limits the safe next action" />
      <div className="diagram-recovery" aria-hidden="true">
        <ol className="diagram-flow diagram-flow-three">
          <Step marker="01" title="Derive execution ID" detail="Stable hash of the logical call" />
          <Step marker="02" title="INTENT_LOGGED" detail="Durable before the external boundary" accent />
          <Step marker="03" title="DISPATCHED" detail="Recorded before adapter invocation" />
        </ol>
        <div className="diagram-branches diagram-recovery-branches">
          <div className="diagram-branch">
            <span className="diagram-branch-label">RESTART AT INTENT</span>
            <strong>Replay</strong>
            <span>No dispatch was observed in durable state</span>
          </div>
          <div className="diagram-branch diagram-branch-accent">
            <span className="diagram-branch-label">RESTART AT DISPATCHED</span>
            <strong>Wait, then hand off</strong>
            <span>Do not blindly replay an ambiguous write</span>
          </div>
        </div>
      </div>
      <figcaption id="raef-map-caption">
        Text equivalent: RAEF derives a stable execution ID, durably records INTENT_LOGGED, then records DISPATCHED before invoking a write adapter. On restart, intent-only work is eligible for replay; dispatched work resumes its waiting window and then requires a retry-or-abandon handoff. Target verification exists as a separate path, so this flow does not claim universal exactly-once execution.
      </figcaption>
    </figure>
  );
}
