"use client";

import Link from "next/link";

/**
 * AuthPageLayout Component
 * Modern split-screen authentication layout with soft pastel aesthetic
 * Matches the reference UI design
 */
export default function AuthPageLayout({ children, visualSection }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-16 order-2 lg:order-1">
          <div className="w-full max-w-md">
            {/* Logo at top on mobile */}
            <div className="lg:hidden mb-8 text-center">
              <Link href="/" className="inline-block">
                <img
                  src="/FicLancelog.jpeg"
                  alt="FicLance Logo"
                  className="h-8 w-auto mx-auto"
                />
              </Link>
            </div>
            {children}
          </div>
        </div>

        {/* Right Side - Visual Section */}
        {visualSection && (
          <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-orange-100/50 via-orange-50/30 to-purple-50/20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 order-1 lg:order-2">
            {/* Decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FF8C22]/10 to-[#673AB7]/10 dark:bg-gray-700 rounded-full opacity-60 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center w-full p-8 lg:p-12 xl:p-16">
              {visualSection}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
