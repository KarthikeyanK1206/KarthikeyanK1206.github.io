import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { education, roles } from "@/lib/data/timeline";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineering Experience",
  description:
    "Karthikeyan Kumaraguruparan's engineering timeline: backend production internship work, systems projects, and MS Computer Science study at USC.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <div className="section-shell">
      <header className="page-header">
        <p className="eyebrow">Experience</p>
        <h1>From production workflows to failure-aware systems.</h1>
        <p>
          Two internships and a graduate program, all pulling in one direction: durable workflows, controlled releases, replicated state, and tools that report what they actually measure. Each role links to the project it led to.
        </p>
      </header>

      <section className="timeline" aria-labelledby="roles-title">
        <h2 id="roles-title" className="timeline-group-title">Engineering roles</h2>
        {roles.map((entry) => (
          <article className="timeline-entry" key={`${entry.period}-${entry.title}`}>
            <p className="timeline-period">{entry.period}</p>
            <div className="timeline-main">
              <h3>{entry.title}</h3>
              <p className="timeline-org">{entry.organization}</p>
              <p className="timeline-location">{entry.location}</p>
              <p className="role-narrative">{entry.narrative}</p>
              <ul className="role-bullets">
                {entry.bullets.map((bullet) => (
                  <li key={bullet.context}>
                    <span className="role-context">{bullet.context}</span>{" "}
                    {bullet.action}
                  </li>
                ))}
              </ul>
              {entry.related && (
                <Link href={entry.related.href} className="timeline-link">
                  {entry.related.label} <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="timeline" aria-labelledby="education-title">
        <h2 id="education-title" className="timeline-group-title">Education</h2>
        {education.map((entry) => (
          <article className="timeline-entry" key={`${entry.period}-${entry.title}`}>
            <p className="timeline-period">{entry.period}</p>
            <div className="timeline-main">
              <h3>{entry.title}</h3>
              <p className="timeline-org">{entry.organization}</p>
              <p className="timeline-location">{entry.location}</p>
              <p className="timeline-summary">{entry.summary}</p>
              {entry.highlights.length > 0 && (
                <ul className="timeline-highlights">
                  {entry.highlights.map((item) => (
                    <li key={item.text}>
                      {item.href ? <Link href={item.href} className="highlight-link">{item.text}</Link> : item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </section>

      <nav className="page-continue" aria-label="Continue exploring">
        <Link href="/about" className="continue-link">
          <span className="glance-label">Next</span>
          <span>How I think and what I'm exploring <ArrowRight size={16} aria-hidden="true" /></span>
        </Link>
        <Link href="/resume" className="continue-link">
          <span className="glance-label">Shortcut</span>
          <span>The one-page resume <ArrowRight size={16} aria-hidden="true" /></span>
        </Link>
      </nav>
    </div>
  );
}
