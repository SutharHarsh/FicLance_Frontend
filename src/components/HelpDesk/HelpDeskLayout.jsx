"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiGlobe, FiArrowLeft, FiSearch } from "react-icons/fi";
import { motion } from "motion/react";

export default function HelpDeskLayout({ children, showSearch = true }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const [searchQuery, setSearchQuery] = useState("");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
  ];

  const handleLanguageChange = (code) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", code);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-['Poppins'] selection:bg-primary selection:text-primary-foreground transition-colors duration-300">
      {/* Background Orbs for Premium Feel */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href={`/help-desk?lang=${lang}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-[0_0_20px_rgba(var(--primary),0.3)] group-hover:scale-110 transition-transform duration-300">
                F
              </div>
              <span className="text-xl font-black tracking-tight flex items-center gap-1.5 text-foreground font-['Poppins']">
                FICLANCE{" "}
                <span className="text-primary font-medium tracking-normal opacity-90 font-['Poppins']">
                  Help Center
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium hover:bg-secondary/80 transition-all">
                <FiGlobe className="text-primary" />
                {languages.find((l) => l.code === lang)?.name}
              </button>
              <div className="absolute right-0 top-full mt-2 w-40 bg-card border border-border rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-[60]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className="w-full text-left px-5 py-3 hover:bg-muted transition-colors text-sm font-medium"
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/dashboard"
              className="text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {showSearch && (
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              Support Knowledge Base
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1] text-foreground font-['Poppins']"
            >
              How can we <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                help you today?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium font-['Poppins']"
            >
              Search our comprehensive expert guides, platform documentation,
              and strategic resources to accelerate your journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2rem] blur opacity-75 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    // You can implement actual search logic here
                    console.log("Searching for:", searchQuery);
                    // For now, just scroll to content
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }
                }}
                className="relative flex items-center"
              >
                <FiSearch className="absolute left-6 text-2xl text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search for topics, guides, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-20 pl-16 pr-6 rounded-2xl bg-card border border-border group-focus-within:border-primary/50 outline-none text-lg transition-all shadow-2xl placeholder:text-muted-foreground/60 text-foreground font-['Poppins']"
                />
                <button 
                  type="submit"
                  className="absolute right-3 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 hidden sm:block font-['Poppins']"
                >
                  Search
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="transition-all duration-500">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <strong>FicLance</strong> &copy; {new Date().getFullYear()}
          </div>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
