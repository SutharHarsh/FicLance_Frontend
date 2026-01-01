"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Theme values supported by the application
 * @typedef {"light" | "dark" | "system"} Theme
 */

/**
 * Resolved theme (what's actually applied)
 * @typedef {"light" | "dark"} ResolvedTheme
 */

/**
 * @typedef {Object} ThemeContextType
 * @property {Theme} theme
 * @property {ResolvedTheme} resolvedTheme
 * @property {(theme: Theme) => void} setTheme
 */

const ThemeContext = createContext(undefined);

/**
 * PRODUCTION-GRADE THEME PROVIDER
 * 
 * Features:
 * - No hydration mismatch (uses mounting guard)
 * - System preference detection
 * - LocalStorage persistence
 * - Safe for SSR
 * - Profile preferences integration
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  /**
   * Get system preference
   */
  const getSystemTheme = () => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  /**
   * Resolve theme value (convert 'system' to actual theme)
   */
  const resolveTheme = (themeValue) => {
    if (themeValue === "system") {
      return getSystemTheme();
    }
    return themeValue;
  };

  /**
   * Apply theme to DOM
   */
  const applyTheme = (themeValue) => {
    if (typeof window === "undefined") return;

    const resolved = resolveTheme(themeValue);
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove("light", "dark");
    
    // Add the resolved theme class
    root.classList.add(resolved);

    // Store in localStorage for persistence
    localStorage.setItem("theme", themeValue);

    // Update state
    setThemeState(themeValue);
    setResolvedTheme(resolved);
  };

  /**
   * Public method to change theme
   */
  const setTheme = (newTheme) => {
    applyTheme(newTheme);
  };

  /**
   * Initialize theme on mount
   */
  useEffect(() => {
    // Prevent hydration mismatch by only running client-side
    setMounted(true);

    // Priority:
    // 1. localStorage (user preference)
    // 2. Default to light
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || "light";

    applyTheme(initialTheme);

    // Listen for system theme changes (when theme is set to 'system')
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme === "system") {
        const newResolved = getSystemTheme();
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newResolved);
        setResolvedTheme(newResolved);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  /**
   * Watch for theme changes and update system listener
   */
  useEffect(() => {
    if (!mounted) return;

    if (theme === "system") {
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * 
 * Usage:
 * const { theme, resolvedTheme, setTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
