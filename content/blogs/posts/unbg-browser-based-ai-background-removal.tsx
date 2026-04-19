import { Blog } from "@/types";

export const meta: Blog = {
  id: 2,
  slug: "unbg-browser-based-ai-background-removal",
  title: "Building unbg: how we run AI background removal 100% in the browser",
  excerpt:
    "Why we built unbg with ONNX Runtime Web and WebAssembly instead of a server, what we learned about running neural networks client-side, and why it changes the privacy story for image tools.",
  metaDescription:
    "A close look at unbg: browser-based AI background removal built with ONNX Runtime Web and WebAssembly. No uploads, no server costs, full-resolution output.",
  image: "/images/solutions/unbg/unbg-processing.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["unbg", "AI", "WebAssembly", "Privacy"],
  publishDate: "2026-04-19",
  readingTime: "7 min read",
};

export default function UnbgBrowserBasedAiBackgroundRemovalPost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Every popular background-removal tool has the same problem. You upload
        your image to someone else&apos;s server. That is fine for a throwaway
        avatar, but it is a non-starter for product photography, personal
        photos, or anything under NDA. We built{" "}
        <a
          href="https://unbg.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primaryColor hover:underline"
        >
          unbg
        </a>{" "}
        to run the entire pipeline in the browser. No upload, no account, no
        watermark, no limits. This post walks through how.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The architecture in one diagram
      </h2>
      <p className="mb-4 leading-relaxed">
        The whole app is a single Next.js 16 page that loads an ONNX model into
        the browser and runs inference via WebAssembly.
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-black/60 p-4 text-sm text-white">
        {`User uploads image
      ↓
Canvas API → Uint8Array
      ↓
@imgly/background-removal (ONNX Runtime Web + WASM)
      ↓
Transparent PNG → download or edit
      ↓
(optional) brush editor → final download`}
      </pre>
      <p className="mb-6 leading-relaxed">
        There are no fetch calls. There are no API keys. The first run downloads
        about 80MB of model weights, after which everything is cached in
        IndexedDB and works offline.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Why ONNX Runtime Web
      </h2>
      <p className="mb-6 leading-relaxed">
        We considered TensorFlow.js and an in-house wrapper around MediaPipe,
        but ONNX Runtime Web won on three axes.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Model portability.</strong> The team behind
          @imgly/background-removal ships a well-tuned ONNX segmentation model.
          Switching to a newer one is a file swap.
        </li>
        <li>
          <strong>WASM SIMD.</strong> On modern browsers we get near-native
          speed via WASM SIMD. A 1024x1024 image segments in about 1.5 seconds
          on an M-series MacBook, around 3 seconds on a mid-range Android.
        </li>
        <li>
          <strong>No native dependencies.</strong> No CUDA, no node-gyp, no
          server. The same codebase runs identically on every device.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The hard part: mobile
      </h2>
      <p className="mb-6 leading-relaxed">
        Browser ML looks great in a desktop demo. Mobile is where it falls
        apart. Three issues dominated our testing.
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          <strong>HEIC photos.</strong> iPhone galleries are full of HEIC files,
          which browsers cannot decode natively. We added an automatic HEIC to
          JPEG conversion step before inference.
        </li>
        <li>
          <strong>Memory.</strong> A 4000x3000 image plus model weights will
          crash Safari on a 4GB iPhone. We downsample oversized inputs before
          inference and upscale the mask afterward.
        </li>
        <li>
          <strong>Touch input.</strong> The brush editor needed full touch
          support. That meant pointer events, coalesced events for smoothness,
          and palm rejection on the canvas.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        UX details that mattered
      </h2>
      <p className="mb-4 leading-relaxed">Things that moved the product:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Before and after slider.</strong> The single feature that made
          users trust the output. Without it, they kept asking whether it had
          actually worked.
        </li>
        <li>
          <strong>Brush editor with erase and restore.</strong> AI gets edges
          wrong on hair and fur. A simple masking editor covers the gap without
          needing a better model.
        </li>
        <li>
          <strong>Batch mode.</strong> E-commerce sellers have 50 photos at a
          time, not one. Processing a queue sequentially, not in parallel
          because of memory, made it usable.
        </li>
        <li>
          <strong>Warm model on first interaction.</strong> We preload the model
          as soon as the user drops a file, before they click Start. That shaves
          two seconds off perceived latency.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        What we gave up
      </h2>
      <p className="mb-6 leading-relaxed">
        Running everything client-side means we cannot do a few things.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          Use a bigger, more accurate model. We are capped by what will run on a
          mid-range phone.
        </li>
        <li>
          Charge for API access. The model lives in the user&apos;s browser, so
          the business model has to be something else. For unbg, we just give it
          away.
        </li>
        <li>
          Collect usage data beyond anonymous, aggregate analytics. No server
          means no ability to see who used what.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        We think the tradeoff is worth it. For a privacy-sensitive, commoditized
        feature like background removal, the claim that everything runs on your
        own device is a strong enough difference that it does not need a pricing
        page.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Bigger picture: browser ML is ready
      </h2>
      <p className="mb-6 leading-relaxed">
        WASM SIMD, ONNX Runtime Web, and IndexedDB model caching together make a
        whole category of small model, privacy-sensitive, latency-sensitive apps
        viable without a backend. Background removal, OCR, audio transcription,
        pose estimation. All of these can run in a tab today.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are shipping something where users are already skeptical about
        uploading their data, moving inference into the browser removes the
        objection entirely. Your infrastructure bill collapses to a CDN.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Try it or build one
      </h2>
      <p className="mb-6 leading-relaxed">
        <a
          href="https://unbg.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primaryColor hover:underline"
        >
          unbg.tech
        </a>{" "}
        is live and free. If you are thinking about running your own ML features
        in the browser and want to compare notes on model size, caching
        strategy, or mobile issues,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          get in touch
        </a>
        .
      </p>
    </div>
  );
}
