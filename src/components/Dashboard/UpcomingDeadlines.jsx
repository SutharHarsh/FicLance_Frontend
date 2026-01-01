"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useProjectStore from "@/store/useProjectStore";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const DeadlineItem = ({ project }) => {
  const calculateTimeLeft = (deadline) => {
    const total = Date.parse(deadline) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysLeft = calculateTimeLeft(
    project.deadline || project.deadlineTimestamp
  );
  const dueDate = new Date(project.deadline || project.deadlineTimestamp);
  const isUrgent = daysLeft <= 3;

  const month = dueDate.toLocaleDateString("en-US", { month: "short" });
  const day = dueDate.getDate();

  return (
    <Link
      href={`/chat/${project.id}`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300"
    >
      {/* Date Box */}
      <div
        className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border ${
          isUrgent
            ? "bg-destructive/10 border-destructive/20 text-destructive"
            : "bg-primary/10 border-primary/20 text-primary"
        } transition-colors`}
      >
        <span className="text-xs font-bold uppercase tracking-wider">
          {month}
        </span>
        <span className="text-xl font-extrabold leading-none">{day}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {project.title || project.projectName}
          </h4>
          {isUrgent && (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-destructive/10 text-destructive px-1.5 py-0.5 rounded-full">
              <Clock size={10} strokeWidth={3} /> Urgent
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-muted-foreground/60" />
            {daysLeft > 0 ? `${daysLeft} days remaining` : "Due today"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:translate-x-1">
        <ArrowRight size={16} strokeWidth={2.5} />
      </div>
    </Link>
  );
};

// Main component
const UpcomingDeadlines = () => {
  const { user } = useAuth();
  const { deadlines, fetchDeadlines, loading } = useProjectStore();
  const displayCount = 3;

  useEffect(() => {
    if (user?.email) {
      fetchDeadlines();
    }
  }, [user?.email, fetchDeadlines]);

  // Frontend safeguard: hide completed/80%+ items even if backend lags
  const filtered = (deadlines || []).filter((d) => {
    const progress = Number(d.progress || 0);
    const completed = (d.state || '').toLowerCase() === 'completed';
    return progress < 80 && !completed;
  });

  return (
    <div className="p-6 bg-card rounded-2xl border border-border shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            Upcoming Deadlines
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            Tasks due within next 7 days
          </p>
        </div>
        <div className="p-2 rounded-xl bg-primary/10 text-primary ring-4 ring-primary/5">
          <Clock size={20} className="animate-pulse" />
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
            <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
            <span className="text-xs font-medium">Loading tasks...</span>
          </div>
        ) : filtered.length > 0 ? (
          filtered
            .slice(0, displayCount)
            .map((deadline) => (
              <DeadlineItem key={deadline.id} project={deadline} />
            ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 rounded-xl border border-dashed border-border bg-secondary/50 text-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3 text-muted-foreground">
              <Calendar size={18} />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No deadlines
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You're all caught up for the week!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
