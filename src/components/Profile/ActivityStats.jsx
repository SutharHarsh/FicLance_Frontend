"use client";

import React from "react";
import { TrendingUp, Activity, Target, Calendar } from "lucide-react";

export default function ActivityStats({ stats }) {
  const statCards = [
    {
      icon: Target,
      label: "Projects Completed",
      value: stats?.totalProjectsCompleted || 0,
      color: "bg-green-100 text-green-700",
      iconBg: "bg-green-500"
    },
    {
      icon: Activity,
      label: "Active Simulations",
      value: stats?.activeSimulations || 0,
      color: "bg-blue-100 text-blue-700",
      iconBg: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      label: "Deadlines Met",
      value: `${stats?.deadlinesMetPercentage || 0}%`,
      color: "bg-purple-100 text-purple-700",
      iconBg: "bg-purple-500"
    },
    {
      icon: Calendar,
      label: "Last Active",
      value: formatLastActive(stats?.lastActiveDate),
      color: "bg-orange-100 text-orange-700",
      iconBg: "bg-orange-500"
    }
  ];

  function formatLastActive(date) {
    if (!date) return "Never";
    
    const now = new Date();
    const lastActive = new Date(date);
    const diffInMs = now - lastActive;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Activity & Progress</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Your performance metrics and activity overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.color} rounded-xl p-6 transition-all hover:shadow-md border border-opacity-20 hover:border-opacity-40`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.iconBg} text-white p-3 rounded-lg`}>
                  <Icon size={20} />
                </div>
              </div>
              
              <div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm opacity-80 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Breakdown */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-6">Performance Breakdown</h3>
        
        <div className="space-y-6">
          {/* Completion Rate Bar */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-foreground">Project Completion Rate</span>
              <span className="text-sm font-bold text-foreground">
                {stats?.deadlinesMetPercentage || 0}%
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats?.deadlinesMetPercentage || 0}%` }}
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-foreground">Activity Level</span>
              <span className="text-sm font-bold text-foreground">
                {getActivityLevel(stats?.lastActiveDate)}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getActivityColor(stats?.lastActiveDate)}`}
                style={{ width: `${getActivityPercentage(stats?.lastActiveDate)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Quick Insights</h3>
        <div className="space-y-3">
          {getInsights(stats).map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-foreground">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getActivityLevel(lastActiveDate) {
  if (!lastActiveDate) return "Inactive";
  
  const daysSinceActive = Math.floor(
    (new Date() - new Date(lastActiveDate)) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceActive === 0) return "Very Active";
  if (daysSinceActive <= 3) return "Active";
  if (daysSinceActive <= 7) return "Moderate";
  if (daysSinceActive <= 30) return "Low";
  return "Inactive";
}

function getActivityPercentage(lastActiveDate) {
  if (!lastActiveDate) return 0;
  
  const daysSinceActive = Math.floor(
    (new Date() - new Date(lastActiveDate)) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceActive === 0) return 100;
  if (daysSinceActive <= 3) return 75;
  if (daysSinceActive <= 7) return 50;
  if (daysSinceActive <= 30) return 25;
  return 10;
}

function getActivityColor(lastActiveDate) {
  const level = getActivityLevel(lastActiveDate);
  
  if (level === "Very Active") return "bg-green-500";
  if (level === "Active") return "bg-blue-500";
  if (level === "Moderate") return "bg-yellow-500";
  if (level === "Low") return "bg-orange-500";
  return "bg-red-500";
}

function getInsights(stats) {
  const insights = [];

  if (!stats) return ["Complete your profile to get personalized insights"];

  if (stats.totalProjectsCompleted === 0) {
    insights.push("Start your first project to build your portfolio");
  } else if (stats.totalProjectsCompleted < 5) {
    insights.push(`Complete ${5 - stats.totalProjectsCompleted} more projects to reach beginner milestone`);
  } else {
    insights.push("Great job! You're building a solid portfolio");
  }

  if (stats.deadlinesMetPercentage >= 80) {
    insights.push("Excellent deadline management skills!");
  } else if (stats.deadlinesMetPercentage >= 50) {
    insights.push("Good progress, keep improving your time management");
  } else if (stats.deadlinesMetPercentage > 0) {
    insights.push("Focus on meeting deadlines to boost your reputation");
  }

  if (stats.activeSimulations > 0) {
    insights.push(`${stats.activeSimulations} active simulation${stats.activeSimulations > 1 ? 's' : ''} - keep up the momentum!`);
  } else {
    insights.push("No active simulations - start a new project today");
  }

  const daysSinceActive = Math.floor(
    (new Date() - new Date(stats.lastActiveDate)) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceActive > 7) {
    insights.push("Welcome back! It's been a while since your last activity");
  }

  return insights.length > 0 ? insights : ["Keep working on projects to see insights here"];
}
