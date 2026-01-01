"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useProjectStore from "@/store/useProjectStore";
import Link from "next/link";
import { AiOutlineCheck, AiFillStar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const CompletedProjectItem = ({ project }) => {
  return (
    <Link href={`/chat/${project.id}`}>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
          <AiOutlineCheck className="text-lg text-green-600 dark:text-green-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-foreground truncate max-w-[200px]">
              {project.title || project.projectName}
            </h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {project.completedAt
                ? new Date(project.completedAt).toLocaleDateString()
                : "Completed"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={
                    i < (project.rating || 5)
                      ? ""
                      : "text-gray-300 dark:text-gray-600"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              • {project.clientName || "AI Client"}
            </span>
          </div>
        </div>

        <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <BsThreeDotsVertical />
        </button>
      </div>
    </Link>
  );
};

// Main component
const CompletedProject = ({ onViewAll }) => {
  const { user } = useAuth();
  const { completed, fetchCompleted, loading } = useProjectStore();

  useEffect(() => {
    if (user?.email) {
      fetchCompleted();
    }
  }, [user?.email, fetchCompleted]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Completed Projects
        </h3>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {loading ? (
          <div className="flex items-center justify-center p-8 text-muted-foreground italic">
            Loading results...
          </div>
        ) : completed.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-border text-center text-muted-foreground text-sm">
            No completed projects found.
          </div>
        ) : (
          completed
            .slice(0, 3)
            .map((project) => (
              <CompletedProjectItem key={project.id} project={project} />
            ))
        )}
      </div>
    </div>
  );
};

export default CompletedProject;
