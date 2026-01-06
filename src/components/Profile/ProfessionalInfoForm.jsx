"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Loader,
  Check,
  X,
  Link as LinkIcon,
  Github,
  Globe,
  Linkedin,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

export default function ProfessionalInfoForm({
  profile,
  onSave,
  isEditing = true,
}) {
  const [formData, setFormData] = useState({
    preferredTechStack: [],
    careerGoal: "learning",
    availability: { hoursPerWeek: 10 },
    portfolioLinks: {
      github: "",
      website: "",
      linkedin: "",
    },
  });

  const [techStackInput, setTechStackInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      const preferredTechStack = profile.profile?.preferredTechStack || [];
      setFormData({
        preferredTechStack: Array.isArray(preferredTechStack)
          ? preferredTechStack
          : preferredTechStack
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        careerGoal: profile.profile?.careerGoal || "learning",
        availability: profile.profile?.availability || { hoursPerWeek: 10 },
        portfolioLinks: profile.profile?.portfolioLinks || {
          github: "",
          website: "",
          linkedin: "",
        },
      });
    }
  }, [profile]);

  const validateForm = () => {
    const newErrors = {};

    // Validate hours per week
    if (
      formData.availability.hoursPerWeek < 0 ||
      formData.availability.hoursPerWeek > 168
    ) {
      newErrors.availability = "Hours per week must be between 0 and 168";
    }

    // Validate URLs
    const urlFields = ["github", "website", "linkedin"];
    urlFields.forEach((field) => {
      const url = formData.portfolioLinks[field];
      if (url && url.trim()) {
        try {
          new URL(url);
        } catch {
          newErrors[field] = `Invalid ${field} URL`;
        }
      }
    });

    // Validate tech stack count
    if (formData.preferredTechStack.length > 15) {
      newErrors.techStack = "Maximum 15 tech stack items allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTech = () => {
    const trimmedTech = techStackInput.trim();

    if (!trimmedTech) return;

    if (formData.preferredTechStack.includes(trimmedTech)) {
      setErrors({ ...errors, techStack: "Technology already added" });
      return;
    }

    if (formData.preferredTechStack.length >= 15) {
      setErrors({ ...errors, techStack: "Maximum 15 technologies allowed" });
      return;
    }

    setFormData({
      ...formData,
      preferredTechStack: [...formData.preferredTechStack, trimmedTech],
    });
    setTechStackInput("");
    setErrors({ ...errors, techStack: null });
  };

  const handleRemoveTech = (techToRemove) => {
    setFormData({
      ...formData,
      preferredTechStack: formData.preferredTechStack.filter(
        (tech) => tech !== techToRemove
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const response = await api.put("/users/me", {
        profile: {
          preferredTechStack: formData.preferredTechStack,
          careerGoal: formData.careerGoal,
          availability: formData.availability,
          portfolioLinks: formData.portfolioLinks,
        },
      });

      const { data } = response;

      if (data?.success) {
        setSaveStatus("success");
        onSave?.(data.data);
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus("error");
        setErrors({
          submit: data?.message || "Failed to save changes",
        });
      }
    } catch (error) {
      console.error("Save failed:", error);

      // 🔹 CORS / Network error
      if (!error.response) {
        setErrors({
          submit:
            "Network error. Please check your connection or try again later.",
        });
      }
      // 🔹 Backend validation error
      else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      // 🔹 General backend error
      else {
        setErrors({
          submit:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      }

      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Professional Details
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {isEditing
            ? "Share your career goals and technical expertise"
            : "Your career goals and technical expertise"}
        </p>
      </div>

      {!isEditing ? (
        /* VIEW MODE */
        <div className="space-y-8">
          {/* Tech Stack */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Preferred Tech Stack
            </label>
            {formData.preferredTechStack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.preferredTechStack.map((tech) => (
                  <div
                    key={`tech-${tech}-view`}
                    className="inline-flex items-center px-3 py-1.5 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foregroundforeground">
                No tech stack added
              </p>
            )}
          </div>

          {/* Career Goal */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Career Goal
            </label>
            <p className="text-muted-foreground capitalize">
              {formData.careerGoal.replace("-", " ")}
            </p>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Availability
            </label>
            <p className="text-muted-foreground">
              {formData.availability.hoursPerWeek} hours/week
            </p>
          </div>

          {/* Portfolio Links */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-foreground">
              Portfolio Links
            </label>
            <div className="space-y-2">
              {formData.portfolioLinks.github && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">GitHub</p>
                  <a
                    href={formData.portfolioLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {formData.portfolioLinks.github}
                  </a>
                </div>
              )}
              {formData.portfolioLinks.website && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Website</p>
                  <a
                    href={formData.portfolioLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {formData.portfolioLinks.website}
                  </a>
                </div>
              )}
              {formData.portfolioLinks.linkedin && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">LinkedIn</p>
                  <a
                    href={formData.portfolioLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {formData.portfolioLinks.linkedin}
                  </a>
                </div>
              )}
              {!formData.portfolioLinks.github &&
                !formData.portfolioLinks.website &&
                !formData.portfolioLinks.linkedin && (
                  <p className="text-muted-foreground">
                    No portfolio links added
                  </p>
                )}
            </div>
          </div>
        </div>
      ) : (
        /* EDIT MODE */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Preferred Tech Stack */}
          <div className="space-y-2">
            <label
              htmlFor="tech-input"
              className="block text-sm font-semibold text-foreground"
            >
              Preferred Tech Stack
            </label>
            <p className="text-xs text-muted-foreground">
              Technologies you work with and want to specialize in
            </p>
            <div className="flex gap-2">
              <input
                id="tech-input"
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTech())
                }
                className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="e.g., Next.js, TypeScript, MongoDB"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-6 py-3 bg-secondary border border-border text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium text-sm"
              >
                Add
              </button>
            </div>

            {formData.preferredTechStack.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {formData.preferredTechStack.map((tech) => (
                  <div
                    key={`tech-${tech}-edit`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium group hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.techStack && (
              <p className="text-red-500 text-sm mt-2">{errors.techStack}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {formData.preferredTechStack.length}/15 technologies
            </p>
          </div>

          {/* Career Goal */}
          <div className="space-y-2">
            <label
              htmlFor="career-goal"
              className="block text-sm font-semibold text-foreground"
            >
              Career Goal
            </label>
            <p className="text-xs text-muted-foreground">
              What's your primary career objective?
            </p>
            <select
              id="career-goal"
              value={formData.careerGoal}
              onChange={(e) =>
                setFormData({ ...formData, careerGoal: e.target.value })
              }
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="learning">Learning & Development</option>
              <option value="freelancing">Freelancing</option>
              <option value="job">Full-Time Employment</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label
              htmlFor="hours-per-week"
              className="block text-sm font-semibold text-foreground"
            >
              Availability
            </label>
            <p className="text-xs text-muted-foreground">
              How many hours per week can you dedicate?
            </p>
            <div className="relative">
              <input
                id="hours-per-week"
                type="number"
                min="0"
                max="168"
                value={formData.availability.hoursPerWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: {
                      hoursPerWeek: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className={`w-full px-4 py-3 bg-secondary border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  errors.availability ? "border-red-500" : "border-border"
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                hrs/week
              </span>
            </div>
            {errors.availability && (
              <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
            )}
          </div>

          {/* Portfolio Links */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                Portfolio Links
              </label>
              <p className="text-xs text-muted-foreground mb-6">
                Add links to showcase your work and professional presence
              </p>
            </div>

            {/* GitHub */}
            <div className="space-y-2">
              <label
                htmlFor="github"
                className="block text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Github size={16} />
                GitHub Profile
              </label>
              <input
                id="github"
                type="url"
                value={formData.portfolioLinks.github}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioLinks: {
                      ...formData.portfolioLinks,
                      github: e.target.value,
                    },
                  })
                }
                className={`w-full px-4 py-3 bg-secondary border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  errors.github ? "border-red-500" : "border-border"
                }`}
                placeholder="https://github.com/username"
              />
              {errors.github && (
                <p className="text-red-500 text-sm">{errors.github}</p>
              )}
            </div>

            {/* Website */}
            <div className="space-y-2">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Globe size={16} />
                Personal Website
              </label>
              <input
                id="website"
                type="url"
                value={formData.portfolioLinks.website}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioLinks: {
                      ...formData.portfolioLinks,
                      website: e.target.value,
                    },
                  })
                }
                className={`w-full px-4 py-3 bg-secondary border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  errors.website ? "border-red-500" : "border-border"
                }`}
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <p className="text-red-500 text-sm">{errors.website}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Linkedin size={16} />
                LinkedIn Profile
              </label>
              <input
                id="linkedin"
                type="url"
                value={formData.portfolioLinks.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioLinks: {
                      ...formData.portfolioLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
                className={`w-full px-4 py-3 bg-secondary border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  errors.linkedin ? "border-red-500" : "border-border"
                }`}
                placeholder="https://linkedin.com/in/username"
              />
              {errors.linkedin && (
                <p className="text-red-500 text-sm">{errors.linkedin}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-6 sm:pt-8 border-t border-border">
            <div className="order-2 sm:order-1">
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
              disabled={isSaving}
              className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
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
