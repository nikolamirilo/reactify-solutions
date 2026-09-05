import DiagramFrame from "./DiagramFrame";

// Same three months read two ways. The totals climb while the funnel barely
// moves, which is the point: a rising total can hide a product that is not
// getting better.
const STAGES = ["Signed up", "Activated", "Subscribed", "Still active at 30 days"];

const COHORTS = [
  { month: "January", total: "2,400 users", pct: [100, 42, 12, 8] },
  { month: "February", total: "5,100 users", pct: [100, 43, 13, 8] },
  { month: "March", total: "8,900 users", pct: [100, 44, 12, 9] },
];

export default function CohortAnalysisDiagram() {
  return (
    <DiagramFrame label="Cohort analysis, three months of signups">
      <div className="overflow-x-auto">
        <div className="min-w-[480px]">
          <div className="mb-2 grid grid-cols-[104px_repeat(4,1fr)] gap-2 font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-textFaint">
            <span />
            {STAGES.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>

          {COHORTS.map((c) => (
            <div key={c.month} className="mb-2 grid grid-cols-[104px_repeat(4,1fr)] items-stretch gap-2">
              <div className="flex flex-col justify-center">
                <span className="text-[12px] font-semibold text-white">{c.month}</span>
                <span className="font-mono text-[10px] text-textFaint">{c.total}</span>
              </div>
              {c.pct.map((v, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center rounded-lg border border-darkBorder bg-darkElevated px-2.5 py-2"
                >
                  <span className="font-mono text-[13px] font-semibold text-textSecondary">
                    {v}%
                  </span>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-darkSurface">
                    <div
                      className="h-full rounded-full bg-primaryColor/60"
                      style={{ width: `${v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 border-t border-darkBorder pt-3.5 sm:grid-cols-2">
        <div className="rounded-lg border border-error/25 bg-error/[0.06] px-3 py-2.5">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-error">
            The vanity read
          </div>
          <div className="mt-1 text-[12px] leading-snug text-textSecondary">
            Monthly signups went from 2,400 to 8,900, so registered users only ever climbs. The line goes up and to the right.
          </div>
        </div>
        <div className="rounded-lg border border-accentGreen/25 bg-accentGreen/[0.06] px-3 py-2.5">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-accentGreen">
            The cohort read
          </div>
          <div className="mt-1 text-[12px] leading-snug text-textSecondary">
            Every cohort behaves the same. Marketing got bigger. The product did not get better.
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
