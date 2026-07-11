import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Mail,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { CopyEmail } from "@/components/copy-email";
import { Button } from "@/components/ui/button";
import { getDoc } from "@/lib/data/documents";
import { profile } from "@/lib/data/profile";
import { resume } from "@/lib/data/resume";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `${profile.name} | Backend & Distributed Systems Engineer`,
  description:
    "Early-career backend engineer and USC MS Computer Science student building distributed systems, crash-recovery infrastructure, and Linux tooling.",
  path: "/",
  absoluteTitle: true,
});

const PROOF_STRIP = [
  { label: "Degree", value: "MS Computer Science, USC · May 2027" },
  { label: "Experience", value: "12-month backend internship · Node.js, Temporal, AWS" },
  { label: "Focus", value: "Replication, crash recovery, Linux tooling" },
  { label: "Languages", value: "C++, Go, Python, TypeScript" },
];

const WORK_PREVIEWS = [
  {
    slug: "nimbusvault",
    hook: "Should cold data pay the same replication bill as hot data?",
    proof:
      "A C++ object store that retiers chunks between 2, 3, and 5 replicas — while readers stay correct mid-move.",
  },
  {
    slug: "raplscope",
    hook: "/usr/bin/time, but for energy.",
    proof:
      "A zero-dependency Go CLI that reads Linux RAPL counters, survives counter wraparound, and wraps commands like a proper Unix citizen.",
  },
  {
    slug: "raef",
    hook: "The agent crashed after the payment was sent — and before the reply came back.",
    proof:
      "A Python runtime that logs intent before dispatch, so a restart can tell replayable work from an ambiguous write.",
  },
];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${profile.siteUrl}/#website`,
        url: `${profile.siteUrl}/`,
        name: `${profile.name} Engineering Portfolio`,
        alternateName: `${profile.shortName} Portfolio`,
        inLanguage: "en-US",
        author: { "@id": `${profile.siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${profile.siteUrl}/#person`,
        name: profile.name,
        url: `${profile.siteUrl}/`,
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: [
          "Backend engineering",
          "Distributed systems",
          "Crash recovery",
          "Linux systems tooling",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section className="home-hero section-shell" aria-labelledby="hero-headline">
        <p className="eyebrow">MS Computer Science @ USC · Los Angeles</p>
        <p className="hero-name">{profile.name}</p>
        <h1 id="hero-headline" className="hero-headline">{profile.headline}</h1>
        <p className="hero-sub">{profile.sub}</p>

        <div className="hero-actions">
          <Button asChild variant="accent">
            <Link href="/work">View selected work <ArrowRight size={18} /></Link>
          </Button>
          <Button asChild variant="default">
            <a href={resume.pdfPath} download>Download resume (PDF) <Download size={18} /></a>
          </Button>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hero-github">
            <Code2 size={18} /> GitHub <ExternalLink size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="availability-line">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>{profile.availability}</span>
        </div>
      </section>

      <section className="proof-band" aria-label="Profile facts">
        <dl className="proof-strip section-shell">
          {PROOF_STRIP.map((item) => (
            <div key={item.label} className="proof-fact">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section-shell home-section" aria-labelledby="selected-work-title">
        <div className="section-header">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="selected-work-title">Three systems, one question</h2>
          </div>
          <Link href="/work" className="text-link">All case studies</Link>
        </div>
        <p className="section-intro">
          Each project asks what a system should do when something fails — at a different layer, with the trade-offs and known limits written down.
        </p>
        <div className="preview-grid">
          {WORK_PREVIEWS.map((preview) => {
            const doc = getDoc(preview.slug);
            if (!doc) return null;
            return (
              <Link key={preview.slug} href={`/work/${preview.slug}`} className="preview-card">
                <p className="preview-meta">
                  <span>{doc.id}</span> {doc.kind} · {doc.status}
                </p>
                <h3>{doc.title}</h3>
                <p className="preview-hook">{preview.hook}</p>
                <p className="preview-proof">{preview.proof}</p>
                <span className="preview-cta" aria-hidden="true">
                  Read the case study <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bridge-band" aria-labelledby="bridge-title">
        <div className="section-shell bridge-layout">
          <div>
            <p className="eyebrow">Where this comes from</p>
            <h2 id="bridge-title">From production to first principles</h2>
          </div>
          <div className="bridge-copy">
            <p>
              Before USC, I spent a year inside a multi-tenant supply-chain-financing platform: durable Temporal workflows, AWS onboarding and key-management flows, and delivery automation. These projects study the failure boundaries that year kept pointing at.
            </p>
            <Link href="/experience" className="text-link">
              Read the full timeline <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell contact-section" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Hiring for backend or infrastructure?</h2>
          <p>I am looking for an early-career team where correctness, reliability, and clear written reasoning matter. A case study and a conversation is the fastest way to evaluate me.</p>
        </div>
        <div className="contact-actions">
          <Button asChild variant="accent">
            <a href={`mailto:${profile.email}`}><Mail size={18} /> Email Karthikeyan</a>
          </Button>
          <CopyEmail email={profile.email} />
        </div>
      </section>
    </>
  );
}
