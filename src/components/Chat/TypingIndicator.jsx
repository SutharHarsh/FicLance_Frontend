"use client";

import React from "react";

export default function TypingIndicator({ clientInitials = "AI" }) {
  return (
    <div className="flex mb-4 px-2 sm:px-0">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
        <span className="text-green-600 font-medium text-xs">{clientInitials}</span>
      </div>
      <div className="bg-gray-100 rounded-lg rounded-tl-none py-3 px-4">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></span>
        </div>
      </div>
    </div>
  );
}
