"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiAwardFill,
  RiSettings4Line,
  RiVipDiamondLine,
  RiFolderOpenLine,
  RiShieldCheckLine,
  RiStarFill,
  RiTimeLine,
  RiTeamLine,
  RiFlashlightLine,
  RiQuestionLine,
  RiExternalLinkLine,
  RiInformationLine,
  RiSearchLine,
  RiFilter3Line,
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const BADGE_DETAILS = [
  {
    id: "first_simulation",
    name: "Trailblazer",
    icon: RiSettings4Line,
    color: "from-blue-500 to-indigo-600",
    cat: "Getting Started",
    description:
      "The journey of a thousand simulations begins with a single step. Recognizes early initiative.",
    howToEarn:
      "Start any project simulation from the dashboard or templates gallery.",
    benefits: [
      "500 XP Welcome Bonus",
      "Early Access to Beta Templates",
      "Profile Customization",
    ],
  },
  {
    id: "simulation_master",
    name: "Project Pro",
    icon: RiVipDiamondLine,
    color: "from-purple-500 to-fuchsia-600",
    cat: "Performance",
    description:
      "Consistency is key to mastery. Awarded for completing multiple projects with excellence.",
    howToEarn:
      "Complete at least 5 project simulations with a state of 'Completed'.",
    benefits: [
      "1500 XP Milestone Bonus",
      "Advanced Project Suggestions",
      "Priority Agent Responses",
    ],
  },
  {
    id: "portfolio_builder",
    name: "Curator",
    icon: RiFolderOpenLine,
    color: "from-orange-500 to-amber-600",
    cat: "Career",
    description:
      "A strong portfolio is a developer's best friend. Awarded for maintaining a real-world repository list.",
    howToEarn:
      "Successfully analyze and add 3 or more repositories to your portfolio section.",
    benefits: [
      "1000 XP Career Bonus",
      "Portfolio Link Enhancements",
      "Detailed GitHub Analytics",
    ],
  },
  {
    id: "bug_hunter",
    name: "Sentinel",
    icon: RiShieldCheckLine,
    color: "from-emerald-500 to-teal-600",
    cat: "Technical",
    description:
      "Security is a foundation, not an afterthought. Awarded for shipping clean, secure code.",
    howToEarn:
      "Have a repository analyzed by our system with zero critical vulnerabilities found.",
    benefits: [
      "2000 XP Security Specialist Bonus",
      "Security Audit Badge on Profile",
      "Exclusive 'Clean Code' Badge",
    ],
  },
  {
    id: "perfect_score",
    name: "Mastermind",
    icon: RiStarFill,
    color: "from-rose-500 to-pink-600",
    cat: "Excellence",
    description:
      "Perfection is attained by slow degrees. Honors the highest possible performance score.",
    howToEarn:
      "Complete a simulation project with a final performance score of 100/100.",
    benefits: [
      "3000 XP Legendary Bonus",
      "Mastermind Rank in Community",
      "Special Profile Glow Effect",
    ],
  },
  {
    id: "fast_learner",
    name: "Velocity",
    icon: RiTimeLine,
    color: "from-cyan-500 to-blue-600",
    cat: "Efficiency",
    description:
      "Speed and precision define modern development. Awarded for navigating complex simulations rapidly.",
    howToEarn:
      "Complete a full project simulation in under 30 minutes with a score above 80.",
    benefits: [
      "750 XP Agility Bonus",
      "Unlocked 'Quick-Start' Mode",
      "Time-tracking Enhancements",
    ],
  },
  {
    id: "team_player",
    name: "Synergist",
    icon: RiTeamLine,
    color: "from-green-500 to-emerald-600",
    cat: "Soft Skills",
    description:
      "Coding is a team sport. Recognizes exceptional communication and collaboration skills.",
    howToEarn:
      "Receive a 5-star 'Communication' rating across 3 consecutive projects.",
    benefits: [
      "1200 XP Leadership Bonus",
      "Management Templates",
      "Increased Multi-Agent Slot",
    ],
  },
  {
    id: "rising_star",
    name: "Supernova",
    icon: RiFlashlightLine,
    color: "from-yellow-400 to-orange-500",
    cat: "Growth",
    description:
      "A rapid ascent in skill deserves recognition. Tracks momentum and professional growth.",
    howToEarn:
      "Increase your average performance score by 20+ points over a streak of 3 projects.",
    benefits: [
      "2500 XP Momentum Bonus",
      "Featured Profiling",
      "Unlock Custom Dashboard Themes",
    ],
  },
];

