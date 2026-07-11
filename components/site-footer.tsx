import { ArrowUpRight, Code2, Contact, Download, Mail } from "lucide-react";
import Link from "next/link";

import { profile } from "@/lib/data/profile";
import { resume } from "@/lib/data/resume";

const FOOTER_NAV = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div>
          <p className="footer-name">Karthikeyan Kumaraguruparan</p>
          <p className="footer-note">
            Backend and distributed systems · Los Angeles · Built with Next.js and TypeScript
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {FOOTER_NAV.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <nav className="footer-links" aria-label="Contact and profile links">
          <a href={`mailto:${profile.email}`}>
            <Mail size={17} /> Email
          </a>
          <a href={resume.pdfPath} download>
            <Download size={17} /> Resume PDF
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Code2 size={17} /> GitHub <ArrowUpRight size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Contact size={17} /> LinkedIn <ArrowUpRight size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
