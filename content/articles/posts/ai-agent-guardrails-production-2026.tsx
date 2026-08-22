import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "ai-agent-guardrails-production-2026",
  title:
    "AI agent guardrails in production 2026: the five-layer defence stack from Llama Guard and Constitutional Classifiers to NeMo and Bedrock",
  excerpt:
    "How the guardrails layer around AI agents grew up in 2025 and 2026, from a single content filter into a five-rail runtime that ships with every serious agent stack. Covers input, dialog, retrieval, execution, and output rails, the safety classifiers behind them (Llama Guard 4, ShieldGemma 2, Granite Guardian 4.1, Constitutional Classifiers), the frameworks that wire them together (NeMo Guardrails, Guardrails AI, OpenAI Agents SDK tripwires), and the cloud offerings (AWS Bedrock Guardrails, Lakera Guard) that dominate enterprise procurement.",
  metaDescription:
    "A practical, technical guide to AI agent guardrails in 2026. Covers the five-rail defence pattern (input, dialog, retrieval, execution, output), open-source safety classifiers (Meta Llama Guard 3 and 4, Google ShieldGemma 2, IBM Granite Guardian 4.1, Anthropic Constitutional Classifiers), guardrail frameworks (NVIDIA NeMo Guardrails with Colang 2, Guardrails AI validators, OpenAI Agents SDK tripwires), cloud services (AWS Bedrock Guardrails with the ApplyGuardrail API, Lakera Guard by Check Point), PII redaction with Microsoft Presidio, latency and cost trade-offs, and honest guidance on when each layer earns its place.",
  image:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Guardrails",
    "Safety",
    "NeMo Guardrails",
    "Llama Guard",
    "Bedrock",
    "OpenAI",
    "Anthropic",
    "Production",
    "PII",
  ],
  publishDate: "2026-08-22",
  readingTime: "18 min read",
};

