"use client";

import { useEffect, useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaCode, FaPlay } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProjectSection({
  filters = null,
  templates = [],
  isLoading: parentLoading = false,
}) {
  const router = useRouter();
  const { user } = useAuth(); // Switch to useAuth
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  // Internal loading state for simulation start/filtering
  const [isInternalLoading, setIsInternalLoading] = useState(false);

  const isLoading = parentLoading || isInternalLoading;

  // Map backend templates to frontend ProjectsData structure
  const mappedTemplates = useMemo(() => {
    if (!templates || templates.length === 0) {
      return [];
    }

    return templates.map((t, index) => {
      // Handle mapping
      const difficultyLevelMap = {
        beginner: 2,
        intermediate: 3,
        advanced: 5,
        Beginner: 2,
        Intermediate: 3,
        Advanced: 5,
      };

      // Assign random gradient or deterministically based on index if not in DB
      const gradients = [
        "from-blue-500 via-blue-600 to-indigo-600",
        "from-purple-500 via-purple-600 to-pink-500",
        "from-green-500 via-emerald-500 to-teal-500",
        "from-yellow-400 via-orange-400 to-orange-500",
        "from-red-500 via-rose-500 to-pink-500",
      ];

      // Normalize difficulty string for display
      const displayDifficulty =
        t.difficulty || t.expertiseLevel || "Intermediate";
      const normalizedDifficulty =
        displayDifficulty.charAt(0).toUpperCase() +
        displayDifficulty.slice(1).toLowerCase();

      return {
        id: t._id || t.id, // Support MongoDB _id
        title: t.name || t.title || "Untitled Project",
        description:
          t.shortDescription || t.description || "No description available",
        duration:
          t.duration ||
          (t.durationEstimateDays
            ? `${t.durationEstimateDays} days`
            : "3-5 days"),
        difficulty: normalizedDifficulty,
        difficultyLevel:
          difficultyLevelMap[t.difficulty] ||
          difficultyLevelMap[t.expertiseLevel] ||
          3,
        technologies: Array.isArray(t.requiredSkills)
          ? t.requiredSkills
          : Array.isArray(t.technologies)
          ? t.technologies
          : [],
        gradientColors: gradients[index % gradients.length],
      };
    });
  }, [templates]);

  // combine lists (using mapped templates now)
  const allProjects = mappedTemplates;

  // Show loading when filters change
  useEffect(() => {
    if (filters) {
      setIsFiltering(true);
      const timer = setTimeout(() => setIsFiltering(false), 600);
      return () => clearTimeout(timer);
    }
  }, [filters]);
  // const result = showAllProjects ? allProjects : allProjects.slice(0, 6);
  //     console.log('[ProjectSection] 🎯 filteredProjects calculated:', result.length, 'projects (showAll:', showAllProjects, ')');
  //     return result
  // compute displayed projects based on backend templates
  // Backend already handles filtering, so we just control pagination here
  const filteredProjects = useMemo(() => {
    // Ensure allProjects is an array
    if (!Array.isArray(allProjects)) {
      console.error(
        "[ProjectSection] allProjects is not an array:",
        typeof allProjects
      );
      return [];
    }
    // Show all projects or limit to 6 based on showAllProjects state
    return showAllProjects ? allProjects : allProjects.slice(0, 6);
  }, [showAllProjects, allProjects]);

  console.log(filteredProjects);

  useEffect(() => {
    // if filters change, reset selectedProject (optional)
    setSelectedProject((prev) => {
      if (!prev) return null;
      const stillExists = filteredProjects.some((p) => p.id === prev);
      return stillExists ? prev : null;
    });
  }, [filters]); // eslint-disable-line

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleLoadMore = () => {
    setShowAllProjects(true);
  };

  const handleStartSimulation = async () => {
    if (!selectedProject) return;
    if (!user) {
      alert("Please sign in to start a simulation.");
      return;
    }

    const project = allProjects.find((p) => p.id === selectedProject);

    // ✅ Store project data in sessionStorage for destination page
    const projectData = {
      Expertise: filters?.difficulty || project.difficulty || "Intermediate",
      TechStack: filters?.skills || project.technologies || [],
      Duration: filters?.duration || project.duration || "3-5 days",
      ProjectName: project.title,
      Description: project.description,
      projectId: project.id,
      userId: user.email,
    };

    sessionStorage.setItem("pendingProject", JSON.stringify(projectData));

    // ✅ NAVIGATE IMMEDIATELY - No blocking!
    router.push("/chat/new");

    // Note: The /chat/new page will handle the async operations
    // and redirect to the actual conversation ID
  };

  return (
    <section className="py-10 m-8 rounded-2xl pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {isLoading ? (
          <div className="col-span-full text-center text-gray-500 py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading projects...</p>
          </div>
        ) : Array.isArray(filteredProjects) && filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              duration={project.duration}
              difficulty={project.difficulty}
              difficultyLevel={project.difficultyLevel}
              technologies={project.technologies}
              gradientColors={project.gradientColors}
              isSelected={selectedProject === project.id}
              onSelect={handleProjectSelect}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No projects match your filters.
          </div>
        )}
      </div>

      {/* Load More Button */}
      {!showAllProjects && filteredProjects.length > 6 && (
        <div className="flex justify-center">
          <button
            className="group flex items-center gap-2 px-6 py-3 text-blue-600 font-medium hover:text-white bg-blue-50 hover:bg-blue-600 rounded-full border border-blue-200 hover:border-blue-600 transition-all duration-300 shadow-sm"
            onClick={handleLoadMore}
          >
            <span>Load More Projects</span>
            <MdKeyboardArrowDown className="text-lg group-hover:translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      )}

      {/* Selected Project Summary Bar */}
      {selectedProject && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] z-50 bg-white border border-gray-300 shadow-2xl rounded-2xl px-6 py-4 backdrop-blur-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Code Icon + Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 min-w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <FaCode className="text-white text-lg" />
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                  {allProjects.find((p) => p.id === selectedProject)?.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {
                    allProjects.find((p) => p.id === selectedProject)
                      ?.difficulty
                  }{" "}
                  •{" "}
                  {allProjects.find((p) => p.id === selectedProject)?.duration}
                </p>
              </div>
            </div>

            {/* CTA Button with Play Icon */}
            <button
              className={`group inline-flex items-center gap-2 px-6 py-2 text-white 
             text-sm sm:text-base font-semibold rounded-full 
             transition duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed
             ${isLoading ? "bg-gray-500" : "bg-[#2D3047] hover:bg-[#1f2235]"}`}
              onClick={handleStartSimulation}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Initializing Simulation...</span>
                </div>
              ) : (
                <>
                  <FaPlay className="text-xs group-hover:scale-110 transition-transform duration-200" />
                  Start Simulating
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Full screen loading overlay for better feedback */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-small">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              Setting up your workspace...
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Connecting to AI agents and preparing requirements.
            </p>
          </div>
        </div>
      )}

      {/* Filter loading popup */}
      {isFiltering && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-700">
              Filtering projects...
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
