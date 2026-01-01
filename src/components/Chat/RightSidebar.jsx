"use client";

import React from "react";
import ProjectDetails from "./ProjectDetails";

export default function RightSidebar({
  showProjectDetails,
  setShowProjectDetails,
  completionPercentage,
  projectState,
  dueDate,
  projectDescription,
  techStack,
  difficulty,
  deadline,
  isLoading = false,
}) {
  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`
          fixed lg:relative right-0 top-0 bottom-0 z-40
          bg-card border-l border-border
          overflow-hidden transition-all duration-300 ease-in-out
          ${showProjectDetails ? "w-full sm:w-96 lg:w-80 translate-x-0" : "w-0 translate-x-full lg:translate-x-0 lg:w-0"}
          ${showProjectDetails ? "block" : "hidden lg:block"}
        `}
      >
        <ProjectDetails
          isOpen={showProjectDetails}
          onClose={() => setShowProjectDetails(false)}
          completionPercentage={completionPercentage}
          projectState={projectState}
          dueDate={dueDate}
          projectDescription={projectDescription}
          techStack={techStack}
          difficulty={difficulty}
          deadline={deadline}
          isLoading={isLoading}
        />
      </div>

      {/* Mobile/Tablet Overlay */}
      {showProjectDetails && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowProjectDetails(false)}
        ></div>
      )}
    </>
  );
}
