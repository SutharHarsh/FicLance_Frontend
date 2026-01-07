"use client";

import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import api from "@/lib/api";
import { toast } from "sonner";

// lazy load heavy pieces
const ProjectSection = dynamic(() => import("./ProjectSection"), {
  ssr: false,
});
const FilterStepper = dynamic(() => import("./FilterStepper"), { ssr: false });

const NewProjectInline = ({ onRequestFullPage }) => {
  const [filters, setFilters] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        "[NewProjectInline] 📡 API Call - Fetching templates with params:",
        params
      );

      const response = await api.get("/templates", { params });

      console.log("[NewProjectInline] ✅ API Response received:", {
        success: response.data.success,
        count: response.data.data?.length,
        firstItem: response.data.data?.[0]?.title,
      });

      if (response.data.success) {
        const newTemplates = response.data.data;
        console.log(
          `[NewProjectInline] 🔄 Setting templates state with ${newTemplates.length} items`
        );
        setTemplates(newTemplates);

        // Verify state update on next tick
        setTimeout(() => {
          console.log("[NewProjectInline] ✓ State should be updated now");
        }, 0);
      }
    } catch (error) {
      console.error("[NewProjectInline] ❌ Failed to fetch templates:", error);
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
        console.log(
          "[NewProjectInline] 💾 Loading filters from localStorage:",
          { d, s, du }
        );
        setFilters({
          difficulty: d || "All",
          skills: Array.isArray(s) ? s : [],
          duration: du || "Any duration",
        });
      } else {
        // No saved filters - fetch all templates
        console.log(
          "[NewProjectInline] 🆕 No saved filters - fetching all templates"
        );
        fetchTemplates();
      }
    } catch (error) {
      console.error("[NewProjectInline] Error loading filters:", error);
      fetchTemplates();
    }
  }, [fetchTemplates]);

  // Refetch templates whenever filters change
  useEffect(() => {
    if (filters !== null) {
      console.log(
        "[NewProjectInline] 🔍 Filters changed - fetching filtered templates:",
        filters
      );
      fetchTemplates(filters);
    }
  }, [filters, fetchTemplates]);

  const openFilters = useCallback(() => setFilterModalOpen(true), []);
  const closeFilters = useCallback(() => setFilterModalOpen(false), []);

  const handleApplyFilters = useCallback((f) => {
    console.log(
      "[NewProjectInline] 🎯 Apply Filters clicked - New filters:",
      f
    );
    setFilters(f);
    setFilterModalOpen(false);
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Choose a Project</h2>
        <div>
          <button
            onClick={openFilters}
            className="bg-[#2D3047] text-yellow-200 px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition flex items-center whitespace-nowrap"
            type="button"
          >
            Open Filters
          </button>
        </div>
      </div>

      <div
        className={`${
          filterModalOpen ? "filter-blur pointer-events-none" : ""
        }`}
      >
        <ProjectSection
          filters={filters}
          templates={templates}
          isLoading={isLoading}
          onRequestFullPage={onRequestFullPage}
        />
      </div>

      <FilterStepper
        open={filterModalOpen}
        onClose={closeFilters}
        onApply={handleApplyFilters}
        onGoFullPage={() => {
          // If FilterStepper offers an action to redirect to full page
          onRequestFullPage();
        }}
      />
    </div>
  );
};

NewProjectInline.propTypes = {
  onRequestFullPage: PropTypes.func.isRequired,
};

export default NewProjectInline;
