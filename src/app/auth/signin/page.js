// src/app/auth/signin/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Legacy signin redirect
 * Redirects to new login page
 */
export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-muted-foreground">
          Redirecting...
        </p>
      </div>
    </div>
  );
}
