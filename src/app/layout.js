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

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"], // You can specify different weights
  subsets: ["latin"], // Required subset
  display: "swap", // Optional: control font loading behavior
});

export default function RootLayout({ children }) {
  // Centralized SEO data - edit these values for your site
  const siteName = "Ficlance";
  const siteUrl = "https://www.ficlance.com"; // update to your real domain
  const title = "Ficlance — Freelance Marketplace for Top Talent";
  const description =
    "Ficlance connects businesses with top freelance talent. Find experts, manage projects, and pay securely — all in one place.";
  const keywords =
    "freelance, marketplace, remote jobs, gigs, contractors, Ficlance, hire freelancers, freelance platform";
  const image = `${siteUrl}/og-image.png`; // update to your real OG image path
  const locale = "en_US";
  const author = "Ficlance Team";

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
        <meta name="theme-color" content="#0ea5a4" />

        {/* Canonical & language/hreflang */}
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" href={siteUrl} hrefLang="en" />

        {/* Favicons (update paths if needed) */}
        <link rel="icon" href="/favicon.ico" />
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
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:locale" content={locale} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Preconnect / fonts (if you use Google Fonts, uncomment and adjust) */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}

        {/* Structured Data (JSON-LD) for Organization and WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              sameAs: [
                // add social profiles
                "https://twitter.com/ficlance",
                "https://www.linkedin.com/company/ficlance",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: siteUrl,
              name: siteName,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body>
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
