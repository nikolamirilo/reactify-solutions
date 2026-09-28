import { LuArrowDown } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

// The four loop types from Anthropic's "Getting started with loops" post, in
// the order the post walks them: each one hands Claude one more piece of the
// job. The left edge brightens as you step further out of the loop. Edge
// classes are written out in full so Tailwind's scanner can find them.
const LOOPS = [
  {
    n: "1",
    name: "Turn-based",
    uses: ["a prompt", "a verification skill"],
    handOff: "The check",
    meaning: "Claude verifies its own work before it answers",
    edge: "border-l-primaryColor/25",
  },
  {
    n: "2",
    name: "Goal-based",
    uses: ["/goal"],
    handOff: "The stop condition",
    meaning: "A second model decides when your goal is reached",
    edge: "border-l-primaryColor/50",
  },
  {
    n: "3",
    name: "Time-based",
    uses: ["/loop", "/schedule"],
    handOff: "The trigger",
    meaning: "A clock starts each run, not you",
    edge: "border-l-primaryColor/75",
  },
  {
    n: "4",
    name: "Proactive",
    uses: ["/schedule", "/goal", "skills", "workflows"],
    handOff: "The prompt",
    meaning: "New work gets picked up with no one watching",
    edge: "border-l-primaryColor",
  },
];

export default function LoopLadderDiagram() {
  return (
    <DiagramFrame label="Four loops, one more hand-off each">
      <div className="flex flex-col">
        {LOOPS.map((loop, i) => (
          <div key={loop.n} className="flex flex-col">
            <div
              className={`flex flex-col gap-3 rounded-xl border border-l-2 border-darkBorder ${loop.edge} bg-darkElevated px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10 font-mono text-[11px] font-semibold text-primaryColor">
                    {loop.n}
                  </span>
                  <span className="font-display text-[14px] font-semibold text-white">{loop.name}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {loop.uses.map((use) => (
                    <span
                      key={use}
                      className="rounded-md border border-darkBorder bg-darkSurface/60 px-1.5 py-0.5 font-mono text-[11px] text-textSecondary"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sm:w-[52%] sm:flex-shrink-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-textFaint">You hand off</div>
                <div className="mt-0.5 font-display text-[13.5px] font-semibold text-primaryColor">{loop.handOff}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-textFaint">{loop.meaning}</div>
              </div>
            </div>
            {i < LOOPS.length - 1 && (
              <div className="flex py-1 pl-[23px]">
                <LuArrowDown className="h-3.5 w-3.5 text-textFaint" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-darkBorder pt-3.5 text-[12px] leading-relaxed text-textFaint">
        Each step down hands Claude one more piece of your job. Start with the simplest one that works.
      </div>
    </DiagramFrame>
  );
}
