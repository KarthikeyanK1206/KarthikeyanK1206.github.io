import type { Decision } from "@/lib/data/documents";

export function DecisionTable({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="decision-list">
      <div className="decision-head" aria-hidden="true">
        <span>Decision</span>
        <span>Instead of</span>
        <span>Why</span>
        <span>Cost</span>
      </div>
      {decisions.map((item) => (
        <article key={item.decision} className="decision-row">
          <div><span className="mobile-field-label">Decision</span><strong>{item.decision}</strong></div>
          <div><span className="mobile-field-label">Instead of</span><p>{item.insteadOf}</p></div>
          <div><span className="mobile-field-label">Why</span><p>{item.because}</p></div>
          <div><span className="mobile-field-label">Cost</span><p>{item.cost}</p></div>
        </article>
      ))}
    </div>
  );
}
