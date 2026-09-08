import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const CHAIN = [
  { title: "Weekly interviews", detail: "Start here, this week", start: true },
  { title: "Opportunities accumulate", detail: "Needs and pain points, in customer language" },
  { title: "A tree forms", detail: "Structure to hold and compare what you heard" },
  { title: "Prototypes get pulled", detail: "You want to test ideas quickly against it" },
  { title: "Decisions cite customers", detail: "\"What Maya said last Tuesday\" enters the room" },
];

export default function KeystoneHabitDiagram() {
  return (
    <DiagramFrame label="Pull one thread and the rest follows" wide>
      <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-2">
        {CHAIN.map((step, i) => (
          <div key={step.title} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row lg:gap-2">
            <div
              className={`flex w-full flex-col gap-1 rounded-xl border px-3.5 py-3 ${
                step.start
                  ? "border-primaryColor/50 bg-primaryColor/[0.10]"
                  : "border-darkBorder bg-darkElevated"
              }`}
            >
              {step.start && (
                <span className="w-fit rounded border border-primaryColor/40 px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-[0.08em] text-primaryColor">
                  start here
                </span>
              )}
              <div className={`font-display text-[13px] font-semibold ${step.start ? "text-primaryColor" : "text-white"}`}>
                {step.title}
              </div>
              <div className="text-[11.5px] leading-snug text-textFaint">{step.detail}</div>
            </div>
            {i < CHAIN.length - 1 && (
              <>
                <LuArrowDown className="h-4 w-4 flex-shrink-0 text-textFaint lg:hidden" />
                <LuArrowRight className="hidden h-4 w-4 flex-shrink-0 text-textFaint lg:block" />
              </>
            )}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
