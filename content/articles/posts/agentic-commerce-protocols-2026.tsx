import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 34,
  slug: "agentic-commerce-protocols-2026",
  title:
    "Agentic commerce in production 2026: AP2, ACP, x402, and MPP for agent payments",
  excerpt:
    "How the four open protocols for agent-led payments work in production: the Agent Payments Protocol from Google, the Agentic Commerce Protocol from Stripe and OpenAI, x402 from Coinbase, and the Machine Payments Protocol from Stripe and Tempo. Includes the Stripe Agent Toolkit, virtual cards through Stripe Issuing, and an honest comparison of when each rail fits.",
  metaDescription:
    "A practical, technical guide to agentic commerce in 2026. Covers the Agent Payments Protocol (AP2) from Google, the Agentic Commerce Protocol (ACP) from Stripe and OpenAI, x402 from Coinbase, the Machine Payments Protocol (MPP) from Stripe and Tempo, Stripe Issuing virtual cards, the Stripe Agent Toolkit, Visa Trusted Agent Protocol, Mastercard Agent Pay, and how to wire the pieces into a production agent.",
  image:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Payments",
    "AP2",
    "ACP",
    "x402",
    "MPP",
    "Stripe",
    "Stablecoins",
    "Production",
  ],
  publishDate: "2026-06-28",
  readingTime: "18 min read",
};

