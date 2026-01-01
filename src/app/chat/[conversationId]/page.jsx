"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation"; // Use useParams for dynamic route
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import ChatInterface from "@/components/Chat/ChatInterface";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

function ChatPageContent() {
  const params = useParams(); // { conversationId: ... }
  const { conversationId } = params;
  const { user } = useAuth();
  const router = useRouter();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data and handle polling
  useEffect(() => {
    if (!user || !conversationId) return;

    let pollInterval = null;
    let pollTimeout = null;
    let isMounted = true;

    const fetchChatData = async () => {
      try {
        setLoading(true);

        // Fetch simulation details
        const simResponse = await api.get(`/simulations/${conversationId}`);
        if (!simResponse.data.success)
          throw new Error("Failed to load simulation");

        const simData = simResponse.data.data;
        if (isMounted) {
          setConversation(simData);
          // Set completion percentage from simulation meta
          const simCompletionPercentage =
            simData.meta?.completionPercentage || 0;
          setCompletionPercentage(simCompletionPercentage);
          console.log(
            "Completion percentage from simulation:",
            simCompletionPercentage
          );
        }

        // Fetch messages
        const msgResponse = await api.get(
          `/simulations/${conversationId}/messages?limit=500`
        );

        console.log("[ChatPage] Messages response:", msgResponse.data);

        if (msgResponse.data.success) {
          const msgList = Array.isArray(msgResponse.data.data)
            ? msgResponse.data.data
            : msgResponse.data.data.items || [];

          if (isMounted) setMessages(msgList);

          // Also update completion percentage from latest GitHub feedback message
          const latestGitHubFeedback = [...msgList]
            .reverse()
            .find(
              (m) =>
                m.metadata?.rawAgentResponse?.message?.completion_percentage !==
                undefined
            );

          if (latestGitHubFeedback && isMounted) {
            const msgCompletionPercentage =
              latestGitHubFeedback.metadata.rawAgentResponse.message
                .completion_percentage;
            console.log(
              "Completion percentage from latest GitHub feedback:",
              msgCompletionPercentage
            );
            // Use the higher value between simulation meta and message meta
            setCompletionPercentage((prev) =>
              Math.max(prev || 0, msgCompletionPercentage)
            );
          }
        }

        // Socket will handle real-time updates, so no polling needed
        // The synchronous Agent1 should complete before this component renders
      } catch (error) {
        console.error("Error loading chat:", error);
        if (isMounted) toast.error("Failed to load chat session");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchChatData();

    // Cleanup function
    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
      if (pollTimeout) clearTimeout(pollTimeout);
    };
  }, [user, conversationId]);

  // Derive all project details using useMemo to avoid mutating state and ensure reactivity
  const { clientName, projectName, requirements, deadline } = useMemo(() => {
    if (!conversation)
      return {
        clientName: "Client",
        projectName: "Project",
        requirements: null,
        deadline: null,
      };

    // 1. Get client name
    const firstAgentMsg = messages.find(
      (m) => m.sender?.type === "agent" && m.metadata?.clientName
    );
    const clientName =
      firstAgentMsg?.metadata?.client_name ||
      firstAgentMsg?.metadata?.clientName ||
      "Client";

    // 2. Get project name
    const projectName =
      conversation.projectName || conversation.title || "Project";

    // 3. Build requirements
    let requirements = conversation.requirements;
    if (!requirements) {
      const reqData = conversation.templateSnapshot?.requirements;
      if (reqData) {
        requirements = {
          message: {
            description: reqData.description || conversation.projectDescription,
            tech_stack:
              (conversation.templateSnapshot?.requiredSkills?.length > 0
                ? conversation.templateSnapshot.requiredSkills
                : reqData.tech_stack?.length > 0
                ? reqData.tech_stack
                : conversation.filters?.skills) || [],
            expertise:
              conversation.templateSnapshot?.expertiseLevel ||
              reqData.expertise ||
              conversation.filters?.expertise ||
              "Intermediate",
            completion_percentage: conversation.meta?.score || 0,
          },
        };
      } else if (firstAgentMsg?.metadata) {
        requirements = {
          message: {
            description:
              firstAgentMsg.metadata.projectDescription ||
              conversation.projectDescription,
            tech_stack:
              firstAgentMsg.metadata.techStack ||
              conversation.filters?.skills ||
              [],
            expertise:
              firstAgentMsg.metadata.expertise ||
              conversation.filters?.expertise ||
              "Intermediate",
            completion_percentage: completionPercentage || 0,
          },
        };
      } else {
        requirements = {
          message: {
            description: conversation.projectDescription,
            tech_stack:
              (conversation.templateSnapshot?.requiredSkills?.length > 0
                ? conversation.templateSnapshot.requiredSkills
                : conversation.filters?.skills) || [],
            expertise:
              conversation.templateSnapshot?.expertiseLevel ||
              conversation.filters?.expertise ||
              "Intermediate",
            completion_percentage: conversation.meta?.score || 0,
          },
        };
      }
    }

    // 4. Calculate deadline
    let deadline = conversation.deadline;
    if (!deadline) {
      let durationHours = 168; // Default 1 week
      if (conversation.filters?.durationDays) {
        durationHours = conversation.filters.durationDays * 24;
      } else if (conversation.templateSnapshot?.durationEstimateDays) {
        durationHours = conversation.templateSnapshot.durationEstimateDays * 24;
      } else if (firstAgentMsg?.metadata?.duration) {
        const durStr = firstAgentMsg.metadata.duration.toLowerCase();
        const num = parseFloat(durStr);
        if (!isNaN(num)) {
          if (durStr.includes("hour")) durationHours = num;
          else if (durStr.includes("week")) durationHours = num * 168;
          else if (durStr.includes("month")) durationHours = num * 720;
          else durationHours = num * 24;
        }
      }
      const deadlineDate = new Date(conversation.createdAt);
      deadlineDate.setMilliseconds(
        deadlineDate.getMilliseconds() + durationHours * 60 * 60 * 1000
      );
      deadline = deadlineDate.toISOString();
    }

    return { clientName, projectName, requirements, deadline };
  }, [conversation, messages, completionPercentage]);

  const conversationWithDetails = useMemo(() => {
    if (!conversation) return null;
    return {
      ...conversation,
      requirements,
      deadline,
    };
  }, [conversation, requirements, deadline]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your project...
          </p>
        </div>
      </div>
    );
  }

  if (!conversation) return null; // Or 404 state

  return (
    <ChatInterface
      conversationId={conversationId}
      initialMessages={messages}
      clientName={clientName}
      projectName={projectName}
      conversation={conversationWithDetails}
      currentUser={user}
      completionPercentage={completionPercentage}
      setCompletionPercentage={setCompletionPercentage}
    />
  );
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  );
}
