"use client";

/**
 * AuthVisualSection Component
 * Modern SaaS illustration with glassmorphism and feature highlights
 * Brand-themed with intentional design and visual balance
 */
export default function AuthVisualSection({ type = "login" }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Main Content Container */}
      <div className="relative z-10 max-w-lg w-full space-y-8">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
            {type === "login" ? (
              <>
                Welcome Back to <br />
                <span className="bg-gradient-to-r from-[#FF8C22] to-[#673AB7] bg-clip-text text-transparent">
                  FicLance
                </span>
              </>
            ) : (
              <>
                Start Your <br />
                <span className="bg-gradient-to-r from-[#FF8C22] to-[#673AB7] bg-clip-text text-transparent">
                  Freelance Journey
                </span>
              </>
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {type === "login"
              ? "Continue building your skills with real-world projects"
              : "Practice with simulated projects. Build real portfolio."}
          </p>
        </div>

        {/* Feature Cards - Glassmorphism Style */}
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="group relative overflow-hidden backdrop-blur-sm bg-white/60 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF8C22] to-[#FFA21F]" />
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF8C22] to-[#FFA21F] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Build Your Portfolio
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Work on realistic freelance projects
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden backdrop-blur-sm bg-white/60 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#673AB7] to-[#9C27B0]" />
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#673AB7] to-[#9C27B0] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Simulate Real Scenarios
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practice client interactions safely
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden backdrop-blur-sm bg-white/60 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FFA21F] to-[#FF8C22]" />
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFA21F] to-[#FF8C22] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Learn by Doing
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gain experience before going live
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-[#FF8C22]" />
          <div className="w-2 h-2 rounded-full bg-[#FFA21F]" />
          <div className="w-2 h-2 rounded-full bg-[#673AB7]" />
        </div>
      </div>

      {/* Background decorative circles */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#FF8C22]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#673AB7]/10 rounded-full blur-3xl" />
    </div>
  );
}
