"use client"; // ✅ Required since we’re using client-side interactivity

import { RiArrowLeftLine, RiSearchLine } from "react-icons/ri";
import Link from "next/link";

const NavbarBelowSection = () => {
  return (
    <div className="bg-white">
      <div className="px-4 md:px-10 py-6 space-y-8">
        {/* Top Header Section */}
        <div className="hidden md:flex ml-10 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 hover:bg-gray-50 px-3 py-2 rounded-lg"
          >
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <RiArrowLeftLine />
            </div>
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-6">
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-gray-900">
              Setup Your Simulation
            </h1>
          </div>

          <div className="flex items-center space-x-6 ml-auto">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              Step 1 of 3
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <RiSearchLine size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBelowSection;