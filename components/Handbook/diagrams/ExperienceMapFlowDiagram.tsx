import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const STEPS = [
  {
    n: "1",
    title: "Alone",
    detail: "Each person draws the customer experience from memory. No talking.",
    faces: 3,
  },
  {
    n: "2",
    title: "Out loud",
    detail: "Take turns walking through your own drawing. Ask about the differences.",
    faces: 3,
  },
  {
    n: "3",
    title: "Together",
    detail: "Merge into one map. Same moment, same node. Arrows for what follows what.",
    faces: 1,
  },
];

export default function ExperienceMapFlowDiagram() {
  return (
    <DiagramFrame label="Three steps, about 90 minutes">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-stretch sm:gap-2.5">
        {STEPS.map((step, i) => (
          <div
            key={step.n}
            className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row sm:gap-2.5"
          >
            <div className="flex w-full flex-col gap-2.5 rounded-xl border border-darkBorder bg-darkElevated px-4 py-3.5 sm:h-full">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10 font-mono text-[11px] font-semibold text-primaryColor">
                  {step.n}
                </span>
                <span className="font-display text-[14px] font-semibold text-white">
                  {step.title}
                </span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: step.faces }).map((_, k) => (
                  <span
                    key={k}
                    className={`h-7 flex-1 rounded border ${
                      step.faces === 1
                        ? "border-accentGreen/35 bg-accentGreen/10"
                        : "border-darkBorderStrong bg-darkSurface"
                    }`}
                  />
                ))}
              </div>
              <div className="text-[12px] leading-snug text-textFaint">{step.detail}</div>
            </div>
            {i < STEPS.length - 1 && (
              <>
                <LuArrowDown className="h-4 w-4 flex-shrink-0 text-textFaint sm:hidden" />
                <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint sm:block" />
              </>
            )}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
