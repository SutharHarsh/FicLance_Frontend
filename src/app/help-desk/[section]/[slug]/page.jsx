"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import HelpDeskLayout from "@/components/HelpDesk/HelpDeskLayout";
import SupportTicketModal from "@/components/HelpDesk/SupportTicketModal";
import { helpDeskData } from "@/data/help-desk";
import {
  FiChevronRight,
  FiClock,
  FiShare2,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "motion/react";

export default function ArticlePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const { section: sectionId, slug } = params;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = helpDeskData[lang] || helpDeskData.en;
  const section = data.sections.find((s) => s.id === sectionId);
  const article = section?.articles.find((a) => a.slug === slug);

  // SEO
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | FicLance Knowledge Base`;
    }
  }, [article]);

  // Generate Table of Contents
  const toc = useMemo(() => {
    if (!article?.content) return [];
    const h3Match = article.content.match(/###\s+(.*)/g);
    if (!h3Match) return [];
    return h3Match.map((h) => h.replace("### ", ""));
  }, [article?.content]);

  if (!article) {
    return (
      <HelpDeskLayout showSearch={false}>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-6 text-foreground">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-10">
            The comprehensive guide you are looking for may have been relocated.
          </p>
          <Link
            href={`/help-desk?lang=${lang}`}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition-all inline-block"
          >
            Return to Help Center
          </Link>
        </div>
      </HelpDeskLayout>
    );
  }

  const renderContent = (content) => {
    if (!content) return "";
    return content
      .replace(
        /^###\s+(.*$)/gm,
        '<h3 class="text-2xl mt-12 mb-6 flex items-center gap-3 text-foreground" id="$1">$1</h3>'
      )
      .replace(
        /^##\s+(.*$)/gm,
        '<h2 class="text-3xl mt-16 mb-8 border-b border-border pb-4 text-foreground">$1</h2>'
      )
      .replace(
        /^#\s+(.*$)/gm,
        '<h1 class="text-4xl mb-12 text-foreground">$1</h1>'
      )
      .replace(
        /^- \*\*(.*)\*\*/gm,
        '<li class="mb-3 text-lg"><strong class="text-primary">$1</strong></li>'
      )
      .replace(
        /^\d\.\s+\*\*(.*)\*\*/gm,
        '<li class="mb-4 text-lg"><strong class="text-primary">$1</strong></li>'
      )
      .replace(
        /^🔹\s+(.*$)/gm,
        '<div class="p-8 bg-primary/5 rounded-[2rem] border-l-4 border-primary my-12 relative overflow-hidden group shadow-2xl"><div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div><p class="relative z-10 text-xl font-medium leading-relaxed italic text-foreground/90 font-serif">$1</p></div>'
      )
      .replace(/\n\n/g, '<p class="mb-8 leading-relaxed">');
  };

  return (
    <HelpDeskLayout showSearch={false}>
      <SupportTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Article Hero */}
      <div className="relative border-b border-border bg-secondary/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10 max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link
              href={`/help-desk?lang=${lang}`}
              className="hover:text-primary transition-colors"
            >
              KNOWLEDGE BASE
            </Link>
            <FiChevronRight className="text-border" />
            <Link
              href={`/help-desk/${sectionId}?lang=${lang}`}
              className="hover:text-primary transition-colors"
            >
              {section.title.toUpperCase()}
            </Link>
            <FiChevronRight className="text-border" />
            <span className="text-foreground">
              {article.title.toUpperCase()}
            </span>
          </nav>

          {/* Article Title */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight text-foreground"
          >
            {article.title}
          </motion.h1>

          {/* Article Metadata */}
          <div className="flex flex-wrap items-center gap-8 py-6 border-y border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                <FiClock />
              </div>
              <div>
                <span className="block text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                  Last Updated
                </span>
                <span className="text-sm font-bold text-foreground">
                  {article.updatedAt}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent border border-accent/10">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                  Status
                </span>
                <span className="text-sm font-bold text-foreground">
                  Verified by Support Team
                </span>
              </div>
            </div>

            <button className="ml-auto p-3 bg-muted border border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
              <FiShare2 className="text-xl group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Main Content */}
          <article className="lg:w-[65%] order-2 lg:order-1">
            <div
              className="prose prose-invert max-w-none 
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:text-lg
              prose-strong:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-li:text-muted-foreground prose-li:text-lg
              prose-img:rounded-3xl prose-img:shadow-2xl"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: renderContent(article.content),
                }}
              />
            </div>

            {/* Helpful feedback section */}
            <div className="mt-24 pt-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-10 bg-card p-12 rounded-[3rem] shadow-xl">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black mb-6 text-foreground">
                  Was this guide helpful?
                </h4>
                <div className="flex gap-4 justify-center md:justify-start">
                  <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-muted border border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all font-bold group">
                    <FiCheckCircle className="w-5 h-5" /> Yes
                  </button>
                  <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-muted border border-border hover:bg-destructive/20 hover:border-destructive hover:text-destructive transition-all font-bold group">
                    <FiArrowLeft className="rotate-180" /> No
                  </button>
                </div>
              </div>
              <Link
                href={`/help-desk?lang=${lang}`}
                className="flex items-center gap-3 px-8 py-4 bg-secondary border border-border rounded-2xl text-primary font-black group hover:border-primary/50 transition-all"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                EXPLORE HUB
              </Link>
            </div>
          </article>

          {/* Enhanced Sticky Sidebar */}
          <aside className="lg:w-[30%] order-1 lg:order-2">
            <div className="sticky top-32 space-y-8">
              {/* Table of Contents */}
              <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none"></div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-8 border-b border-border pb-4">
                  Guide Navigator
                </h4>
                <nav className="space-y-6">
                  {toc.length > 0 ? (
                    toc.map((item, idx) => (
                      <a
                        key={idx}
                        href={`#${item}`}
                        className="group flex items-start gap-4 text-sm font-bold text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px] group-hover:border-primary/50 group-hover:text-primary transition-all">
                          {idx + 1}
                        </span>
                        {item}
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No sub-sections available.
                    </p>
                  )}
                </nav>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-8 rounded-[2.5rem] border border-border relative overflow-hidden shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h4 className="text-xl font-black mb-4 text-foreground">
                  Need Expert Assistance?
                </h4>
                <p className="text-sm text-muted-foreground mb-8 leading-loose font-medium">
                  Our strategic support team is available 24/7 to resolve
                  complex operational or technical challenges.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black shadow-2xl hover:bg-primary/90 active:scale-95 transition-all text-sm uppercase tracking-widest"
                >
                  Connect Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </HelpDeskLayout>
  );
}
