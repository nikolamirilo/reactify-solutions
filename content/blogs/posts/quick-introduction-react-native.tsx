import CodeBlock from "@/components/Blogs/CodeBlock";
import { Blog } from "@/types";

export const meta: Blog = {
  id: 7,
  slug: "quick-introduction-react-native",
  title: "A quick introduction to building apps with React Native",
  excerpt:
    "A practical intro for React developers who want to ship a mobile app without learning Swift or Kotlin. Expo setup, component differences, navigation, native APIs, and shipping to the stores.",
  metaDescription:
    "A practical introduction to React Native for web developers. Covers Expo, component model, expo-router, state, native APIs, platform differences, and building with EAS.",
  image: "/images/blogs/blog-05.webp",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Mobile Engineering Team",
  },
  tags: ["React Native", "Mobile", "Expo"],
  publishDate: "2026-04-19",
  readingTime: "9 min read",
};

export default function QuickIntroductionReactNativePost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Most React developers who want to ship a mobile app hit the same
        question early. React Native, Flutter, pure native, or a PWA? This post
        assumes you chose React Native, and walks through what you actually need
        to know to ship your first app. Not a 40-screen tutorial. Just the shape
        of the thing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Use Expo, not bare React Native
      </h2>
      <p className="mb-6 leading-relaxed">
        The React Native docs still offer two tracks: bare CLI or Expo. For a
        new project, choose Expo. It has quietly become the right way to build
        React Native apps for roughly 95% of cases. The Expo team does the
        boring work, upgrading native toolchains, shipping over-the-air updates,
        handling builds, so you do not have to.
      </p>
      <p className="mb-6 leading-relaxed">Starting is one command:</p>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`npx create-expo-app@latest my-app
cd my-app
npx expo start`}
      />
      <p className="mb-6 leading-relaxed">
        The template ships with expo-router, which gives you file-based routing
        that looks exactly like Next.js App Router. If you are comfortable with
        Next.js, you already know the pattern.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Components are different, the mental model is the same
      </h2>
      <p className="mb-4 leading-relaxed">
        The biggest shift is that you cannot use <code>&lt;div&gt;</code> and{" "}
        <code>&lt;span&gt;</code>. React Native has its own primitives.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <code>View</code> replaces <code>div</code>.
        </li>
        <li>
          <code>Text</code> replaces <code>span</code>.
        </li>
        <li>
          <code>ScrollView</code> replaces a scrollable <code>div</code>.
        </li>
        <li>
          <code>Pressable</code> and <code>TouchableOpacity</code> replace{" "}
          <code>button</code>.
        </li>
        <li>
          <code>Image</code> replaces <code>img</code>.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Every piece of text has to live inside a <code>Text</code> component. No
        exceptions. This trips everyone up on day one.
      </p>
      <p className="mb-6 leading-relaxed">
        Styling uses a StyleSheet API with a familiar-looking subset of CSS:
      </p>
      <CodeBlock
        language="tsx"
        filename="app/index.tsx"
        code={`import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Tap the screen to start</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#0a0a0a",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        Flexbox is the layout model, and it works almost identically to web
        flex, with two gotchas. <code>flexDirection</code> defaults to column,
        not row. And there is no margin collapsing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Navigation with expo-router
      </h2>
      <p className="mb-6 leading-relaxed">
        File-based routing makes navigation boring in a good way. A file at{" "}
        <code>app/index.tsx</code> is the home screen. A file at{" "}
        <code>app/settings.tsx</code> is the settings screen. Dynamic routes use{" "}
        <code>[id].tsx</code>, identical to Next.js.
      </p>
      <CodeBlock
        language="bash"
        filename="project structure"
        code={`app/
  _layout.tsx
  index.tsx
  settings.tsx
  products/
    index.tsx
    [id].tsx`}
      />
      <p className="mb-6 leading-relaxed">
        <code>useRouter</code> and <code>Link</code> from{" "}
        <code>expo-router</code> work like their Next.js siblings. The mental
        overhead is close to zero if you come from App Router.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        State works the way you expect
      </h2>
      <p className="mb-6 leading-relaxed">
        State is plain React. <code>useState</code>, <code>useReducer</code>,
        Context, or any library you already like. Zustand works. Jotai works.
        TanStack Query works.
      </p>
      <p className="mb-6 leading-relaxed">
        For simple persistence, use{" "}
        <code>@react-native-async-storage/async-storage</code>, which is a
        key-value API similar to localStorage. For anything more than
        preferences, reach for <code>expo-sqlite</code> or{" "}
        <code>op-sqlite</code>.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Native APIs through Expo modules
      </h2>
      <p className="mb-6 leading-relaxed">
        Most native functionality is wrapped in an Expo module you can install
        with a single command:
      </p>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`npx expo install expo-camera expo-notifications expo-location expo-secure-store`}
      />
      <p className="mb-6 leading-relaxed">
        Camera, notifications, location, secure storage, haptics, audio, video,
        and file system all have first-party modules. If you need something
        unusual, Expo config plugins let you extend the native build without
        ejecting.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Platform differences are real but manageable
      </h2>
      <p className="mb-4 leading-relaxed">
        iOS and Android are different. Some of the places where it matters:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Keyboard handling.</strong> <code>KeyboardAvoidingView</code>{" "}
          is your friend.
        </li>
        <li>
          <strong>Safe area insets.</strong> Use <code>useSafeAreaInsets</code>{" "}
          from <code>react-native-safe-area-context</code>. Not magic numbers.
        </li>
        <li>
          <strong>Status bar colors and styles.</strong> Handle them explicitly
          with <code>expo-status-bar</code>.
        </li>
        <li>
          <strong>Hardware back button.</strong> Android has one, iOS does not.
          Navigation needs to handle the back press correctly on Android.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        <code>Platform.OS === &quot;ios&quot;</code> is fine for small branches.
        If you find yourself writing platform conditionals everywhere,
        reconsider the architecture.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Building and shipping with EAS
      </h2>
      <p className="mb-6 leading-relaxed">
        Expo Application Services handles the builds. One command builds an iOS
        IPA, another builds an Android AAB:
      </p>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`eas build --platform all
eas submit --platform ios
eas submit --platform android`}
      />
      <p className="mb-6 leading-relaxed">
        For over-the-air updates to JavaScript code, <code>expo-updates</code>{" "}
        lets you ship fixes without going through the app stores. A legitimate
        shortcut that people underuse.
      </p>
      <p className="mb-6 leading-relaxed">
        First submission to the App Store is the worst part. Apple&apos;s
        reviews are inconsistent, the metadata screens are maddening, and the
        initial screenshot requirements eat a day. Budget for it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        When React Native is the wrong choice
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Graphics-heavy games. Use Unity or native.</li>
        <li>
          Apps with deep platform integration. Complex CarPlay, widgets with
          rich interaction, or system-level services are cleaner in native.
        </li>
        <li>
          Apps where the UX has to feel 100% platform-native with no seams.
          React Native is close, but not identical.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        For everything else, it is a good choice. Quicktalog&apos;s mobile
        experience is a PWA today, but if we took it fully native tomorrow,
        React Native is what we would reach for.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Ship a demo, not a tutorial
      </h2>
      <p className="mb-6 leading-relaxed">
        The fastest way to learn React Native is to ship a tiny real app in a
        week. A notes app. A habit tracker. Anything with data, navigation, and
        one native capability like notifications. You will hit every wall once,
        and learn which ones matter.
      </p>
      <p className="mb-6 leading-relaxed">
        If you want a second opinion on a React Native architecture, or on an
        existing web app you are thinking about porting,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          we would be glad to take a look
        </a>
        .
      </p>
    </div>
  );
}
