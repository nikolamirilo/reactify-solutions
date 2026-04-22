import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Level Agreement",
  description:
    "Reactify Solutions Service Level Agreement (SLA) for Atlassian Marketplace apps - covering availability targets, support response times, scheduled maintenance, and remedies.",
  alternates: { canonical: "/sla" },
  openGraph: {
    title: "Service Level Agreement",
    description:
      "Availability targets, support response times, and service credits for Reactify Solutions apps on the Atlassian Marketplace.",
    url: "/sla",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Level Agreement | Reactify Solutions",
    description:
      "Availability, support response times, and remedies for Reactify Solutions apps on the Atlassian Marketplace.",
  },
};

const LAST_UPDATED = "22 April 2026";

export default function SLAPage() {
  return (
    <>
      <Breadcrumb
        pageName="Service Level Agreement"
        description="Our commitments to availability, support response, and incident handling for Reactify Solutions apps distributed on the Atlassian Marketplace."
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
                1. Scope
              </h2>
              <p>
                This Service Level Agreement (the &ldquo;SLA&rdquo;) applies to
                paid cloud apps published by Reactify Solutions on the
                Atlassian Marketplace (the &ldquo;Apps&rdquo;). It describes our
                commitments regarding availability and support response times,
                and the remedies available to customers when we do not meet
                those commitments. This SLA does not apply to free apps,
                beta/preview features, or evaluation licenses.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                2. Availability target
              </h2>
              <p>
                Reactify Solutions targets <strong>99.9% monthly uptime</strong>{" "}
                for the backend services powering the Apps, measured per
                calendar month and excluding the events listed in section 6.
                Uptime is calculated as:
              </p>
              <pre className="rounded-md border border-darkBorder bg-darkSurface/60 p-4 font-mono text-xs text-textColor">
                uptime % = (total minutes − unplanned downtime) / total minutes
                × 100
              </pre>
              <p>
                The Atlassian Cloud platform itself (Jira, Confluence, etc.) is
                operated by Atlassian and governed by Atlassian&rsquo;s own
                service commitments; outages originating in the Atlassian
                platform are outside the scope of this SLA.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                3. Support response times
              </h2>
              <p>
                Support is available Monday to Friday, 09:00–18:00 CET,
                excluding public holidays in the European Union. Requests are
                triaged on receipt and responded to according to the severity
                levels below.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-darkBorder text-sm">
                  <thead>
                    <tr className="bg-darkSurface/60 text-left text-white">
                      <th className="border border-darkBorder px-4 py-3 font-semibold">
                        Severity
                      </th>
                      <th className="border border-darkBorder px-4 py-3 font-semibold">
                        Definition
                      </th>
                      <th className="border border-darkBorder px-4 py-3 font-semibold">
                        First response
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-darkBorder px-4 py-3 font-medium text-white">
                        S1 - Critical
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        App is down or a core function is unusable for all
                        users, with no workaround.
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        Within <strong>4 business hours</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-darkBorder px-4 py-3 font-medium text-white">
                        S2 - High
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        A major feature is impaired for many users; a
                        workaround may exist.
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        Within <strong>1 business day</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-darkBorder px-4 py-3 font-medium text-white">
                        S3 - Normal
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        A minor feature is impaired, or a question about
                        configuration or usage.
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        Within <strong>2 business days</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-darkBorder px-4 py-3 font-medium text-white">
                        S4 - Low
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        Cosmetic issues, feature requests, documentation
                        feedback.
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        Within <strong>5 business days</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                &ldquo;First response&rdquo; means an acknowledgement from a
                Reactify Solutions team member that the request has been
                received, assigned a severity, and is being actively worked
                on - not necessarily a final resolution. Resolution time
                depends on the complexity of the issue and, where applicable,
                response times from upstream services such as Atlassian or
                third-party APIs.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                4. How to request support
              </h2>
              <p>
                Submit support requests to{" "}
                <a
                  href="mailto:support@reactify-solutions.com"
                  className="text-primaryColor hover:underline"
                >
                  support@reactify-solutions.com
                </a>
                . Please include:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Your Atlassian site URL</li>
                <li>The name of the App and, if known, its version</li>
                <li>
                  A description of the problem, including expected and actual
                  behaviour
                </li>
                <li>
                  Steps to reproduce, screenshots, and the approximate time the
                  issue started (with timezone)
                </li>
              </ul>
              <p>
                The severity of each request is assigned by Reactify Solutions
                based on the definitions in section 3. If you believe a
                request has been mis-classified, reply to the ticket and ask
                for a re-triage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                5. Scheduled maintenance
              </h2>
              <p>
                Scheduled maintenance windows are announced at least{" "}
                <strong>72 hours</strong> in advance by email to the technical
                contact on the customer&rsquo;s Atlassian Marketplace account
                and are, where possible, performed outside business hours in
                Central European Time. Time spent in announced maintenance
                windows does not count against the availability target in
                section 2.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                6. Exclusions
              </h2>
              <p>
                The availability target and response-time commitments do not
                apply to downtime or delays caused by:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Outages in the Atlassian Cloud platform or other Atlassian
                  infrastructure on which the App depends
                </li>
                <li>
                  Outages in third-party services that the App integrates with
                  at the customer&rsquo;s request (e.g. Linear, Slack, OpenAI)
                </li>
                <li>
                  The customer&rsquo;s own network, firewall, or
                  browser-extension configuration
                </li>
                <li>Announced maintenance windows (section 5)</li>
                <li>
                  Force-majeure events: natural disasters, acts of government,
                  war, terrorism, or widespread internet outages
                </li>
                <li>
                  Use of the App in breach of its documentation, the Atlassian
                  Marketplace Terms, or this SLA
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                7. Service credits
              </h2>
              <p>
                If monthly uptime for a paid App falls below the 99.9% target,
                the affected customer may request a service credit against
                their next invoice for that App, as follows:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-darkBorder text-sm">
                  <thead>
                    <tr className="bg-darkSurface/60 text-left text-white">
                      <th className="border border-darkBorder px-4 py-3 font-semibold">
                        Monthly uptime
                      </th>
                      <th className="border border-darkBorder px-4 py-3 font-semibold">
                        Service credit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-darkBorder px-4 py-3">
                        &lt; 99.9% and ≥ 99.0%
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        10% of the monthly fee for the affected App
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-darkBorder px-4 py-3">
                        &lt; 99.0% and ≥ 95.0%
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        25% of the monthly fee for the affected App
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-darkBorder px-4 py-3">
                        &lt; 95.0%
                      </td>
                      <td className="border border-darkBorder px-4 py-3">
                        50% of the monthly fee for the affected App
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Service credits are the customer&rsquo;s sole and exclusive
                remedy for failure to meet the availability target. Credits
                must be requested within <strong>30 days</strong> of the end of
                the affected month by emailing{" "}
                <a
                  href="mailto:support@reactify-solutions.com"
                  className="text-primaryColor hover:underline"
                >
                  support@reactify-solutions.com
                </a>
                , and may not be exchanged for cash.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                8. Changes to this SLA
              </h2>
              <p>
                Reactify Solutions may update this SLA from time to time.
                Material changes will be announced on this page at least{" "}
                <strong>30 days</strong> before they take effect. The
                &ldquo;last updated&rdquo; date above reflects the most recent
                revision.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                9. Contact
              </h2>
              <p>
                Questions about this SLA can be directed to{" "}
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
