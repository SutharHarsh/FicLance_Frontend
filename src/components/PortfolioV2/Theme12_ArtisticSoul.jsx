"use client";

import React from "react";
import { Palette, Layers, Sparkles, Star, Heart, Camera, Pen, Coffee } from "lucide-react";
import {
  getUserData,
  getProjectsData,
  getSkillsData,
  getContactData,
  getProfessionalData,
  getPortfolioSettings,
  getStatsData,
  getProjectStatusColor,
  formatExperienceLevel,
} from "@/utils/portfolioHelpers";

const ReadMore = ({ text, limit = 150 }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const shouldTruncate = text && text.length > limit;

  if (!shouldTruncate) return <span className="text-inherit leading-relaxed whitespace-pre-wrap">{text}</span>;

  return (
    <span className="inline">
      <span className="text-inherit leading-relaxed">
        {isExpanded ? text : `${text.substring(0, limit)}...`}
      </span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 border-b border-rose-600/30 hover:border-rose-600 transition-colors"
      >
        {isExpanded ? "Close" : "Expand"}
      </button>
    </span>
  );
};

/**
 * THEME 12: ARTISTIC SOUL
 * Warm, handcrafted design for artists and creators
 */

export default function ArtisticSoul({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const stats = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  const displayProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 text-gray-900 overflow-x-hidden">
      {/* Hero - Artistic & Warm */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-multiply filter blur-xl animate-pulse"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `linear-gradient(${Math.random() * 360}deg, 
                  rgba(251, 191, 36, 0.3), 
                  rgba(251, 113, 133, 0.3), 
                  rgba(167, 139, 250, 0.3))`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Palette className="w-8 h-8 md:w-10 md:h-10 text-rose-500" />
            <Pen className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
            <Camera className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent leading-tight break-words">
            {user.name}
          </h1>

          <div className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-xl mb-8">
            <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              {formatExperienceLevel(user.experienceLevel)}
            </p>
          </div>

          <div className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            <ReadMore text={user.bio || user.tagline || 'Creating meaningful art and design experiences'} limit={150} />
          </div>
        </div>
      </section>

      {/* Collections */}
      {isActive("Projects") && (
        <section className="py-20 md:py-32 px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-black mb-12 md:mb-16 text-center bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent leading-tight break-words px-4">
              Art Collections
            </h2>

            <div className="space-y-12">
              {displayProjects.map((project, idx) => {
                const gradients = [
                  'from-amber-400 via-rose-400 to-purple-500',
                  'from-emerald-400 via-teal-400 to-cyan-500',
                  'from-orange-400 via-red-400 to-pink-500'
                ];
                return (
                  <div key={project.id || idx} className={`bg-gradient-to-br ${gradients[idx % gradients.length]} rounded-3xl md:rounded-[4rem] p-6 sm:p-8 md:p-16 text-white shadow-2xl transition-all`}>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-2/3">
                        <div className="text-xs md:text-sm font-black mb-3 opacity-90 uppercase tracking-widest">{project.category || 'Project'}</div>
                        <h3 className="text-2xl md:text-5xl font-black mb-4 leading-tight break-words">{project.title}</h3>
                        <div className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed italic">
                          <ReadMore text={project.description || 'No description available'} limit={150} />
                        </div>
                        {project.status && (
                          <div className="inline-block px-5 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                            <span className="text-sm font-black">Status: {project.status}</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full md:w-1/3 h-48 md:h-64 bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl flex items-center justify-center">
                        <Layers className="w-20 h-20 md:w-32 md:h-32 text-white/30" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Recognition */}
      {isActive("Skills") && (
        <section className="py-20 md:py-32 px-5 md:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 text-center text-gray-900 break-words px-4">Skills & Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {skills.primary && skills.primary.slice(0, 3).map((skill, idx) => {
                const icons = [<Star className="w-6 h-6" />, <Sparkles className="w-6 h-6" />, <Heart className="w-6 h-6" />];
                return (
                  <div key={idx} className="bg-gradient-to-br from-white to-rose-50 rounded-3xl p-8 shadow-xl text-center hover:shadow-2xl transition-shadow">
                    <div className="bg-gradient-to-br from-rose-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      {icons[idx % icons.length]}
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-gray-900">{typeof skill === 'string' ? skill : skill.name}</h3>
                    <p className="text-gray-600 font-medium">Expert Level</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Custom Chapters */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-20 md:py-32 px-5 md:px-8 ${idx % 2 === 0 ? "bg-white/30" : "bg-transparent"}`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 text-gray-900 leading-tight break-words pr-4">
              {section.title}
            </h2>
            <div className="text-lg md:text-2xl text-gray-700 leading-relaxed font-medium italic">
              <ReadMore text={section.content} limit={300} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      {isActive("Contact") && (
        <section className="py-20 md:py-32 px-5 md:px-8 shadow-inner">
          <div className="max-w-4xl mx-auto text-center">
            <Coffee className="w-12 h-12 md:w-16 md:h-16 text-amber-500 mx-auto mb-8" />
            <h2 className="text-3xl md:text-6xl font-black mb-8 bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent leading-tight break-words px-4">
              Let's Create Something Beautiful
            </h2>
            <div className="text-lg md:text-2xl text-gray-700 mb-12 font-medium">
              <ReadMore text="Commissions and collaborations always welcome. Let's talk about your next project." limit={100} />
            </div>
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="inline-block px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 text-white rounded-full text-lg md:text-xl font-black hover:shadow-2xl hover:shadow-rose-500/50 transition-all hover:scale-105">
                Commission Artwork
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
