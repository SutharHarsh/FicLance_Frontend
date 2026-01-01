"use client";

import React, { useEffect, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

export default function ChatHeader({
  onInfoClick,
  isDetailsOpen,
  clientName = "Client",
  projectName = "Project",
  isLoading = false,
  onBackClick,
}) {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);

      // Trigger animation on next tick
      requestAnimationFrame(() => {
        setAnimateIn(true);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const initials = getInitials(clientName);

  const bgColors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-yellow-100",
  ];
  const textColors = [
    "text-blue-600",
    "text-green-600",
    "text-purple-600",
    "text-pink-600",
    "text-yellow-600",
  ];
  const colorIndex = clientName.charCodeAt(0) % bgColors.length;

  /* ---------------- SKELETON ---------------- */
  if (showSkeleton || isLoading) {
    return (
      <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between gap-3 animate-pulse">
        {/* Back button placeholder on mobile */}
        <div className="lg:hidden w-10 h-10 rounded-full bg-card-foreground flex-shrink-0" />

        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-full bg-card-foreground flex-shrink-0" />
          <div>
            <div className="h-4 bg-card-foreground rounded w-32 mb-2" />
            <div className="h-3 bg-card-foreground rounded w-24" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-card-foreground flex-shrink-0" />
      </div>
    );
  }

  /* ---------------- REAL CONTENT ---------------- */
  return (
    <div
      className={`
        bg-card border-b border-border px-4 py-2
        flex items-center justify-between gap-3
        transition-all duration-300 ease-out
        ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {/* Back Button for Mobile/Tablet */}
      {onBackClick && (
        <button
          onClick={onBackClick}
          className="lg:hidden p-2 hover:bg-card-foreground rounded-full transition-colors flex-shrink-0"
          title="Back to conversations"
        >
          <IoArrowBack size={20} />
        </button>
      )}

      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`w-10 h-10 rounded-full ${bgColors[colorIndex]} flex items-center justify-center flex-shrink-0`}
        >
          <span className={`${textColors[colorIndex]} font-semibold text-sm`}>
            {initials}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">
            {clientName}
          </h3>
          <p className="text-xs text-low-foreground truncate">{projectName}</p>
        </div>
      </div>

      <button
        onClick={onInfoClick}
        className="p-2 rounded-full hover:bg-card-foreground transition-colors flex-shrink-0"
        title="Toggle project details"
      >
        {isDetailsOpen ? <TfiMenu size={24} /> : <TfiMenu size={24} />}
      </button>
    </div>
  );
}
