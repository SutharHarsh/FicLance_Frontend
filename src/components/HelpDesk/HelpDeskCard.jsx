"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HelpDeskCard({ section, lang }) {
  const href = section.link || `/help-desk/${section.id}?lang=${lang}`;
  const articleText = section.isExternal 
    ? "View All Badges" 
    : `${section.articleCount} Articles`;

  return (
    <Link
      href={href}
      target="_blank"
      className="group relative bg-card border border-border rounded-[2rem] p-8 lg:p-10 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col items-start text-left shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 w-16 h-16 bg-foreground/[0.03] border border-border rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500 shadow-xl">
        {section.icon}
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors flex items-center gap-3 font-['Poppins']">
          {section.title}
          <FiArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary text-xl" />
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-8 text-base font-['Poppins']">
          {section.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-4 text-sm font-bold tracking-wide uppercase text-muted-foreground">
        {!section.isExternal && (
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-foreground/10 to-transparent"></div>
              </div>
            ))}
          </div>
        )}
        <span className="group-hover:text-foreground transition-colors">
          {articleText}
        </span>
      </div>

      {/* Corner Accent */}
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
    </Link>
  );
}
