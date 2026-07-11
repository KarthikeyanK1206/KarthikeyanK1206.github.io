"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemedProjectImageProps = {
  lightSrc: string;
  darkSrc: string;
  width: number;
  height: number;
  alt: string;
};

export function ThemedProjectImage({
  lightSrc,
  darkSrc,
  width,
  height,
  alt,
}: ThemedProjectImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className="case-screenshot-placeholder"
        style={{ aspectRatio: `${width} / ${height}` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={resolvedTheme === "dark" ? darkSrc : lightSrc}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
