"use client";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { Plus, Award, RefreshCw } from "lucide-react";

// Skeleton Loading Component
const SkeletonProjectCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col animate-pulse">
    {/* Image Skeleton */}
    <div className="h-48 bg-gray-200 w-full shrink-0 relative">
      <div className="absolute top-3 right-3 w-16 h-6 bg-gray-300 rounded-full"></div>
      <div className="absolute bottom-3 left-3 w-20 h-6 bg-gray-300 rounded-full"></div>
    </div>

    {/* Content Skeleton */}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      <div className="mt-auto space-y-4">
        {/* Rating */}
        <div className="h-4 bg-gray-200 rounded w-24"></div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function PortfolioDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);

  // Analyse Form State
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // New state for processing

  // Fetch Projects
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get("/portfolio");
      if (res.data.success) {
        // Map backend data to frontend model
        const mapped = res.data.data.items.map(mapPortfolioToCard);
        setProjects(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
      toast.error("Could not load your portfolio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPortfolio();
    }
  }, [user]);

  // Socket.IO for Real-time Updates
  useEffect(() => {
    if (!user) return;

    let socketUrl = "http://localhost:3000";
    try {
      if (
        process.env.NEXT_PUBLIC_API_URL &&
        process.env.NEXT_PUBLIC_API_URL.trim() !== ""
      ) {
        socketUrl = new URL(process.env.NEXT_PUBLIC_API_URL).origin;
      }
    } catch (error) {
      console.warn("Invalid NEXT_PUBLIC_API_URL, using localhost:", error);
    }

    const socket = io(socketUrl, {
      path: "/socket.io",
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      socket.emit("join_room", `user:${user.id || user._id}`); // Ideally listen to user specific channel
      // The backend emits to `user:${userId}` in agentProcessor
    });

    socket.on("portfolio:analyzed", (data) => {
      // If we were waiting for analysis, close modal and stop loading
      if (isAnalyzing) {
        setIsAnalyzing(false);
        setIsAnalyzeModalOpen(false);
        setRepoUrl("");
      }

      // Refresh list or update specific item
      toast.success("Analysis Completed: " + data.portfolio.repoName);
      fetchPortfolio();
    });

    return () => socket.disconnect();
  }, [user, isAnalyzing]); // Add isAnalyzing to dependency to ensure state context

  const mapPortfolioToCard = (item) => {
    // Map backend Portfolio model to ProjectCard props
    // item.feedbackId (if popluated) would have score, etc.
    // For now we assume some basic mapping

    // We might need to fetch feedback details if not populated
    // but list endpoint usually returns lean data.

    // Mocking some data if missing, or using real data
    const feedback = item.feedback || {}; // If backend populated it, or we fetched it

    return {
      id: item._id,
      title: item.repoName || "Untitled Project",
      image: item.screenshot || "/images/placeholder-project.jpg", // We don't have screenshots yet, use placeholder
      alt: item.repoName,
      tags: item.toolchain?.languages || ["Unknown"], // Or parse analysisMeta
      description:
        item.analysisMeta?.summary ||
        item.description ||
        "Portfolio Analysis pending...",
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
      // Pass raw data for Modal
      feedback: feedback,
    };
  };

  const handleAnalyzeSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl) return;

    setIsSubmitting(true);
    try {
      const res = await api.post("/portfolio/analyze", {
        repoUrl,
        branch,
      });

      if (res.data.success) {
        // CRITICAL CHANGE: Don't close modal, show analyzing state
        setIsAnalyzing(true);
        // toast.success("Analysis queued successfully!"); // Removed to avoid confusion
      }
    } catch (error) {
      console.error(error);
      // Improve error message handling
      const message =
        error.response?.data?.message || "Failed to submit analysis";
      const details = error.response?.data?.details; // Assuming backend sends details for validation errors

      if (details) {
        toast.error(`${message}: ${JSON.stringify(details)}`);
      } else {
        toast.error(message);
      }
      setIsAnalyzing(false); // Reset on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaseStudyClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const currentProjects = projects; // Add pagination later if needed

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Portfolio Manager
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Your Projects</h2>
          </div>

          <button
            onClick={() => setIsAnalyzeModalOpen(true)}
            className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Analyze New Repo
          </button>
        </div>

        {/* Loading / Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            // Show Skeletons
            [...Array(6)].map((_, i) => <SkeletonProjectCard key={i} />)
          ) : projects.length > 0 ? (
            // Show Projects
            currentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onCaseStudyClick={handleCaseStudyClick}
              />
            ))
          ) : (
            // Show Empty State (only if not loading and no projects)
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-500 mb-6">
                Import a GitHub repository to get an AI-powered analysis.
              </p>
              <button
                onClick={() => setIsAnalyzeModalOpen(true)}
                className="text-blue-600 font-medium hover:underline"
              >
                Start your first analysis
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Modal */}
      {isAnalyzeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Prevent closing if analyzing */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isAnalyzing && setIsAnalyzeModalOpen(false)}
          />
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md z-10 relative">
            <h3 className="text-2xl font-bold mb-4">Analyze Repository</h3>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="relative">
                  <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Analyzing Repository...
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 max-w-xs">
                    Our AI agents are reviewing your code, generating feedback,
                    and rating your project. This may take a few moments.
                  </p>
                </div>
                <div className="flex gap-1 text-blue-500 mt-2">
                  <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-current animate-bounce"></span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAnalyzeSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://github.com/username/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="main"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAnalyzeModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    )}
                    {isSubmitting ? "Queueing..." : "Start Analysis"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}
