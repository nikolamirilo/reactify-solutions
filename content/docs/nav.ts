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
  label: string;
  sublabel: string;
  pages: DocNavSection[];
};

export const docsNav: DocTopicNav[] = [
  {
    topic: "claude",
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
