"use client";

import React from "react";
import * as RiIcons from "react-icons/ri";
import { motion } from "framer-motion";
import { Award, Lock, Plus } from "lucide-react";
import Link from "next/link";

const ALL_POSSIBLE_BADGES = [
  {
    type: "first_simulation",
    label: "Trailblazer",
    iconName: "RiSettings4Line",
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/30",
  },
  {
    type: "simulation_master",
    label: "Project Pro",
    iconName: "RiVipDiamondLine",
    color: "from-purple-500 to-fuchsia-600",
    glow: "shadow-purple-500/30",
  },
  {
    type: "portfolio_builder",
    label: "Curator",
    iconName: "RiFolderOpenLine",
    color: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/30",
  },
  {
    type: "bug_hunter",
    label: "Sentinel",
    iconName: "RiShieldCheckLine",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/30",
  },
  {
    type: "perfect_score",
    label: "Mastermind",
    iconName: "RiStarFill",
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/30",
  },
];

const BadgeIcon = ({ iconName, className }) => {
  const IconComponent = RiIcons[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

const AchievementBadges = ({ badges = [] }) => {
  const earnedTypes = new Set(badges.map((b) => b.type));

  return (
    <div className="p-6 bg-card rounded-2xl border border-border shadow-sm flex flex-col group transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            Achievements
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            Milestones & Technical Badges
          </p>
        </div>
        <div className="p-2 rounded-xl bg-primary/10 text-primary ring-4 ring-primary/5">
          <Award size={20} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-y-8 gap-x-4 mb-2">
        {ALL_POSSIBLE_BADGES.map((badge, index) => {
          const isEarned = earnedTypes.has(badge.type);

          return (
            <motion.div
              key={badge.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center group/badge cursor-default"
            >
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isEarned
                      ? `bg-gradient-to-br ${badge.color} shadow-lg ${badge.glow} scale-105 active:scale-95 hover:scale-110`
                      : "bg-secondary border border-border opacity-40 grayscale group-hover/badge:opacity-60 group-hover/badge:grayscale-0"
                  }`}
                >
                  {isEarned ? (
                    <BadgeIcon
                      iconName={badge.iconName}
                      className="text-white text-xl drop-shadow-md"
                    />
                  ) : (
                    <Lock size={18} className="text-muted-foreground/30" />
                  )}
                </div>

                {isEarned && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping-slow bg-current opacity-10 pointer-events-none"
                    style={{ color: badge.color.split(" ")[1] }}
                  />
                )}
              </div>

              <span
                className={`text-[10px] font-bold mt-3 text-center transition-colors uppercase tracking-wider ${
                  isEarned ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {badge.label}
              </span>
            </motion.div>
          );
        })}

        {/* Locked Placeholder */}
        <div className="flex flex-col items-center opacity-20">
          <div className="w-14 h-14 rounded-full border-2 border-dashed border-border flex items-center justify-center">
            <Plus size={18} className="text-muted-foreground" />
          </div>
          <span className="text-[10px] font-bold mt-3 text-muted-foreground uppercase tracking-wider">
            Locked
          </span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <Link
          href="/help-desk/achievements"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-secondary text-[11px] font-bold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Explore Achievement Guide
          <RiIcons.RiArrowRightLine size={14} />
        </Link>
      </div>
    </div>
  );
};

export default AchievementBadges;
