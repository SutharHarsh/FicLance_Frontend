"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProjectSection from "@/components/NewProject/ProjectSection";
import FilterStepper from "@/components/NewProject/FilterStepper";
import api from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDynamicSEO, pageMetadata } from "@/lib/seo";

export default function NewProjectPage() {
  // Apply dynamic SEO for new project page
  useDynamicSEO(pageMetadata.newProject);
  const [filters, setFilters] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");
  const [checkingLimits, setCheckingLimits] = useState(true);

  const router = useRouter();

  // Wrap fetchTemplates in useCallback to prevent stale closures
  const fetchTemplates = useCallback(async (filterParams = null) => {
    try {
      setIsLoading(true);

      // Build query parameters
      const params = {};
      if (filterParams) {
        if (filterParams.difficulty && filterParams.difficulty !== "All") {
          params.difficulty = filterParams.difficulty;
        }
        if (filterParams.skills && filterParams.skills.length > 0) {
          params.skills = filterParams.skills.join(",");
        }
        if (filterParams.duration && filterParams.duration !== "Any duration") {
          params.duration = filterParams.duration;
        }
      }

      console.log(
        "[NewProject] 📡 API Call - Fetching templates with params:",
        params
      );

      const response = await api.get("/templates", { params });

      console.log("[NewProject] ✅ API Response received:", {
        success: response.data.success,
        count: response.data.data?.length,
        firstItem: response.data.data?.[0]?.title,
      });

      // Backend returns { success: true, count: N, data: [...] }
      if (response.data.success) {
        const newTemplates = response.data.data;
        console.log(
          `[NewProject] 🔄 Setting templates state with ${newTemplates.length} items`
        );
        setTemplates(newTemplates);

        // Verify state update on next tick
        setTimeout(() => {
          console.log("[NewProject] ✓ State should be updated now");
        }, 0);
      }
    } catch (error) {
      console.error("[NewProject] ❌ Failed to fetch templates:", error);
      toast.error("Failed to load project templates");
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty deps - function doesn't depend on any state

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const d = localStorage.getItem("fp_difficulty");
      const s = JSON.parse(localStorage.getItem("fp_skills") || "null");
      const du = localStorage.getItem("fp_duration");
      if (d || s || du) {
        console.log("[NewProject] 💾 Loading filters from localStorage:", {
          d,
          s,
          du,
        });
        setFilters({
          difficulty: d || "All",
          skills: Array.isArray(s) ? s : [],
          duration: du || "Any duration",
        });
      } else {
        // No saved filters - fetch all templates
        console.log(
          "[NewProject] 🆕 No saved filters - fetching all templates"
        );
        fetchTemplates();
      }
    } catch (error) {
      console.error("[NewProject] Error loading filters:", error);
      fetchTemplates();
    }
  }, [fetchTemplates]);

  // Check project limits on mount
  useEffect(() => {
    const checkLimits = async () => {
      try {
        console.log("[NewProject] 🔍 Checking project limits...");
        setCheckingLimits(true);
        const response = await api.get("/limits/can-create-project");
        console.log("[NewProject] ✅ Limits response:", response.data);
        const { allowed, reason } = response.data.data;

        console.log("[NewProject] Allowed:", allowed, "Reason:", reason);
        if (!allowed) {
          console.log("[NewProject] ❌ Limit reached, showing error UI");
          setLimitReached(true);
          setLimitMessage(
            reason ||
              "Project limit reached. Please complete an existing project first."
          );
        } else {
          console.log("[NewProject] ✅ User can create project");
        }
      } catch (error) {
        console.error("[NewProject] ❌ Failed to check limits:", error);
        console.error("[NewProject] Error details:", error.response?.data);
        // Don't block on error - let backend validation handle it
      } finally {
        setCheckingLimits(false);
      }
    };

    // Always check limits (removed beta mode bypass as requested)
    checkLimits();
  }, []);

  // Refetch templates whenever filters change
  useEffect(() => {
    if (filters !== null) {
      console.log(
        "[NewProject] 🔍 Filters changed - fetching filtered templates:",
        filters
      );
      fetchTemplates(filters);
    }
  }, [filters, fetchTemplates]);

  const handleApplyFilters = useCallback((newFilters) => {
    console.log(
      "[NewProject] 🎯 Apply Filters clicked - New filters:",
      newFilters
    );
    setFilters(newFilters);
    setFilterModalOpen(false);
  }, []);

  const openFilters = useCallback(() => setFilterModalOpen(true), []);
  const closeFilters = useCallback(() => setFilterModalOpen(false), []);

  return (
    // page-level wrapper — full viewport height and background
    <div className="min-h-screen bg-gray-50">
      {/* Header with Filter Button */}
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex lg:flex-row lg:gap-0 flex-col gap-4 mt-4 items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Choose a Project
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-[#2D3047] text-yellow-200 px-6 py-2.5 rounded-lg font-medium hover:bg-[#1f2235] transition flex items-center gap-2"
              type="button"
            >
              Dashboard
            </button>
            <button
              onClick={openFilters}
              className="bg-[#2D3047] text-yellow-200 px-6 py-2.5 rounded-lg font-medium hover:bg-[#1f2235] transition flex items-center gap-2"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Render ProjectSection or Error State */}
      {checkingLimits ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking project limits...</p>
          </div>
        </div>
      ) : limitReached ? (
        <div className="max-w-4xl mx-auto p-8 mt-12">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-red-900 mb-3">
                  Project Limit Reached
                </h2>
                <p className="text-red-800 text-lg mb-6">{limitMessage}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProjectSection
          filters={filters}
          templates={templates}
          isLoading={isLoading}
          className="min-h-screen"
        />
      )}

      {/* Filter Modal */}
      <FilterStepper
        open={filterModalOpen}
        onClose={closeFilters}
        onApply={handleApplyFilters}
      />
    </div>
  );
}
