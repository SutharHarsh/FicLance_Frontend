"use client";
import React from "react";
import InprogressProject from "./InprogressProject";
import CompletedProject from "./CompletedProject";
import DeadlinePassedProject from "./DeadlinePassedProject";
import UpcomingDeadlines from "./UpcomingDeadlines";
import AchievementBadges from "./Achivement";
import SkillsStatistics from "./SkillsStatistics";
import RecentActivities from "./RecentActivities";
import Recommendations from "./Recommendations";
import dashboardData from "@/data/dashboard";

// Skeleton Components
const ProjectCardSkeleton = () => (
  <div className="border border-border rounded-xl p-5 bg-card shadow-sm animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center flex-1">
        <div className="w-9 h-9 rounded-lg bg-card-foreground mr-3"></div>
        <div className="h-5 bg-card-foreground rounded w-1/2"></div>
      </div>
      <div className="h-5 bg-card-foreground rounded w-16"></div>
    </div>
    <div className="h-4 bg-card-foreground rounded w-full mb-2"></div>
    <div className="h-4 bg-card-foreground rounded w-4/5 mb-4"></div>
    <div className="w-full bg-card-foreground rounded-full h-2 mb-4"></div>
    <div className="flex justify-between">
      <div className="h-4 bg-card-foreground rounded w-16"></div>
    </div>
  </div>
);

const CompletedProjectSkeleton = () => (
  <div className="flex items-center p-3 border border-card-foreground rounded-lg animate-pulse">
    <div className="w-10 h-10 rounded-lg bg-card-foreground mr-4 flex-shrink-0"></div>
    <div className="flex-1">
      <div className="h-5 bg-card-foreground rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-card-foreground rounded w-1/3"></div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <div className="h-4 bg-card-foreground rounded w-12"></div>
    </div>
  </div>
);

const DeadlineSkeleton = () => (
  <div className="flex items-start animate-pulse">
    <div className="w-12 h-12 rounded-lg bg-card-foreground mr-4 flex-shrink-0"></div>
    <div className="flex-1">
      <div className="h-5 bg-card-foreground rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-card-foreground rounded w-full mb-2"></div>
      <div className="h-4 bg-card-foreground rounded w-24"></div>
    </div>
  </div>
);

const MainGrid = ({
  isLoading = false,
  activities = [], // passed from parent
  suggestions = [], // passed from parent
  skills = [],
  badges = [],
  inProgress = [],
  completed = [],
}) => {
  // Use passed data or fallbacks
  const recentActivities = activities;
  const recommendations = suggestions;
  // const skills = []; // TODO: Add skills to dashboard API

  const handleViewAll = () => {
    console.log("Redirect to all projects...");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Left section: Projects Skeleton */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* In Progress Projects Skeleton */}
          <div className="bg-background rounded-xl shadow-sm p-4 sm:p-6">
            <div className="mb-4 sm:mb-6 animate-pulse">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4">
                {/* Title Skeleton */}
                <div className="h-5 w-32 sm:w-48 rounded-md bg-card-foreground" />

                {/* Search Bar Skeleton */}
                <div className="relative w-full sm:w-64 lg:w-96">
                  {/* Search icon placeholder */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-card-foreground" />

                  {/* Input placeholder */}
                  <div className="w-full h-10 rounded-lg bg-card-foreground" />
                </div>
              </div>
            </div>

            <div className="h-6 bg-background rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[...Array(2)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Completed Projects Skeleton */}
          <div className="bg-background rounded-xl shadow-sm p-4 sm:p-6">
            <div className="h-6 bg-card-foreground rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <CompletedProjectSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Recent Activities Skeleton */}
          <div className="bg-background rounded-xl shadow-sm p-4 sm:p-6">
            <div className="h-6 bg-card-foreground rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="pl-6 sm:pl-8 pb-6 border-l-2 border-border animate-pulse"
                >
                  <div className="w-6 h-6 rounded-full bg-card-foreground absolute left-0 top-0 -translate-x-1/2"></div>
                  <div className="h-5 bg-card-foreground rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-card-foreground rounded w-full mb-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right section: Deadlines, Skills, Achievements Skeleton */}
        <div className="space-y-4 sm:space-y-6">
          {/* Deadlines Skeleton */}
          <div className="bg-background rounded-xl shadow-sm p-4 sm:p-6">
            <div className="h-6 bg-card-foreground rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <DeadlineSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Skills Skeleton */}
          <div className="p-4 bg-background rounded-xl shadow-sm animate-pulse">
            <div className="h-6 bg-card-foreground rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="h-32 sm:h-48 bg-card-foreground rounded mb-4 sm:mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-card-foreground rounded w-1/2 mb-2"></div>
                  <div className="h-2 bg-card-foreground rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Skeleton */}
          <div className="bg-background rounded-xl shadow-sm p-4 sm:p-6 animate-pulse">
            <div className="h-6 bg-card-foreground rounded w-1/3 mb-4 sm:mb-6"></div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card-foreground mb-2"></div>
                  <div className="h-3 bg-card-foreground rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Skeleton */}
          <div className="grid grid-cols-1 p-4 sm:p-8 rounded-2xl bg-card gap-4 animate-pulse">
            <div className="h-6 bg-card-foreground rounded w-1/3 mb-4"></div>
            <div className="p-4 border border-border rounded-lg">
              <div className="h-4 bg-card-foreground rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-card-foreground rounded w-full mb-2"></div>
              <div className="h-3 bg-card-foreground rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 animate-fadeIn">
      {/* Left section: Projects */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <InprogressProject />
        <CompletedProject onViewAll={handleViewAll} />
        <DeadlinePassedProject onViewAll={handleViewAll} />
        <RecentActivities items={recentActivities} />
        {/* <Recommendations items={recommendations} /> */}
      </div>

      {/* Right section: Deadlines, Skills, Achievements */}
      <div className="space-y-4 sm:space-y-6">
        <UpcomingDeadlines />
        <SkillsStatistics skills={skills} />
        <AchievementBadges badges={badges} />
      </div>
    </div>
  );
};

export default MainGrid;
