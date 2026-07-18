import { ArrowRight, ArrowUpRight, Code2, Contact, Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CopyEmail } from "@/components/copy-email";
import { Button } from "@/components/ui/button";
import { principles } from "@/lib/data/principles";
import { profile } from "@/lib/data/profile";
import { resume } from "@/lib/data/resume";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Karthikeyan",
  description:
    "How Karthikeyan Kumaraguruparan approaches backend engineering, failure behavior, technical evidence, and ongoing distributed-systems study.",
  path: "/about",
});

const EXPLORING = [
  {
    topic: "Consensus beyond the fixed leader",
    detail: "NimbusVault deliberately stopped short of election and membership change. I'm working through what a complete Raft-style path costs — the case study's first listed next step.",
    href: "/work/nimbusvault",
  },
  {
    topic: "Tests that assert the external invariant",
    detail: "RAEF's recorded crash matrix asserts side-effect counts from the target's own commit counter — nine phases, exactly one commit each. Extending that from the mock target to real services across capability tiers is the open problem I keep returning to.",
    href: "/work/raef",
  },
  {
    topic: "Observability as a first-class output",
    detail: "Moving RAEF's synchronous JSON mirrors toward asynchronous OpenTelemetry-style export — and, on the tooling side, giving raplscope real-hardware validation artifacts.",
    href: "/work/raplscope",
  },
];

export default function AboutPage() {
  return (
    <div className="reading-shell">
      <header className="page-header about-header">
        <p className="eyebrow">About</p>
        <h1>I care about what a system does when the happy path ends.</h1>
        <div className="about-lede">
          <p>
            I'm Karthikeyan — from Coimbatore, now in Los Angeles. The home page says what I build; this page is about how I work when I'm building it.
          </p>
          <p>
            A year on a production financing platform taught me that reliability is usually made of ordinary decisions: a durable workflow, a reversible deployment, a clear timeout, a useful log, a runbook another engineer can follow. Graduate school is where I study the harder boundaries behind those decisions — quorum state, replica transitions, ambiguous remote writes.
          </p>
          <p>
            I learn unfamiliar layers by reading the primary source and building against it — the RAPL/powercap subsystem during one internship, production Temporal workflows during the other. And I do my best work on teams that write things down: design notes before code, honest review comments, tests and documentation treated as part of delivery rather than cleanup. I'd rather raise a trade-off early and be argued out of it than defend it after it ships.
          </p>
        </div>
      </header>

      <section className="about-section" aria-labelledby="principles-title">
        <h2 className="about-section-title" id="principles-title">How I build</h2>
        <div className="principle-list">
          {principles.map((principle) => (
            <article className="principle-row" key={principle.n}>
              <span>{principle.n}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
                <span className="principle-proof">In practice: {principle.proof}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="exploring-title">
        <h2 className="about-section-title" id="exploring-title">What I'm exploring now</h2>
        <p className="about-section-intro">
          Each of these comes straight from the open problems my own projects left behind — the "next steps" sections are not decoration.
        </p>
        <div className="exploring-list">
          {EXPLORING.map((item) => (
            <article className="exploring-row" key={item.topic}>
              <div>
                <h3>{item.topic}</h3>
                <p>{item.detail}</p>
              </div>
              <Link href={item.href} className="text-link exploring-link">
                Related case study <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section claims-note" aria-labelledby="claims-title">
        <h2 className="about-section-title" id="claims-title">A note on claims</h2>
        <p>
          Project numbers on this site are backed by artifacts you can inspect — test files you can count, configuration you can read, recorded runs preserved in the repositories. Employer-side figures are reported from my experience in those roles. Where an earlier project claim could not be reproduced from the preserved evidence, I removed the claim rather than the caveat.
        </p>
      </section>

      <section className="about-section" aria-labelledby="education-title">
        <h2 className="about-section-title" id="education-title">Education</h2>
        {resume.education.map((entry) => (
          <article className="resume-entry" key={entry.school}>
            <div className="resume-entry-head"><h3>{entry.school}</h3><span className="resume-period">{entry.period}</span></div>
            <p className="resume-org">{entry.degree}</p>
            <p className="timeline-summary">{entry.detail}</p>
          </article>
        ))}
      </section>

      <section className="about-section" aria-labelledby="publication-title">
        <h2 className="about-section-title" id="publication-title">Publication</h2>
        <p className="publication-copy">{resume.publication.citation}</p>
        <a className="timeline-link" href={resume.publication.href} target="_blank" rel="noreferrer">
          View on IEEE Xplore <ArrowUpRight size={16} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </section>

      <section className="about-section about-links" aria-labelledby="elsewhere-title">
        <h2 className="about-section-title" id="elsewhere-title">Elsewhere</h2>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={19} /> GitHub <ArrowUpRight size={15} /><span className="sr-only">(opens in a new tab)</span></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Contact size={19} /> LinkedIn <ArrowUpRight size={15} /><span className="sr-only">(opens in a new tab)</span></a>
        </div>
      </section>

      <section className="about-section about-cta" aria-labelledby="about-cta-title">
        <h2 className="about-section-title" id="about-cta-title">Where to go next</h2>
        <p className="about-section-intro">
          The case studies are the fastest way to judge how I think; the resume is the fastest way to judge fit.
        </p>
        <div className="about-actions">
          <Button asChild variant="accent">
            <Link href="/work">Read the case studies <ArrowRight size={18} /></Link>
          </Button>
          <Button asChild variant="default">
            <a href={resume.pdfPath} download><Download size={18} /> Download resume (PDF)</a>
          </Button>
          <Button asChild variant="default">
            <a href={`mailto:${profile.email}`}><Mail size={18} /> Email me</a>
          </Button>
          <CopyEmail email={profile.email} />
        </div>
      </section>
    </div>
  );
}
