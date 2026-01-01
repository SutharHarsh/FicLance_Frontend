"use client";

import React, { useState, useEffect } from "react";
import {
  Palette,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
  Layout,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

const THEMES = [
  {
    id: "executive-professional",
    name: "Executive Professional",
    color: "bg-blue-600",
  },
  { id: "modern-magazine", name: "Modern Magazine", color: "bg-purple-600" },
  { id: "pure-minimalism", name: "Pure Minimalism", color: "bg-gray-400" },
  { id: "bento-intelligence", name: "Smart Grid", color: "bg-indigo-600" },
  { id: "the-journey", name: "The Journey", color: "bg-rose-600" },
  { id: "tech-showcase", name: "Tech Showcase", color: "bg-cyan-600" },
  { id: "ultra-modern", name: "Ultra Modern", color: "bg-fuchsia-600" },
];

const FIXED_SECTIONS = ["About", "Experience", "Projects", "Skills", "Contact"];

export default function PortfolioEditor({ user, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState({
    themeId: "executive-professional",
    isPublic: false,
    customSections: [],
    activeSections: FIXED_SECTIONS,
  });

  useEffect(() => {
    if (user?.profile?.portfolio) {
      setPortfolio({
        themeId: user.profile.portfolio.themeId || "executive-professional",
        isPublic: user.profile.portfolio.isPublic || false,
        customSections: user.profile.portfolio.customSections || [],
        activeSections: user.profile.portfolio.activeSections || FIXED_SECTIONS,
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.patch("/users/me", {
        profile: {
          ...user.profile,
          portfolio: portfolio,
        },
      });

      if (response.data.success) {
        toast.success("Portfolio settings updated!");
        if (onUpdate) onUpdate(response.data.data);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to update portfolio"
      );
    } finally {
      setLoading(false);
    }
  };

  const addCustomSection = () => {
    if (portfolio.customSections.length >= 5) {
      toast.error("Maximum 5 custom sections allowed");
      return;
    }
    setPortfolio({
      ...portfolio,
      customSections: [
        ...portfolio.customSections,
        { title: "New Section", content: "" },
      ],
    });
  };

  const removeCustomSection = (index) => {
    const newSections = [...portfolio.customSections];
    newSections.splice(index, 1);
    setPortfolio({ ...portfolio, customSections: newSections });
  };

  const updateCustomSection = (index, field, value) => {
    const newSections = [...portfolio.customSections];
    newSections[index][field] = value;
    setPortfolio({ ...portfolio, customSections: newSections });
  };

  const toggleSection = (section) => {
    const newSections = portfolio.activeSections.includes(section)
      ? portfolio.activeSections.filter((s) => s !== section)
      : [...portfolio.activeSections, section];
    setPortfolio({ ...portfolio, activeSections: newSections });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Palette className="w-6 h-6 text-blue-600" />
            Portfolio Customization
          </h2>
          <p className="text-slate-500 mt-1">
            Control how your professional work is presented to the world.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setPortfolio({ ...portfolio, isPublic: !portfolio.isPublic })
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              portfolio.isPublic
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            {portfolio.isPublic ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            {portfolio.isPublic ? "Public" : "Private"}
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Theme Selection */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
              <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              Selected Theme
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() =>
                    setPortfolio({ ...portfolio, themeId: theme.id })
                  }
                  className={`relative p-3 sm:p-4 rounded-2xl border-2 transition-all group overflow-hidden ${
                    portfolio.themeId === theme.id
                      ? "border-blue-600 bg-blue-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`w-full h-16 sm:h-20 rounded-lg mb-2 sm:mb-3 ${theme.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                  ></div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {theme.name}
                  </div>
                  {portfolio.themeId === theme.id && (
                    <div className="absolute top-2 right-2 p-1 bg-blue-600 text-white rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Sections */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-600" />
                Custom Content Blocks
              </h3>
              <button
                onClick={addCustomSection}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Add Block ({portfolio.customSections.length}/5)
              </button>
            </div>

            <div className="space-y-4">
              {portfolio.customSections.map((section, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        updateCustomSection(idx, "title", e.target.value)
                      }
                      placeholder="Block Title (e.g., My Methodology)"
                      className="bg-transparent border-none text-slate-900 font-bold focus:ring-0 w-full"
                    />
                    <button
                      onClick={() => removeCustomSection(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={section.content}
                    onChange={(e) =>
                      updateCustomSection(idx, "content", e.target.value)
                    }
                    placeholder="Tell your story here..."
                    rows={4}
                    className="w-full bg-white rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-700 p-4"
                  />
                  <div className="text-right text-[10px] text-slate-400">
                    {section.content.length}/2000 characters
                  </div>
                </div>
              ))}

              {portfolio.customSections.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-slate-400">No custom blocks added yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Visible Sections */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Visible Sections
            </h3>
            <div className="space-y-2">
              {FIXED_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => toggleSection(section)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    portfolio.activeSections.includes(section)
                      ? "bg-blue-50 border-blue-100 text-blue-700"
                      : "bg-slate-50 border-slate-100 text-slate-400"
                  }`}
                >
                  <span className="font-medium">{section}</span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      portfolio.activeSections.includes(section)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200"
                    }`}
                  >
                    {portfolio.activeSections.includes(section) && (
                      <CheckCircle2 className="w-3 h-3" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Share Link */}
          {portfolio.isPublic && user.profile?.username && (
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl border border-blue-500 shadow-lg text-white">
              <h3 className="font-bold mb-2">Your Public URL</h3>
              <p className="text-blue-100 text-sm mb-4">
                Anyone with this link can view your portfolio.
              </p>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex items-center justify-between mb-4">
                <span className="text-xs font-mono truncate mr-2">
                  /p/{user.profile.username}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/p/${user.profile.username}`
                    );
                    toast.success("Link copied!");
                  }}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <a
                href={`/p/${user.profile.username}`}
                target="_blank"
                className="block w-full text-center py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                View Live Portfolio
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