export default function AiAgentGuardrailsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        When we shipped our first production agent in 2023, the guardrail was one
        regex and a lot of hope. In 2026 the same feature ships with five rails,
        two safety classifiers, a PII redactor, a policy engine, and a tripwire
        that can halt the whole run before a token reaches a tool. The shape is
        not a fashion. It is what happens after your first incident where an
        agent leaks a customer email into a public log, or answers a jailbreak
        with a paragraph you never want on a screenshot. This article is the
        guardrail stack we now ship by default: what each rail does, which
        classifier and framework to reach for, how the pieces fit together, and
        where the story quietly falls apart if you copy it without thinking.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why guardrails became a first-class layer
      </h2>
      <p className="mb-6 leading-relaxed">
        A guardrail is a runtime control that sits around a model call. It reads
        the input before the model sees it, watches the output before the user
        sees it, and can reject, rewrite, mask, or escalate at any point in
        between. That definition sounds obvious in 2026. It was not obvious in
        2024, when most teams treated safety as a prompt-engineering problem and
        packed all the rules into a single system prompt. The reason the layer
        moved out of the prompt is that agents got long, tool-using, and
        multi-step. A prompt that is safe on turn one is not safe on turn seven,
        after the agent has pulled in a web page, a support ticket, and a
        retrieved document. Whatever you wrote at the top of the run does not
        survive contact with that context.
      </p>
      <p className="mb-6 leading-relaxed">
        The other pressure is regulatory. The EU AI Act came into force in
        August 2024 and its high-risk-system obligations landed in 2026. Under
        HIPAA and GDPR, redacting PII before a prompt hits a hosted model is not
        optional. Enterprise buyers now expect a policy engine, an audit log,
        and a way to demonstrate the model refused what it should refuse. A
        prompt is not evidence. A guardrail run with a decision, a reason, and a
        stored trace is evidence.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Guardrails are not agent security
      </h2>
      <p className="mb-6 leading-relaxed">
        These two words get used together and they are not the same thing.
        Agent security asks whether the system is allowed to take the next
        action, given who the user is, what data is in reach, and what the
        blast radius of the tool call would be. It is the domain of permission
        models, sandboxing, the Agents Rule of Two, and the CaMeL pattern for
        splitting privileged and quarantined models. Guardrails ask whether the
        content flowing through the loop is safe, on-topic, grounded, and free
        of information that must not leave the system. The two layers overlap
        at the edges, but the concerns are different and the fixes are
        different. A guardrail cannot stop a well-scoped tool call from wiping
        a database. A permission model cannot stop the model from writing a
        slur into a customer chat. You need both.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The five-rail pattern every serious stack converges on
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA NeMo Guardrails team gave this pattern its clearest name,
        but the idea shows up in almost every mature framework, from the OpenAI
        Agents SDK tripwires to LangChain guardrail chains to the AWS Bedrock
        policy tiers. Five rails, wrapped around one model call. Each rail owns
        a boundary, each rail can pass, rewrite, or reject, and the run is only
        as safe as the weakest one.
      </p>
      <CodeBlock
        language="bash"
        filename="The shared five-rail layout"
        code={`+-----------------------------------------------------+
|  1. INPUT RAILS                                     |
|     - jailbreak / prompt injection detection        |
|     - PII detection and masking                     |
|     - topical filter (is this even in scope?)       |
+---------------------------+-------------------------+
                            v
+-----------------------------------------------------+
|  2. DIALOG RAILS                                    |
|     - allowed / denied topics                       |
|     - required flows (must call auth first, etc.)   |
|     - handoff triggers                              |
+---------------------------+-------------------------+
                            v
+-----------------------------------------------------+
|  3. RETRIEVAL RAILS                                 |
|     - source allowlist / denylist                   |
|     - chunk-level PII scrub                         |
|     - trust tags on retrieved context               |
+---------------------------+-------------------------+
                            v
+-----------------------------------------------------+
|  4. EXECUTION RAILS                                 |
|     - per-tool allow / block                        |
|     - pre-execution argument checks                 |
|     - post-execution output checks                  |
+---------------------------+-------------------------+
                            v
+-----------------------------------------------------+
|  5. OUTPUT RAILS                                    |
|     - toxicity / hate / self-harm classifier        |
|     - grounding / hallucination check               |
|     - PII, secret, and competitor-name scrub        |
+-----------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The point of naming the five rails is not to force every stack to have
        all five turned on. Most of our client work runs three (input, output,
        execution) with retrieval added the day the agent gains a RAG source
        and dialog added the day the agent gains a handoff. The point is that
        each concern has a home. When a new incident shows up, you know which
        rail to strengthen. Toxic output made it through? Output rail. Agent
        went off-topic and gave legal advice? Dialog rail. Retrieved a
        poisoned document from an untrusted feed? Retrieval rail. This
        separation is what makes the guardrail layer debuggable at 2 a.m.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The safety classifier layer
      </h2>
      <p className="mb-6 leading-relaxed">
        Underneath most rails sits a small model that scores content against a
        safety taxonomy. Four families dominate the 2026 landscape, and they
        are close enough in shape that you can swap one for another without
        redesigning your pipeline. The choice usually comes down to licence,
        latency, and whether you want a hosted API or a self-hosted GPU.
      </p>

      <h3 className="mb-4 mt-8 text-2xl font-bold text-white">
        Meta Llama Guard 3 and Llama Guard 4
      </h3>
      <p className="mb-6 leading-relaxed">
        Llama Guard 3 is an 8B model fine-tuned from Llama 3.1 for prompt and
        response classification against the MLCommons hazards taxonomy. It
        speaks eight languages and includes rules for the search and code
        interpreter tool paths, which matters when your agent is calling
        tools. Llama Guard 4, released in 2025, is 12B and natively
        multimodal: text and image in the same forward pass, aligned to the
        same taxonomy. It is the version we reach for when the agent handles
        uploaded images, because the previous split into Llama Guard 3 8B for
        text and 3 11B-vision for images is no longer necessary.
      </p>
      <CodeBlock
        language="python"
        filename="src/guardrails/llama_guard.py"
        code={`from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_id = "meta-llama/Llama-Guard-4-12B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    device_map="auto",
)

