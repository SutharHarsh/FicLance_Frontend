"use client";
import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import PortfolioSkillBadges from "./PortfolioSkillBadges";
import api from "@/lib/api";
import { toast } from "sonner";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

/**
 * Portfolio Variation 4 - Minimalist
 * Features: Clean typography, maximum whitespace, monochrome with blue accents
 */
const PortfolioMinimalist = () => {
  const { profile, isLoading: profileLoading } = useProfile();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/portfolio");
        if (res.data.success) {
          const mapped = res.data.data.items.map((item) => {
            const feedback = item.feedback || {};
            return {
              id: item._id,
              title: item.repoName || "Untitled Project",
              image: item.screenshot || "/images/placeholder-project.jpg",
              alt: item.repoName,
              tags: item.toolchain?.languages || ["Unknown"],
              description:
                item.analysisMeta?.summary ||
                item.description ||
                "Analysis pending...",
              rating: feedback.score || 0,
              githubLink: item.repoUrl,
              status: item.status,
              year: new Date(item.createdAt).getFullYear(),
              feedback: feedback,
            };
          });
          setProjects(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio", error);
        toast.error("Could not load portfolio projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (profileLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm uppercase tracking-wider">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimalist Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              {profile?.name || profile?.username || "Portfolio"}
            </h1>
            {profile?.username && (
              <p className="text-lg text-gray-500 mb-8 font-light">
                @{profile.username}
              </p>
            )}
            {profile?.bio && (
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl font-light mb-8">
                {profile.bio}
              </p>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-t border-b border-gray-100 py-8">
              {profile?.experienceLevel && (
                <div>
                  <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Level
                  </span>
                  <span className="text-lg text-gray-900 capitalize">
                    {profile.experienceLevel}
                  </span>
                </div>
              )}
              {profile?.careerGoal && (
                <div>
                  <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Focus
                  </span>
                  <span className="text-lg text-gray-900 capitalize">
                    {profile.careerGoal}
                  </span>
                </div>
              )}
              {profile?.availability?.hoursPerWeek && (
                <div>
                  <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Availability
                  </span>
                  <span className="text-lg text-gray-900">
                    {profile.availability.hoursPerWeek}h/week
                  </span>
                </div>
              )}
              <div>
                <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                  Projects
                </span>
                <span className="text-lg text-gray-900">{projects.length}</span>
              </div>
            </div>

            {/* Inline Contact Links */}
            <div className="flex flex-wrap gap-8 text-sm">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="border-b border-transparent group-hover:border-blue-600">
                    Email
                  </span>
                </a>
              )}
              {profile?.portfolioLinks?.github && (
                <a
                  href={profile.portfolioLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="border-b border-transparent group-hover:border-blue-600">
                    GitHub
                  </span>
                </a>
              )}
              {profile?.portfolioLinks?.linkedin && (
                <a
                  href={profile.portfolioLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="border-b border-transparent group-hover:border-blue-600">
                    LinkedIn
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <section className="py-20 border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 font-medium">
                    Expertise
                  </h2>
                  <PortfolioSkillBadges
                    skills={profile.skills}
                    theme="minimalist"
                    maxDisplay={20}
                  />
                </div>
                {profile?.preferredTechStack &&
                  profile.preferredTechStack.length > 0 && (
                    <div>
                      <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 font-medium">
                        Preferred Stack
                      </h2>
                      <PortfolioSkillBadges
                        skills={profile.preferredTechStack}
                        theme="minimalist"
                        maxDisplay={10}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section - List Format */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-12 font-medium">
              Selected Work
            </h2>

            {projects.length > 0 ? (
              <div className="space-y-12">
                {projects.map((project, index) => (
                  <article
                    key={project.id}
                    className="group border-b border-gray-200 pb-12 last:border-0"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-light text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                          {project.year}
                        </p>
                      </div>
                      <span className="text-5xl font-light text-gray-200 group-hover:text-gray-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 font-light max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-gray-500 font-light tracking-wide"
                        >
                          {tag}
                          {idx < project.tags.length - 1 && " ·"}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-6">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <span className="border-b border-transparent group-hover:border-blue-600">
                          View on GitHub
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setIsModalOpen(true);
                        }}
                        className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <span className="border-b border-transparent group-hover:border-blue-600">
                          Case Study
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  No projects available
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default PortfolioMinimalist;
