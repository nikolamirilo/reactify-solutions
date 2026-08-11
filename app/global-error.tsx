"use client";

import { useEffect } from "react";
import { recoverFromStaleAssets } from "@/components/Common/ChunkErrorRecovery";

/**
 * Root error boundary. Without this file Next.js renders its built-in
 * "Application error: a client-side exception has occurred" screen, which gives
 * a visitor no way forward and tells us nothing about what broke.
 *
 * Replaces the whole document, so it has to render <html> and <body> itself and
 * cannot rely on the app's fonts or providers - the styles here are inline on
 * purpose.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // A chunk that 404s because the deployment moved under us is recoverable:
    // reload to fetch HTML matching the assets now being served.
    if (recoverFromStaleAssets(error)) return;
    console.error("Root error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080b14",
          color: "#e6ebf5",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: "520px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 12px" }}>
            Something went wrong
          </h1>
          <p
            style={{
              margin: "0 0 24px",
              lineHeight: 1.6,
              color: "#9aa7bd",
            }}
          >
            This page failed to load. Trying again usually clears it.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#00d4c8",
              color: "#04121a",
              fontSize: "15px",
              fontWeight: 600,
              padding: "12px 28px",
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p style={{ marginTop: "24px", fontSize: "12px", color: "#5c6a80" }}>
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
