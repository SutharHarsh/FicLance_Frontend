"use client";

import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import { MdSpaceDashboard } from "react-icons/md";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ isLoading = false }) {
  if (isLoading) {
    return (
      <header className="bg-card border-b border-border animate-pulse">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="h-6 w-24 bg-card-foreground rounded" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-card-foreground rounded-full" />
            <div className="w-10 h-10 bg-card-foreground rounded-full" />
            <div className="w-9 h-9 bg-card-foreground rounded-full" />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="dark:bg-background bg-card border-b border-border">
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
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

        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            title="Dashboard"
          >
            <MdSpaceDashboard size={24} />
            {/* <i className="ri-dashboard-line text-xl text-gray-700"></i> */}
          </a>

          <NotificationDropdown />

          <a
            href="/profile"
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            title="Profile"
          >
            <User size={18} className="text-secondary" />
          </a>
        </div>
      </div>
    </header>
  );
}
