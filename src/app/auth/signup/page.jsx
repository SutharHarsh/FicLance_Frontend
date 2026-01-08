"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import AuthPageLayout from "@/components/Auth/AuthPageLayout";
import AuthVisualSection from "@/components/Auth/AuthVisualSection";
import AuthCard from "@/components/Auth/AuthCard";
import OAuthButtons from "@/components/Auth/OAuthButtons";
import Divider from "@/components/Auth/Divider";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { validateEmail, validatePassword } from "@/utils/emojiValidation";
import PublicRoute from "@/components/PublicRoute";
import { useDynamicSEO, pageMetadata } from "@/lib/seo";

/**
 * CRITICAL: Wrapped with PublicRoute - authenticated users redirect to dashboard
 * SEO Enhancement: Apply signup metadata
 */
function SignUpPageContent() {
  const router = useRouter();
  const { register, authStatus } = useAuth();

  // Apply dynamic SEO for signup page
  useDynamicSEO(pageMetadata.signup);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  // Note: After successful signup, user is redirected to login page
  // No automatic dashboard redirect on signup

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error;

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid)
      newErrors.password = passwordValidation.error;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        // Show success message and redirect to login
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login?registered=true");
        }, 1500);
      }
      // Note: Errors are already shown via toast in AuthContext
    } catch (error) {
      console.error("Signup error:", error);
      // Error handling is done in AuthContext
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthPageLayout>
        <AuthCard title="Success! 🎉" subtitle="Your account has been created">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-muted-foreground">
              Redirecting to login...
            </p>
          </div>
        </AuthCard>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout visualSection={<AuthVisualSection type="signup" />}>
      <AuthCard
        title="Create Account"
        subtitle="Start your FicLance journey today"
      >
        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Server Error */}
          {serverError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                {serverError}
              </p>
            </div>
          )}

          {/* Name Input */}
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            error={errors.name}
            required
            autoComplete="name"
          />

          {/* Email Input */}
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@gmail.com"
            error={errors.email}
            required
            autoComplete="email"
            blockEmoji={true}
          />

          {/* Password Input */}
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            required
            autoComplete="new-password"
            blockEmoji={true}
          />

          {/* Confirm Password Input */}
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
            blockEmoji={true}
          />

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" loading={loading} disabled={loading}>
              Sign Up
            </Button>
          </div>
        </form>

        {/* Divider */}
        <Divider text="or sign up with" />

        {/* OAuth Buttons */}
        <OAuthButtons callbackUrl="/dashboard" />

        {/* Login Link */}
        <div className="text-center pt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#FF8C22] hover:text-[#ff8a1d] dark:text-[#FFA21F] dark:hover:text-[#FF8C22] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthPageLayout>
  );
}

export default function SignUpPage() {
  return (
    <PublicRoute>
      <SignUpPageContent />
    </PublicRoute>
  );
}
