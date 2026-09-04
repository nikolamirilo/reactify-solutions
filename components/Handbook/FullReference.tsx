export default function FullReference({
  label = "Full reference",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group mb-8 max-w-[42rem] rounded-xl border border-darkBorder bg-darkSurface/40">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-mono text-[12px] uppercase tracking-[0.1em] text-textFaint">
        {label}
        <span className="text-textFaint transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="border-t border-darkBorder px-5 py-5 [&_.handbook-table-wrap]:mb-0">
        {children}
      </div>
    </details>
  );
}
