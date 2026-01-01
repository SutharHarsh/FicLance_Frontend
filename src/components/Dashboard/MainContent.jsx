// app/dashboard/MainContent.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiMenu3Line } from "react-icons/ri";
import { toast } from "sonner";
import api from "@/lib/api";
// import WelcomeSection from "@/components/WelcomeSection";
// import ProgressCard from "@/components/ProgressCard";
import MainGrid from "./MainGrid";
import FilterStepper from "@/components/NewProject/FilterStepper";
import WelcomeSection from "./WelcomeSection";
import ProgressCard from "./ProgressCard";
import EmptyState from "./EmptyState";
import dashboardData from "@/data/dashboard";

import { Activity, CheckCircle2, FolderOpen, BarChart3 } from "lucide-react";

// Skeleton Components
const WelcomeSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
    <div className="h-4 bg-muted rounded w-1/4 mb-6"></div>
  </div>
);

const ProgressCardSkeleton = () => (
  <div className="bg-card rounded-xl shadow-sm p-6 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-muted rounded w-1/3"></div>
      </div>
      <div className="w-10 h-10 rounded-full bg-muted"></div>
    </div>
    <div className="w-full bg-muted rounded-full h-2"></div>
  </div>
);

export default function MainContent({ onMenuClick, data, isLoading, user }) {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const router = useRouter();

  const openNewProjectStepper = async () => {
    // Proactive limit check before opening new project
    try {
      const response = await api.get("/limits/can-create-project");
      if (!response.data.success || !response.data.data.allowed) {
        toast.error(response.data.data.reason || "Cannot create new project", {
          duration: 6000,
        });
        return;
      }
      setFilterModalOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to check project limits");
    }
  };
  const closeStepper = () => setFilterModalOpen(false);

  const handleApply = (filters) => {};

  const handleComplete = (filters) => {
    setFilterModalOpen(false);
    router.push("/new-project");
  };

  // Map Backend Data to UI Format
  const activity = data?.activity || [];
  const suggestions = data?.suggestions || [];

  // 1. Calculate Active & Completed based on real activity status
  // Assuming 'completed' is the status key for finished projects
  const activeCount = activity.filter((item) =>
    ["in_progress", "requirements_sent", "created"].includes(item.status)
  ).length;

  const completedCount = activity.filter(
    (item) => item.status === "completed"
  ).length;

  const totalCount = activity.length;

  // 2. Calculate Level Logic (Gamification)
  // Mathematical logic based on:
  // - Project Starts (Base XP)
  // - Engagement (Message count)
  // - Progress Status
  const calculateLevel = (items) => {
    let xp = 0;

    items.forEach((item) => {
      // Base XP for having a project
      xp += 100;

      // Engagement XP: 10 XP per message
      const msgs = item.meta?.totalMessages || 0;
      xp += msgs * 10;

      // Status Bonus
      if (item.status === "completed") {
        xp += 500;
      } else {
        // Deadline Penalty: -200 XP if deadline passed and not completed
        const now = Date.now();
        const deadline = item.deadlineTimestamp;
        if (deadline && deadline < now) {
          xp -= 200;
        }

        if (item.status === "in_progress") xp += 150;
        else if (item.status === "requirements_sent") xp += 50;
      }
    });

    // Ensure XP doesn't go below 0
    xp = Math.max(0, xp);

    // Level formula:
    // Level 1: 0-999 XP
    // Level 2: 1000-1999 XP
    // etc.
    const currentLevel = Math.floor(xp / 1000) + 1;

    // Progress to next level (0-100%)
    const progressToNext = Math.min(Math.floor((xp % 1000) / 10), 100);

    return { level: currentLevel, progress: progressToNext };
  };

  const { level, progress } = calculateLevel(activity);

  // Create cards from derived stats
  const cards = [
    {
      title: "Active Simulations",
      value: activeCount,
      changeText: "Active Now",
      icon: Activity,
      iconBg: "bg-gradient-to-br from-blue-500/10 to-blue-500/20",
      iconColor: "text-blue-600",
      statChangeColor: "text-blue-600",
    },
    {
      title: "Completed Projects",
      value: completedCount,
      changeText: "Lifetime",
      icon: CheckCircle2,
      iconBg: "bg-gradient-to-br from-emerald-500/10 to-emerald-500/20",
      iconColor: "text-emerald-600",
      statChangeColor: "text-emerald-600",
    },
    {
      title: "Current Level",
      value: `Lvl ${level}`,
      // No standard trend, using progress bar instead
      icon: BarChart3,
      iconBg: "bg-gradient-to-br from-purple-500/10 to-purple-500/20",
      iconColor: "text-purple-600",
      progress: {
        value: progress,
        label: "XP to next level",
        showPercent: true,
        color: "bg-purple-600",
      },
    },
    {
      title: "Total Simulations",
      value: totalCount,
      changeText: "All Time",
      icon: FolderOpen,
      iconBg: "bg-gradient-to-br from-orange-500/10 to-orange-500/20",
      iconColor: "text-orange-600",
      statChangeColor: "text-orange-600",
    },
  ];

  // Welcome Info
  const welcomeInfo = {
    username: user?.name || "User",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
  };

  // Helper flags
  const metricsNotEmpty = cards.length > 0;
  // For MVP, we treat any activity or stats as "not empty"
  const isEmpty = !isLoading && totalCount === 0 && activity.length === 0;

  return (
    <main className="flex-1 bg-background min-h-screen lg:ml-64">
      {/* Mobile Header Bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <RiMenu3Line className="text-xl" />
        </button>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      <div className="p-4 sm:p-6">
        <div className="container mx-auto">
          {isLoading ? (
            <WelcomeSkeleton />
          ) : (
            <div className="animate-fadeIn">
              <WelcomeSection
                username={welcomeInfo.username}
                date={welcomeInfo.date}
                day={welcomeInfo.day}
                onOpenNewProject={openNewProjectStepper}
              />
            </div>
          )}

          {!isEmpty && (
            <div className="py-4 sm:py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {isLoading ? (
                  [...Array(4)].map((_, index) => (
                    <ProgressCardSkeleton key={index} />
                  ))
                ) : (
                  <div className="contents animate-fadeIn">
                    {cards.map((card, index) => (
                      <ProgressCard key={index} {...card} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Empty dashboard experience */}
        {!isLoading && isEmpty ? (
          <div className="px-2 sm:px-6">
            <EmptyState onCreate={openNewProjectStepper} />
          </div>
        ) : (
          <MainGrid
            isLoading={isLoading}
            activities={activity}
            suggestions={suggestions}
            skills={data?.skills || []}
            badges={data?.badges || []}
            // inProgress and completed not yet in API, passing empty for now or could implement
            inProgress={[]}
            completed={[]}
          />
        )}

        {/* Stepper modal only (exactly what you asked) */}
        {filterModalOpen && (
          <FilterStepper
            open={filterModalOpen}
            onClose={closeStepper}
            onApply={handleApply}
            onComplete={handleComplete} // final -> redirect
          />
        )}
      </div>
    </main>
  );
}
