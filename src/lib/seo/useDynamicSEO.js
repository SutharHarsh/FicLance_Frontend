"use client";

/**
 * useDynamicSEO Hook
 * Provides runtime SEO metadata updates based on dynamic content
 * Use this hook for pages with dynamic data (projects, user profiles, etc.)
 */

import { useEffect, useMemo } from "react";
import { generateMetadata, siteConfig, brandAssets } from "./metadata";

/**
 * Updates document metadata dynamically at runtime
 * @param {Object} options - Metadata options
 */
export function useDynamicSEO(options) {
  const {
    title,
    description,
    keywords = [],
    path = "",
    image = brandAssets.ogImage,
    type = "website",
    structuredData = null,
  } = options || {};

  useEffect(() => {
    // Generate full metadata
    const metadata = generateMetadata({
      title,
      description,
      keywords,
      path,
      image,
      type,
    });

    // Update document title
    if (metadata.title) {
      document.title = metadata.title;
    }

    // Update or create meta tags
    updateMetaTag("name", "description", metadata.description);
    updateMetaTag("name", "keywords", metadata.keywords);
    updateMetaTag("name", "author", metadata.author);
    updateMetaTag("name", "robots", metadata.robots);

    // Open Graph tags
    updateMetaTag("property", "og:type", metadata.openGraph.type);
    updateMetaTag("property", "og:site_name", metadata.openGraph.siteName);
    updateMetaTag("property", "og:url", metadata.openGraph.url);
    updateMetaTag("property", "og:title", metadata.openGraph.title);
    updateMetaTag("property", "og:description", metadata.openGraph.description);
    updateMetaTag("property", "og:image", metadata.openGraph.image);
    updateMetaTag("property", "og:locale", metadata.openGraph.locale);

    // Twitter Card tags
    updateMetaTag("name", "twitter:card", metadata.twitter.card);
    updateMetaTag("name", "twitter:site", metadata.twitter.site);
    updateMetaTag("name", "twitter:creator", metadata.twitter.creator);
    updateMetaTag("name", "twitter:title", metadata.twitter.title);
    updateMetaTag("name", "twitter:description", metadata.twitter.description);
    updateMetaTag("name", "twitter:image", metadata.twitter.image);

    // Update canonical link
    updateCanonicalLink(metadata.canonical);

    // Add structured data if provided
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [title, description, keywords, path, image, type, structuredData]);
}

/**
 * Helper function to update or create a meta tag
 */
function updateMetaTag(attribute, attributeValue, content) {
  if (!content) return;

  let element = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`
  );

  if (element) {
    element.setAttribute("content", content);
  } else {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    element.setAttribute("content", content);
    document.head.appendChild(element);
  }
}

/**
 * Helper function to update canonical link
 */
function updateCanonicalLink(href) {
  if (!href) return;

  let link = document.querySelector('link[rel="canonical"]');

  if (link) {
    link.setAttribute("href", href);
  } else {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", href);
    document.head.appendChild(link);
  }
}

/**
 * Helper function to add/update structured data
 */
function updateStructuredData(data) {
  const scriptId = "dynamic-structured-data";
  let script = document.getElementById(scriptId);

  if (script) {
    script.innerHTML = JSON.stringify(data);
  } else {
    script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

/**
 * Hook for project-specific SEO
 */
export function useProjectSEO(project) {
  const seoOptions = useMemo(
    () =>
      project
        ? {
            title: `${project.name} Project`,
            description: `${
              project.description || "Work on a real-world project simulation"
            } - Built with ${
              project.techStack?.join(", ") || "various technologies"
            } on FicLance.`,
            keywords: [
              project.name,
              ...(project.techStack || []),
              project.difficulty,
              "project simulation",
              "client project",
            ],
            path: `/client/${encodeURIComponent(project.name)}`,
            structuredData: {
              "@context": "https://schema.org",
              "@type": "Project",
              name: project.name,
              description: project.description,
              skillsRequired: project.techStack,
              difficulty: project.difficulty,
            },
          }
        : null,
    [project]
  );

  useDynamicSEO(seoOptions);
}

/**
 * Hook for user portfolio SEO
 */
export function usePortfolioSEO(user) {
  const seoOptions = useMemo(
    () =>
      user
        ? {
            title: `${user.name}'s Portfolio`,
            description: `View ${user.name}'s project portfolio on FicLance. ${
              user.projectCount || 0
            } completed projects showcasing skills in ${
              user.skills?.join(", ") || "various technologies"
            }.`,
            keywords: [
              user.name,
              "developer portfolio",
              "project showcase",
              ...(user.skills || []),
            ],
            path: `/p/${user.username}`,
            type: "profile",
            structuredData: {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              name: `${user.name}'s Portfolio`,
              description: `${user.name}'s project portfolio and achievements`,
              mainEntity: {
                "@type": "Person",
                name: user.name,
                jobTitle: user.role || "Developer",
                url: `${siteConfig.domain}/p/${user.username}`,
                knowsAbout: user.skills || [],
              },
            },
          }
        : null,
    [user]
  );

  useDynamicSEO(seoOptions);
}

/**
 * Hook for chat/conversation SEO
 */
export function useChatSEO(conversation) {
  const seoOptions = useMemo(
    () =>
      conversation
        ? {
            title: `Chat - ${conversation.projectName || "Project"}`,
            description: `Client communication for ${
              conversation.projectName || "project"
            } on FicLance. Work with AI clients, receive requirements, and get feedback.`,
            keywords: [
              conversation.projectName,
              "client chat",
              "project communication",
              "AI client",
            ],
            path: `/chat/${conversation.id}`,
            noIndex: true, // Private conversations shouldn't be indexed
          }
        : null,
    [conversation]
  );

  useDynamicSEO(seoOptions);
}

export default useDynamicSEO;
