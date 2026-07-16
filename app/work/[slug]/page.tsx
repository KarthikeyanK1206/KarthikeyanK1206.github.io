import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DecisionTable } from "@/components/doc/decision-table";
import { DocHeader } from "@/components/doc/doc-header";
import { TerminalFigure } from "@/components/doc/terminal-figure";
import { SectionHeading } from "@/components/paper/section-heading";
import { ProjectVisual } from "@/components/project-visual";
import { ThemedProjectImage } from "@/components/themed-project-image";
import { docs, getDoc } from "@/lib/data/documents";
import { profile } from "@/lib/data/profile";
import { createPageMetadata } from "@/lib/seo";

const PROGRAMMING_LANGUAGES: Record<string, string[]> = {
  nimbusvault: ["C++"],
  raplscope: ["Go", "HTML"],
  raef: ["Python"],
};

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return createPageMetadata({
    title: `${doc.title} Case Study`,
    description: doc.subtitle,
    path: `/work/${doc.slug}`,
    type: "article",
    imagePath: `/work/${doc.slug}/opengraph-image`,
    imageAlt: `${doc.title} engineering case study by ${profile.name}`,
  });
}

function Copy({ paragraphs }: { paragraphs: string[] }) {
  return <div className="case-copy">{paragraphs.map((item) => <p key={item}>{item}</p>)}</div>;
}

function List({ items }: { items: string[] }) {
  return <div className="case-copy"><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const index = docs.findIndex((item) => item.slug === doc.slug);
  const previous = index > 0 ? docs[index - 1] : null;
  const next = index < docs.length - 1 ? docs[index + 1] : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: doc.title,
    description: doc.subtitle,
    url: `${profile.siteUrl}/work/${doc.slug}`,
    author: { "@id": `${profile.siteUrl}/#person` },
    isPartOf: { "@id": `${profile.siteUrl}/#website` },
    programmingLanguage: PROGRAMMING_LANGUAGES[doc.slug],
    ...(doc.external ? { codeRepository: doc.external.href } : {}),
  };

  return (
    <div className="reading-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <DocHeader doc={doc} />

      <article className="case-article">
        <p className="case-summary">{doc.summary}</p>

        <aside className="case-glance" aria-label="The 30-second version">
          <p className="case-glance-title">The 30-second version</p>
          <dl>
            <div>
              <dt>What it is</dt>
              <dd>{doc.glance.what}</dd>
            </div>
            <div>
              <dt>What I did</dt>
              <dd>{doc.glance.role}</dd>
            </div>
            <div>
              <dt>Remember one thing</dt>
              <dd>{doc.glance.takeaway}</dd>
            </div>
          </dl>
        </aside>

        <nav className="case-section-nav" aria-label="Case study sections">
          <a href="#problem">Problem</a>
          <a href="#constraints">Scope</a>
          <a href="#architecture">Architecture</a>
          <a href="#decisions">Decisions</a>
          <a href="#challenge">Challenge</a>
          <a href="#validation">Validation and limits</a>
          <a href="#lessons">Lessons</a>
          <a href="#next-steps">Next steps</a>
        </nav>

        <section className="case-section" id="problem">
          <SectionHeading n="01" title={doc.headings.problem} />
          <div>
            <Copy paragraphs={doc.problem} />
            <h3 className="case-subheading">Why this was worth building</h3>
            <List items={doc.motivation} />
          </div>
        </section>

        <section className="case-section" id="constraints">
          <SectionHeading n="02" title={doc.headings.scope} />
          <div className="case-split-lists">
            <div><h3 className="case-subheading">Constraints</h3><List items={doc.constraints} /></div>
            <div><h3 className="case-subheading">My focus</h3><List items={doc.ownership} /></div>
          </div>
        </section>

        <section className="case-section" id="architecture">
          <SectionHeading n="03" title={doc.headings.architecture} />
          <div>
            <ProjectVisual slug={doc.slug} />
            <div className="architecture-steps">
              {doc.architecture.map((step, stepIndex) => (
                <div className="architecture-step" key={step.title}>
                  <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                  <div><strong>{step.title}</strong><p>{step.body}</p></div>
                </div>
              ))}
            </div>
            {doc.terminal && <TerminalFigure sample={doc.terminal} />}
            {doc.screenshot && (
              <figure className="case-screenshot">
                <ThemedProjectImage
                  lightSrc={doc.screenshot.srcLight}
                  darkSrc={doc.screenshot.srcDark}
                  width={doc.screenshot.width}
                  height={doc.screenshot.height}
                  alt={doc.screenshot.alt}
                />
                <figcaption>{doc.screenshot.caption}</figcaption>
              </figure>
            )}
          </div>
        </section>

        <section className="case-section" id="decisions">
          <SectionHeading n="04" title={doc.headings.decisions} />
          <DecisionTable decisions={doc.decisions} />
        </section>

        <section className="case-section" id="challenge">
          <SectionHeading n="05" title={doc.challenge.title} />
          <Copy paragraphs={doc.challenge.body} />
        </section>

        <section className="case-section" id="validation">
          <SectionHeading n="06" title={doc.headings.validation} />
          <div className="case-split-lists">
            <div><h3 className="case-subheading">What the repository supports</h3><List items={doc.validation} /></div>
            <div className="limitations-block"><h3 className="case-subheading">Known limitations</h3><List items={doc.limitations} /></div>
          </div>
        </section>

        <section className="case-section" id="lessons">
          <SectionHeading n="07" title={doc.headings.lessons} />
          <List items={doc.lessons} />
        </section>

        <section className="case-section" id="next-steps">
          <SectionHeading n="08" title={doc.headings.future} />
          <List items={doc.future} />
        </section>

        <aside className="case-bridge" aria-label="Where this led">
          <p className="eyebrow">Where this led</p>
          <p className="case-bridge-text">{doc.bridge.text}</p>
          <Link href={doc.bridge.href} className="text-link">
            {doc.bridge.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>

        <nav className="case-pagination" aria-label="Case study navigation">
          {previous ? (
            <Link href={`/work/${previous.slug}`}><ArrowLeft size={18} /><span><small>Previous case study</small>{previous.title}</span></Link>
          ) : <span />}
          {next ? (
            <Link href={`/work/${next.slug}`}><span><small>Next case study</small>{next.title}</span><ArrowRight size={18} /></Link>
          ) : <span />}
        </nav>
        <p className="case-all-link">
          <Link href="/work" className="text-link">All case studies</Link>
        </p>
      </article>
    </div>
  );
}
