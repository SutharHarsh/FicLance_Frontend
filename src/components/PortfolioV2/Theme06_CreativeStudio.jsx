"use client";

import React from "react";
import {
  getUserData,
  getProjectsData,
  getSkillsData,
  getContactData,
  getProfessionalData,
  getStatsData,
  getPortfolioSettings,
  formatExperienceLevel,
  generateSampleProjects,
  getProjectStatusColor,
} from "@/utils/portfolioHelpers";

/**
 * THEME 06: CREATIVE STUDIO
 * 
 * Philosophy:
 * - Asymmetric layouts, break the grid
 * - Controlled experimental design
 * - Studio/agency personality
 * - Bold decisions with discipline
 * - Feels bespoke, one-of-a-kind
 * 
 * Visual Language:
 * - Unexpected element placement
 * - Overlapping sections
 * - Bold typography mixed with whitespace
 * - Accent colors used strategically
 * - Every layout decision is intentional
 */

const ReadMore = ({ text, limit = 150 }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const shouldTruncate = text && text.length > limit;

  if (!shouldTruncate) return <p className="text-inherit leading-relaxed">{text}</p>;

  return (
    <div className="space-y-3">
      <p className="text-inherit leading-relaxed">
        {isExpanded ? text : `${text.substring(0, limit)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-black uppercase tracking-widest text-pink-500 hover:text-pink-400 transition-colors border-b border-pink-500/30 pb-0.5"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default function CreativeStudio({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const stats = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const displayProjects = projects.slice(0, 3);

  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
  ];

  const mockData = {
    hero: {
      name: user.name,
      title: formatExperienceLevel(user.experienceLevel),
      manifesto: user.tagline || user.bio || "Code is my canvas. Design is my language. Impact is my measure.",
    },
    featured: displayProjects.length > 0 ? {
      project: displayProjects[0].title,
      description: displayProjects[0].description,
      highlight: `Status: ${displayProjects[0].status}`,
    } : {
      project: "Featured Project",
      description: "Coming soon...",
      highlight: "In development",
    },
    work: displayProjects.map((project, idx) => ({
      title: project.title,
      type: project.status || "Project",
      year: new Date(project.createdAt).getFullYear().toString(),
      description: project.description,
      color: gradients[idx] || gradients[0],
    })),
    skills: {
      creative: skills.primary.slice(0, 4),
      technical: skills.primary.slice(4, 8),
      hybrid: skills.all.filter(s => !skills.primary.includes(s)).slice(0, 4),
    },
    availability: professional.availability ? `${professional.availability} Hr/Week` : "Accepting experimental projects and creative collaborations",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Hero - Asymmetric, bold */}
      <section className="min-h-[100dvh] relative flex items-center">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-cyan-500/30 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-5 md:px-16 w-full py-20 relative z-10">
          {/* Name - Large, offset */}
          <div className="ml-0 md:ml-20 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white leading-none mb-8 drop-shadow-2xl break-words">
              {mockData.hero.name.split(' ')[0]}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                {mockData.hero.name.split(' ')[1] || ''}
              </span>
            </h1>
          </div>

          {/* Title - Rotated element */}
          <div className="ml-0 md:ml-40 mb-12 flex flex-col items-center md:items-start">
            <div className="inline-block px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs md:text-sm uppercase tracking-widest font-bold rotate-2 shadow-2xl">
              {mockData.hero.title}
            </div>
          </div>

          {/* Manifesto - Offset box */}
          <div className="md:ml-auto md:w-2/3 mt-16">
            <div className="p-6 md:p-8 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border-l-4 border-pink-500 shadow-2xl backdrop-blur-sm">
              <div className="text-lg md:text-2xl font-medium leading-relaxed text-white">
                <ReadMore text={mockData.hero.manifesto} limit={200} />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-40 left-10 w-60 h-60 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20" />
      </section>

      {/* Featured Project - Full-bleed */}
      <section className="py-20 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="md:w-2/3">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-purple-400 mb-4 font-black">
              ★ Featured Work
            </div>
            <h2 className="text-2xl md:text-6xl font-black mb-6 leading-tight break-words">
              {mockData.featured.project}
            </h2>
            <div className="text-lg md:text-2xl text-gray-300 font-light mb-6">
              <ReadMore text={mockData.featured.description} limit={150} />
            </div>
            <p className="text-xs md:text-sm text-cyan-400 uppercase tracking-widest font-bold">
              {mockData.featured.highlight}
            </p>
          </div>
        </div>

        {/* Abstract shape */}
        <div className="absolute -right-20 top-10 w-80 h-80 border-4 border-white/10 rounded-full" />
      </section>

      {/* Work Grid - Broken grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-16">
            Selected Projects
          </h2>

          <div className="space-y-20">
            {mockData.work.map((project, idx) => (
              <article
                key={idx}
                className={`flex flex-col md:flex-row gap-8 items-start ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Project Number - Large */}
                <div className="md:w-1/4">
                  <div className="text-4xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br opacity-50 select-none">
                    0{idx + 1}
                  </div>
                </div>

                {/* Project Content */}
                <div className="md:w-3/4 space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      {project.type} · {project.year}
                    </div>
                    <h3 className={`text-2xl md:text-5xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-4`}>
                      {project.title}
                    </h3>
                  </div>

                  <div className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    <ReadMore text={project.description} limit={180} />
                  </div>

                  {/* Decorative line */}
                  <div className={`h-1 w-32 bg-gradient-to-r ${project.color} rounded-full`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills - Overlapping sections */}
      <section className="py-20 md:py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Primary Skills */}
            {skills.primary && skills.primary.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-pink-400">Primary Skills</h3>
                <ul className="space-y-3">
                  {skills.primary.map((skill, idx) => (
                    <li key={idx} className="text-gray-300">{typeof skill === 'string' ? skill : skill.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Secondary Skills */}
            {skills.secondary && skills.secondary.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-purple-400">Secondary Skills</h3>
                <ul className="space-y-3">
                  {skills.secondary.map((skill, idx) => (
                    <li key={idx} className="text-gray-300">{typeof skill === 'string' ? skill : skill.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools */}
            {skills.tools && skills.tools.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400">Tools & Tech</h3>
                <ul className="space-y-3">
                  {skills.tools.map((skill, idx) => (
                    <li key={idx} className="text-gray-300">{typeof skill === 'string' ? skill : skill.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Decorative gradient blob */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" />
      </section>

      {/* Custom Sections */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-20 md:py-32 ${idx % 2 === 0 ? "bg-black" : "bg-gray-900/50"}`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8 md:mb-12">
              {section.title}
            </h2>
            <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-relaxed">
              <ReadMore text={section.content} limit={300} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA - Bold and direct */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-16 text-center">
          <div className="inline-block p-6 md:p-12 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-3xl w-full md:w-auto">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-8">
              {mockData.availability}
            </h2>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-block px-8 py-4 bg-white text-black rounded-full font-black hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm"
              >
                Let's Create Something
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
