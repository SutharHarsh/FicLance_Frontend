"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

function NewProjectPageContent() {
  const router = useRouter();
  const { user } = useAuth();
  const initRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const initializeProject = async () => {
      // Prevent duplicate initialization (React StrictMode + fast re-renders)
      if (initRef.current || !isMounted) return;

      const projectDataStr = sessionStorage.getItem("pendingProject");

      if (!projectDataStr) {
        if (isMounted) router.replace("/new-project");
        return;
      }

      // Mark as initializing to prevent duplicate calls across strict-mode mounts
      initRef.current = true;

      try {
        const projectData = JSON.parse(projectDataStr);

        // Convert duration string to days (e.g., "3-5 days" -> 5, "1-2 Hours" -> 0.083, "1 week+" -> 7)
        const parseDurationToDays = (duration) => {
          if (!duration) return undefined;
          const str = duration.toLowerCase();

          const match = str.match(/(\d+)/g);
          if (!match || match.length === 0) return undefined;

          const value = parseInt(match[match.length - 1]);

          if (str.includes("hour")) return value / 24;
          if (str.includes("week")) return value * 7;
          if (str.includes("month")) return value * 30; // Rough estimate

          return value; // Default to days
        };

        // Normalize expertise - "Shuffle" or "All" means no expertise filter
        const normalizeExpertise = (expertise) => {
          if (!expertise) return "intermediate";
          const lower = expertise.toLowerCase();
          if (lower === "shuffle" || lower === "all") return "intermediate"; // Default to intermediate for shuffle
          if (["beginner", "intermediate", "advanced"].includes(lower))
            return lower;
          return "intermediate"; // Fallback
        };

        const payload = {
          projectTemplateId: projectData.projectId,
          projectName: projectData.ProjectName,
          projectDescription: projectData.Description,
          filters: {
            skills: Array.isArray(projectData.TechStack)
              ? projectData.TechStack
              : [],
            expertise: normalizeExpertise(projectData.Expertise),
            durationDays: parseDurationToDays(projectData.Duration),
          },
        };

        console.log(
          "[ChatNew] Creating Simulation on Backend (backend will handle agents)..."
        );
        const response = await api.post("/simulations", payload);

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to create simulation"
          );
        }

        const simulationId =
          response.data.data?.simulationId ||
          response.data.data?.simulation?._id ||
          response.data.data?.simulation?.id;

        if (!simulationId) throw new Error("Simulation ID not found");

        console.log(
          `[ChatNew] Simulation created: ${simulationId}. Backend will process Agent1 via queue.`
        );

        // Clean up and redirect to chat - backend will handle Agent1 requirements generation
        sessionStorage.removeItem("pendingProject");
        router.replace(`/chat/${simulationId}`);
      } catch (error) {
        console.error("Error initializing project:", error);

        // Extract error message from API response - ensure it's always a string
        let errorMessage = "Failed to start simulation";

        if (error.response?.data) {
          // Try multiple possible error fields
          errorMessage = String(
            error.response.data.message ||
              error.response.data.error ||
              error.response.data.userMessage ||
              "Failed to start simulation"
          );
        } else if (error.message) {
          errorMessage = String(error.message);
        }

        // Show error toast with longer duration for limit errors
        if (error.response?.status === 403 || error.response?.status === 401) {
          toast.error(errorMessage, {
            duration: 6000,
            description: "Please sign in again or check your session.",
          });

          // If token expired, redirect to login
          if (
            errorMessage.toLowerCase().includes("token") ||
            errorMessage.toLowerCase().includes("expired")
          ) {
            setTimeout(() => router.replace("/auth/login"), 2000);
            return;
          }
        } else {
          toast.error(errorMessage);
        }

        router.replace("/new-project?error=initialization-failed");
      } finally {
        // Allow retries only if we failed before removing pendingProject
        // Keep initRef locked once a request was made to avoid double creation
      }
    };

    initializeProject();

    // Cleanup function to handle React StrictMode double mount
    return () => {
      isMounted = false;
    };
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Preparing Your Project
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Setting up your simulation environment and AI mentor...
        </p>
      </div>
    </div>
  );
}

export default function NewProjectPage() {
  return (
    <ProtectedRoute>
      <NewProjectPageContent />
    </ProtectedRoute>
  );
}
