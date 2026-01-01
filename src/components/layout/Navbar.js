"use client"; // add this if you're using Next.js App Router (app/ directory)

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiMenu3Line, RiCloseLine, RiNotification3Line } from "react-icons/ri";
import { useAuth } from "@/contexts/AuthContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleStartSimulation = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex h-20 items-center">
            <h1 className="font-bold text-4xl">FicLance</h1>
          </Link>

          {/* Hamburger - Mobile Only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-gray-700 md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex ml-10 space-x-4">
          <Link href="/dashboard" className="px-3 py-2 text-gray-700 hover:text-primary font-medium">
            Dashboard
          </Link>
          <Link href="/projects" className="px-3 py-2 text-gray-700 hover:text-primary font-medium">
            Projects
          </Link>
          <Link href="/learning" className="px-3 py-2 text-gray-700 hover:text-primary font-medium">
            Learning Path
          </Link>
          <Link href="/portfolio" className="px-3 py-2 text-gray-700 hover:text-primary font-medium">
            Portfolio
          </Link>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {!user && (
             <button
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition whitespace-nowrap"
              onClick={handleStartSimulation}
            >
              Start Simulation
            </button>
          )}

          {user && (
            <div className="flex items-center gap-4">
               <div className="relative w-10 h-10 flex items-center justify-center">
                <RiNotification3Line className="text-gray-600 text-lg" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>

              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={user.avatar || user.image || "https://randomuser.me/api/portraits/men/75.jpg"}
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-card px-4 pb-4 shadow-md">
          <nav className="flex flex-col space-y-2 mt-2">
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium"
            >
              Projects
            </Link>
            <Link
              href="/learning"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium"
            >
              Learning Path
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium"
            >
              Portfolio
            </Link>
            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition"
              onClick={() => {
                setIsMenuOpen(false);
                if (user) {
                  router.push("/dashboard");
                } else {
                  router.push("/auth/login");
                }
              }}
            >
              Start Simulation
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;