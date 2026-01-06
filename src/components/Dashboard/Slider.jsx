"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          fixed lg:fixed top-0 left-0 z-50 lg:z-0
          w-64 bg-gradient-to-b from-card via-card to-card/95
          shadow-xl lg:shadow-lg border-r border-border/50
          h-screen lg:h-[100vh]
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          lg:block
        `}
      >
        {/* Fixed Logo Section */}
        <div className="flex-shrink-0 px-5 py-5 border-b border-border/50 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm">
          <Link
            href="/dashboard"
            className="flex items-center justify-center group"
          >
            <Image
              src="/Logo2.png"
              alt="FicLance"
              width={140}
              height={48}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>
        </div>

        {/* Scrollable Navigation Section */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide p-4 flex flex-col justify-between">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          <ul className="space-y-1.5">
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
                        className={`flex items-center px-3.5 py-3 rounded-xl font-medium transition-all duration-200 group ${
                          item.active
                            ? "text-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-sm border border-primary/20"
                            : "text-foreground hover:bg-secondary/80 hover:shadow-sm hover:translate-x-0.5"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 flex items-center justify-center mr-3.5 text-lg transition-transform duration-200 ${
                            item.active ? "" : "group-hover:scale-110"
                          }`}
                        >
                          {item.icon}
                        </div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </div>
            )}
          </ul>

          <div className="mt-12 pt-6 border-t border-border/50">
            {projectsLoading || isLoading ? (
              <>
                <div className="h-3 bg-card-foreground/20 rounded w-28 mb-4 px-3 animate-pulse"></div>
                <ul className="space-y-1.5">
                  {[...Array(3)].map((_, index) => (
                    <RecentProjectSkeleton key={index} />
                  ))}
                </ul>
              </>
            ) : (
              <div className="animate-fadeIn mt-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Recent Projects
                </h3>
                <ul className="space-y-1">
                  {recentProjects.length === 0 ? (
                    <li className="px-3 py-2.5 text-sm text-muted-foreground/70 italic">
                      No projects yet
                    </li>
                  ) : (
                    recentProjects.slice(0, 3).map((project) => (
                      <li key={project.id}>
                        <Link
                          href={`/chat/${project.id}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/60 rounded-lg transition-all duration-200 group hover:translate-x-0.5"
                        >
                          <div
                            className={`w-2 h-2 ${getRandomColor(
                              project.id
                            )} rounded-full mr-3 shrink-0 group-hover:scale-125 transition-transform duration-200`}
                          ></div>
                          <span className="truncate">{project.title}</span>
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
