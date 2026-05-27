import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · BarkOff",
  description:
    "Privacy Policy for BarkOff - the Reactify Solutions mobile app that helps calm dog barking. BarkOff is fully offline, collects no personal data, and never transmits audio off your device.",
  alternates: { canonical: "/privacy-policy/bark-off" },
  openGraph: {
    title: "Privacy Policy · BarkOff",
    description:
      "BarkOff is a fully offline mobile app for calming dog barking. It collects no personal data and never transmits audio.",
    url: "/privacy-policy/bark-off",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · BarkOff | Reactify Solutions",
    description:
      "BarkOff is a fully offline mobile app for calming dog barking. It collects no personal data and never transmits audio.",
  },
};

const LAST_UPDATED = "27 May 2026";

export default function BarkOffPrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb
        pageName="Privacy Policy · BarkOff"
        description="How BarkOff, the Reactify Solutions positive-reinforcement bark-training app, handles data. Short version: it doesn't collect any, and nothing ever leaves your phone."
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
                This Privacy Policy applies specifically to{" "}
                <strong>BarkOff</strong>, a mobile application published by
                Reactify Solutions that helps dog owners detect barking in real
                time and respond with positive-reinforcement calming sounds.
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
                  BarkOff does not collect, store, or transmit any personal
                  data to Reactify Solutions.
                </strong>{" "}
                We do not operate any backend service, we do not run analytics
                on usage, we do not use advertising SDKs, and we do not profile
                users in any way.
              </p>
              <p>
                BarkOff has <strong>no user accounts</strong>, no sign-up
                flow, and does not request your name, email address, phone
                number, location, contacts, or any other identifier. The app
                does not call any third-party APIs.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                3. How BarkOff works on your device
              </h2>
              <p>
                BarkOff runs entirely on your phone. All processing - bark
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
                  your own voice or other sounds for BarkOff to play back when
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
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                4. Permissions we request
              </h2>
              <p>
                BarkOff only asks for permissions that are strictly required
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
                BarkOff does not request access to your location, contacts,
                photos, camera, calendar, Bluetooth, or any other sensor or
                data source.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                5. Third parties
              </h2>
              <p>
                BarkOff has no third-party SDKs for analytics, advertising,
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
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                6. Children&rsquo;s privacy
              </h2>
              <p>
                BarkOff is designed for dog owners and is not directed at
                children under 13. Because the app does not collect any
                personal information from any user, it does not knowingly
                collect information from children either.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                7. Your rights and your data
              </h2>
              <p>
                Because Reactify Solutions does not hold any personal data
                from BarkOff users, there is no data on our side to access,
                correct, export, or delete.
              </p>
              <p>
                Anything BarkOff stores - custom sound recordings, session
                history, and settings - lives only on your device. You can
                delete that data at any time by:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Removing individual recordings or clearing history from
                  inside the app.
                </li>
                <li>
                  Uninstalling BarkOff, which removes all of its local data
                  from the device.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                8. Security
              </h2>
              <p>
                Custom sound recordings and session data are stored in the
                app&rsquo;s private storage area, protected by the operating
                system&rsquo;s standard application sandboxing on iOS and
                Android. Because nothing is transmitted off the device, there
                is no network attack surface, no server-side database, and no
                third-party processor that could be breached.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                9. Changes to this policy
              </h2>
              <p>
                If we ever change BarkOff so that it begins collecting
                personal data, transmitting audio, or contacting a remote
                service, we will update this page and announce the change in
                the app&rsquo;s store listings at least <strong>30 days</strong>{" "}
                before the new behaviour takes effect. The &ldquo;last
                updated&rdquo; date above reflects the most recent revision.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                10. Contact
              </h2>
              <p>
                Questions about BarkOff or this policy can be directed to{" "}
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
