// Single source of truth for the handbook sidebar: order, grouping, and the
// short label shown in the nav (deliberately shorter than the page's H1).
// Every other consumer (routing, prev/next, the sitemap) derives from this.

export type HandbookNavPage = {
  slug: string;
  label: string;
  children?: HandbookNavPage[];
};

export type HandbookNavSection = {
  title: string;
  pages: HandbookNavPage[];
};

export type HandbookTopicNav = {
  topic: string;
  handbookName: string;
  description: string;
  label: string;
  sublabel: string;
  // The landing page H1, rendered as `{lead} {highlight}.` with the
  // highlight in the accent gradient. Per handbook, because "every way you
  // can customize X" only makes sense for a tool.
  headline: { lead: string; highlight: string };
  // Optional sentence appended after `description` on the landing page.
  introSuffix?: string;
  // The closing callout on the landing page: one sentence, with the second
  // half emphasized.
  inOneSentence: { lead: string; emphasis: string };
  pages: HandbookNavSection[];
};

// Each entry here is one handbook in the /handbooks directory. There is one
// today (Claude Code), and the shape is built to hold more without any change
// to the pages that read it: /handbooks lists every handbook in this array,
// and /handbooks/<topic> is that handbook's own landing page.
export const handbooksNav: HandbookTopicNav[] = [
  {
    topic: "claude",
    handbookName: "Claude Code",
    description:
      "Settings, CLAUDE.md, memory, hooks, skills, subagents, plugins, and MCP. Every way to customize Claude Code, in plain language.",
    label: "Claude Code customization",
    sublabel: "reference",
    headline: { lead: "Every way you can customize", highlight: "Claude Code" },
    introSuffix: "We built it because we needed it ourselves.",
    inOneSentence: {
      lead: "Every one of these is a plain file, in your repository or your home directory.",
      emphasis: "Nothing here depends on being signed into anything.",
    },
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
          { slug: "subagents", label: "Subagents" },
          { slug: "commands", label: "Slash commands" },
          { slug: "workflows", label: "Workflows" },
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
  {
    topic: "discovery",
    handbookName: "Continuous Discovery",
    description:
      "Weekly customer conversations, the opportunity solution tree, and the habits that connect a business goal to what you build next. The essentials of Teresa Torres's Continuous Discovery Habits, for product teams.",
    label: "Continuous discovery habits",
    sublabel: "playbook",
    headline: { lead: "Connect customer conversations to", highlight: "what you build next" },
    inOneSentence: {
      lead: "Every habit here works at the size of one team and one week.",
      emphasis: "None of it needs a reorganization to start.",
    },
    pages: [
      {
        title: "Start here",
        pages: [
          { slug: "overview", label: "Overview" },
          { slug: "mindsets", label: "The six mindsets" },
          { slug: "product-trio", label: "The product trio" },
        ],
      },
      {
        title: "Focus on outcomes",
        pages: [{ slug: "outcomes-over-outputs", label: "Outcomes over outputs" }],
      },
      {
        title: "The opportunity space",
        pages: [
          { slug: "opportunity-solution-tree", label: "The opportunity solution tree" },
          { slug: "experience-maps", label: "Experience maps" },
          { slug: "customer-interviews", label: "Customer interviews" },
          { slug: "opportunities", label: "Mapping & prioritizing" },
        ],
      },
      {
        title: "The solution space",
        pages: [
          { slug: "ideation", label: "Generating ideas" },
          { slug: "assumptions", label: "Hidden assumptions" },
          { slug: "testing-and-measuring", label: "Testing & measuring" },
        ],
      },
      {
        title: "Reference",
        pages: [
          { slug: "decisions", label: "Making better decisions" },
          { slug: "start-small", label: "Start small" },
        ],
      },
    ],
  },
  {
    topic: "lean-startup",
    handbookName: "The Lean Startup",
    description:
      "Validated learning, the build-measure-learn loop, MVPs, metrics that are not vanity, and the three engines of growth. The essentials of Eric Ries's The Lean Startup, for anyone building something new under uncertainty.",
    label: "Lean startup method",
    sublabel: "playbook",
    headline: { lead: "Build less, learn faster, and", highlight: "know when to change course" },
    inOneSentence: {
      lead: "Every method here works on a product with no customers and no revenue yet.",
      emphasis: "Progress is measured in what you have proved, not what you have shipped.",
    },
    pages: [
      {
        title: "Start here",
        pages: [
          { slug: "overview", label: "Overview" },
          { slug: "principles", label: "The five principles" },
        ],
      },
      {
        title: "The loop",
        pages: [
          { slug: "build-measure-learn", label: "Build, measure, learn" },
          { slug: "mvp", label: "The MVP" },
          { slug: "metrics", label: "Metrics that are not lies" },
          { slug: "innovation-accounting", label: "Innovation accounting" },
          { slug: "pivot-or-persevere", label: "Pivot or persevere" },
        ],
      },
      {
        title: "Growth",
        pages: [{ slug: "engines-of-growth", label: "Engines of growth" }],
      },
      {
        title: "Practice",
        pages: [
          { slug: "root-cause", label: "Finding root causes" },
          { slug: "inside-a-company", label: "Inside an existing company" },
        ],
      },
    ],
  },
];

export function getTopicNav(topic: string): HandbookTopicNav | undefined {
  return handbooksNav.find((t) => t.topic === topic);
}
