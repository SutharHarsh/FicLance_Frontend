"use client";

import React, { useState, useEffect } from "react";
import ConversationList from "./ConversationList";

export default function LeftSidebar({ 
  showLeftSidebar, 
  setShowLeftSidebar, 
  onConversationClick,
  showChatView
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      {/* {!showChatView && (
        <button
          onClick={() => setShowLeftSidebar(!showLeftSidebar)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-primary text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
          title="Toggle conversations"
        >
          <i
            className={`ri-${showLeftSidebar ? "close" : "menu"}-line text-lg`}
          ></i>
        </button>
      )} */}

      {/* Sidebar Container */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          w-full sm:w-80 lg:w-80
          bg-card border-r border-border
          transition-transform duration-300 ease-in-out
          ${showLeftSidebar || !showChatView ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${showChatView ? "hidden lg:block" : "block"}
        `}
      >
        <ConversationList onItemClick={onConversationClick} />
      </div>

      {/* Mobile Overlay */}
      {showLeftSidebar && showChatView && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowLeftSidebar(false)}
        ></div>
      )}
    </>
  );
}
