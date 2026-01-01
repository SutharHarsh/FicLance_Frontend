"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useProjectStore from "@/store/useProjectStore";
import Link from "next/link";
import { AiOutlineCloseCircle, AiOutlineWarning } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const DeadlinePassedProjectItem = ({ project }) => {
  return (
    <Link href={`/chat/${project.id}`}>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-destructive/20 hover:border-destructive transition-colors group">
        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
          <AiOutlineCloseCircle className="text-lg text-destructive" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-foreground truncate max-w-[200px]">
              {project.title || project.projectName}
            </h4>
            <span className="text-xs text-destructive font-semibold flex items-center gap-1">
              <AiOutlineWarning /> Deadline Passed
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            Due:{" "}
            {project.deadlineTimestamp
              ? new Date(project.deadlineTimestamp).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>

        <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <BsThreeDotsVertical />
        </button>
      </div>
    </Link>
  );
};

// Main component
const DeadlinePassedProject = ({ onViewAll }) => {
  const { user } = useAuth();
  const { deadlinesPassed, fetchDeadlinesPassed, loading } = useProjectStore();

  useEffect(() => {
    if (user?.email) {
      fetchDeadlinesPassed();
    }
  }, [user?.email, fetchDeadlinesPassed]);

  if (!loading && deadlinesPassed.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse"></span>
          Deadline Passed Projects
        </h3>
        {deadlinesPassed.length > 3 && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {loading ? (
          <div className="flex items-center justify-center p-8 text-muted-foreground italic text-sm">
            Loading results...
          </div>
        ) : (
          deadlinesPassed
            .slice(0, 3)
            .map((project) => (
              <DeadlinePassedProjectItem key={project.id} project={project} />
            ))
        )}
      </div>
    </div>
  );
};

export default DeadlinePassedProject;
