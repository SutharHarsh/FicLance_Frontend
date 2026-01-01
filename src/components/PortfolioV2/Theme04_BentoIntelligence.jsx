"use client";

import React from "react";
import {
  getUserData,
  getProjectsData,
  getSkillsData,
  getContactData,
  getProfessionalData,
  getStatsData,
  getPortfolioSettings,
  formatDate,
  generateSampleProjects,
  formatExperienceLevel, // Added formatExperienceLevel
} from "@/utils/portfolioHelpers";

/**
 * THEME 04: BENTO INTELLIGENCE
 *
 * Philosophy:
 * - Modular bento-style layout
 * - Information-dense but elegant
 * - Precision spacing, engineered feel
 * - Modern product-thinking vibe
 * - Every module has purpose
 *
 * Visual Language:
 * - Asymmetric grid system
 * - Cards with different aspect ratios
 * - Micro-interactions on hover
 * - Subtle shadows and borders
 * - Data visualization integrated naturally
 */

export default function BentoIntelligence({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const statsData = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  // Use real projects if available, otherwise generate samples for display
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : generateSampleProjects(3);

  const heroStats = [
    { value: statsData.totalProjects || "0", label: "Total Projects" },
    { value: statsData.completedProjects || "0", label: "Completed" },
    { value: statsData.activeProjects || "0", label: "Active" },
  ];

  // Map skills according to strict rules: Primary, Tech Stack, All
  const skillGroups = [
    { category: "Primary", items: skills.primary },
    { category: "Tech Stack", items: skills.techStack },
    { category: "Toolkit", items: skills.all.filter(s => !skills.primary.includes(s) && (!skills.techStack || !skills.techStack.includes(s))).slice(0, 6) }
  ].filter((group) => group.items && group.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 p-4 md:p-8 text-slate-900">
      <div className="max-w-[1600px] mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 md:auto-rows-[120px]">
          {/* Hero Card - Large */}
          <div className="col-span-12 md:col-span-8 md:row-span-3 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl p-6 md:p-12 shadow-2xl border border-violet-400/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl"></div>
            <div className="space-y-6 relative z-10">
              <div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl break-words">
                  {user.name}
                </h1>
                <p className="text-xl sm:text-2xl text-violet-100 mb-2 font-bold">
                  {formatExperienceLevel(user.experienceLevel)}
                </p>
                <p className="text-base sm:text-lg text-violet-200/90 font-medium">
                  {user.tagline || user.bio}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mt-8 relative z-10">
              {heroStats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl sm:text-4xl font-black text-white drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-sm text-violet-200 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About/Bio Card - Vertical */}
          {isActive("About") && (
            <div className="col-span-12 md:col-span-4 md:row-span-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-3xl p-6 shadow-lg border border-violet-200">
              <h3 className="text-sm font-black text-violet-600 uppercase tracking-wider mb-4">
                About
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-800 font-medium leading-relaxed">
                  {user.bio || formatExperienceLevel(professional.careerGoal) || "Passionate professional dedicated to building exceptional digital solutions."}
                </p>
                <div className="pt-4 border-t border-violet-200">
                  <div className="text-xs font-black text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text uppercase tracking-wider mb-2">
                    Status
                  </div>
                  <p className="text-sm text-gray-800 font-medium">
                    {professional.availability ? `${professional.availability} Hr/Week` : "Available for projects"}
                  </p>
                  {user.location && (
                    <p className="text-sm text-gray-600 mt-1">📍 {user.location}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Experience Section - Full Width Row */}
          {isActive("Experience") && (
            <div className="col-span-12 md:row-span-3 bg-white rounded-3xl p-8 shadow-lg border border-violet-100 overflow-y-auto">
              <h3 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-6">
                Professional Experience
              </h3>

              <div className="space-y-8">
                {/* 1. Work History */}
                {data?.experiences && data.experiences.length > 0 ? (
                  data.experiences.map((exp, idx) => (
                    <div key={idx} className="border-l-4 border-violet-200 pl-6 py-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{exp.company}</h4>
                          <p className="text-violet-600 font-medium">{exp.position || exp.role}</p>
                        </div>
                        <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full mt-2 md:mt-0 inline-block">
                          {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mt-2 whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    </div>
                  ))
                ) : (
                  /* 2. Fallback to Projects if no experience */
                  projects.length > 0 ? (
                    <div className="text-gray-500 italic mb-4">
                      High-impact configurations and project deployments.
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No professional experience entries yet.
                    </div>
                  )
                )}

                {/* Fallback Project display when using projects as experience */}
                {(!data?.experiences || data.experiences.length === 0) && projects.slice(0, 2).map((project, idx) => (
                  <div key={`backup-exp-${idx}`} className="border-l-4 border-fuchsia-200 pl-6 py-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{project.title}</h4>
                        <p className="text-fuchsia-600 font-medium">Project Lead</p>
                      </div>
                      <span className="text-sm font-bold text-gray-400">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Cards (Featured) */}
          {isActive("Projects") &&
            displayProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="col-span-12 md:col-span-4 md:row-span-4 bg-gradient-to-br from-white via-pink-50/30 to-violet-50/30 rounded-3xl p-6 shadow-lg border border-violet-200 hover:shadow-2xl hover:border-fuchsia-300 transition-all flex flex-col"
              >
                <div className="space-y-4 flex-grow">
                  <div>
                    <div className="text-xs font-black text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text uppercase tracking-wider mb-2">
                      {project.status || "Active"}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-4 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-violet-100/50 border-b mb-4">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-black text-violet-600">
                        {project.progress}%
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-black text-fuchsia-600">
                        {project.priority || "Med"}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">Priority</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-black text-pink-500 truncate px-1">
                        {project.deadline ? formatDate(project.deadline) : "Ongoing"}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">Timeline</div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {(project.tags || []).slice(0, 4).map(
                    (tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 rounded-full font-bold border border-violet-200"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}

          {/* Skills Grid - Dynamically Sized */}
          {isActive("Skills") &&
            skillGroups.map((skillGroup, idx) => (
              <div
                key={idx}
                className="col-span-12 md:col-span-4 md:row-span-2 bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-6 shadow-lg border border-violet-200"
              >
                <h4 className="text-sm font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent uppercase tracking-wider mb-3">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded shadow-sm border border-violet-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}

          {/* Contact Cards */}
          {isActive("Contact") && (
            <>
              {/* CTA Card */}
              <div className="col-span-12 md:col-span-6 md:row-span-2 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xl md:text-2xl font-black mb-2">
                    Let's Build Something
                  </div>
                  <div className="text-violet-100 font-medium">
                    {professional.availability ? `${professional.availability} Hr/Week` :
                      "Available for select projects"}
                  </div>
                </div>
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="px-6 py-3 bg-white text-violet-600 rounded-full font-black hover:bg-violet-50 transition-colors hover:shadow-xl whitespace-nowrap"
                  >
                    Contact Me
                  </a>
                )}
              </div>

              {/* Social/Status Card */}
              <div className="col-span-12 md:col-span-6 md:row-span-2 bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-3xl p-8 shadow-lg border border-pink-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-fuchsia-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-black text-gray-900">{user.name}</div>
                    <div className="flex gap-4 mt-2">
                      {contact.linkedin && (
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-violet-600 hover:text-violet-800">LinkedIn</a>
                      )}
                      {contact.github && (
                        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-violet-600 hover:text-violet-800">GitHub</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Custom Sections */}
          {settings.customSections.map((section, idx) => (
            <div
              key={idx}
              className="col-span-12 row-span-auto bg-white rounded-3xl p-8 shadow-lg border border-violet-100"
            >
              <h3 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
                {section.title}
              </h3>
              <div className="text-gray-700 leading-relaxed font-medium space-y-4 whitespace-pre-wrap">
                {section.content.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
