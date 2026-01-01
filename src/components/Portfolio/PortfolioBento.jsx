"use client";
import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import PortfolioSkillBadges from "./PortfolioSkillBadges";
import api from "@/lib/api";
import { toast } from "sonner";
import { Boxes, Mail, Github, Star, Code2 } from "lucide-react";

/**
 * Portfolio Variation 3 - Bento Box Layout
 * Features: Asymmetric grid, various card sizes, warm color palette
 */
const PortfolioBento = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Boxes className="w-16 h-16 text-orange-600 mx-auto mb-4 animate-spin" />
          <p className="text-orange-700 font-semibold">Loading bento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Compact Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Bento Grid for Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
              {/* Profile Card - Larger */}
              <div className="md:col-span-7 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-start gap-6">
                  <img
                    src={
                      profile?.customAvatar ||
                      profile?.image ||
                      "/default-avatar.png"
                    }
                    alt={profile?.name || "User"}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-lg"
                  />
                  <div>
                    <h1 className="text-4xl font-black mb-2">
                      {profile?.name || profile?.username || "Portfolio"}
                    </h1>
                    {profile?.username && (
                      <p className="text-orange-100 text-lg mb-4">
                        @{profile.username}
                      </p>
                    )}
                    {profile?.bio && (
                      <p className="text-white/90 leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Card - Smaller */}
              <div className="md:col-span-5 bg-white rounded-3xl p-6 shadow-xl border-2 border-orange-200 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-600" />
                  Get in Touch
                </h3>
                <div className="space-y-3">
                  {profile?.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="block px-4 py-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl font-semibold transition-all text-center border-2 border-orange-200"
                    >
                      Email Me
                    </a>
                  )}
                  {profile?.portfolioLinks?.github && (
                    <a
                      href={profile.portfolioLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all text-center"
                    >
                      <Github className="w-4 h-4 inline mr-2" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* NEW ROW: Stats & Preferred Stack */}
              <div className="md:col-span-5 bg-amber-100 rounded-3xl p-8 shadow-xl border-2 border-amber-200 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">
                  At a Glance
                </h3>
                <div className="space-y-4">
                  {profile?.experienceLevel && (
                    <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-amber-200">
                      <span className="text-gray-600 font-medium">Level</span>
                      <span className="font-bold text-gray-900 capitalize">
                        {profile.experienceLevel}
                      </span>
                    </div>
                  )}
                  {profile?.careerGoal && (
                    <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-amber-200">
                      <span className="text-gray-600 font-medium">Focus</span>
                      <span className="font-bold text-gray-900 capitalize">
                        {profile.careerGoal}
                      </span>
                    </div>
                  )}
                  {profile?.availability?.hoursPerWeek && (
                    <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-amber-200">
                      <span className="text-gray-600 font-medium">
                        Availability
                      </span>
                      <span className="font-bold text-gray-900">
                        {profile.availability.hoursPerWeek}h/w
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-amber-200">
                    <span className="text-gray-600 font-medium">Projects</span>
                    <span className="font-bold text-gray-900">
                      {projects.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-100">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <h2 className="text-2xl font-black text-gray-900">
                    Preferred Stack
                  </h2>
                </div>
                {profile?.preferredTechStack &&
                profile.preferredTechStack.length > 0 ? (
                  <PortfolioSkillBadges
                    skills={profile.preferredTechStack}
                    theme="bento"
                    maxDisplay={10}
                  />
                ) : (
                  <p className="text-gray-400 italic">
                    No preferred stack listed.
                  </p>
                )}
              </div>

              {/* Skills Card - Wide */}
              {profile?.skills && profile.skills.length > 0 && (
                <div className="md:col-span-12 bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-200">
                  <div className="flex items-center gap-2 mb-6">
                    <Code2 className="w-6 h-6 text-orange-600" />
                    <h2 className="text-2xl font-black text-gray-900">
                      Tech Stack
                    </h2>
                  </div>
                  <PortfolioSkillBadges
                    skills={profile.skills}
                    theme="bento"
                    maxDisplay={20}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Bento Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-black text-gray-900">
                Featured Projects
              </h2>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`transform hover:scale-105 transition-all duration-300 ${
                      index === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
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
              <div className="bg-white rounded-3xl p-20 text-center shadow-xl border-2 border-dashed border-orange-200">
                <Boxes className="w-16 h-16 text-orange-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600 font-semibold">
                  No projects to display
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

export default PortfolioBento;
