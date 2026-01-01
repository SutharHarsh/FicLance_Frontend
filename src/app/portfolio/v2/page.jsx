"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Link from "next/link";
import { Palette, ArrowLeft, Loader } from "lucide-react";

// Import all 10 premium themes
import TheQuietProfessional from "@/components/PortfolioV2/Theme01_QuietProfessional";
import ModernMagazine from "@/components/PortfolioV2/Theme02_ModernMagazine";
import PureMinimalism from "@/components/PortfolioV2/Theme03_PureMinimalism";
import BentoIntelligence from "@/components/PortfolioV2/Theme04_BentoIntelligence";
import EditorialNarrative from "@/components/PortfolioV2/Theme05_EditorialNarrative";
import CreativeStudio from "@/components/PortfolioV2/Theme06_CreativeStudio";
import TheJourney from "@/components/PortfolioV2/Theme07_TheJourney";
import ProofOfWork from "@/components/PortfolioV2/Theme08_ProofOfWork";
import TechShowcase from "@/components/PortfolioV2/Theme09_TechShowcase";
import UltraModern from "@/components/PortfolioV2/Theme10_UltraModern";
import CorporateExecutive from "@/components/PortfolioV2/Theme11_CorporateExecutive";
import ArtisticSoul from "@/components/PortfolioV2/Theme12_ArtisticSoul";
import StartupFounder from "@/components/PortfolioV2/Theme13_StartupFounder";

/**
 * FICLANCE PORTFOLIO V2 - PREMIUM EDITION
 * 
 * 10 identity-driven portfolio themes.
 * Each theme represents a different professional archetype.
 * 
 * Design-first approach: All themes built with placeholder data first,
 * real data integration comes after visual excellence is achieved.
 */

const THEMES = [
  {
    id: "executive-professional",
    name: "Executive Professional",
    description: "Comprehensive portfolio with all sections. Perfect for senior roles.",
    component: TheQuietProfessional,
    personality: "Professional, detailed, impressive",
  },
  {
    id: "modern-magazine",
    name: "Modern Magazine",
    description: "Vibrant editorial design with extensive showcase. Eye-catching!",
    component: ModernMagazine,
    personality: "Bold, creative, energetic",
  },
  {
    id: "pure-minimalism",
    name: "Pure Minimalism",
    description: "Clean, elegant typography. Less is more.",
    component: PureMinimalism,
    personality: "Refined, sophisticated, elegant",
  },
  {
    id: "bento-intelligence",
    name: "Smart Grid",
    description: "Modern card-based layout with vibrant colors.",
    component: BentoIntelligence,
    personality: "Modern, organized, dynamic",
  },
  {
    id: "editorial-narrative",
    name: "Editorial Story",
    description: "Portfolio as a compelling narrative.",
    component: EditorialNarrative,
    personality: "Storytelling, thoughtful, engaging",
  },
  {
    id: "creative-studio",
    name: "Creative Studio",
    description: "Bold, experimental design for creatives.",
    component: CreativeStudio,
    personality: "Daring, artistic, unique",
  },
  {
    id: "the-journey",
    name: "The Journey",
    description: "Your career story told beautifully.",
    component: TheJourney,
    personality: "Progressive, inspiring, personal",
  },
  {
    id: "proof-of-work",
    name: "Data Driven",
    description: "Results-focused with metrics and proof.",
    component: ProofOfWork,
    personality: "Evidence-based, credible, strong",
  },
  {
    id: "tech-showcase",
    name: "Tech Showcase",
    description: "Technical excellence with modern flair.",
    component: TechShowcase,
    personality: "Technical, innovative, sharp",
  },
  {
    id: "ultra-modern",
    name: "Ultra Modern",
    description: "Cutting-edge design with stunning visuals.",
    component: UltraModern,
    personality: "Futuristic, bold, premium",
  },
  {
    id: "corporate-executive",
    name: "Corporate Executive",
    description: "Premium corporate design with trust-building elements.",
    component: CorporateExecutive,
    personality: "Professional, authoritative, trustworthy",
  },
  {
    id: "artistic-soul",
    name: "Artistic Soul",
    description: "Warm, handcrafted design for artists and creators.",
    component: ArtisticSoul,
    personality: "Creative, warm, expressive",
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    description: "Bold, metrics-driven design for entrepreneurs.",
    component: StartupFounder,
    personality: "Bold, ambitious, data-driven",
  },
];

export default function PortfolioV2Page() {
  const { user, authStatus } = useAuth();
  const { portfolioData, isLoading: dataLoading, error } = usePortfolioData();
  const [selectedTheme, setSelectedTheme] = useState("executive-professional");
  const [showThemePicker, setShowThemePicker] = useState(false);

  // Show loading state while auth or data is loading
  if (authStatus === "loading" || dataLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-12 h-12 text-gray-400 animate-spin mx-auto" />
          <p className="text-sm text-gray-500 font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  // Show auth required state
  if (!user || authStatus === "unauthenticated") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-gray-600">Please sign in to view your professional portfolio.</p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Show error state if data failed to load
  if (error && !portfolioData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-red-600">Error Loading Portfolio</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const CurrentTheme = THEMES.find(t => t.id === selectedTheme)?.component || TheQuietProfessional;

  return (
    <>
      {/* Theme Picker Button */}
      <button
        onClick={() => setShowThemePicker(!showThemePicker)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-4 bg-black text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform"
        aria-label="Change theme"
      >
        <Palette className="w-6 h-6" />
      </button>

      {/* Theme Picker Panel */}
      {showThemePicker && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:bg-black/20" onClick={() => setShowThemePicker(false)}>
          <div
            className="absolute bottom-24 left-4 right-4 sm:left-auto sm:right-8 sm:w-96 max-h-[70vh] sm:max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-5 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Choose Your Identity</h2>
              <p className="text-sm text-gray-600">
                Each theme represents a different professional archetype.
              </p>
            </div>

            <div className="space-y-2 md:space-y-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    setShowThemePicker(false);
                  }}
                  className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all ${selectedTheme === theme.id
                      ? "border-black bg-black text-white shadow-lg"
                      : "border-gray-100 hover:border-gray-300 bg-gray-50/50"
                    }`}
                >
                  <div className="font-bold text-sm md:text-base mb-0.5">{theme.name}</div>
                  <div className={`text-[10px] md:text-xs mb-1.5 ${selectedTheme === theme.id ? "text-white/70" : "text-gray-500"}`}>
                    {theme.description}
                  </div>
                  <div className={`text-[9px] md:text-xs italic ${selectedTheme === theme.id ? "text-white/50" : "text-gray-400"}`}>
                    {theme.personality}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Render Selected Theme with Portfolio Data */}
      <CurrentTheme data={portfolioData} />
    </>
  );
}
