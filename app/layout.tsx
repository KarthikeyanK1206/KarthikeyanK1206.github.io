import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/data/profile";
import { siteName } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "normal",
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

const newsreaderItalic = Newsreader({
  subsets: ["latin"],
  style: "italic",
  weight: ["400", "500", "600"],
  variable: "--font-newsreader-italic",
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-plex-mono",
  display: "swap",
});

const plexMonoRegular = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-mono-regular",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#111512" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} | Backend & Distributed Systems Engineer`,
    template: `%s | ${profile.shortName}`,
  },
  description: profile.lede,
  applicationName: siteName,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    title: `${profile.name} | Backend & Distributed Systems Engineer`,
    description: profile.lede,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Backend & Distributed Systems Engineer`,
    description: profile.lede,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${newsreaderItalic.variable} ${plexMono.variable} ${plexMonoRegular.variable}`}
    >
      <body>
        <ThemeProvider>
          <a href="#content" className="skip-link">Skip to content</a>
          <SiteHeader />
          <main id="content" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
