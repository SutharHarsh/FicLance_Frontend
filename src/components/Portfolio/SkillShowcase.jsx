"use client"; // Needed for Next.js App Router (remove if using Pages Router)

// components/SkillShowcase.jsx
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import charts to avoid SSR issues
const RadarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Radar),
  { ssr: false }
);

const BarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  { ssr: false }
);

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// Example backend data
const skillsData = {
  chartData: [
    { name: "JavaScript", value: 95 },
    { name: "React", value: 92 },
    { name: "Next.js", value: 90 },
    { name: "Node.js", value: 88 },
    { name: "Tailwind CSS", value: 87 },
    { name: "GraphQL", value: 80 },
  ],
  performanceMetrics: [
    { label: "Communication", value: 92 },
    { label: "Timeliness", value: 95 },
    { label: "Technical Execution", value: 90 },
    { label: "Collaboration", value: 88 },
    { label: "Creativity", value: 85 },
  ],
};

// Radar Chart Data
const getRadarData = (data) => ({
  labels: data.map((item) => item.name),
  datasets: [
    {
      label: "Skill Level",
      data: data.map((item) => item.value),
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      borderColor: "rgba(37, 99, 235, 1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(37, 99, 235, 1)",
    },
  ],
});

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: { color: "#e5e7eb" },
      grid: { color: "#e5e7eb" },
      suggestedMin: 0,
      suggestedMax: 100,
      pointLabels: { font: { size: 14 } },
    },
  },
  plugins: {
    legend: { position: "top" },
  },
};

// Bar Chart Data
const getBarData = (data) => ({
  labels: data.map((item) => item.label),
  datasets: [
    {
      label: "Performance (%)",
      data: data.map((item) => item.value),
      backgroundColor: "rgba(16, 185, 129, 0.7)",
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
});

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 100,
      grid: { color: "#e5e7eb" },
    },
    x: { grid: { color: "#f3f4f6" } },
  },
  plugins: {
    legend: { display: false },
  },
};

// Main Component
const SkillShowcase = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-2">Skill Showcase</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A comprehensive overview of my technical and soft skills, measured
          across key performance areas.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Technical Proficiency */}
          <div className="w-full md:w-1/2 bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6">
              Technical Proficiency
            </h3>
            <div className="h-80">
              <RadarChart
                data={getRadarData(skillsData.chartData)}
                options={radarOptions}
              />
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="w-full md:w-1/2 bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6">Performance Metrics</h3>
            <div className="h-80">
              <BarChart
                data={getBarData(skillsData.performanceMetrics)}
                options={barOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillShowcase;