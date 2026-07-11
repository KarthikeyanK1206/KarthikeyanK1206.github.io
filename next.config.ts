import type { NextConfig } from "next";

// Static export for GitHub Pages (served as a user site at the domain root).
// Note: custom response headers (previously set via `headers()`) are not
// supported with `output: "export"` and cannot be applied by GitHub Pages'
// static host. Re-add them if this site ever moves to a server-based host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
