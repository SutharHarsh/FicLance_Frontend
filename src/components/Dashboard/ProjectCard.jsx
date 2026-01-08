"use client";
import React from "react";
import Link from "next/link";
import { Calendar, LayoutDashboard, Code, Palette } from "lucide-react";

const ProjectCard = ({
  id,
  title,
  description,
  icon: IconComponent,
  iconBg = "bg-gradient-to-br from-indigo-50 to-indigo-100",
  iconColor = "text-indigo-600",
  priority,
  priorityColor = { bg: "bg-gray-100", text: "text-gray-600" },
  progress,
  progressColor = "bg-indigo-500",
  dueDate,
}) => {
  // Deterministic gradient generator based on ID
  const getCardTheme = (id) => {
    const themes = [
      {
        bg: "bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900",
        border: "border-indigo-100 dark:border-indigo-900/30",
        icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
        progress: "bg-indigo-500",
        glow: "from-indigo-500/10 to-purple-500/10",
      },
      {
        bg: "bg-gradient-to-br from-white via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900",
        border: "border-emerald-100 dark:border-emerald-900/30",
        icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
        progress: "bg-emerald-500",
        glow: "from-emerald-500/10 to-teal-500/10",
      },
      {
        bg: "bg-gradient-to-br from-white via-rose-50 to-pink-50 dark:from-slate-900 dark:via-rose-950/30 dark:to-slate-900",
        border: "border-rose-100 dark:border-rose-900/30",
        icon: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400",
        progress: "bg-rose-500",
        glow: "from-rose-500/10 to-pink-500/10",
      },
      {
        bg: "bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:from-slate-900 dark:via-amber-950/30 dark:to-slate-900",
        border: "border-amber-100 dark:border-amber-900/30",
        icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
        progress: "bg-amber-500",
        glow: "from-amber-500/10 to-orange-500/10",
      },
      {
        bg: "bg-gradient-to-br from-white via-sky-50 to-blue-50 dark:from-slate-900 dark:via-sky-950/30 dark:to-slate-900",
        border: "border-sky-100 dark:border-sky-900/30",
        icon: "bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400",
        progress: "bg-sky-500",
        glow: "from-sky-500/10 to-blue-500/10",
      },
      {
        bg: "bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 dark:from-slate-900 dark:via-violet-950/30 dark:to-slate-900",
        border: "border-violet-100 dark:border-violet-900/30",
        icon: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
        progress: "bg-violet-500",
        glow: "from-violet-500/10 to-fuchsia-500/10",
      },
    ];

    let hash = 0;
    const str = String(id || "default");
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return themes[Math.abs(hash) % themes.length];
  };

  const theme = getCardTheme(id);
  const projectLink = `/chat/${id}`;

  return (
    <Link href={projectLink} className="block group">
      <div
        className={`relative ${theme.bg} rounded-xl border ${theme.border} p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}
      >
        {/* Decorative gradient blob */}
        <div
          className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${theme.glow} rounded-full blur-3xl -z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative z-10">
          {/* Header with Icon and Priority Badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className={`w-10 h-10 rounded-lg ${theme.icon} flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
              >
                {IconComponent ? (
                  <IconComponent
                    size={20}
                    className="currentColor"
                    strokeWidth={2.5}
                  />
                ) : (
                  <LayoutDashboard
                    size={20}
                    className="currentColor"
                    strokeWidth={2.5}
                  />
                )}
              </div>

              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base truncate transition-colors">
                {title}
              </h3>
            </div>

            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-full ${priorityColor.bg} ${priorityColor.text} dark:bg-slate-800 dark:text-gray-300 flex-shrink-0 ml-2 shadow-sm`}
            >
              {priority}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {description}
          </p>

          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Progress
              </span>
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100 tabular-nums px-2 py-0.5 rounded-md">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="relative w-full bg-gray-100 dark:bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
              <div
                className={`${theme.progress} h-1.5 rounded-full transition-all duration-1000 ease-out relative`}
                style={{ width: `${Math.round(progress)}%` }}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Footer - Due Date */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]"></span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Active
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar
                size={14}
                className="text-gray-400 dark:text-slate-500"
                strokeWidth={2.5}
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Due:{" "}
                <span className="text-gray-900 dark:text-gray-200 font-semibold">
                  {dueDate}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
