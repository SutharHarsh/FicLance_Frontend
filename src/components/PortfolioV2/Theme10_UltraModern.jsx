"use client";

import React from "react";
import {
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Target,
  Layers,
  Lightbulb,
  Flame,
  Briefcase,
  Trophy,
  Code2,
} from "lucide-react";
import {
  getUserData,
  getProjectsData,
  getSkillsData,
  getContactData,
  getProfessionalData,
  getStatsData,
  formatDate,
  getProjectStatusColor,
  getPortfolioSettings,
  formatExperienceLevel,
  getInitials,
} from "@/utils/portfolioHelpers";

/**
 * THEME 10: ULTRA MODERN
 * Futuristic design with vibrant multi-color gradients and premium animations
 */

const MOCK_DATA = {
  user: {
    name: "Jordan Rivers",
    role: "Creative Technologist",
    tagline: "Crafting digital experiences that inspire and innovate",
    mission: "Where creativity meets technology",
  },
  achievements: [
    {
      icon: <Award className="w-7 h-7" />,
      value: "50+",
      label: "Awards Won",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Users className="w-7 h-7" />,
      value: "2M+",
      label: "Users Impacted",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: <Target className="w-7 h-7" />,
      value: "98%",
      label: "Client Satisfaction",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      value: "350%",
      label: "ROI Delivered",
      color: "from-blue-400 to-cyan-500",
    },
  ],
  featured: [
    {
      title: "AI-Powered Design System",
      subtitle: "Next-generation design tools",
      description:
        "Revolutionary design system powered by machine learning that adapts to user behavior and preferences in real-time.",
      impact: "Reduced design time by 70%",
      metrics: ["10K+ designers", "50+ companies", "1M+ components"],
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    },
    {
      title: "Immersive AR Experience",
      subtitle: "Augmented reality platform",
      description:
        "Created groundbreaking AR platform that blends physical and digital worlds for retail and entertainment industries.",
      impact: "15M+ active users worldwide",
      metrics: ["15M users", "200+ brands", "4.9★ rating"],
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      title: "Global SaaS Platform",
      subtitle: "Enterprise collaboration tool",
      description:
        "Built scalable platform connecting teams across 150 countries with AI-powered productivity features and insights.",
      impact: "$50M ARR in 18 months",
      metrics: ["500K teams", "150 countries", "$50M ARR"],
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    },
  ],
  skills: {
    Creative: [
      "UI/UX Design",
      "Brand Strategy",
      "Visual Design",
      "Motion Graphics",
    ],
    Technical: ["React/Next.js", "Three.js", "WebGL", "TypeScript"],
    Strategy: [
      "Product Design",
      "Design Systems",
      "User Research",
      "A/B Testing",
    ],
    Leadership: [
      "Team Building",
      "Mentorship",
      "Public Speaking",
      "Workshop Facilitation",
    ],
  },
};

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
        className="ml-2 text-xs font-black uppercase tracking-widest text-cyan-400 border-b border-cyan-400/30 hover:border-cyan-400 transition-colors"
      >
        {isExpanded ? "Close" : "Read More"}
      </button>
    </span>
  );
};

