// components/Chat/ProjectSidebar.jsx
"use client";

import React from "react";
import PropTypes from "prop-types";

export default function ProjectSidebar({ projectSlug, conversation }) {
  if (!conversation) return null;

  const { projectName, deadline, status } = conversation;
  const deadlineDate = deadline ? new Date(deadline) : null;
  
  // Calculate progress based on time passed vs total duration? 
  // For now, let's just show a static progress or calculate if we had start date.
  // Let's assume 0% for new projects.
  const progress = 0;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium text-gray-900">Project Details</h3>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Project Status</h4>
          <div className="bg-gray-100 rounded-full h-2 mb-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            <span>{progress}% Complete</span>
            <span>Due: {deadlineDate ? deadlineDate.toLocaleDateString() : "No deadline"}</span>
          </div>

          {deadlineDate && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                <h5 className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-2">Time Remaining</h5>
                <CountdownTimer targetDate={deadlineDate} />
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Mission Brief</h4>
          <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
            <p>
              {projectName}
            </p>
          </div>
        </div>

        {/* <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
          <div className="flex -space-x-2 mb-2">
             {conversation.participants.map((p, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center" title={p.name || p.role}>
                  <span className="text-[#3b82f6] text-xs font-medium">{(p.name || p.role).substring(0, 2).toUpperCase()}</span>
                </div>
             ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

ProjectSidebar.propTypes = {
  projectSlug: PropTypes.string,
  conversation: PropTypes.object,
};

function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-1">
                <span className="text-xl font-bold text-indigo-600">{timeLeft[interval]}</span>
                <span className="text-[10px] text-indigo-400 uppercase">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center items-center">
            {timerComponents.length ? timerComponents : <span className="text-red-500 font-bold">Deadline Passed!</span>}
        </div>
    );
}
