"use client";

import { RefreshCw } from "lucide-react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <head>
        <title>Application error | Karthikeyan Kumaraguruparan</title>
        <style>{`button:focus-visible { outline: 3px solid #2855a6; outline-offset: 3px; }`}</style>
      </head>
      <body style={{ margin: 0, background: "#f3f6f2", color: "#17201b", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem" }}>
          <div style={{ maxWidth: "36rem" }}>
            <p style={{ color: "#0b6b50", fontWeight: 700 }}>Application error</p>
            <h1 style={{ fontSize: "2rem", lineHeight: 1.15 }}>This page could not be rendered.</h1>
            <p style={{ color: "#556159" }}>Retry the request. No form data or account state is stored by this portfolio.</p>
            <button
              type="button"
              onClick={reset}
              style={{ minHeight: "44px", display: "inline-flex", alignItems: "center", gap: ".5rem", marginTop: "1rem", border: 0, borderRadius: "5px", background: "#0b6b50", color: "white", padding: ".65rem 1rem", fontWeight: 700, cursor: "pointer" }}
            >
              <RefreshCw size={18} /> Retry
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
