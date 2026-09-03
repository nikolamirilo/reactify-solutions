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

// Markdown elements get a `.docs-*` class from styles/index.css instead of a
// `prose` block — @tailwindcss/typography isn't installed, and the rest of
// the site already styles content this way (see any post in
// content/articles/posts/). JSX components (CodeBlock, Callout, ...) are
// available to MDX bodies directly, e.g. <Callout type="warn">...</Callout>.
export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="docs-h1" {...props} />,
  h2: (props) => <h2 className="docs-h2" {...props} />,
  h3: (props) => <h3 className="docs-h3" {...props} />,
  h4: (props) => <h4 className="docs-h4" {...props} />,
  p: (props) => <p className="docs-p" {...props} />,
  ul: (props) => <ul className="docs-ul" {...props} />,
  ol: (props) => <ol className="docs-ol" {...props} />,
  li: (props) => <li className="docs-li" {...props} />,
  a: (props) => <a className="docs-a" {...props} />,
  strong: (props) => <strong className="docs-strong" {...props} />,
  hr: (props) => <hr className="docs-hr" {...props} />,
  blockquote: (props) => <blockquote className="docs-blockquote" {...props} />,
  code: (props) => <code className="docs-inline-code" {...props} />,
  // A fenced ```block``` (rather than the <CodeBlock> component used for
  // real examples) still needs to render legibly — this is a plain
  // fallback with no copy button or filename bar.
  pre: (props) => <pre className="docs-pre" {...props} />,
  table: (props) => (
    <div className="docs-table-wrap">
      <table className="docs-table" {...props} />
    </div>
  ),
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="docs-tr" {...props} />,
  th: (props) => <th className="docs-th" {...props} />,
  td: (props) => <td className="docs-td" {...props} />,

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
