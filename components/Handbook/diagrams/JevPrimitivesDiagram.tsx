import DiagramFrame from "./DiagramFrame";

// Each card shows the question, what you define, and the shape of the
// answer, with a tiny bar chart so the difference between "pick one",
// "a place on a scale" and "one probability" is visible at a glance.
function Bars({ values, highlight }: { values: { label: string; p: number }[]; highlight: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      {values.map((v, i) => (
        <div key={v.label} className="flex items-center gap-2">
          <span className="w-16 flex-shrink-0 truncate font-mono text-[10.5px] text-textFaint">{v.label}</span>
          <div className="h-1.5 flex-1 rounded-full bg-darkSurface">
            <div
              className={`h-full rounded-full ${i === highlight ? "bg-accentGreen/70" : "bg-textFaint/40"}`}
              style={{ width: `${Math.max(v.p * 100, 2)}%` }}
            />
          </div>
          <span className="w-8 flex-shrink-0 text-right font-mono text-[10.5px] text-textFaint">{v.p.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

function Card({
  name,
  question,
  define,
  children,
  returns,
}: {
  name: string;
  question: string;
  define: string;
  children: React.ReactNode;
  returns: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-xl border border-darkBorder bg-darkElevated px-4 py-4">
      <div>
        <div className="font-display text-[14px] font-semibold text-white">{name}</div>
        <div className="text-[12px] leading-snug text-textSecondary">{question}</div>
      </div>
      <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-textFaint">{define}</div>
      {children}
      <div className="mt-auto border-t border-darkBorder pt-2 font-mono text-[11px] text-accentGreen">{returns}</div>
    </div>
  );
}

export default function JevPrimitivesDiagram() {
  return (
    <DiagramFrame label="The three question types" wide>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Card name="Choice" question="Which team owns this?" define="up to 255 options" returns="choice, probabilities, confidence">
          <Bars
            highlight={0}
            values={[
              { label: "billing", p: 0.91 },
              { label: "technical", p: 0.07 },
              { label: "account", p: 0.02 },
            ]}
          />
        </Card>
        <Card name="Score" question="How severe is it?" define="2 to 10 ordered levels" returns="score, probabilities, legend, confidence">
          <div className="relative mt-1 h-1.5 rounded-full bg-darkSurface">
            <div className="absolute inset-y-0 left-0 w-[47.7%] rounded-full bg-accentGreen/70" />
            <div className="absolute -top-6 left-[47.7%] -translate-x-1/2 rounded-md border border-accentGreen/35 bg-accentGreen/[0.1] px-1.5 py-0.5 font-mono text-[10.5px] text-accentGreen">
              1.43
            </div>
          </div>
          <div className="flex justify-between font-mono text-[10.5px] text-textFaint">
            <span>0 cosmetic</span>
            <span>1</span>
            <span>2</span>
            <span>3 outage</span>
          </div>
        </Card>
        <Card name="Noul" question="Did the customer ask for a refund?" define="just a statement" returns="noul (0 to 1)">
          <div className="relative mt-1 h-1.5 rounded-full bg-darkSurface">
            <div className="absolute inset-y-0 left-0 w-[97%] rounded-full bg-accentGreen/70" />
          </div>
          <div className="flex justify-between font-mono text-[10.5px] text-textFaint">
            <span>0 no</span>
            <span>0.5 unsure</span>
            <span className="text-accentGreen">0.97</span>
          </div>
        </Card>
      </div>
    </DiagramFrame>
  );
}