def classify(role: str, text: str) -> dict:
    messages = [{"role": role, "content": text}]
    prompt = tokenizer.apply_chat_template(
        messages, return_tensors="pt"
    ).to(model.device)
    output = model.generate(prompt, max_new_tokens=64, do_sample=False)
    decoded = tokenizer.decode(
        output[0][prompt.shape[-1]:], skip_special_tokens=True
    )
    # Response is "safe" or "unsafe\\nS1,S3" (category codes).
    lines = decoded.strip().split("\\n")
    return {
        "safe": lines[0] == "safe",
        "categories": lines[1].split(",") if len(lines) > 1 else [],
    }`}
      />
      <p className="mb-6 leading-relaxed">
        The three details worth internalising. First, the model returns a
        two-line answer: a verdict, then a comma-separated list of hazard
        category codes. Do not try to reason about the verdict from the
        category codes alone, because Llama Guard sometimes flags a category
        that is present in the text without the whole message being unsafe.
        Second, prompt and response classification use different chat
        templates, so pass the correct role. Third, at 12B the model is not
        cheap: on an A100 you get roughly 40 to 60 milliseconds per
        classification, so budget for it in the total request latency.
      </p>

      <h3 className="mb-4 mt-8 text-2xl font-bold text-white">
        Google ShieldGemma 2
      </h3>
      <p className="mb-6 leading-relaxed">
        ShieldGemma 2 is a 4B model built on Gemma 3, tuned to score content
        against four categories: sexually explicit, dangerous, hate, and
        harassment. It is the smaller, faster option and it ships with image
        support out of the box. We use it as a first-pass filter in
        latency-sensitive paths (voice agents, real-time UIs) and let a
        heavier model second-check the calls it flags. Open weights on
        Hugging Face and Kaggle, so you self-host without a vendor contract.
      </p>

      <h3 className="mb-4 mt-8 text-2xl font-bold text-white">
        IBM Granite Guardian 4.1
      </h3>
      <p className="mb-6 leading-relaxed">
        Granite Guardian is the enterprise-flavoured option. Version 4.1
        shipped in April 2026 with a feature IBM calls Bring Your Own
        Criteria: instead of matching a fixed taxonomy, you pass a plain-text
        description of the behaviour you want scored and the model returns a
        judgement. That turns the same model into a hallucination detector,
        a brand-safety checker, or a topical filter without a fine-tune. It
        also detects the standard risk set (harm, social bias, jailbreak,
        violence, profanity) and it tops the third-party GuardBench
        leaderboard on the metrics IBM published. If your team already runs
        Granite for other tasks, keeping the safety layer on the same family
        cuts serving cost.
      </p>

      <h3 className="mb-4 mt-8 text-2xl font-bold text-white">
        Anthropic Constitutional Classifiers
      </h3>
      <p className="mb-6 leading-relaxed">
        Anthropic does not ship a downloadable classifier. What they ship is
        the pipeline that sits in front of Claude on Anthropic API and in
        Claude.ai, and they published the numbers in January 2026. A first
        stage cheap classifier probes every request and escalates about 5.5%
        of traffic to a second-stage model. The overall flag rate on
        production traffic is 0.05%, down from 0.38% in the previous
        generation, and across 198 thousand red-team attempts they found one
        high-risk vulnerability. If you are already on the Anthropic API,
        the classifiers are on by default. If you are building on open
        weights and want the same pattern, the LangChain community has an
        open reproduction that layers a small LLM probe in front of a bigger
        judge, and NeMo Guardrails ships a similar cascade.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        NVIDIA NeMo Guardrails: the reference framework
      </h2>
      <p className="mb-6 leading-relaxed">
        NeMo Guardrails is the open-source toolkit most teams reach for when
        they want a real policy engine rather than a bag of validators. The
        core surface is a domain-specific language called Colang, now in
        version 2.0, that reads a lot like Python. A guardrail is a flow,
        flows are grouped into rails, and each rail is attached to one of the
        five boundaries above. The 2026 release (0.23.0 and beyond) added
        lightweight Hugging Face classifier rails so you can plug Llama Guard
        or ShieldGemma into a Colang flow without writing custom code, a
        context bloat detector for long-running agents, and a Polygraf
        integration for PII. The team also reports a 40% reduction in
        baseline engine overhead compared to the 2025 build.
      </p>
      <CodeBlock
        language="python"
        filename="src/guardrails/nemo_config.co"
        code={`# Colang 2.0 flow file
import core
import guardrails
import llm

