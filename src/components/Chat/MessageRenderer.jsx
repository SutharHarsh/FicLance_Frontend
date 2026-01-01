"use client";

import React from "react";
import { FaFileWord, FaDownload } from "react-icons/fa";
import SystemMessage from "./SystemMessage";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/contexts/AuthContext";

export default function MessageRenderer({ 
  msg, 
  isUser, 
  clientInitials, 
  formatTime, 
  handleDownloadDocument,
  projectName 
}) {
  const { user } = useAuth();
  
  // Handle system messages
  if (msg.sender?.type === "system" || msg.type === "system") {
    // For repo_submitted messages (user action), show user initials; otherwise use clientInitials
    const userInitials = msg.metadata?.systemType === "repo_submitted" ? "JD" : clientInitials;
    return <SystemMessage message={msg.content || msg.text} metadata={msg.metadata} userInitials={userInitials} />;
  }
  const getMessageText = (msg) => {
    let text = "";
    if (typeof msg === "string") {
      text = msg;
    } else if (msg && typeof msg === "object") {
      text = msg.content || msg.text || "";
      if (typeof text === "object" && text !== null) {
        text = JSON.stringify(text);
      }
    }
    return String(text || "").trim();
  };

  const parseInline = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts
      .map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
          return (
            <em key={i} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="bg-black/10 px-1 rounded font-mono text-xs">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })
      .filter(Boolean);
  };

  const renderMessageContent = () => {
    try {
      const text = getMessageText(msg);
      const hasDocumentAttachment = msg.hasDocumentAttachment || msg.metadata?.hasDocument;

      if (!text)
        return <span className="text-low-foreground italic">No message content</span>;

      const parts = text.split(/(```[\s\S]*?```)/g);

      const contentElements = parts
        .map((part, index) => {
          if (!part) return null;

          if (part.startsWith("```") && part.endsWith("```")) {
            const content = part.slice(3, -3).replace(/^[a-z]+\n/, "");
            return (
              <pre
                key={index}
                className="bg-card-foreground text-foreground p-2 rounded my-2 overflow-x-auto text-xs font-mono"
              >
                <code>{content}</code>
              </pre>
            );
          }

          return (
            <div key={index} className="whitespace-pre-wrap">
              {part.split("\n").map((line, i) => (
                <div key={i} className="min-h-[1.2em]">
                  {parseInline(line)}
                </div>
              ))}
            </div>
          );
        })
        .filter(Boolean);

      if (hasDocumentAttachment) {
        return (
          <>
            {contentElements}
            <div className="mt-4 flex items-center gap-4 p-4 bg-card rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200 min-w-[200px] group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                <FaFileWord className="text-white text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate leading-snug">
                  {msg.metadata?.fileName || msg.fileName || `${projectName}_Requirements.docx`}
                </p>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  {msg.metadata?.fileSize || msg.fileSize || "245 KB • Word Document"}
                </p>
              </div>
              <button
                onClick={() => handleDownloadDocument(msg)}
                className="w-11 h-11 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md group-hover:scale-105"
                title="Download document"
              >
                <FaDownload className="text-blue-600 group-hover:text-blue-700 text-base transition-colors" />
              </button>
            </div>
          </>
        );
      }

      return contentElements;
    } catch (error) {
      console.error("Error rendering message:", error, msg);
      return (
        <span className="text-red-500 text-sm">Error displaying message</span>
      );
    }
  };

  const isDocument = msg.type === "document";

  if (isDocument) {
    return (
      <div className="flex mb-4 px-2 sm:px-0">
        <div className=" w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
          <span className="text-green-600 font-medium text-xs">
            {clientInitials}
          </span>
        </div>
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="mb-1">
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border shadow-sm min-w-[280px]">
              <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center flex-shrink-0">
                <FaFileWord className="text-blue-600 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {msg.fileName || msg.metadata?.fileName || `${projectName}_Requirements.docx`}
                </p>
                <p className="text-xs text-gray-500">
                  {msg.fileSize || msg.metadata?.fileSize || "Word Document"}
                </p>
              </div>
              <button
                onClick={() => handleDownloadDocument(msg)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors flex-shrink-0"
                title="Download"
              >
                <FaDownload className="text-gray-600 text-sm" />
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {formatTime(msg.createdAt || msg.time)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex mb-4 ${isUser ? "justify-end" : ""} px-2 sm:px-0`}
    >
      {!isUser && (
        <UserAvatar
          src={null}
          alt={clientInitials}
          initials={clientInitials}
          size="sm"
        />
      )}

      <div className="max-w-[85%] sm:max-w-[75%] ml-2 mr-2">
        <div
          className={`p-2 sm:p-3 mb-1 rounded-lg break-words ${
            isUser
              ? "bg-primary text-secondary rounded-tr-none"
              : "bg-destructive-foreground dark:bg-card-foreground rounded-tl-none text-foreground"
          }`}
        >
          {renderMessageContent()}
        </div>
        <div
          className={`text-xs text-gray-500 ${isUser ? "text-right" : ""}`}
        >
          {formatTime(msg.createdAt || msg.time)}
        </div>
      </div>

      {isUser && (
        <UserAvatar
          src={user?.avatarUrl || user?.profile?.customAvatar || user?.profile?.image}
          alt={user?.name || "User"}
          initials={user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "JD"}
          size="sm"
        />
      )}
    </div>
  );
}