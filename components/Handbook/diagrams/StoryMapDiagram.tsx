import DiagramFrame from "./DiagramFrame";

const COLUMNS = [
  {
    action: "Opens a shared link",
    assumptions: [
      { text: "They open it on a phone", kind: "usability" },
      { text: "They do not need an account first", kind: "desirability" },
    ],
  },
  {
    action: "Hears a 30-second preview",
    assumptions: [
      { text: "30 seconds is long enough to judge", kind: "desirability" },
      { text: "We can license previews this long", kind: "viability" },
    ],
  },
  {
    action: "Saves it for later",
    assumptions: [
      { text: "One tap is discoverable", kind: "usability" },
      { text: "Saves sync before they close the app", kind: "feasibility" },
    ],
  },
];

const KIND_COLORS: Record<string, string> = {
  desirability: "border-primaryColor/30 bg-primaryColor/[0.07] text-primaryColor",
  viability: "border-starYellow/30 bg-starYellow/[0.07] text-starYellow",
  feasibility: "border-accentGreen/30 bg-accentGreen/[0.07] text-accentGreen",
  usability: "border-darkBorderStrong bg-darkSurface text-textSecondary",
};

export default function StoryMapDiagram() {
  return (
    <DiagramFrame label="One actor, three actions, the assumptions hiding under each">
      <div className="mb-3 w-fit rounded-md border border-darkBorder bg-darkElevated px-3 py-1.5 font-mono text-[11px] text-textSecondary">
        Actor: a listener who was sent a link by a friend
      </div>
      <div className="overflow-x-auto">
        <div className="flex min-w-[520px] gap-2.5">
          {COLUMNS.map((col, i) => (
            <div key={col.action} className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-darkBorder bg-darkElevated px-3 py-2">
                <span className="font-mono text-[10px] text-textFaint">{i + 1}</span>
                <span className="text-[12px] font-semibold text-white">{col.action}</span>
              </div>
              {col.assumptions.map((a) => (
                <div
                  key={a.text}
                  className={`rounded-md border px-2.5 py-1.5 text-[11px] leading-snug ${KIND_COLORS[a.kind]}`}
                >
                  {a.text}
                  <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.1em] opacity-60">
                    {a.kind}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  );
}
