"use client"
import React from "react";
import Image from "next/image";
import { 
  Star, 
  Github, 
  ExternalLink, 
  Calendar,
  Users,
  Eye
} from "lucide-react";

export const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const ProjectCard = ({ project, onCaseStudyClick }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={project.image || "/images/placeholder-project.jpg"} 
          alt={project.alt || project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            project.status === 'Completed' || project.status === 'done'
              ? 'bg-green-100 text-green-800' 
              : project.status === 'analyzing' || project.status === 'running'
              ? 'bg-blue-100 text-blue-800 animate-pulse'
              : project.status === 'queued' || project.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {project.status || 'Draft'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-black/70 text-white rounded-full">
            {project.category || 'General'}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-gray-500 font-medium">{project.year}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.tags || []).slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
            >
              {tag}
            </span>
          ))}
          {(project.tags || []).length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{(project.tags || []).length - 3}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="mb-4 mt-auto">
          <StarRating rating={project.rating || 0} />
        </div>
        
        {/* Only show metrics if available */}
        {(project.duration || project.teamSize || project.views) && (
           <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
           <div className="text-center">
             <Calendar className="w-4 h-4 text-gray-500 mx-auto mb-1" />
             <div className="text-xs font-medium text-gray-900">{project.duration || '-'}</div>
             <div className="text-xs text-gray-500">Duration</div>
           </div>
           <div className="text-center">
             <Users className="w-4 h-4 text-gray-500 mx-auto mb-1" />
             <div className="text-xs font-medium text-gray-900">{project.teamSize || '-'}</div>
             <div className="text-xs text-gray-500">Team Size</div>
           </div>
           <div className="text-center">
             <Eye className="w-4 h-4 text-gray-500 mx-auto mb-1" />
             <div className="text-xs font-medium text-gray-900">{project.views || '-'}</div>
             <div className="text-xs text-gray-500">Views</div>
           </div>
         </div>
        )}
       
        <div className="flex gap-3 mt-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <button
            onClick={() => onCaseStudyClick(project)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
