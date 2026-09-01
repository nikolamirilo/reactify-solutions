"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

/**
 * `next/image` serves every file through the Next image optimizer. When that
 * endpoint stops answering - the hosting plan's optimization quota runs out,
 * for instance - the browser gets an error for each request and the page renders
 * with holes where the images should be. The files themselves are still fine:
 * only the optimizer in front of them is gone.
 *
 * So optimize by default, and when an image fails to load, swap it for a plain
 * `<img>` pointing at the untouched source, which never goes near the optimizer.
 *
 * Failures are also counted, so that a page hitting a dead optimizer does not
 * repeat the same doomed request for every image on it. Only our own files vote:
 * they ship with the deploy and are not individually missing, so a few of them
 * failing at once means the optimizer, not the files. Remote images fail on
 * their own schedule - a third-party host having a bad afternoon should not
 * decide anything - so they fall back one by one without a say. Once the count
 * is reached every mounted image moves over and later ones skip the optimizer
 * entirely. Reading that wrong costs unoptimized images for the rest of the
 * visit, never a blank one.
 */

/** Same-origin failures on one page before the optimizer, not the files, is blamed. */
const OUTAGE_THRESHOLD = 3;

let failureCount = 0;
let optimizerDown = false;
const subscribers = new Set<() => void>();

/** Counts a failed load and, once they stop looking incidental, moves everyone over. */
const reportFailure = () => {
  if (optimizerDown) return;
  failureCount += 1;
  if (failureCount < OUTAGE_THRESHOLD) return;
  optimizerDown = true;
  subscribers.forEach((notify) => notify());
};

/** The plain URL behind a `src`, which may be a static import. */
const resolveSrc = (src: ImageProps["src"]): string => {
  if (typeof src === "string") return src;
  return "default" in src ? src.default.src : src.src;
};

/** Whether the file is ours, and so worth counting towards an optimizer outage. */
const isOwnFile = (src: ImageProps["src"]): boolean =>
  resolveSrc(src).startsWith("/");

/** What `next/image` applies to a `fill` image, reproduced for the fallback. */
const FILL_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  color: "transparent",
};

export default function Image(props: ImageProps) {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (optimizerDown) {
      setUseFallback(true);
      return;
    }
    const notify = () => setUseFallback(true);
    subscribers.add(notify);
    return () => {
      subscribers.delete(notify);
    };
  }, []);

  if (useFallback) return <FallbackImage {...props} />;

  return (
    <NextImage
      {...props}
      onError={(event) => {
        if (isOwnFile(props.src)) reportFailure();
        setUseFallback(true);
        props.onError?.(event);
      }}
    />
  );
}

/**
 * The same image as a plain `<img>`. Everything `next/image` handles itself -
 * the optimizer URL, `srcSet`, the blur placeholder - is dropped here rather
 * than leaking onto the DOM element; the rest is passed through untouched.
 */
function FallbackImage({
  src,
  fill,
  width,
  height,
  loading,
  style,
  // next/image-only props, which are not valid DOM attributes
  loader,
  quality,
  preload,
  priority,
  sizes,
  placeholder,
  blurDataURL,
  unoptimized,
  overrideSrc,
  onLoadingComplete,
  layout,
  objectFit,
  objectPosition,
  lazyBoundary,
  lazyRoot,
  ...rest
}: ImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={resolveSrc(src)}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority || preload ? "eager" : loading ?? "lazy"}
      decoding="async"
      style={fill ? { ...FILL_STYLE, ...style } : style}
    />
  );
}
