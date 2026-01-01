"use client"
import React from "react";
import Image from "next/image";

// Custom icon components with enhanced styling
const FlagIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2H21l-3 6 3 6h-8.5l-1-2H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const AwardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const MedalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="5" strokeWidth={2}/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13l-4 8 2-1 2-3 2 3 2 1-4-8z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h14l-2-6V7a4 4 0 00-8 0v4L7 17zM7 17v1a2 2 0 002 2h6a2 2 0 002-2v-1M6 7H2v3c0 1 1 2 2 2h2M18 7h4v3c0 1-1 2-2 2h-2"/>
  </svg>
);

const CrownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l4 6 4-7 4 7 4-6v13a1 1 0 01-1 1H6a1 1 0 01-1-1V3z" />
  </svg>
);

export default function JourneyTimeline() {
  const timelineData = [
    {
      icon: <FlagIcon />,
      title: "Journey Began",
      date: "January 15, 2025",
      desc: "Started my simulated freelance journey on Ficlance. Completed onboarding and set up my initial profile.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      textColor: "text-blue-600",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: <AwardIcon />,
      title: "First Project Completed",
      date: "February 3, 2025",
      desc: 'Successfully delivered my first e-commerce project with a 5-star rating. Earned "First Win" badge.',
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-500",
      textColor: "text-emerald-600",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      icon: <MedalIcon />,
      title: "Level Up: Intermediate",
      date: "March 20, 2025",
      desc: "Advanced to Intermediate level after completing 5 projects with an average rating of 4.8. Unlocked new project types.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      textColor: "text-purple-600",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      icon: <TrophyIcon />,
      title: "Specialization Achieved",
      date: "April 15, 2025",
      desc: 'Earned "Frontend Expert" specialization after completing multiple UI-focused projects with exceptional feedback.',
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
      textColor: "text-orange-600",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      icon: <CrownIcon />,
      title: "Level Up: Advanced",
      date: "June 10, 2025",
      desc: "Reached Advanced level status after completing 12 projects. Unlocked premium project opportunities and mentorship features.",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-500",
      textColor: "text-amber-600",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            Professional Journey
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            Tracking growth and achievements throughout my freelance career journey, 
            showcasing key milestones and professional development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-purple-300 to-emerald-200 hidden md:block rounded-full shadow-sm"></div>
          {timelineData.map((item, index) => (
            <div key={index} className={`relative flex items-center mb-20 last:mb-0 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
              {/* Timeline Card */}
              <div className={`group relative w-full md:w-5/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-start mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center text-white mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                      <p className="text-sm font-semibold text-gray-500 mt-2">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}