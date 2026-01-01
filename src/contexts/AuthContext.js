"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api, { setAuthToken } from "@/lib/api";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthContext = createContext();

/**
 * AuthProvider - Manages authentication state with explicit status tracking
 *
 * CRITICAL FIX: Introduces authStatus to prevent race conditions
 * - "loading": Initial state, validating session
 * - "authenticated": User is logged in
 * - "unauthenticated": User is not logged in
 *
 * This explicit state prevents:
 * - Infinite loading on protected routes
 * - Premature redirects before auth is resolved
 * - Race conditions between state updates and navigation
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  // CRITICAL: Explicit auth status - never check user directly for auth state
  const [authStatus, setAuthStatus] = useState("loading"); // "loading" | "authenticated" | "unauthenticated"
  const router = useRouter();

  // Initialize auth on mount - check for refresh token
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      // Step 1: Hydrate from localStorage if available (prevents early redirects)
      try {
        const storedUser = localStorage.getItem("ficlance_user");
        const storedToken = localStorage.getItem("ficlance_access_token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setAccessToken(storedToken);
          setAuthToken(storedToken);
          setAuthStatus("authenticated");
        }
      } catch { }

      // Step 2: Attempt background refresh; do not force logout on failure
      try {
        const response = await api.post("/auth/refresh");
        const { user: refreshedUser, access_token } = response.data.data;

        if (!isMounted) return;

        setUser(refreshedUser);
        setAccessToken(access_token);
        setAuthToken(access_token);
        try {
          localStorage.setItem("ficlance_user", JSON.stringify(refreshedUser));
          localStorage.setItem("ficlance_access_token", access_token);
        } catch { }
        setAuthStatus("authenticated");
      } catch (error) {
        if (!isMounted) return;

        // If we already hydrated as authenticated, keep it; otherwise mark unauthenticated
        setAuthStatus((prev) => (prev === "authenticated" ? "authenticated" : "unauthenticated"));
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency - only run on mount

  // Listen for logout events from failed token refresh
  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      setAccessToken(null);
      setAuthToken(null);
      setAuthStatus("unauthenticated");
      sessionStorage.clear();
      router.push("/auth/login");
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, [router]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user: userData, access_token } = response.data.data;

      // Update auth state - this will trigger re-renders in consuming components
      setAccessToken(access_token);
      setAuthToken(access_token);
      setUser(userData);
      setAuthStatus("authenticated");
      try {
        localStorage.setItem("ficlance_user", JSON.stringify(userData));
        localStorage.setItem("ficlance_access_token", access_token);
      } catch { }

      toast.success("Logged in successfully");

      // CRITICAL: Don't navigate here - let the calling component handle it
      // This prevents race conditions where router navigates before state propagates

      return true;
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const { user, access_token } = response.data.data;

      // Update auth state
      setUser(user);
      setAccessToken(access_token);
      setAuthToken(access_token);
      setAuthStatus("authenticated");
      try {
        localStorage.setItem("ficlance_user", JSON.stringify(user));
        localStorage.setItem("ficlance_access_token", access_token);
      } catch { }

      toast.success("Account created successfully");

      // Don't navigate here - let the calling component handle it

      return true;
    } catch (error) {
      console.error("Registration failed", error);
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setAuthToken(null);
      setAuthStatus("unauthenticated");
      try {
        localStorage.removeItem("ficlance_user");
        localStorage.removeItem("ficlance_access_token");
      } catch { }
      sessionStorage.clear(); // Explicit status update
      router.push("/auth/login");
      toast.success("Logged out");
    }
  }, [router]);

  /**
   * refreshUser - Fetches latest user data and updates context
   * Used after profile edits to sync portfolio data
   */
  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/users/me");
      if (response.data.success) {
        const updatedUser = response.data.data;
        setUser(updatedUser);
        try {
          localStorage.setItem("ficlance_user", JSON.stringify(updatedUser));
        } catch { }
        return updatedUser;
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
    return null;
  }, []);

  /**
   * setAuthInfo - Used by OAuth callback to set auth state
   *
   * CRITICAL: Must update authStatus to "authenticated"
   * This allows the callback page to know when state is ready
   * and trigger redirect based on authStatus change
   */
  const setAuthInfo = useCallback((userData, token) => {
    setUser(userData);
    setAccessToken(token);
    setAuthToken(token);
    setAuthStatus("authenticated"); // CRITICAL: Mark as authenticated
    try {
      localStorage.setItem("ficlance_user", JSON.stringify(userData));
      localStorage.setItem("ficlance_access_token", token);
    } catch { }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        authStatus, // CRITICAL: Export authStatus for components to use
        login,
        register,
        logout,
        setAuthInfo,
        refreshUser, // Add refreshUser method
        isAuthenticated: authStatus === "authenticated", // Derive from authStatus, not user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
