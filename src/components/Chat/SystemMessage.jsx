"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/contexts/AuthContext";

const SystemMessage = ({ message, metadata = {}, userInitials = "JD" }) => {
  const { user } = useAuth();
  const systemType = metadata?.systemType || "info";

  // Render repo submitted message like a user-sent bubble (right aligned)
  if (systemType === "repo_submitted") {
    return (
      <div className="flex mb-4 justify-end px-2 sm:px-0">
        <div className="max-w-[85%] sm:max-w-[75%] mr-2">
          <div className="p-2 sm:p-3 mb-1 rounded-lg break-words bg-primary text-secondary rounded-tr-none">
            <div className="text-sm leading-relaxed">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-2">{children}</ul>
                  ),
                  li: ({ children }) => <li className="ml-2">{children}</li>,
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <UserAvatar
          src={user?.avatarUrl || user?.profile?.customAvatar || user?.profile?.image}
          alt={user?.name || "User"}
          initials={user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || userInitials}
          size="sm"
        />
      </div>
    );
  }

  // Determine icon and color based on system type
  const getIconAndColor = () => {
    switch (systemType) {
      case "repo_submitted":
        return {
          icon: CheckCircle2,
          bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
          borderColor: "border-emerald-200 dark:border-emerald-800",
          badgeBg: "bg-emerald-100 dark:bg-emerald-900/50",
          badgeText: "text-emerald-700 dark:text-emerald-300",
          iconColor: "text-emerald-600 dark:text-emerald-400",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50 dark:bg-red-950/30",
          borderColor: "border-red-200 dark:border-red-800",
          badgeBg: "bg-red-100 dark:bg-red-900/50",
          badgeText: "text-red-700 dark:text-red-300",
          iconColor: "text-red-600 dark:text-red-400",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-blue-50 dark:bg-blue-950/30",
          borderColor: "border-blue-200 dark:border-blue-800",
          badgeBg: "bg-blue-100 dark:bg-blue-900/50",
          badgeText: "text-blue-700 dark:text-blue-300",
          iconColor: "text-blue-600 dark:text-blue-400",
        };
    }
  };

  const { icon: Icon, bgColor, borderColor, badgeBg, badgeText, iconColor } =
    getIconAndColor();

  return (
    <div className="flex justify-center my-4 px-4">
      <div
        className={`max-w-2xl w-full rounded-xl border ${borderColor} ${bgColor} p-4 shadow-sm`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 pt-0.5">
            <Icon className={`${iconColor} w-5 h-5`} strokeWidth={2} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            {systemType === "repo_submitted" && (
              <div className={`inline-block ${badgeBg} ${badgeText} px-2.5 py-1 rounded-full text-xs font-semibold mb-2`}>
                ✅ Repository Submitted
              </div>
            )}

            {/* Message body */}
            <div className="text-sm text-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-2">{children}</ul>
                  ),
                  li: ({ children }) => <li className="ml-2">{children}</li>,
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMessage;
