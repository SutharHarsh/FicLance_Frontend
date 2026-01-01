"use client";
import React, { useState } from "react";
import { Share2, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SharePortfolioModal from "./SharePortfolioModal";
import UpgradeModal from "./UpgradeModal";
import { isBetaMode } from "@/lib/utils"; // Assuming utility exists, otherwise we'll check logic

/**
 * Share Button Component
 * Handles logic for showing upgrade modal vs share modal
 */
const ShareButton = ({ theme = "detailed", variant = "default" }) => {
  const { user } = useAuth();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Check if user has access to sharing
  const hasAccess =
    isBetaMode?.() || // Allow if in beta
    user?.subscription?.plan === "premium" ||
    user?.subscription?.plan === "pro" ||
    user?.role === "admin"; // Admins always have access

  const handleClick = () => {
    if (hasAccess) {
      setShowShareModal(true);
    } else {
      setShowUpgradeModal(true);
    }
  };

  // Button Styles
  const buttonStyles = {
    default:
      "inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    outline:
      "inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all",
    minimal:
      "inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm group",
    floating:
      "fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110",
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={buttonStyles[variant] || buttonStyles.default}
      >
        <Share2 className="w-5 h-5" />
        {variant !== "floating" && (
          <span>{hasAccess ? "Share Portfolio" : "Share (Premium)"}</span>
        )}
        {!hasAccess && variant !== "floating" && (
          <Lock className="w-3 h-3 ml-1 opacity-70" />
        )}
      </button>

      {hasAccess ? (
        <SharePortfolioModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          userTheme={theme}
        />
      ) : (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
    </>
  );
};

export default ShareButton;
