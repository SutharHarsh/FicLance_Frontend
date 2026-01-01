"use client";

import { isBetaMode } from "@/lib/config";

/**
 * Beta Badge Component
 * Displays a beta indicator when the application is in beta mode
 */
export default function BetaBadge() {
  // Only render if beta mode is active
  if (!isBetaMode()) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <span className="font-bold text-sm uppercase tracking-wider">
        Beta Mode
      </span>
    </div>
  );
}
