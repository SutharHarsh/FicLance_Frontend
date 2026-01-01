"use client";
import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import PortfolioSkillBadges from "./PortfolioSkillBadges";
import api from "@/lib/api";
import { toast } from "sonner";
import { Sparkles, Mail, Github, Linkedin, Globe } from "lucide-react";

/**
 * Portfolio Variation 1 - Modern Grid
 * Features: Bold typography, vibrant gradients, 3-column grid
 */
const PortfolioModernGrid = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
      {/* Hero Section with Bold Typography */}
      <section className="relative overflow-hidden py-32">
        {/* Animated background blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-75"></div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold">
                Creative Developer
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight">
              {profile?.name || "Portfolio"}
            </h1>

            {profile?.bio && (
              <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                {profile.bio}
              </p>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-purple-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
                >
                  <Mail className="w-5 h-5 inline mr-2" />
                  Get in Touch
                </a>
              )}
              {profile?.portfolioLinks?.github && (
                <a
                  href={profile.portfolioLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/30 transition-all hover:scale-105"
                >
                  <Github className="w-5 h-5 inline mr-2" />
                  GitHub
                </a>
              )}
              {profile?.portfolioLinks?.linkedin && (
                <a
                  href={profile.portfolioLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/30 transition-all hover:scale-105"
                >
                  <Linkedin className="w-5 h-5 inline mr-2" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-12 text-center">
                My Superpowers
              </h2>
              <div className="flex justify-center">
                <PortfolioSkillBadges
                  skills={profile.skills}
                  theme="modern"
                  maxDisplay={18}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-16 text-center">
              Featured Work
            </h2>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <ProjectCard
                      project={project}
                      onCaseStudyClick={(proj) => {
                        setSelectedProject(proj);
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600 font-semibold">
                  No projects yet
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

export default PortfolioModernGrid;
