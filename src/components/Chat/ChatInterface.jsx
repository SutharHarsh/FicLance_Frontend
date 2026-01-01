"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { io } from "socket.io-client";
import Header from "./Header";
import GitHubFeedbackModal from "./GitHubFeedbackModal";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ChatArea from "./ChatArea";
import { useMessages } from "@/hooks/useMessages";
import { useGitHubFeedback } from "@/hooks/useGitHubFeedback";
import { downloadDocument } from "@/utils/documentGenerator";
import { FaGithub } from "react-icons/fa";

// Skeletons for chat layout
const SidebarSkeleton = () => (
  <div className="hidden lg:block w-full lg:w-80 border-r border-border bg-card p-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
      ))}
    </div>
  </div>
);

const ChatAreaSkeleton = () => (
  <div className="flex-1 flex flex-col bg-card border-x border-border">
    <div className="flex-1 p-4 space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`flex ${i % 2 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-md ${
              i % 2 ? "bg-gray-200" : "bg-gray-300"
            } h-6 rounded-lg w-3/4`}
          ></div>
        </div>
      ))}
    </div>
    <div className="p-4 border-t border-border">
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const RightSidebarSkeleton = () => (
  <div className="hidden lg:block w-0 lg:w-80 bg-card border-l border-border p-4 animate-pulse">
    <div className="h-6 bg-card-foreground rounded w-1/2 mb-4"></div>
    <div className="space-y-4">
      <div className="h-24 bg-card-foreground rounded"></div>
      <div className="h-20 bg-card-foreground rounded"></div>
      <div className="h-28 bg-card-foreground rounded"></div>
    </div>
  </div>
);

export default function ChatInterface({
  conversationId,
  initialMessages = [],
  clientName = "Client",
  projectName = "Project",
  conversation = null,
  completionPercentage,
  setCompletionPercentage,
}) {
  const { user, accessToken } = useAuth();
  const [message, setMessage] = useState("");
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(true);
  const [showChatView, setShowChatView] = useState(false);
  const [socket, setSocket] = useState(null);
  // const [completionPercentage, setCompletionPercentage] = useState(0);
  const [dueDate, setDueDate] = useState("N/A");
  const [projectDescription, setProjectDescription] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [deadlineRaw, setDeadlineRaw] = useState(null);
  const isDeadlinePassed = useMemo(() => {
    if (!deadlineRaw) return false;
    return new Date(deadlineRaw).getTime() < Date.now();
  }, [deadlineRaw]);

  console.log("Completion Percentage:", completionPercentage);

  // Use custom hooks
  const {
    messages,
    setMessages,
    isSending,
    clientTyping,
    setClientTyping,
    sendMessage: sendMessageHook,
  } = useMessages(initialMessages, conversationId, user);

  const {
    showGitHubModal,
    setShowGitHubModal,
    feedbackLoading,
    feedbackStep,
    feedbackSteps,
    handleGithubSubmit,
  } = useGitHubFeedback(
    conversationId,
    setMessages,
    setCompletionPercentage,
    socket
  );

  // console.log("Conversation:", conversation);

  // Initialize project details from conversation
  useEffect(() => {
    // if (conversation?.requirements?.message?.completion_percentage) {
    //   setCompletionPercentage(
    //     conversation.requirements.message.completion_percentage
    //   );
    // }
    if (conversation?.deadline) {
      const date = new Date(conversation.deadline);
      setDueDate(
        date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setDeadlineRaw(conversation.deadline);
    }
    if (conversation?.requirements?.message?.description) {
      setProjectDescription(conversation.requirements.message.description);
    }
    if (Array.isArray(conversation?.requirements?.message?.tech_stack)) {
      setTechStack(conversation.requirements.message.tech_stack);
    }
    if (conversation?.requirements?.message?.expertise) {
      const expertiseLevel = conversation.requirements.message.expertise;
      setDifficulty(expertiseLevel === "All" ? "Beginner" : expertiseLevel);
    }
  }, [conversation]);

  // Socket is now handled by useMessages hook to avoid duplicates
  // Just set socket from useMessages if needed for GitHub feedback
  useEffect(() => {
    // The useMessages hook already handles all socket events
    // We don't need duplicate socket connection here
    console.log("✅ [ChatInterface] Using socket from useMessages hook");
  }, [conversationId, accessToken]);

  // Initialize messages with document on first load
  useEffect(() => {
    if (!conversation || initialMessages.length === 0) return;

    const hasRequirements = conversation?.requirements;

    if (hasRequirements && messages.length > 0) {
      const firstMsg = messages[0];

      if (!firstMsg.hasDocumentAttachment && !firstMsg.metadata?.hasDocument) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[0] = {
            ...updated[0],
            hasDocumentAttachment: true,
            metadata: {
              ...updated[0].metadata,
              hasDocument: true,
              fileName: `${projectName}_Requirements.docx`,
              fileSize: "245 KB • Word Document",
            },
          };
          return updated;
        });
      }
    }
  }, [
    conversation,
    initialMessages,
    conversationId,
    projectName,
    messages,
    setMessages,
  ]);

  const handleConversationClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setShowLeftSidebar(false);
      setShowChatView(true);
    }
  };

  const handleBackToConversations = () => {
    setShowChatView(false);
    setShowLeftSidebar(true);
  };

  // Auto-open chat view on desktop and manage responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowChatView(true);
        setShowProjectDetails(true);
      } else if (conversationId) {
        setShowChatView(true);
        setShowLeftSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [conversationId]);

  // Reset project details when conversation changes
  useEffect(() => {
    if (
      conversationId &&
      typeof window !== "undefined" &&
      window.innerWidth >= 1024
    ) {
      setShowProjectDetails(true);
    }
  }, [conversationId]);

  const handleDownloadDocument = async (msg) => {
    try {
      // Extract data from message metadata (where backend stores all requirements)
      const metadata = msg?.metadata || {};

      console.log("📄 Downloading document with metadata:", metadata);
      console.log("📋 Acceptance criteria:", metadata.acceptance_criteria);

      await downloadDocument({
        projectName: metadata.project_name || projectName,
        clientName: metadata.client_name || metadata.clientName || clientName,
        requirements: {
          message: {
            description: metadata.description || metadata.projectDescription,
            tech_stack: metadata.tech_stack || metadata.techStack || [],
            expertise: metadata.expertise,
            duration: metadata.duration,
            acceptance_criteria: metadata.acceptance_criteria || [], // CRITICAL: This is what fills the document
          },
        },
        deadline: conversation?.deadline,
      });
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Failed to download document. Please try again.");
    }
  };

  const sendMessage = async () => {
    if (isDeadlinePassed) {
      alert("Deadline has passed. Messaging is disabled for this project.");
      return;
    }

    const messageToSend = message;
    setMessage(""); // Clear immediately before sending

    try {
      await sendMessageHook(messageToSend, clientName);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessage(messageToSend); // Restore message on error
    }
  };

  // Show loading only if we don't have conversation data yet
  const isChatLoading = !conversation;
  const isProjectCompleted = (Number(completionPercentage) || 0) >= 80;

  return (
    <div className="h-screen flex flex-col bg-[#f9fafb]">
      <Header isLoading={isChatLoading} />

      <main className="flex-1 flex overflow-hidden relative">
        {/* LEFT SIDEBAR */}
        {isChatLoading ? (
          <SidebarSkeleton />
        ) : (
          <LeftSidebar
            showLeftSidebar={showLeftSidebar}
            setShowLeftSidebar={setShowLeftSidebar}
            onConversationClick={handleConversationClick}
            showChatView={showChatView}
          />
        )}

        {/* CHAT AREA */}
        <ChatArea
          clientName={clientName}
          projectName={projectName}
          messages={messages}
          clientTyping={clientTyping}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          isSending={isSending}
          handleDownloadDocument={handleDownloadDocument}
          onInfoClick={() => setShowProjectDetails(!showProjectDetails)}
          isDetailsOpen={showProjectDetails}
          onGitHubClick={() => setShowGitHubModal(true)}
          isLoading={isChatLoading}
          isDeadlinePassed={isDeadlinePassed}
          isProjectCompleted={isProjectCompleted}
          showChatView={showChatView}
          onBackClick={handleBackToConversations}
          deadline={deadlineRaw}
        />

        {/* RIGHT SIDEBAR */}
        {isChatLoading ? (
          <RightSidebarSkeleton />
        ) : (
          <RightSidebar
            showProjectDetails={showProjectDetails}
            setShowProjectDetails={setShowProjectDetails}
            completionPercentage={completionPercentage || 0}
            projectState={
              isProjectCompleted
                ? "completed"
                : conversation?.state || "created"
            }
            dueDate={dueDate}
            projectDescription={projectDescription}
            techStack={techStack}
            difficulty={difficulty}
            deadline={deadlineRaw}
            isLoading={isChatLoading}
          />
        )}
      </main>

      {/* GitHub Feedback Modal */}
      {showGitHubModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full transform transition-all">
            {feedbackLoading ? (
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                    <FaGithub className="text-indigo-600 text-2xl animate-pulse" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-4 text-center">
                    {feedbackSteps[feedbackStep]}
                  </p>
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
                  <p className="text-xs text-gray-500">
                    Step {feedbackStep + 1} of {feedbackSteps.length}
                  </p>
                </div>
              </div>
            ) : (
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
}
