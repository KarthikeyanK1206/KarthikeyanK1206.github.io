import type { Metadata } from "next";

import { profile } from "@/lib/data/profile";

export const siteName = `${profile.name} Engineering Portfolio`;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  imagePath?: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  imagePath = "/opengraph-image",
  imageAlt = `${profile.name}, backend and distributed systems engineering portfolio`,
}: PageMetadataOptions): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${profile.shortName}`;
  const image = {
    url: imagePath,
    width: 1200,
    height: 630,
    alt: imageAlt,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
