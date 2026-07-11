import type { TerminalSample } from "@/lib/data/documents";

export function TerminalFigure({ sample }: { sample: TerminalSample }) {
  return (
    <figure className="terminal-figure">
      <div className="terminal-figure-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>{sample.title}</strong>
      </div>
      <pre tabIndex={0}><code>{sample.code}</code></pre>
      <figcaption>{sample.caption}</figcaption>
    </figure>
  );
}
