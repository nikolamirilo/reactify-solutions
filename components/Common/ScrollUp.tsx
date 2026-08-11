"use client";

import { useEffect } from "react";

export default function ScrollUp() {
  // The braces matter. With a concise arrow body this effect returned whatever
  // scrollTo() gave back, and React treats an effect's return value as its
  // cleanup function. Native scrollTo returns undefined, but a smooth-scroll
  // shim returns a Promise - React then called that Promise on unmount and threw
  // "TypeError: i is not a function", which surfaced as the client-side
  // exception screen on whatever page you navigated to from here.
  useEffect(() => {
    window.document.scrollingElement?.scrollTo(0, 0);
  }, []);

  return null;
}
