"use client";

import { useEffect } from "react";
import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

/**
 * Professional Toast Notification Component
 * Sleek, modern design with rich animations
 */
export default function Toaster() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const styleId = "professional-toast-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      /* Base Toast Container - Slim & Professional */
      .pro-toast {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        border-radius: 10px !important;
        padding: 12px 16px !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(20px) saturate(180%) !important;
        border: 1px solid rgba(0, 0, 0, 0.06) !important;
        box-shadow: 
          0 4px 16px rgba(0, 0, 0, 0.08),
          0 1px 3px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        position: relative !important;
        overflow: hidden !important;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        min-width: 340px !important;
        max-width: 420px !important;
      }

      /* Dark Mode Styling */
      html.dark .pro-toast {
        background: rgba(30, 30, 35, 0.95) !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        box-shadow: 
          0 4px 20px rgba(0, 0, 0, 0.5),
          0 1px 3px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      }

      /* Hover Effect - Subtle Lift */
      .pro-toast:hover {
        transform: translateY(-1px) scale(1.01) !important;
        box-shadow: 
          0 8px 24px rgba(0, 0, 0, 0.12),
          0 2px 6px rgba(0, 0, 0, 0.06) !important;
      }

      html.dark .pro-toast:hover {
        box-shadow: 
          0 8px 28px rgba(0, 0, 0, 0.6),
          0 2px 8px rgba(0, 0, 0, 0.4) !important;
      }

      /* Left Accent Border - Type Indicators */
      .pro-toast[data-type="success"]::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(180deg, #10b981, #059669);
        box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
      }

      .pro-toast[data-type="error"]::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(180deg, #ef4444, #dc2626);
        box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
      }

      .pro-toast[data-type="warning"]::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(180deg, #f59e0b, #d97706);
        box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
      }

      .pro-toast[data-type="info"]::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(180deg, #3b82f6, #2563eb);
        box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
      }

      .pro-toast[data-type="loading"]::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(180deg, #6366f1, #4f46e5);
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(99, 102, 241, 0.4); }
        50% { opacity: 0.6; box-shadow: 0 0 16px rgba(99, 102, 241, 0.6); }
      }

      /* Subtle Shimmer Effect */
      .pro-toast::after {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.15),
          transparent
        );
        animation: shimmer 3s ease-in-out infinite;
        pointer-events: none;
      }

      html.dark .pro-toast::after {
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.08),
          transparent
        );
      }

      @keyframes shimmer {
        0% { left: -50%; }
        100% { left: 150%; }
      }

      /* Title - Bold & Clear */
      .pro-title {
        font-weight: 600 !important;
        font-size: 13.5px !important;
        line-height: 1.4 !important;
        margin-bottom: 2px !important;
        color: rgba(0, 0, 0, 0.9) !important;
        letter-spacing: -0.01em !important;
      }

      html.dark .pro-title {
        color: rgba(255, 255, 255, 0.95) !important;
      }

      /* Description - Subtle & Readable */
      .pro-description {
        font-size: 12.5px !important;
        line-height: 1.5 !important;
        color: rgba(0, 0, 0, 0.65) !important;
        font-weight: 400 !important;
      }

      html.dark .pro-description {
        color: rgba(255, 255, 255, 0.7) !important;
      }

      /* Smooth Slide-in Animation */
      @keyframes slideInRight {
        from {
          transform: translateX(calc(100% + 32px));
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .pro-toast {
        animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }

      /* Smooth Slide-out Animation */
      [data-removed="true"] .pro-toast {
        animation: slideOutRight 0.25s cubic-bezier(0.4, 0, 1, 1) forwards !important;
      }

      @keyframes slideOutRight {
        to {
          transform: translateX(calc(100% + 32px));
          opacity: 0;
        }
      }

      /* Close Button - Minimal & Elegant */
      .pro-toast button[data-button] {
        order: 9999 !important;
        margin-left: auto !important;
        opacity: 0.5 !important;
        transition: all 0.2s !important;
        color: currentColor !important;
        padding: 4px !important;
        border-radius: 4px !important;
      }

      .pro-toast button[data-button]:hover {
        opacity: 1 !important;
        background: rgba(0, 0, 0, 0.05) !important;
      }

      html.dark .pro-toast button[data-button]:hover {
        background: rgba(255, 255, 255, 0.1) !important;
      }

      /* Success Glow */
      .pro-toast[data-type="success"] {
        background: linear-gradient(135deg, rgba(236, 253, 245, 0.95), rgba(255, 255, 255, 0.95)) !important;
      }

      html.dark .pro-toast[data-type="success"] {
        background: linear-gradient(135deg, rgba(6, 78, 59, 0.3), rgba(30, 30, 35, 0.95)) !important;
      }

      /* Error Glow */
      .pro-toast[data-type="error"] {
        background: linear-gradient(135deg, rgba(254, 242, 242, 0.95), rgba(255, 255, 255, 0.95)) !important;
      }

      html.dark .pro-toast[data-type="error"] {
        background: linear-gradient(135deg, rgba(127, 29, 29, 0.3), rgba(30, 30, 35, 0.95)) !important;
      }

      /* Warning Glow */
      .pro-toast[data-type="warning"] {
        background: linear-gradient(135deg, rgba(255, 251, 235, 0.95), rgba(255, 255, 255, 0.95)) !important;
      }

      html.dark .pro-toast[data-type="warning"] {
        background: linear-gradient(135deg, rgba(120, 53, 15, 0.3), rgba(30, 30, 35, 0.95)) !important;
      }

      /* Info Glow */
      .pro-toast[data-type="info"] {
        background: linear-gradient(135deg, rgba(239, 246, 255, 0.95), rgba(255, 255, 255, 0.95)) !important;
      }

      html.dark .pro-toast[data-type="info"] {
        background: linear-gradient(135deg, rgba(30, 58, 138, 0.3), rgba(30, 30, 35, 0.95)) !important;
      }

      /* Loading Gradient Animation */
      .pro-toast[data-type="loading"] {
        background: linear-gradient(135deg, rgba(238, 242, 255, 0.95), rgba(255, 255, 255, 0.95)) !important;
      }

      html.dark .pro-toast[data-type="loading"] {
        background: linear-gradient(135deg, rgba(49, 46, 129, 0.3), rgba(30, 30, 35, 0.95)) !important;
      }

      /* Container Spacing */
      [data-sonner-toaster] {
        padding: 16px !important;
      }

      /* Stacking Effect */
      [data-sonner-toast][data-y-position="top"] {
        top: 0 !important;
      }

      /* Gap between toasts */
      [data-sonner-toast]:not(:first-child) {
        margin-top: 8px !important;
      }
    `;

    document.head.appendChild(style);
  }, []);

  return (
    <SonnerToaster
      theme={resolvedTheme}
      position="top-right"
      expand={false}
      richColors={false}
      closeButton
      duration={4000}
      visibleToasts={5}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "pro-toast",
          title: "pro-title",
          description: "pro-description",
        },
      }}
    />
  );
}
