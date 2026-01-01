"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthInfo } = useAuth();

  useEffect(() => {
    const handleCallback = () => {
      try {
        // Get token and user from URL params (set by backend redirect)
        const token = searchParams.get("token");
        const userStr = searchParams.get("user");

        if (!token || !userStr) {
          console.error("Missing token or user data in callback");
          router.replace("/auth/login?error=auth-failed");
          return;
        }

        // Parse user data
        const user = JSON.parse(decodeURIComponent(userStr));

        // Set auth state in context
        setAuthInfo(user, token);

        // Redirect to dashboard
        setTimeout(() => {
          router.replace("/dashboard");
        }, 100);
      } catch (error) {
        console.error("OAuth callback error:", error);
        router.replace("/auth/login?error=auth-failed");
      }
    };

    handleCallback();
  }, [searchParams, router, setAuthInfo]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Completing Sign In...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we set up your account
        </p>
      </div>
    </div>
  );
}
