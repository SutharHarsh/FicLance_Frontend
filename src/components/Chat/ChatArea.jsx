"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import MessageRenderer from "./MessageRenderer";
import DeadlineNotification from "./DeadlineNotification";

export default function ChatArea({
  clientName,
  projectName,
  messages,
  clientTyping,
  message,
  setMessage,
  sendMessage,
  isSending,
  handleDownloadDocument,
  onInfoClick,
  isDetailsOpen,
  onGitHubClick,
  isLoading = false,
  isDeadlinePassed = false,
  isProjectCompleted = false,
  showChatView = true,
  onBackClick,
  deadline = null,
}) {
  const chatRef = useRef(null);

  const [showSkeleton, setShowSkeleton] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  /* Skeleton loader handling */
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
        requestAnimationFrame(() => setAnimateIn(true));
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
      setAnimateIn(false);
    }
  }, [isLoading]);

  /* Auto-scroll when new messages arrive */
  useEffect(() => {
    if (chatRef.current && !showSkeleton) {
      requestAnimationFrame(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      });
    }
  }, [messages, clientTyping, showSkeleton]);

  /* Scroll listener for arrow visibility */
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      setShowScrollButton(!isAtBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll to bottom action */
  const scrollToBottom = () => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const formatTime = (d) => {
    const date = new Date(d);
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const ampm = hrs >= 12 ? "PM" : "AM";
    return `${hrs % 12 || 12}:${mins < 10 ? "0" + mins : mins} ${ampm}`;
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "AI";

  const clientInitials = getInitials(clientName);

  const chatDateLabel = useMemo(() => {
    const date =
      messages?.length > 0 ? new Date(messages[0].createdAt) : new Date();
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }, [messages]);

  return (
    <div
      className={`
        flex-1 flex flex-col bg-background/95 min-w-0 relative
        ${showChatView ? "block" : "hidden lg:flex"}
      `}
    >
      {/* Header */}
      <ChatHeader
        onInfoClick={onInfoClick}
        isDetailsOpen={isDetailsOpen}
        clientName={clientName}
        projectName={projectName}
        isLoading={showSkeleton}
        onBackClick={onBackClick}
      />

      {/* Deadline notification */}
      {!showSkeleton && deadline && (
        <DeadlineNotification deadline={deadline} warningThresholdHours={24} />
      )}

      {/* CHAT SCROLL AREA */}
      <div
        ref={chatRef}
        className="flex-1 p-2 sm:p-4 overflow-y-auto no-scrollbar"
      >
        <div className="flex justify-center my-4">
          <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
            {chatDateLabel}
          </div>
        </div>

        {/* Skeleton */}
        {showSkeleton ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`flex ${i % 2 ? "justify-start" : "justify-end"}`}
              >
                <div className="w-3/4 rounded-2xl px-4 py-3 bg-card-foreground">
                  <div className="h-4 rounded w-2/3 mb-2 bg-muted" />
                  <div className="h-4 rounded w-1/2 bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`transition-all duration-300 ease-out ${
              animateIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            {messages.map((msg, index) => (
              <MessageRenderer
                key={msg._id || msg.id || index}
                msg={msg}
                isUser={msg.sender?.type === "user" || msg.from === "me"}
                clientInitials={clientInitials}
                formatTime={formatTime}
                handleDownloadDocument={handleDownloadDocument}
                projectName={projectName}
              />
            ))}
          </div>
        )}

        {clientTyping && <TypingIndicator clientInitials={clientInitials} />}
      </div>

      {/* SCROLL TO BOTTOM BUTTON (FIXED CORRECTLY) */}
      {showScrollButton && !showSkeleton && (
        <button
          onClick={scrollToBottom}
          className="
            absolute
            bottom-32
            left-1/2
            -translate-x-1/2
            bg-primary
            text-secondary
            rounded-full
            p-3
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-200
            hover:scale-110
            z-50
          "
          aria-label="Scroll to latest message"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}

      {/* Input / Disabled State */}
      {isDeadlinePassed && !showSkeleton ? (
        <div className="h-20 border-t bg-red-50 text-red-700 flex items-center justify-center gap-2">
          ⚠️ Deadline has passed. Messaging is disabled.
        </div>
      ) : (
        <div className="px-2 sm:px-4 pb-3 shadow-lg">
          <MessageInput
            message={message}
            setMessage={setMessage}
            onSend={sendMessage}
            isSending={isSending}
            onGitHubClick={onGitHubClick}
            disabled={showSkeleton}
          />
        </div>
      )}
    </div>
  );
}