export default function UltraModern({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const statsData = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  const displayProjects = projects.slice(0, 3);
  const achievementIcons = [
    <Award className="w-7 h-7" />,
    <Users className="w-7 h-7" />,
    <Target className="w-7 h-7" />,
    <TrendingUp className="w-7 h-7" />,
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section - Ultra Modern with Animated Gradients */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-32 text-center w-full">
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 animate-pulse" />
            <span className="text-[10px] md:text-sm font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-widest">
              Journey from Learner to Leader
            </span>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-pink-400 animate-pulse" />
          </div>

          <h1 className="text-3xl sm:text-8xl md:text-[12rem] font-extrabold mb-8 leading-none tracking-tighter break-words">
            <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              {user.name.split(' ')[0]}
            </div>
            {user.name.split(' ')[1] && (
              <div className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                {user.name.split(' ')[1]}
              </div>
            )}
          </h1>

          <div className="text-lg md:text-4xl font-bold mb-8 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent leading-relaxed max-w-4xl mx-auto">
            <ReadMore text={user.tagline || user.bio} limit={150} />
          </div>

          <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
            <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
            <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-400 shrink-0" />
            <p className="text-sm md:text-lg text-slate-300 font-bold tracking-widest uppercase">{formatExperienceLevel(user.experienceLevel)}</p>
            <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-400 shrink-0" />
            <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20">
            {[
              {
                value: statsData.totalProjects || projects.length,
                label: "Total Projects",
                color: "from-pink-500 to-rose-500",
                icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />,
              },
              {
                value: statsData.completedProjects || "0",
                label: "Completed",
                color: "from-purple-500 to-indigo-500",
                icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
              },
              {
                value: statsData.activeProjects || "0",
                label: "Active",
                color: "from-cyan-500 to-blue-500",
                icon: <Target className="w-5 h-5 md:w-6 md:h-6" />,
              },
              {
                value: `${statsData.skillsCount || 0}+`,
                label: "Skills",
                color: "from-emerald-500 to-teal-500",
                icon: <Code2 className="w-5 h-5 md:w-6 md:h-6" />,
              },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 hover:border-white/30 transition-all hover:scale-[1.02] md:hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 rounded-2xl md:rounded-3xl transition-opacity`}
                ></div>
                <div
                  className={`text-white mb-3 md:mb-4 bg-gradient-to-br ${achievement.color} p-2 md:p-3 rounded-xl md:rounded-2xl inline-block`}
                >
                  {achievement.icon}
                </div>
                <div className="text-xl md:text-4xl font-black text-white mb-1 md:mb-2 truncate">
                  {achievement.value}
                </div>
                <div className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-wider">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-12 md:mt-16 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full text-lg md:text-xl font-black hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            Explore Portfolio
          </button>
        </div>
      </section>

      {/* Featured Projects - Bento Style */}
      {isActive("Projects") && (
        <section id="featured-work" className="py-20 md:py-32 px-5 md:px-8 bg-gradient-to-b from-black via-slate-950 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Layers className="w-6 h-6 md:w-8 md:h-8 text-purple-400 shrink-0" />
                <h2 className="text-3xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight break-words">
                  Featured Work
                </h2>
                <Layers className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 shrink-0" />
              </div>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                Projects that pushed boundaries and delivered exceptional
                results
              </p>
            </div>

            <div className="space-y-8">
              {displayProjects.slice(0, 3).map((project, idx) => {
                const gradients = [
                  "from-pink-500 to-rose-500",
                  "from-purple-500 to-indigo-500",
                  "from-cyan-500 to-blue-500",
                ];
                const gradient = gradients[idx % gradients.length];
                return (
                  <div
                    key={project.id || idx}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 hover:border-white/30 transition-all overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 rounded-[2rem] md:rounded-[3rem] transition-opacity`}
                    ></div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                      <div>
                        <div className="text-xs font-black text-slate-500 mb-3 uppercase tracking-[0.3em]">
                          {project.category || (idx === 0 ? "Featured" : "System")}
                        </div>
                        <h3 className="text-2xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
                          {project.title}
                        </h3>
                        <div className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed italic">
                          <ReadMore text={project.description || "No description available"} limit={150} />
                        </div>

                        {project.status && (
                          <div
                            className={`inline-block px-6 py-3 bg-gradient-to-r ${gradient} rounded-2xl mb-8`}
                          >
                            <p className="text-white font-black text-lg">
                              Status: {project.status}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {project.priority && (
                            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg md:rounded-xl">
                              <span className="text-white font-bold text-xs uppercase tracking-wider">
                                {project.priority}
                              </span>
                            </div>
                          )}
                          {project.progress !== undefined && (
                            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg md:rounded-xl">
                              <span className="text-white font-bold text-xs uppercase tracking-wider">
                                {project.progress}% Complete
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`h-48 md:h-80 bg-gradient-to-br ${gradient} rounded-2xl md:rounded-3xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform shadow-2xl`}
                      >
                        <div className="absolute inset-0 bg-black/20"></div>
                        <Lightbulb className="w-20 h-20 md:w-32 md:h-32 text-white/20" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Skills Matrix */}
      {isActive("Skills") && (
        <section className="py-20 md:py-32 px-5 md:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                Expertise Matrix
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                Multidisciplinary skills across design, technology, and strategy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { category: "Primary", items: skills.primary },
                { category: "Secondary", items: skills.secondary },
                { category: "Tools", items: skills.tools },
                { category: "Languages", items: skills.languages },
              ]
                .map((skillGroup, idx) => {
                  const skillGradients = [
                    "from-pink-500 to-rose-500",
                    "from-purple-500 to-indigo-500",
                    "from-cyan-500 to-blue-500",
                    "from-emerald-500 to-teal-500",
                  ];
                  if (!skillGroup.items || skillGroup.items.length === 0)
                    return null;
                  return (
                    <div
                      key={idx}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all"
                    >
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${skillGradients[idx]} rounded-xl md:rounded-2xl mb-6 flex items-center justify-center shadow-lg`}
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 backdrop-blur-md rounded-lg"></div>
                      </div>
                      <h3 className="text-lg md:text-2xl font-black text-white mb-6 uppercase tracking-wider">
                        {skillGroup.category}
                      </h3>
                      <div className="space-y-3">
                        {skillGroup.items.map((skill, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${skillGradients[idx]}`}
                            ></div>
                            <span className="text-slate-300">
                              {typeof skill === "string" ? skill : skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
                .filter(Boolean)}
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-20 md:py-32 px-5 md:px-8 border-t border-white/10 ${idx % 2 === 0 ? "bg-black" : "bg-slate-950/50"
            }`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-black mb-10 md:mb-12 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight break-words">
              {section.title}
            </h2>
            <div className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
              <ReadMore text={section.content} limit={300} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      {isActive("Contact") && (
        <section className="py-20 md:py-32 px-5 md:px-8 bg-gradient-to-b from-black to-slate-950">
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Create Magic?
                </span>
              </h2>
              <div className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                <ReadMore text="Let's collaborate on your next groundbreaking project. Together, we'll build something extraordinary that exceeds expectations." limit={100} />
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                <button className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full text-lg md:text-xl font-black hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105">
                  Start a Project
                </button>
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="w-full md:w-auto px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-full text-lg md:text-xl font-black hover:bg-white/20 transition-all text-center">
                    Get In Touch
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Animated Gradient Keyframes */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
