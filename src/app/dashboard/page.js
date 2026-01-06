"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import Slider from "@/components/Dashboard/Slider";
import MainContent from "@/components/Dashboard/MainContent";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useDynamicSEO, pageMetadata } from "@/lib/seo";

function DashboardContent() {
  const { user } = useAuth();
  
  // Apply dynamic SEO for dashboard
  useDynamicSEO(pageMetadata.dashboard);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user?.email]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/dashboard");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-background min-h-screen">
      <Slider
        isLoading={isLoading}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
      />
      <MainContent
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        data={data}
        isLoading={isLoading}
        user={user}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
