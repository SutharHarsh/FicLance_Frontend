"use client";

/**
 * AuthCard Component
 * Clean authentication card container with modern styling
 */
export default function AuthCard({ children, title, subtitle }) {
  return (
    <div className="w-full">
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-base text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
