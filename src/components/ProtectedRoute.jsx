"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * ProtectedRoute Component - Guards protected pages from unauthorized access
 *
 * CRITICAL FIX: Immediate redirect for unauthenticated users
 * - Uses explicit authStatus for clean state management
 * - Redirects happen via router.replace (no browser history)
 * - No infinite loading states
 */
export default function ProtectedRoute({
  children,
  redirectTo = "/auth/login",
}) {
  const { authStatus } = useAuth();
  const router = useRouter();

  // CRITICAL: Redirect immediately when unauthenticated (runs on every render)
  useEffect(() => {
    if (authStatus === "unauthenticated") {
      console.log("[ProtectedRoute] Redirecting unauthenticated user to login");
      router.replace(redirectTo);
    }
  }, [authStatus, router, redirectTo]);

  // Show loading state ONLY while auth status is being determined
  if (authStatus === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if unauthenticated (redirect is in progress)
  if (authStatus === "unauthenticated") {
    return null;
  }

  // authStatus === "authenticated" - render protected content
  return <>{children}</>;
}
