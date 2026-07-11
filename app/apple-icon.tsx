import { ImageResponse } from "next/og";

import { profile } from "@/lib/data/profile";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f6f2",
          color: "#0b6b50",
          fontSize: 62,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: 138,
            height: 138,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "5px solid #7c8d84",
            borderRadius: 20,
            background: "#ffffff",
          }}
        >
          {profile.initials}
        </div>
      </div>
    ),
    size
  );
}
