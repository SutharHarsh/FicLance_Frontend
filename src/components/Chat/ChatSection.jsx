"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import ConversationList from './ConversationList'
import Header from './Header'
import { FaComments, FaArrowRight } from 'react-icons/fa'

const ChatSection = () => {
  const router = useRouter()

  return (
    <div className='h-screen flex flex-col bg-[#f9fafb]'>
      <Header />
      
      <main className='flex-1 flex overflow-hidden'>
        {/* Left Sidebar - Conversation List */}
        <div className='w-96 border-r border-border bg-card'>
          <ConversationList />
        </div>

        {/* Main Content - Empty State */}
        <div className='flex-1 flex items-center justify-center bg-gradient-to-br from-secondary to-card-foreground'>
          <div className='text-center max-w-md px-6'>
            {/* Icon */}
            <div className='mb-6 flex justify-center'>
              <div className='w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg'>
                <FaComments className='text-white text-4xl' />
              </div>
            </div>

            {/* Title */}
            <h2 className='text-3xl font-bold text-foreground mb-3'>
              No Conversation Selected
            </h2>

            {/* Description */}
            <p className='text-low-foreground text-lg mb-8 leading-relaxed'>
              Select a conversation from the list to start chatting, or create a new project from the dashboard.
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => router.push('/dashboard')}
                className='px-6 py-3 bg-primary text-secondary rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 group'
              >
                Go to Dashboard
                <FaArrowRight className='group-hover:translate-x-1 transition-transform' />
              </button>
            </div>

            {/* Hint Text */}
            <p className='text-sm text-low-foreground mt-8'>
              💡 Tip: You can start a new project to begin your first conversation
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ChatSection
