"use client";
import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import PortfolioSkillBadges from "./PortfolioSkillBadges";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  Award,
  Code,
  Target,
  Briefcase,
} from "lucide-react";

/**
 * Main Portfolio Component - Default View
 * Displays user profile, skills, and project portfolio
 */
const PortfolioMain = ({ initialData = null }) => {
  const { profile: userProfile, isLoading: profileLoading } = useProfile();

  // Use initialData if provided (public view), otherwise use authenticated profile
  const profile = initialData?.profile || userProfile;
  const isLoading = initialData ? false : profileLoading;

  const [projects, setProjects] = useState(initialData?.projects || []);
  const [loading, setLoading] = useState(!initialData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch portfolio projects only if not provided via initialData
  useEffect(() => {
    if (initialData) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/portfolio");
        if (res.data.success) {
          const mapped = res.data.data.items.map(mapPortfolioToCard);
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

  // Map backend portfolio data to project card format
  const mapPortfolioToCard = (item) => {
    const feedback = item.feedback || {};
    return {
      id: item._id,
      title: item.repoName || "Untitled Project",
      image: item.screenshot || "/images/placeholder-project.jpg",
      alt: item.repoName,
      tags: item.toolchain?.languages || ["Unknown"],
      description:
        item.analysisMeta?.summary || item.description || "Analysis pending...",
      rating: feedback.score || 0,
      duration: "Unknown",
      teamSize: "1",
      views: "0",
      githubLink: item.repoUrl,
      status: item.status,
      category: "Auto-Analyzed",
      year: new Date(item.createdAt).getFullYear(),
      feedbackId: item.feedbackId,
      analysisMetadata: item.analysisMetadata,
      feedback: feedback,
    };
  };

  const handleCaseStudyClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Map manual projects to card format
  const mapManualProjectToCard = (project, index) => ({
    id: `manual-${index}`,
    title: project.name,
    image: "/images/placeholder-project.jpg", // Default placeholder
    alt: project.name,
    tags: project.techStack ? project.techStack.split(",").map(t => t.trim()) : ["Side Project"],
    description: project.description,
    rating: 0, // No rating for manual projects
    duration: "Unknown",
    teamSize: "1",
    views: "0",
    githubLink: project.githubUrl,
    liveLink: project.liveUrl, // Add live link support if ProjectCard supports it
    status: "completed",
    category: "Manual Entry",
    year: new Date().getFullYear(),
    isManual: true,
  });

  // Combine fetched projects with manual projects
  const allProjects = [
    ...(profile?.portfolio?.manualProjects?.map(mapManualProjectToCard) || []),
    ...projects
  ];

  if (profileLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Avatar */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
              <img
                src={
                  profile?.customAvatar ||
                  profile?.image ||
                  "/default-avatar.png"
                }
                alt={profile?.name || "User"}
                className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
              />
            </div>

            {/* Name & Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {profile?.name || "Portfolio"}
            </h1>
            {profile?.username && (
              <p className="text-xl text-gray-600 mb-4">@{profile.username}</p>
            )}

            {/* Bio */}
            {profile?.bio && (
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Contact Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border border-gray-200"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              )}
              {profile?.portfolioLinks?.github && (
                <a
                  href={profile.portfolioLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {profile?.portfolioLinks?.linkedin && (
                <a
                  href={profile.portfolioLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {profile?.portfolioLinks?.website && (
                <a
                  href={profile.portfolioLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
              {/* Custom Links */}
              {profile?.portfolio?.customLinks?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border border-gray-200"
                >
                  <Globe className="w-4 h-4 text-blue-500" />
                  {link.label}
                </a>
              ))}
            </div>

            {/* Career Goal & Experience */}
            <div className="flex flex-wrap justify-center gap-4">
              {profile?.experienceLevel && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {profile.experienceLevel}
                  </span>
                </div>
              )}
              {profile?.careerGoal && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {profile.careerGoal}
                  </span>
                </div>
              )}
              {profile?.availability?.hoursPerWeek && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                  <Briefcase className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {profile.availability.hoursPerWeek}h/week
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section (NEW) */}
      {profile?.portfolio?.experiences && profile.portfolio.experiences.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-6">
                {profile.portfolio.experiences.map((exp, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
                        <p className="text-blue-600 font-medium">{exp.organization}</p>
                      </div>
                      <div className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Technical Skills
                </h2>
              </div>
              <PortfolioSkillBadges
                skills={profile.skills}
                theme="default"
                maxDisplay={15}
              />
            </div>
          </div>
        </section>
      )}

      {/* Preferred Tech Stack */}
      {profile?.preferredTechStack && profile.preferredTechStack.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Preferred Tech Stack
              </h3>
              <PortfolioSkillBadges
                skills={profile.preferredTechStack}
                theme="default"
                maxDisplay={10}
              />
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600">
                Explore my work and technical contributions
              </p>
            </div>

            {allProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onCaseStudyClick={handleCaseStudyClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-500">
                  Add projects manually or complete automated analysis tasks.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Sections (NEW) */}
      {profile?.portfolio?.customSections?.map((section, idx) => (
        <section key={idx} className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {section.title}
              </h2>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 prose prose-lg max-w-none text-slate-700">
                <p className="whitespace-pre-wrap">{section.content}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default PortfolioMain;
