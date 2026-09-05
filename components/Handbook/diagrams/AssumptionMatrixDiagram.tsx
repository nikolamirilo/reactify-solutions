import DiagramFrame from "./DiagramFrame";

// Row labels sit in their own grid column rather than as a rotated axis
// caption: vertical writing mode turns arrow glyphs 90 degrees so they point
// the wrong way, and a rotated caption runs taller than the grid it labels.
const ROWS = [
  {
    label: "Important",
    cells: [
      {
        title: "Test these first",
        detail: "You are guessing, and it matters",
        cls: "border-error/35 bg-error/[0.07] text-error",
      },
      {
        title: "Already known",
        detail: "You have evidence, and it matters",
        cls: "border-accentGreen/30 bg-accentGreen/[0.06] text-accentGreen",
      },
    ],
  },
  {
    label: "Not important",
    cells: [
      {
        title: "Ignore for now",
        detail: "You are guessing, and you can absorb being wrong",
        cls: "border-darkBorder bg-darkSurface text-textFaint",
      },
      {
        title: "Nothing to do",
        detail: "You have evidence, and it changes little",
        cls: "border-darkBorder bg-darkSurface text-textFaint",
      },
    ],
  },
];

const COLS = "grid grid-cols-[84px_1fr_1fr] gap-2.5";

export default function AssumptionMatrixDiagram() {
  return (
    <DiagramFrame label="Assumption mapping, two questions per assumption">
      <div className="overflow-x-auto">
        <div className="min-w-[430px]">
          <div
            className={`${COLS} mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-textFaint`}
          >
            <span />
            <span>Weak evidence</span>
            <span>Strong evidence</span>
          </div>
          {ROWS.map((row) => (
            <div key={row.label} className={`${COLS} mb-2.5`}>
              <div className="flex items-center font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-textFaint">
                {row.label}
              </div>
              {row.cells.map((cell) => (
                <div key={cell.title} className={`rounded-xl border px-3.5 py-3 ${cell.cls}`}>
                  <div className="font-display text-[13px] font-semibold">{cell.title}</div>
                  <div className="mt-1 text-[11.5px] leading-snug text-textSecondary">
                    {cell.detail}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  );
}
