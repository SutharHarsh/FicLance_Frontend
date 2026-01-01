"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import AuthPageLayout from "@/components/Auth/AuthPageLayout";
import AuthVisualSection from "@/components/Auth/AuthVisualSection";
import AuthCard from "@/components/Auth/AuthCard";
import OAuthButtons from "@/components/Auth/OAuthButtons";
import Divider from "@/components/Auth/Divider";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { validateEmail, validatePassword } from "@/utils/emojiValidation";
import PublicRoute from "@/components/PublicRoute";

/**
 * Login Page
 * Premium login screen with engaging two-column layout
 * Left: Visual storytelling | Right: Authentication form
 * 
 * CRITICAL: Wrapped with PublicRoute - authenticated users redirect to dashboard
 */
function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, authStatus } = useAuth(); // Get authStatus
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // CRITICAL: Redirect to dashboard when authentication succeeds
  // This happens AFTER authStatus has been updated in the context
  useEffect(() => {
    if (authStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [authStatus, router]);

  // Check for registration success message and auth errors
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'invalid') {
      setServerError('Invalid email or password');
    } else if (error === 'unexpected') {
      setServerError('An unexpected error occurred');
    }
    
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Account created successfully! Please log in.");
    }
  }, [searchParams]);

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

    // Validate email with emoji check
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error;
    }

    // Validate password with emoji check
    const passwordValidation = validatePassword(formData.password, 1); // Min length 1 for login
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      // Login successful, redirect handled by context
    } catch (error) {
      console.error("Login error:", error);
      const msg = error.response?.data?.error?.userMessage || error.message || "Invalid credentials";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout visualSection={<AuthVisualSection type="login" />}>
      <AuthCard
        title="Welcome Back!!"
        subtitle="Log in to continue your journey"
      >
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              {successMessage}
            </p>
          </div>
        )}

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
            autoComplete="current-password"
            blockEmoji={true}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#FF8C22] hover:text-[#ff8a1d] dark:text-[#FFA21F] dark:hover:text-[#FF8C22] transition-colors font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" loading={loading} disabled={loading}>
              Login
            </Button>
          </div>
        </form>

        {/* Divider */}
        <Divider text="or sign in with" />

        {/* OAuth Buttons */}
        <OAuthButtons callbackUrl="/dashboard" />

        {/* Sign Up Link */}
        <div className="text-center pt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-[#FF8C22] hover:text-[#ff8a1d] dark:text-[#FFA21F] dark:hover:text-[#FF8C22] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthPageLayout>
  );
}

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginPageContent />
    </PublicRoute>
  );
}
