export default function DiagramFrame({
  label,
  wide,
  children,
}: {
  label?: string;
  // Most diagrams match the 42rem text column. A handful (the opportunity
  // solution tree) are genuinely wider than a paragraph and read better
  // filling the article column, the same way a wide table already does
  // (see .handbook-table-wrap, which carries no max-w either).
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={`mb-8 overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/40 p-5 sm:p-7 ${
        wide ? "" : "max-w-[42rem]"
      }`}
    >
      {label && (
        <figcaption className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.13em] text-textFaint">
          {label}
        </figcaption>
      )}
      {children}
    </figure>
  );
}
