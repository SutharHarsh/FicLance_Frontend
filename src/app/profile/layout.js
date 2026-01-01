"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

/**
 * Profile Layout
 * All profile routes are protected - requires authentication
 */
export default function ProfileLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
