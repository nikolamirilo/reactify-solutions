import DiagramFrame from "./DiagramFrame";

// A single worked example rather than an abstract gauge: the two thresholds
// are the whole point of the page, so the diagram shows numbers on a line
// instead of an unlabeled bar.
export default function ThresholdGaugeDiagram() {
  return (
    <DiagramFrame label="Both numbers, written down before you run the test">
      <div className="mb-3 w-fit rounded-md border border-darkBorder bg-darkElevated px-3 py-1.5 font-mono text-[11px] text-textSecondary">
        Assumption: people will save a track for later from the preview screen
      </div>

      <div className="relative mt-8 h-2 rounded-full bg-darkElevated">
        <div className="absolute inset-y-0 left-0 w-[22%] rounded-l-full bg-error/40" />
        <div className="absolute inset-y-0 right-0 w-[30%] rounded-r-full bg-accentGreen/40" />

        <div className="absolute -top-8 left-[22%] flex -translate-x-1/2 flex-col items-center">
          <span className="rounded-md border border-error/35 bg-error/[0.1] px-2 py-1 text-[11px] font-semibold text-error">
            Fails below 4%
          </span>
          <span className="mt-1 h-3 w-px bg-error/50" />
        </div>
        <div className="absolute -top-8 left-[70%] flex -translate-x-1/2 flex-col items-center">
          <span className="rounded-md border border-accentGreen/35 bg-accentGreen/[0.1] px-2 py-1 text-[11px] font-semibold text-accentGreen">
            Passes above 10%
          </span>
          <span className="mt-1 h-3 w-px bg-accentGreen/50" />
        </div>
      </div>

      <div className="mt-4 flex justify-between text-[10px] text-textFaint">
        <span>0% saved</span>
        <span className="text-center">4–10%, weak signal — run it again differently</span>
        <span>20% saved</span>
      </div>
    </DiagramFrame>
  );
}
