"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Award,
  Users,
  Code2,
  Rocket,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";
import {
  getUserData,
  getContactData,
  getSkillsData,
  getProjectsData,
  getStatsData,
  getProfessionalData,
  getPortfolioSettings,
  formatDate,
  formatExperienceLevel,
  getStatusColor,
  getInitials,
  generateSampleProjects,
} from "../../utils/portfolioHelpers";

/**
 * THEME 02: MODERN MAGAZINE
 * Editorial design with vibrant colors and comprehensive sections
 */

export default function ModernMagazine({ data }) {
  const user = getUserData(data);
  const contact = getContactData(data);
  const skills = getSkillsData(data);
  const projects = getProjectsData(data);
  const stats = getStatsData(data);
  const professional = getProfessionalData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  // Use real projects if available, otherwise generate samples
  const displayProjects =
    projects.length > 0 ? projects : generateSampleProjects(3);

  const heroStats = [
    { value: `${stats.completedProjects}`, label: "Completed Projects" },
    { value: `${stats.activeProjects}`, label: "Active Projects" },
    { value: `${stats.badgesCount}`, label: "Badges" },
    { value: `${stats.skillsCount}+`, label: "Skills" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero - Magazine Cover Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 w-full">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">
                {professional.availability} Hr/Week
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight break-words">
            {user.name}
          </h1>

          <p className="text-2xl md:text-5xl font-bold text-white/90 mb-6 max-w-4xl">
            {formatExperienceLevel(user.experienceLevel)}
          </p>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-16 leading-relaxed">
            {user.tagline || user.bio}
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
              >
                Let's Talk
              </a>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {heroStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <div className="text-4xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {isActive("About") && (
        <section className="py-32 px-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-4xl font-black text-white mb-8 shadow-2xl rotate-3">
                  {getInitials(user.name)}
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  Hi, I'm {user.name.split(" ")[0]} 👋
                </h2>
                <p className="text-xl text-slate-700 leading-relaxed mb-8">
                  {user.bio ||
                    formatExperienceLevel(professional.careerGoal) ||
                    "Passionate software engineer focused on building exceptional digital experiences."}
                </p>
                <div className="flex gap-4">
                  {contact.linkedin && (
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {contact.github && (
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {skills.primary.slice(0, 4).map((skill, idx) => {
                  const icons = ["🎯", "⚡", "🔧", "📚"];
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl transition-shadow"
                    >
                      <div className="text-4xl mb-4">{icons[idx]}</div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        {skill}
                      </h3>
                      <p className="text-sm text-slate-600">Expert Level</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Showcase Projects - Simulation Projects Only */}
      {isActive("Projects") && (
        <section className="py-32 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 md:mb-16">
              Featured Work
            </h2>

            {projects.filter(p => !p.isManual).length > 0 ? (
              <div className="space-y-24">
                {projects.filter(p => !p.isManual).slice(0, 4).map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className={`grid md:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? "md:grid-flow-dense" : ""
                      }`}
                  >
                    <div className={idx % 2 === 1 ? "md:col-start-2" : ""}>
                      <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-6">
                        {formatDate(project.createdAt)}
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">
                        {project.title}
                      </h3>

                      <p className="text-lg text-slate-700 leading-relaxed mb-8">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div>
                          <div className="text-2xl font-black text-purple-600">
                            {project.progress}%
                          </div>
                          <div className="text-sm text-slate-600">Progress</div>
                        </div>
                        <div>
                          <div className="text-2xl font-black text-purple-600">
                            {project.priority || "Medium"}
                          </div>
                          <div className="text-sm text-slate-600">Priority</div>
                        </div>

                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {(project.tags || skills.primary.slice(0, 3)).map(
                          (tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div
                      className={
                        idx % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""
                      }
                    >
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center text-7xl md:text-9xl shadow-2xl border-4 md:border-8 border-white">
                        {getInitials(user.name)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No simulation projects to showcase yet.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experience Timeline - Work History + Manual Projects */}
      {isActive("Experience") && (
        <section className="py-32 px-8 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 md:mb-16">
              Experience
            </h2>

            <div className="space-y-12">
              {/* 1. Real Work Experience (Jobs) */}
              {data?.experiences && data.experiences.map((exp, idx) => (
                <div
                  key={`job-${idx}`}
                  className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                        {exp.position || exp.role}
                      </h3>
                      <p className="text-xl font-bold text-purple-600 mb-2">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-slate-500 text-sm mb-4">{exp.location}</p>
                      )}
                      <p className="text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                    <div className="text-lg font-bold text-slate-600 mt-4 md:mt-0">
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </div>
                  </div>
                </div>
              ))}

              {/* 2. Manual Projects (Treated as Experience per User Request) */}
              {projects.filter(p => p.isManual).map((project, idx) => (
                <div
                  key={`manual-${project.id || idx}`}
                  className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
                          Project
                        </div>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm font-bold">
                            View Live
                          </a>
                        )}
                      </div>
                      <p className="text-slate-600">{project.description}</p>
                    </div>
                    <div className="text-lg font-bold text-slate-600 mt-4 md:mt-0">
                      {formatDate(project.createdAt)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {(project.tags || []).map(
                      (tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-bold"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {(!data?.experiences?.length && !projects.filter(p => p.isManual).length) && (
                <div className="text-center py-12 text-gray-500">
                  <p>No professional experience or personal projects listed yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {isActive("Skills") && (
        <section className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 md:mb-16">
              Skills & Tools
            </h2>

            <div className="space-y-12">
              {/* Primary / Hobbies */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                  {skills.primary.length > 0 ? "Hobbies & Interests" : "Primary Skills"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.primary.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-base md:text-lg shadow-lg hover:scale-105 transition-transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              {skills.techStack && skills.techStack.length > 0 && (
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.techStack.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-transform"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Skills */}
              {skills.all && skills.all.length > 0 && (
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">
                    Other Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.all.slice(0, 15).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-transform"
                      >
                        {skill}
                      </span>
                    ))}
                    {skills.all.length > 15 && (
                      <span className="px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold text-lg">
                        +{skills.all.length - 15} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      <section className="py-32 px-8 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 md:mb-16">
            Badges
          </h2>

          {heroStats.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-yellow-200 hover:shadow-2xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-sm font-bold text-yellow-600 mb-2">
                    {stat.label}
                  </div>
                  <p className="font-bold text-lg text-slate-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No achievements yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Sections */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-32 px-8 bg-white ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"
            }`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 md:mb-16">
              {section.title}
            </h2>
            <div className="prose prose-2xl max-w-none text-slate-700 leading-relaxed">
              {section.content.split("\n").map((para, i) => (
                <p key={i} className="mb-8">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 px-8 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 break-words">
            Let's Create Something Amazing
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            {user.tagline || user.bio}
          </p>
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="inline-block px-12 py-6 bg-white text-purple-600 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl"
            >
              Get In Touch →
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
