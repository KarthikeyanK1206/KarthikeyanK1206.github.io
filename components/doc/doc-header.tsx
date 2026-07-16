import { ArrowUpRight, Code2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CaseDoc } from "@/lib/data/documents";

export function DocHeader({ doc }: { doc: CaseDoc }) {
  return (
    <header className="case-header">
      <div className="case-kicker">
        <span>{doc.id}</span>
        <span>{doc.kind}</span>
        <span className="case-status">{doc.status}</span>
      </div>
      <div className="case-title-row">
        <div>
          <h1>{doc.title}</h1>
          <p className="case-subtitle">{doc.subtitle}</p>
        </div>
        {doc.external && (
          <Button asChild variant="default">
            <a href={doc.external.href} target="_blank" rel="noreferrer">
              <Code2 size={18} /> {doc.external.label} <ArrowUpRight size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
        )}
      </div>

      <dl className="case-meta">
        <div>
          <dt>Context</dt>
          <dd>{doc.context}</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>{doc.period}</dd>
        </div>
        <div>
          <dt>My focus</dt>
          <dd>{doc.focus}</dd>
        </div>
      </dl>

      <div className="case-stack">
        <span className="sr-only">Technologies used: </span>
        {doc.stack.map((item) => <Badge key={item}>{item}</Badge>)}
      </div>

      {doc.sourceNote && <p className="case-source-note">{doc.sourceNote}</p>}

      <div className="evidence-grid">
        {doc.evidence.map((item) => (
          <div key={item.label} className="evidence-item">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