# INPUT RAIL: check the user message for jailbreaks and PII.
flow input rails $input_text
  $jailbreak = await CallLLM(
    task="jailbreak_detection",
    text=$input_text,
  )
  if $jailbreak.is_attack
    bot say "I cannot help with that request."
    abort

  $pii = await DetectPII(text=$input_text)
  if $pii.has_pii
    $input_text = $pii.masked

# DIALOG RAIL: define allowed topics for a support agent.
flow user asks about billing
  user said something like "What is my invoice for last month?"

flow user asks about competitor
  user said something like "Is Acme better than us?"

flow bot refuses off-topic
  bot say "I can only help with account, billing, and product questions."

flow main
  activate input rails
  activate llm continuation
  match user said $text
    when user asks about billing
      bot answer with account context
    when user asks about competitor
      bot refuses off-topic`}
      />
      <p className="mb-6 leading-relaxed">
        Two things this shows that a validator library does not. First, dialog
        rails are declarative: you write the shape of the conversation and the
        engine matches user turns against it, so you can require an
        authentication flow before a refund request or force a handoff for
        topics you do not want to answer. Second, rails are composable across
        input and dialog boundaries, so a jailbreak detected on input can
        abort the entire flow before it reaches the LLM. NeMo also ships an
        official LangGraph integration and works with the OpenAI Agents SDK,
        so the same rails cover agents built on either stack.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Guardrails AI: the validator library
      </h2>
      <p className="mb-6 leading-relaxed">
        If NeMo is the policy engine, Guardrails AI is the plumbing. It is a
        Python framework built around composable validators: small units that
        each check one thing about an input or an output. The Guardrails Hub
        currently lists over 65 validators covering toxicity, PII, competitor
        mentions, SQL injection, JSON schema conformance, hallucination
        detection, and profanity. In July 2026 the team moved validators to
        standard PyPI packages and dropped their hosted remote inferencing,
        which is a good call: keeping everything local removes a network hop
        and a vendor dependency from the guardrail path.
      </p>
      <CodeBlock
        language="python"
        filename="src/guardrails/guardrails_ai.py"
        code={`from guardrails import Guard, OnFailAction
from guardrails.hub import (
    DetectPII,
    ToxicLanguage,
    CompetitorCheck,
    ValidJson,
)

# Compose validators into one Guard.
guard = Guard().use_many(
    DetectPII(
        pii_entities=["EMAIL_ADDRESS", "PHONE_NUMBER"],
        on_fail=OnFailAction.FIX,   # mask instead of block
    ),
    ToxicLanguage(
        threshold=0.5,
        validation_method="sentence",
        on_fail=OnFailAction.EXCEPTION,
    ),
    CompetitorCheck(
        competitors=["Acme", "Globex"],
        on_fail=OnFailAction.EXCEPTION,
    ),
    ValidJson(on_fail=OnFailAction.REASK),
)

# Wrap any LLM call.
outcome = guard(
    llm_api=chat_completion,
    prompt=user_prompt,
    model="gpt-5.5",
)

if outcome.validation_passed:
    return outcome.validated_output
else:
    return {"error": outcome.error, "raw": outcome.raw_llm_output}`}
      />
      <p className="mb-6 leading-relaxed">
        The interesting design choice is <code>on_fail</code>. Every validator
        knows how to fail in more than one way: raise an exception, mask the
        offending span, ask the model to try again, or return the failed
        payload with a flag. This is what lets you build a graceful
        degradation policy. PII in a support ticket? Mask and continue.
        Toxicity in a customer-facing chat? Exception and route to a fallback
        response. Malformed JSON in a tool-use output? Re-ask up to two
        times, then fall back. The framework does not decide the policy for
        you, and that is the point.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        OpenAI Agents SDK: tripwires as a runtime primitive
      </h2>
      <p className="mb-6 leading-relaxed">
        Since March 2025 the OpenAI Agents SDK has treated guardrails as a
        first-class primitive on the Agent type. There are three flavours:
        input guardrails on the user turn, output guardrails on the assistant
        turn, and tool guardrails around each function call. When a guardrail
        detects a violation it raises a <em>tripwire</em>, and the SDK
        cancels the rest of the run in the same tick. The 2026 release added
        two execution modes: <strong>parallel</strong> runs the model and the
        guardrail together and cancels the model if the guardrail trips
        first, and <strong>blocking</strong> waits for the guardrail before
        it starts the model call. Parallel wins on latency, blocking wins on
        cost when the guardrail is likely to fire.
      </p>
      <CodeBlock
        language="python"
        filename="src/guardrails/openai_agents.py"
        code={`from agents import (
    Agent, GuardrailFunctionOutput,
    input_guardrail, output_guardrail,
    RunContextWrapper,
)
from pydantic import BaseModel

