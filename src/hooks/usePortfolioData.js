"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { transformUserData } from "@/utils/portfolioDataTransformer";

/**
 * Hook to fetch and transform portfolio data for V2 themes
 * Combines user profile data with projects data
 */
export function usePortfolioData() {
  const { user } = useAuth();
  const [portfolioData, setPortfolioData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchPortfolioData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchPortfolioData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch full dashboard data
      const response = await api.get("/dashboard");
      const data = response.data.success ? response.data.data || {} : {};

      // Transform combined data
      const transformed = transformUserData(user, data);
      setPortfolioData(transformed);
    } catch (err) {
      console.error("Failed to fetch portfolio data:", err);
      setError("Failed to load portfolio data");
      // Still transform with user data even if projects fail
      const transformed = transformUserData(user, {});
      setPortfolioData(transformed);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    if (user) {
      fetchPortfolioData();
    }
  };

  return {
    portfolioData,
    isLoading,
    error,
    refreshData,
  };
}
