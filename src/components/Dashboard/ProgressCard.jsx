"use client";
import React from "react";

const ProgressCard = ({
  title,
  value,
  icon: Icon,
  iconBg = "bg-gradient-to-br from-indigo-500/10 to-indigo-500/20",
  iconColor = "text-indigo-600",
  iconSize = 20,
  progress = null,
  changeText = "",
  statChangeIcon: StatIcon = null,
  statChangeColor = "text-emerald-600",
  label = "",
}) => {
  return (
    <div className="group relative bg-card rounded-xl border border-border p-4 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-muted to-secondary rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          {/* Icon with Squircle Shape */}
          <div
            className={`p-2 rounded-xl ${iconBg} ring-1 ring-inset ring-black/5 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}
          >
            {Icon && (
              <Icon size={iconSize} className={iconColor} strokeWidth={2} />
            )}
          </div>

          {/* Trend/Change Indicator */}
          {!progress && changeText && (
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statChangeColor
                .replace("text-", "bg-")
                .replace("600", "50")} ${statChangeColor}`}
            >
              {StatIcon && <StatIcon size={10} strokeWidth={3} />}
              {changeText}
            </div>
          )}
        </div>

        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-foreground tracking-tight leading-none">
              {value}
            </h3>
            {label && (
              <span className="text-xs font-medium text-muted-foreground">
                {label}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar Section */}
        {progress && (
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="font-semibold text-muted-foreground">
                {progress.label}
              </span>
              {progress.showPercent && (
                <span className="font-bold text-foreground bg-secondary px-1.5 py-px rounded border border-border">
                  {progress.value}%
                </span>
              )}
            </div>

            <div className="relative w-full bg-secondary rounded-full h-1 overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full rounded-full ${progress.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                style={{ width: `${progress.value}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;
