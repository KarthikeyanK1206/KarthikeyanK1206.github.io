# Karthikeyan Kumaraguruparan - Engineering Portfolio

A recruiter-focused portfolio for a backend and distributed-systems engineer.
The visual direction is **Engineering Field Notes**: direct navigation,
source-backed case studies, restrained document cues, and actual system maps.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS 4 with a tokenized light/dark color system
- Lightweight CSS transitions for menu and theme state changes
- shadcn-style Button and Badge primitives
- Lucide icons
- `next/font`, static metadata, Open Graph images, sitemap, robots, and JSON-LD

## Run

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

The visual harness expects a server on `http://127.0.0.1:3003` by default:

```bash
PORTFOLIO_URL=http://127.0.0.1:3003 npm run visual-check
```

It launches the installed Chrome through Playwright Core and checks 320px,
390px, and 1440px layouts, horizontal overflow, console errors, light/dark
themes, project diagrams, and mobile-menu keyboard behavior.

## Information Architecture

- `/` - identity, role fit, verified production evidence, selected projects
- `/work` - three recruiter-aligned case studies
- `/work/[slug]` - problem, contribution, architecture, decisions, validation,
  limitations, lessons, and next steps
- `/experience` - professional experience and education
- `/about` - engineering motivation and working principles
- `/resume` - readable web resume and one-page PDF

Legacy `/log` and `/notes` routes redirect to standard recruiter-facing pages.

## Content Integrity

The project repositories were audited at source level. The site deliberately
does not repeat earlier NimbusVault performance/linearizability claims or RAEF
exactly-once claims because the preserved artifacts do not substantiate them.
Group work is labeled `Group Project`, personal focus is separated from the
team-built system, and every case study names its known limitations.

Project content lives in `lib/data/documents.ts`; profile, resume, experience,
and principles live in the other files under `lib/data/`.

The deployment root is this directory: `Portfolio/kk-desk`.
