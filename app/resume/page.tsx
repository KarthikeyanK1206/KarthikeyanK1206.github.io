import { ArrowRight, Download, ExternalLink, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CopyEmail } from "@/components/copy-email";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { docs } from "@/lib/data/documents";
import { profile } from "@/lib/data/profile";
import { resume } from "@/lib/data/resume";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineering Resume",
  description:
    "Read or download Karthikeyan Kumaraguruparan's resume covering backend internship experience, systems projects, technical skills, and education.",
  path: "/resume",
});

const GLANCE = [
  { label: "Experience", value: "Two engineering internships · 2023–2024", href: "#experience" },
  { label: "Projects", value: "Three systems case studies", href: "#projects" },
  { label: "Education", value: "MS CS, USC · May 2027", href: "#education" },
  { label: "Skills", value: "Go · Python · C++ · TypeScript", href: "#skills" },
];

export default function ResumePage() {
  return (
    <div className="reading-shell">
      <header className="page-header resume-header">
        <p className="eyebrow">Resume</p>
        <h1>Everything on this site, on one page.</h1>
        <p className="resume-target">{resume.meta.target} · {profile.location}</p>
        <p>{resume.summary}</p>
        <div className="resume-actions no-print">
          <Button asChild variant="accent">
            <a href={resume.pdfPath} download type="application/pdf">
              <Download size={18} /> Download resume (PDF, {resume.meta.fileSize})
            </a>
          </Button>
          <Button asChild variant="default">
            <a href={resume.pdfPath} target="_blank" rel="noreferrer">
              Open resume PDF <ExternalLink size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
        </div>
        <p className="resume-file-meta no-print">
          {resume.meta.fileName} · {resume.meta.pages} page · updated {resume.meta.updated}
        </p>
      </header>

      <nav className="resume-glance no-print" aria-label="Resume at a glance">
        {GLANCE.map((item) => (
          <a key={item.label} href={item.href} className="glance-item">
            <span className="glance-label">{item.label}</span>
            <span className="glance-value">{item.value}</span>
          </a>
        ))}
      </nav>

      <section className="resume-section" id="experience" aria-labelledby="resume-experience-title">
        <h2 className="resume-section-title" id="resume-experience-title">Experience</h2>
        {resume.experience.map((entry) => (
          <article className="resume-entry" key={entry.org}>
            <div className="resume-entry-head"><h3>{entry.title}</h3><span className="resume-period">{entry.period}</span></div>
            <p className="resume-org">{entry.org}</p>
            <p className="timeline-location">{entry.place}</p>
            <ul className="resume-bullets">{entry.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
        <Link href="/experience" className="timeline-link no-print">
          Full role narratives on the Experience page <ArrowRight size={16} />
        </Link>
      </section>

      <section className="resume-section" id="projects" aria-labelledby="resume-projects-title">
        <h2 className="resume-section-title" id="resume-projects-title">Selected projects</h2>
        {docs.map((doc) => (
          <article className="resume-entry" key={doc.slug}>
            <div className="resume-entry-head"><h3>{doc.title}</h3><span className="resume-period">{doc.context}</span></div>
            <p className="timeline-summary">{doc.signalLine}</p>
            <Link href={`/work/${doc.slug}`} className="timeline-link">Read case study <ArrowRight size={16} /></Link>
          </article>
        ))}
      </section>

      <section className="resume-section" id="education" aria-labelledby="resume-education-title">
        <h2 className="resume-section-title" id="resume-education-title">Education</h2>
        {resume.education.map((entry) => (
          <article className="resume-entry" key={entry.school}>
            <div className="resume-entry-head"><h3>{entry.school}</h3><span className="resume-period">{entry.period}</span></div>
            <p className="resume-org">{entry.degree}</p>
            <p className="timeline-summary">{entry.detail}</p>
          </article>
        ))}
      </section>

      <section className="resume-section" id="skills" aria-labelledby="resume-skills-title">
        <h2 className="resume-section-title" id="resume-skills-title">Technical skills</h2>
        <dl className="skills-list">
          {resume.skills.map((group) => (
            <div className="skills-row" key={group.group}>
              <dt>{group.group}</dt>
              <dd>{group.items.map((item) => <Badge key={item}>{item}</Badge>)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="resume-section" id="publication" aria-labelledby="resume-publication-title">
        <h2 className="resume-section-title" id="resume-publication-title">Publication</h2>
        <p className="publication-copy">{resume.publication.citation}</p>
      </section>

      <section className="resume-section resume-next no-print" aria-labelledby="resume-next-title">
        <h2 className="resume-section-title" id="resume-next-title">Next step</h2>
        <p className="about-section-intro">
          If the case studies and this page fit a role you are hiring for, email is the fastest way to reach me.
        </p>
        <div className="resume-actions">
          <Button asChild variant="accent">
            <a href={`mailto:${profile.email}`}><Mail size={18} /> Email Karthikeyan</a>
          </Button>
          <CopyEmail email={profile.email} />
        </div>
      </section>
    </div>
  );
}
