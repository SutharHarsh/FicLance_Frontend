"use client";

import React from "react";
import {
  Briefcase,
  Award,
  Code,
  Users,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  Star,
  TrendingUp,
  ExternalLink,
  Github,
  Linkedin,
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
  getProjectStatusColor,
  getInitials,
  generateSampleProjects,
} from "@/utils/portfolioHelpers";

/**
 * THEME 01: THE EXECUTIVE PROFESSIONAL
 * Premium, comprehensive portfolio with extensive sections
 * Now using real user data from props
 */

const ReadMore = ({ text, limit = 150, light = false }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const shouldTruncate = text && text.length > limit;

  if (!shouldTruncate) return <p className="text-inherit leading-relaxed">{text}</p>;

  return (
    <div className="space-y-3">
      <p className="text-inherit leading-relaxed">
        {isExpanded ? text : `${text.substring(0, limit)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`text-sm font-semibold ${light ? "text-blue-200 border-blue-200/30" : "text-blue-600 border-blue-600/30"
          } border-b pb-0.5 hover:opacity-70 transition-opacity`}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default function TheQuietProfessional({ data }) {
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
    projects.length > 0 ? projects.slice(0, 3) : generateSampleProjects(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-x-hidden">
      {/* Hero Section - Premium Introduction */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {professional.availability} Hr/Week
              </span>
            </div>

            <h1 className="text-3xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-[1.1] break-words">
              {user.name}
            </h1>

            <p className="text-xl sm:text-2xl md:text-4xl font-light text-blue-100 mb-6">
              {formatExperienceLevel(user.experienceLevel)}
            </p>

            <div className="text-lg md:text-xl text-slate-300 max-w-3xl mb-12">
              <ReadMore text={user.tagline || user.bio} limit={200} light />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 text-center md:text-left">
                  {stats.completedProjects}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 uppercase tracking-wider text-center md:text-left">Completed Projects</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 text-center md:text-left">
                  {stats.activeProjects}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 uppercase tracking-wider text-center md:text-left">Active Projects</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 text-center md:text-left">
                  {stats.badgesCount}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 uppercase tracking-wider text-center md:text-left">Badges</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 text-center md:text-left">
                  {stats.skillsCount}+
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 uppercase tracking-wider text-center md:text-left">Skills</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {isActive("About") && (
        <section className="py-20 md:py-24 px-5 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-8 md:mb-12 flex items-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hidden sm:block"></div>
              About Me
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <div className="text-base md:text-lg text-slate-700">
                  <ReadMore
                    text={user.bio || formatExperienceLevel(professional.careerGoal) || "Passionate software engineer focused on building exceptional digital experiences."}
                    limit={200}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  {skills.primary.slice(0, 4).map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl"
                    >
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-slate-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-[0.2em]">
                    Contact Info
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    {user.location && (
                      <div className="flex items-center gap-3 text-slate-600">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {contact.github && (
                      <a
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Github className="w-4 h-4 shrink-0" />
                        <span className="truncate">GitHub Profile</span>
                      </a>
                    )}
                    {contact.linkedin && (
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 shrink-0" />
                        <span className="truncate">LinkedIn Profile</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white">
                  <h3 className="font-bold mb-2">Ready to collaborate?</h3>
                  <p className="text-sm text-blue-100 mb-4">
                    Let's build something amazing together
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block w-full text-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section - Using real projects as experience */}
      {isActive("Experience") && (
        <section className="py-20 md:py-24 px-5 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-12 md:mb-16 flex items-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hidden sm:block"></div>
              Professional Experience
            </h2>

            {/* User Added Experiences */}
            {data?.experiences && data.experiences.length > 0 && (
              <div className="space-y-8 mb-16">
                {data.experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2">
                          {exp.position || exp.role || "Professional Role"}
                        </h3>
                        <div className="flex items-center gap-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-semibold text-blue-600 truncate max-w-[150px] inline-block">
                              {exp.company}
                            </span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 mt-4 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                        </span>
                      </div>
                    </div>

                    {exp.description && (
                      <div className="text-base text-slate-700 leading-relaxed">
                        <ReadMore text={exp.description} limit={200} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Project Experience Fallback (if no real experience) */}
            {(!data?.experiences || data.experiences.length === 0) && displayProjects.length > 0 && (
              <div className="space-y-8">
                {displayProjects.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-semibold text-blue-600">
                              {professional.currentRole || user.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 mt-4 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          {formatDate(project.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-slate-700">
                        {project.description}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          {project.status === "active" && project.deadline && new Date(project.deadline) < new Date() ? "Completed" : (project.status || "Active")}
                        </span>
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {(!data?.experiences || data.experiences.length === 0) && displayProjects.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <p>No professional experience to display yet.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {isActive("Projects") && (
        <section className="py-20 md:py-24 px-5 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-12 md:mb-16 flex items-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hidden sm:block"></div>
              Featured Projects
            </h2>

            {displayProjects.length > 0 ? (
              <div className="space-y-16">
                {displayProjects.map((project, idx) => (
                  <div key={project.id || idx} className="group">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-6 md:p-10 border border-slate-200 hover:shadow-2xl transition-all">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                            {formatDate(project.createdAt)} • {project.status}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2">
                            {project.title}
                          </h3>
                          <p className="text-base md:text-lg text-blue-600 font-semibold mb-4 text-center md:text-left">
                            {user.role}
                          </p>
                          <div className="text-base md:text-lg text-slate-700 leading-relaxed">
                            <ReadMore text={project.description} limit={150} />
                          </div>
                        </div>
                      </div>

                      {/* Simulation Projects: Show Detailed Stats (Progress, Priority, etc.) */}
                      {!project.isManual ? (
                        <>
                          <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                  <TrendingUp className="w-4 h-4 text-red-600" />
                                </div>
                                Priority & Status
                              </h4>
                              <p className="text-slate-700 leading-relaxed">
                                Priority:{" "}
                                <span className="font-semibold capitalize">
                                  {project.priority || "Medium"}
                                </span>{" "}
                                | Status:{" "}
                                <span
                                  className={`font-semibold ${getProjectStatusColor(
                                    project.status
                                  )}`}
                                >
                                  {project.status}
                                </span>
                              </p>
                              {project.deadline && (
                                <p className="text-slate-500 text-sm mt-1">
                                  Deadline: {formatDate(project.deadline)}
                                </p>
                              )}
                            </div>

                            <div>
                              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <Code className="w-4 h-4 text-green-600" />
                                </div>
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {(project.tags || skills.primary.slice(0, 3)).map(
                                  (tech, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1 bg-white text-slate-700 rounded-lg text-sm font-medium border border-slate-200"
                                    >
                                      {tech}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 pt-8 border-t border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <Award className="w-5 h-5 text-yellow-500" />
                              Project Progress
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm text-slate-600 mb-2">
                                <span>Completion</span>
                                <span className="font-semibold">
                                  {project.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-3">
                                <div
                                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all"
                                  style={{ width: `${project.progress || 0}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Manual Projects: Simple View */
                        <div className="mt-8">
                          <div>
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Code className="w-4 h-4 text-green-600" />
                              </div>
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {(project.tags || skills.primary.slice(0, 3)).map(
                                (tech, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-white text-slate-700 rounded-lg text-sm font-medium border border-slate-200"
                                  >
                                    {tech}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <p>
                  No projects to showcase yet. Start creating amazing projects!
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {isActive("Skills") && (
        <section className="py-20 md:py-24 px-5 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-12 md:mb-16 flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hidden sm:block"></div>
              Hobbies & Technical Skills
            </h2>

            {skills.all && skills.all.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">
                    Hobbies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.primary.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">
                    Other Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.all.slice(0, 10).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {skills.all.length > 10 && (
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                        +{skills.all.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <p>
                  No skills listed yet. Update your profile to showcase your
                  expertise!
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-20 md:py-24 px-5 md:px-8 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 md:mb-12 flex items-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hidden sm:block"></div>
              {section.title}
            </h2>
            <div className="text-base md:text-lg text-slate-700 leading-relaxed font-light">
              <ReadMore text={section.content} limit={300} />
            </div>
          </div>
        </section>
      ))}

      {/* Contact CTA */}
      <section className="py-20 md:py-24 px-5 md:px-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            I'm available for consulting, technical leadership, and exciting new
            projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contact.email}`}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-2xl transition-shadow"
            >
              Schedule a Call
            </a>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 transition-colors">
              Download Resume
            </button>
          </div>
        </div>
      </section>
    </div >
  );
}
