import DiagramFrame from "./DiagramFrame";

const PATTERNS = [
  {
    name: "Video",
    build: "A three-minute demo of a product that does not exist",
    proves: "Do people want this enough to sign up?",
    example: "Dropbox",
  },
  {
    name: "Concierge",
    build: "Deliver the service by hand, for a handful of customers",
    proves: "What do they actually need, before we automate it?",
    example: "Food on the Table",
  },
  {
    name: "Several small ones",
    build: "A run of tiny experiments instead of one big bet",
    proves: "Which direction is worth building?",
    example: "Aardvark",
  },
];

export default function MvpPatternsDiagram() {
  return (
    <DiagramFrame label="Three ways to get an answer without building the product">
      <div className="grid gap-2.5 md:grid-cols-3">
        {PATTERNS.map((p) => (
          <div
            key={p.name}
            className="flex flex-col gap-2 rounded-xl border border-darkBorder bg-darkElevated px-4 py-3.5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-[14px] font-semibold text-white">{p.name}</span>
              <span className="font-mono text-[10px] text-textFaint">{p.example}</span>
            </div>
            <div className="text-[12px] leading-snug text-textSecondary">{p.build}</div>
            <div className="mt-auto rounded-md border border-primaryColor/25 bg-primaryColor/[0.06] px-2.5 py-1.5 text-[11.5px] leading-snug text-primaryColor">
              {p.proves}
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
