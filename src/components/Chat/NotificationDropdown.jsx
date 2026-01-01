"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdNotifications } from "react-icons/md";
import api from "@/lib/api";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen && notifications.length === 0) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Fetch conversations with upcoming deadlines using correct endpoint and axios instance
      const res = await api.get("/dashboard/projects?type=deadlines");

      if (res.data && res.data.success) {
        const data = res.data.data;
        // Normalize shape: ensure id, deadlineTimestamp, and deadline ISO for display
        const normalized = Array.isArray(data)
          ? data.map((item) => {
              const id = item.id || item._id;
              const ts =
                item.deadlineTimestamp ||
                (item.deadline ? new Date(item.deadline).getTime() : null);
              return {
                ...item,
                id,
                _id: id,
                deadline: ts ? new Date(ts).toISOString() : item.deadline,
                deadlineTimestamp: ts,
              };
            })
          : [];
        setNotifications(normalized);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const getDeadlineStatus = (deadlineTimestampOrIso) => {
    if (!deadlineTimestampOrIso) {
      return {
        status: "none",
        text: "No deadline",
        bgClass: "bg-gray-400",
        pillClass: "bg-gray-100 text-gray-600",
      };
    }

    const ts =
      typeof deadlineTimestampOrIso === "number"
        ? deadlineTimestampOrIso
        : new Date(deadlineTimestampOrIso).getTime();
    if (Number.isNaN(ts)) {
      return {
        status: "none",
        text: "No deadline",
        bgClass: "bg-gray-400",
        pillClass: "bg-gray-100 text-gray-600",
      };
    }

    const deadlineDate = new Date(ts);
    const now = new Date();
    const diffMs = deadlineDate - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMs < 0) {
      return {
        status: "passed",
        text: "Deadline passed",
        bgClass: "bg-red-600",
        pillClass: "bg-red-100 text-red-700",
      };
    }

    if (diffHours < 24) {
      return {
        status: "urgent",
        text: `${diffHours}h remaining`,
        bgClass: "bg-red-500",
        pillClass: "bg-red-100 text-red-700",
      };
    }

    if (diffDays <= 3) {
      return {
        status: "soon",
        text: `${diffDays}d remaining`,
        bgClass: "bg-orange-500",
        pillClass: "bg-orange-100 text-orange-700",
      };
    }

    return {
      status: "normal",
      text: `${diffDays}d remaining`,
      bgClass: "bg-green-500",
      pillClass: "bg-green-100 text-green-700",
    };
  };

  const urgentCount = notifications.filter((n) => {
    const status = getDeadlineStatus(n.deadlineTimestamp || n.deadline);
    return status.status === "passed" || status.status === "urgent";
  }).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-secondary rounded-full transition-colors relative"
      >
        <MdNotifications size={24} />
        {/* <i className="ri-notification-3-line text-xl text-gray-700"></i> */}
        {urgentCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-border z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {urgentCount > 0 && (
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                {urgentCount} urgent
              </span>
            )}
          </div>

          {/* Content */}
          <div className="overflow-y-auto no-scrollbar flex-1">
            {loading ? (
              <div className="p-8 text-center text-low-foreground">
                <i className="ri-loader-4-line animate-spin text-2xl mb-2"></i>
                <p className="text-sm">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-foreground">
                <i className="ri-notification-off-line text-3xl mb-2"></i>
                <p className="text-sm">No deadline notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notif) => {
                  const deadlineInfo = getDeadlineStatus(
                    notif.deadlineTimestamp || notif.deadline
                  );
                  const projectTitle =
                    notif.projectName ||
                    notif.project ||
                    notif.title ||
                    notif.name ||
                    notif.chatTitle ||
                    notif.conversationTitle ||
                    "Project";
                  return (
                    <a
                      key={notif._id || notif.id}
                      href={`/chat/${notif._id || notif.id}`}
                      className="block px-4 py-3 hover:bg-card-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 w-2 h-2 rounded-full ${deadlineInfo.bgClass} flex-shrink-0`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {projectTitle}
                          </p>
                          <div className="flex items-center gap-2 ">
                            <p className="text-md text-foreground">
                              {deadlineInfo.text}
                            </p>
                            {(deadlineInfo.status === "passed" ||
                              deadlineInfo.status === "urgent") && (
                              <span
                                className={`text-[10px] font-semibold px-2 py-1 rounded-full ${deadlineInfo.pillClass}`}
                              >
                                {deadlineInfo.status === "passed"
                                  ? "Deadline Passed"
                                  : "Near Deadline"}
                              </span>
                            )}
                          </div>
                          {(notif.deadlineTimestamp || notif.deadline) && (
                            <p className="text-xs text-gray-400 mt-1">
                              Due:{" "}
                              {new Date(
                                notif.deadlineTimestamp || notif.deadline
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
