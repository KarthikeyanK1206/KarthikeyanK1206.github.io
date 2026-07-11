export function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <h2 className="case-section-heading">
      <span>{n}</span>
      {title}
    </h2>
  );
}
