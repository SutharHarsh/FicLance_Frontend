"use client";

import { useState, useEffect, useCallback } from "react";

export function usePublicPortfolio(username) {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    if (!username) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/portfolio/user/${username}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Portfolio not found or set to private.");
        }
        throw new Error("Failed to fetch portfolio data.");
      }

      const data = await response.json();
      setPortfolioData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return { portfolioData, isLoading, error, refetch: fetchPortfolio };
}
