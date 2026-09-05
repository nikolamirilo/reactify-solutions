import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const STEPS = [
  { n: "1", title: "Build", output: "An MVP", detail: "The smallest thing that tests the idea" },
  { n: "2", title: "Measure", output: "Data", detail: "Split tests and cohorts, not totals" },
  { n: "3", title: "Learn", output: "A decision", detail: "Pivot, or keep going" },
];

export default function BuildMeasureLearnDiagram() {
  return (
    <DiagramFrame label="Execute forwards, plan backwards">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch md:gap-2.5">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className="flex flex-col items-center gap-2 md:flex-1 md:flex-row md:gap-2.5"
          >
            <div className="flex w-full flex-col gap-1.5 rounded-xl border border-darkBorder bg-darkElevated px-4 py-3.5 md:h-full">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10 font-mono text-[11px] font-semibold text-primaryColor">
                  {s.n}
                </span>
                <span className="font-display text-[14px] font-semibold text-white">{s.title}</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-primaryColor">
                {s.output}
              </div>
              <div className="text-[12px] leading-snug text-textFaint">{s.detail}</div>
            </div>
            {i < STEPS.length - 1 && (
              <>
                <LuArrowDown className="h-4 w-4 flex-shrink-0 text-textFaint md:hidden" />
                <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint md:block" />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-darkBorder pt-3.5">
        <div className="text-[12px] leading-relaxed text-textFaint">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-textSecondary">
            Plan in reverse ·{" "}
          </span>
          decide what you need to learn, work out what to measure to learn it, then build only
          enough to get that measurement.
        </div>
        <div className="text-[12px] leading-relaxed text-textFaint">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-textSecondary">
            The goal ·{" "}
          </span>
          shorten total time through the loop. That is the number to improve, not the speed of any
          one step.
        </div>
      </div>
    </DiagramFrame>
  );
}