class TopicCheck(BaseModel):
    is_off_topic: bool
    reason: str

@input_guardrail
async def topic_guard(
    ctx: RunContextWrapper[None], agent: Agent, user_input: str
) -> GuardrailFunctionOutput:
    # Cheap classifier that decides if the input is on topic.
    result = await topic_classifier.classify(user_input)
    return GuardrailFunctionOutput(
        output_info=result,
        tripwire_triggered=result.is_off_topic,
    )

@output_guardrail
async def safety_guard(
    ctx: RunContextWrapper[None], agent: Agent, output: str
) -> GuardrailFunctionOutput:
    verdict = await llama_guard.classify("assistant", output)
    return GuardrailFunctionOutput(
        output_info=verdict,
        tripwire_triggered=not verdict["safe"],
    )

support_agent = Agent(
    name="support",
    instructions="You are a helpful billing assistant.",
    input_guardrails=[topic_guard],
    output_guardrails=[safety_guard],
    execution_mode="parallel",
)`}
      />
      <p className="mb-6 leading-relaxed">
        One subtle thing the SDK gets right is that guardrail spans show up
        in the trace as first-class events. When you are debugging a run in
        the OpenAI dashboard, you see exactly which guardrail fired, on which
        turn, with which input, and what verdict the classifier returned.
        This turns guardrails from a black box into a debuggable component,
        which is the difference between a stack you trust in production and
        one you keep swapping out.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AWS Bedrock Guardrails: the cloud-native path
      </h2>
      <p className="mb-6 leading-relaxed">
        Bedrock Guardrails is the offering most enterprise teams end up
        picking, because it applies without code changes to any Bedrock
        foundation model and, through the <code>ApplyGuardrail</code> API,
        to any model outside Bedrock too. You configure a guardrail in the
        console with four policy families: content filters (hate, insults,
        sexual, violence, misconduct, prompt attacks), denied topics that you
        describe in natural language, sensitive information filters for PII
        and regex, and contextual grounding for hallucination detection in
        RAG apps. The June 2025 update added tiers on content filters and
        denied topics: the Standard tier catches typos and paraphrases with
        better contextual understanding and supports 60 languages. In April
        2026, cross-account safeguards reached general availability, which
        lets a central security team publish a guardrail policy that every
        member account in the AWS Organization inherits.
      </p>
      <CodeBlock
        language="python"
        filename="src/guardrails/bedrock_apply.py"
        code={`import boto3

client = boto3.client("bedrock-runtime")

# Works against any model, not just Bedrock-hosted ones.
response = client.apply_guardrail(
    guardrailIdentifier="gr-support-agent-v3",
    guardrailVersion="7",
    source="OUTPUT",
    content=[
        {
            "text": {
                "text": model_response,
                "qualifiers": ["grounding_source", "guard_content"],
            }
        }
    ],
)

if response["action"] == "GUARDRAIL_INTERVENED":
    for assessment in response["assessments"]:
        # Log which policies fired and why.
        print(assessment)
    return response["outputs"][0]["text"]  # rewritten safe text
else:
    return model_response`}
      />
      <p className="mb-6 leading-relaxed">
        Two production notes. First, <code>ApplyGuardrail</code> is a
        separate priced call, so if you run guardrails on both input and
        output of a chain of three model calls, you have six guardrail calls
        per user turn. Budget accordingly. Second, contextual grounding is
        the only feature that requires you to hand Bedrock the retrieved
        source text alongside the model response. That is how it decides
        whether the response is faithful to the sources. If you skip the
        source hand-off, contextual grounding is a no-op.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Microsoft Presidio: the PII specialist
      </h2>
      <p className="mb-6 leading-relaxed">
        Presidio is the open-source PII framework we plug into almost every
        guardrail pipeline. It splits detection (finding PII spans with a
        confidence score) from anonymization (masking, hashing, encrypting,
        or replacing the spans). The analyzer ships with recognizers for
        common entities (email, phone, credit card, IP, SSN, IBAN) and lets
        you add regex or Named Entity Recognition rules for domain-specific
        ones. The June 2026 release added a Philippine tax ID recognizer, a
        German entity pack, and a docker path for LangExtract. In our
        pipelines Presidio runs twice: once before the prompt hits the LLM
        and once on the output before it is returned to the user. When
        results go into logs, the redacted trace is what gets stored, not
        the raw one.
      </p>
      <CodeBlock
        language="python"
        filename="src/guardrails/presidio_pipeline.py"
        code={`from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from presidio_anonymizer.entities import OperatorConfig

analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

def redact(text: str) -> tuple[str, list]:
    results = analyzer.analyze(
        text=text,
        entities=["EMAIL_ADDRESS", "PHONE_NUMBER", "CREDIT_CARD"],
        language="en",
    )
    anonymized = anonymizer.anonymize(
        text=text,
        analyzer_results=results,
        operators={
            "EMAIL_ADDRESS": OperatorConfig(
                "replace", {"new_value": "<EMAIL>"}
            ),
            "PHONE_NUMBER": OperatorConfig("mask", {
                "masking_char": "*",
                "chars_to_mask": 6,
                "from_end": True,
            }),
            "CREDIT_CARD": OperatorConfig("hash"),
        },
    )
    return anonymized.text, results

# Round-trip pattern for logs and prompts.
safe_prompt, pii_spans = redact(user_message)
llm_output = call_llm(safe_prompt)
safe_output, _ = redact(llm_output)
store_trace(safe_prompt, safe_output, pii_spans_metadata=pii_spans)`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Lakera Guard and the commercial runtime layer
      </h2>
      <p className="mb-6 leading-relaxed">
        Lakera Guard is the commercial option we recommend when the team does
        not have the appetite to self-host classifiers. It focuses on
        prompt-injection and jailbreak detection, reports over 98% detection
        with sub-50 millisecond latency, and covers more than a hundred
        languages. Lakera was acquired by Check Point in September 2025 and
        the product now sits inside the Check Point AI security platform. It
        is a hosted API call in the request path, so latency and reliability
        are your two production concerns. The trade-off against a self-hosted
        Llama Guard is straightforward: you pay a per-call fee and give up a
        few milliseconds, and in return you skip the GPU serving problem and
        get a team that patches new attack patterns for you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A real production pipeline
      </h2>
      <p className="mb-6 leading-relaxed">
        This is the shape we ship on a typical customer-support agent in
        2026. The stack is boring on purpose. Each layer does one thing and
        we know which one to blame when an incident lands. The exact
        classifiers and services swap by client, but the boundaries do not.
      </p>
      <CodeBlock
        language="python"
        filename="src/guardrails/pipeline.py"
        code={`from dataclasses import dataclass

@dataclass
class GuardResult:
    allow: bool
    reason: str
    payload: str

