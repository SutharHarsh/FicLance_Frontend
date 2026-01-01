"use client"
import React from "react";
import Image from "next/image";
import { 
  Github, 
  X,
  User,
  Clock,
  Award,
  Eye,
  Target,
  Lightbulb,
  BarChart
} from "lucide-react";

const Modal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  // Adapt for feedback/analysis structure vs static case study
  const caseStudy = project.caseStudy || {};
  const feedback = project.feedback || {};

  // If we have feedback (real analysis), render that
  const isRealAnalysis = !!project.feedbackId || !!project.analysisMetadata;
  
  // Use either caseStudy data or feedback data
  const technologies = caseStudy.technologies || project.tags || [];
  const detailImage = caseStudy.detailImage || project.image || "/images/placeholder-project.jpg";
  const title = project.title;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 pr-12">
              {title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden mb-8 h-64 md:h-80 bg-gray-100 relative">
            <Image
              src={detailImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          {/* If Real Analysis from Backend, show Feedback */}
          {isRealAnalysis ? (
            <div className="space-y-8">
                 <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">AI Analysis Score: {project.rating}/5.0</h3>
                    <p className="text-indigo-700">Analysis completed on {project.year}</p>
                 </div>

                 {feedback.strengths && feedback.strengths.length > 0 && (
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Award className="w-5 h-5 text-green-600" /> Key Strengths
                     </h3>
                     <ul className="list-disc pl-5 space-y-2 text-gray-700">
                       {feedback.strengths.map((str, i) => <li key={i}>{str}</li>)}
                     </ul>
                   </div>
                 )}

                 {feedback.improvements && feedback.improvements.length > 0 && (
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Target className="w-5 h-5 text-red-600" /> Areas for Improvement
                     </h3>
                     <ul className="list-disc pl-5 space-y-2 text-gray-700">
                       {feedback.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                     </ul>
                   </div>
                 )}
                 
                 {/* Raw feedback fallback if structured is missing */}
                 {!feedback.strengths && <p>{project.description}</p>}
            </div>
          ) : (
             /* Original Static Case Study Layout */
             <>
                {/* Project Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Client</h3>
                        <p className="text-gray-600 text-sm">{caseStudy.client || 'Personal Project'}</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Timeline</h3>
                        <p className="text-gray-600 text-sm">{caseStudy.timeline || project.duration}</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Role</h3>
                        <p className="text-gray-600 text-sm">{caseStudy.role || 'Solo Developer'}</p>
                    </div>
                    </div>
                </div>

                {/* Project Sections */}
                <div className="space-y-8">
                    {/* Overview */}
                    {caseStudy.overview && (
                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                            <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Project Overview</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{caseStudy.overview}</p>
                        </div>
                    )}

                    {/* Challenge */}
                    {caseStudy.challenge && (
                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-red-100 rounded-lg">
                            <Target className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Challenge</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
                        </div>
                    )}

                    {/* Approach */}
                    {caseStudy.approach && (
                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Approach & Solution</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{caseStudy.approach}</p>
                        </div>
                    )}

                    {/* Results */}
                    {caseStudy.results && (
                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                            <BarChart className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Results & Impact</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{caseStudy.results}</p>
                        </div>
                    )}
                </div>
            </>
          )}


          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
