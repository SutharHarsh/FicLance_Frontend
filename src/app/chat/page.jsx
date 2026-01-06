"use client";

import React from 'react'
import ChatSection from '../../components/Chat/ChatSection'
import { useDynamicSEO, pageMetadata } from '@/lib/seo'

const ChatPage = () => {
  // Apply dynamic SEO for chat page
  useDynamicSEO(pageMetadata.chat);
  
  return (
    <div>
      <ChatSection />
    </div>
  )
}

export default ChatPage
