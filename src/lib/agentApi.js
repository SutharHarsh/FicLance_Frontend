import axios from "axios";

const AGENT_API_URL = "http://localhost:8000";

const agentApi = axios.create({
  baseURL: AGENT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const generateRequirements = async (data) => {
  // Map frontend data to Agent API format
  const payload = {
    ProjectName: data.projectName,
    Description: data.projectDescription,
    Expertise: data.filters.expertise,
    TechStack: data.filters.skills,
    Duration: data.filters.durationDays
      ? `${data.filters.durationDays} days`
      : "1 week",
  };

  const response = await agentApi.post("/requirements", payload);
  return response.data.message; // Unwrap 'message' key from Agent API
};

export const sendMessage = async (message) => {
  const response = await agentApi.post("/messages", { Question: message });
  return response.data; // Note: Chat returns { message: "string" } usually, or raw string?
  // main.py: return {"message": result.raw} -> result.raw is string.
  // So response.data is { message: "Hello..." }
  // Code in NewProject expects: chatResponse.response || chatResponse.message || ...
  // So returning response.data is correct there because it checks .message
};

export const sendFeedback = async (repoUrl) => {
  const response = await agentApi.post("/feedback", { RepoURL: repoUrl });
  return response.data.message; // Feedback returns { message: parsed }
};

export default agentApi;
