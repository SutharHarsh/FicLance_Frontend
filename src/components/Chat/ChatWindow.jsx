"use client";

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaPlay, FaGithub } from "react-icons/fa";
import { io } from "socket.io-client";
import { useAuth } from "@/contexts/AuthContext";
import GitHubFeedbackModal from "./GitHubFeedbackModal";

export default function ChatWindow({
  chatId,
  chatMeta = {},
  initialMessages = [],
}) {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [typing, setTyping] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [quickReplies] = useState([
    "I'll send the mockups today",
    "Can we schedule a call?",
    "I need more information",
    "Let me check and get back to you",
  ]);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);
  const hasLoadedMessages = useRef(false); // Track if initial messages are loaded

  // GitHub Feedback Modal States
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackStep, setFeedbackStep] = useState(0);

  // Initialize Socket.io
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("ficlance_access_token") : null;
    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8080';
    
    console.log("🔌 [ChatWindow] Initializing socket connection to:", socketUrl);
    
    const socketInstance = io(socketUrl, {
      path: "/socket.io",
      withCredentials: true,
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    socketInstance.on("connect", () => {
      console.log("✅ [ChatWindow] Socket connected! ID:", socketInstance.id);
      if (chatId) {
        socketInstance.emit("join:simulation", chatId);
        console.log("📍 [ChatWindow] Joined simulation room:", chatId);
      }
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("🔌 [ChatWindow] Socket disconnected:", reason);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ [ChatWindow] Socket connection error:", error.message);
    });

    socketInstance.on("joined:simulation", ({ simulationId }) => {
      console.log("✅ [ChatWindow] Successfully joined simulation:", simulationId);
    });

    socketInstance.on("new_message", (message) => {
      console.log("📨 Received new_message:", message);
      setMessages((prev) => {
        // Avoid duplicates - check both _id and temporary IDs
        if (prev.some((m) => m._id === message._id)) {
          console.log("⚠️ Duplicate message by ID, ignoring");
          return prev;
        }
        console.log("✅ Adding new_message to chat");
        return [...prev, message];
      });
    });

    // Listen for message:created events from backend
    socketInstance.on("message:created", (message) => {
      console.log("📬 [ChatWindow] Received message:created:", message);
      setMessages((prev) => {
        // Check if message already exists by _id
        const existingIndex = prev.findIndex((m) => m._id === message._id);
        if (existingIndex !== -1) {
          console.log("⚠️ Message already exists by _id, ignoring");
          return prev;
        }

        // Try to find and replace temp message with same content
        const tempMsgIndex = prev.findIndex(
          (m) => m._id?.startsWith("temp-") && m.content === message.content
        );

        if (tempMsgIndex !== -1) {
          console.log("🔄 [ChatWindow] Replacing temp message with real one");
          const updated = [...prev];
          updated[tempMsgIndex] = message;
          return updated;
        }

        // If no temp match, just add if it's new
        console.log("✅ [ChatWindow] Adding new message:created to chat");
        return [...prev, message];
      });
    });

    socketInstance.on("agent:typing", (data) => {
      console.log("✍️ Agent typing:", data.isTyping);
      setTyping(data.isTyping);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off("new_message");
      socketInstance.off("message:created");
      socketInstance.off("agent:typing");
      socketInstance.disconnect();
    };
  }, [chatId]);

  // Fetch messages once on mount
  useEffect(() => {
    if (!chatId || hasLoadedMessages.current) return;

    const fetchMessages = async () => {
      try {
        console.log("🔍 Fetching messages for chat:", chatId);
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("ficlance_access_token")
            : null;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
        const res = await fetch(
          `${apiUrl}/messages?conversationId=${chatId}&limit=500`,
          {
            headers: {
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: 'include',
          }
        );

        if (res.ok) {
          const result = await res.json();
          // Backend returns { success: true, data: { items: [...], nextCursor, hasMore } }
          console.log("Fetched messages:", result.data.items);
          const fetchedMessages = result.data?.items || result.items || [];
          console.log("📥 Fetched", fetchedMessages.length, "messages");
          setMessages(fetchedMessages);
          hasLoadedMessages.current = true; // Mark as loaded

          // Scroll to bottom after loading messages
          setTimeout(() => {
            if (messagesRef.current) {
              messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            }
          }, 50);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        hasLoadedMessages.current = true; // Mark as attempted to avoid infinite loops
      }
    };

    fetchMessages();
  }, [chatId]);

  const scrollToBottom = () => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (d) => {
    const date = new Date(d);
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const ampm = hrs >= 12 ? "PM" : "AM";
    return `${hrs % 12 === 0 ? 12 : hrs % 12}:${
      mins < 10 ? "0" + mins : mins
    } ${ampm}`;
  };

  const sendMessage = async (text) => {
    const trimmed = text?.trim();
    if (!trimmed || isSending || sendingRef.current) return;
    setIsSending(true);
    sendingRef.current = true;

    // Generate unique IDs for optimistic updates
    const userMsgId = `temp-user-${Date.now()}`;
    const aiMsgId = `temp-ai-${Date.now() + 1}`;

    // Optimistic UI Update for User Message (show immediately)
    const tempUserMsg = {
      _id: userMsgId,
      content: trimmed,
      sender: { role: "user", userId: user?.email },
      createdAt: new Date().toISOString(),
      from: "me",
    };

    // Add user message immediately and scroll
    setMessages((prev) => {
      console.log("➕ Adding temp user message optimistically");
      return [...prev, tempUserMsg];
    });

    // Clear input immediately
    if (inputRef.current) {
      inputRef.current.textContent = "";
      inputRef.current.setAttribute("data-empty", "true");
      inputRef.current.focus();
    }

    try {
      // Call backend agent endpoint instead of external AI proxy
      console.log("🤖 Calling backend agent API...");
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("ficlance_access_token")
          : null;

      // Use 'conversationId' to match backend expectation
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
      const response = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify({
          conversationId: chatId,
          content: trimmed,
          userId: user?.email,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }

      console.log("✅ Message sent to backend, agent will respond via socket");

      // Agent response will come via socket.io message:created event
      // No need to manually add AI message here
    } catch (error) {
      console.error("❌ Error sending message:", error);
      // Remove the optimistic user message on error
      setMessages((prev) => prev.filter((m) => m._id !== userMsgId));
      if (typeof toast?.error === "function") {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsSending(false);
      sendingRef.current = false;
    }
  };

  const onSendClick = () => {
    if (inputRef.current) {
      const text = inputRef.current.textContent || "";
      sendMessage(text);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSending && !sendingRef.current) onSendClick();
    }
  };

  // emoji handling: insert emoji at end
  const insertEmoji = (emoji) => {
    if (!inputRef.current) return;
    inputRef.current.textContent += emoji;
    inputRef.current.removeAttribute("data-empty");
    // place caret at end
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(inputRef.current);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    inputRef.current.focus();
  };

  // Multi-step loading messages
  const feedbackSteps = [
    "Analyzing repository structure...",
    "Checking UI components...",
    "Gathering requirements...",
    "Generating feedback...",
  ];

  // Helper to handle GitHub feedback submission
  const handleGithubSubmit = async (url) => {
    setFeedbackLoading(true);
    setFeedbackStep(0);

    try {
      // Simulate multi-step progress (for visual feedback while queuing)
      const stepInterval = setInterval(() => {
        setFeedbackStep((prev) => {
          if (prev < feedbackSteps.length - 1) return prev + 1;
          return prev;
        });
      }, 800);

      // Use the unified backend endpoint instead of direct proxy
      // This enqueues the job and returns 202 Accepted
      // We then wait for the socket event 'portfolio:analyzed'
      // Import api utility if not already imported, or use fetch with auth headers if easier here.
      // Since we are in ChatWindow, let's look for api import. If not present, we will use fetch with token.
      // But using the same endpoint: /api/v1/portfolio/analyze

      // We need authentication token for the backend call usually.
      // Assuming we have 'api' or we can use fetch with interceptors if globally configured.
      // Ideally we should import 'api' from '@/lib/api'.
      // For now, I'll use the existing pattern but point to the correct backend route.

      /* 
             NOTE: The previous code used /api/proxy/feedback. 
             We are changing this to /portfolio/analyze via the standard API client 
             to ensure it goes through the queue.
          */

      // We need to access the auth token? The useAuth hook provides user but maybe not raw token.
      // If we use the 'api' axios instance, it handles it.
      // I will assume specific import or just fetch with appropriate context if needed.
      // But wait, I can just use the proxy to the BACKEND if I want: /api/proxy/portfolio/analyze?
      // No, next.config rewrites /api/v1 to backend.

      // Let's use the 'api' library. I will add the import at the top of the file in a separate edit.
      // For this block, I will assume 'api' is available or I will use `fetch` to `/api/v1/portfolio/analyze`

      // Actually, let's use the existing fetch pattern but target the correct URL.
      // The next.config rewrites /api/v1/* to localhost:8080/api/v1/*
      // So we should fetch '/api/v1/portfolio/analyze'

      // The backend expects: { repoUrl, branch }
      const res = await fetch("/api/v1/portfolio/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // We need the Authorization header if this is a protected route (it is).
          // We might need to get the token.
          // The existing code for sendMessage uses /api/proxy which often handles cookies or headers?
          // Or maybe auth is handled via cookies?
          // The Dashboard uses 'api' from lib/api.js.
        },
        body: JSON.stringify({
          repoUrl: url,
          branch: "main",
          simulationId: chatId,
        }), // Pass simulationId to link it
      });

      clearInterval(stepInterval);

      if (res.status === 401) {
        alert("Please login to analyze repositories.");
        setFeedbackLoading(false);
        setShowGitHubModal(false);
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Analysis API error:", errorData);
        alert(
          `Failed to queue analysis: ${errorData.message || "Unknown error"}`
        );
        setFeedbackLoading(false);
        setShowGitHubModal(false);
        return;
      }

      console.log(res);

      // If 202 Accepted, we wait.
      // We keep the modal open or at least keep the loading state in the chat?
      // The user wants a loader.
      // We can keep the modal open with "Analyzing..." until socket event.

      // We DO NOT setFeedbackLoading(false) here. We wait for socket.
      // We can set a specific state to know we are waiting for this URL.
      setFeedbackStep(feedbackSteps.length - 1); // "Generating feedback..."
    } catch (e) {
      console.error("Github feedback error", e);
      alert("Failed to submit GitHub feedback. Please try again.");
      setFeedbackLoading(false);
      setShowGitHubModal(false);
      setFeedbackStep(0);
    }
  };

  // Format feedback response for display
  const formatFeedbackResponse = (data, repoUrl) => {
    const repoName = repoUrl
      ? repoUrl.split("/").slice(-2).join("/").replace(".git", "")
      : "Repository";

    // Data might come from Agent 3 format (Feedback model)
    // Structure: { summary, overallScore, scoreBreakdown, strengths, improvements, ... }

    let formatted = `**GitHub Repository Analysis**\n`;
    formatted += `**Repository:** ${repoName}\n\n`;
    formatted += `---\n\n`;

    if (data.overallScore) {
      formatted += `**Overall Score:** ${data.overallScore}/100\n\n`;
    }

    if (data.summary) {
      formatted += `**Summary**\n${data.summary}\n\n`;
    }

    if (data.strengths && data.strengths.length > 0) {
      formatted += `**Strengths**\n`;
      data.strengths.forEach((s) => (formatted += `• ${s}\n`));
      formatted += "\n";
    }

    if (data.improvements && data.improvements.length > 0) {
      formatted += `**Improvements Needed**\n`;
      data.improvements.forEach((i) => (formatted += `• ${i}\n`));
      formatted += "\n";
    }

    return formatted.trim();
  };

  // Removed legacy portfolio:analyzed listener to avoid duplicate feedback messages

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <h3 className="font-semibold text-gray-900">
          {chatMeta.title || "Conversation"}
        </h3>
        {chatMeta.description && (
          <p className="text-xs text-gray-500 mt-1">{chatMeta.description}</p>
        )}
      </div>

      {/* Messages container */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {/* Date separator sample */}
        <div className="flex items-center justify-center my-4">
          <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
            Today
          </div>
        </div>

        {messages.map((m) => {
          // Normalize sender info - handle both frontend temp messages and backend messages
          const isUserMessage =
            m.sender?.role === "user" ||
            m.sender?.type === "user" ||
            m.from === "me";

          return (
            <div
              key={m._id || m.id}
              className={`flex mb-4 chat-message ${
                isUserMessage ? "justify-end" : ""
              }`}
            >
              {!isUserMessage && (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 self-start mt-1 flex-shrink-0">
                  <span className="text-green-600 font-medium text-xs">
                    {m.sender?.agentName
                      ? m.sender.agentName.substring(0, 2).toUpperCase()
                      : (chatMeta.title || "Client")
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                  </span>
                </div>
              )}
              <div
                className={`max-w-[75%] ${isUserMessage ? "text-right" : ""}`}
              >
                <div
                  className={`${
                    isUserMessage
                      ? "bg-indigo-600 text-white rounded-lg rounded-tr-none"
                      : "bg-white shadow-sm rounded-lg rounded-tl-none"
                  } p-3 mb-1`}
                >
                  <div
                    className={`${
                      isUserMessage ? "text-white" : "text-gray-800"
                    } text-sm leading-relaxed overflow-hidden`}
                  >
                    {renderMessageContent(m.content || m.text)}
                  </div>
                </div>
                <div
                  className={`flex items-center ${
                    isUserMessage ? "justify-end" : ""
                  } text-xs text-gray-500`}
                >
                  <span>{formatTime(m.createdAt || m.time)}</span>
                  {/* {m.status && <><span className="mx-2">•</span><span>{m.status}</span></>} */}
                </div>
              </div>

              {isUserMessage && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-3 self-start mt-1 flex-shrink-0">
                  <span className="text-primary font-medium text-xs">JD</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div className="flex mb-4 chat-message">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 self-start mt-1 flex-shrink-0">
              <span className="text-green-600 font-medium text-xs">
                {(chatMeta.title || "C")
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
            <div className="bg-gray-100 rounded-lg rounded-tl-none py-2 px-4 inline-block">
              <div className="typing-indicator flex">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick replies + input */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex space-x-2 mb-3 overflow-x-auto pb-1">
          {quickReplies.map((q) => (
            <button
              key={q}
              onClick={() => {
                if (inputRef.current) inputRef.current.textContent = q;
                sendFromInput();
              }}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap hover:bg-gray-200"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
            <div
              ref={inputRef}
              contentEditable
              id="message-input"
              placeholder="Type your message..."
              data-placeholder="Type your message..."
              data-empty="true"
              className="min-h-[60px] max-h-[120px] p-3 overflow-y-auto"
              onKeyDown={onKeyDown}
            ></div>

            <div className="flex items-center justify-between p-2 border-t border-gray-200 bg-white">
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => setEmojiOpen((s) => !s)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
                  type="button"
                >
                  😊
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
                  title="Attach File"
                >
                  📎
                </button>
                <button
                  onClick={() => setShowGitHubModal(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-indigo-50 text-indigo-600 transition-colors"
                  title="GitHub Feedback"
                >
                  <FaGithub size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = inputRef.current?.textContent || "";
                    sendMessageFromText(text);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center justify-center font-medium transition-colors"
                  disabled={isSending}
                >
                  <FaPlay className="ml-1 text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Feedback Modal with Integrated Loader */}
      {showGitHubModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
            {feedbackLoading ? (
              // Loading State
              <div className="p-6">
                <div className="flex flex-col items-center">
                  {/* Animated Icon */}
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                    <FaGithub className="text-indigo-600 text-2xl animate-pulse" />
                  </div>

                  {/* Current Step */}
                  <p className="text-sm font-medium text-gray-900 mb-4 text-center">
                    {feedbackSteps[feedbackStep]}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden mb-3">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${
                          ((feedbackStep + 1) / feedbackSteps.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>

                  {/* Step Counter */}
                  <p className="text-xs text-gray-500">
                    Step {feedbackStep + 1} of {feedbackSteps.length}
                  </p>
                </div>
              </div>
            ) : (
              // Input Form State
              <GitHubFeedbackModal
                isOpen={true}
                onClose={() => setShowGitHubModal(false)}
                onSubmit={handleGithubSubmit}
                isLoading={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );

  // helper functions referenced inside JSX (declared after return to keep them hoisted)

  function sendMessageFromText(txt) {
    sendMessage(txt);
  }

  function sendFromInput() {
    const txt = inputRef.current?.textContent || "";
    sendMessage(txt);
  }

  // Basic Markdown Parser for Rich Text Display
  function renderMessageContent(text) {
    if (!text) return null;

    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        // Code block
        const content = part.slice(3, -3).replace(/^[a-z]+\n/, ""); // Remove language identifier if present
        return (
          <pre
            key={index}
            className="bg-gray-800 text-gray-100 p-2 rounded my-2 overflow-x-auto text-xs font-mono"
          >
            <code>{content}</code>
          </pre>
        );
      }

      // Process inline formatting for non-code blocks
      // Split by newlines to handle paragraphs
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part.split("\n").map((line, i) => (
            <div key={i} className="min-h-[1.2em]">
              {parseInline(line)}
            </div>
          ))}
        </div>
      );
    });
  }

  function parseInline(text) {
    // Simple parser for **bold**, *italic*, `code`
    // This is a naive implementation but works for basic cases
    // We can use regex to split and map

    // Regex for bold: \*\*(.*?)\*\*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        // User wants this to be bold/emphasized
        return (
          <strong key={i} className="font-bold">
            {part.slice(1, -1)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="bg-black/10 px-1 rounded font-mono text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  }
}

ChatWindow.propTypes = {
  chatId: PropTypes.string,
  chatMeta: PropTypes.object,
  initialMessages: PropTypes.array, // Added prop
};