export default function AgenticCommerceProtocols2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Through most of 2024, an AI agent that wanted to buy
        something for a user had two bad options. It could
        scrape a web checkout and hope nothing changed, or it
        could hold a long-lived API key with full account
        access and pray the model never went off the rails. By
        mid-2026 the picture looks completely different. Stripe
        and OpenAI shipped the Agentic Commerce Protocol,
        Google shipped the Agent Payments Protocol with 60+
        partners, Coinbase shipped x402 over plain HTTP, and
        Stripe and Tempo shipped the Machine Payments Protocol
        on a new chain built for agents. Visa and Mastercard
        both launched their own trust layers on top. This
        article walks through what each protocol does, where
        they overlap, how to wire them into a production agent
        with the Stripe Agent Toolkit, and the trade-offs that
        push a team toward one rail over another.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        The shift is structural. Stripe reported that 700+ AI
        agent startups launched on its platform in 2024, and
        the number kept growing through 2025 and into 2026. At
        the same time, the surface that classic e-commerce was
        built for - a human reading a product page, clicking a
        button, entering a card number - is the part the agent
        wants to skip. The agent reads structured data, picks
        an option on the user&rsquo;s behalf, and asks for
        permission to pay. The old web checkout was never
        designed for that flow, and every team that tried to
        bolt agents onto it ran into the same two problems:
        identity (which user is this agent acting for) and
        authorization (did the user agree to this exact
        purchase, at this exact price, with this exact
        merchant).
      </p>
      <p className="mb-6 leading-relaxed">
        The four protocols that landed in late 2025 and early
        2026 each pick a different layer of that problem.
        AP2 from Google handles the authorization and trust
        layer. ACP from Stripe and OpenAI handles the checkout
        and merchant integration layer. x402 from Coinbase
        handles the settlement layer for stablecoins over HTTP.
        MPP from Stripe and Tempo bridges stablecoin and fiat
        rails through a session model with pre-authorized
        spending. They are more complementary than they are
        competitive, and a production agent that does more than
        one job often touches more than one of them.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>April 29, 2025</strong>: Mastercard
          announces Agent Pay, a framework that lets verified
          AI agents transact for a consumer using a tokenized
          credential and a Verifiable Intent signal shared
          with the network.
        </li>
        <li>
          <strong>September 2025</strong>: Stripe and OpenAI
          publish the Agentic Commerce Protocol (ACP) under
          the Apache 2.0 license, with REST endpoints for
          create, update, complete, and cancel checkout. The
          Shared Payment Token is the payment primitive.
        </li>
        <li>
          <strong>September 16, 2025</strong>: Google announces
          the Agent Payments Protocol (AP2) with 60+ partners
          including Adyen, American Express, Mastercard,
          PayPal, Coinbase, Revolut, and Worldpay. AP2 is an
          extension of A2A and MCP.
        </li>
        <li>
          <strong>September 2025</strong>: Coinbase and
          Cloudflare launch the x402 Foundation. x402 reuses
          the HTTP 402 status code for instant stablecoin
          payments, mostly USDC on Base and other L2 chains.
        </li>
        <li>
          <strong>October 14, 2025</strong>: Visa publishes
          the Trusted Agent Protocol so merchants can tell a
          legitimate commerce agent from a scraper or a bot,
          using a signed token in the request headers.
        </li>
        <li>
          <strong>December 2025</strong>: x402 V2 ships with
          wallet-based identity, dynamic payment recipients,
          and multi-chain support across Base, Ethereum,
          Polygon, Solana, Avalanche, and Sui.
        </li>
        <li>
          <strong>February 2026</strong>: OpenAI launches
          Instant Checkout in ChatGPT with US Etsy sellers
          using ACP. Stripe integrates x402 for USDC payments
          on Base. Salesforce, Shopify, and PayPal announce
          ACP support.
        </li>
        <li>
          <strong>March 2026</strong>: OpenAI scales back
          in-chat checkout and pivots to an app-based model.
          ACP remains the open standard for the agent to
          merchant contract.
        </li>
        <li>
          <strong>March 18, 2026</strong>: Stripe and Tempo
          launch the Machine Payments Protocol (MPP) alongside
          Tempo&rsquo;s mainnet. 100+ services are integrated
          at launch. Visa extends MPP to card payments and
          Lightspark extends it to Bitcoin Lightning.
        </li>
        <li>
          <strong>April 2026 (Stripe Sessions)</strong>:
          Stripe ships its full Agentic Commerce Suite: Links
          wallet for agents, Shared Payment Tokens, MPP, Radar
          fraud defenses tuned for agent traffic, and Tempo
          micropayments.
        </li>
        <li>
          <strong>2026 (Visa Payments Forum)</strong>: Visa
          announces AI, stablecoin, and tokenization
          extensions to Intelligent Commerce, plus Intelligent
          Commerce Connect so agents can discover and check
          out across any card network or rail.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four-layer mental model
      </h2>
      <p className="mb-6 leading-relaxed">
        A production agent that takes money for a user crosses
        four layers, and each protocol fits in one of them.
        Holding the layers separate is the cleanest way to
        avoid the confusion of comparing AP2 to x402 head to
        head when they do not actually solve the same problem.
      </p>
      <CodeBlock
        language="bash"
        filename="agentic commerce stack"
        code={`+------------------------------------------------------+
|  Layer 4: Trust and identity                         |
|  Who is this agent? Who is it acting for?            |
|  Visa Trusted Agent Protocol, Mastercard Verifiable  |
|  Intent, Experian Agent Trust, FIDO credentials      |
+------------------------------------------------------+
                       |
                       v
+------------------------------------------------------+
|  Layer 3: Authorization (intent and consent)         |
|  Did the user authorize this exact purchase?         |
|  AP2 Intent Mandate, AP2 Cart Mandate, AP2 Payment   |
|  Mandate, all signed with verifiable credentials     |
+------------------------------------------------------+
                       |
                       v
+------------------------------------------------------+
|  Layer 2: Checkout (agent to merchant contract)      |
|  How does the agent build a cart and complete it?    |
|  ACP REST endpoints: create / update / complete /    |
|  cancel checkout, Stripe Shared Payment Tokens       |
+------------------------------------------------------+
                       |
                       v
+------------------------------------------------------+
|  Layer 1: Settlement (the money moving)              |
|  How does the value actually transfer?               |
|  Cards (Visa, Mastercard, Amex), bank transfer,      |
|  stablecoins (x402 on HTTP, MPP sessions on Tempo)   |
+------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        A travel agent that books a flight for a user might
        touch all four layers in a single run. Visa Trusted
        Agent Protocol identifies it to the airline as a real
        agent on a real card network. AP2 captures the
        user&rsquo;s Intent Mandate (round trip, under $700,
        first weekend of November) and the Cart Mandate the
        user signs after the agent picks a fare. ACP runs the
        actual checkout against the airline&rsquo;s endpoint.
        Stripe Issuing or a card network rail moves the money.
        A different agent that pays an API per call for a data
        feed never leaves Layer 1 and Layer 4, and runs the
        whole flow through x402.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        ACP: how an agent talks to a merchant
      </h2>
      <p className="mb-6 leading-relaxed">
        The Agentic Commerce Protocol is the thinnest of the
        four. It defines four REST endpoints on the
        merchant&rsquo;s side and the Shared Payment Token
        primitive on the payment processor&rsquo;s side. The
        agent fetches a product catalog, calls the merchant to
        create a checkout, the merchant returns the cart, the
        agent updates or completes it, and the merchant
        captures the payment using the Shared Payment Token
        the agent provides. The merchant stays the merchant of
        record. The agent never sees the underlying card
        number. The token is single-use, scoped to a specific
        amount, currency, and time window.
      </p>
      <CodeBlock
        language="bash"
        filename="ACP create checkout (curl)"
        code={`POST https://merchant.example.com/checkout
Content-Type: application/json
Authorization: Bearer <merchant-issued agent key>

{
  "items": [
    { "sku": "tee-blk-l", "quantity": 1 }
  ],
  "buyer": {
    "email": "user@example.com",
    "shipping_address": { "country": "US", "postal_code": "94110" }
  },
  "payment": {
    "type": "shared_payment_token",
    "token": "spt_1Nz9q..."
  }
}

200 OK
{
  "checkout_id": "chk_01HW...",
  "status": "ready_for_payment",
  "totals": { "subtotal": 2600, "tax": 240, "shipping": 500, "grand": 3340 },
  "currency": "usd"
}`}
      />
      <p className="mb-6 leading-relaxed">
        The Shared Payment Token is what makes the flow safe.
        The user gives the agent the right to spend up to a
        capped amount with a specific merchant, the payment
        processor mints a one-time token bound to those rules,
        and the agent hands the token to the merchant in the
        same body that holds the cart. If the agent goes off
        the rails, the worst case is a single purchase at the
        cap, not an open line of credit. ChatGPT&rsquo;s
        Instant Checkout used this exact shape with Etsy
        sellers; OpenAI later moved the consumer surface into
        an app-based model, but the protocol stayed open and
        Shopify, Salesforce, and PayPal are all shipping ACP
        servers on top of it.
      </p>
      <p className="mb-6 leading-relaxed">
        ACP is the right starting point for any team that
        already runs a regular web checkout. The endpoints map
        cleanly onto an existing cart and order service, the
        Shared Payment Token slots in where the card form used
        to be, and you keep your existing fraud controls. The
        gap it does not fill is what authorized the agent to
        act for the user in the first place. That is the AP2
        layer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AP2: mandates as the agent&rsquo;s permission slip
      </h2>
      <p className="mb-6 leading-relaxed">
        AP2 is the trust and authorization layer. The core
        primitive is the Mandate, a tamper-proof,
        cryptographically signed JSON-LD object that records
        what the user told the agent to do. There are three
        kinds. The Intent Mandate captures the original
        instruction (find me a green winter jacket, up to 20%
        more than the base price). The Cart Mandate records
        the exact items, prices, and merchant the user agreed
        to (or, in delegated mode, the bounded set the agent
        is allowed to pick from on its own). The Payment
        Mandate is the artifact shared with the payment
        network to signal that an agent (not a human at a
        keyboard) initiated the transaction.
      </p>
      <p className="mb-6 leading-relaxed">
        Mandates are signed with W3C Verifiable Credentials,
        which means any party in the chain (the agent, the
        merchant, the payment provider, the card network) can
        verify that the signature came from the user and that
        the payload has not been tampered with. The chain from
        Intent to Cart to Payment is what gives the network a
        clean answer to the three hard questions: authorization
        (did the user say yes), authenticity (does this match
        what the user actually wanted), and accountability (if
        something goes wrong, whose signature is on the bad
        step).
      </p>
      <CodeBlock
        language="json"
        filename="AP2 Cart Mandate (illustrative)"
        code={`{
  "@context": ["https://www.w3.org/ns/credentials/v2", "https://ap2.dev/v1"],
  "type": ["VerifiableCredential", "CartMandate"],
  "issuer": "did:web:user.example.com",
  "validFrom": "2026-06-28T10:00:00Z",
  "validUntil": "2026-06-28T10:15:00Z",
  "credentialSubject": {
    "agent": "did:web:agent.example.com",
    "merchant": "did:web:etsy.example.com",
    "items": [
      { "sku": "tee-blk-l", "qty": 1, "price": 2600 }
    ],
    "totals": { "grand": 3340, "currency": "usd" },
    "intentMandate": "urn:uuid:71b9c7e0-..."
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "ecdsa-rdfc-2019",
    "verificationMethod": "did:web:user.example.com#key-1",
    "proofValue": "z3Jb5..."
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        Two transaction modes drop out of this. In the
        human-present mode, the agent shows the cart to the
        user, the user signs the Cart Mandate in real time
        (passkey, hardware key, or device-bound credential),
        and the agent completes the checkout. In the delegated
        mode, the user signs an Intent Mandate ahead of time
        (buy the concert tickets the moment they go on sale,
        up to $400 a seat), and the agent can later mint a
        Cart Mandate on the user&rsquo;s behalf inside the
        bounds the Intent Mandate set. The cryptographic chain
        is the same either way; the difference is who is
        holding the phone when the Cart Mandate is signed.
      </p>
      <p className="mb-6 leading-relaxed">
        AP2 extends A2A and MCP, which means an agent that
        already speaks either of those protocols can carry
        Mandates as part of a normal message. The
        A2A x402 extension, built with Coinbase, Ethereum
        Foundation, and MetaMask, plugs AP2 into stablecoin
        rails so the same Mandate that authorizes a card
        purchase can authorize an on-chain payment.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        x402: HTTP 402 finally has a job
      </h2>
      <p className="mb-6 leading-relaxed">
        The HTTP 402 status code has sat in the spec marked
        &quot;reserved for future use&quot; for thirty years.
        Coinbase wrote that future. x402 lets a server return
        a 402 Payment Required response with a small JSON body
        that says how much, in what currency, and to which
        wallet. The client (typically an agent) signs a payment
        with its own wallet, attaches it as a header, retries
        the request, and gets the resource. There are no
        accounts, no API keys, no contracts. The whole
        transaction is one extra round trip and a signature.
      </p>
      <CodeBlock
        language="bash"
        filename="x402 round trip"
        code={`# 1. Agent requests a paid resource
GET /v1/forecast?city=sf HTTP/1.1
Host: weather.example.com

HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "x402Version": 2,
  "accepts": [
    {
      "scheme": "exact",
      "network": "base",
      "asset": "USDC",
      "amount": "0.01",
      "payTo": "0x4Ae3...c91"
    }
  ],
  "resource": "/v1/forecast?city=sf"
}

# 2. Agent signs and retries
GET /v1/forecast?city=sf HTTP/1.1
Host: weather.example.com
X-Payment: eyJzY2hlbWUiOiJleGFjdCIs...

HTTP/1.1 200 OK
{ "city": "San Francisco", "temp_f": 68, "summary": "Foggy" }`}
      />
      <p className="mb-6 leading-relaxed">
        The settlement is on-chain (USDC on Base, with support
        for Ethereum, Polygon, Solana, Avalanche, Sui, and
        others through V2). The gas cost on Base is fractions
        of a cent, which is why the protocol is the cleanest
        fit for high-frequency, low-value calls: paying per
        page of a paid news API, per million tokens of an LLM
        proxy, per query of a data lookup, per second of a
        compute job. Cloudflare and Stripe both shipped first
        class x402 support in 2026, and Stripe&rsquo;s
        integration on Base in February 2026 turned x402 into
        a regular Stripe rail you can settle into a fiat
        balance.
      </p>
      <p className="mb-6 leading-relaxed">
        x402 does two things that the older Web2 patterns
        struggle with. It removes account creation as a
        bottleneck: an agent that has never seen a service can
        pay it on the first request. And it works at machine
        rates: there is no human-in-the-loop step, no card
        capture, no chargeback risk, because the payment
        clears in the same TCP connection as the resource.
        That makes it the right rail for agent-to-agent
        commerce, and the wrong rail for buying physical
        goods.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MPP: sessions for streaming micropayments
      </h2>
      <p className="mb-6 leading-relaxed">
        The Machine Payments Protocol from Stripe and Tempo,
        launched March 18, 2026, sits on a different problem.
        x402 is great for one-off paid requests, but an agent
        that streams thousands of small calls per second
        cannot afford a separate on-chain transaction for each
        one. MPP&rsquo;s answer is the session: the agent
        signs one Shared Payment Token up front that says
        &quot;I will spend up to X with this counterparty for
        the next N minutes,&quot; the counterparty opens a
        session bound to that token, and inside the session
        the agent streams granular debits with no per-call
        on-chain hop. Settlement happens at session close (or
        on a watermark) against Tempo&rsquo;s EVM-compatible
        chain.
      </p>
      <p className="mb-6 leading-relaxed">
        Tempo is the chain Stripe co-built for this exact
        purpose. There is no native gas token: fees are paid
        in any major stablecoin through an integrated AMM, so
        the agent never has to hold a separate gas balance.
        Visa extended MPP to card-based settlement at launch,
        which means the same session interface works whether
        the back end is USDC on Tempo or a regular Visa
        authorization. Lightspark extended it to Bitcoin
        Lightning for teams that want sub-cent payments
        without an L2 ledger.
      </p>
      <p className="mb-6 leading-relaxed">
        The shape MPP is built for is the long-running agent
        run: a research agent that pays a search API per
        query, then a vector store per retrieval, then an LLM
        per token, then a sandbox per second of compute,
        across hundreds of separate vendors, all within a
        single user session. Without MPP that is hundreds of
        x402 hops; with MPP it is one session per vendor and
        the per-call accounting stays off the chain.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The Stripe Agent Toolkit: getting an agent paid (or paying) in code
      </h2>
      <p className="mb-6 leading-relaxed">
        The Stripe Agent Toolkit is the easiest on-ramp for a
        team that already runs a TypeScript or Python agent.
        It exposes a curated subset of the Stripe API as
        function-calling tools that drop into Vercel&rsquo;s
        AI SDK, LangChain, CrewAI, and the OpenAI Agents SDK.
        The toolkit is built on top of the regular Stripe
        Node.js and Python SDKs, so it inherits the same auth,
        retry, and idempotency behavior. Scoping the surface
        is the entire point: you pass an{" "}
        <code>actions</code> map that says which Stripe
        primitives the agent is allowed to touch, and the
        toolkit only exposes those tools to the model.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/billing-agent.ts"
        code={`import { StripeAgentToolkit } from "@stripe/agent-toolkit/ai-sdk";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const toolkit = new StripeAgentToolkit({
  secretKey: process.env.STRIPE_SECRET_KEY!,
  configuration: {
    actions: {
      payment_links: { create: true },
      products:      { create: true },
      prices:        { create: true },
      invoices:      { create: true, finalize: true },
    },
  },
});

const result = await generateText({
  model: openai("gpt-4o"),
  tools: { ...toolkit.getTools() },
  maxSteps: 5,
  prompt: "Send accounting@acme.com an invoice for $1,200 for the May retainer.",
});`}
      />
      <p className="mb-6 leading-relaxed">
        Three operational details carry the production work.
        Use restricted Stripe API keys: the toolkit will
        happily fail-closed on a permission it does not have,
        and the restricted key is a second line of defense
        against a misbehaving model. Keep the{" "}
        <code>actions</code> map as narrow as the task allows;
        the toolkit only sends tool definitions for the
        actions you turn on, which keeps the prompt small and
        the tool selection accurate. And use the response
        trimming the toolkit ships with: it strips Stripe API
        responses down to the IDs and URLs the agent actually
        needs, which keeps multi-step flows clean and prevents
        sensitive payloads from leaking into the model
        context.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Stripe Issuing: virtual cards as the agent&rsquo;s wallet
      </h2>
      <p className="mb-6 leading-relaxed">
        When the agent needs to spend money out into the world
        (not just take money in), the cleanest pattern in 2026
        is still a virtual card from Stripe Issuing. The
        toolkit mints a single-use card scoped to one merchant
        and one amount, the agent uses it to pay through the
        merchant&rsquo;s normal checkout, and the card is
        deactivated after the authorization clears. The
        spending control is enforced at the network level, not
        just in your code, so even if the agent goes off the
        rails the card cannot be reused or charged for more
        than the cap.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/travel-agent.ts"
        code={`import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function mintCardForFlight(opts: {
  cardholderId: string;
  amountUsdCents: number;
  merchantHint: string;
}) {
  const card = await stripe.issuing.cards.create({
    cardholder: opts.cardholderId,
    currency: "usd",
    type: "virtual",
    spending_controls: {
      spending_limits: [
        { amount: opts.amountUsdCents, interval: "all_time" },
      ],
      allowed_merchant_countries: ["US"],
    },
    metadata: {
      agent_run_id: opts.merchantHint,
      single_use: "true",
    },
  });

  return card;
}`}
      />
      <p className="mb-6 leading-relaxed">
        Pair this with a webhook on the Issuing
        {" "}<code>authorization.request</code> event, and you
        get a final, programmatic check before the network
        approves the charge. The webhook reads the
        authorization details (amount, merchant, currency),
        compares them against the AP2 Cart Mandate or the
        intent the user signed off on, and approves or
        declines in real time. The agent decides what to buy;
        the webhook decides whether what the network is about
        to charge actually matches what was authorized. That
        double-keyed check is the single most important
        production pattern for agents that spend real money.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A worked example: a shopping agent end to end
      </h2>
      <p className="mb-6 leading-relaxed">
        Wiring the layers together looks like the flow below.
        The user asks an agent to buy a pair of shoes. The
        agent searches an ACP-compatible merchant catalog,
        builds a cart, presents it to the user, captures a
        signed Cart Mandate, mints a virtual card scoped to
        the cart total, and completes the ACP checkout. The
        webhook on the Issuing authorization confirms that
        the merchant about to charge matches the Cart Mandate
        before the network approves.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/shopping-agent.ts"
        code={`async function buyShoes(userId: string, query: string) {
  const intent = await captureIntentMandate(userId, query);

  const candidates = await acpSearch(merchantBaseUrl, query, {
    maxPrice: intent.priceCap,
    size: intent.size,
  });

  const choice = await askUserToPick(userId, candidates);
  const cart = await acpCreateCheckout(merchantBaseUrl, {
    items: [{ sku: choice.sku, quantity: 1 }],
    buyer: { email: intent.email, shipping_address: intent.address },
  });

  const cartMandate = await captureCartMandate(userId, {
    intentMandateId: intent.id,
    merchant: cart.merchant_id,
    items: cart.items,
    grandTotal: cart.totals.grand,
  });

  const card = await mintCardForFlight({
    cardholderId: intent.cardholderId,
    amountUsdCents: cart.totals.grand,
    merchantHint: cart.merchant_id,
  });

  const sharedPaymentToken = await stripe.paymentMethods.create({
    type: "card",
    card: { token: card.number_token! },
    metadata: { cart_mandate_id: cartMandate.id },
  });

  return acpCompleteCheckout(merchantBaseUrl, cart.checkout_id, {
    payment: { type: "shared_payment_token", token: sharedPaymentToken.id },
  });
}`}
      />
      <p className="mb-6 leading-relaxed">
        The same agent can run in delegated mode (the user
        signs only the Intent Mandate, the agent later signs
        the Cart Mandate on their behalf) by swapping
        {" "}<code>captureCartMandate</code> for an agent-side
        signer bound to the same key. The downstream layers do
        not change. That is the design goal of AP2: the
        signature changes hands, but the merchant, network,
        and processor see the same shape.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Card network trust: Visa and Mastercard catch up
      </h2>
      <p className="mb-6 leading-relaxed">
        The card networks shipped their own trust layers on
        top of these protocols through 2025 and 2026. Visa
        Trusted Agent Protocol, published in October 2025,
        lets a merchant tell a real commerce agent from a
        scraper by reading a signed token in the request
        headers. The token is issued by Visa to a vetted agent
        operator (Visa, Mastercard, Amex, or a partner like
        Experian Agent Trust) and the merchant can verify it
        without leaving the existing payment auth path. Visa
        Intelligent Commerce Connect, announced at Visa
        Payments Forum 2026, gives the agent a single rail to
        discover merchants and check out across any card
        network or alternative payment method.
      </p>
      <p className="mb-6 leading-relaxed">
        Mastercard Agent Pay, announced April 2025, takes a
        similar shape: a tokenized credential bound to the
        user, a Verifiable Intent signal shared with the
        network, and a fraud model that knows the
        authorization came from an agent. Mastercard is also
        the named partner inside Google&rsquo;s AP2, which
        means the same Cart Mandate the agent signs can flow
        through to the Mastercard network as a Payment
        Mandate. American Express is in both AP2 and the Stripe
        toolkit&rsquo;s payment rails.
      </p>
      <p className="mb-6 leading-relaxed">
        The headline change is that the networks are no longer
        treating agent traffic as a fraud risk to be flagged
        and blocked. They are issuing identity to the agents,
        defining the data shape the agent has to send, and
        scoring agent traffic on its own track. Stripe Radar
        added agent-specific fraud defenses in 2026 that read
        the AP2 Payment Mandate and the Visa Trusted Agent
        token as positive signals rather than red flags. For a
        team that wants the highest authorization rate, that
        is the bar to clear.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Three patterns carry most of the production work we
        see in 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Conversational shopping inside chat
        surfaces.</strong> The OpenAI and Etsy pilot in
        February 2026 was the first at-scale ACP deployment:
        US Etsy sellers exposed an ACP endpoint, and ChatGPT
        Instant Checkout drove cart creation through it.
        OpenAI scaled the in-chat surface back in March 2026
        and moved to an app-based pattern, but the protocol
        won: Shopify, Salesforce, and PayPal all shipped ACP
        servers, and the merchant side of the integration
        looks the same in every chat or copilot surface. For a
        SaaS merchant, the integration cost is one endpoint
        and one webhook on Issuing or Shared Payment Tokens.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-to-agent and API-to-agent commerce.</strong>{" "}
        x402 is the load-bearing piece here. A research agent
        pays a search API per query, a coding agent pays a
        sandbox per second of compute, a content agent pays an
        image model per generation. None of these need a
        signed Cart Mandate, none need a Stripe checkout, none
        need a human in the loop. The 402 round trip is the
        whole protocol. Cloudflare ships native x402 on Workers,
        Stripe settles x402 USDC into a fiat balance, and the
        Coinbase Developer Platform issues the wallets. The
        unit economics finally line up for paid APIs that
        only see one or two cents per call.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Enterprise procurement and B2B workflows.</strong>{" "}
        AP2&rsquo;s strongest fit is the audit trail. An
        enterprise that lets agents buy SaaS licenses, cloud
        resources, or partner services through Google Cloud
        Marketplace can hold every transaction back to a user
        signed Intent Mandate and a Cart Mandate inside the
        bounds the procurement team set. The chain of
        signatures is the artifact compliance asks for, and
        the per-transaction cost is the same as the underlying
        card or stablecoin rail. Intuit, Salesforce, and
        ServiceNow all called out this exact shape in their
        AP2 partner statements.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AP2 vs ACP vs x402 vs MPP: when to pick which
      </h2>
      <p className="mb-6 leading-relaxed">
        The four protocols solve different problems. The
        honest read on each.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick ACP first if you sell something.</strong>{" "}
        A merchant that already runs a regular web checkout
        has the most to gain and the least to change. Map the
        four endpoints onto the existing cart and order
        service, accept Stripe Shared Payment Tokens or a PSP
        equivalent, and the agent surface comes online. ACP
        does not handle the user authorization layer, so pair
        it with AP2 (or with the Stripe SPT itself, which
        carries the equivalent scoping for the simpler cases).
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick AP2 if you need an audit trail or
        delegated purchases.</strong> Any flow where the user
        is not at the keyboard when the agent buys (delegated
        tasks, autonomous monitoring, multi-agent procurement)
        needs the Mandate chain. The same is true for any
        regulated workflow where you have to prove later that
        a specific human authorized a specific spend. AP2 is
        also the natural place to land if you want one
        authorization framework across both card and
        stablecoin rails: the A2A x402 extension makes that
        explicit.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick x402 for the machine economy.</strong>{" "}
        Agent-to-agent payments, paid APIs, micropayments for
        compute or data, anywhere the unit value is too small
        for a card transaction to be economic. The HTTP-native
        flow is the lowest-friction option in the stack, and
        the V2 multi-chain support means you can pick the
        settlement chain that fits the latency you need.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick MPP when sessions are the right
        unit.</strong> Long-running agents that hit one
        counterparty many times in a single run (a research
        agent paying an LLM proxy by the token, a coding agent
        paying a sandbox by the second) get cleaner economics
        and cleaner accounting from MPP&rsquo;s session model
        than from a string of separate x402 hops. MPP also
        wins when you want one interface across stablecoin and
        card rails.
      </p>
      <p className="mb-6 leading-relaxed">
        A short decision rule we use on engagements. If your
        agent buys physical or digital goods from merchants,
        ACP and AP2 together. If your agent pays APIs or other
        agents, x402 or MPP depending on cardinality. If your
        agent does both (a personal assistant that books a
        flight and also pays per query for a hotel review
        data feed), expect to wire all four, and lean on
        platforms like Stripe, Crossmint, or Cloudflare to
        keep the integration count to one API surface.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        Agentic commerce in 2026 is a real industry shift, but
        not every team should jump in tomorrow. An honest list
        of the trade-offs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> The protocols are open and
        cross-vendor. ACP is Apache 2.0, AP2 ships with a
        reference implementation on GitHub, x402 is governed
        by an independent foundation, and MPP shipped with
        100+ launch integrations. The big networks (Visa,
        Mastercard, Amex) and the big merchants (Etsy,
        Shopify, Salesforce) are aligned on the same shape,
        which is the kind of multi-vendor consensus the agent
        ecosystem has been missing. The implementation cost
        for a regular merchant is low: ACP is four REST
        endpoints, AP2 is signing a JSON-LD blob, x402 is one
        new HTTP status code path, MPP is one session lifecycle.
        The Stripe Agent Toolkit gives a TypeScript or Python
        team a paying agent in roughly twenty lines of code.
        The card network trust layers (Visa Trusted Agent,
        Mastercard Verifiable Intent) close the
        agent-vs-scraper gap that was a real blocker for
        merchant acceptance through 2024 and 2025.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The standards are young
        and still evolving. ACP&rsquo;s pivot from in-chat
        checkout to an app-based pattern in March 2026 shows
        the consumer surface is still finding its shape, even
        if the protocol itself stayed stable. AP2&rsquo;s
        cryptographic mandate flow needs a credential
        infrastructure (Verifiable Credentials, passkeys, or a
        FIDO setup) that not every team has in place. x402
        only settles in stablecoins today, which is a
        regulatory and accounting overhead some teams are not
        ready for. MPP depends on Tempo, a new chain with a
        production track record measured in months rather than
        years. Fraud models for agent traffic are still being
        tuned, and the first few months of agent-initiated
        payments will see authorization-rate noise on
        non-Trusted-Agent rails. And the lock-in question is
        real: a team that builds the whole agent on the Stripe
        Suite gets the lowest-friction path but has fewer
        cross-vendor escape hatches than a team that builds on
        the open protocols directly.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> A static website
        with a regular human-driven checkout and no agent
        traffic does not need any of this; ship a regular
        Stripe Checkout and move on. A team without a clear
        authorization model for what their agent should be
        allowed to spend should fix that policy first; the
        protocols make it possible to delegate spending, but
        they do not pick the spend limits for you. And teams
        with a hard requirement for chargeback-style consumer
        protection should stay on card rails: stablecoin
        settlement is final, x402 has no built-in dispute
        process, and MPP&rsquo;s on-chain settlement inherits
        that property unless you route through the Visa or
        Stripe extension.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: late 2026 and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the next twelve months in agentic
        commerce.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The four protocols converge on one
        stack.</strong> Crossmint and Stripe already expose a
        single API that wraps ACP, AP2, x402, and MPP. By late
        2026 most production agents will pick one of those
        wrappers and let the platform pick the right rail per
        transaction. The protocol choice becomes a runtime
        decision (this is a $40 t-shirt, route through ACP and
        a Visa card; this is a $0.001 API call, route through
        x402 on Base) rather than a build-time integration.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Merchant-of-record platforms eat the long
        tail.</strong> Most small merchants will not implement
        ACP themselves. They will plug into a merchant-of-
        record platform (Shopify, Crossmint, Lemon Squeezy,
        Paddle) that exposes their catalog over ACP and
        handles the tax, chargeback, and fraud surface on
        their behalf. The pattern looks a lot like Stripe&rsquo;s
        Connect business but with a chat agent at the front
        end instead of a marketplace UI.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Verifiable Credentials become a default
        consumer login.</strong> The AP2 Mandate chain depends
        on the user holding a key that can sign on a phone or
        a hardware device. The FIDO Alliance and the W3C
        Verifiable Credentials community are converging on a
        shape where the same passkey that signs into a website
        also signs the Intent and Cart Mandates the agent
        carries. By late 2026 we expect at least one major
        consumer surface (likely a phone OS) to ship this end
        to end.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent identity becomes the new merchant
        SEO.</strong> The Visa Trusted Agent Protocol,
        Mastercard Verifiable Intent, and similar tokens give
        merchants a way to prioritize traffic from verified
        agents. Just as merchants invested in SEO in the
        2010s and in mobile-friendly checkout in the 2020s,
        the late-2026 work is making your merchant readable
        and trusted to agents: a structured catalog, ACP
        endpoints, AP2 Mandate acceptance, and a Trusted
        Agent token policy in your fraud system.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: stop guessing about the rail, start
        building for the agent
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about agentic commerce in 2026
        is how quickly the question shifted. A year ago the
        argument was whether agents should be allowed to pay
        at all, and what the consumer-protection story would
        look like. Today the protocols are written, the card
        networks are issuing agent identity, the open-source
        SDKs are shipped, and the only real question is which
        rail fits your workload. ACP and AP2 cover the human-
        present and delegated commerce cases; x402 and MPP
        cover the machine-to-machine case. Stripe ships the
        toolkit that wires all four into a regular agent, Visa
        and Mastercard ship the trust layer the merchants need,
        and Cloudflare, Crossmint, and the OpenAI Agents SDK
        all ship native integrations.
      </p>
      <p className="mb-6 leading-relaxed">
        For a SaaS or e-commerce team in 2026, the move is
        incremental: expose your catalog over ACP, accept
        Shared Payment Tokens, accept AP2 Mandates as a
        positive fraud signal, and join the Visa or Mastercard
        trusted agent program. For an agent builder, the move
        is also incremental: pick a platform that already
        speaks more than one rail, use restricted API keys and
        scoped virtual cards for every spend, and treat the
        Mandate chain as the audit trail your finance and
        compliance teams will eventually ask for. The
        protocols make the hard parts of the integration
        someone else&rsquo;s problem. What is left is the part
        that always was the hard part: deciding what your
        agent is allowed to do with the user&rsquo;s money,
        and being able to prove later that it did exactly
        that.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.agenticcommerce.dev/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agentic Commerce Protocol (ACP) home
          </a>
          {" "}- the open-source specification, the four REST
          endpoints, the Shared Payment Token spec, and the
          live demo with Etsy and Cartsy.
        </li>
        <li>
          <a
            href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud: Announcing the Agent Payments Protocol (AP2)
          </a>
          {" "}- the September 16, 2025 launch post that
          introduces Mandates, the 60+ partner list, the A2A
          x402 extension, and the human-present versus
          delegated transaction modes.
        </li>
        <li>
          <a
            href="https://docs.cdp.coinbase.com/x402/welcome"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coinbase Developer Platform: x402 documentation
          </a>
          {" "}- the HTTP 402 protocol reference, the V2
          multi-chain support, and the wallet-based identity
          flow.
        </li>
        <li>
          <a
            href="https://stripe.com/guides/agentic-commerce"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe: What is agentic commerce
          </a>
          {" "}- the Stripe overview of the agentic economy,
          agent-initiated payments, MCP, and the Stripe Agent
          Toolkit.
        </li>
        <li>
          <a
            href="https://stripe.dev/blog/adding-payments-to-your-agentic-workflows"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe Dev: Adding payments to your agentic workflows
          </a>
          {" "}- the Stripe Agent Toolkit walkthrough with
          Vercel AI SDK, LangChain, and CrewAI, including the
          metered-billing middleware and Stripe Issuing virtual
          card pattern.
        </li>
        <li>
          <a
            href="https://www.crossmint.com/learn/agentic-payments-protocols-compared"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Crossmint: Agentic payments protocols compared
          </a>
          {" "}- a side-by-side of ACP, AP2, x402, and MPP
          with the production-readiness reads on each as of
          early 2026.
        </li>
        <li>
          <a
            href="https://www.mastercard.com/us/en/news-and-trends/stories/2026/verifiable-intent.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mastercard: Verifiable Intent in agentic AI commerce
          </a>
          {" "}- the network-level read on Mastercard Agent
          Pay, Verifiable Intent, and the FIDO Alliance
          collaboration.
        </li>
        <li>
          <a
            href="https://investor.visa.com/news/news-details/2026/Visa-Announces-New-AI-Stablecoin-and-Token-Innovations-to-Power-Intelligent-Programmable-Commerce-at-Visa-Payments-Forum/default.aspx"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visa: AI, stablecoin, and token innovations at
            Visa Payments Forum 2026
          </a>
          {" "}- the Visa Intelligent Commerce roadmap, the
          Trusted Agent Protocol updates, and Intelligent
          Commerce Connect.
        </li>
        <li>
          <a
            href="https://www.mindstudio.ai/blog/stripe-agentic-commerce-suite-5-new-primitives-ai-agents-buy-pay"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MindStudio: Stripe&rsquo;s Agentic Commerce Suite
            broken down
          </a>
          {" "}- the five-primitive walkthrough of the Stripe
          Sessions 2026 announcements (Links wallet, Shared
          Payment Tokens, MPP, Radar for agents, Tempo
          micropayments).
        </li>
        <li>
          <a
            href="https://docs.stripe.com/agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe Agent Toolkit documentation
          </a>
          {" "}- the canonical reference for the toolkit, the
          supported actions, the restricted-key pattern, and
          the metered-billing middleware.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the deeper read on the Model Context
          Protocol that AP2 and the Stripe Agent Toolkit both
          build on.
        </li>
        <li>
          <a
            href="/articles/a2a-protocol-cross-vendor-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            A2A: the cross-vendor agent protocol in 2026
          </a>
          {" "}- the A2A protocol that AP2 extends, with the
          full picture of how cross-vendor agents talk to
          each other.
        </li>
        <li>
          <a
            href="/articles/ai-agent-security-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent security in 2026
          </a>
          {" "}- the broader security model that agentic
          commerce sits inside, including identity, scoped
          credentials, and policy enforcement.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production 2026
          </a>
          {" "}- the cognition-layer SDK that pairs with the
          Stripe Agent Toolkit and the ACP merchant surface.
        </li>
        <li>
          <a
            href="/articles/cloudflare-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Cloudflare Agents in production 2026
          </a>
          {" "}- the edge platform that ships native x402
          support and is part of the x402 Foundation co-
          governance.
        </li>
        <li>
          <a
            href="/articles/cutting-openai-costs-production"
            className="font-semibold text-primaryColor hover:underline"
          >
            Cutting OpenAI costs in production
          </a>
          {" "}- the cost-control read that pairs cleanly with
          the metered-billing patterns the Stripe Agent
          Toolkit ships for charging users for agent work.
        </li>
      </ul>
    </div>
  );
}
