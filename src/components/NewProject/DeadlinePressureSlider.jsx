"use client";

import React from "react";
import {
  RiInformationLine,
  RiTimeLine,
  RiAlarmLine,
  RiPlantLine,
  RiLeafLine,
  RiScalesLine,
  RiFireLine,
  RiFlashlightFill,
} from "react-icons/ri";
import { BiTachometer } from "react-icons/bi";

const pressureLevels = {
  1: {
    label: "Relaxed Pressure",
    description:
      "Project timeline will be extended to 120% of the estimated time. Reminders will be minimal.",
    color: "emerald",
    icon: RiPlantLine,
    timeline: "+20% timeline",
    intensity: "Minimal reminders",
  },
  2: {
    label: "Light Pressure",
    description:
      "Project timeline will be slightly extended. You'll get friendly nudges.",
    color: "green",
    icon: RiLeafLine,
    timeline: "+10% timeline",
    intensity: "Gentle nudges",
  },
  3: {
    label: "Moderate Pressure",
    description:
      "Project timeline will be adjusted to 80% of the estimated completion time. You'll receive occasional reminders.",
    color: "blue",
    icon: RiScalesLine,
    timeline: "Standard timeline",
    intensity: "Regular check-ins",
  },
  4: {
    label: "High Pressure",
    description: "Shorter timeline with frequent reminders and progress checks.",
    color: "orange",
    icon: RiFireLine,
    timeline: "-20% timeline",
    intensity: "Frequent reminders",
  },
  5: {
    label: "Intense Pressure",
    description:
      "Project deadline will be tight. Expect urgent reminders and tight feedback loops.",
    color: "red",
    icon: RiFlashlightFill,
    timeline: "-40% timeline",
    intensity: "Urgent notifications",
  },
};

export default function DeadlinePressureSlider({ value = 3, onChange = () => {} }) {
  const current = pressureLevels[value] || pressureLevels[3];

  const getSliderTrackColor = (level) => {
    const colors = {
      1: "from-emerald-200 to-emerald-400",
      2: "from-green-200 to-green-400",
      3: "from-blue-200 to-blue-400",
      4: "from-orange-200 to-orange-400",
      5: "from-red-200 to-red-400",
    };
    return colors[level] || colors[3];
  };

  const getPressureIndicator = (level) => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      const color = pressureLevels[i]?.color || current.color;
      const filledClass = `bg-${color}-500 ring-2 ring-${color}-200`;
      dots.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i <= level ? filledClass : "bg-gray-200"
          }`}
        />
      );
    }
    return dots;
  };

  const Icon = current.icon; // component reference for current level icon
  const left = `calc(${((value - 1) / 4) * 100}% - 12px)`; // thumb left position

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${getSliderTrackColor(
              value
            )} rounded-xl flex items-center justify-center shadow-sm`}
          >
            <BiTachometer className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Deadline Pressure
            </h3>
            <p className="text-gray-500 text-sm">
              Customize your simulation intensity
            </p>
          </div>
        </div>

        {/* Pressure Level Badge */}
        <div
          className={`px-4 py-2 bg-${current.color}-50 border border-${current.color}-200 rounded-full flex items-center gap-2`}
        >
          <Icon className={`text-lg text-${current.color}-600`} />
          <span className={`text-sm font-medium text-${current.color}-700`}>
            Level {value}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-8 leading-relaxed">
        Adjust how much time pressure you'll experience during the simulation.
        This affects timeline expectations and reminder frequency.
      </p>

      {/* Custom Slider */}
      <div className="mb-8">
        <div className="relative">
          {/* Slider track */}
          <div className="h-3 bg-gray-100 rounded-full relative overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getSliderTrackColor(
                value
              )} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${(value / 5) * 100}%` }}
            />
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer"
            id="deadline-slider"
          />

          {/* Custom thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-${current.color}-500 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110`}
            style={{ left }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-4 px-2">
          <div className="text-center">
            <div className="text-xs font-medium text-emerald-600">Relaxed</div>
            <div className="flex justify-center mt-1">
              <RiPlantLine className="text-xs text-gray-400" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-blue-600">Moderate</div>
            <div className="flex justify-center mt-1">
              <RiScalesLine className="text-xs text-gray-400" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-red-600">Intense</div>
            <div className="flex justify-center mt-1">
              <RiFlashlightFill className="text-xs text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Pressure Indicator Dots */}
      <div className="flex justify-center gap-2 mb-8">{getPressureIndicator(value)}</div>

      {/* Current Setting Info Card */}
      <div
        className={`bg-gradient-to-r from-${current.color}-50 to-${current.color}-50/50 border border-${current.color}-200 rounded-xl p-6 relative overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`w-10 h-10 bg-${current.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}
            >
              <RiInformationLine className={`text-lg text-${current.color}-600`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`text-xl text-${current.color}-600`} />
                <h4 className={`text-lg font-semibold text-${current.color}-900`}>
                  {current.label}
                </h4>
              </div>
              <p className={`text-${current.color}-700 leading-relaxed`}>{current.description}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div
              className={`flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-${current.color}-200/50`}
            >
              <RiTimeLine className={`text-${current.color}-600`} />
              <div>
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Timeline
                </div>
                <div className={`text-sm font-semibold text-${current.color}-700`}>{current.timeline}</div>
              </div>
            </div>
            <div
              className={`flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-${current.color}-200/50`}
            >
              <RiAlarmLine className={`text-${current.color}-600`} />
              <div>
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Reminders
                </div>
                <div className={`text-sm font-semibold text-${current.color}-700`}>{current.intensity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
