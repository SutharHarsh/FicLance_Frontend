"use client";

import React, { useState } from "react";
import {
  MapPin,
  TrendingUp,
  Rocket,
  Sparkles,
  ChevronRight,
  Award,
  Zap,
  Target,
  Heart,
  Star,
} from "lucide-react";
import {
  getUserData,
  getProjectsData,
  getSkillsData,
  getContactData,
  getProfessionalData,
  getStatsData,
  getPortfolioSettings,
  formatDate,
  formatExperienceLevel,
  getInitials,
} from "@/utils/portfolioHelpers";

/**
 * THEME 07: THE JOURNEY
 * Interactive story-driven portfolio with dramatic visuals and animations
 * Each chapter reveals user's evolution with vibrant visuals
 */

export default function TheJourney({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const stats = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  const [activeChapter, setActiveChapter] = useState(0);

  const gradients = [
    "from-rose-500 via-pink-500 to-fuchsia-500",
    "from-purple-500 via-indigo-500 to-blue-500",
    "from-cyan-500 via-teal-500 to-emerald-500",
    "from-orange-500 via-amber-500 to-yellow-500",
  ];

  const bgGradients = [
    "from-rose-50 to-pink-50",
    "from-purple-50 to-indigo-50",
    "from-cyan-50 to-teal-50",
    "from-orange-50 to-amber-50",
  ];

  // Map Data for Chapters (Experience with Fallback to Projects)
  const experienceData = data?.experiences && data.experiences.length > 0
    ? data.experiences
    : projects.length > 0 ? projects : [];

  const chapters = experienceData.slice(0, 4).map((item, idx) => {
    // Determine if it's an experience or a project
    const isExperience = !!item.company;
    const year = isExperience
      ? (item.startDate ? item.startDate.split(" ")[item.startDate.split(" ").length - 1] : "N/A")
      : (item.createdAt ? new Date(item.createdAt).getFullYear().toString() : "N/A");

    return {
      year,
      phase: `Chapter ${["I", "II", "III", "IV"][idx] || idx + 1}`,
      title: isExperience ? item.company : item.title,
      subtitle: isExperience ? (item.position || item.role) : (item.status || "Project"),
      company: isExperience ? item.company : (item.client || "Independent"),
      achievement: item.description || "Leading high-impact initiatives and delivering exceptional results.",
      impact: {
        main: isExperience ? (item.currentlyWorking ? "Present" : item.endDate || "Ongoing") : `${item.progress || 0}% Complete`,
        metrics: isExperience
          ? [item.location || "Remote", "Achievement", "Experience", year]
          : [`Priority: ${item.priority || "Med"}`, `Status: ${item.status}`, item.tags?.[0] || "Featured", year]
      },
      gradient: gradients[idx] || gradients[0],
      bgGradient: bgGradients[idx] || bgGradients[0],
    };
  });

  // Map Design Principles to Primary Skills
  const principleIcons = [<Sparkles />, <Target />, <Zap />, <Award />];
  const principleColors = [
    "from-pink-500 to-rose-500",
    "from-blue-500 to-indigo-500",
    "from-yellow-500 to-orange-500",
    "from-purple-500 to-fuchsia-500",
  ];

  const principles = skills.primary.slice(0, 4).map((skill, idx) => ({
    icon: React.cloneElement(principleIcons[idx] || principleIcons[0], { className: "w-7 h-7" }),
    title: skill,
    description: `Deep expertise in ${skill} applied to drive project success.`,
    color: principleColors[idx] || principleColors[0],
  }));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section - Book Opening Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random(),
              }}
            ></div>
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <div className="mb-8 flex items-center justify-center gap-3">
            <MapPin className="w-6 h-6 text-pink-400" />
            <span className="text-pink-300 font-medium">
              {user.location || "Remote"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black mb-6 text-white drop-shadow-2xl break-words">
            {user.name}
          </h1>

          <div className="mb-8">
            <div className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full">
              <p className="text-base sm:text-xl font-black text-white">{formatExperienceLevel(user.experienceLevel)}</p>
            </div>
          </div>

          <p className="text-lg sm:text-2xl md:text-3xl text-purple-100 max-w-3xl mx-auto mb-16 font-medium leading-relaxed px-4">
            {user.tagline || user.bio}
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            <Rocket className="w-8 h-8 text-pink-400" />
            <p className="text-lg text-purple-200 font-medium">
              {professional.title || user.role}
            </p>
            <Rocket className="w-8 h-8 text-pink-400" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
          </div>

          <button
            onClick={() => document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-white text-purple-900 rounded-full text-xl font-black hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            Read My Story →
          </button>
        </div>
      </section>

      {/* Interactive Chapters (Experience / The Journey) */}
      {(isActive("Experience") || isActive("Projects")) && (
        <section id="chapters" className="py-32 px-8 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                The Journey So Far
              </h2>
              <p className="text-xl text-slate-600">
                {chapters.length} chapters of growth, learning, and
                impact
              </p>
            </div>

            {/* Chapter Navigator */}
            {chapters.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16">
                  {chapters.map((chapter, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveChapter(idx)}
                      className={`p-4 sm:p-6 rounded-3xl transition-all text-left ${activeChapter === idx
                        ? `bg-gradient-to-br ${chapter.gradient} text-white shadow-2xl scale-105`
                        : `bg-gradient-to-br ${chapter.bgGradient} text-gray-700 hover:scale-105`
                        }`}
                    >
                      <div className="text-[10px] sm:text-sm font-black mb-1 md:mb-2">{chapter.phase}</div>
                      <div className="text-xl sm:text-3xl font-black mb-1">{chapter.year}</div>
                      <div
                        className={`text-[10px] sm:text-sm font-bold line-clamp-1 ${activeChapter === idx ? "text-white" : "text-gray-600"
                          }`}
                      >
                        {chapter.title}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active Chapter Display */}
                <div
                  className={`bg-gradient-to-br ${chapters[activeChapter].gradient} rounded-3xl md:rounded-[4rem] p-6 md:p-20 text-white shadow-2xl transition-all duration-500`}
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                      <div className="text-sm font-black mb-3 opacity-90">
                        {chapters[activeChapter].phase}
                      </div>
                      <h3 className="text-3xl md:text-7xl font-black mb-4 break-words">
                        {chapters[activeChapter].title}
                      </h3>
                      <p className="text-lg md:text-2xl opacity-90 font-bold mb-6">
                        {chapters[activeChapter].subtitle}
                      </p>
                      <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <p className="font-black">
                          {chapters[activeChapter].company}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
                      <p className="text-lg md:text-xl leading-relaxed font-medium whitespace-pre-wrap">
                        {chapters[activeChapter].achievement}
                      </p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8">
                      <div className="text-center mb-6">
                        <div className="text-3xl md:text-5xl font-black mb-2">
                          {chapters[activeChapter].impact.main}
                        </div>
                        <div className="text-sm opacity-90 font-bold uppercase tracking-widest">
                          Impact Timeline
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {chapters[activeChapter].impact.metrics.map(
                          (metric, i) => (
                            <div
                              key={i}
                              className="text-center bg-white/10 rounded-2xl p-4 flex items-center justify-center min-h-[60px]"
                            >
                              <div className="font-black text-sm">{metric}</div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-300">
                <p className="text-slate-400 font-medium">No chapters available yet. Add experiences or projects to start your story.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Design Principles / Skills */}
      {isActive("Skills") && principles.length > 0 && (
        <section className="py-32 px-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Design Principles
              </h2>
              <p className="text-xl text-slate-600">
                The core competencies that guide my craft
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, idx) => (
                <div key={idx} className="group">
                  <div
                    className={`bg-gradient-to-br ${principle.color} rounded-3xl p-8 text-white hover:shadow-2xl transition-all hover:scale-105 h-full`}
                  >
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                      {principle.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4">
                      {principle.title}
                    </h3>
                    <p className="font-medium opacity-90 leading-relaxed text-xs sm:text-sm">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-32 px-8 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {section.title}
            </h2>
            <div className="prose prose-lg md:prose-xl max-w-none text-slate-700 leading-relaxed font-medium">
              {section.content.split("\n").map((para, i) => (
                <p key={i} className="mb-6">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Contact Section */}
      {isActive("Contact") && (
        <section className="py-32 px-8 bg-gradient-to-br from-purple-900 via-pink-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl md:text-6xl font-black mb-6 break-words">
                Let's Write the Next Chapter Together
              </h2>
              <p className="text-2xl text-purple-200 mb-12">
                Ready to collaborate on something amazing? Reach out and let's discuss your vision.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="px-12 py-5 bg-white text-purple-900 rounded-full text-xl font-black hover:shadow-2xl hover:shadow-white/50 transition-all hover:scale-105 flex items-center justify-center"
                >
                  Contact Me
                </a>
              )}
              <div className="flex gap-4">
                {contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="px-8 py-5 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-full text-xl font-black hover:bg-white/30 transition-all flex items-center justify-center">
                    LinkedIn
                  </a>
                )}
                {contact.github && (
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="px-8 py-5 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-full text-xl font-black hover:bg-white/30 transition-all flex items-center justify-center">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
