/**
 * SEO Metadata Configuration for FicLance
 * Centralized SEO configuration for consistent metadata across the application
 */

// Base site configuration
export const siteConfig = {
  name: "FicLance",
  domain: "https://www.ficlance.com", // Update with actual production domain
  description:
    "AI-Powered Client Simulation Platform Where Students Build Real-World Projects With Deadlines, Client Communication, Client Feedback & a Shareable Portfolio",
  tagline: "Your Journey from Learner to Leader Starts Here",
  locale: "en_US",
  author: "FicLance Team",
  themeColor: "#0ea5a4",
  twitterHandle: "@ficlance", // Update with actual Twitter handle
};

// Logo and brand assets
export const brandAssets = {
  logo: "/Logo2.png",
  invertedLogo: "/InvertedLogo.png",
  ogImage: "/OG image (2).png",
  favicon: "/favicon.ico",
  favicon32: "/favicon-32x32.png",
  favicon16: "/favicon-16x16.png",
  appleTouchIcon: "/apple-touch-icon.png",
};

// Default keywords for all pages
export const defaultKeywords = [
  "AI-powered learning platform",
  "client simulation",
  "real-world projects",
  "student portfolio",
  "freelance experience",
  "project-based learning",
  "skill development",
  "client communication",
  "deadline management",
  "portfolio builder",
  "FicLance",
  "beginner coding projects",
  "intermediate programming",
  "advanced development",
  "shareable portfolio",
  "proof of skills",
];

// Social media profiles
export const socialProfiles = {
  twitter: "https://twitter.com/ficlance",
  linkedin: "https://www.linkedin.com/company/ficlance",
  github: "https://github.com/ficlance",
  facebook: "https://www.facebook.com/ficlance",
};

/**
 * Generate complete metadata object for a page
 * @param {Object} options - Page-specific metadata options
 * @returns {Object} Complete metadata configuration
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = brandAssets.ogImage,
  type = "website",
  noIndex = false,
  author = siteConfig.author,
}) {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.tagline}`;
  const pageDescription = description || siteConfig.description;
  const pageUrl = `${siteConfig.domain}${path}`;
  const pageImage = image.startsWith("http")
    ? image
    : `${siteConfig.domain}${image}`;
  const allKeywords = [
    ...new Set([
      ...defaultKeywords,
      ...(Array.isArray(keywords) ? keywords : []),
    ]),
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    author,
    robots: noIndex
      ? "noindex, nofollow"
      : "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    canonical: pageUrl,
    openGraph: {
      type,
      siteName: siteConfig.name,
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      image: pageImage,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      image: pageImage,
    },
  };
}

/**
 * Page-specific metadata configurations
 */
