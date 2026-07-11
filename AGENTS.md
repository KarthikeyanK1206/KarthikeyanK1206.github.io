# AGENTS.md

## Scope and workflow

- This directory is the deployable portfolio root. Before every task, read `README.md`, `package.json`, this file, and the relevant records in `docs/`; always consult `docs/content-verification.md` before changing claims and `docs/design-system.md` before changing UI.
- Keep each task narrowly scoped. Do not perform unrelated refactors, rename or reorganize files without need, change configuration, or add dependencies when the existing stack can do the job.
- Preserve user changes. At handoff, list every changed file, summarize validation, and identify anything not run or still unresolved.

## Setup and validation

```bash
npm ci
npm run dev -- --port 3003
npm run typecheck
npm run build
PORTFOLIO_URL=http://127.0.0.1:3003 npm run visual-check
```

`visual-check` is the browser/accessibility test suite; it requires the site to be running at the supplied URL and local Google Chrome. There are currently no `lint` or unit-test scripts. After every task, run at least `npm run typecheck` and the most relevant additional validation; run the production build and visual harness for release-facing UI changes.

## Project map

- `app/`: Next.js App Router pages, metadata, global styles, redirects, and error states.
- `app/page.tsx`, `app/work/`, `app/experience/`, `app/about/`, `app/resume/`: the five recruiter-facing areas; case studies are generated at `app/work/[slug]/`.
- `lib/data/`: source of truth for profile, project, experience, resume, and principles copy.
- `components/`: shared site, document, paper, and UI components.
- `public/`: resume PDF and project imagery; `scripts/visual-check.mjs`: Playwright/axe checks.
- `docs/`: strategy, claim ledger, information architecture, design system, and design record. Treat missing audit/checklist documents as missing evidence, not as implied approval.

## Positioning and content integrity

- Position Karthikeyan as an early-career backend/distributed-systems engineer seeking SDE roles, with a year-long **production internship** and an MS at USC; never imply a full-time SWE year or senior-level scope.
- Center the evidence-backed theme: deliberate failure behavior, verifiable engineering evidence, and honest scope. Keep Home → Work → Experience → About → Resume as the recruiter story and preserve precise group-project/personal-contribution labels.
- Treat `docs/content-verification.md` as the claim gate. Use only verified claims as facts. Label plausible employer/education facts conservatively and confirm them before strengthening; omit or qualify unsupported metrics and absolutes. Never invent measurements, passing runs, ownership, production use, or CI status.
- Keep the website, web resume, downloadable PDF, and project framing consistent. When evidence changes, update the claim ledger or cite the repository artifact supporting it.

## Design and accessibility guardrails

- Follow `docs/design-system.md`: use existing CSS tokens, typography, spacing, components, and the single-accent system; avoid hardcoded colors, decorative effects, gratuitous cards, and new animation libraries.
- Preserve semantic headings and landmarks, skip-link behavior, keyboard access, visible focus, 44px targets, meaningful alt text, AA contrast in both themes, reduced-motion support, and 320px reflow without page-level horizontal scrolling.
- Keep routes statically rendered where possible, client JavaScript minimal, internal/external link behavior consistent, and first-load JS near the documented budget.
