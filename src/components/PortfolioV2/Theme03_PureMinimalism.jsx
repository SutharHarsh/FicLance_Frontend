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
} from "@/utils/portfolioHelpers";

/**
 * THEME 03: PURE MINIMALISM
 *
 * Philosophy:
 * - Extreme whitespace
 * - Editorial typography
 * - Museum-like calm
 * - No decorative backgrounds
 */


const ReadMore = ({ text, limit = 150, light = false }) => {
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
        className={`text-sm font-medium border-b ${light ? "border-gray-300 text-gray-400" : "border-gray-900 text-gray-900"
          } pb-0.5 hover:opacity-70 transition-opacity`}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default function PureMinimalism({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const settings = getPortfolioSettings(data);

  const isActive = (section) => settings.activeSections.includes(section);

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#111827] overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-32 w-full">
          <div className="max-w-5xl space-y-6 md:space-y-12">
            <h1 className="text-4xl sm:text-7xl md:text-[8rem] font-bold leading-[1] md:leading-[0.9] tracking-tighter break-words">
              {user.name}
            </h1>
            <p className="text-xl md:text-4xl font-semibold max-w-3xl leading-relaxed text-[#1f2937]">
              {formatExperienceLevel(user.experienceLevel)}
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      {isActive("About") && (
        <section className="py-24 md:py-40 bg-[#ffffff]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <div className="max-w-4xl text-xl md:text-5xl font-light leading-[1.4] text-[#111827]">
              <ReadMore
                text={user.bio || user.tagline || professional.summary}
                limit={200}
              />
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {isActive("Projects") && (
        <section className="py-20 md:py-32 bg-[#fcfcfd]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <h2 className="text-sm md:text-xl text-[#9ca3af] font-light uppercase tracking-widest mb-16 md:mb-24">
              Selected Works
            </h2>

            <div className="space-y-32 md:space-y-48">
              {projects.filter(p => !p.isManual).slice(0, 4).map((project, idx) => (
                <article key={idx} className="max-w-5xl">
                  <div className="mb-8 md:mb-16">
                    <span className="text-5xl md:text-8xl font-light text-[#d1d5db]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="space-y-6 md:space-y-12">
                    <h2 className="text-3xl md:text-6xl font-light text-[#111827]">
                      {project.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-12 text-sm md:text-xl text-[#6b7280] font-light uppercase tracking-wider">
                      <div>{project.status}</div>
                      <div>{formatDate(project.createdAt)}</div>
                      <div>{project.progress}%</div>
                    </div>

                    <div className="text-xl md:text-3xl font-light text-[#374151] leading-relaxed max-w-3xl">
                      <ReadMore text={project.description} limit={180} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {isActive("Experience") && (
        <section className="py-20 md:py-32 bg-[#f9fafb]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <h2 className="text-sm md:text-xl text-[#9ca3af] font-light uppercase tracking-widest mb-16 md:mb-24">
              Experience & Journey
            </h2>

            <div className="space-y-20 md:space-y-32">
              {data.experiences?.map((exp, idx) => (
                <article
                  key={idx}
                  className="max-w-4xl border-l border-[#e5e7eb] pl-6 md:pl-24"
                >
                  <div className="text-base md:text-lg text-[#9ca3af] mb-4 uppercase tracking-widest">
                    {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}
                  </div>
                  <h3 className="text-2xl md:text-5xl font-light mb-6">
                    {exp.company}
                  </h3>
                  <div className="text-lg md:text-xl text-[#4b5563] font-light leading-relaxed">
                    <ReadMore text={exp.description} limit={200} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SKILLS */}
      {isActive("Skills") && (
        <section className="py-24 md:py-40 bg-[#ffffff]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <h2 className="text-3xl md:text-6xl font-light mb-16 md:mb-32">
              Methods & Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-[#9ca3af] uppercase tracking-widest text-sm">Focus</h3>
                <p className="text-xl md:text-2xl text-[#4b5563] font-light">
                  {skills.primary.join(" • ")}
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-[#9ca3af] uppercase tracking-widest text-sm">Tech Stack</h3>
                <p className="text-xl md:text-2xl text-[#4b5563] font-light">
                  {skills.techStack.join(" • ")}
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 text-[#9ca3af] uppercase tracking-widest text-sm">Status</h3>
                <p className="text-xl md:text-2xl text-[#4b5563] font-light">
                  {professional.availability
                    ? `${professional.availability} Hr/Week`
                    : "Available"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CUSTOM SECTIONS */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-24 md:py-40 ${idx % 2 === 0 ? "bg-[#ffffff]" : "bg-[#fcfcfd]"}`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <h2 className="text-sm md:text-xl text-[#9ca3af] font-light uppercase tracking-widest mb-12 md:mb-16">
              {section.title}
            </h2>
            <div className="max-w-4xl text-xl md:text-3xl font-light leading-relaxed text-[#374151]">
              <ReadMore text={section.content} limit={300} />
            </div>
          </div>
        </section>
      ))}

      {/* CONTACT */}
      <section className="py-24 md:py-40 bg-[#fcfcfd]">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <div className="max-w-2xl space-y-8 md:space-y-12">
            <p className="text-xl md:text-2xl font-light text-[#4b5563]">
              Open to meaningful work.
            </p>

            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="block text-3xl md:text-7xl font-light hover:text-[#6b7280] transition-colors overflow-hidden truncate"
              >
                Let’s Talk →
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
