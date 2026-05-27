import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Linea",
  description:
    "Privacy Policy for Linea - the Reactify Solutions Forge app that connects Confluence with Linear. Linea does not collect, store, or transmit personal data to Reactify Solutions.",
  alternates: { canonical: "/privacy-policy/linea" },
  openGraph: {
    title: "Privacy Policy · Linea",
    description:
      "Linea is a Confluence Forge app that connects to Linear and does not collect any personal data.",
    url: "/privacy-policy/linea",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · Linea | Reactify Solutions",
    description:
      "Linea is a Confluence Forge app that connects to Linear and does not collect any personal data.",
  },
};

const LAST_UPDATED = "27 April 2026";

export default function LineaPrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb
        pageName="Privacy Policy · Linea"
        description="How Linea, the Reactify Solutions Confluence-to-Linear connector, handles data. Short version: it doesn't collect any."
        contentClassName="mx-auto max-w-4xl"
      />

      <section className="pb-16 pt-4 md:pb-24">
        <div className="container">
          <article className="mx-auto max-w-4xl space-y-10 text-textSecondary">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-textColor">
              last updated · {LAST_UPDATED}
            </p>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                1. About this policy
              </h2>
              <p>
                This Privacy Policy applies specifically to <strong>Linea</strong>,
                a Forge app published by Reactify Solutions on the Atlassian
                Marketplace that connects Confluence with{" "}
                <a
                  href="https://linear.app"
                  className="text-primaryColor hover:underline"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Linear
                </a>
                . Linea is built on the Atlassian Forge platform and runs
                entirely inside Atlassian&rsquo;s infrastructure.
              </p>
              <p>
                For other Reactify Solutions products and our marketing
                website, see our general{" "}
                <a
                  href="/privacy-policy"
                  className="text-primaryColor hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                2. Data we collect
              </h2>
              <p>
                <strong>
                  Linea does not collect, store, or transmit any personal data
                  to Reactify Solutions.
                </strong>{" "}
                We do not operate any backend service that receives data from
                the app, we do not run analytics on usage, and we do not
                profile users in any way.
              </p>
              <p>
                Every action you take in Linea happens between your Confluence
                instance (hosted by Atlassian) and Linear (hosted by Linear).
                Reactify Solutions has no servers in that data path.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                3. How Linea works
              </h2>
              <p>
                To connect Confluence with Linear, Linea relies on two
                platforms:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong>Atlassian Forge</strong> - the app&rsquo;s code runs
                  inside Atlassian&rsquo;s Forge runtime. Any configuration or
                  credentials needed to call Linear (such as a Linear API key
                  you provide) are saved using Forge&rsquo;s secure storage
                  APIs. That storage is operated by Atlassian and never leaves
                  Atlassian&rsquo;s infrastructure.
                </li>
                <li>
                  <strong>Linear API</strong> - when you ask Linea to read or
                  create something in Linear (for example, fetch an issue or
                  link a Confluence page to a Linear issue), the request goes
                  directly from the Forge runtime to{" "}
                  <span className="font-mono text-textColor">api.linear.app</span>
                  . The response is rendered back inside Confluence.
                </li>
              </ul>
              <p>
                No data is copied to Reactify Solutions during any of these
                interactions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                4. Third parties
              </h2>
              <p>
                Because Linea uses Atlassian Forge and the Linear API,
                Atlassian and Linear process data on their own platforms when
                you use the app. Their handling of your data is governed by
                their own policies:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <a
                    href="https://www.atlassian.com/legal/privacy-policy"
                    className="text-primaryColor hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Atlassian Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://linear.app/privacy"
                    className="text-primaryColor hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Linear Privacy Policy
                  </a>
                </li>
              </ul>
              <p>
                Reactify Solutions has no separate sub-processors for Linea.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                5. Cookies &amp; tracking
              </h2>
              <p>
                Linea does not set cookies, use analytics scripts, or include
                tracking pixels. The app only renders inside Confluence via
                Atlassian-managed UI components.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                6. Your rights
              </h2>
              <p>
                Because Reactify Solutions does not hold any personal data
                from Linea users, there is no data on our side to access,
                correct, export, or delete. To manage data held by Atlassian
                or Linear, contact those providers directly through their
                respective accounts and policies.
              </p>
              <p>
                You can remove Linea from your Confluence site at any time
                via the Atlassian admin console; uninstalling the app
                additionally clears any credentials it stored in Forge
                storage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                7. Security
              </h2>
              <p>
                Linea inherits the security model of Atlassian Forge: code
                runs in Atlassian-managed sandboxes, secrets are stored using
                Forge&rsquo;s encrypted storage primitives, and outbound
                network calls are restricted to allow-listed domains
                (Linear&rsquo;s API). All traffic between Forge and Linear is
                encrypted in transit.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                8. Changes to this policy
              </h2>
              <p>
                If we ever change Linea so that it begins collecting personal
                data, we will update this page and announce the change on the
                Atlassian Marketplace listing at least <strong>30 days</strong>{" "}
                before the new behaviour takes effect. The &ldquo;last
                updated&rdquo; date above reflects the most recent revision.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                9. Contact
              </h2>
              <p>
                Questions about Linea or this policy can be directed to{" "}
                <a
                  href="mailto:support@reactify-solutions.com"
                  className="text-primaryColor hover:underline"
                >
                  support@reactify-solutions.com
                </a>
                .
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
