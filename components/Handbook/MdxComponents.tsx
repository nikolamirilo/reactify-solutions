import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/Articles/CodeBlock";
import Callout from "./Callout";
import InOneMinute from "./InOneMinute";
import CheckItWorked from "./CheckItWorked";
import FullReference from "./FullReference";
import PrecedenceDiagram from "./diagrams/PrecedenceDiagram";
import HookFlowDiagram from "./diagrams/HookFlowDiagram";
import ProgressiveDisclosureDiagram from "./diagrams/ProgressiveDisclosureDiagram";
import SubagentDiagram from "./diagrams/SubagentDiagram";
import RolloutStagesDiagram from "./diagrams/RolloutStagesDiagram";
import SkillHierarchyDiagram from "./diagrams/SkillHierarchyDiagram";
import WorkflowDiagram from "./diagrams/WorkflowDiagram";

// Markdown elements get a `.handbook-*` class from styles/index.css instead of a
// `prose` block — @tailwindcss/typography isn't installed, and the rest of
// the site already styles content this way (see any post in
// content/articles/posts/). JSX components (CodeBlock, Callout, ...) are
// available to MDX bodies directly, e.g. <Callout type="warn">...</Callout>.
export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="handbook-h1" {...props} />,
  h2: (props) => <h2 className="handbook-h2" {...props} />,
  h3: (props) => <h3 className="handbook-h3" {...props} />,
  h4: (props) => <h4 className="handbook-h4" {...props} />,
  p: (props) => <p className="handbook-p" {...props} />,
  ul: (props) => <ul className="handbook-ul" {...props} />,
  ol: (props) => <ol className="handbook-ol" {...props} />,
  li: (props) => <li className="handbook-li" {...props} />,
  a: (props) => <a className="handbook-a" {...props} />,
  strong: (props) => <strong className="handbook-strong" {...props} />,
  hr: (props) => <hr className="handbook-hr" {...props} />,
  blockquote: (props) => <blockquote className="handbook-blockquote" {...props} />,
  code: (props) => <code className="handbook-inline-code" {...props} />,
  // A fenced ```block``` (rather than the <CodeBlock> component used for
  // real examples) still needs to render legibly — this is a plain
  // fallback with no copy button or filename bar.
  pre: (props) => <pre className="handbook-pre" {...props} />,
  table: (props) => (
    <div className="handbook-table-wrap">
      <table className="handbook-table" {...props} />
    </div>
  ),
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="handbook-tr" {...props} />,
  th: (props) => <th className="handbook-th" {...props} />,
  td: (props) => <td className="handbook-td" {...props} />,

  CodeBlock,
  Callout,
  InOneMinute,
  CheckItWorked,
  FullReference,
  PrecedenceDiagram,
  HookFlowDiagram,
  ProgressiveDisclosureDiagram,
  SubagentDiagram,
  RolloutStagesDiagram,
  SkillHierarchyDiagram,
  WorkflowDiagram,
};
