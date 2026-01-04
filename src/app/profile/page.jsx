"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  Activity,
  Shield,
  Settings,
  Loader,
  FolderOpen,
  ArrowLeft,
  Edit3,
  Palette,
  X,
  ChevronRight,
  Home,
  LayoutDashboard,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import ProfileOverview from "@/components/Profile/ProfileOverview";
import PersonalInfoForm from "@/components/Profile/PersonalInfoForm";
import ProfessionalInfoForm from "@/components/Profile/ProfessionalInfoForm";
import ActivityStats from "@/components/Profile/ActivityStats";
import SecuritySettings from "@/components/Profile/SecuritySettings";
import Preferences from "@/components/Profile/Preferences";
import UserProjects from "@/components/Profile/UserProjects";
import PortfolioEditor from "@/components/Profile/PortfolioContentEditor";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/users/me");
      if (response.data.success) {
        setProfile(response.data.data);
      } else {
        setError(response.data.message || "Failed to load profile");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.response?.data?.message || "Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    // Optimistically update local state if data is provided
    if (updatedUser) {
      setProfile(updatedUser);
    } else {
      // Fallback to refetch if no data provided
      fetchProfile();
    }
    // Exit edit mode after successful save as requested by user
    setIsEditing(false);
  };

  const handleAvatarUpdate = async (avatarUrl) => {
    try {
      // Note: Backend might use /users/me/avatar/complete
      // but if the component expects a simple direct update, we use PATCH /users/me
      const response = await api.patch("/users/me", {
        avatarUrl: avatarUrl,
      });

      if (response.data.success) {
        setProfile({ ...profile, avatarUrl: avatarUrl });
        toast.success("Avatar updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update avatar");
      }
    } catch (error) {
      console.error("Avatar update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update avatar");
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "portfolio", label: "Portfolio", icon: Palette },
    { id: "projects", label: "My Projects", icon: FolderOpen },
    // { id: "activity", label: "Activity", icon: Activity },
    // { id: "preferences", label: "Preferences", icon: Settings },
    { id: "security", label: "Settings & Security", icon: Shield },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Error Loading Profile
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
      {/* Animated gradient orbs for depth */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-pink-400/20 to-purple-400/20 dark:from-pink-600/10 dark:to-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-400/10 to-blue-400/10 dark:from-purple-600/5 dark:to-blue-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Content layer */}
      <div className="relative z-10">
        {/* Minimalist Header with Breadcrumb */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-sm h-4">
          {/* Header intentionally left minimal/empty or serves as a blur backdrop */}
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Breadcrumb Navigation - Text Only & Below Header */}
          <nav
            className="flex items-center text-sm mb-8"
            aria-label="Breadcrumb"
          >
            <a
              href="/dashboard"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Dashboard
            </a>
            <span className="mx-3 text-muted-foreground/40">/</span>
            <span className="text-foreground font-semibold">Profile</span>
          </nav>
          {/* Hero Profile Section - Redesigned with Glassmorphism */}
          <div className="relative mb-8 sm:mb-16">
            {/* Soft gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl -z-10" />

            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-8 md:p-12 shadow-xl">
              <ProfileOverview
                profile={profile}
                onAvatarUpdate={handleAvatarUpdate}
              />
            </div>
          </div>

          {/* Product-Style Navigation with Action Button */}
          <div className="mb-12 flex flex-col items-stretch gap-4">
            {/* Scrollable tab navigation for mobile */}
            <nav className="relative w-full overflow-x-auto no-scrollbar">
              {/* Floating tab bar */}
              <div className="inline-flex items-center gap-1 p-1.5 bg-secondary/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg min-w-full sm:min-w-0">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                      relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex-shrink-0
                      ${isActive
                          ? "bg-background text-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }
                    `}
                    >
                      <Icon
                        size={16}
                        className={isActive ? "text-primary" : ""}
                      />
                      <span className="whitespace-nowrap">
                        {tab.label}
                      </span>

                      {/* Active indicator dot */}
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Edit Mode Toggle - Full width on mobile */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-lg sm:self-end ${isEditing
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-200 dark:shadow-red-900/20"
                  : "bg-primary hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-blue-900/20"
                }`}
            >
              {isEditing ? (
                <>
                  <X size={18} />
                  <span>Exit Edit Mode</span>
                </>
              ) : (
                <>
                  <Edit3 size={18} />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Content Area with Fade Transition */}
          <div className="relative">
            <div className="animate-in fade-in duration-300">
              <div
                style={{ display: activeTab === "personal" ? "block" : "none" }}
              >
                <PersonalInfoForm
                  profile={profile}
                  onSave={handleProfileUpdate}
                  isEditing={isEditing}
                />
              </div>

              <div
                style={{
                  display: activeTab === "professional" ? "block" : "none",
                }}
              >
                <ProfessionalInfoForm
                  profile={profile}
                  onSave={handleProfileUpdate}
                  isEditing={isEditing}
                />
              </div>

              <div
                style={{ display: activeTab === "projects" ? "block" : "none" }}
              >
                <UserProjects />
              </div>

              <div
                style={{
                  display: activeTab === "portfolio" ? "block" : "none",
                }}
              >
                <PortfolioEditor
                  user={profile}
                  onUpdate={handleProfileUpdate}
                />
              </div>

              {/* {activeTab === "activity" && (
                <ActivityStats stats={profile.stats} />
              )} */}

              {/* {activeTab === "preferences" && (
                <Preferences
                  profile={profile}
                  onSave={handleProfileUpdate}
                  isEditing={isEditing}
                />
              )} */}

              <div
                style={{ display: activeTab === "security" ? "block" : "none" }}
              >
                <SecuritySettings profile={profile} />
              </div>
            </div>
          </div>

          {/* Refined Footer */}
          <div className="mt-24 pt-12 border-t border-border/30">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground/80">
                Your data is secure and encrypted.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Last updated{" "}
                {new Date(
                  profile.profileUpdatedAt || profile.createdAt
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
