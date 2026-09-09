import { LuLock, LuLockOpen } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const DOORS = [
  {
    icon: LuLock,
    name: "One-way door",
    level: "Level 1",
    detail: "Pricing model, data architecture, a public commitment, deleting user data",
    risk: "The real risk is moving too fast",
    pace: "Slowly, with evidence, with more people",
    cls: "border-error/30 bg-error/[0.06] text-error",
  },
  {
    icon: LuLockOpen,
    name: "Two-way door",
    level: "Level 2",
    detail: "Which opportunity to target, which idea to prototype, how to word a test",
    risk: "The real risk is moving too slowly",
    pace: "Quickly, then learn from the result",
    cls: "border-accentGreen/30 bg-accentGreen/[0.06] text-accentGreen",
  },
];

export default function DecisionDoorsDiagram() {
  return (
    <DiagramFrame label="Sort every decision by whether you can walk it back">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {DOORS.map((d) => (
          <div key={d.name} className={`flex flex-col gap-2.5 rounded-xl border px-4 py-3.5 ${d.cls}`}>
            <div className="flex items-center gap-2">
              <d.icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-display text-[14px] font-semibold">{d.name}</span>
              <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.1em] opacity-70">
                {d.level}
              </span>
            </div>
            <div className="text-[12px] leading-snug text-textSecondary">{d.detail}</div>
            <div className="mt-auto flex flex-col gap-1.5 border-t border-current/15 pt-2.5">
              <div className="text-[11.5px] font-medium">{d.risk}</div>
              <div className="text-[11px] leading-snug text-textFaint">Decide: {d.pace}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11.5px] leading-snug text-textFaint">
        Choosing a target opportunity is a two-way door: wrong today, cheaply reopened next week.
      </p>
    </DiagramFrame>
  );
}
