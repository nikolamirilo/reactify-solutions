import DiagramFrame from "./DiagramFrame";

const ENGINES = [
  {
    name: "Sticky",
    rule: "New customers > churn",
    watch: "Churn rate",
    detail: "Growth compounds when you keep people faster than you lose them.",
    cls: "border-primaryColor/35 bg-primaryColor/[0.07] text-primaryColor",
  },
  {
    name: "Viral",
    rule: "Viral coefficient > 1",
    watch: "Invites that convert, per user",
    detail: "Each user brings more than one more. Growth is a side effect of normal use.",
    cls: "border-accentGreen/30 bg-accentGreen/[0.06] text-accentGreen",
  },
  {
    name: "Paid",
    rule: "CPA < lifetime value",
    watch: "Cost per acquisition against LTV",
    detail: "The gap between what a customer costs and what they are worth funds the next one.",
    cls: "border-starYellow/30 bg-starYellow/[0.06] text-starYellow",
  },
];

export default function EnginesOfGrowthDiagram() {
  return (
    <DiagramFrame label="Three engines, one metric each. Run one at a time.">
      <div className="grid gap-2.5 md:grid-cols-3">
        {ENGINES.map((e) => (
          <div key={e.name} className={`flex flex-col gap-2 rounded-xl border px-4 py-3.5 ${e.cls}`}>
            <div className="font-display text-[15px] font-semibold">{e.name}</div>
            <div className="rounded-md border border-darkBorder bg-darkSurface px-2.5 py-1.5 font-mono text-[11px] text-textSecondary">
              {e.rule}
            </div>
            <div className="text-[12px] leading-snug text-textSecondary">{e.detail}</div>
            <div className="mt-auto pt-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-textFaint">
                Watch
              </span>
              <div className="text-[11.5px] leading-snug text-textFaint">{e.watch}</div>
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
