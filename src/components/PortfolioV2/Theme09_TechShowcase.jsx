"use client";

import React from "react";
import {
  Terminal,
  Cpu,
  Zap,
  Code2,
  Database,
  Cloud,
  Shield,
  Rocket,
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
  getStatusColor,
} from "@/utils/portfolioHelpers";

/**
 * THEME 09: TECH SHOWCASE
 * Technical excellence with modern cyberpunk aesthetics
 */

const MOCK_DATA = {
  user: {
    name: "Alex Chen",
    role: "Senior Software Engineer",
    tagline: "Building high-performance systems that scale",
    specialization: "Cloud Architecture & Distributed Systems",
  },
  stats: [
    {
      icon: <Cpu className="w-6 h-6" />,
      value: "99.99%",
      label: "System Uptime",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: "<50ms",
      label: "Avg Response Time",
    },
    {
      icon: <Database className="w-6 h-6" />,
      value: "10M+",
      label: "Records/Day",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      value: "$2M",
      label: "Cost Savings",
    },
  ],
  expertise: [
    {
      name: "Backend Engineering",
      level: 95,
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Cloud Architecture",
      level: 90,
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "DevOps & CI/CD",
      level: 85,
      color: "from-indigo-500 to-purple-500",
    },
    { name: "System Design", level: 92, color: "from-purple-500 to-pink-500" },
    {
      name: "Frontend Development",
      level: 80,
      color: "from-pink-500 to-red-500",
    },
  ],
  projects: [
    {
      name: "Distributed Message Queue",
      description:
        "Built high-throughput message queue handling 1M+ messages/second",
      tech: ["Go", "Redis", "Kafka", "Kubernetes"],
      metrics: {
        throughput: "1M+ msg/s",
        latency: "5ms p99",
        uptime: "99.99%",
      },
      highlights: [
        "Handles 1M+ messages/second with <5ms latency",
        "Auto-scaling across 50+ nodes",
        "Zero message loss with at-least-once delivery",
      ],
    },
    {
      name: "Real-Time Analytics Engine",
      description:
        "Stream processing platform for real-time business intelligence",
      tech: ["Apache Flink", "PostgreSQL", "TimescaleDB", "React"],
      metrics: { events: "10M/day", queries: "<100ms", users: "5K+" },
      highlights: [
        "Processes 10M events daily in real-time",
        "Sub-100ms query performance on hot data",
        "Reduced infrastructure costs by 60%",
      ],
    },
    {
      name: "Microservices Platform",
      description: "Cloud-native platform serving 5M+ daily active users",
      tech: ["Node.js", "Docker", "AWS", "MongoDB"],
      metrics: { users: "5M DAU", services: "50+", deployment: "30/day" },
      highlights: [
        "50+ microservices deployed via GitOps",
        "30+ deployments/day with zero downtime",
        "Scaled from 100K to 5M users in 12 months",
      ],
    },
  ],
  techStack: {
    languages: ["Go", "Python", "JavaScript/TypeScript", "Rust", "SQL"],
    backend: ["Node.js", "FastAPI", "gRPC", "GraphQL", "Microservices"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra"],
    cloud: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    monitoring: ["Prometheus", "Grafana", "DataDog", "Sentry", "ELK Stack"],
  },
};

export default function TechShowcase({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const statsData = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  const displayProjects = projects.slice(0, 3);
  const techIcons = [
    <Cpu className="w-6 h-6" />,
    <Zap className="w-6 h-6" />,
    <Database className="w-6 h-6" />,
    <Cloud className="w-6 h-6" />,
  ];

  const heroStats = [
    {
      icon: <Cpu className="w-6 h-6" />,
      value: `${statsData.totalProjects || 0}`,
      label: "Total Projects",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: `${statsData.completedProjects || 0}`,
      label: "Completed",
    },
    {
      icon: <Database className="w-6 h-6" />,
      value: `${statsData.activeProjects || 0}`,
      label: "Active",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      value: `${statsData.skillsCount || 0}+`,
      label: "Skills",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section - Cyberpunk Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-slate-950"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 w-full">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-sm">
              $ system.status --active
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent break-words leading-[0.9]">
            {user.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
              <p className="text-xl font-bold text-cyan-300">{formatExperienceLevel(user.experienceLevel)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400">
                {professional.availability ? `${professional.availability} Hr/Week` : "Available for hire"}
              </span>
            </div>
          </div>

          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mb-12 font-medium">
            {user.tagline || user.bio}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {heroStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-4 md:p-6 hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-cyan-400 mb-3">{stat.icon}</div>
                <div className="text-xl md:text-3xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Cyberpunk Skill Matrix */}
      {isActive("Skills") && (
        <section className="py-32 px-8 bg-slate-900/50 border-y border-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                  <Code2 className="w-10 h-10 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Expertise <span className="text-cyan-400">Matrix</span>
                  </h2>
                  <p className="text-slate-400 font-mono text-sm mt-2 font-bold uppercase tracking-widest">
                    System Core Competencies // Level: {formatExperienceLevel(user.experienceLevel)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/60 bg-cyan-500/5 px-4 py-2 border border-cyan-500/10 rounded-full">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                SCANNING_SKILL_SET_...
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.primary.map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 overflow-hidden shadow-2xl"
                >
                  {/* Cyberpunk Decorative Corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-800 group-hover:border-cyan-400 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-800 group-hover:border-cyan-400 transition-colors"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>

                  {/* Skill Content */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h4 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {skill}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-tighter">
                        Module_{idx.toString().padStart(2, '0')} // Stable
                      </p>
                    </div>
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/10 animate-pulse group-hover:bg-cyan-500/20"></div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-1 bg-slate-800 w-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 group-hover:animate-shimmer shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-1000"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-slate-400 uppercase">Status: Primary</span>
                      <span className="text-cyan-400 uppercase">Rank: Expert</span>
                    </div>
                  </div>

                  {/* Matrix Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </section>
      )}

      {/* Projects Showcase */}
      {isActive("Projects") && (
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <Rocket className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl md:text-5xl font-black text-white">
                Featured Projects
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {displayProjects.map((project, idx) => (
                <div
                  key={project.id || idx}
                  className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-6 md:p-8 hover:border-cyan-500/40 transition-all hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  <h3 className="text-2xl font-black text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6 p-4 bg-slate-800/50 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-black text-cyan-400">
                        {project.progress}%
                      </div>
                      <div className="text-xs text-slate-400 capitalize">
                        Progress
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-cyan-400">
                        {project.priority}
                      </div>
                      <div className="text-xs text-slate-400 capitalize">
                        Priority
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-cyan-400">
                        {project.status}
                      </div>
                      <div className="text-xs text-slate-400 capitalize">
                        Status
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>Created: {formatDate(project.createdAt)}</span>
                    </div>
                    {project.description && (
                      <div className="flex items-start gap-2 text-sm text-slate-300">
                        <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span>Status: {project.status}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(project.tags || skills.primary.slice(0, 3)).map(
                      (tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-lg text-xs font-bold border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {isActive("Skills") && (
        <section className="py-32 px-8 bg-slate-900/50 border-t border-cyan-500/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <Shield className="w-10 h-10 text-cyan-400" />
              <h2 className="text-3xl md:text-5xl font-black text-white">Tech Stack</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-black text-cyan-400 mb-4 capitalize">
                  Primary Skills
                </h3>
                <div className="space-y-2">
                  {skills.primary.map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {skills.secondary && skills.secondary.length > 0 && (
                <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-black text-cyan-400 mb-4 capitalize">
                    Secondary Skills
                  </h3>
                  <div className="space-y-2">
                    {skills.secondary.map((tech, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span className="text-slate-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-black text-cyan-400 mb-4 capitalize">
                  All Technologies
                </h3>
                <div className="space-y-2">
                  {skills.all.slice(0, 8).map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-32 px-8 ${idx % 2 === 0 ? "bg-slate-950" : "bg-slate-900/30"
            } border-t border-cyan-500/10`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-2 h-12 bg-cyan-500 rounded-full"></div>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                {section.title}
              </h2>
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

      {/* CTA */}
      {isActive("Contact") && (
        <section className="py-24 px-8 border-t border-cyan-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent break-words">
              Let's Build Something Incredible
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              {user.tagline ||
                user.bio ||
                "I'm always interested in challenging technical problems and innovative projects."}
            </p>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-block px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                Get In Touch →
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
