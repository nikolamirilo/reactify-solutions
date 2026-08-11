const RELOAD_FLAG = "reactify:chunk-reload";

/**
 * A stale-deployment failure: the browser is holding HTML from one deployment
 * and asking the CDN for script chunks that only existed in that deployment.
 * Vercel serves the current deployment, the hashed chunk URL 404s, and React
 * throws while hydrating - which is what the bare "Application error: a
 * client-side exception has occurred" screen actually is. Nothing is wrong with
 * the page; it just needs the HTML that matches the chunks now being served.
 */
export const isStaleAssetError = (error: unknown): boolean => {
  if (!error) return false;
  const { name = "", message = "" } = error as { name?: string; message?: string };
  return (
    name === "ChunkLoadError" ||
    /loading chunk|loading css chunk|failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|\.js.*failed to load/i.test(
      message
    )
  );
};

/**
 * Reload once to pick up the current deployment's HTML. The session flag stops
 * a genuinely broken build from turning into a reload loop - if the second
 * render fails too, the caller's fallback UI stays on screen.
 */
export const recoverFromStaleAssets = (error: unknown): boolean => {
  if (typeof window === "undefined" || !isStaleAssetError(error)) return false;

  try {
    if (window.sessionStorage.getItem(RELOAD_FLAG)) return false;
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    // Private-mode Safari and friends: without storage we can't guarantee a
    // single retry, so don't reload at all rather than risk a loop.
    return false;
  }

  window.location.reload();
  return true;
};

/** Called once the app renders successfully, so a later stale deploy can retry. */
export const clearStaleAssetRecovery = () => {
  try {
    window.sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    // Nothing to clear if storage is unavailable.
  }
};