export const pageMetadata = {
  home: {
    title: "AI-Powered Client Simulation Platform",
    description:
      "Build real-world projects with AI-generated client briefs, simulated interactions, and get a shareable portfolio. Help students gain proof of skills through practical experience with deadlines and client feedback.",
    keywords: [
      "AI client simulation",
      "student projects platform",
      "real-world experience",
      "portfolio generator",
      "learn by doing",
      "project deadlines",
      "client feedback simulation",
      "coding practice platform",
    ],
    path: "/",
  },

  dashboard: {
    title: "Dashboard",
    description:
      "Track your projects, deadlines, achievements, and skill progress on FicLance. Monitor in-progress and completed projects, view upcoming deadlines, and manage your learning journey.",
    keywords: [
      "project dashboard",
      "skill tracking",
      "achievement tracker",
      "project management",
      "learning progress",
      "deadline tracker",
    ],
    path: "/dashboard",
    noIndex: true, // Private page
  },

  newProject: {
    title: "Start New Project",
    description:
      "Choose your next client simulation project on FicLance. Filter by difficulty level (beginner, intermediate, advanced), tech stack, and project duration to find the perfect project for your skill level.",
    keywords: [
      "new project",
      "client simulation",
      "project selection",
      "coding projects",
      "tech stack projects",
      "beginner projects",
      "intermediate projects",
      "advanced projects",
    ],
    path: "/new-project",
    noIndex: true,
  },

  chat: {
    title: "Project Chat",
    description:
      "Communicate with AI clients on FicLance. Receive project requirements, ask questions, submit your work, and get detailed feedback just like working with real clients.",
    keywords: [
      "AI client chat",
      "project requirements",
      "client communication",
      "project feedback",
      "AI agent communication",
    ],
    path: "/chat",
    noIndex: true,
  },

  portfolio: {
    title: "Portfolio",
    description:
      "Showcase your completed projects with FicLance portfolio. Display your skills, project statistics, client feedback, badges, and achievements in a professional shareable format.",
    keywords: [
      "developer portfolio",
      "project showcase",
      "skill statistics",
      "client feedback",
      "achievements",
      "shareable portfolio",
      "proof of skills",
    ],
    path: "/portfolio",
  },

  profile: {
    title: "Profile Settings",
    description:
      "Manage your FicLance profile, update personal information, track your learning progress, and customize your account settings.",
    keywords: [
      "user profile",
      "account settings",
      "profile management",
      "personal information",
    ],
    path: "/profile",
    noIndex: true,
  },

  signin: {
    title: "Sign In",
    description:
      "Sign in to FicLance to continue your learning journey. Access your projects, portfolio, and client simulations.",
    keywords: ["login", "sign in", "user authentication", "account access"],
    path: "/auth/signin",
    noIndex: true,
  },

  signup: {
    title: "Sign Up",
    description:
      "Create your FicLance account and start building real-world projects. Get AI-generated client briefs, practice client communication, and build a shareable portfolio to prove your skills.",
    keywords: [
      "sign up",
      "create account",
      "register",
      "join FicLance",
      "student registration",
    ],
    path: "/auth/signup",
  },

  helpDesk: {
    title: "Help Desk",
    description:
      "Get help with FicLance. Browse guides, tutorials, and frequently asked questions to make the most of your learning experience.",
    keywords: [
      "help center",
      "support",
      "tutorials",
      "FAQ",
      "guides",
      "documentation",
    ],
    path: "/help-desk",
  },

  achievements: {
    title: "Achievements",
    description:
      "View your FicLance achievements, badges, and milestones. Track your progress and celebrate your accomplishments as you complete projects and develop skills.",
    keywords: [
      "achievements",
      "badges",
      "milestones",
      "progress tracking",
      "accomplishments",
    ],
    path: "/dashboard/achievements",
    noIndex: true,
  },
};

/**
 * Generate structured data (JSON-LD) for different page types
 */
export function generateStructuredData(type, data = {}) {
  const baseStructure = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case "organization":
      return {
        ...baseStructure,
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: `${siteConfig.domain}${brandAssets.logo}`,
        description: siteConfig.description,
        sameAs: Object.values(socialProfiles),
      };

    case "website":
      return {
        ...baseStructure,
        "@type": "WebSite",
        url: siteConfig.domain,
        name: siteConfig.name,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.domain}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };

    case "educational":
      return {
        ...baseStructure,
        "@type": "EducationalOrganization",
        name: siteConfig.name,
        url: siteConfig.domain,
        description: siteConfig.description,
        educationalCredentialAwarded: "Project Completion Certificate",
        teaches: [
          "Software Development",
          "Client Communication",
          "Project Management",
          "Full-Stack Development",
        ],
      };

    case "course":
      return {
        ...baseStructure,
        "@type": "Course",
        name: data.name || "FicLance Project Simulation",
        description:
          data.description ||
          "Learn through AI-powered client project simulations",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.domain,
        },
        courseMode: "online",
        educationalLevel: data.level || "Beginner to Advanced",
        teaches: data.skills || ["Web Development", "Client Communication"],
      };

    case "breadcrumb":
      return {
        ...baseStructure,
        "@type": "BreadcrumbList",
        itemListElement: (data.items || []).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteConfig.domain}${item.path}`,
        })),
      };

    case "profile":
      return {
        ...baseStructure,
        "@type": "ProfilePage",
        name: data.name || "User Profile",
        description: data.description || "FicLance user profile and portfolio",
        mainEntity: {
          "@type": "Person",
          name: data.userName || "FicLance User",
          url: data.url || siteConfig.domain,
          worksFor: {
            "@type": "Organization",
            name: siteConfig.name,
          },
        },
      };

    default:
      return baseStructure;
  }
}
