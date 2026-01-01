/**
 * Frontend Configuration
 * Centralized configuration for environment variables
 */

/**
 * Check if the application is running in beta mode
 * @returns {boolean} True if beta mode is enabled
 */
export const isBetaMode = () => {
  return process.env.NEXT_PUBLIC_IS_BETA_MODE === "true";
};

/**
 * Get the API base URL
 * @returns {string} API base URL
 */
export const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
};

export default {
  isBetaMode,
  getApiBaseUrl,
};
