import DiagramFrame from "./DiagramFrame";

const LEVELS = [
  {
    kind: "Business outcome",
    owner: "Leadership",
    example: "Net revenue retention up 4 points",
    tone: "primary",
  },
  {
    kind: "Product outcome",
    owner: "Your product trio",
    example: "More users reach their second saved playlist",
    tone: "green",
  },
  {
    kind: "Traction metric",
    owner: "Only when tuning a known solution",
    example: "Clicks on the new save button",
    tone: "faint",
  },
] as const;

const TONES = {
  primary: "border-primaryColor/40 bg-primaryColor/[0.08] text-primaryColor",
  green: "border-accentGreen/30 bg-accentGreen/[0.07] text-accentGreen",
  faint: "border-darkBorder bg-darkSurface text-textFaint",
} as const;

export default function OutcomeCascadeDiagram() {
  return (
    <DiagramFrame label="Three things people call a goal, only one belongs to your team">
      <div className="flex flex-col gap-2.5">
        {LEVELS.map((level, i) => (
          <div key={level.kind} className="flex flex-col gap-2.5">
            <div
              className={`rounded-xl border px-4 py-3.5 ${TONES[level.tone]}`}
              style={{ marginLeft: `${i * 8}px` }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="font-display text-[14px] font-semibold">{level.kind}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
                  {level.owner}
                </span>
              </div>
              <div className="mt-1 text-[12.5px] leading-snug text-textSecondary">
                {level.example}
              </div>
            </div>
            {i < LEVELS.length - 1 && (
              <div
                className="font-mono text-[10.5px] text-textFaint"
                style={{ marginLeft: `${i * 8 + 14}px` }}
              >
                {/* The second gap is not a measurement chain: a traction metric
                    is a narrower substitute used only while tuning, not the way
                    a product outcome is measured. */}
                {i === 0 ? "↓ measured by" : "↓ narrowed to, only while tuning"}
              </div>
            )}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
