"use client";

import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import HelpDeskLayout from "@/components/HelpDesk/HelpDeskLayout";
import { helpDeskData } from "@/data/help-desk";
import {
  FiChevronRight,
  FiFileText,
  FiArrowLeft,
  FiClock,
} from "react-icons/fi";
import { motion } from "motion/react";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const { section: sectionId } = params;

  const data = helpDeskData[lang] || helpDeskData.en;
  const section = data.sections.find((s) => s.id === sectionId);

  // SEO
  useEffect(() => {
    if (section) {
      document.title = `${section.title} | FicLance Knowledge Base`;
    }
  }, [section]);

  if (!section) {
    return (
      <HelpDeskLayout showSearch={false}>
        <div className="container mx-auto px-4 py-32 text-center text-foreground">
          <h1 className="text-4xl font-bold mb-6">Expert Guide Not Found</h1>
          <p className="text-muted-foreground mb-10">
            We couldn't locate the specific documentation category in our
            strategic database.
          </p>
          <Link
            href={`/help-desk?lang=${lang}`}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition-all inline-block"
          >
            Back to Help Center
          </Link>
        </div>
      </HelpDeskLayout>
    );
  }

  return (
    <HelpDeskLayout showSearch={false}>
      {/* Category Hero */}
      <div className="relative border-b border-border bg-secondary/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
          <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-10">
            <Link
              href={`/help-desk?lang=${lang}`}
              className="hover:text-primary transition-colors"
            >
              KNOWLEDGE BASE
            </Link>
            <FiChevronRight className="text-border" />
            <span className="text-foreground">
              {section.title.toUpperCase()}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="w-24 h-24 bg-card border border-border rounded-[2rem] flex items-center justify-center text-6xl shadow-2xl">
              {section.icon}
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-foreground"
              >
                {section.title}
              </motion.h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
                {section.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 max-w-5xl">
        <div className="bg-card border border-border rounded-[3rem] overflow-hidden shadow-2xl relative translate-y-[-40px]">
          <div className="p-10 border-b border-border bg-foreground/[0.02] flex items-center justify-between">
            <h2 className="font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 text-muted-foreground">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Strategic Guides ({section.articles.length})
            </h2>
          </div>

          <div className="divide-y divide-border">
            {section.articles.map((article, idx) => (
              <Link
                key={article.slug}
                href={`/help-desk/${sectionId}/${article.slug}?lang=${lang}`}
                target="_blank"
                className="flex items-center justify-between p-10 hover:bg-primary/5 transition-all group relative overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-16 h-16 bg-muted border border-border rounded-2xl flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl group-hover:scale-110">
                    <FiFileText className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground group-hover:text-muted-foreground transition-colors">
                      <span className="flex items-center gap-2">
                        <FiClock /> {article.updatedAt}
                      </span>
                      <span className="w-1 h-1 bg-border rounded-full"></span>
                      <span className="text-primary/70">Expert Verified</span>
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:translate-x-2 transition-all duration-500">
                  <FiChevronRight className="text-xl" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href={`/help-desk?lang=${lang}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary border border-border rounded-2xl text-primary font-black group hover:border-primary/50 transition-all uppercase tracking-widest text-sm"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Knowledge Base
          </Link>
        </div>
      </div>
    </HelpDeskLayout>
  );
}
