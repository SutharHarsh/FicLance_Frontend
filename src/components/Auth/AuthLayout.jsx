"use client";

import Link from "next/link";

/**
 * AuthLayout Component
 * Full-page authentication layout with branding and responsive design
 * Used as wrapper for all auth screens
 */
export default function AuthLayout({ children, showBranding = true }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-background dark:to-secondary/20 flex flex-col">
      {/* Top Navigation */}
      {showBranding && (
        <div className="w-full px-4 pt-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group transition-transform hover:scale-105"
            >
              <img
                src="/FicLancelog.jpeg"
                alt="FicLance Logo"
                className="w-52 object-contain"
              />
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </div>

      {/* Footer */}
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 dark:text-muted-foreground">
            <Link
              href="/terms"
              className="hover:text-accent dark:hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/privacy"
              className="hover:text-accent dark:hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <span>© 2024 FicLance. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
