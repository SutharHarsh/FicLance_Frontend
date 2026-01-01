// components/WelcomeSection.jsx
"use client";

import React from "react";
import { RiDownloadLine, RiAddLine } from "react-icons/ri";
import PropTypes from "prop-types";
import Link from "next/link";

export default function WelcomeSection({ username = "Alex", date = "June 29, 2025", day = "Sunday", onOpenNewProject }) {
  const newProjectButton = (
    <button
      type="button"
      onClick={onOpenNewProject}
      aria-label="Open new project"
      className="bg-accent dark:bg-primary text-foreground dark:text-black dark:hover:bg-primary/80 px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/80 transition flex items-center justify-center sm:justify-start whitespace-nowrap w-full sm:w-auto"
    >
      <div className="w-5 h-5 flex items-center justify-center mr-2" aria-hidden>
        <RiAddLine />
      </div>
      New Project
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Welcome back, {username}!</h1>
        <p className="text-sm sm:text-base text-muted-foreground">{date} | {day}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        {/* <button
          className="bg-card border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition flex items-center justify-center sm:justify-start whitespace-nowrap"
          type="button"
        >
          <div className="w-5 h-5 flex items-center justify-center mr-2" aria-hidden>
            <RiDownloadLine />
          </div>
          Export Report
        </button> */}

        {onOpenNewProject ? (
          newProjectButton
        ) : (
          <Link href="/new-project" className="flex items-center w-full sm:w-auto">
            {newProjectButton}
          </Link>
        )}
      </div>
    </div>
  );
}

WelcomeSection.propTypes = {
  username: PropTypes.string,
  date: PropTypes.string,
  day: PropTypes.string,
  onOpenNewProject: PropTypes.func,
};
