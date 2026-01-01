"use client";
import React from "react";

const RecentActivities = ({ items }) => {
  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-900 dark:to-slate-800/50 rounded-xl border border-gray-200/60 dark:border-slate-700/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-black/20 overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Recent Activities
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Latest updates from your projects
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full ring-1 ring-indigo-100 dark:ring-indigo-900/50">
          {items?.length || 0} New
        </span>
      </div>

      <div className="space-y-0">
        {items?.map((activity, index) => (
          <div
            key={index}
            className={`relative pl-8 pb-8 group ${
              index === items.length - 1 ? "pb-0" : ""
            }`}
          >
            {/* Timeline Line */}
            {index !== items.length - 1 && (
              <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-gray-200 via-gray-100 to-transparent dark:from-slate-700 dark:via-slate-800 dark:to-transparent" />
            )}

            {/* Icon Circle */}
            <div
              className={`absolute left-0 top-1 w-6 h-6 rounded-full ${activity.bgColor} dark:bg-slate-800 flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:ring-indigo-50 dark:group-hover:ring-slate-700 z-10`}
            >
              <div className="text-[10px] transform transition-transform duration-300 group-hover:rotate-12">
                {activity.icon}
              </div>
            </div>

            {/* Activity Content */}
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <span className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                  {activity.title}
                </span>
                <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-slate-800/50 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>

              {activity.subtitle && (
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                  {activity.subtitle}
                </p>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {activity.description}
              </p>
            </div>
          </div>
        ))}

        {!items?.length && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No recent activities
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
