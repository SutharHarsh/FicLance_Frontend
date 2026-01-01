"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";

export default function HelpDeskSearch({ placeholder, value, onChange }) {
  return (
    <div className="relative max-w-2xl mx-auto w-full group">
      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-300 opacity-50"></div>
      <div className="relative flex items-center bg-card border border-border rounded-2xl p-2 shadow-2xl overflow-hidden focus-within:ring-2 ring-primary/50 transition-all duration-300">
        <div className="pl-4 pr-3 text-muted-foreground">
          <FiSearch className="text-xl" />
        </div>
        <input
          type="text"
          className="w-full bg-transparent border-none focus:outline-none text-foreground py-3 text-lg placeholder:text-muted-foreground/60"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors hidden sm:block">
          Search
        </button>
      </div>
    </div>
  );
}
