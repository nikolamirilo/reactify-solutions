import { ReactNode } from "react";

export interface PolicySection {
  heading: string;
  body: ReactNode;
}

export interface PrivacyPolicy {
  /** URL slug used at /privacy-policy/[id] */
  id: string;
  /** Product display name (e.g. "Linea", "Bark Off") */
  productName: string;
  /** Last updated date displayed at the top of the page */
  lastUpdated: string;
  /** Page <title> and OG title */
  metaTitle: string;
  /** Meta description for SEO + social */
  metaDescription: string;
  /** One-liner under the breadcrumb header */
  breadcrumbDescription: string;
  /** Ordered policy sections */
  sections: PolicySection[];
}

const linkClass = "text-primaryColor hover:underline";

const policiesData: PrivacyPolicy[] = [
  {
    id: "linea",
    productName: "Linea",
    lastUpdated: "27 April 2026",
    metaTitle: "Privacy Policy · Linea",
    metaDescription:
      "Privacy Policy for Linea - the Reactify Solutions Forge app that connects Confluence with Linear. Linea does not collect, store, or transmit personal data to Reactify Solutions.",
    breadcrumbDescription:
      "How Linea, the Reactify Solutions Confluence-to-Linear connector, handles data. Short version: it doesn't collect any.",
    sections: [
      {
        heading: "1. About this policy",
        body: (
          <>
            <p>
              This Privacy Policy applies specifically to <strong>Linea</strong>,
              a Forge app published by Reactify Solutions on the Atlassian
              Marketplace that connects Confluence with{" "}
              <a
                href="https://linear.app"
                className={linkClass}
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
              <a href="/privacy-policy" className={linkClass}>
                Privacy Policy
              </a>
              .
            </p>
          </>
        ),
      },
      {
        heading: "2. Data we collect",
        body: (
          <>
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
          </>
        ),
      },
      {
        heading: "3. How Linea works",
        body: (
          <>
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
          </>
        ),
      },
      {
        heading: "4. Third parties",
        body: (
          <>
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
                  className={linkClass}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Atlassian Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://linear.app/privacy"
                  className={linkClass}
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
          </>
        ),
      },
      {
        heading: "5. Cookies & tracking",
        body: (
          <p>
            Linea does not set cookies, use analytics scripts, or include
            tracking pixels. The app only renders inside Confluence via
            Atlassian-managed UI components.
          </p>
        ),
      },
      {
        heading: "6. Your rights",
        body: (
          <>
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
          </>
        ),
      },
      {
        heading: "7. Security",
        body: (
          <p>
            Linea inherits the security model of Atlassian Forge: code
            runs in Atlassian-managed sandboxes, secrets are stored using
            Forge&rsquo;s encrypted storage primitives, and outbound
            network calls are restricted to allow-listed domains
            (Linear&rsquo;s API). All traffic between Forge and Linear is
            encrypted in transit.
          </p>
        ),
      },
      {
        heading: "8. Changes to this policy",
        body: (
          <p>
            If we ever change Linea so that it begins collecting personal
            data, we will update this page and announce the change on the
            Atlassian Marketplace listing at least <strong>30 days</strong>{" "}
            before the new behaviour takes effect. The &ldquo;last
            updated&rdquo; date above reflects the most recent revision.
          </p>
        ),
      },
      {
        heading: "9. Contact",
        body: (
          <p>
            Questions about Linea or this policy can be directed to{" "}
            <a
              href="mailto:support@reactify-solutions.com"
              className={linkClass}
            >
              support@reactify-solutions.com
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    id: "bark-off",
    productName: "Bark Off",
    lastUpdated: "27 May 2026",
    metaTitle: "Privacy Policy · Bark Off",
    metaDescription:
      "Privacy Policy for Bark Off - the Reactify Solutions mobile app that helps calm dog barking. Bark Off is fully offline, collects no personal data, and never transmits audio off your device.",
    breadcrumbDescription:
      "How Bark Off, the Reactify Solutions positive-reinforcement bark-training app, handles data. Short version: it doesn't collect any, and nothing ever leaves your phone.",
    sections: [
      {
        heading: "1. About this policy",
        body: (
          <>
            <p>
              This Privacy Policy applies specifically to{" "}
              <strong>Bark Off</strong>, a mobile application published by
              Reactify Solutions that helps dog owners detect barking in real
              time and respond with positive-reinforcement calming sounds.
            </p>
            <p>
              For other Reactify Solutions products and our marketing
              website, see our general{" "}
              <a href="/privacy-policy" className={linkClass}>
                Privacy Policy
              </a>
              .
            </p>
          </>
        ),
      },
      {
        heading: "2. Data we collect",
        body: (
          <>
            <p>
              <strong>
                Bark Off does not collect, store, or transmit any personal
                data.
              </strong>{" "}
              We do not operate any backend service, we do not use advertising SDKs, and we do not profile
              users in any way. We collect only anonymus analytics data.
            </p>
            <p>
              Bark Off has <strong>no user accounts</strong>, no sign-up
              flow, and does not request your name, email address, phone
              number, location, contacts, or any other identifier. The app
              does not call any third-party APIs.
            </p>
          </>
        ),
      },
      {
        heading: "3. How Bark Off works on your device",
        body: (
          <>
            <p>
              Bark Off runs entirely on your phone. All processing - bark
              detection, sound playback, and session history - happens
              locally. Nothing is sent over the network.
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Bark detection</strong> - the app analyses the
                loudness of audio captured by your microphone in real time
                to decide when a bark occurs. The live microphone audio is
                processed on-device and is{" "}
                <strong>not recorded, saved, or uploaded</strong>.
              </li>
              <li>
                <strong>Calming sounds you record</strong> - you can record
                your own voice or other sounds for Bark Off to play back when
                a bark is detected. Those recordings are stored only in the
                app&rsquo;s private storage on your device.
              </li>
              <li>
                <strong>Session data</strong> - timestamps, bark counts, and
                per-pet settings are written to local app storage on your
                device so you can review trends later. None of it is synced
                to a server.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: "4. Permissions we request",
        body: (
          <>
            <p>
              Bark Off only asks for permissions that are strictly required
              for the app to function:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Microphone</strong> - required to listen for barks
                in real time. The microphone stream is analysed on-device
                for loudness only; audio is not recorded or transmitted.
                When you choose to record a custom calming sound, that
                specific recording is saved locally in the app&rsquo;s
                private storage.
              </li>
              <li>
                <strong>Speaker / audio output</strong> - required to play
                the calming sound you have selected when a bark is detected.
                This includes background-audio capability so the app can
                keep responding while the screen is locked.
              </li>
            </ul>
            <p>
              Bark Off does not request access to your location, contacts,
              photos, camera, calendar, Bluetooth, or any other sensor or
              data source.
            </p>
          </>
        ),
      },
      {
        heading: "5. Third parties",
        body: (
          <>
            <p>
              Bark Off has no third-party SDKs for analytics, advertising,
              crash reporting, attribution, or social integrations. The app
              does not communicate with any external service operated by
              Reactify Solutions or anyone else.
            </p>
            <p>
              The only third parties involved are the platform providers
              (Apple App Store and Google Play) that distribute the app and
              handle their own platform-level diagnostics under their
              respective policies. Reactify Solutions does not receive any
              personally identifiable information from those reports.
            </p>
          </>
        ),
      },
      {
        heading: "6. Children's privacy",
        body: (
          <p>
            Bark Off is designed for dog owners and is not directed at
            children under 13. Because the app does not collect any
            personal information from any user, it does not knowingly
            collect information from children either.
          </p>
        ),
      },
      {
        heading: "7. Your rights and your data",
        body: (
          <>
            <p>
              Because Reactify Solutions does not hold any personal data
              from Bark Off users, there is no data on our side to access,
              correct, export, or delete.
            </p>
            <p>
              Anything Bark Off stores - custom sound recordings, session
              history, and settings - lives only on your device. You can
              delete that data at any time by:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Removing individual recordings or clearing history from
                inside the app.
              </li>
              <li>
                Uninstalling Bark Off, which removes all of its local data
                from the device.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: "8. Security",
        body: (
          <p>
            Custom sound recordings and session data are stored in the
            app&rsquo;s private storage area, protected by the operating
            system&rsquo;s standard application sandboxing on iOS and
            Android. Because nothing is transmitted off the device, there
            is no network attack surface, no server-side database, and no
            third-party processor that could be breached.
          </p>
        ),
      },
      {
        heading: "9. Changes to this policy",
        body: (
          <p>
            If we ever change Bark Off so that it begins collecting
            personal data, transmitting audio, or contacting a remote
            service, we will update this page and announce the change in
            the app&rsquo;s store listings at least <strong>30 days</strong>{" "}
            before the new behaviour takes effect. The &ldquo;last
            updated&rdquo; date above reflects the most recent revision.
          </p>
        ),
      },
      {
        heading: "10. Contact",
        body: (
          <p>
            Questions about Bark Off or this policy can be directed to{" "}
            <a
              href="mailto:support@reactify-solutions.com"
              className={linkClass}
            >
              support@reactify-solutions.com
            </a>
            .
          </p>
        ),
      },
    ],
  },
];

export default policiesData;