async def run_turn(user_input: str, session) -> str:
    # RAIL 1: input.
    if lakera.detect_injection(user_input).is_attack:
        return "I cannot help with that request."
    scrubbed_input, _ = presidio.redact(user_input)

    # RAIL 2: dialog. NeMo Colang decides what shape the turn takes.
    plan = await nemo.plan(scrubbed_input, session)
    if plan.action == "refuse":
        return plan.message
    if plan.action == "handoff":
        return await handoff_to_human(session)

    # RAIL 3: retrieval, only if the plan calls for it.
    context = ""
    if plan.needs_context:
        chunks = await vectordb.search(plan.query, allowlist=session.tenant)
        chunks = [presidio.redact(c.text)[0] for c in chunks]
        context = "\\n\\n".join(chunks)

    # RAIL 4: execution. Tools are wrapped with pre/post guards.
    if plan.tool:
        args_ok = await tool_guard.check_args(plan.tool, plan.args, session)
        if not args_ok.allow:
            return args_ok.reason
        tool_out = await run_tool(plan.tool, plan.args)
        out_ok = await tool_guard.check_output(plan.tool, tool_out)
        if not out_ok.allow:
            return out_ok.reason
        context += f"\\n\\nTOOL_RESULT: {tool_out}"

    # Model call.
    raw = await llm.chat(plan.prompt, context=context)

    # RAIL 5: output.
    verdict = await llama_guard.classify("assistant", raw)
    if not verdict["safe"]:
        return "I cannot share that response."
    safe_out, _ = presidio.redact(raw)

    grounded = await bedrock.apply_guardrail(
        source="OUTPUT", text=safe_out, sources=context
    )
    return grounded.text`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern is deliberately conservative. Every rail can short-circuit
        the run, and the guardrail decisions are logged with a reason. When a
        customer or a regulator asks why the agent refused a request, the
        answer is a row in the trace store, not a guess about what the model
        was thinking.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Latency, cost, and the honest trade-offs
      </h2>
      <p className="mb-6 leading-relaxed">
        Every rail costs latency and money. Ignoring that leads to the
        classic mistake of stacking six classifiers on every turn and
        wondering why the p95 latency of the chat is 4 seconds. The numbers
        we plan around, for a single user turn on modest hardware:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Presidio analyze plus anonymize</strong>: 5 to 20 ms on
          CPU per 1k tokens.
        </li>
        <li>
          <strong>ShieldGemma 2 (4B)</strong>: 20 to 40 ms on an A10 or
          L40S per short input.
        </li>
        <li>
          <strong>Llama Guard 4 (12B)</strong>: 40 to 80 ms on an A100 per
          short input.
        </li>
        <li>
          <strong>Lakera Guard hosted call</strong>: 30 to 60 ms including
          network.
        </li>
        <li>
          <strong>Bedrock ApplyGuardrail</strong>: 50 to 150 ms depending
          on region and policy complexity.
        </li>
        <li>
          <strong>NeMo dialog rail with a small LLM</strong>: 100 to 300 ms
          because the small model has to think.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Two rules keep the budget honest. First, do not run the same check
        twice. If Bedrock is doing content filtering on the output, do not
        also run Llama Guard on it unless you actually need a second
        opinion. Second, cascade cheap to expensive. The Anthropic
        Constitutional Classifiers pattern is the right shape: a small
        cheap probe on every request, a bigger judge only on the 5% the
        probe flags. NeMo Guardrails ships an LFU cache for exactly this
        reason, and Anthropic reported that this cascade drove their flag
        rate down while cutting compute.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where guardrails quietly fail
      </h2>
      <p className="mb-6 leading-relaxed">
        Three failure modes show up often enough that we now check for them
        by default. The first is over-blocking. Every guardrail has a false
        positive rate, and if you stack five of them, the compound rate is
        higher than any single number suggests. We track a
        <em>false-refuse rate</em> metric in production as a first-class
        signal, alongside toxicity slip-through. If false refuse creeps past
        1 to 2%, users stop trusting the agent.
      </p>
      <p className="mb-6 leading-relaxed">
        The second is context-dependent evasion. A jailbreak split across
        three turns of a long conversation can slip past a per-turn
        classifier that only sees one message at a time. The fix is to run
        the classifier on a sliding window of the recent turns, not just the
        latest one. NeMo Guardrails 0.23.0 shipped a context bloat detector
        for the related problem of prompt injection payloads hidden in
        pasted text.
      </p>
      <p className="mb-6 leading-relaxed">
        The third is tool-output injection. An agent that fetches a web page
        and passes the content back into the model as context has just
        inherited whatever instructions were on that page. Output rails on
        the model are the wrong place to catch this. It belongs on the
        retrieval or execution rails, where the tool result is treated as
        untrusted data and either scrubbed or wrapped in a marker the model
        is trained to distrust. This is the same lesson the security
        literature calls the lethal trifecta, and it is the reason
        retrieval and execution rails exist as separate boundaries in the
        five-rail model rather than being folded into the input rail.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where the space is going in late 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three patterns are worth watching. First, the classifiers are
        getting smaller and multimodal in the same year. Llama Guard 4 at
        12B handles text and images in one pass, ShieldGemma 2 does the
        same at 4B. We expect a 3B multimodal safety model with parity to
        Llama Guard 4 to land before the end of 2026, which will make edge
        and on-device deployment realistic for the first time.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, policy-as-prompt is displacing policy-as-code for the
        judgement layer. Granite Guardian 4.1&rsquo;s Bring Your Own
        Criteria is the clearest example: instead of building a taxonomy in
        Python, you describe the behaviour you want scored and the model
        classifies against it. This scales better than a fixed taxonomy for
        enterprise policies that change every quarter, and it turns the
        policy document itself into an executable artefact.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, the frameworks are converging on the same abstractions.
        NeMo, OpenAI Agents SDK, Guardrails AI, and Bedrock all now expose
        input, output, and tool boundaries with pluggable classifiers. That
        means the guardrail layer is starting to look like the middleware
        layer of a web framework: a small number of shapes, a large number
        of implementations, and portability between them. Teams that pick
        an interface today (five rails, tripwires, or validators) can
        expect to swap the underlying models without a rewrite.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Recommendations
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Start with three rails</strong>: input, output, and
          execution. Add retrieval the day the agent gains a RAG source,
          add dialog the day it gains a handoff.
        </li>
        <li>
          <strong>Pick one classifier family</strong>: Llama Guard 4 if you
          are self-hosting on GPU and want multimodal, ShieldGemma 2 if
          you need low latency, Granite Guardian 4.1 if you want custom
          criteria, Constitutional Classifiers if you are already on the
          Anthropic API.
        </li>
        <li>
          <strong>Redact PII twice</strong>: before the prompt reaches the
          model and before the output reaches the user. Store the redacted
          trace, not the raw one.
        </li>
        <li>
          <strong>Cascade cheap to expensive</strong>: a small probe on
          every request, a bigger judge on the flagged fraction. Cache
          verdicts with an LFU so repeated inputs do not pay twice.
        </li>
        <li>
          <strong>Log every guardrail decision</strong>: rail, verdict,
          category, latency, and a reason string. This is the audit trail
          your legal team and your on-call engineer both need.
        </li>
        <li>
          <strong>Track false refuse as a KPI</strong>: over-blocking
          erodes trust faster than the occasional slip-through, and it
          only shows up when you measure it.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">Sources</h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://github.com/NVIDIA-NeMo/Guardrails"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA NeMo Guardrails on GitHub
          </a>{" "}
          and the{" "}
          <a
            href="https://docs.nvidia.com/nemo/guardrails/latest/release-notes.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NeMo Guardrails release notes
          </a>
          .
        </li>
        <li>
          <a
            href="https://huggingface.co/meta-llama/Llama-Guard-4-12B"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meta Llama Guard 4 12B model card
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/meta-llama/PurpleLlama/blob/main/Llama-Guard3/8B/MODEL_CARD.md"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Llama Guard 3 8B model card
          </a>
          .
        </li>
        <li>
          <a
            href="https://deepmind.google/models/gemma/shieldgemma-2/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google DeepMind ShieldGemma 2
          </a>{" "}
          and the{" "}
          <a
            href="https://arxiv.org/html/2504.01081v1"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ShieldGemma 2 arXiv paper
          </a>
          .
        </li>
        <li>
          <a
            href="https://www.ibm.com/granite/docs/models/guardian"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            IBM Granite Guardian 4.1
          </a>{" "}
          and{" "}
          <a
            href="https://research.ibm.com/blog/granite-guardian-tops-guardbench"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Granite Guardian on GuardBench
          </a>
          .
        </li>
        <li>
          <a
            href="https://www.anthropic.com/research/next-generation-constitutional-classifiers"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Next-generation Constitutional Classifiers
          </a>
          .
        </li>
        <li>
          <a
            href="https://openai.github.io/openai-agents-python/guardrails/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI Agents SDK: Guardrails documentation
          </a>
          .
        </li>
        <li>
          <a
            href="https://github.com/guardrails-ai/guardrails"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guardrails AI on GitHub
          </a>
          .
        </li>
        <li>
          <a
            href="https://aws.amazon.com/about-aws/whats-new/2025/06/amazon-bedrock-guardrails-tiers-content-filters-denied-topics"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS: Amazon Bedrock Guardrails tiers for content filters and
            denied topics
          </a>
          .
        </li>
        <li>
          <a
            href="https://microsoft.github.io/presidio/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Presidio documentation
          </a>
          .
        </li>
        <li>
          <a
            href="https://www.lakera.ai/lakera-guard"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lakera Guard (Check Point AI security)
          </a>
          .
        </li>
      </ul>
    </div>
  );
}
