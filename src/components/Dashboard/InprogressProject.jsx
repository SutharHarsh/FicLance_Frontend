"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useProjectStore from "@/store/useProjectStore";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { RiArrowRightLine, RiSearchLine } from "react-icons/ri";

const InprogressProject = () => {
  const { user } = useAuth();
  const { inProgress: projects, fetchInProgress, loading } = useProjectStore();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    if (user?.email) {
      fetchInProgress();
    }
  }, [user?.email, fetchInProgress]);

  useEffect(() => {
    // Filter projects based on search query
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          (project.title || project.projectName)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.description || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
    // Reset display count when search changes
    setDisplayCount(4);
  }, [searchQuery, projects]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 4, filteredProjects.length));
  };

  if (loading && projects.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            In Progress Projects
          </h2>
          <p className="text-sm text-low-foreground mt-1">
            Manage your active projects and track progress
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <RiSearchLine className="absolute left-3.5 top-3 text-low-foreground w-4 h-4" />
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredProjects.slice(0, displayCount).map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title || project.projectName}
                description={project.description}
                priority={project.priority || "Medium"}
                progress={project.progress || 0}
                dueDate={project.dueDate || "Ongoing"}
                icon={project.icon} // Pass icon if available in project data
              />
            ))}
          </div>

          {filteredProjects.length > displayCount && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium rounded-xl transition-all"
              >
                Load More Projects
                <RiArrowRightLine className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-secondary/20 rounded-2xl border border-dashed border-border_a">
          <p className="text-low-foreground">
            {searchQuery
              ? "No projects match your search"
              : "No active projects found"}
          </p>
          {!searchQuery && (
            <Link
              href="/dashboard/new-project"
              className="inline-flex mt-4 items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start New Project
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default InprogressProject;
