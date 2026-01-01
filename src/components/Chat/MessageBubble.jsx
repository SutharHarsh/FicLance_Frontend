"use client";

import React from "react";
import { FaFileWord, FaDownload } from "react-icons/fa";

export default function MessageBubble({ message, renderMessageContent, formatTime, onDownloadDocument }) {
  const { sender, text, time, type, fileName, fileSize } = message;
  const isUser = sender === "user" || message.sender?.role === "user" || message.from === "me";
  const isDocument = type === "document" || message.type === "document";
  const hasDocumentAttachment = message.hasDocumentAttachment || message.metadata?.hasDocument;

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : ""} px-2 sm:px-0`}>
      {!isUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
          <span className="text-green-600 font-medium text-xs">EC</span>
        </div>
      )}

      <div className="max-w-[85%] sm:max-w-[75%]">
        <div
          className={`p-2 sm:p-3 mb-1 rounded-lg break-words ${
            isUser
              ? "bg-primary text-white rounded-tr-none"
              : "bg-gray-100 rounded-tl-none text-gray-800"
          }`}
        >
          {isDocument ? (
            <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-200 min-w-[240px] sm:min-w-[320px] group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                <FaFileWord className="text-white text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-gray-900 truncate leading-snug">
                  {fileName || message.fileName || "Requirements.docx"}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1 font-medium">
                  {fileSize || message.fileSize || "245 KB • Word Document"}
                </p>
              </div>
              <button
                onClick={() => onDownloadDocument?.(message)}
                className="w-9 h-9 sm:w-11 sm:h-11 bg-card hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md group-hover:scale-105"
                title="Download document"
              >
                <FaDownload className="text-blue-600 group-hover:text-white text-sm sm:text-base transition-colors" />
              </button>
            </div>
          ) : (
            <>
              <div className="text-gray-800">{text || message.content}</div>
              {hasDocumentAttachment && (
                <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-card rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-200 min-w-[240px] sm:min-w-[320px] group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                    <FaFileWord className="text-white text-xl sm:text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate leading-snug">
                      {message.metadata?.fileName || message.fileName || "Requirements.docx"}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1 font-medium">
                      {message.metadata?.fileSize || message.fileSize || "245 KB • Word Document"}
                    </p>
                  </div>
                  <button
                    onClick={() => onDownloadDocument?.(message)}
                    className="w-9 h-9 sm:w-11 sm:h-11 bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md group-hover:scale-105"
                    title="Download document"
                  >
                    <FaDownload className="text-blue-600 group-hover:text-white text-sm sm:text-base transition-colors" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className={`text-xs text-gray-500 ${isUser ? "text-right" : ""}`}>
          {time || formatTime?.(message.createdAt)}
        </div>
      </div>

      {isUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 sm:ml-3 flex-shrink-0">
          <span className="text-primary font-medium text-xs">JD</span>
        </div>
      )}
    </div>
  );
}
