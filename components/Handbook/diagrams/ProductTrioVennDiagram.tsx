import DiagramFrame from "./DiagramFrame";

const ROLES = [
  {
    name: "Product",
    question: "Should we build this at all?",
    pos: "left-0 top-0",
    cls: "border-primaryColor/45 bg-primaryColor/[0.10]",
    text: "text-primaryColor",
  },
  {
    name: "Design",
    question: "Will anyone understand how to use it?",
    pos: "right-0 top-0",
    cls: "border-accentGreen/45 bg-accentGreen/[0.10]",
    text: "text-accentGreen",
  },
  {
    name: "Engineering",
    question: "What could we try this week instead?",
    pos: "bottom-0 left-1/2 -translate-x-1/2",
    cls: "border-starYellow/45 bg-starYellow/[0.10]",
    text: "text-starYellow",
  },
];

// Three overlapping circles, each offset so all three edges cross near the
// center — the labels sit outside the circles (rather than crammed inside
// the overlap) because the discipline names and the compact space both
// need room the intersection area does not have.
export default function ProductTrioVennDiagram() {
  return (
    <DiagramFrame label="Three disciplines, the same decisions">
      <div className="relative mx-auto h-[230px] w-[260px] sm:h-[250px] sm:w-[290px]">
        {ROLES.map((r) => (
          <div
            key={r.name}
            className={`absolute ${r.pos} h-[160px] w-[160px] rounded-full border sm:h-[180px] sm:w-[180px] ${r.cls}`}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-white">
            Discovery
            <br />
            decisions
          </span>
        </div>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {ROLES.map((r) => (
          <div key={r.name} className="text-center sm:text-left">
            <div className={`font-display text-[13px] font-semibold ${r.text}`}>{r.name}</div>
            <div className="text-[11px] leading-snug text-textFaint">{r.question}</div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
