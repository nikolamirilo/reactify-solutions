import DiagramFrame from "./DiagramFrame";

// Fishbone drawn as columns feeding one effect box. A literal angled-spine
// drawing does not survive a narrow screen, and the useful part is the
// grouping of causes, not the picture of a fish.
const BONES = [
  { group: "People", causes: ["Nobody trained on the system", "On-call rotation had a gap"] },
  { group: "Process", causes: ["No review step for config", "Deploy checklist not followed"] },
  { group: "Tooling", causes: ["No script for the change", "No alert on checkout errors"] },
  { group: "Environment", causes: ["Staging differs from production", "Release ran late on a Friday"] },
];

export default function IshikawaDiagram() {
  return (
    <DiagramFrame label="Ishikawa, the same outage grouped by kind of cause">
      <div className="grid gap-2.5 sm:grid-cols-2 2xl:grid-cols-4">
        {BONES.map((b) => (
          <div key={b.group} className="flex flex-col gap-1.5">
            <div className="rounded-md border border-darkBorderStrong bg-darkElevated px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-textSecondary">
              {b.group}
            </div>
            {b.causes.map((c) => (
              <div
                key={c}
                className="rounded-md border border-darkBorder/70 bg-darkSurface px-2.5 py-1.5 text-[11.5px] leading-snug text-textFaint"
              >
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="hidden h-px flex-1 bg-darkBorder sm:block" />
        <div className="rounded-lg border border-error/30 bg-error/[0.07] px-3.5 py-2 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-error">Effect</span>
          <div className="text-[12.5px] font-semibold text-textSecondary">
            Checkout down for two hours
          </div>
        </div>
        <span className="hidden h-px flex-1 bg-darkBorder sm:block" />
      </div>

      <div className="mt-3 border-t border-darkBorder pt-3 text-[12px] leading-relaxed text-textFaint">
        Five whys follows one chain. This spreads the same outage across every kind of cause at
        once, which is useful when the chain has more than one branch.
      </div>
    </DiagramFrame>
  );
}
