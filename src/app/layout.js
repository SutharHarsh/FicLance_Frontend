import "./globals.css";
import { Poppins } from "next/font/google";
import { themeInitScript } from "@/lib/themeScript";
import { siteConfig, brandAssets } from "@/lib/seo/metadata";
import RootClientLayout from "@/components/layout/RootClientLayout";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: defaultKeywords,
  authors: [{ name: siteConfig.author }],
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.domain}/og-v1.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteConfig.domain}/og-v1.png`],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <head>
        {/* CRITICAL: Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
