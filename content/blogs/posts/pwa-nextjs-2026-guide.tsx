import CodeBlock from "@/components/Blogs/CodeBlock";
import { Blog } from "@/types";

export const meta: Blog = {
  id: 9,
  slug: "pwa-nextjs-2026-guide",
  title: "Shipping installable PWAs with Next.js 16: the 2026 guide",
  excerpt:
    "What it takes to ship a real, installable PWA on Next.js 16 today. Manifest, icons, service worker, push notifications, and the iOS quirks that trip teams up. With Quicktalog as the worked example.",
  metaDescription:
    "A practical 2026 guide to building installable Progressive Web Apps with Next.js 16. Covers app/manifest.ts, service workers, push notifications, iOS quirks, and real offline patterns.",
  image: "/images/blogs/blog-07.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["PWA", "Next.js", "Mobile"],
  publishDate: "2026-04-19",
  readingTime: "10 min read",
};

export default function PwaNextjs2026GuidePost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        A PWA is a website that can install itself onto your home screen. On
        iOS and Android, an installed PWA launches in its own window, works
        offline if you built it to, and can receive push notifications. Done
        right, users will not know it is not a native app. This guide covers
        what you need to ship a real, installable PWA in Next.js 16 today.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Why a PWA instead of React Native
      </h2>
      <p className="mb-4 leading-relaxed">
        Three reasons we still reach for PWAs in 2026:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Distribution is a URL.</strong> No App Store review. No
          TestFlight. Ship, share a link, users install.
        </li>
        <li>
          <strong>One codebase, three platforms.</strong> Your existing
          Next.js app is most of the way there.
        </li>
        <li>
          <strong>Updates are instant.</strong> Push a deploy, every user is
          on the new version on their next open.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The tradeoff is platform integration. iOS still does not support
        every Web Push feature. Some native APIs, like rich widgets or
        complex background processing, are limited or missing in browsers.
        For content, tools, and most business apps, a PWA is plenty. For a
        game or a deeply integrated system app, it is not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        What makes an app installable
      </h2>
      <p className="mb-4 leading-relaxed">
        A web app becomes installable when it has:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>A web manifest with the right fields.</li>
        <li>A service worker registered on the page.</li>
        <li>HTTPS, or localhost for development.</li>
        <li>Proper icons at the sizes iOS and Android expect.</li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Miss any of these and the install prompt will not appear.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The manifest, the Next.js way
      </h2>
      <p className="mb-6 leading-relaxed">
        In App Router, the manifest is a file at <code>app/manifest.ts</code>.
        No JSON file, no link tag in the head. Next.js picks it up
        automatically and serves it at <code>/manifest.webmanifest</code>.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/manifest.ts"
        code={`import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reactify Solutions",
    short_name: "Reactify",
    description: "Web, mobile, AI, and analytics for modern businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#1b998b",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}`}
      />
      <p className="mb-4 leading-relaxed">
        Three fields do the heavy lifting:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <code>display: &quot;standalone&quot;</code> is what makes the app
          open without browser chrome.
        </li>
        <li>
          <code>start_url: &quot;/&quot;</code> controls what loads on
          launch. Match the entry screen of your app.
        </li>
        <li>
          <code>icons</code> must include a 192x192 and 512x512 at minimum,
          and the <code>maskable</code> purpose for Android adaptive icons.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Icons, where iOS makes you work
      </h2>
      <p className="mb-4 leading-relaxed">
        Android is forgiving. iOS is not. For a clean install experience on
        iPhone:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          180x180 <code>apple-touch-icon</code> in{" "}
          <code>app/apple-icon.png</code>. Next.js picks it up automatically.
        </li>
        <li>
          A splash screen for each iPhone resolution, linked via{" "}
          <code>apple-touch-startup-image</code> meta tags.
        </li>
        <li>
          A transparent-background icon will show a black background on
          iOS. Use a solid fill.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Yes, it is more work than Android. No, you cannot skip it without
        your app looking broken on iPhone.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Service workers without losing a week
      </h2>
      <p className="mb-6 leading-relaxed">
        For most Next.js apps, the right answer is Serwist or next-pwa
        plugins. Both wrap Workbox, which handles the annoying parts of
        service worker lifecycle, cache management, and update flow.
      </p>
      <p className="mb-4 leading-relaxed">
        Pick a caching strategy per route type:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Static assets (JS, CSS, images):</strong> cache-first with a
          long expiry. They are hashed, so cache misses are not a concern.
        </li>
        <li>
          <strong>HTML pages:</strong> stale-while-revalidate. Users get an
          instant response and the next visit is fresh.
        </li>
        <li>
          <strong>API calls:</strong> network-first with a short timeout,
          falling back to cache if offline.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Resist the urge to cache everything. Users hate stale data more than
        they hate loading spinners.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Push notifications
      </h2>
      <p className="mb-4 leading-relaxed">
        Web Push works on Chrome, Firefox, and since iOS 16.4 on Safari for
        installed PWAs. The flow has four steps.
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          Ask permission with <code>Notification.requestPermission()</code>.
        </li>
        <li>Subscribe to the push service with your VAPID public key.</li>
        <li>Save the subscription server-side.</li>
        <li>
          Send push payloads via the <code>web-push</code> library from Node.
        </li>
      </ol>
      <CodeBlock
        language="typescript"
        filename="lib/push.ts"
        code={`// client: subscribe
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  });
  await fetch("/api/push/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
  });
}

// server: send
import webPush from "web-push";

webPush.setVapidDetails(
  "mailto:ops@reactify-solutions.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function sendPush(subscription: webPush.PushSubscription, body: string) {
  await webPush.sendNotification(subscription, body);
}`}
      />
      <p className="mb-4 leading-relaxed">iOS quirks to remember:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Only installed PWAs can receive push. A browser tab cannot.</li>
        <li>
          The user must interact with the page before the permission prompt
          can fire.
        </li>
        <li>Silent notifications are not supported.</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Install prompts
      </h2>
      <p className="mb-6 leading-relaxed">
        On Android, you can show a custom install button by capturing the{" "}
        <code>beforeinstallprompt</code> event:
      </p>
      <CodeBlock
        language="tsx"
        filename="components/InstallButton.tsx"
        code={`"use client";
import { useEffect, useState } from "react";

export function InstallButton() {
  const [evt, setEvt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setEvt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!evt) return null;

  return (
    <button onClick={() => evt.prompt()}>Install this app</button>
  );
}`}
      />
      <p className="mb-6 leading-relaxed">
        On iOS there is no programmatic prompt. Users install via
        Safari&apos;s Share menu, then &quot;Add to Home Screen.&quot; Your
        job is to tell them that, preferably only when you are sure they are
        on iOS and not already installed.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Offline strategy
      </h2>
      <p className="mb-4 leading-relaxed">
        True offline support is more than caching. Decide what your app
        should do when the network is gone:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Read-only content:</strong> cache pages, show them offline.
          Easy.
        </li>
        <li>
          <strong>Forms and writes:</strong> queue the submission and replay
          it when the network comes back. Background Sync helps on Chrome.
          On iOS, you are on your own.
        </li>
        <li>
          <strong>Realtime-critical features:</strong> show a clear offline
          state and disable them. Do not pretend.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Most apps need a thin offline layer, not a full offline-first
        architecture.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Testing
      </h2>
      <p className="mb-4 leading-relaxed">Before you ship, run:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Lighthouse PWA audit in Chrome DevTools. It will flag every missing manifest field.</li>
        <li>Real device install on iPhone and Android. Emulators lie about install behavior.</li>
        <li>Airplane mode test. Toggle offline and see what breaks.</li>
        <li>
          Update test. Deploy a new version and verify the service worker
          picks it up. This is where most PWAs silently fail.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        A worked example: Quicktalog
      </h2>
      <p className="mb-6 leading-relaxed">
        Quicktalog is a PWA. We did not build it as one. We made it
        installable after the fact because half our users asked for &quot;an
        app.&quot; The work came in three chunks:
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>One day to add the manifest, icons, and a minimal service worker.</li>
        <li>Half a day to add the install prompt and the iOS instructions.</li>
        <li>Two days to handle push notifications and the offline-friendly catalog viewer.</li>
      </ol>
      <p className="mb-6 leading-relaxed">
        The conversion rate on the install prompt sits around 8%. For an
        app distributed as a link, on a product used by 1,400+ businesses,
        that is meaningful retention.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        When to go native instead
      </h2>
      <p className="mb-4 leading-relaxed">
        Reach for React Native or native when you need:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Widgets, Siri shortcuts, or deep Apple Wallet integration.</li>
        <li>Background tasks that run without the app open for long stretches.</li>
        <li>A UI that needs frame-perfect platform-native feel.</li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Everything else, try a PWA first. Shipping is faster, the team
        stays smaller, and the maintenance story is the same as your web
        app.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are weighing PWA against React Native for a product you are
        about to build,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          we would be happy to compare notes
        </a>
        .
      </p>
    </div>
  );
}
