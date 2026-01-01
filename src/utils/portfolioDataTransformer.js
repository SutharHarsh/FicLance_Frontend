/**
 * Portfolio Data Transformer
 * Converts user profile and project data into a unified structure for all portfolio themes
 */

/**
 * Transform user data from API into portfolio-ready format
 * @param {Object} user - User object from AuthContext
 * @param {Object} dashboardData - Dashboard data object containing projects and badges
 * @returns {Object} - Normalized portfolio data
 */
export function transformUserData(user, dashboardData = {}) {
  const projects = dashboardData?.activity || [];
  const badges = dashboardData?.badges || [];

  if (!user) {
    return getDefaultPortfolioData();
  }

  // DEBUG: Inspect incoming projects data for progress field
  if (projects && projects.length > 0) {
    console.log("Transformation - Incoming Projects:", projects.map(p => ({
      id: p.id || p._id,
      title: p.title || p.projectName,
      progress: p.progress,
      meta: p.meta
    })));
  }

  // Merge manual projects with platform projects
  const manualProjects = (user.profile?.portfolio?.manualProjects || []).map(p => ({
    id: `manual-${p.name}`,
    title: p.name,
    description: p.description,
    status: p.status || "active",
    priority: p.priority || "medium",
    progress: p.progress || 0,
    deadline: p.deadline,
    tags: p.techStack ? p.techStack.split(",").map(t => t.trim()) : [],
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    isManual: true,
    createdAt: new Date(),
  }));

  const platformProjects = transformProjects(projects);
  const allProjects = [...manualProjects, ...platformProjects];

  return {
    // Basic Info
    user: {
      name: user.name || "Your Name",
      email: user.email || "",
      avatar: user.avatarUrl || "",
      role: user.profile?.careerGoal || "Professional",
      bio: user.profile?.bio || user.about || "",
      tagline: user.description || "Building amazing things",
      location: user.profile?.location || "",
      experienceLevel: user.profile?.experienceLevel || "intermediate",
      yearsOfExperience: calculateYearsOfExperience(user.createdAt),
    },

    // Contact & Links
    contact: {
      email: user.email || "",
      phone: user.profile?.phone || "",
      website: user.profile?.portfolioLinks?.website || "",
      github: user.profile?.portfolioLinks?.github || "",
      linkedin: user.profile?.portfolioLinks?.linkedin || "",
      customLinks: user.profile?.portfolio?.customLinks || [],
    },

    // Skills & Tech Stack
    skills: {
      primary: user.profile?.skills?.slice(0, 5) || [],
      all: user.profile?.skills || [],
      techStack: user.profile?.preferredTechStack || [],
      experienceLevel: user.profile?.experienceLevel || "intermediate",
    },

    // Experience (NEW: structured experience data)
    experiences: user.profile?.portfolio?.experiences || [],

    // Projects (UPDATED: merge manual + platform)
    projects: allProjects,

    // Stats & Metrics
    stats: {
      totalProjects: allProjects.length,
      completedProjects: allProjects.filter((p) => p.status === "completed").length || 0,
      activeProjects: allProjects.filter((p) => p.status === "active").length || 0,
      badgesCount: badges.length || 0,
      skillsCount: user.profile?.skills?.length || 0,
      experienceYears: calculateYearsOfExperience(user.createdAt),
      manualProjectsCount: manualProjects.length,
      platformProjectsCount: platformProjects.length,
    },

    // Professional Info
    professional: {
      availability: user.profile?.availability?.hoursPerWeek || 0,
      careerGoal: user.profile?.careerGoal || "learning",
      currentRole:
        user.profile?.currentRole || user.profile?.careerGoal || "Developer",
      company: user.profile?.company || "",
      yearsExperience: calculateYearsOfExperience(user.createdAt),
    },

    // Portfolio Settings & Custom Sections
    portfolio: {
      themeId: user.profile?.portfolio?.themeId || "executive-professional",
      isPublic: user.profile?.portfolio?.isPublic || false,
      customSections: user.profile?.portfolio?.customSections || [],
      activeSections: user.profile?.portfolio?.activeSections || [
        "About",
        "Experience",
        "Projects",
        "Skills",
        "Contact",
      ],
      featuredProjects: user.profile?.portfolio?.featuredProjects || [],
    },

    // Activity & Engagement
    activity: {
      joinedDate: user.createdAt,
      lastActive: user.lastLoginAt || user.createdAt,
      emailVerified: user.emailVerified || false,
    },
  };
}

