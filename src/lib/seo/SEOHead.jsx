/**
 * SEOHead Component
 * Renders comprehensive SEO meta tags for Next.js pages
 * Use this component in individual pages for page-specific SEO
 */

import Head from "next/head";
import { siteConfig, brandAssets } from "./metadata";

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  openGraph,
  twitter,
  robots,
  structuredData = [],
  noIndex = false,
}) {
  // Construct full title
  const fullTitle = title || `${siteConfig.name} - ${siteConfig.tagline}`;
  const metaDescription = description || siteConfig.description;
  const metaRobots = noIndex ? "noindex, nofollow" : (robots || "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large");
  
  // Open Graph defaults
  const ogDefaults = {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    image: `${siteConfig.domain}${brandAssets.ogImage}`,
    ...openGraph,
  };

  // Twitter Card defaults
  const twitterDefaults = {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    image: `${siteConfig.domain}${brandAssets.ogImage}`,
    ...twitter,
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={siteConfig.author} />
      <meta name="robots" content={metaRobots} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content={siteConfig.themeColor} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogDefaults.type} />
      <meta property="og:site_name" content={ogDefaults.siteName} />
      <meta property="og:locale" content={ogDefaults.locale} />
      {ogDefaults.url && <meta property="og:url" content={ogDefaults.url} />}
      {ogDefaults.title && <meta property="og:title" content={ogDefaults.title} />}
      {ogDefaults.description && <meta property="og:description" content={ogDefaults.description} />}
      {ogDefaults.image && <meta property="og:image" content={ogDefaults.image} />}
      {ogDefaults.image && <meta property="og:image:alt" content={ogDefaults.title || fullTitle} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterDefaults.card} />
      {twitterDefaults.site && <meta name="twitter:site" content={twitterDefaults.site} />}
      {twitterDefaults.creator && <meta name="twitter:creator" content={twitterDefaults.creator} />}
      {twitterDefaults.title && <meta name="twitter:title" content={twitterDefaults.title} />}
      {twitterDefaults.description && <meta name="twitter:description" content={twitterDefaults.description} />}
      {twitterDefaults.image && <meta name="twitter:image" content={twitterDefaults.image} />}

      {/* Structured Data (JSON-LD) */}
      {structuredData.map((data, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      {/* Favicons */}
      <link rel="icon" href={brandAssets.favicon} />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Head>
  );
}
