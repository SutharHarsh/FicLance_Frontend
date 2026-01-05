"use client";


import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

/**
 * OAuthButtons Component
 * Premium OAuth authentication buttons for Google and GitHub
 * Includes loading states and visual feedback
 */
export default function OAuthButtons({ callbackUrl = "/dashboard" }) {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleOAuthSignIn = (providerId) => {
    setLoadingProvider(providerId);
    // Redirect to backend OAuth endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // const apiUrl = 'http://localhost:8080/api/v1';
    window.location.href = `${apiUrl}/auth/oauth/${providerId}`;
  };

  const providers = [
    {
      id: "google",
      name: "Google",
      icon: FaGoogle,
      bgColor: "bg-white hover:bg-gray-50 dark:bg-card dark:hover:bg-secondary",
      textColor: "text-gray-700 dark:text-foreground",
      borderColor: "border-gray-300 dark:border-border",
    },
    {
      id: "github",
      name: "GitHub",
      icon: FaGithub,
      bgColor: "bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700",
      textColor: "text-white",
      borderColor: "border-gray-900 dark:border-gray-700",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {providers.map((provider) => {
        const Icon = provider.icon;
        const isLoading = loadingProvider === provider.id;
        const isDisabled = loadingProvider !== null;

        return (
          <button
            key={provider.id}
            onClick={() => handleOAuthSignIn(provider.id)}
            disabled={isDisabled}
            title={`Sign in with ${provider.name}`}
            className={
              "w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#FF8C22] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FF8C22]/30"
            }
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        );
      })}
    </div>
  );
}
