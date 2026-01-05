import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { io } from "socket.io-client";

export function useMessages(initialMessages, conversationId, user) {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [clientTyping, setClientTyping] = useState(false);
  const [socket, setSocket] = useState(null);

  const sortMessagesByDate = (list = []) => {
    return [...list].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      if (timeA !== timeB) return timeA - timeB;
      return String(a._id || "").localeCompare(String(b._id || ""));
    });
  };

  // Initialize socket and listen for message events
  useEffect(() => {
    console.log(
      "🔌 [useMessages] Initializing socket for conversation:",
      conversationId
    );

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("ficlance_access_token")
        : null;

    if (!token) {
      console.error("❌ [useMessages] No access token found");
      return;
    }

    // Remove /api/v1 from the URL for socket connection
    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8080';
    
    const socketInstance = io(
      socketUrl,
      {
        path: "/socket.io",
        withCredentials: true,
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    );

    socketInstance.on("connect", () => {
      console.log(
        "✅ [useMessages] Socket connected successfully, ID:",
        socketInstance.id
      );
      if (conversationId) {
        // Use correct event name that backend expects
        socketInstance.emit("join:simulation", conversationId);
        console.log("📍 [useMessages] Joined simulation room:", conversationId);
      }
    });

    socketInstance.on("joined:simulation", ({ simulationId }) => {
      console.log(
        "✅ [useMessages] Successfully joined simulation:",
        simulationId
      );
    });

    socketInstance.on("disconnect", () => {
      console.log("🔌 [useMessages] Socket disconnected");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ [useMessages] Socket connection error:", error.message);
    });

    // Listen for message:created events
    socketInstance.on("message:created", (message) => {
      console.log("📬 [useMessages] Received message:created:", message);
      setMessages((prev) => {
        // Check if already exists by _id
        if (prev.some((m) => m._id === message._id)) {
          console.log("⚠️ [useMessages] Message already exists, skipping");
          return prev;
        }

        // Check if already exists by clientMessageId (for user messages)
        if (
          message.clientMessageId &&
          prev.some((m) => m.clientMessageId === message.clientMessageId)
        ) {
          console.log(
            "⚠️ [useMessages] Message with same clientMessageId already exists, skipping"
          );
          return prev;
        }

        // Check if this is a GitHub feedback message that was just added optimistically
        if (
          message.type === "github_feedback" &&
          prev.some(
            (m) =>
              m.type === "github_feedback" &&
              Math.abs(
                new Date(m.createdAt).getTime() -
                new Date(message.createdAt).getTime()
              ) < 5000
          )
        ) {
          console.log(
            "⚠️ [useMessages] GitHub feedback already added optimistically, skipping"
          );
          return prev;
        }

        // Try to replace temp message (only for messages without clientMessageId match)
        const tempIndex = prev.findIndex(
          (m) =>
            m._id?.startsWith("temp-") &&
            m.content === message.content &&
            !m.clientMessageId
        );

        if (tempIndex !== -1) {
          console.log("🔄 [useMessages] Replacing temp message with real one");
          const updated = [...prev];
          updated[tempIndex] = message;
          return sortMessagesByDate(updated);
        }

        // Add new message and sort
        console.log("➕ [useMessages] Adding new message from socket");
        const newMessages = sortMessagesByDate([...prev, message]);
        return newMessages;
      });
    });

    // Listen for agent typing indicators
    socketInstance.on("agent:typing", (data) => {
      console.log("✍️ [useMessages] Agent typing:", data);
      if (data && typeof data.isTyping === "boolean") {
        setClientTyping(data.isTyping);
      }
    });

    // Listen for agent errors
    socketInstance.on("agent:error", (data) => {
      console.error("❌ [useMessages] Agent error:", data);
      setClientTyping(false);
      toast.error(data.message || "Agent failed to respond");
    });

    // Listen for typing start/stop (alternative events)
    socketInstance.on("typing:start", () => {
      console.log("✍️ [useMessages] Typing started");
      setClientTyping(true);
    });

    socketInstance.on("typing:stop", () => {
      console.log("✍️ [useMessages] Typing stopped");
      setClientTyping(false);
    });

    setSocket(socketInstance);

    return () => {
      console.log("🧹 [useMessages] Cleaning up socket connection");
      if (conversationId) {
        socketInstance.emit("leave:simulation", conversationId);
      }
      socketInstance.off("connect");
      socketInstance.off("joined:simulation");
      socketInstance.off("disconnect");
      socketInstance.off("connect_error");
      socketInstance.off("message:created");
      socketInstance.off("agent:typing");
      socketInstance.off("agent:error");
      socketInstance.off("typing:start");
      socketInstance.off("typing:stop");
      socketInstance.disconnect();
    };
  }, [conversationId]);

  // Initialize messages from props
  useEffect(() => {
    if (initialMessages.length > 0) {
      const isPlaceholder = (m) =>
        m.type === "document_placeholder" ||
        (m.type !== "document" &&
          typeof m.content === "string" &&
          m.content.trim().toLowerCase() === "project requirements document");

      const messagesToShow = sortMessagesByDate(initialMessages).filter(
        (m) => !isPlaceholder(m)
      );
      setMessages(messagesToShow);
    }
  }, [initialMessages]);

  const sendMessage = async (message) => {
    if (!message.trim() || isSending) return;

    const trimmed = message.trim();
    const tempId = `temp-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    // Optimistic User Message (show immediately)
    const tempUserMsg = {
      _id: tempId,
      content: trimmed,
      sender: { type: "user", displayName: "You" },
      createdAt: new Date().toISOString(),
      clientMessageId: tempId,
      status: "sending",
    };

    // ✅ Add user message to UI IMMEDIATELY
    console.log("➕ [useMessages] Adding user message optimistically");
    setMessages((prev) => [...prev, tempUserMsg]);
    setIsSending(true);

    try {
      // Save User Message to Backend
      console.log("📤 [useMessages] Sending message to backend...");
      const userMsgRes = await api.post(
        `/simulations/${conversationId}/messages`,
        {
          content: trimmed,
          clientMessageId: tempId,
        }
      );

      // Update optimistic message with real ID
      const saved = userMsgRes.data.data;
      console.log("✅ [useMessages] Message saved, ID:", saved._id);

      setMessages((prev) => {
        console.log("🔄 [useMessages] Updating temp message with real message");
        // Find and replace the temp message
        return prev.map((msg) => {
          if (msg._id === tempId || msg.clientMessageId === tempId) {
            return { ...saved, status: "sent" };
          }
          return msg;
        });
      });

      console.log(
        "✅ [useMessages] Message sent successfully. Waiting for agent response via socket..."
      );
    } catch (error) {
      console.error("❌ [useMessages] Failed to send message:", error);

      // If backend reports duplicate (idempotency), keep the optimistic message
      if (error?.response?.status === 409) {
        console.warn(
          "⚠️ [useMessages] Duplicate message detected, ignoring second send."
        );
      } else if (error?.response?.status === 403) {
        toast.error(error.response?.data?.message || "Action not allowed.");
        // Remove failed optimistic message
        setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
      } else {
        toast.error("Failed to send message");
        // Remove failed optimistic message
        setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
      }
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages,
    setMessages,
    isSending,
    clientTyping,
    setClientTyping,
    sendMessage,
  };
}
