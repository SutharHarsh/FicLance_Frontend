"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

/**
 * OAuth Callback Handler
 *
 * CRITICAL FIX: Prevents "Processing login..." infinite loop
 *
 * ROOT CAUSE OF BUG:
 * - setAuthInfo was called immediately
 * - router.push happened before authStatus updated
 * - Component re-rendered with old state, blocking redirect
 *
 * SOLUTION:
 * - Call setAuthInfo to update state
 * - Wait for authStatus to become "authenticated" via useEffect
 * - ONLY THEN redirect to dashboard
 * - No manual delays, no setTimeout hacks
 */
export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthInfo, authStatus } = useAuth();
  const [hasProcessedAuth, setHasProcessedAuth] = useState(false);

  // STEP 1: Process token
  useEffect(() => {
    if (hasProcessedAuth) return;

    const token = searchParams.get("token");
    const userStr = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      toast.error(decodeURIComponent(error));
      router.replace("/auth/login");
      return;
    }

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    try {
      const userData = userStr ? JSON.parse(decodeURIComponent(userStr)) : null;

      setAuthInfo(userData, token);
      setHasProcessedAuth(true);
      toast.success("Logged in successfully");
    } catch (err) {
      console.error("OAuth callback error", err);
      toast.error("Login failed");
      router.replace("/auth/login");
    }
  }, [hasProcessedAuth, searchParams, setAuthInfo, router]);

  // STEP 2: Redirect ONLY via effect
  useEffect(() => {
    if (hasProcessedAuth && authStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [hasProcessedAuth, authStatus, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Processing login...</p>
    </div>
  );
}
