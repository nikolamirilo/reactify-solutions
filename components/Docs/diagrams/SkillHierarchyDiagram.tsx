import DiagramFrame from "./DiagramFrame";

type Phase = { label: string; sub: string[] };

const PHASES: Phase[] = [
  {
    label: "definition-and-planning",
    sub: ["understanding-of-idea", "research", "product-definition", "planning"],
  },
  {
    label: "implementation",
    sub: [
      "database-implementation",
      "backend-implementation",
      "frontend-implementation",
      "integration-and-deployment",
    ],
  },
  {
    label: "pre-launch-activities",
    sub: ["validation-and-testing", "seo", "accessibility", "ui-ux-polish"],
  },
];

export default function SkillHierarchyDiagram() {
  return (
    <DiagramFrame label="develop-new-digital-product, three phases, four sub-skills each">
      <div className="flex flex-col items-start gap-3">
        <div className="rounded-lg border border-primaryColor/40 bg-primaryColor/10 px-3.5 py-2 font-mono text-[12.5px] text-primaryColor">
          /develop-new-digital-product
        </div>
        <div className="ml-2 flex w-full flex-col gap-3 border-l border-darkBorder pl-4 sm:ml-3 sm:pl-5">
          {PHASES.map((phase) => (
            <div key={phase.label} className="flex flex-col gap-2">
              <div className="w-fit rounded-md border border-darkBorder bg-darkElevated px-3 py-1.5 font-mono text-[12px] text-textSecondary">
                /{phase.label}
              </div>
              <div className="ml-2 flex flex-col gap-1.5 border-l border-darkBorder/70 pl-4 sm:ml-3 sm:pl-5">
                {phase.sub.map((s) => (
                  <div
                    key={s}
                    className="w-fit rounded-md border border-darkBorder/70 bg-darkSurface px-2.5 py-1 font-mono text-[11px] text-textFaint"
                  >
                    /{s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  );
}
