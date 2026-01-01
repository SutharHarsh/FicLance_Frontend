"use client";

import React from "react";
import { Briefcase, Users, TrendingUp, Award, CheckCircle, Target, Zap, Shield, Mail, Linkedin, Github } from "lucide-react";
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
} from "@/utils/portfolioHelpers";

/**
 * THEME 11: CORPORATE EXECUTIVE
 * Premium corporate design with trust-building elements
 */

export default function CorporateExecutive({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const stats = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);
  const displayProjects = projects.length > 0 ? projects.slice(0, 4) : [];
  const expertiseIcons = [<Zap className="w-6 h-6" />, <Users className="w-6 h-6" />, <Target className="w-6 h-6" />, <Shield className="w-6 h-6" />];

  // Experience Data with Fallback
  const experienceData = data?.experiences && data.experiences.length > 0
    ? data.experiences
    : projects.length > 0 ? projects : [];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Executive Header */}
      <header className="relative py-24 px-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 w-32 mb-8 md:mb-10 rounded-full"></div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tight text-white break-words leading-tight">{user.name}</h1>

          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg shadow-lg shadow-emerald-900/20">
              <p className="font-black text-lg text-white">{formatExperienceLevel(user.experienceLevel)}</p>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm shrink-0">
              <Briefcase className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-slate-300 font-bold uppercase tracking-wider text-xs whitespace-nowrap">{professional.company || 'Independent'}</span>
            </div>

            {(stats.experienceYears > 0 || professional.yearsExperience) && (
              <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm shrink-0">
                <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-bold uppercase tracking-wider text-xs whitespace-nowrap">{stats.experienceYears || professional.yearsExperience}+ Years Tenure</span>
              </div>
            )}
          </div>

          <p className="text-lg md:text-3xl text-slate-300 max-w-4xl leading-relaxed font-medium">
            {user.bio || user.tagline || 'Leading transformation through strategic technology initiatives.'}
          </p>
        </div>
      </header>

      {/* Leadership Impact (Stats) */}
      {isActive("About") && (
        <section className="py-20 px-8 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">Leadership Metrics</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Track Record", value: stats.totalProjects, sub: "Total Initiatives" },
                { label: "Execution", value: stats.completedProjects, sub: "Successfully Delivered" },
                { label: "Management", value: stats.activeProjects, sub: "Current Workstream" },
                { label: "Expertise", value: stats.skillsCount, sub: "Core Competencies" },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center hover:border-emerald-500/50 transition-all group backdrop-blur-sm">
                  <div className="text-3xl md:text-5xl font-black text-emerald-400 mb-2 group-hover:scale-110 transition-transform truncate">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-600 uppercase font-bold">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Expertise (Skills) */}
      {isActive("Skills") && skills.primary.length > 0 && (
        <section className="py-24 px-8 border-y border-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16 justify-center text-center flex-col">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight self-start md:self-center">Strategic Expertise</h2>
              <div className="h-1 w-24 bg-emerald-500 self-start md:self-center"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {skills.primary.slice(0, 4).map((skill, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 bg-slate-900/40 border border-slate-800/80 rounded-[2rem] p-6 sm:p-8 hover:bg-slate-800/60 hover:border-emerald-500/30 transition-all cursor-default">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-5 rounded-2xl shadow-lg shadow-emerald-500/10 shrink-0">
                    {expertiseIcons[idx % expertiseIcons.length]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-1.5 text-white">{typeof skill === 'string' ? skill : skill.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-1 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Domain Mastery</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Footer */}
            {skills.techStack.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-800 flex flex-wrap justify-center gap-4">
                {skills.techStack.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Executive Experience (Timeline) */}
      {isActive("Experience") && (
        <section className="py-24 px-8 bg-slate-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <Briefcase className="w-8 h-8 text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">Professional Trajectory</h2>
            </div>

            {experienceData.length > 0 ? (
              <div className="space-y-12">
                {experienceData.slice(0, 4).map((exp, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-slate-800">
                    <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-emerald-500/30 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-2xl font-black text-white mb-1">
                            {exp.position || exp.role || exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-sm">
                            <span>{exp.company || exp.client || 'Strategic Initiative'}</span>
                            {exp.location && <span className="text-slate-600">|</span>}
                            {exp.location && <span className="text-slate-400 text-xs font-medium lowercase tracking-normal">{exp.location}</span>}
                          </div>
                        </div>
                        <div className="shrink-0 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 md:text-right">
                          <p className="text-xs font-black text-slate-500 uppercase mb-0.5">Duration</p>
                          <p className="text-sm font-bold text-white">
                            {exp.startDate ? `${exp.startDate} — ${exp.currentlyWorking ? 'Present' : exp.endDate || 'N/A'}` : 'Project Milestone'}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                        {exp.description || 'Executing key strategic directives and driving organizational excellence.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Professional History Not Available</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Strategic Initiatives (Projects) */}
      {isActive("Projects") && (
        <section className="py-24 px-8 border-t border-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <Target className="w-8 h-8 text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">Strategic Initiatives</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {displayProjects.map((project) => (
                <div key={project.id} className="group flex flex-col bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 sm:p-10 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 block">Status</span>
                      <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                        {project.status || 'Active'}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight break-words">{project.title}</h3>
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 flex-grow">
                    {project.description || 'Leading high-impact digital initiatives to drive organizational growth.'}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {(project.tags || []).slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
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
          className={`py-24 px-8 ${idx % 2 === 0 ? "bg-slate-950" : "bg-slate-900/30"} border-t border-slate-900`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="h-12 w-2 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white break-words">{section.title}</h2>
            </div>
            <div className="prose prose-invert prose-lg md:prose-2xl max-w-none text-slate-300 leading-relaxed font-medium">
              {section.content.split("\n").map((para, i) => (
                <p key={i} className="mb-8">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA / Contact Section */}
      {isActive("Contact") && (
        <section className="py-32 px-8 bg-gradient-to-t from-black via-slate-950 to-slate-900 border-t border-slate-800 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-7xl font-black mb-8 text-white tracking-tight break-words">Let's Drive Innovation Together</h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 font-medium">Available for executive consulting and strategic advisory roles.</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-xl font-black text-white hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Mail className="w-6 h-6" />
                  Initiate Discussion
                </a>
              )}

              <div className="flex gap-4 w-full sm:w-auto">
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none p-5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-emerald-500/50 transition-all flex items-center justify-center"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none p-5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-emerald-500/50 transition-all flex items-center justify-center"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-16 text-slate-600 font-bold uppercase tracking-[0.3em] text-[10px]">
              Strictly Professional Engagement · {new Date().getFullYear()}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
