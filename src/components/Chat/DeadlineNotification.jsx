"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AlertTriangle, Clock } from "lucide-react";

/**
 * DeadlineNotification Component
 * Shows warning when project deadline is approaching or has passed
 * 
 * @param {string} deadline - ISO date string of project deadline
 * @param {number} warningThresholdHours - Hours before deadline to show warning (default: 24)
 */
export default function DeadlineNotification({ 
  deadline, 
  warningThresholdHours = 24 
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const notificationData = useMemo(() => {
    if (!deadline) return null;

    try {
      const deadlineDate = new Date(deadline);
      
      // Validate date
      if (isNaN(deadlineDate.getTime())) {
        console.error("Invalid deadline date:", deadline);
        return null;
      }

      const now = currentTime;
      const timeDiff = deadlineDate.getTime() - now.getTime();
      const hoursRemaining = timeDiff / (1000 * 60 * 60);

      // Deadline has passed
      if (timeDiff <= 0) {
        return {
          type: "error",
          message: "Deadline has passed",
          icon: AlertTriangle,
          bgColor: "bg-red-50 dark:bg-red-950/30",
          borderColor: "border-red-200 dark:border-red-800",
          textColor: "text-red-700 dark:text-red-300",
          iconColor: "text-red-600 dark:text-red-400",
        };
      }

      // Less than threshold hours remaining - show warning
      if (hoursRemaining <= warningThresholdHours) {
        const daysRemaining = Math.floor(hoursRemaining / 24);
        const hoursOnly = Math.floor(hoursRemaining % 24);
        
        let timeText;
        if (daysRemaining > 0) {
          timeText = `${daysRemaining}d ${hoursOnly}h remaining`;
        } else if (hoursOnly > 0) {
          timeText = `${hoursOnly}h remaining`;
        } else {
          const minutesRemaining = Math.floor((timeDiff / (1000 * 60)) % 60);
          timeText = `${minutesRemaining}m remaining`;
        }

        return {
          type: "warning",
          message: `Deadline approaching - ${timeText}`,
          icon: Clock,
          bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          textColor: "text-yellow-700 dark:text-yellow-300",
          iconColor: "text-yellow-600 dark:text-yellow-400",
        };
      }

      // No notification needed
      return null;
    } catch (error) {
      console.error("Error processing deadline:", error);
      return null;
    }
  }, [deadline, currentTime, warningThresholdHours]);

  if (!notificationData) return null;

  const Icon = notificationData.icon;

  return (
    <div
      className={`mx-4 mb-4 rounded-lg border ${notificationData.borderColor} ${notificationData.bgColor} p-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`${notificationData.iconColor} flex-shrink-0`} size={20} strokeWidth={2} />
        <p className={`text-sm font-medium ${notificationData.textColor}`}>
          {notificationData.message}
        </p>
      </div>
    </div>
  );
}
