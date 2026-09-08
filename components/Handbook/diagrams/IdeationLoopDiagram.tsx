import { LuArrowRight, LuArrowDown, LuRepeat } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const GENERATE = [
  { n: "1", title: "Review the opportunity", detail: "Everyone works against the same specific need" },
  { n: "2", title: "Generate alone", detail: "15 minutes, no talking, quantity over polish" },
  { n: "3", title: "Share as a group", detail: "Walk through every idea, no evaluating yet" },
  { n: "4", title: "Generate alone again", detail: "The good ones show up in this round" },
];

const NARROW = [
  { title: "Dot vote", detail: "Narrows the wall. It does not decide." },
  { title: "Require an advocate", detail: "One person argues for each survivor, ideally a different person each" },
];

export default function IdeationLoopDiagram() {
  return (
    <DiagramFrame label="Alone, together, alone again — then narrow" wide>
      <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-2">
        {GENERATE.map((step, i) => (
          <div key={step.n} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row lg:gap-2">
            <div className="flex w-full flex-col gap-1.5 rounded-xl border border-darkBorder bg-darkElevated px-3.5 py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10 font-mono text-[11px] font-semibold text-primaryColor">
                {step.n}
              </span>
              <div>
                <div className="font-display text-[13px] font-semibold text-white">{step.title}</div>
                <div className="mt-0.5 text-[11.5px] leading-snug text-textFaint">{step.detail}</div>
              </div>
            </div>
            {i < GENERATE.length - 1 && (
              <>
                <LuArrowDown className="h-4 w-4 flex-shrink-0 text-textFaint lg:hidden" />
                <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint lg:block" />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11.5px] text-textFaint">
        <LuRepeat className="h-3.5 w-3.5 flex-shrink-0 text-primaryColor" />
        Repeat rounds 2–4 while the space still feels thin.
      </div>

      <div className="mt-5 border-t border-darkBorder pt-4">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-textFaint">
          Then narrow the wall down to a few
        </span>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {NARROW.map((s) => (
            <div key={s.title} className="rounded-xl border border-accentGreen/25 bg-accentGreen/[0.06] px-3.5 py-3">
              <div className="font-display text-[13px] font-semibold text-accentGreen">{s.title}</div>
              <div className="mt-1 text-[11.5px] leading-snug text-textSecondary">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  );
}
