"use client";

import React from "react";
import { useParams } from "next/navigation";
import { usePublicPortfolio } from "@/hooks/usePublicPortfolio";
import { Loader, AlertCircle } from "lucide-react";
import Link from "next/link";
import { usePortfolioSEO } from "@/lib/seo";

// Import all premium themes
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

const THEMES = {
  "executive-professional": TheQuietProfessional,
  "modern-magazine": ModernMagazine,
  "pure-minimalism": PureMinimalism,
  "bento-intelligence": BentoIntelligence,
  "editorial-narrative": EditorialNarrative,
  "creative-studio": CreativeStudio,
  "the-journey": TheJourney,
  "proof-of-work": ProofOfWork,
  "tech-showcase": TechShowcase,
  "ultra-modern": UltraModern,
  "corporate-executive": CorporateExecutive,
  "artistic-soul": ArtisticSoul,
  "startup-founder": StartupFounder,
};

export default function SharedPortfolioPage() {
  const { username } = useParams();
  const { portfolioData, isLoading, error } = usePublicPortfolio(username);
  
  // Apply dynamic SEO based on portfolio data
  usePortfolioSEO(portfolioData?.user ? {
    name: portfolioData.user.name || username,
    username: username,
    role: portfolioData.user.profile?.professionalInfo?.role,
    skills: portfolioData.user.profile?.professionalInfo?.skills,
    projectCount: portfolioData.completedProjects?.length || 0,
  } : null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-12 h-12 text-gray-400 animate-spin mx-auto" />
          <p className="text-sm text-gray-500 font-medium">
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-3xl font-bold tracking-tight">
            Portfolio Unavailable
          </h1>
          <p className="text-gray-600">
            {error || "This portfolio is private or does not exist."}
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get theme based on saved themeId, fallback to executive-professional
  const themeId =
    portfolioData.user?.profile?.portfolio?.themeId || "executive-professional";
  const CurrentTheme = THEMES[themeId] || TheQuietProfessional;

  return <CurrentTheme data={portfolioData} />;
}
