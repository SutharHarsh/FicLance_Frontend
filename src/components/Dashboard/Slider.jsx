"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { isBetaMode } from "@/lib/config";
import { navItems } from "@/data/dashboard";

// Skeleton Components
const NavItemSkeleton = () => (
  <li className="animate-pulse">
    <div className="flex items-center p-3 rounded-lg">
      <div className="w-5 h-5 bg-card-foreground rounded mr-3"></div>
      <div className="h-4 bg-card-foreground rounded w-24"></div>
    </div>
  </li>
);

const RecentProjectSkeleton = () => (
  <li className="animate-pulse">
    <div className="flex items-center p-3 rounded-lg">
      <div className="w-2 h-2 bg-card-foreground rounded-full mr-3"></div>
      <div className="h-4 bg-card-foreground rounded w-32"></div>
    </div>
  </li>
);

const Slider = ({ isLoading = false, isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuth();
  const [recentProjects, setRecentProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Fetch recent projects
  useEffect(() => {
    if (user?.email) {
      fetchRecentProjects();
    }
  }, [user?.email]);

  const fetchRecentProjects = async () => {
    try {
      setProjectsLoading(true);
      const response = await api.get("/dashboard/projects", {
        params: { type: "recent" },
      });
      if (response.data.success) {
        setRecentProjects(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching recent projects:", error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const getRandomColor = (id) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
    ];
    // Use simple hash of ID to pick color deterministically
    let hash = 0;
    const str = String(id);
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:fixed top-0 lg:top-[72px] left-0 z-50 lg:z-0
          w-64 bg-card shadow-lg lg:shadow-sm
          h-screen lg:h-[calc(100vh-72px)]
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          lg:block
        `}
      >
        <nav className="p-4 flex flex-col h-full justify-between">
          <ul className="space-y-1">
            {isLoading ? (
              [...Array(4)].map((_, index) => <NavItemSkeleton key={index} />)
            ) : (
              <div className="animate-fadeIn">
                {navItems
                  .filter((item) => !isBetaMode() || item.name !== "Pricing")
                  .map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        target={item.target || "_self"}
                        rel={
                          item.target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center p-3 rounded-lg font-medium transition-colors ${
                          item.active
                            ? "text-primary bg-primary/10"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <div className="w-5 h-5 flex items-center justify-center mr-3 text-lg">
                          {item.icon}
                        </div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </div>
            )}
          </ul>

          <div className="mt-8 pt-6 border-t border-border">
            {projectsLoading || isLoading ? (
              <>
                <div className="h-3 bg-card-foreground rounded w-24 mb-3 px-3 animate-pulse"></div>
                <ul className="space-y-1">
                  {[...Array(3)].map((_, index) => (
                    <RecentProjectSkeleton key={index} />
                  ))}
                </ul>
              </>
            ) : (
              <div className="animate-fadeIn">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  Recent Projects
                </h3>
                <ul className="space-y-1">
                  {recentProjects.length === 0 ? (
                    <li className="px-3 py-2 text-sm text-muted-foreground">
                      No projects yet
                    </li>
                  ) : (
                    recentProjects.slice(0, 3).map((project) => (
                      <li key={project.id}>
                        <Link
                          href={`/chat/${project.id}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center p-3 text-sm font-medium text-gray-700 dark:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <div
                            className={`w-2 h-2 ${getRandomColor(
                              project.id
                            )} rounded-full mr-3 shrink-0`}
                          ></div>
                          {project.title}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Slider;
