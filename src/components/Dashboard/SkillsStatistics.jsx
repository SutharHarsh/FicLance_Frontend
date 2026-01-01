"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Cpu, Zap } from "lucide-react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsRadarChart = ({ skills = [] }) => {
  const data = {
    labels: skills.map((skill) => skill.name),
    datasets: [
      {
        label: "Mastery Level",
        data: skills.map((skill) => skill.percent),
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.7)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(59, 130, 246, 1)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true, color: "rgba(0,0,0,0.03)" },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false },
        pointLabels: {
          font: { size: 10, weight: "700", family: "'Inter', sans-serif" },
          color: "#94a3b8",
        },
        grid: { color: "rgba(0,0,0,0.03)" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#0f172a",
        bodyColor: "#0f172a",
        borderColor: "rgba(0,0,0,0.05)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Radar data={data} options={options} />;
};

const SkillsStatistics = ({ skills = [] }) => {
  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-gray-100/80 dark:border-white/5 shadow-sm p-6 w-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Skills Mastery
          </h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">
            Technical Analysis
          </p>
        </div>
        <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-4 ring-blue-50/50 dark:ring-blue-500/5">
          <Cpu size={20} />
        </div>
      </div>

      {skills && skills.length > 0 ? (
        <div className="space-y-8">
          {/* Radar Chart Area - Slightly reduced fixed height for better vertical fit */}
          <div className="h-56 relative">
            <SkillsRadarChart skills={skills} />
          </div>

          {/* Progress list */}
          <div className="space-y-4">
            {skills.slice(0, 4).map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between text-[11px] mb-2">
                  <span className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                    {skill.name}
                  </span>
                  <span className="font-mono text-gray-400 font-bold">
                    {skill.percent}%
                  </span>
                </div>
                <div className="w-full bg-gray-50 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-12 px-4 rounded-xl border border-dashed border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-center">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400 shadow-sm">
            <Zap size={20} />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Analyzing Skills...
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Complete your first simulation to see your Mastery Radar.
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsStatistics;
