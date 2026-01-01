"use client";

import React, { useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

export default function MessageInput({
  message,
  setMessage,
  onSend,
  isSending,
  onGitHubClick,
  disabled = false,
}) {
  const messageInputRef = useRef(null);
  const sendingRef = useRef(false);

  const handleSend = () => {
    // Prevent duplicate sends
    if (sendingRef.current || isSending || !message.trim() || disabled) return;
    
    sendingRef.current = true;
    onSend();
    
    // Reset after a short delay
    setTimeout(() => {
      sendingRef.current = false;
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <div className="border dark:bg-card bg-card shadow-[0_-10px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_14px_6px_rgba(0,0,0,0.6)] rounded-lg p-2 flex flex-col">
        <textarea
          ref={messageInputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled || isSending}
          className="min-h-[60px] sm:min-h-[40px] p-2 outline-none text-sm sm:text-base overflow-y-auto max-h-32 resize-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <div className="flex justify-between items-center p-2 border-t">
          <div className="flex space-x-2">
            <button
              onClick={onGitHubClick}
              type="button"
              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-card-foreground text-foreground transition-colors touch-manipulation"
              title="GitHub Feedback"
            >
              <FaGithub className="text-base sm:text-base" size={20} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={disabled || isSending || !message.trim()}
            className="rounded-button text-sm sm:text-base flex items-center gap-2 hover:rotate-45 transition-all duration-200 ease-in-out hover:bg-secondary dark:hover:bg-card-foreground hover:text-primary dark:hover:text-forground rounded-full p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:rotate-0"
          >
            {isSending ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                <span className="hidden sm:inline">...</span>
              </>
            ) : (
              <>
                <RiSendPlaneFill size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
