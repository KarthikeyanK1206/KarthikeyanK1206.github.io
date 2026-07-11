import { ImageResponse } from "next/og";

import { profile } from "@/lib/data/profile";
import { loadOgFonts, og } from "@/lib/og/og-fonts";

export const dynamic = "force-static";
export const alt = `${profile.name}, backend and distributed systems engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: og.paper, color: og.ink, padding: 64 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${og.line}`, paddingBottom: 28 }}>
          <div style={{ display: "flex", fontFamily: "PlexMono", fontSize: 21, color: og.accent }}>KK / ENGINEERING PORTFOLIO</div>
          <div style={{ display: "flex", fontFamily: "PlexMono", fontSize: 19, color: og.ink2 }}>LOS ANGELES · USC MS CS</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1030 }}>
          <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 82, lineHeight: 1.02, color: og.ink }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 20, fontFamily: "Newsreader", fontSize: 36, lineHeight: 1.25, color: og.accent }}>Backend & Distributed Systems Engineer</div>
          <div style={{ display: "flex", marginTop: 18, maxWidth: 940, fontSize: 24, lineHeight: 1.45, color: og.ink2 }}>{profile.lede}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `2px solid ${og.line}`, paddingTop: 24, fontFamily: "PlexMono", fontSize: 18, color: og.ink2 }}>
          <div style={{ display: "flex" }}>PRODUCTION · REPLICATION · RECOVERY · TOOLING</div>
          <div style={{ display: "flex", color: og.accent2 }}>{profile.siteUrl.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
