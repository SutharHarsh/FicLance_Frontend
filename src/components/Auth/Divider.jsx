"use client";

/**
 * Divider Component
 * Visual separator for "OR" between OAuth and email auth
 */
export default function Divider({ text = "or" }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
          {text}
        </span>
      </div>
    </div>
  );
}
