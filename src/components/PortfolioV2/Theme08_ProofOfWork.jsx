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
  formatDate,
  formatExperienceLevel,
  getInitials,
  getProjectStatusColor,
} from "@/utils/portfolioHelpers";

/**
 * THEME 08: PROOF OF WORK
 * 
 * Philosophy:
 * - Credibility-first approach
 * - Data-backed storytelling
 * - Outcomes over claims
 * - Trust-building design
 * - "Here is evidence, not promises"
 * 
 * Visual Language:
 * - Numbers and metrics prominent
 * - Before/after comparisons
 * - Client testimonials as proof
 * - Documented success patterns
 * - Professional, trustworthy aesthetic
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
        className="ml-2 text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-900/10 hover:border-gray-900 transition-colors"
      >
        {isExpanded ? "Less" : "More"}
      </button>
    </span>
  );
};

export default function ProofOfWork({ data }) {
  const user = getUserData(data);
  const projects = getProjectsData(data);
  const skills = getSkillsData(data);
  const contact = getContactData(data);
  const professional = getProfessionalData(data);
  const statsData = getStatsData(data);
  const settings = getPortfolioSettings(data);

  const displayProjects = projects.slice(0, 3);

  const mockData = {
    user: {
      name: user.name,
      credential: formatExperienceLevel(user.experienceLevel),
      statement: user.tagline || user.bio || "I optimize systems. Numbers don't lie.",
    },
    verified_impact: {
      total_projects: statsData.totalProjects || projects.length,
      completed_projects: statsData.completedProjects || 0,
      active_projects: statsData.activeProjects || 0,
      badges: statsData.badgesCount || 0,
      skills: statsData.skillsCount || 0,
    },
    case_studies: displayProjects.map(project => ({
      client: project.title,
      challenge: {
        description: project.description || "Project challenge and requirements",
        metrics: {
          metric1: `Status: ${project.status}`,
          metric2: `Priority: ${project.priority || 'Medium'}`,
          metric3: `Started: ${formatDate(project.createdAt)}`
        },
      },
      solution: {
        approach: (project.tags || skills.primary.slice(0, 3)).join(', ') || "Comprehensive solution approach",
        timeline: formatDate(project.createdAt),
      },
      results: {
        metrics: {
          progress: `${project.progress || 0}% Complete`,
          status: project.status,
          priority: project.priority || 'Medium'
        },
        roi: `Project delivered successfully`,
      },
      proof: project.tags || skills.primary.slice(0, 3) || ['Delivered on time', 'Met all requirements', 'Client satisfaction achieved'],
    })),
    testimonials: [
      {
        quote: "Excellent work and professional service.",
        author: professional.testimonial?.author || "Previous Client",
        context: "After project completion",
      },
      {
        quote: "Best investment we made. Results were immediate.",
        author: "Satisfied Client",
        context: "Project optimization",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 text-gray-900 overflow-x-hidden">
      {/* Header - Professional, no-nonsense */}
      <header className="border-b-4 md:border-b-8 border-gray-900 py-12 md:py-16 px-5 md:px-8 bg-gradient-to-br from-orange-100 to-yellow-100 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="border-4 md:border-8 border-gray-900 p-5 md:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300">
            <p className="text-sm uppercase tracking-widest text-gray-900 mb-4 font-black">✓ VERIFIED PORTFOLIO</p>
            <h1 className="text-3xl md:text-7xl font-black text-gray-900 mb-4 leading-tight break-words">
              {mockData.user.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-900 font-black mb-4 uppercase tracking-tight">{mockData.user.credential}</p>
            <div className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed">
              <ReadMore text={mockData.user.statement} limit={150} />
            </div>
          </div>
        </div>
      </header>

      {/* Verified Impact - Data dashboard style */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-gray-50 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-8 font-bold">
            Member Since {formatDate(data?.activity?.joinedDate)}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {Object.entries(mockData.verified_impact).map(([key, value]) => (
              <div key={key} className="bg-white p-3 md:p-6 rounded border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-xl md:text-4xl font-black text-gray-900 mb-2 truncate">{value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-black">
                  {key.replace(/_/g, ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies - Detailed proof */}
      <section className="py-16 md:py-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-12 font-bold">
            Case Studies with Verified Results
          </h2>

          <div className="space-y-20">
            {mockData.case_studies.map((study, idx) => (
              <article key={idx} className="border-2 border-gray-900 rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Client */}
                <div className="bg-gray-900 text-white px-6 md:px-8 py-4">
                  <h3 className="text-xl md:text-2xl font-bold">Case Study {idx + 1}: {study.client}</h3>
                </div>

                <div className="p-8 space-y-8">
                  {/* Challenge */}
                  <div>
                    <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] text-red-600 font-black mb-4 flex items-center gap-2">
                      <span className="text-lg">❌</span> The Problem
                    </h4>
                    <div className="text-base md:text-lg text-gray-800 mb-6 font-medium">
                      <ReadMore text={study.challenge.description} limit={150} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 bg-red-50 p-4 md:p-6 rounded border-2 border-red-200">
                      {Object.entries(study.challenge.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-xl md:text-2xl font-black text-red-700">{value}</div>
                          <div className="text-[10px] uppercase text-gray-500 font-bold">{key.replace(/_/g, ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] text-blue-600 font-black mb-4 flex items-center gap-2">
                      <span className="text-lg">🔧</span> The Solution
                    </h4>
                    <p className="text-base md:text-lg text-gray-800 mb-2 font-medium">{study.solution.approach}</p>
                    <p className="text-[10px] md:text-sm text-gray-500 font-bold">TIMELINE: {study.solution.timeline}</p>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] text-green-600 font-black mb-4 flex items-center gap-2">
                      <span className="text-lg">✓</span> The Results
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 bg-green-50 p-4 md:p-6 rounded border-2 border-green-200 mb-4">
                      {Object.entries(study.results.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-xl md:text-2xl font-black text-green-700">{value}</div>
                          <div className="text-[10px] uppercase text-gray-500 font-bold">{key.replace(/_/g, ' ')}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-base md:text-lg font-black text-gray-900 border-l-4 border-green-500 pl-4">{study.results.roi}</p>
                  </div>

                  {/* Proof Points */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-600 font-bold mb-4">
                      📊 Documented Proof
                    </h4>
                    <ul className="space-y-2">
                      {study.proof.map((item, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-3 text-gray-800">
                          <span className="text-green-600 font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Social proof */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-gray-50 border-t-2 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-12 font-bold">
            Client Testimonials
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {mockData.testimonials.map((test, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full">
                <div className="text-lg md:text-2xl font-bold text-gray-900 mb-6 italic leading-relaxed">
                  "{test.quote}"
                </div>
                <div className="text-xs md:text-sm text-gray-600 uppercase tracking-widest font-black">
                  <div className="text-gray-900 mb-1">{test.author}</div>
                  <div>{test.context}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Sections */}
      {settings.customSections.map((section, idx) => (
        <section
          key={idx}
          className={`py-12 md:py-16 px-5 md:px-8 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b-2 border-gray-200`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-8 font-bold">
              {section.title}
            </h2>
            <div className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed border-l-4 border-gray-900 pl-6">
              <ReadMore text={section.content} limit={300} />
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 md:py-20 px-5 md:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">Results-Driven Performance Engineering</h3>
          <p className="text-lg md:text-xl mb-10 opacity-80 font-medium">
            Available for select optimization projects. Minimum engagement: 4 weeks.
          </p>
          <button className="w-full md:w-auto px-10 py-5 bg-white text-gray-900 rounded font-black hover:bg-gray-100 transition-all hover:scale-105 uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]">
            Discuss Your Challenges
          </button>
        </div>
      </section>
    </div>
  );
}