const CATEGORIES = [
  "All",
  "Getting Started",
  "Technical",
  "Performance",
  "Career",
  "Efficiency",
  "Soft Skills",
  "Growth",
];

export default function AchievementGuide() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBadges = BADGE_DETAILS.filter((badge) => {
    const matchesCat = activeCategory === "All" || badge.cat === activeCategory;
    const matchesSearch =
      badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20 font-Inter">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-card/70 dark:bg-background/70 backdrop-blur-xl border-b border-border px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <Link
            href="/help-desk"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest group"
          >
            <RiArrowLeftLine className="transition-transform group-hover:-translate-x-1" />
            Help Desk
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 p-1 bg-secondary rounded-full border border-border">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Link
              href="/profile"
              className="p-2 rounded-full bg-foreground text-background hover:scale-105 transition-transform"
            >
              <RiExternalLinkLine size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="py-20 px-6 border-b border-border bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-500/20 mb-8"
          >
            <RiAwardFill size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Achievement System v2.0
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-foreground tracking-tight mb-6"
          >
            FicLance Badge Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Master the technical landscape. Unlock unique milestones that
            showcase your professional growth and industry readiness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 relative max-w-lg mx-auto"
          >
            <RiSearchLine
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search badges or criteria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-secondary/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBadges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-card border border-border rounded-3xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)] transition-all flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
                  >
                    <badge.icon className="text-white text-2xl" />
                  </div>
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest border border-border px-2 py-1 rounded-lg">
                    {badge.cat}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-black text-foreground mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-xl border border-border">
                    <h4 className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest mb-2">
                      <RiQuestionLine size={12} />
                      How to Unlock
                    </h4>
                    <p className="text-[11px] font-bold text-foreground/80">
                      {badge.howToEarn}
                    </p>
                  </div>

                  <div className="pl-1">
                    <h4 className="flex items-center gap-2 text-[9px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2">
                      <RiAwardFill size={12} />
                      In-Platform Utility
                    </h4>
                    <ul className="space-y-1.5">
                      {badge.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* FAQ - Refined Knowledge Base Style */}
        <section className="mt-32 pt-20 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <RiInformationLine size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground tracking-tight">
                  System FAQ
                </h2>
                <p className="text-sm text-muted-foreground font-medium">
                  Everything you need to know about rewards.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "How are performance scores calculated?",
                  a: "Scores are based on AI analysis of requirements gathering, code quality, and project impact. A perfect 100/100 denotes technical excellence across all layers.",
                },
                {
                  q: "When are badges awarded?",
                  a: "Badges reach your profile synchronously. As soon as a project state updates to 'Completed', the backend service triggers the synchronization.",
                },
                {
                  q: "Can I display these elsewhere?",
                  a: "Yes. Once earned, badges are tied to your public FicLance profile which can be shared with potential clients or employers.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-8 bg-card border border-border rounded-3xl group hover:border-primary/30 transition-all"
                >
                  <h3 className="text-base font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Search empty state */}
      {filteredBadges.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <RiFilter3Line size={32} />
          </div>
          <h3 className="text-lg font-black text-gray-900 dark:text-white">
            No results found
          </h3>
          <p className="text-sm text-gray-400 font-medium mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
