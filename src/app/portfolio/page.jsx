"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles } from "lucide-react";
import { useDynamicSEO, pageMetadata } from "@/lib/seo";

/**
 * Portfolio Page - Redirects to V2 Premium System
 * The new portfolio V2 system features 10 premium, award-worthy themes
 * Location: /portfolio/v2
 * SEO Enhancement: Apply portfolio metadata
 */
const PortfolioPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Apply dynamic SEO for portfolio page
  useDynamicSEO(pageMetadata.portfolio);

  // Auto-redirect to V2 premium portfolio system
  useEffect(() => {
    if (!loading && user) {
      router.push("/portfolio/v2");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
          <div className="relative w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Premium Portfolio System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            10 award-worthy themes designed for excellence
          </p>
          <a
            href="/auth/signin"
            className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Sign In to Explore
          </a>
        </div>
      </div>
    );
  }

  // Redirecting to V2...
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping"></div>
          <div className="relative w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">Redirecting to Premium Portfolio...</p>
      </div>
    </div>
  );
};

export default PortfolioPage;
