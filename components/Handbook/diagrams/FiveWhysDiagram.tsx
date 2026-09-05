import { LuCornerDownRight } from "react-icons/lu";
import DiagramFrame from "./DiagramFrame";

const CHAIN = [
  { q: "Why did the new release break checkout?", a: "A server config was wrong." },
  { q: "Why was it wrong?", a: "One engineer changed it by hand." },
  { q: "Why by hand?", a: "There is no script for that change." },
  { q: "Why no script?", a: "The person who set it up has left." },
  { q: "Why did nobody notice?", a: "Nobody was trained on that system." },
];

export default function FiveWhysDiagram() {
  return (
    <DiagramFrame label="Five whys, from symptom to a human cause">
      <div className="flex flex-col gap-2">
        <div className="rounded-lg border border-error/30 bg-error/[0.07] px-3.5 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-error">
            Symptom
          </span>
          <div className="text-[13px] font-semibold text-textSecondary">
            Customers could not check out for two hours.
          </div>
        </div>

        {CHAIN.map((step, i) => (
          <div key={step.q} style={{ marginLeft: `${i * 10}px` }} className="flex items-start gap-2">
            <LuCornerDownRight className="mt-1.5 h-3.5 w-3.5 flex-shrink-0 text-textFaint" />
            <div className="min-w-0 flex-1 rounded-lg border border-darkBorder bg-darkElevated px-3 py-2">
              <div className="text-[12px] text-textFaint">{step.q}</div>
              <div className="text-[12.5px] text-textSecondary">{step.a}</div>
            </div>
          </div>
        ))}

        <div className="mt-1 rounded-lg border border-accentGreen/30 bg-accentGreen/[0.06] px-3.5 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accentGreen">
            Root cause
          </span>
          <div className="text-[13px] font-semibold text-textSecondary">
            A training gap, not a bad config.
          </div>
          <div className="mt-1 text-[12px] leading-snug text-textFaint">
            Five technical answers would have produced five patches. The fifth answer is the one
            that stops it happening again.
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
