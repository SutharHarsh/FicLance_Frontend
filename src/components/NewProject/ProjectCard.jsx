"use client"; // mark this as a client component since it has interactivity

import { FaStar, FaRegStar, FaCheck, FaClock } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const ProjectCard = ({
  id,
  title,
  description,
  duration,
  difficulty,
  difficultyLevel,
  technologies,
  gradientColors,
  isSelected = false,
  onSelect,
}) => {
  const getDifficultyStars = (level) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <div key={i} className="text-yellow-400">
          {i < level ? <FaStar size={16} /> : <FaRegStar size={16} />}
        </div>
      );
    }

    return stars;
  };

  const getTechnologyColor = (tech) => {
    const colorMap = {
      React: "bg-blue-50 text-blue-600 border border-blue-200",
      CSS: "bg-purple-50 text-purple-600 border border-purple-200",
      API: "bg-green-50 text-green-600 border border-green-200",
      HTML: "bg-orange-50 text-orange-600 border border-orange-200",
      JavaScript: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      TypeScript: "bg-indigo-50 text-indigo-600 border border-indigo-200",
      "Chart.js": "bg-emerald-50 text-emerald-600 border border-emerald-200",
      "Node.js": "bg-green-50 text-green-600 border border-green-200",
      Express: "bg-gray-50 text-gray-600 border border-gray-200",
      MongoDB: "bg-green-50 text-green-700 border border-green-200",
      Figma: "bg-purple-50 text-purple-600 border border-purple-200",
      "UI/UX": "bg-pink-50 text-pink-600 border border-pink-200",
      Mobile: "bg-rose-50 text-rose-600 border border-rose-200",
      "Socket.io": "bg-indigo-50 text-indigo-600 border border-indigo-200",
    };

    return colorMap[tech] || "bg-gray-50 text-gray-600 border border-gray-200";
  };

  const handleCardClick = () => {
    if (onSelect && !isSelected) {
      onSelect(id);
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : "border border-gray-100"
      }`}
      data-project-id={id}
      onClick={handleCardClick}
    >
      {/* Header with gradient and duration badge */}
      <div
        className={`h-40 bg-gradient-to-br ${gradientColors} relative overflow-hidden`}
      >
        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-sm">
          {duration}
        </div>

        {/* Difficulty stars and level */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {getDifficultyStars(difficultyLevel)}
          </div>
          <span className="ml-2 text-xs font-medium text-white/90 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
            {difficulty}
          </span>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            <FaCheck className="text-blue-500 text-sm" />
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-6">
        {/* Title */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {title}
          </h3>
          {isSelected && (
            <MdKeyboardArrowDown className="text-blue-500 text-xl ml-2 flex-shrink-0" />
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {Array.isArray(technologies) &&
            technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 ${getTechnologyColor(
                  tech
                )} rounded-lg text-xs font-medium`}
              >
                {tech}
              </span>
            ))}
        </div>

        {/* Footer with time and button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <FaClock className="mr-1.5 text-xs" />
            {duration}
          </div>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "bg-blue-500 text-white shadow-sm hover:bg-blue-600"
                : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
