import DiagramFrame from "./DiagramFrame";

const MINDSETS = [
  { name: "Outcome-oriented", check: "Can name the number without opening a document", hard: true },
  { name: "Customer-centric", check: "Can quote a customer from this month, in their words", hard: false },
  { name: "Collaborative", check: "An engineer has changed a product decision, recently", hard: false },
  { name: "Visual", check: "An artifact someone outside the team could point at and question", hard: false },
  { name: "Experimental", check: "Killed one of your own ideas in the last quarter", hard: false },
  { name: "Continuous", check: "Talked to a customer last week, and the week before", hard: true },
];

export default function MindsetGridDiagram() {
  return (
    <DiagramFrame label="Six mindsets, one observable habit each">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {MINDSETS.map((m) => (
          <div
            key={m.name}
            className={`flex flex-col gap-1.5 rounded-xl border px-3.5 py-3 ${
              m.hard
                ? "border-primaryColor/35 bg-primaryColor/[0.07]"
                : "border-darkBorder bg-darkElevated"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`font-display text-[13.5px] font-semibold ${m.hard ? "text-primaryColor" : "text-white"}`}
              >
                {m.name}
              </span>
              {m.hard && (
                <span className="rounded border border-primaryColor/40 px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-[0.08em] text-primaryColor">
                  hardest
                </span>
              )}
            </div>
            <div className="text-[11.5px] leading-snug text-textFaint">
              You hold it if: {m.check}
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
