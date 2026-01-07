import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

const feedbackSteps = [
  "Analyzing repository structure...",
  "Checking UI components...",
  "Gathering requirements...",
  "Generating feedback...",
];

// Format feedback response for display
const formatFeedbackResponse = (data, repoUrl) => {
  let formatted = "";

  if (data.summary) {
    formatted += `**Summary**\n${data.summary}\n\n`;
  }

  if (data?.rawAgentResponse?.message?.missing_requirements?.length > 0) {
    formatted += `**Missing Requirements**\n`;
    data?.rawAgentResponse?.message?.missing_requirements?.forEach((req) => {
      formatted += `${req}\n`;
    });
    formatted += "\n";
  }

  if (data.strengths?.length > 0) {
    formatted += `**Strengths**\n`;
    data.strengths.forEach((s) => {
      formatted += `• ${s}\n`;
    });
    formatted += "\n";
  }

  if (data.improvements?.length > 0) {
    formatted += `**Improvements Needed**\n`;
    data.improvements.forEach((i) => {
      formatted += `• ${i}\n`;
    });
    formatted += "\n";
  }

  return formatted.trim();
};

export function useGitHubFeedback(
  conversationId,
  setMessages,
  setCompletionPercentage,
  socket
) {
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackStep, setFeedbackStep] = useState(0);

  // Socket listener removed in favor of Synchronous API call
  // This avoids the issue where the worker queue was stuck.
  useEffect(() => {
    // Legacy: leaving empty for now or could remove entirely
  }, []);

  const handleGithubSubmit = async (url) => {
    setFeedbackLoading(true);
    setFeedbackStep(0);

    try {
      // Simulation of steps on the client side for UX
      const stepInterval = setInterval(() => {
        setFeedbackStep((prev) => {
          if (prev < feedbackSteps.length - 1) return prev + 1;
          return prev;
        });
      }, 1500);

      console.log("Calling Synchronous Analysis API...");

      // Call SYNC API
      // This waits for the agent to finish (can take 10-30s)
      // Note: Make sure your proxy/nginx timeout is high enough
      const response = await api.post("/portfolio/analyze/sync", {
        repoUrl: url,
        simulationId: conversationId,
        branch: "main",
      });

      clearInterval(stepInterval);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to analyze");
      }

      console.log("Sync Analysis Result:", response.data);

      if (!response.data || !response.data.data) {
        throw new Error("Analysis failed: No data returned from server.");
      }

      const { feedback, portfolio } = response.data.data;

      // Create system message for successful submission
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("ficlance_access_token")
            : null;
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
        console.log("🔗 [GitHub] Using API URL for system message:", apiUrl);
        await fetch(`${apiUrl}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          credentials: "include",
          body: JSON.stringify({
            conversationId,
            content: `✅ GitHub repository submitted successfully\n\n**Repository:** ${url}\n\n Please review this project and give me feedback on the implementation.`,
            type: "system",
            sender: { type: "system", name: "System" },
            metadata: { systemType: "repo_submitted" },
          }),
        });
      } catch (err) {
        console.warn("Failed to create system message:", err);
      }

      // console.log(feedback?.rawAgentResponse?.message?.completion_percentage);

      setCompletionPercentage(
        feedback?.rawAgentResponse?.message?.completion_percentage
      );

      const completionPercentage =
        feedback?.rawAgentResponse?.message?.completion_percentage;

      if (!feedback || !portfolio) {
        throw new Error(
          "Analysis failed: Incomplete data returned from server."
        );
      }

      // Format and display feedback immediately
      const feedbackContent = formatFeedbackResponse(
        feedback,
        portfolio.repoUrl
      );

      console.log(feedbackContent);

      // Do not optimistically add to UI; rely on socket message:created after DB save
      console.log(
        "ℹ️ [GitHub] Skipping optimistic UI add; will use socket event"
      );

      // Save to database (Chat History)
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("ficlance_access_token")
            : null;
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
        console.log("🔗 [GitHub] Using API URL for feedback save:", apiUrl);
        const saveResponse = await fetch(`${apiUrl}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          credentials: "include",
          body: JSON.stringify({
            conversationId,
            content: feedbackContent,
            completionPercentage: completionPercentage,
            type: "github_feedback",
            userId: "github-feedback",
            role: "assistant",
            skipAI: true,
            metadata: feedback,
          }),
        });

        if (!saveResponse.ok) {
          const errorData = await saveResponse.json();
          console.error("Failed to save GitHub feedback message:", errorData);
          toast.error("Failed to save feedback to chat history");
        } else {
          console.log("GitHub feedback saved successfully");
        }
      } catch (err) {
        console.error("Error saving GitHub feedback message:", err);
        toast.error("Failed to save feedback to chat history");
      }

      toast.success("Analysis complete!");
      setFeedbackLoading(false);
      setShowGitHubModal(false);
      setFeedbackStep(0);
    } catch (error) {
      console.error("Github feedback error:", error);
      toast.error(error.message || "Failed to submit GitHub feedback");
      setFeedbackLoading(false);
      setShowGitHubModal(false);
      setFeedbackStep(0);
    }
  };

  return {
    showGitHubModal,
    setShowGitHubModal,
    feedbackLoading,
    feedbackStep,
    feedbackSteps,
    handleGithubSubmit,
  };
}
