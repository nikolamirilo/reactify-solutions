import { Article } from "@/types";
import QuicktalogBuildingAiCatalogPost, {
  meta as quicktalogBuildingAiCatalogMeta,
} from "./posts/quicktalog-building-ai-catalog";
import UnbgBrowserBasedAiBackgroundRemovalPost, {
  meta as unbgBrowserBasedAiBackgroundRemovalMeta,
} from "./posts/unbg-browser-based-ai-background-removal";
import RagNextjsLangchainVercelAiSdkPost, {
  meta as ragNextjsLangchainVercelAiSdkMeta,
} from "./posts/rag-nextjs-langchain-vercel-ai-sdk";
import EndToEndAnalyticsMicrosoftFabricPost, {
  meta as endToEndAnalyticsMicrosoftFabricMeta,
} from "./posts/end-to-end-analytics-microsoft-fabric";
import NextjsSeoChecklist2026Post, {
  meta as nextjsSeoChecklist2026Meta,
} from "./posts/nextjs-seo-checklist-2026";
import ProductionAiAgentsToolUsePost, {
  meta as productionAiAgentsToolUseMeta,
} from "./posts/production-ai-agents-tool-use";
import QuickIntroductionReactNativePost, {
  meta as quickIntroductionReactNativeMeta,
} from "./posts/quick-introduction-react-native";
import PostgresqlOnlyBackendNextjsPost, {
  meta as postgresqlOnlyBackendNextjsMeta,
} from "./posts/postgresql-only-backend-nextjs";
import PwaNextjs2026GuidePost, {
  meta as pwaNextjs2026GuideMeta,
} from "./posts/pwa-nextjs-2026-guide";
import CuttingOpenAiCostsProductionPost, {
  meta as cuttingOpenAiCostsProductionMeta,
} from "./posts/cutting-openai-costs-production";
import LangGraphProductionAgents2026Post, {
  meta as langGraphProductionAgents2026Meta,
} from "./posts/langgraph-production-agents-2026";
import McpProductionAiIntegrations2026Post, {
  meta as mcpProductionAiIntegrations2026Meta,
} from "./posts/mcp-production-ai-integrations-2026";
import AiAgentMemorySystems2026Post, {
  meta as aiAgentMemorySystems2026Meta,
} from "./posts/ai-agent-memory-systems-2026";
import BrowserAgentsProduction2026Post, {
  meta as browserAgentsProduction2026Meta,
} from "./posts/browser-agents-production-2026";
import CodeExecutionSandboxesAiAgents2026Post, {
  meta as codeExecutionSandboxesAiAgents2026Meta,
} from "./posts/code-execution-sandboxes-ai-agents-2026";
import VoiceAiAgentsProduction2026Post, {
  meta as voiceAiAgentsProduction2026Meta,
} from "./posts/voice-ai-agents-production-2026";
import AgentEvaluationObservability2026Post, {
  meta as agentEvaluationObservability2026Meta,
} from "./posts/agent-evaluation-observability-2026";

type PostRegistryEntry = {
  meta: Article;
  Component: () => JSX.Element;
};

const posts: PostRegistryEntry[] = [
  {
    meta: quicktalogBuildingAiCatalogMeta,
    Component: QuicktalogBuildingAiCatalogPost,
  },
  {
    meta: unbgBrowserBasedAiBackgroundRemovalMeta,
    Component: UnbgBrowserBasedAiBackgroundRemovalPost,
  },
  {
    meta: ragNextjsLangchainVercelAiSdkMeta,
    Component: RagNextjsLangchainVercelAiSdkPost,
  },
  {
    meta: endToEndAnalyticsMicrosoftFabricMeta,
    Component: EndToEndAnalyticsMicrosoftFabricPost,
  },
  {
    meta: nextjsSeoChecklist2026Meta,
    Component: NextjsSeoChecklist2026Post,
  },
  {
    meta: productionAiAgentsToolUseMeta,
    Component: ProductionAiAgentsToolUsePost,
  },
  {
    meta: quickIntroductionReactNativeMeta,
    Component: QuickIntroductionReactNativePost,
  },
  {
    meta: postgresqlOnlyBackendNextjsMeta,
    Component: PostgresqlOnlyBackendNextjsPost,
  },
  {
    meta: pwaNextjs2026GuideMeta,
    Component: PwaNextjs2026GuidePost,
  },
  {
    meta: cuttingOpenAiCostsProductionMeta,
    Component: CuttingOpenAiCostsProductionPost,
  },
  {
    meta: langGraphProductionAgents2026Meta,
    Component: LangGraphProductionAgents2026Post,
  },
  {
    meta: mcpProductionAiIntegrations2026Meta,
    Component: McpProductionAiIntegrations2026Post,
  },
  {
    meta: aiAgentMemorySystems2026Meta,
    Component: AiAgentMemorySystems2026Post,
  },
  {
    meta: browserAgentsProduction2026Meta,
    Component: BrowserAgentsProduction2026Post,
  },
  {
    meta: codeExecutionSandboxesAiAgents2026Meta,
    Component: CodeExecutionSandboxesAiAgents2026Post,
  },
  {
    meta: voiceAiAgentsProduction2026Meta,
    Component: VoiceAiAgentsProduction2026Post,
  },
  {
    meta: agentEvaluationObservability2026Meta,
    Component: AgentEvaluationObservability2026Post,
  },
];

export const allPostsMeta: Article[] = posts
  .map((p) => p.meta)
  .sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

export function getPostBySlug(slug: string): PostRegistryEntry | undefined {
  return posts.find((p) => p.meta.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.meta.slug);
}
