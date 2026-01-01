"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle, Clock, Zap } from "lucide-react";

export default function ProfileOverview({ profile, onAvatarUpdate }) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      user: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
      admin:
        "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
      freelancer:
        "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800",
    };
    return colors[role] || colors.user;
  };

  const getExperienceBadge = (level) => {
    const badges = {
      beginner: {
        label: "Beginner",
        color:
          "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-800",
      },
      intermediate: {
        label: "Intermediate",
        color:
          "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
      },
      advanced: {
        label: "Advanced",
        color:
          "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800",
      },
    };
    return badges[level] || badges.beginner;
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // TODO: Implement actual upload to storage service (S3, Cloudinary, etc.)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result;
        await onAvatarUpdate(dataUrl);
        setIsUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Avatar upload failed:", error);
      alert("Failed to upload avatar");
      setIsUploadingAvatar(false);
    }
  };

  const avatarSrc = profile.avatarUrl || "/default-avatar.png";

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Avatar Section with Glow Effect */}
        <div className="relative group flex-shrink-0">
          {/* Soft glow ring */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />

          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-background shadow-2xl">
            <Image
              src={avatarSrc}
              alt={profile.name || "User avatar"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            {isUploadingAvatar && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-md">
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Upload Button - More Premium */}
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-2 right-2 bg-gradient-to-br from-primary to-blue-600 text-white p-3 rounded-full cursor-pointer hover:shadow-xl transition-all shadow-lg hover:scale-110 border-4 border-background"
          >
            <Camera size={18} />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={isUploadingAvatar}
            />
          </label>
        </div>

        {/* Profile Info - Redesigned as Content, Not Form */}
        <div className="flex-1 min-w-0">
          {/* Name as Headline */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
              {profile.name || "Unnamed User"}
            </h1>
            {profile.username && (
              <p className="text-lg text-muted-foreground">
                @{profile.username}
              </p>
            )}
          </div>

          {/* Bio as Content Block */}
          {(profile.about || profile.profile?.bio || profile.bio) && (
            <p className="text-base text-foreground/80 leading-relaxed max-w-2xl mb-6">
              {profile.about || profile.profile?.bio || profile.bio}
            </p>
          )}

          {/* Product-Style Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {profile.emailVerified && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border border-green-500/20 shadow-sm">
                <CheckCircle size={14} />
                Verified
              </span>
            )}

            {profile.roles?.map((role) => (
              <span
                key={role}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getRoleBadgeColor(
                  role
                )}`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            ))}

            {profile.experienceLevel && (
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getExperienceBadge(profile.experienceLevel).color
                  }`}
              >
                <Zap size={12} className="mr-1" />
                {getExperienceBadge(profile.experienceLevel).label}
              </span>
            )}
          </div>

          {/* Metadata - Minimal & Elegant */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </p>
              <p className="text-sm text-foreground font-medium">
                {profile.email}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Member Since
              </p>
              <p className="text-sm text-foreground font-medium">
                {formatDate(profile.createdAt)}
              </p>
            </div>
            {profile.stats?.lastActiveDate && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Seen
                </p>
                <p className="text-sm text-foreground font-medium">
                  {formatDate(profile.stats.lastActiveDate)}
                </p>
              </div>
            )}
          </div>

          {/* Skills as Visual Showcase */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="pt-6 border-t border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 8).map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-secondary/50 hover:bg-secondary hover:shadow-md text-foreground rounded-xl text-sm font-medium transition-all border border-border/50 hover:border-primary/30 hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 8 && (
                  <span className="px-4 py-2 bg-primary/5 text-primary rounded-xl text-sm font-semibold border border-primary/20">
                    +{profile.skills.length - 8} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
