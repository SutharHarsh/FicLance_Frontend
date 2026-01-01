"use client";

import React from "react";
import { Globe, Users, DollarSign, BarChart3, TrendingUp, Rocket, Award, Target } from "lucide-react";
import {
  getUserData,
  getProjectsData,
  getSkillsData,
  getContactData,
  getProfessionalData,
  getPortfolioSettings,
  getStatsData,
  getProjectStatusColor,
  formatExperienceLevel,
} from "@/utils/portfolioHelpers";

const ReadMore = ({ text, limit = 150 }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const shouldTruncate = text && text.length > limit;

  if (!shouldTruncate) return <span className="text-inherit leading-relaxed whitespace-pre-wrap">{text}</span>;

  return (
    <span className="inline">
      <span className="text-inherit leading-relaxed">
        {isExpanded ? text : `${text.substring(0, limit)}...`}
      </span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 border-b border-blue-400/30 hover:border-blue-400 transition-colors"
      >
        {isExpanded ? "Close" : "Expand"}
      </button>
    </span>
  );
};

/**
 * THEME 13: STARTUP FOUNDER
 * Bold, metrics-driven design for entrepreneurs
 */

export default function StartupFounder({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const stats = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  const displayProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero - Bold & Confident */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full py-20 md:py-32">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Rocket className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
            <span className="text-blue-400 font-black text-base md:text-lg uppercase tracking-wider">Future Leaders</span>
          </div>

          <h1 className="text-4xl sm:text-8xl md:text-[10rem] font-black mb-8 leading-[0.9] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent break-words">
            {user.name}
          </h1>

          <div className="mb-12">
            <p className="text-2xl md:text-3xl font-black text-white mb-4">{formatExperienceLevel(user.experienceLevel)}</p>
            <div className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed">
              <ReadMore text={user.bio || user.tagline || 'Building products that scale'} limit={150} />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
            {[
              { label: 'Total Projects', value: stats.totalProjects, icon: <Users className="w-6 h-6 md:w-7 md:h-7" />, color: 'from-blue-500 to-cyan-500' },
              { label: 'Completed', value: stats.completedProjects, icon: <DollarSign className="w-6 h-6 md:w-7 md:h-7" />, color: 'from-emerald-500 to-teal-500' },
              { label: 'Active', value: stats.activeProjects, icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />, color: 'from-purple-500 to-pink-500' },
              { label: 'Skills', value: stats.skillsCount, icon: <Target className="w-6 h-6 md:w-7 md:h-7" />, color: 'from-orange-500 to-red-500' },
            ].map((metric, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-3 md:p-6 hover:border-white/30 transition-all">
                <div className={`bg-gradient-to-r ${metric.color} w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 shrink-0`}>
                  {React.cloneElement(metric.icon, { className: 'w-5 h-5 md:w-7 md:h-7' })}
                </div>
                <div className="text-xl md:text-4xl font-black mb-1 md:mb-2 truncate">{metric.value}</div>
                <div className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startups Journey */}
      {isActive("Projects") && (
        <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              <h2 className="text-3xl md:text-6xl font-black leading-tight break-words">Projects Built</h2>
            </div>

            <div className="space-y-8">
              {displayProjects.map((project, idx) => {
                const gradients = [
                  'from-blue-600 to-cyan-600',
                  'from-purple-600 to-pink-600',
                  'from-emerald-600 to-teal-600'
                ];
                const gradient = gradients[idx % gradients.length];
                return (
                  <div key={project.id || idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 hover:border-white/30 transition-all">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-1 w-full">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3 className="text-xl md:text-4xl font-black leading-tight break-words">{project.title}</h3>
                          {project.status && (
                            <div className={`px-3 py-1.5 bg-gradient-to-r ${gradient} rounded-lg text-[10px] md:text-sm font-black uppercase tracking-wider`}>
                              {project.status}
                            </div>
                          )}
                        </div>
                        <div className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
                          <ReadMore text={project.description || 'No description available'} limit={150} />
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 md:p-6 mb-6 border border-white/5">
                          <p className="text-base md:text-lg font-medium text-slate-200 uppercase tracking-wide">
                            {project.priority && `Priority: ${project.priority} | `}
                            {project.progress !== undefined && `${project.progress}% Complete`}
                          </p>
                        </div>
                        {project.category && (
                          <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                            <span className="text-sm md:text-base text-slate-400 font-bold uppercase tracking-wider">{project.category}</span>
                          </div>
                        )}
                      </div>
                      <div className={`w-full md:w-64 h-48 md:h-64 bg-gradient-to-br ${gradient} rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0`}>
                        <Award className="w-20 h-20 md:w-32 md:h-32 text-white/20" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Philosophy (Skills) */}
      {isActive("Skills") && (
        <section className="py-20 md:py-32 px-5 md:px-8 bg-white/5 border-y border-white/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 text-center leading-tight break-words">Core Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {skills.primary && skills.primary.slice(0, 4).map((skill, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl md:text-5xl font-black text-blue-400">{idx + 1}</div>
                    <p className="text-lg md:text-xl text-white font-bold leading-relaxed pt-2 uppercase tracking-wide">{typeof skill === 'string' ? skill : skill.name}</p>
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
          className={`py-20 md:py-32 px-5 md:px-8 ${idx % 2 === 0 ? "bg-white/5" : "bg-transparent"} border-b border-white/10`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[10px] md:text-sm text-blue-400 font-black uppercase tracking-[0.3em] mb-8">
              {section.title}
            </h2>
            <div className="text-xl md:text-3xl font-black text-white leading-relaxed">
              <ReadMore text={section.content} limit={300} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      {isActive("Contact") && (
        <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight break-words">
              Let's Build the Next Big Thing
            </h2>
            <div className="text-xl md:text-2xl text-slate-300 mb-12 font-medium">
              <ReadMore text="Looking for co-founders, investors, or early team members to disrupt the market." limit={100} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="w-full sm:w-auto px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg md:text-xl font-black hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center justify-center">
                  Partner With Me
                </a>
              )}
              <button className="w-full sm:w-auto px-10 py-4 md:px-12 md:py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-xl text-lg md:text-xl font-black hover:bg-white/20 transition-all">
                View Pitch Deck
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
