// app/client/[projectName]/page.jsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import ChatInterface from "@/components/Chat/ChatInterface";
import { useDynamicSEO } from "@/lib/seo";

export default function ClientChatPage() {
  const { projectName } = useParams();
  
  // Apply dynamic SEO for project page
  useDynamicSEO({
    title: `${projectName.replace(/-/g, ' ')} Project`,
    description: `Work on ${projectName.replace(/-/g, ' ')} client simulation project on FicLance. Build real-world projects with AI clients.`,
    keywords: [projectName, 'client project', 'project simulation'],
    path: `/client/${projectName}`,
    noIndex: true,
  });

  // projectName will be slug like "e-commerce-product-page"
  // Pass it to ChatInterface as the selected project
  return <ChatInterface projectSlug={projectName} />;
}