/**
 * Transform projects array into portfolio-ready format
 */
function transformProjects(projects) {
  if (!projects || projects.length === 0) {
    return [];
  }

  return projects.map((project) => ({
    id: project._id || project.id,
    title: project.title || "Untitled Project",
    description: project.description || "",
    status: project.status || "active",
    priority: project.priority || "medium",
    progress: project.progress || 0,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    deadline: project.deadline,
    tags: project.tags || [],
    // Computed fields
    daysActive: calculateDaysActive(project.createdAt),
    isOverdue: project.deadline && new Date(project.deadline) < new Date(),
    statusLabel: getStatusLabel(project.status),
  }));
}

/**
 * Calculate years of experience based on join date
 */
function calculateYearsOfExperience(joinDate) {
  if (!joinDate) return 0;
  const years = (new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24 * 365);
  return Math.max(0, Math.floor(years));
}

/**
 * Calculate days a project has been active
 */
function calculateDaysActive(createdAt) {
  if (!createdAt) return 0;
  return Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24));
}

/**
 * Get human-readable status label
 */
function getStatusLabel(status) {
  const labels = {
    active: "In Progress",
    completed: "Completed",
    paused: "On Hold",
    overdue: "Overdue",
  };
  return labels[status] || status;
}

/**
 * Get default portfolio data for when user data is not available
 */
export function getDefaultPortfolioData() {
  return {
    user: {
      name: "Your Name",
      email: "",
      avatar: "",
      role: "Professional",
      bio: "Tell us about yourself",
      tagline: "Building amazing things",
      location: "",
      experienceLevel: "intermediate",
      yearsOfExperience: 0,
    },
    contact: {
      email: "",
      phone: "",
      website: "",
      github: "",
      linkedin: "",
      customLinks: [],
    },
    skills: {
      primary: ["Skill 1", "Skill 2", "Skill 3"],
      all: ["Skill 1", "Skill 2", "Skill 3"],
      techStack: ["Tech 1", "Tech 2", "Tech 3"],
      experienceLevel: "intermediate",
    },
    experiences: [],
    projects: [],
    stats: {
      totalProjects: 0,
      completedProjects: 0,
      activeProjects: 0,
      skillsCount: 0,
      experienceYears: 0,
      manualProjectsCount: 0,
      platformProjectsCount: 0,
    },
    professional: {
      availability: 0,
      careerGoal: "learning",
      currentRole: "Developer",
      company: "",
      yearsExperience: 0,
    },
    portfolio: {
      themeId: "executive-professional",
      isPublic: false,
      customSections: [],
      activeSections: ["About", "Experience", "Projects", "Skills", "Contact"],
      featuredProjects: [],
    },
    activity: {
      joinedDate: new Date(),
      lastActive: new Date(),
      emailVerified: false,
    },
  };
}

/**
 * Validate portfolio data structure
 */
export function validatePortfolioData(data) {
  const required = ["user", "contact", "skills", "projects", "stats"];
  return required.every((key) => data && data[key]);
}

/**
 * Merge user preferences with portfolio data
 */
export function mergeWithPreferences(portfolioData, preferences = {}) {
  return {
    ...portfolioData,
    preferences: {
      theme: preferences.theme || "system",
      showEmail: preferences.showEmail !== false,
      showPhone: preferences.showPhone !== false,
      showProjects: preferences.showProjects !== false,
    },
  };
}
