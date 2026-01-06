"use client";
import Providers from "./providers";
import "./globals.css"; // if you have a globals css
import Nav from "@/components/layout/Navbar";
import RouteLoadingBar from "@/components/shared/RouteLoadingBar";
import Toaster from "@/components/shared/Toaster";
import BetaBadge from "@/components/BetaBadge";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themeInitScript } from "@/lib/themeScript";
import {
  siteConfig,
  brandAssets,
  defaultKeywords,
  socialProfiles,
  generateStructuredData,
} from "@/lib/seo/metadata";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"], // You can specify different weights
  subsets: ["latin"], // Required subset
  display: "swap", // Optional: control font loading behavior
});

export default function RootLayout({ children }) {
  // Centralized SEO data from metadata configuration
  const siteName = siteConfig.name;
  const siteUrl = siteConfig.domain;
  const title = `${siteConfig.name} - ${siteConfig.tagline}`;
  const description = siteConfig.description;
  const keywords = defaultKeywords.join(", ");
  const image = `${siteUrl}${brandAssets.ogImage}`;
  const logo = `${siteUrl}${brandAssets.logo}`;
  const locale = siteConfig.locale;
  const author = siteConfig.author;

  useEffect(() => {
    const handler = (e) => {
      console.error("Global error caught:", e?.error ?? e);
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <head>
        {/* CRITICAL: Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* Primary meta tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={siteConfig.themeColor} />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content={siteName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Canonical & language/hreflang */}
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" href={siteUrl} hrefLang="en" />
        <link rel="alternate" href={siteUrl} hrefLang="x-default" />

        {/* Favicons (update paths if needed) */}
        <link rel="icon" href={brandAssets.favicon} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="og:image:alt"
          content={`${siteName} - AI-Powered Client Simulation Platform`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={locale} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta
          name="twitter:image:alt"
          content={`${siteName} - AI-Powered Client Simulation Platform`}
        />

        {/* Preconnect / fonts (if you use Google Fonts, uncomment and adjust) */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}

        {/* Structured Data (JSON-LD) for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData("organization")),
          }}
        />

        {/* Structured Data (JSON-LD) for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData("website")),
          }}
        />

        {/* Structured Data (JSON-LD) for Educational Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData("educational")),
          }}
        />
      </head>

      <body suppressHydrationWarning>
        <ThemeProvider>
          <BetaBadge />
          <Toaster />
          <RouteLoadingBar />
          {/* <Nav /> */}
          {/* Quick debug link to NextAuth's built-in sign-in page */}
          {/* <a
            href="/api/auth/signin"
            style={{
              position: "fixed",
              right: 12,
              top: 12,
              zIndex: 9999,
              background: "#0ea5a4",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Sign in
          </a> */}
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
