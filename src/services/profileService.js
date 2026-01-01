/**
 * Profile Service
 * Handles all profile-related API interactions
 */

/**
 * Fetch the current user's profile
 * @returns {Promise<Object>} Profile data
 */
export async function getProfile() {
  try {
    const response = await fetch("/api/profile");
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch profile");
    }

    return data.data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
}

/**
 * Update profile information
 * @param {Object} updates - Profile updates (personal, professional, preferences)
 * @returns {Promise<Object>} Updated profile data
 */
export async function updateProfile(updates) {
  try {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to update profile");
    }

    return data.data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}

/**
 * Check if a username is available
 * @param {string} username - Username to check
 * @returns {Promise<boolean>} True if available, false otherwise
 */
export async function checkUsernameAvailability(username) {
  try {
    const response = await fetch(
      `/api/profile/check-username?username=${encodeURIComponent(username)}`
    );
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to check username");
    }

    return data.available;
  } catch (error) {
    console.error("Check username error:", error);
    throw error;
  }
}

/**
 * Delete user account
 * @param {string} confirmation - Must be "DELETE_MY_ACCOUNT"
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteAccount(confirmation) {
  try {
    const response = await fetch("/api/profile", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmation })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to delete account");
    }

    return data;
  } catch (error) {
    console.error("Delete account error:", error);
    throw error;
  }
}

/**
 * Update user avatar
 * @param {string} avatarUrl - URL or data URL of the avatar
 * @returns {Promise<Object>} Updated profile data
 */
export async function updateAvatar(avatarUrl) {
  return updateProfile({ customAvatar: avatarUrl });
}

/**
 * Update personal information
 * @param {Object} personalInfo - Personal information fields
 * @returns {Promise<Object>} Updated profile data
 */
export async function updatePersonalInfo(personalInfo) {
  return updateProfile({ personal: personalInfo });
}

/**
 * Update professional information
 * @param {Object} professionalInfo - Professional information fields
 * @returns {Promise<Object>} Updated profile data
 */
export async function updateProfessionalInfo(professionalInfo) {
  return updateProfile({ professional: professionalInfo });
}

/**
 * Update user preferences
 * @param {Object} preferences - User preferences
 * @returns {Promise<Object>} Updated profile data
 */
export async function updatePreferences(preferences) {
  return updateProfile({ preferences });
}
