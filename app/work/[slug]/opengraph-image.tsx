import { ImageResponse } from "next/og";

import { docs, getDoc } from "@/lib/data/documents";
import { profile } from "@/lib/data/profile";
import { loadOgFonts, og } from "@/lib/og/og-fonts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export const alt = "Engineering case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const fonts = await loadOgFonts();
  if (!doc) return new ImageResponse(<div style={{ display: "flex" }} />, size);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: og.paper, color: og.ink, padding: 60 }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `2px solid ${og.line}`, paddingBottom: 24, fontFamily: "PlexMono", fontSize: 19 }}>
          <div style={{ display: "flex", color: og.accent }}>{doc.id} · {doc.kind.toUpperCase()}</div>
          <div style={{ display: "flex", color: og.ink2 }}>{doc.status.toUpperCase()}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 82, lineHeight: 1, color: og.ink }}>{doc.title}</div>
          <div style={{ display: "flex", marginTop: 18, maxWidth: 1030, fontFamily: "Newsreader", fontSize: 31, lineHeight: 1.35, color: og.ink2 }}>{doc.subtitle}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 56 }}>
            {doc.evidence.map((item) => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column", width: 300 }}>
                <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 40, color: og.accent }}>{item.value}</div>
                <div style={{ display: "flex", marginTop: 4, fontFamily: "PlexMono", fontSize: 15, color: og.ink2 }}>{item.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: `2px solid ${og.line}`, marginTop: 28, paddingTop: 22, fontFamily: "PlexMono", fontSize: 18, color: og.ink2 }}>
            <div style={{ display: "flex" }}>{profile.name.toUpperCase()}</div>
            <div style={{ display: "flex", color: og.accent2 }}>{profile.siteUrl.replace(/^https?:\/\//, "")}/work/{doc.slug}</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
