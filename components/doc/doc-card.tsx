import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { CaseDoc } from "@/lib/data/documents";

export function DocCard({ doc }: { doc: CaseDoc; i?: number }) {
  return (
    <Link href={`/work/${doc.slug}`} className="project-row">
      <div className="project-row-index">
        <span>{doc.id}</span>
        <small>{doc.kind}</small>
      </div>
      <div className="project-row-main">
        <div className="project-row-title">
          <h3>{doc.title}</h3>
          <span>{doc.status}</span>
        </div>
        <p>{doc.subtitle}</p>
        <strong className="project-signal">{doc.signalLine}</strong>
        <div className="project-row-stack">
          {doc.stack.slice(0, 5).map((item) => <Badge key={item}>{item}</Badge>)}
        </div>
      </div>
      <span className="project-row-arrow" aria-hidden="true"><ArrowRight size={20} /></span>
    </Link>
  );
}
