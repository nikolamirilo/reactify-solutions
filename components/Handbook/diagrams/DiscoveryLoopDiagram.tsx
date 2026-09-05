import { LuArrowRight, LuArrowDown, LuRepeat } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const STEPS = [
  { n: "1", title: "Interview", detail: "One or two customers, every week" },
  { n: "2", title: "Map", detail: "Add what you heard to the tree" },
  { n: "3", title: "Ideate", detail: "Against one target opportunity" },
  { n: "4", title: "Test", detail: "The riskiest assumption, not the idea" },
];

export default function DiscoveryLoopDiagram() {
  return (
    <DiagramFrame label="The weekly loop, not a phase with an end date">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-2.5">
        {STEPS.map((step, i) => (
          <div
            key={step.n}
            className="flex flex-col items-center gap-2 md:flex-1 md:flex-row md:gap-2.5"
          >
            <div className="flex w-full flex-col gap-1.5 rounded-xl border border-darkBorder bg-darkElevated px-4 py-3.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10 font-mono text-[11px] font-semibold text-primaryColor">
                {step.n}
              </span>
              <div>
                <div className="font-display text-[14px] font-semibold text-white">
                  {step.title}
                </div>
                <div className="mt-0.5 text-[12px] leading-snug text-textFaint">
                  {step.detail}
                </div>
              </div>
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
      <div className="mt-4 flex items-center gap-2 border-t border-darkBorder pt-3.5 text-[12px] text-textFaint">
        <LuRepeat className="h-3.5 w-3.5 flex-shrink-0 text-primaryColor" />
        Back to step 1 next week. What you learn in step 4 changes the tree in step 2.
      </div>
    </DiagramFrame>
  );
}
