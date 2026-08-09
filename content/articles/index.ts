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
import MultiAgentOrchestration2026Post, {
  meta as multiAgentOrchestration2026Meta,
} from "./posts/multi-agent-orchestration-2026";
import ContextEngineeringAiAgents2026Post, {
  meta as contextEngineeringAiAgents2026Meta,
} from "./posts/context-engineering-ai-agents-2026";
import AiAgentSecurity2026Post, {
  meta as aiAgentSecurity2026Meta,
} from "./posts/ai-agent-security-2026";
import DurableAiAgents2026Post, {
  meta as durableAiAgents2026Meta,
} from "./posts/durable-ai-agents-2026";
import AiAgentSkills2026Post, {
  meta as aiAgentSkills2026Meta,
} from "./posts/ai-agent-skills-2026";
import AgUiProtocolGenerativeUi2026Post, {
  meta as agUiProtocolGenerativeUi2026Meta,
} from "./posts/ag-ui-protocol-generative-ui-2026";
import AiCodingAgentsProduction2026Post, {
  meta as aiCodingAgentsProduction2026Meta,
} from "./posts/ai-coding-agents-production-2026";
import A2aProtocolCrossVendorAgents2026Post, {
  meta as a2aProtocolCrossVendorAgents2026Meta,
} from "./posts/a2a-protocol-cross-vendor-agents-2026";
import LlmGatewaysProduction2026Post, {
  meta as llmGatewaysProduction2026Meta,
} from "./posts/llm-gateways-production-2026";
import PydanticAiProduction2026Post, {
  meta as pydanticAiProduction2026Meta,
} from "./posts/pydantic-ai-production-2026";
import OpenAiAgentsSdkAgentkitProduction2026Post, {
  meta as openAiAgentsSdkAgentkitProduction2026Meta,
} from "./posts/openai-agents-sdk-agentkit-production-2026";
import ClaudeAgentSdkProduction2026Post, {
  meta as claudeAgentSdkProduction2026Meta,
} from "./posts/claude-agent-sdk-production-2026";
import MicrosoftAgentFrameworkProduction2026Post, {
  meta as microsoftAgentFrameworkProduction2026Meta,
} from "./posts/microsoft-agent-framework-production-2026";
import AwsBedrockAgentCoreProduction2026Post, {
  meta as awsBedrockAgentCoreProduction2026Meta,
} from "./posts/aws-bedrock-agentcore-production-2026";
import MastraTypescriptAgentsProduction2026Post, {
  meta as mastraTypescriptAgentsProduction2026Meta,
} from "./posts/mastra-typescript-agents-production-2026";
import CloudflareAgentsProduction2026Post, {
  meta as cloudflareAgentsProduction2026Meta,
} from "./posts/cloudflare-agents-production-2026";
import AgenticCommerceProtocols2026Post, {
  meta as agenticCommerceProtocols2026Meta,
} from "./posts/agentic-commerce-protocols-2026";
import CrewAiProductionMultiAgentSystems2026Post, {
  meta as crewAiProductionMultiAgentSystems2026Meta,
} from "./posts/crewai-production-multi-agent-systems-2026";
import GoogleAdkProduction2026Post, {
  meta as googleAdkProduction2026Meta,
} from "./posts/google-adk-production-2026";
import DeepResearchAgentsProduction2026Post, {
  meta as deepResearchAgentsProduction2026Meta,
} from "./posts/deep-research-agents-production-2026";
import SmallLanguageModelsAgenticAi2026Post, {
  meta as smallLanguageModelsAgenticAi2026Meta,
} from "./posts/small-language-models-agentic-ai-2026";

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
  {
    meta: multiAgentOrchestration2026Meta,
    Component: MultiAgentOrchestration2026Post,
  },
  {
    meta: contextEngineeringAiAgents2026Meta,
    Component: ContextEngineeringAiAgents2026Post,
  },
  {
    meta: aiAgentSecurity2026Meta,
    Component: AiAgentSecurity2026Post,
  },
  {
    meta: durableAiAgents2026Meta,
    Component: DurableAiAgents2026Post,
  },
  {
    meta: aiAgentSkills2026Meta,
    Component: AiAgentSkills2026Post,
  },
  {
    meta: agUiProtocolGenerativeUi2026Meta,
    Component: AgUiProtocolGenerativeUi2026Post,
  },
  {
    meta: aiCodingAgentsProduction2026Meta,
    Component: AiCodingAgentsProduction2026Post,
  },
  {
    meta: a2aProtocolCrossVendorAgents2026Meta,
    Component: A2aProtocolCrossVendorAgents2026Post,
  },
  {
    meta: llmGatewaysProduction2026Meta,
    Component: LlmGatewaysProduction2026Post,
  },
  {
    meta: pydanticAiProduction2026Meta,
    Component: PydanticAiProduction2026Post,
  },
  {
    meta: openAiAgentsSdkAgentkitProduction2026Meta,
    Component: OpenAiAgentsSdkAgentkitProduction2026Post,
  },
  {
    meta: claudeAgentSdkProduction2026Meta,
    Component: ClaudeAgentSdkProduction2026Post,
  },
  {
    meta: microsoftAgentFrameworkProduction2026Meta,
    Component: MicrosoftAgentFrameworkProduction2026Post,
  },
  {
    meta: awsBedrockAgentCoreProduction2026Meta,
    Component: AwsBedrockAgentCoreProduction2026Post,
  },
  {
    meta: mastraTypescriptAgentsProduction2026Meta,
    Component: MastraTypescriptAgentsProduction2026Post,
  },
  {
    meta: cloudflareAgentsProduction2026Meta,
    Component: CloudflareAgentsProduction2026Post,
  },
  {
    meta: agenticCommerceProtocols2026Meta,
    Component: AgenticCommerceProtocols2026Post,
  },
  {
    meta: crewAiProductionMultiAgentSystems2026Meta,
    Component: CrewAiProductionMultiAgentSystems2026Post,
  },
  {
    meta: googleAdkProduction2026Meta,
    Component: GoogleAdkProduction2026Post,
  },
  {
    meta: deepResearchAgentsProduction2026Meta,
    Component: DeepResearchAgentsProduction2026Post,
  },
  {
    meta: smallLanguageModelsAgenticAi2026Meta,
    Component: SmallLanguageModelsAgenticAi2026Post,
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
