import DiagramFrame from "./DiagramFrame";

// The three bands from TypeSafe's confidence guide, drawn on one line so
// the reader sees that the thresholds are a policy you choose in code.
export default function JevConfidenceDiagram() {
  return (
    <DiagramFrame label="Confidence is a routing signal, not just a number">
      <div className="flex h-9 overflow-hidden rounded-lg border border-darkBorder text-[11.5px] font-semibold">
        <div className="flex w-1/2 items-center justify-center bg-error/15 text-error">Ask a human</div>
        <div className="flex w-[40%] items-center justify-center bg-starYellow/15 text-starYellow">Confirm first</div>
        <div className="flex w-[10%] items-center justify-center bg-accentGreen/20 text-accentGreen">Auto</div>
      </div>
      <div className="relative mt-1.5 h-4 font-mono text-[10.5px] text-textFaint">
        <span className="absolute left-0">0</span>
        <span className="absolute left-1/2 -translate-x-1/2">0.5</span>
        <span className="absolute left-[90%] -translate-x-1/2">0.9</span>
        <span className="absolute right-0">1</span>
      </div>
      <div className="mt-4 grid gap-2 text-[12px] leading-relaxed text-textFaint sm:grid-cols-3">
        <div className="rounded-lg border border-darkBorder px-3 py-2">
          <span className="font-semibold text-textSecondary">Below 0.5.</span> The options look alike to the model. Escalate, do not act.
        </div>
        <div className="rounded-lg border border-darkBorder px-3 py-2">
          <span className="font-semibold text-textSecondary">0.5 to 0.9.</span> Act, but ask the user or flag it for review.
        </div>
        <div className="rounded-lg border border-darkBorder px-3 py-2">
          <span className="font-semibold text-textSecondary">Above 0.9.</span> Safe to run on its own, for low-risk actions.
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-dashed border-darkBorder px-3.5 py-2.5 text-[12px] leading-relaxed text-textFaint">
        Move the lines by risk. Showing an account balance can run at 0.5. Refunding money should need more.
      </div>
    </DiagramFrame>
  );
}
