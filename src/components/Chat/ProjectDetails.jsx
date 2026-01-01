"use client";

import React, { useEffect, useState, useRef } from "react";
import { TfiMenu } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectDetails({
  onClose,
  completionPercentage = 0,
  dueDate = "N/A",
  projectDescription = "",
  techStack = [],
  difficulty = "",
  deadline = null,
  isLoading = false,
  projectState = "created",
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);

  /* 🔥 2 SECOND DELAY HANDLER */
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
        requestAnimationFrame(() => setAnimateIn(true));
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
      setAnimateIn(false);
    }
  }, [isLoading]);

  const computeTimeLeft = (deadlineStr) => {
    if (!deadlineStr) return "No deadline set";
    const deadlineDate = new Date(deadlineStr);
    const now = new Date();
    const diff = deadlineDate - now;
    if (diff <= 0) return "Deadline passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");

    return days > 0 ? `${days}d ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
  };

  useEffect(() => {
    setTimeLeft(computeTimeLeft(deadline));
    if (!deadline) return;

    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  // Check if description needs "Read More" button
  useEffect(() => {
    if (descriptionRef.current && projectDescription) {
      const lineHeight = parseFloat(
        getComputedStyle(descriptionRef.current).lineHeight
      );
      const maxHeight = lineHeight * 3; // 3 lines
      const actualHeight = descriptionRef.current.scrollHeight;
      setShowReadMore(actualHeight > maxHeight);
    }
  }, [projectDescription, animateIn]);

  /* 🔹 SKELETON (2s guaranteed) */
  if (showSkeleton) {
    return (
      <div className="w-full h-full bg-card border-l border-border flex flex-col py-1">
        <div className="p-3 sm:p-4 border-b flex justify-between animate-pulse">
          <div className="h-5 w-32 bg-card-foreground rounded" />
          <div className="lg:hidden w-8 h-8 bg-card-foreground rounded-full" />
        </div>

        <div className="flex-1 p-4 space-y-6 animate-pulse">
          <div>
            <div className="h-4 w-28 bg-card-foreground rounded mb-2" />
            <div className="h-2 bg-card-foreground rounded-full" />
          </div>

          <div className="text-center">
            <div className="h-7 w-32 bg-card-foreground rounded mx-auto" />
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-card-foreground rounded w-full" />
            <div className="h-4 bg-card-foreground rounded w-5/6" />
          </div>

          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-card-foreground rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* 🔹 REAL CONTENT WITH ANIMATION */
  return (
    <div
      className={`
        w-full h-full bg-card border-l border-border flex flex-col py-1
        transition-all duration-300 ease-out
        ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {/* Header */}
      <div className="p-4 sm:p-4 border-b flex justify-between items-center">
        <h3 className="text-xl sm:text-[20px] font-bold text-foreground">
          Project Details
        </h3>
        <button onClick={onClose} className="lg:hidden p-2 rounded-full">
          <RxCross2 size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md sm:text-[15px] font-medium">
              Project Status
            </h4>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                completionPercentage >= 70 || projectState === "completed"
                  ? "bg-green-100 text-green-800"
                  : projectState === "in_progress"
                  ? "bg-blue-100 text-blue-800"
                  : projectState === "requirements_sent"
                  ? "bg-yellow-100 text-yellow-800"
                  : projectState === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {completionPercentage >= 70 || projectState === "completed"
                ? "Completed"
                : projectState === "requirements_sent"
                ? "Requirements Sent"
                : projectState
                    ?.toString()
                    .replace(/_/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase()) || "Created"}
            </span>
          </div>
          <div className="dark:bg-card-foreground bg-foreground/10 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-low-foreground mt-1">
            <span>{completionPercentage}% Complete</span>
            <span>Due: {dueDate}</span>
          </div>
        </div>

        <div className="mb-6 text-center">
          <div className="border dark:bg-card-foreground bg-secondary px-4 py-3 rounded-lg">
            <p className="text-sm font-semibold text-foreground mb-1">
              Deadline Timer
            </p>
            <p className="text-3xl font-semibold text-red-600">{timeLeft}</p>
          </div>
        </div>

        {projectDescription && (
          <div className="mb-6">
            <h4 className="text-xs sm:text-[15px] font-medium mb-3">
              Project Description
            </h4>
            <div className="dark:bg-card-foreground bg-secondary rounded-lg p-4">
              <div
                ref={descriptionRef}
                className={`text-sm text-foreground transition-all duration-300 overflow-hidden ${
                  isDescriptionExpanded ? "" : "line-clamp-3"
                }`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: isDescriptionExpanded ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: isDescriptionExpanded ? "visible" : "hidden",
                }}
              >
                {projectDescription}
              </div>
              {showReadMore && (
                <button
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className="mt-2 text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  {isDescriptionExpanded ? (
                    <>
                      Read Less <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {techStack.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs sm:text-[15px] font-medium mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="dark:bg-card-foreground bg-secondary text-primary text-xs px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {difficulty && (
          <div>
            <h4 className="text-xs sm:text-[15px] font-medium mb-2">
              Difficulty
            </h4>
            <span className="px-3 py-1 rounded-full dark:bg-card-foreground bg-secondary text-xs">
              {difficulty}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
