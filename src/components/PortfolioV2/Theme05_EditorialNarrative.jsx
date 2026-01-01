"use client";

import React from "react";
import {
  getUserData,
  getProjectsData,
  getSkillsData,
  getContactData,
  getProfessionalData,
  getPortfolioSettings,
  formatDate,
  formatExperienceLevel,
  generateSampleProjects,
} from "@/utils/portfolioHelpers";

/**
 * THEME 05: EDITORIAL NARRATIVE
 * 
 * Philosophy:
 * - Portfolio as a long-form story
 * - Scroll rhythm matters deeply
 * - Strong typographic pacing
 * - Emotional storytelling
 * - Each section feels authored
 * 
 * Visual Language:
 * - Chapter-based structure
 * - Pull quotes and callouts
 * - Editorial photography style
 * - Magazine-quality typography
 * - Narrative flow over data dumps
 */

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
        className="ml-2 text-sm font-bold text-gray-900 border-b-2 border-gray-900/10 hover:border-gray-900 transition-colors uppercase tracking-widest whitespace-nowrap"
      >
        {isExpanded ? "Less" : "More"}
      </button>
    </span>
  );
};

export default function EditorialNarrative({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  // Use real projects if available, otherwise generate samples
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : generateSampleProjects(3);

  // Build chapters dynamically based on active sections
  const chapters = [];
  let chapterCount = 0;

  // Chapter I: About
  if (isActive("About")) {
    chapterCount++;
    chapters.push({
      number: toRoman(chapterCount),
      title: "The Beginning",
      content: user.bio || formatExperienceLevel(professional.careerGoal) || "Every great project starts with a conversation. A client has a problem. They need more than code—they need someone who listens, who understands their vision, who can translate ideas into reality. This is where I come in.",
      pullQuote: "The best solutions come from asking better questions.",
      type: "about"
    });
  }

  // Chapter II: Experience (The Journey)
  if (isActive("Experience")) {
    chapterCount++;
    chapters.push({
      number: toRoman(chapterCount),
      title: "The Journey",
      content: professional.experience || "Experience is not just about time served; it's about the challenges faced and the solutions engineered. My path has been defined by continuous learning and delivering impact.",
      experiences: data.experiences && data.experiences.length > 0 ? data.experiences : null,
      fallbackProjects: (!data.experiences || data.experiences.length === 0) && projects.length > 0 ? projects.slice(0, 2) : null,
      type: "experience"
    });
  }

  // Chapter III: The Craft (Projects)
  if (isActive("Projects")) {
    chapterCount++;
    chapters.push({
      number: toRoman(chapterCount),
      title: "The Craft",
      content: "Building digital products isn't just about features and functions. It's about the feel of an interface. The flow of a user journey. The moments that make someone smile. I obsess over these details because they matter.",
      projects: displayProjects,
      type: "projects"
    });
  }

  // Chapter IV: The Lessons (Skills)
  if (isActive("Skills")) {
    chapterCount++;
    chapters.push({
      number: toRoman(chapterCount),
      title: "The Lessons",
      content: "Years of work have taught me things no bootcamp could. How to navigate changing requirements. How to advocate for users when stakeholders disagree. How to build systems that last.",
      insights: skills.all && skills.all.length > 0 ? skills.all.slice(0, 5).map(skill => `Expertise in ${skill}`) : ["Continuous Learning", "Problem Solving", "User Empathy"],
      type: "skills"
    });
  }

  // Custom Chapters
  settings.customSections.forEach((section) => {
    chapterCount++;
    chapters.push({
      number: toRoman(chapterCount),
      title: section.title,
      content: section.content,
      type: "custom"
    });
  });

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-900 overflow-x-hidden">
      {/* Opening - Like a book cover */}
      <section className="min-h-[100dvh] flex items-center justify-center px-5 md:px-8 bg-[#fafaf9]">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-serif text-gray-900 leading-tight break-words">
            The Work Speaks
          </h1>
          <div className="text-lg md:text-2xl text-gray-600 font-light italic">
            <ReadMore text={user.tagline || user.bio || "A story of craft, clients, and continuous growth"} limit={100} />
          </div>
          <div className="pt-12 space-y-2">
            <div className="text-lg text-gray-900">{user.name}</div>
            <p className="text-lg md:text-2xl text-gray-900/50 font-medium mb-10 tracking-widest uppercase">
              {formatExperienceLevel(user.experienceLevel)}
            </p>
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              {user.role}
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Render Loop */}
      {chapters.map((chapter, idx) => (
        <section key={idx} className="py-20 md:py-32 border-t border-gray-300">
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <div className="mb-10 md:mb-16">
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-4">
                Chapter {chapter.number}
              </div>
              <h2 className="text-2xl md:text-5xl font-serif text-gray-900 leading-tight">
                {chapter.title}
              </h2>
            </div>

            <div className="space-y-10 md:space-y-12">
              <div className="text-base md:text-2xl leading-relaxed text-gray-700 font-light">
                <ReadMore text={chapter.content} limit={200} />
              </div>

              {/* RENDER: About (Pull Quote) */}
              {chapter.type === "about" && chapter.pullQuote && (
                <blockquote className="border-l-4 border-gray-900 pl-6 md:pl-8 my-10 md:my-16">
                  <p className="text-lg md:text-3xl font-serif italic text-gray-900 leading-relaxed md:leading-relaxed">
                    "{chapter.pullQuote}"
                  </p>
                </blockquote>
              )}

              {/* RENDER: Experience (The Journey) */}
              {chapter.type === "experience" && (
                <div className="space-y-12 mt-16">
                  {/* 1. Real Experience */}
                  {chapter.experiences ? (
                    chapter.experiences.map((exp, eIdx) => (
                      <article key={eIdx} className="border-l-2 border-gray-200 pl-5 md:pl-8 py-2 relative">
                        <span className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                          <h3 className="text-lg md:text-2xl font-serif text-gray-900">{exp.company}</h3>
                          <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mt-1 md:mt-0">
                            {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}
                          </span>
                        </div>
                        <div className="text-base md:text-lg text-gray-600 mb-4 italic">{exp.position || exp.role}</div>
                        <div className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                          <ReadMore text={exp.description} limit={180} />
                        </div>
                      </article>
                    ))
                  ) : (
                    /* 2. Fallback Projects */
                    chapter.fallbackProjects ? (
                      chapter.fallbackProjects.map((proj, pIdx) => (
                        <article key={pIdx} className="border-l-2 border-gray-200 pl-8 py-2 relative">
                          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                            <h3 className="text-xl md:text-2xl font-serif text-gray-900">{proj.title}</h3>
                            <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                              {formatDate(proj.createdAt)}
                            </span>
                          </div>
                          <div className="text-lg text-gray-600 mb-4 italic">Project Lead</div>
                          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                            {proj.description}
                          </p>
                        </article>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No professional history recorded yet.</p>
                    )
                  )}
                </div>
              )}

              {/* RENDER: Projects (The Craft) */}
              {chapter.type === "projects" && (
                <div className="space-y-16 mt-16">
                  {chapter.projects.map((project, pIdx) => (
                    <article key={pIdx} className="space-y-6">
                      <h3 className="text-xl md:text-3xl font-serif text-gray-900 leading-tight">
                        {project.title}
                      </h3>
                      <div className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        <ReadMore text={project.description} limit={150} />
                      </div>
                      <div className="bg-gray-100 p-5 md:p-8 rounded-xl">
                        <div className="text-[10px] md:text-sm text-gray-500 uppercase font-black tracking-widest mb-3">
                          Project Details
                        </div>
                        <div className="text-base md:text-lg text-gray-800 leading-relaxed font-bold">
                          Status: {project.status || "Active"}
                          {project.progress !== undefined && ` | Progress: ${project.progress}%`}
                        </div>
                        {project.tags && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600 font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* RENDER: Skills (Insights) */}
              {chapter.type === "skills" && (
                <div className="space-y-6 mt-16">
                  {chapter.insights.map((insight, iIdx) => (
                    <div key={iIdx} className="flex gap-6 items-start">
                      <div className="text-4xl font-serif text-gray-300 leading-none">
                        {iIdx + 1}
                      </div>
                      <p className="text-xl text-gray-700 pt-2 leading-relaxed">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Closing */}
      {isActive("Contact") && (
        <section className="py-20 md:py-32 border-t border-gray-300 bg-white">
          <div className="max-w-4xl mx-auto px-5 md:px-8 text-center space-y-10 md:space-y-12">
            <h2 className="text-2xl md:text-5xl font-serif text-gray-900">
              What's Next
            </h2>
            <p className="text-lg md:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-light">
              I'm looking for projects that matter. Work that helps real people solve real problems. If that's you, let's talk.
            </p>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-block text-lg md:text-xl text-gray-900 underline decoration-2 underline-offset-8 hover:text-gray-600 transition-colors font-serif italic truncate max-w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.email}
              </a>
            )}
            <div className="flex justify-center gap-8 pt-8">
              {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">LinkedIn</a>}
              {contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">GitHub</a>}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-300">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {user.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper to convert number to Roman Numeral (for chapters)
function toRoman(num) {
  const roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let str = '';
  for (let i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
}

