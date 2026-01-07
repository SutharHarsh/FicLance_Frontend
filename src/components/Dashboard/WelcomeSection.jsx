// components/WelcomeSection.jsx
"use client";

import React from "react";
import { RiDownloadLine, RiAddLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";

export default function WelcomeSection({
  username = "Alex",
  date = "June 29, 2025",
  day = "Sunday",
  onOpenNewProject,
}) {
  const router = useRouter();

  const handleNewProjectClick = async () => {
    if (onOpenNewProject) {
      // Use the provided handler (which already has validation)
      onOpenNewProject();
    } else {
      // Check limits before navigating
      try {
        console.log("[WelcomeSection] Checking project limits...");
        const response = await api.get("/limits/can-create-project");
        console.log("[WelcomeSection] Limits response:", response.data);

        if (!response.data.success || !response.data.data.allowed) {
          console.log("[WelcomeSection] Limit reached, showing toast");
          toast.error(
            response.data.data.reason || "Cannot create new project",
            {
              duration: 6000,
            }
          );
          return;
        }
        console.log("[WelcomeSection] Navigating to /new-project");
        router.push("/new-project");
      } catch (error) {
        console.error("[WelcomeSection] Error checking limits:", error);
        toast.error(
          error.response?.data?.message || "Failed to check project limits"
        );
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Welcome back, {username}!
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {date} | {day}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={handleNewProjectClick}
          aria-label="Open new project"
          className="bg-accent dark:bg-primary text-foreground dark:text-black dark:hover:bg-primary/80 px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/80 transition flex items-center justify-center sm:justify-start whitespace-nowrap w-full sm:w-auto"
        >
          <div
            className="w-5 h-5 flex items-center justify-center mr-2"
            aria-hidden
          >
            <RiAddLine />
          </div>
          New Project
        </button>
      </div>
    </div>
  );
}

WelcomeSection.propTypes = {
  username: PropTypes.string,
  date: PropTypes.string,
  day: PropTypes.string,
  onOpenNewProject: PropTypes.func,
};
