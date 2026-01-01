"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * PublicRoute Component - For pages that should redirect authenticated users
 * 
 * CRITICAL FIX: Redirects authenticated users away from public pages
 * 
 * USE CASES:
 * - Landing page (/) - authenticated users should see dashboard
 * - Login page - authenticated users should be redirected
 * - Signup page - authenticated users should be redirected
 * 
 * BEHAVIOR:
 * - authStatus === "loading" → Render content (auth check happens in background)
 * - authStatus === "authenticated" → Redirect to dashboard
 * - authStatus === "unauthenticated" → Render public content
 * 
 * FIX: Removed loading spinner blocking - login/signup forms show immediately
 * This improves UX and prevents "page not opening" issue
 */
export default function PublicRoute({ 
  children, 
  redirectTo = "/dashboard"
}) {
  const { authStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // CRITICAL: Redirect authenticated users to dashboard
    // This happens silently in the background
    if (authStatus === "authenticated") {
      router.replace(redirectTo);
    }
  }, [authStatus, router, redirectTo]);

  // Don't render if authenticated (redirect is in progress)
  if (authStatus === "authenticated") {
    return null;
  }

  // For "loading" or "unauthenticated" - render public content immediately
  // If user is authenticated, useEffect will redirect them
  // This prevents blocking the UI with unnecessary loading spinners
  return <>{children}</>;
}
