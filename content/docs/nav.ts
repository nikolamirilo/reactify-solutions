// Single source of truth for the docs sidebar: order, grouping, and the
// short label shown in the nav (deliberately shorter than the page's H1).
// Every other consumer (routing, prev/next, the sitemap) derives from this.

export type DocNavPage = {
  slug: string;
  label: string;
};

export type DocNavSection = {
  title: string;
  pages: DocNavPage[];
};

export type DocTopicNav = {
  topic: string;
  moduleName: string;
  description: string;
  label: string;
  sublabel: string;
  pages: DocNavSection[];
};

// Each entry here is a module on the /docs directory. There is one today
// (Claude), and the shape is built to hold more without any change to the
// pages that read it: /docs lists every module in this array, and
// /docs/<topic> is that module's own landing page.
export const docsNav: DocTopicNav[] = [
  {
    topic: "claude",
    moduleName: "Claude",
    description:
      "Settings, CLAUDE.md, hooks, skills, subagents, plugins, and MCP. Every way to customize Claude Code and the Claude apps, in plain language.",
    label: "Claude customization",
    sublabel: "reference",
    pages: [
      {
        title: "Start here",
        pages: [
          { slug: "overview", label: "Overview" },
          { slug: "quickstart", label: "Set up in 20 minutes" },
          { slug: "choose", label: "Which one should I use?" },
          { slug: "where-things-live", label: "Where everything lives" },
        ],
      },
      {
        title: "Claude Code",
        pages: [
          { slug: "settings", label: "settings.json" },
          { slug: "claude-md", label: "CLAUDE.md & memory" },
          { slug: "hooks", label: "Hooks" },
          { slug: "skills", label: "Skills" },
          { slug: "subagents", label: "Subagents & commands" },
          { slug: "mcp", label: "MCP servers" },
          { slug: "plugins", label: "Plugins" },
        ],
      },
      {
        title: "Claude apps",
        pages: [
          { slug: "apps", label: "Claude.ai, Desktop & Cowork" },
          { slug: "teams", label: "Rolling out to a team" },
        ],
      },
      {
        title: "Reference",
        pages: [{ slug: "mistakes", label: "Common mistakes" }],
      },
    ],
  },
];

export function getTopicNav(topic: string): DocTopicNav | undefined {
  return docsNav.find((t) => t.topic === topic);
}
