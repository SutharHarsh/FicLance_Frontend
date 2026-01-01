"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader, Check, X, User } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

export default function PersonalInfoForm({
  profile,
  onSave,
  isEditing = true,
}) {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    skills: [],
    experienceLevel: "beginner",
  });

  const [skillInput, setSkillInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  useEffect(() => {
    if (profile) {
      const skills = profile.profile?.skills || [];
      setFormData({
        username: profile.profile?.username || "",
        bio: profile.profile?.bio || "",
        skills: Array.isArray(skills)
          ? skills
          : skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        experienceLevel: profile.profile?.experienceLevel || "beginner",
      });
    }
  }, [profile]);

  // Username availability check removed because backend doesn't support it yet
  // Username will be validated on save

  const validateForm = () => {
    const newErrors = {};

    if (formData.username) {
      if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      } else if (formData.username.length > 30) {
        newErrors.username = "Username must be less than 30 characters";
      } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
        newErrors.username =
          "Username can only contain letters, numbers, underscores, and hyphens";
      } else if (usernameAvailable === false) {
        newErrors.username = "Username is already taken";
      }
    }

    if (formData.bio && formData.bio.length > 250) {
      newErrors.bio = "Bio must be less than 250 characters";
    }

    if (formData.skills.length > 20) {
      newErrors.skills = "Maximum 20 skills allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();

    if (!trimmedSkill) return;

    if (formData.skills.includes(trimmedSkill)) {
      setErrors({ ...errors, skills: "Skill already added" });
      return;
    }

    if (formData.skills.length >= 20) {
      setErrors({ ...errors, skills: "Maximum 20 skills allowed" });
      return;
    }

    setFormData({
      ...formData,
      skills: [...formData.skills, trimmedSkill],
    });
    setSkillInput("");
    setErrors({ ...errors, skills: null });
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const response = await api.patch("/users/me", {
        profile: {
          username: formData.username,
          bio: formData.bio,
          skills: formData.skills,
          experienceLevel: formData.experienceLevel,
        },
      });

      if (response.data.success) {
        setSaveStatus("success");
        onSave && onSave(response.data.data);
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus("error");
        setErrors({ submit: response.data.message || "Failed to save" });
      }
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("error");
      setErrors({
        submit: error.response?.data?.message || "Network error occurred",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Personal Information
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {isEditing
            ? "Update your personal details and profile information"
            : "Your personal details and profile information"}
        </p>
      </div>

      {!isEditing ? (
        /* VIEW MODE - Professional Read-only display */
        <div className="space-y-6">
          {/* Username Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  Username
                </h3>
                <p className="text-xl font-bold text-foreground truncate">
                  {formData.username || (
                    <span className="text-muted-foreground/50 text-base font-normal italic">
                      Not set
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Bio Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:from-green-950/10 dark:to-emerald-950/10 border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-400/5 to-emerald-400/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                <h3 className="text-sm font-semibold text-foreground">Bio</h3>
              </div>
              {formData.bio ? (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap border-l-2 border-muted pl-4 italic">
                  "{formData.bio}"
                </p>
              ) : (
                <p className="text-muted-foreground/50 italic">
                  No bio added yet
                </p>
              )}
            </div>
          </div>

          {/* Skills Card */}
          <div className="group relative overflow-hidden bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400/5 to-pink-400/5 rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Skills & Technologies
                </h3>
                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {formData.skills.length} skills
                </span>
              </div>
              {formData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="group/skill relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/10 rounded-lg opacity-0 group-hover/skill:opacity-100 transition-opacity" />
                      <span className="relative">{skill}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground/50">
                  <p className="text-sm">No skills added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Experience Level Card */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50/30 to-amber-50/30 dark:from-orange-950/10 dark:to-amber-950/10 border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Experience Level
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {formData.experienceLevel === "beginner"
                      ? "B"
                      : formData.experienceLevel === "intermediate"
                      ? "I"
                      : "A"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground capitalize">
                    {formData.experienceLevel.replace("-", " ")}
                  </p>
                  <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                      style={{
                        width:
                          formData.experienceLevel === "beginner"
                            ? "33%"
                            : formData.experienceLevel === "intermediate"
                            ? "66%"
                            : "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* EDIT MODE - Editable form */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Username */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-foreground"
            >
              Username
            </label>
            <p className="text-xs text-muted-foreground">
              Your unique identifier on the platform
            </p>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={`w-full px-4 py-3 bg-secondary border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  errors.username
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-border"
                }`}
                placeholder="johndoe_123"
              />
              {isCheckingUsername && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader size={18} className="animate-spin text-primary" />
                </div>
              )}
              {!isCheckingUsername && usernameAvailable === true && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Check size={18} className="text-green-500" />
                </div>
              )}
              {!isCheckingUsername && usernameAvailable === false && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X size={18} className="text-red-500" />
                </div>
              )}
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-foreground"
            >
              Bio
            </label>
            <p className="text-xs text-muted-foreground">
              Tell us about yourself and your goals
            </p>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              maxLength={250}
              className={`w-full px-4 py-3 bg-secondary border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none ${
                errors.bio
                  ? "border-red-500 ring-2 ring-red-200"
                  : "border-border"
              }`}
              placeholder="I'm passionate about..."
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground"></p>
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/250 characters
              </p>
            </div>
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label
              htmlFor="skill-input"
              className="block text-sm font-semibold text-foreground"
            >
              Skills
            </label>
            <p className="text-xs text-muted-foreground">
              Add technologies and skills you're proficient in
            </p>
            <div className="flex gap-2">
              <input
                id="skill-input"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                }
                className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="e.g., React, Node.js, Python"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-6 py-3 bg-secondary border border-border text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium text-sm"
              >
                Add
              </button>
            </div>

            {/* Skills List */}
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium group hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.skills && (
              <p className="text-red-500 text-sm mt-2">{errors.skills}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {formData.skills.length}/20 skills
            </p>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label
              htmlFor="experience"
              className="block text-sm font-semibold text-foreground"
            >
              Experience Level
            </label>
            <p className="text-xs text-muted-foreground">
              How would you describe your experience?
            </p>
            <select
              id="experience"
              value={formData.experienceLevel}
              onChange={(e) =>
                setFormData({ ...formData, experienceLevel: e.target.value })
              }
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="beginner">Beginner - Just starting out</option>
              <option value="intermediate">
                Intermediate - Some experience
              </option>
              <option value="advanced">Advanced - Highly skilled</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-8 border-t border-border">
            <div>
              {saveStatus === "success" && (
                <p className="text-green-600 text-sm flex items-center gap-2 font-medium">
                  <Check size={16} className="flex-shrink-0" />
                  Changes saved successfully
                </p>
              )}
              {saveStatus === "error" && (
                <p className="text-red-600 text-sm flex items-center gap-2 font-medium">
                  <X size={16} className="flex-shrink-0" />
                  {errors.submit || "Failed to save changes"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving || isCheckingUsername}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            >
              {isSaving ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
