"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { containsEmoji } from "@/utils/emojiValidation";

/**
 * Input Component
 * Premium form input with label, error states, emoji blocking, and optional password visibility toggle
 */
export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete,
  blockEmoji = false, // New prop to enable emoji blocking
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  // Handle input change with emoji validation
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Check for emoji if blocking is enabled
    if (blockEmoji && containsEmoji(inputValue)) {
      toast.error("Emoji characters are not allowed", {
        description: `Please remove emoji from your ${label?.toLowerCase() || name}`,
      });
      // Prevent the emoji from being entered
      return;
    }

    // Call parent onChange
    if (onChange) {
      onChange(e);
    }
  };

  // Handle paste events to block emoji
  const handlePaste = (e) => {
    if (blockEmoji) {
      const pastedText = e.clipboardData.getData('text');
      
      if (containsEmoji(pastedText)) {
        e.preventDefault();
        toast.error("Cannot paste emoji characters", {
          description: "Please paste text without emojis",
        });
        return;
      }
    }
  };

  return (
    <div className="space-y-1.5">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-foreground"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          onPaste={handlePaste}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          className={`
            w-full pl-11 pr-4 py-3 rounded-full border transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#FF8C22]/30 focus:border-[#FF8C22]
            disabled:opacity-60 disabled:cursor-not-allowed
            bg-white dark:bg-gray-800 text-gray-900 dark:text-foreground
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            ${
              error
                ? "border-red-300 dark:border-red-500"
                : "border-gray-200 dark:border-gray-700"
            }
          `}
        />
        
        {/* Input Icon */}
        {!isPassword && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {type === "email" ? (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
        )}
        {isPassword && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-muted-foreground hover:text-gray-700 dark:hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
