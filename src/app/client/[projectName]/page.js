// app/client/[projectName]/page.jsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import ChatInterface from "@/components/Chat/ChatInterface";

export default function ClientChatPage() {
  const { projectName } = useParams();

  // projectName will be slug like "e-commerce-product-page"
  // Pass it to ChatInterface as the selected project
  return <ChatInterface projectSlug={projectName} />;
}
