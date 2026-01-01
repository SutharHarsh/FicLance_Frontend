/**
 * Check if user has any dashboard data (projects, activities, etc.)
 * @param {Object} data - Dashboard data object from data/dashboard.js
 * @returns {boolean} - True if user has at least some data to display
 */
export const hasDashboardData = (data) => {
  if (!data) return false;

  const {
    inProgressProjects = [],
    completedProjects = [],
    recentActivities = [],
    deadlines = [],
  } = data;

  const projectCount = (inProgressProjects?.length || 0) + (completedProjects?.length || 0);
  const activityCount = recentActivities?.length || 0;
  const deadlineCount = deadlines?.length || 0;

  return projectCount > 0 || activityCount > 0 || deadlineCount > 0;
};

/**
 * Get dashboard data with safe fallbacks
 * @param {Object} data - Dashboard data object
 * @returns {Object} - Destructured data with fallbacks
 */
export const getSafeDashboardData = (data) => {
  return {
    inProgressProjects: data?.inProgressProjects || [],
    completedProjects: data?.completedProjects || [],
    recentActivities: data?.recentActivities || [],
    deadlines: data?.deadlines || [],
    dashboardCards: data?.dashboardCards || [],
    welcomeInfo: data?.welcomeInfo || {},
    skills: data?.skills || [],
    recommendations: data?.recommendations || [],
  };
};
