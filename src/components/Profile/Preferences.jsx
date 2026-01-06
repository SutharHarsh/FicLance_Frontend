"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Loader,
  Check,
  X,
  Bell,
  Moon,
  Sun,
  Monitor,
  Globe,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";

export default function Preferences({ profile, onSave, isEditing = true }) {
  const { theme: currentTheme, setTheme: setAppTheme } = useTheme();

  const [formData, setFormData] = useState({
    notifications: {
      deadlines: true,
      messages: true,
      projectUpdates: true,
    },
    theme: "system",
    language: "en",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile?.preferences) {
      setFormData((prev) => ({
        ...prev,
        ...profile.preferences,
        notifications: {
          ...prev.notifications,
          ...(profile.preferences.notifications || {}),
        },
      }));
    }

    // Sync with current app theme
    if (currentTheme && formData.theme !== currentTheme) {
      setFormData((prev) => ({ ...prev, theme: currentTheme }));
    }
  }, [profile, currentTheme]);

  const handleNotificationToggle = (key) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [key]: !formData.notifications[key],
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const response = await api.put("/users/me", {
        preferences: formData,
      });

      if (response.data.success) {
        setSaveStatus("success");
        onSave && onSave(response.data.data);

        // Apply theme immediately
        setAppTheme(formData.theme);

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

  // Handle theme change immediately (before save)
  const handleThemeChange = (newTheme) => {
    setFormData({ ...formData, theme: newTheme });
    setAppTheme(newTheme); // Apply immediately for instant feedback
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
    { code: "zh", name: "中文" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Bell size={24} />
          Preferences
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {isEditing
            ? "Customize your experience and notification settings"
            : "Your experience and notification settings"}
        </p>
      </div>

      {!isEditing ? (
        /* VIEW MODE */
        <div className="space-y-8">
          {/* Theme */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Theme
            </h3>
            <p className="text-muted-foreground capitalize">
              {formData.theme} mode
            </p>
          </div>

          {/* Notifications */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-6">
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-foreground">
                  Deadline Reminders
                </span>
                <span
                  className={`text-sm font-medium ${
                    formData.notifications.deadlines
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {formData.notifications.deadlines ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground">New Messages</span>
                <span
                  className={`text-sm font-medium ${
                    formData.notifications.messages
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {formData.notifications.messages ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground">Project Updates</span>
                <span
                  // className="text-sm font-medium"
                  className={
                    formData.notifications.projectUpdates
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }
                >
                  {formData.notifications.projectUpdates
                    ? "Enabled"
                    : "Disabled"}
                </span>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe size={18} />
              Language
            </h3>
            <p className="text-muted-foreground">
              {languages.find((l) => l.code === formData.language)?.name ||
                "English"}
            </p>
          </div>
        </div>
      ) : (
        /* EDIT MODE */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Theme Preferences */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-6">
              Theme
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Choose how the app should look
            </p>
            <div className="grid grid-cols-3 gap-4">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleThemeChange(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      formData.theme === option.value
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary hover:border-primary/50"
                    }`}
                  >
                    <Icon size={24} className="mx-auto mb-2 text-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      {option.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-6">
              Notifications
            </h3>
            <div className="space-y-4">
              {/* Deadline Notifications */}
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Deadline Reminders
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get notified about upcoming project deadlines
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationToggle("deadlines")}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                    formData.notifications.deadlines
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.notifications.deadlines
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Message Notifications */}
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">New Messages</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get notified when you receive new chat messages
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationToggle("messages")}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                    formData.notifications.messages
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.notifications.messages
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Project Update Notifications */}
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Project Updates</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get notified about project status changes and updates
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNotificationToggle("projectUpdates")}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                    formData.notifications.projectUpdates
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.notifications.projectUpdates
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe size={18} />
              Language
            </h3>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-2">
              Language preference for the interface
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-8 border-t border-border">
            <div>
              {saveStatus === "success" && (
                <p className="text-green-600 text-sm flex items-center gap-2 font-medium">
                  <Check size={16} className="flex-shrink-0" />
                  Preferences saved successfully
                </p>
              )}
              {saveStatus === "error" && (
                <p className="text-red-600 text-sm flex items-center gap-2 font-medium">
                  <X size={16} className="flex-shrink-0" />
                  {errors.submit || "Failed to save preferences"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving}
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
                  Save Preferences
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
