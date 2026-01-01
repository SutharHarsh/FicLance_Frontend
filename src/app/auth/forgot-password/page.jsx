"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import AuthPageLayout from "@/components/Auth/AuthPageLayout";
import AuthVisualSection from "@/components/Auth/AuthVisualSection";
import AuthCard from "@/components/Auth/AuthCard";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { validateEmail as validateEmailUtil } from "@/utils/emojiValidation";

/**
 * Forgot Password Page
 * Password reset request screen with engaging two-column layout
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  // Validate email
  const validateEmail = () => {
    const validation = validateEmailUtil(email);
    if (!validation.valid) {
      setError(validation.error);
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail()) return;

    setLoading(true);

    try {
      // Call backend API endpoint to send reset email
      const response = await api.post("/auth/request-password-reset", {
        email,
      });

      // Success - show confirmation
      setSuccess(true);
      toast.success("Password reset email sent!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send reset email";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthPageLayout>
        <AuthCard
          title="Check your email"
          subtitle="Password reset instructions sent"
        >
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              We've sent password reset instructions to{" "}
              <strong className="text-gray-900 dark:text-foreground">
                {email}
              </strong>
              . Please check your inbox and follow the link to reset your
              password.
            </p>
            <div className="space-y-3">
              <Button variant="primary" onClick={() => setSuccess(false)}>
                Try another email
              </Button>
              <Link href="/auth/login">
                <Button variant="secondary">Back to login</Button>
              </Link>
            </div>
          </div>
        </AuthCard>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout visualSection={<AuthVisualSection type="forgot-password" />}>
      <AuthCard
        title="Reset your password"
        subtitle="We'll send you reset instructions"
      >
        {/* Back to Login Link */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground hover:text-accent dark:hover:text-accent transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Server Error */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Info Message */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
          </div>

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={error && !email.trim() ? error : ""}
            required
            autoComplete="email"
            blockEmoji={true}
          />

          {/* Submit Button */}
          <Button type="submit" loading={loading} disabled={loading}>
            Send Reset Link
          </Button>
        </form>
      </AuthCard>
    </AuthPageLayout>
  );
}
