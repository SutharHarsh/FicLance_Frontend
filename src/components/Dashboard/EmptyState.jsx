"use client";
import React from "react";
import { useRouter } from "next/navigation";

const EmptyState = ({ onCreate }) => {
  const router = useRouter();

  const handleCreate = () => {
    if (typeof onCreate === "function") {
      onCreate();
    } else {
      router.push("/new-project");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            No Projects Yet
          </h2>
          <p className="text-muted-foreground text-base">
            Create your first project to start tracking progress and building your portfolio
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
          </svg>
          Create Your First Project
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
