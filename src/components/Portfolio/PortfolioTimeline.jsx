"use client";
import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import PortfolioSkillBadges from "./PortfolioSkillBadges";
import api from "@/lib/api";
import { toast } from "sonner";
import { Calendar, Award, Mail, ExternalLink } from "lucide-react";

/**
 * Portfolio Variation 2 - Timeline Style
 * Features: Chronological timeline, alternating cards, connecting lines
 */
const PortfolioTimeline = () => {
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
          setProjects(mapped.sort((a, b) => b.year - a.year)); // Sort by year
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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-700">Loading timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-green-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30">
              <img
                src={
                  profile?.customAvatar ||
                  profile?.image ||
                  "/default-avatar.png"
                }
                alt={profile?.name || "User"}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <h1 className="text-5xl font-bold mb-4">
              {profile?.name || profile?.username || "My Journey"}
            </h1>
            {profile?.bio && (
              <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
                {profile.bio}
              </p>
            )}

            {/* Stats Grid - Timeline Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              {profile?.experienceLevel && (
                <div>
                  <span className="block text-xs uppercase tracking-widest text-teal-200 mb-1">
                    Level
                  </span>
                  <span className="text-lg font-bold text-white capitalize">
                    {profile.experienceLevel}
                  </span>
                </div>
              )}
              {profile?.careerGoal && (
                <div>
                  <span className="block text-xs uppercase tracking-widest text-teal-200 mb-1">
                    Focus
                  </span>
                  <span className="text-lg font-bold text-white capitalize">
                    {profile.careerGoal}
                  </span>
                </div>
              )}
              {profile?.availability?.hoursPerWeek && (
                <div>
                  <span className="block text-xs uppercase tracking-widest text-teal-200 mb-1">
                    Availability
                  </span>
                  <span className="text-lg font-bold text-white">
                    {profile.availability.hoursPerWeek}h/week
                  </span>
                </div>
              )}
              <div>
                <span className="block text-xs uppercase tracking-widest text-teal-200 mb-1">
                  Projects
                </span>
                <span className="text-lg font-bold text-white">
                  {projects.length}
                </span>
              </div>
            </div>

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all shadow-lg"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills & Stack Section */}
      {(profile?.skills || profile?.preferredTechStack) && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {profile?.skills && profile.skills.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center">
                    Skills & Expertise
                  </h2>
                  <div className="flex justify-center">
                    <PortfolioSkillBadges
                      skills={profile.skills}
                      theme="timeline"
                      maxDisplay={15}
                    />
                  </div>
                </div>
              )}

              {profile?.preferredTechStack &&
                profile.preferredTechStack.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-teal-800 mb-6 text-center uppercase tracking-wider">
                      Preferred Tech Stack
                    </h3>
                    <div className="flex justify-center">
                      <PortfolioSkillBadges
                        skills={profile.preferredTechStack}
                        theme="timeline"
                        maxDisplay={10}
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full mb-4">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">Project Timeline</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Work History</h2>
            </div>

            {projects.length > 0 ? (
              <div className="relative">
                {/* Center Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-teal-400 to-green-400 h-full hidden md:block"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      } flex-col gap-8`}
                    >
                      {/* Year Badge (center on desktop) */}
                      <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Project Card */}
                      <div className="w-full md:w-5/12">
                        <div className="transform hover:scale-105 transition-all duration-300">
                          <ProjectCard
                            project={project}
                            onCaseStudyClick={(proj) => {
                              setSelectedProject(proj);
                              setIsModalOpen(true);
                            }}
                          />
                        </div>
                      </div>

                      {/* Spacer for other side */}
                      <div className="hidden md:block w-5/12"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600">
                  No projects in timeline yet
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

export default PortfolioTimeline;
