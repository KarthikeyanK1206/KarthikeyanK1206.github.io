import { readFile } from "node:fs/promises";
import path from "node:path";

/** Build-time font loading for OG image generation (satori needs TTF). */
export async function loadOgFonts() {
  const [serif, mono] = await Promise.all([
    readFile(path.join(process.cwd(), "lib/og/newsreader-500.ttf")),
    readFile(path.join(process.cwd(), "lib/og/plex-mono-600.ttf")),
  ]);
  return [
    { name: "Newsreader", data: serif, weight: 500 as const, style: "normal" as const },
    { name: "PlexMono", data: mono, weight: 600 as const, style: "normal" as const },
  ];
}

/** Light-theme tokens, inlined for raster social cards. */
export const og = {
  paper: "#f3f6f2",
  sheet: "#ffffff",
  ink: "#17201b",
  ink2: "#556159",
  line: "#d1dad3",
  accent: "#0b6b50",
  accent2: "#2855a6",
};
