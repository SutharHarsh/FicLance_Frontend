"use client";
import React from "react";

/**
 * Reusable skill badges component for Portfolio variations
 * Displays skills from User Profile with themed styling
 */
const PortfolioSkillBadges = ({
  skills = [],
  theme = "default",
  maxDisplay = 12,
}) => {
  // Theme configurations for different Portfolio variations
  const themes = {
    default: {
      badge:
        "px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-all border border-blue-200 hover:shadow-md",
      container: "flex flex-wrap gap-3",
    },
    modern: {
      badge:
        "px-5 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 rounded-xl text-sm font-semibold transition-all border border-purple-200 hover:scale-105",
      container: "flex flex-wrap gap-4",
    },
    timeline: {
      badge:
        "px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-full text-sm font-medium transition-all border border-teal-200",
      container: "flex flex-wrap gap-2",
    },
    bento: {
      badge:
        "px-4 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-sm font-bold transition-all border-2 border-orange-200 hover:border-orange-400",
      container: "flex flex-wrap gap-3",
    },
    minimalist: {
      badge:
        "px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded text-xs font-medium transition-all border border-gray-300",
      container: "flex flex-wrap gap-2",
    },
  };

  const currentTheme = themes[theme] || themes.default;
  const displaySkills = skills.slice(0, maxDisplay);
  const remainingCount = skills.length - maxDisplay;

  return (
    <div className={currentTheme.container}>
      {displaySkills.map((skill, index) => (
        <span key={index} className={currentTheme.badge}>
          {skill}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className={`${currentTheme.badge} opacity-60`}>
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

export default PortfolioSkillBadges;
