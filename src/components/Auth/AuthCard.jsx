"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * AuthCard Component
 * Clean authentication card container with modern styling and logo
 */
export default function AuthCard({ children, title, subtitle }) {
  return (
    <div className="w-full">
      {/* Logo at top of auth card */}
      <div className="mb-6 flex justify-center">
        <Link href="/">
          <Image
            src="/Logo2.png"
            alt="FicLance - AI-Powered Client Simulation Platform"
            width={200}
            height={68}
            className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
            priority
          />
        </Link>
      </div>

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
