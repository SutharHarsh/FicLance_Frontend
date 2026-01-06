"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HelpDeskLayout from "@/components/HelpDesk/HelpDeskLayout";
import HelpDeskCard from "@/components/HelpDesk/HelpDeskCard";
import SupportTicketModal from "@/components/HelpDesk/SupportTicketModal";
import { helpDeskData } from "@/data/help-desk";
import { motion } from "motion/react";
import { FiFileText } from "react-icons/fi";
import { useDynamicSEO, pageMetadata } from "@/lib/seo";

export default function HelpDeskPage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const data = helpDeskData[lang] || helpDeskData.en;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply dynamic SEO for help desk
  useDynamicSEO(pageMetadata.helpDesk);

  return (
    <HelpDeskLayout>
      <SupportTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="container mx-auto px-4 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {data.sections.map((section) => (
            <HelpDeskCard key={section.id} section={section} lang={lang} />
          ))}
        </motion.div>

        {/* Professional Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-32 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative bg-card border border-border rounded-[3rem] p-12 lg:p-20 flex flex-col items-center text-center overflow-hidden shadow-2xl">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center text-primary text-4xl mb-8 mx-auto shadow-xl">
                <FiFileText />
              </div>

              <h2 className="text-4xl lg:text-5xl font-black mb-8 tracking-tight text-foreground font-['Poppins']">
                Can't find what you're <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  looking for?
                </span>
              </h2>

              <p className="text-muted-foreground text-lg mb-12 leading-loose font-medium font-['Poppins']">
                Our strategic advisory team is on standby to provide
                high-precision technical support and platform guidance for your
                unique business needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-['Poppins']"
                >
                  Submit Support Ticket
                </button>
                <button className="px-10 py-5 bg-secondary border border-border text-foreground rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-secondary/80 transition-all font-['Poppins']">
                  Live Chat <span className="text-primary ml-2">•</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </HelpDeskLayout>
  );
}
