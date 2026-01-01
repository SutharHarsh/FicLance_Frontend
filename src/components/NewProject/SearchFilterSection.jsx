"use client"; // ✅ Required for client-side state

import { useState } from "react";
import { RiCloseLine, RiAddLine, RiArrowDownSLine } from "react-icons/ri";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const durations = ["Any duration", "1-2 days", "3-5 days", "1 week+"];

const SearchFilterSection = ({
  initialSkills = ["Frontend", "React", "UI/UX"],
  onAddSkill = () => {},
  onRemoveSkill = () => {},
  onDifficultyChange = () => {},
  onDurationChange = () => {},
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [skills, setSkills] = useState(initialSkills);
  const [selectedDuration, setSelectedDuration] = useState("Any duration");
  const [showInput, setShowInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleRemoveSkill = (skill) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    onRemoveSkill(skill);
  };

  const handleAddSkillClick = () => {
    setShowInput(true);
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      const updated = [...skills, trimmedSkill];
      setSkills(updated);
      onAddSkill(trimmedSkill);
    }
    setNewSkill("");
    setShowInput(false);
  };

  const handleDifficultyClick = (level) => {
    setSelectedDifficulty(level);
    onDifficultyChange(level);
  };

  const handleDurationSelect = (e) => {
    const value = e.target.value;
    setSelectedDuration(value);
    onDurationChange(value);
  };

  return (
    <section className="mb-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          Choose a Project
        </h2>
      </div>

      {/* Difficulty Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="text-sm font-medium text-gray-700 flex items-center mr-2">
          Difficulty:
        </div>
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyClick(level)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedDifficulty === level
                ? "bg-[#2D3047] text-yellow-500"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Skills Filter */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="text-sm font-medium text-gray-700 mr-1">Skills:</div>
        {skills.map((skill) => (
          <button
            key={skill}
            className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 flex items-center"
            onClick={() => handleRemoveSkill(skill)}
          >
            {skill}
            <span className="w-4 h-4 ml-1 flex items-center justify-center">
              <RiCloseLine />
            </span>
          </button>
        ))}

        {showInput ? (
          <form
            onSubmit={handleSkillSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              autoFocus
              placeholder="New skill"
              className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#2D3047] text-white rounded-full text-sm hover:opacity-90"
            >
              Add
            </button>
          </form>
        ) : (
          <button
            onClick={handleAddSkillClick}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 flex items-center"
          >
            <span className="w-4 h-4 mr-1 flex items-center justify-center">
              <RiAddLine />
            </span>
            Add Skill
          </button>
        )}
      </div>

      {/* Duration Dropdown */}
      <div className="flex items-center">
        <div className="text-sm font-medium text-gray-700 flex items-center mr-3">
          Duration:
        </div>
        <div className="relative">
          <select
            value={selectedDuration}
            onChange={handleDurationSelect}
            className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
          >
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            <RiArrowDownSLine />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilterSection;