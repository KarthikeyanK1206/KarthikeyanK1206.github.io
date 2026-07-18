import type { Metadata } from "next";
import Link from "next/link";

import { DocCard } from "@/components/doc/doc-card";
import { docs } from "@/lib/data/documents";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Backend & Distributed Systems Case Studies",
  description:
    "Engineering case studies on replicated storage, Linux energy tooling, and failure-aware agent infrastructure, with decisions and limitations documented.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="section-shell">
      <header className="page-header">
        <p className="eyebrow">Engineering case studies</p>
        <h1>Three systems, one question.</h1>
        <p>
          What should a system do when something fails? Each case study answers it at a different layer. Read in order, or jump to the one closest to the role you are hiring for.
        </p>
      </header>

      <nav className="work-guide" aria-label="Case study guide by role">
        <Link href="/work/nimbusvault"><strong>Distributed systems</strong><span>Start with NimbusVault</span></Link>
        <Link href="/work/raplscope"><strong>Systems and developer tools</strong><span>Start with raplscope</span></Link>
        <Link href="/work/raef"><strong>AI infrastructure</strong><span>Start with RAEF</span></Link>
      </nav>

      <section className="home-section" aria-labelledby="case-studies-title">
        <h2 id="case-studies-title" className="sr-only">Case studies in reading order</h2>
        <ol className="chapter-list">
          {docs.map((doc) => (
            <li key={doc.slug} className="work-chapter">
              <DocCard doc={doc} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
