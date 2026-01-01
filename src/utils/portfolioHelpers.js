/**
 * Portfolio Theme Helpers
 * Shared utilities and fallback data for all portfolio themes
 */

/**
 * Get user display data with fallbacks
 */
export function getUserData(data) {
  const profile = data?.user?.profile || {};
  return {
    name: data?.user?.name || "Your Name",
    email: data?.user?.email || "email@example.com",
    avatar: data?.user?.avatar || "", // Updated to match transformer key 'avatar' vs 'avatarUrl'
    role: data?.user?.role || "Professional",
    bio: data?.user?.bio || profile.bio || "Add your bio in profile settings",
    tagline: data?.user?.tagline || "Building amazing things",
    location: data?.user?.location || "Online",
    experienceLevel: data?.user?.experienceLevel || "intermediate",
    yearsOfExperience: data?.user?.yearsOfExperience || 0,
  };
}

/**
 * Get contact data with fallbacks
 */
export function getContactData(data) {
  return {
    email: data?.contact?.email || data?.user?.email || "",
    phone: data?.contact?.phone || "",
    website: data?.contact?.website || "",
    github: data?.contact?.github || "",
    linkedin: data?.contact?.linkedin || "",
  };
}

/**
 * Get skills data with fallbacks
 */
export function getSkillsData(data) {
  return {
    primary: data?.skills?.primary || ["Add skills", "in your", "profile"],
    all: data?.skills?.all || ["Add skills in your profile"],
    techStack: data?.skills?.techStack || ["Add tech stack in your profile"],
    experienceLevel: data?.skills?.experienceLevel || "intermediate",
  };
}

/**
 * Get projects data with fallbacks
 */
export function getProjectsData(data) {
  if (data?.projects && data.projects.length > 0) {
    return data.projects.slice(0, 6); // Limit to 6 projects for display
  }

  // Return sample project structure
  return [
    {
      id: "sample-1",
      title: "No Projects Yet",
      description: "Create your first project in the dashboard to see it here",
      status: "active",
      progress: 0,
      tags: [],
    },
  ];
}

/**
 * Get stats data with fallbacks
 */
export function getStatsData(data) {
  return {
    totalProjects: data?.stats?.totalProjects || 0,
    completedProjects: data?.stats?.completedProjects || 0,
    activeProjects: data?.stats?.activeProjects || 0,
    badgesCount: data?.stats?.badgesCount || 0,
    skillsCount: data?.stats?.skillsCount || 0,
    experienceYears: data?.stats?.experienceYears || 0,
  };
}

/**
 * Get professional data with fallbacks
 */
export function getProfessionalData(data) {
  return {
    availability: data?.professional?.availability || 0,
    careerGoal: data?.professional?.careerGoal || "learning",
    currentRole: data?.professional?.currentRole || "Developer",
    company: data?.professional?.company || "",
    yearsExperience: data?.professional?.yearsExperience || 0,
  };
}

/**
 * Get portfolio settings with fallbacks
 */
export function getPortfolioSettings(data) {
  const p = data?.user?.profile?.portfolio || data?.portfolio;
  return {
    themeId: p?.themeId || "executive-professional",
    isPublic: p?.isPublic || false,
    customSections: p?.customSections || [],
    activeSections: p?.activeSections || [
      "About",
      "Experience",
      "Projects",
      "Skills",
      "Contact",
    ],
    featuredProjects: p?.featuredProjects || [],
  };
}

/**
 * Format experience level to display text
 */
export function formatExperienceLevel(level) {
  const levels = {
    learning: "Beginner",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  };
  return levels[level?.toLowerCase()] || "Professional";
}

/**
 * Format career goal to display text
 */
export function formatCareerGoal(goal) {
  const goals = {
    learning: "Learning & Growing",
    freelancing: "Freelancing",
    job: "Job Seeking",
    other: "Professional Development",
  };
  return goals[goal] || goal;
}

/**
 * Get project status color
 */
export function getProjectStatusColor(status) {
  const colors = {
    active: { bg: "bg-blue-500", text: "text-blue-500", bgLight: "bg-blue-50" },
    completed: {
      bg: "bg-green-500",
      text: "text-green-500",
      bgLight: "bg-green-50",
    },
    paused: {
      bg: "bg-amber-500",
      text: "text-amber-500",
      bgLight: "bg-amber-50",
    },
    overdue: { bg: "bg-red-500", text: "text-red-500", bgLight: "bg-red-50" },
  };
  return colors[status] || colors.active;
}

/**
 * Calculate completion percentage
 */
export function calculateCompletion(completed, total) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
  if (!date) return "Not specified";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid date";
  }
}

/**
 * Get initials from name
 */
export function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Check if user has minimal data
 */
export function hasMinimalData(data) {
  return (
    data &&
    data.user &&
    data.user.name &&
    data.user.name !== "Your Name" &&
    (data.projects?.length > 0 || data.skills?.all?.length > 0)
  );
}

/**
 * Generate sample projects for themes (when no real projects exist)
 */
export function generateSampleProjects(count = 3) {
  const samples = [
    {
      id: "sample-1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI",
      status: "completed",
      progress: 100,
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "sample-2",
      title: "Mobile App Development",
      description: "Cross-platform mobile application",
      status: "active",
      progress: 65,
      tags: ["React Native", "Firebase"],
    },
    {
      id: "sample-3",
      title: "Data Analytics Dashboard",
      description: "Real-time analytics and visualization tool",
      status: "active",
      progress: 40,
      tags: ["Python", "D3.js", "PostgreSQL"],
    },
  ];

  return samples.slice(0, count);
}
