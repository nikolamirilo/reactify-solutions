// Single source of truth for the docs sidebar: order, grouping, and the
// short label shown in the nav (deliberately shorter than the page's H1).
// Every other consumer (routing, prev/next, the sitemap) derives from this.

export type DocNavPage = {
  slug: string;
  label: string;
  children?: DocNavPage[];
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
// (Claude Code), and the shape is built to hold more without any change to
// the pages that read it: /docs lists every module in this array, and
// /docs/<topic> is that module's own landing page.
export const docsNav: DocTopicNav[] = [
  {
    topic: "claude",
    moduleName: "Claude Code",
    description:
      "Settings, CLAUDE.md, memory, hooks, skills, subagents, plugins, and MCP. Every way to customize Claude Code, in plain language.",
    label: "Claude Code customization",
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
        title: "Customization",
        pages: [
          { slug: "settings", label: "settings.json" },
          { slug: "claude-md", label: "CLAUDE.md" },
          { slug: "memory", label: "Memory management" },
          { slug: "hooks", label: "Hooks" },
          { slug: "skills", label: "Skills" },
          { slug: "subagents", label: "Subagents & commands" },
          { slug: "mcp", label: "MCP servers" },
          { slug: "plugins", label: "Plugins" },
          { slug: "teams", label: "Rolling out to a team" },
        ],
      },
      {
        title: "Skills Showcase",
        pages: [
          { slug: "skills-showcase", label: "Overview" },
          { slug: "showcase-orchestrator", label: "The orchestrator skill" },
          {
            slug: "showcase-definition-and-planning",
            label: "Phase 1: Definition & planning",
            children: [
              { slug: "showcase-understanding-of-idea", label: "Understanding the idea" },
              { slug: "showcase-research", label: "Research" },
              { slug: "showcase-product-definition", label: "Product definition" },
              { slug: "showcase-planning", label: "Planning" },
            ],
          },
          {
            slug: "showcase-implementation",
            label: "Phase 2: Implementation",
            children: [
              { slug: "showcase-database-implementation", label: "Database" },
              { slug: "showcase-backend-implementation", label: "Backend" },
              { slug: "showcase-frontend-implementation", label: "Frontend" },
              { slug: "showcase-integration-and-deployment", label: "Integration & deployment" },
            ],
          },
          {
            slug: "showcase-pre-launch-activities",
            label: "Phase 3: Pre-launch activities",
            children: [
              { slug: "showcase-validation-testing", label: "Validation & testing" },
              { slug: "showcase-seo", label: "SEO" },
              { slug: "showcase-accessibility", label: "Accessibility" },
              { slug: "showcase-ui-ux-polish", label: "UI/UX polish" },
            ],
          },
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
