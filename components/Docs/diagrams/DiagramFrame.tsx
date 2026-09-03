export default function DiagramFrame({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mb-8 max-w-[42rem] overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/40 p-5 sm:p-7">
      {label && (
        <figcaption className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.13em] text-textFaint">
          {label}
        </figcaption>
      )}
      {children}
    </figure>
  );
}
