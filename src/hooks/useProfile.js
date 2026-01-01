import { useState, useEffect, useCallback } from "react";
import * as profileService from "@/services/profileService";

/**
 * Custom hook for managing user profile
 * Provides profile data, loading state, and update functions
 * 
 * @returns {Object} Profile state and methods
 */
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch profile from API
   */
  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message);
      console.error("Profile fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update profile with new data
   */
  const updateProfile = useCallback(async (updates) => {
    try {
      const updated = await profileService.updateProfile(updates);
      setProfile(prevProfile => ({ ...prevProfile, ...updated }));
      return { success: true, data: updated };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Update personal information
   */
  const updatePersonalInfo = useCallback(async (personalInfo) => {
    return updateProfile({ personal: personalInfo });
  }, [updateProfile]);

  /**
   * Update professional information
   */
  const updateProfessionalInfo = useCallback(async (professionalInfo) => {
    return updateProfile({ professional: professionalInfo });
  }, [updateProfile]);

  /**
   * Update preferences
   */
  const updatePreferences = useCallback(async (preferences) => {
    return updateProfile({ preferences });
  }, [updateProfile]);

  /**
   * Update avatar
   */
  const updateAvatar = useCallback(async (avatarUrl) => {
    return updateProfile({ customAvatar: avatarUrl });
  }, [updateProfile]);

  /**
   * Check username availability
   */
  const checkUsername = useCallback(async (username) => {
    try {
      const available = await profileService.checkUsernameAvailability(username);
      return { success: true, available };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Delete account
   */
  const deleteAccount = useCallback(async (confirmation) => {
    try {
      await profileService.deleteAccount(confirmation);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Refresh profile data
   */
  const refresh = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    // State
    profile,
    isLoading,
    error,

    // Methods
    updateProfile,
    updatePersonalInfo,
    updateProfessionalInfo,
    updatePreferences,
    updateAvatar,
    checkUsername,
    deleteAccount,
    refresh
  };
}

/**
 * Hook for debounced username availability checking
 * 
 * @param {string} username - Username to check
 * @param {number} delay - Debounce delay in ms (default: 500)
 * @returns {Object} Check state and result
 */
export function useUsernameCheck(username, delay = 500) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state if username is empty or too short
    if (!username || username.length < 3) {
      setIsAvailable(null);
      setError(null);
      return;
    }

    setIsChecking(true);
    setError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const available = await profileService.checkUsernameAvailability(username);
        setIsAvailable(available);
      } catch (err) {
        setError(err.message);
        setIsAvailable(null);
      } finally {
        setIsChecking(false);
      }
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      setIsChecking(false);
    };
  }, [username, delay]);

  return {
    isChecking,
    isAvailable,
    error
  };
}

/**
 * Hook for profile completion percentage
 * 
 * @param {Object} profile - Profile object
 * @returns {number} Completion percentage (0-100)
 */
export function useProfileCompletion(profile) {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    if (!profile) {
      setCompletion(0);
      return;
    }

    const fields = [
      profile.username,
      profile.bio,
      profile.skills?.length > 0,
      profile.experienceLevel,
      profile.preferredTechStack?.length > 0,
      profile.careerGoal,
      profile.availability?.hoursPerWeek > 0,
      profile.portfolioLinks?.github ||
        profile.portfolioLinks?.website ||
        profile.portfolioLinks?.linkedin,
      profile.customAvatar || profile.image
    ];

    const filledFields = fields.filter(Boolean).length;
    const percentage = Math.round((filledFields / fields.length) * 100);

    setCompletion(percentage);
  }, [profile]);

  return completion;
}
