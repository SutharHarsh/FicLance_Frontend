"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiX, FiSend } from "react-icons/fi";
import { toast } from "sonner";
import api from "@/lib/api";

export default function SupportTicketModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "Technical issue",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await api.post('/support/ticket', formData);
      
      if (response.data.success) {
        setReferenceId(response.data.referenceId);
        setIsSuccess(true);
        toast.success('Support ticket submitted successfully!');
        
        // Reset form and close modal after delay
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            subject: "",
            category: "Technical issue",
            description: "",
          });
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      toast.error(
        error.response?.data?.message || 'Failed to submit support ticket. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-[2.5rem] overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-8 border-b border-border bg-foreground/[0.02]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-foreground font-['Poppins']">
                    Submit Support Ticket
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1 font-['Poppins']">
                    Our strategic team will assist you shortly.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <FiX className="text-2xl text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary text-4xl">
                    <FiSend />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground font-['Poppins']">
                    Ticket Submitted!
                  </h3>
                  <p className="text-muted-foreground font-['Poppins']">
                    Reference ID:{" "}
                    <span className="text-primary font-mono">
                      {referenceId}
                    </span>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground font-['Poppins']">
                        Subject Line
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Brief summary of the issue"
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-all font-['Poppins']"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground font-['Poppins']">
                        Category
                      </label>
                      <select
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-all appearance-none font-['Poppins']"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                      >
                        <option>Technical issue</option>
                        <option>Account access</option>
                        <option>Billing & Payments</option>
                        <option>Feature request</option>
                        <option>Report a bug</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground font-['Poppins']">
                      Description
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please provide as much detail as possible..."
                      className="w-full bg-muted/50 border border-border rounded-2xl px-4 py-4 text-foreground focus:border-primary outline-none transition-all resize-none font-['Poppins']"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-end pt-4">
                    <button
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:scale-100 font-['Poppins']"
                    >
                      {isSubmitting ? "Processing..." : "Submit Ticket"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
