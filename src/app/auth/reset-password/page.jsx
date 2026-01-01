"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import AuthPageLayout from "@/components/Auth/AuthPageLayout";
import AuthVisualSection from "@/components/Auth/AuthVisualSection";
import AuthCard from "@/components/Auth/AuthCard";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";

/**
 * Reset Password Page
 * Allows users to set a new password using the token from their email
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      router.push("/auth/forgot-password");
    }
  }, [token, router]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate password
  const validatePassword = () => {
    const newErrors = {};
    const { password, confirmPassword } = formData;

    // Password requirements
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(password)) {
      newErrors.password = "Password must contain a lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      newErrors.password = "Password must contain an uppercase letter";
    } else if (!/(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain a number";
    }

    // Confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validatePassword()) return;

    setLoading(true);

    try {
      // Call backend API endpoint to reset password
      await api.post("/auth/reset-password", {
        token,
        newPassword: formData.password,
      });

      // Success
      setSuccess(true);
      toast.success("Password reset successful!");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password";
      
      if (errorMessage.includes("Invalid or expired")) {
        toast.error("Reset link has expired. Please request a new one.");
        setTimeout(() => {
          router.push("/auth/forgot-password");
        }, 2000);
      } else {
        setErrors({ submit: errorMessage });
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = [
      "",
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
    ];

    return {
      strength: (strength / 5) * 100,
      label: labels[strength - 1] || labels[0],
      color: colors[strength - 1] || colors[0],
    };
  };

  const passwordStrength = getPasswordStrength();

  if (success) {
    return (
      <AuthPageLayout>
        <AuthCard title="Password Reset Successful" subtitle="Redirecting to login...">
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
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>
            <Link href="/auth/login">
              <Button variant="primary">Go to Login</Button>
            </Link>
          </div>
        </AuthCard>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout visualSection={<AuthVisualSection type="reset-password" />}>
      <AuthCard
        title="Set new password"
        subtitle="Enter your new password below"
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
          {/* Submit Error */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-2">
            <Input
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              error={errors.password}
              required
              autoComplete="new-password"
              blockEmoji={true}
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  />
                </div>
                {passwordStrength.label && (
                  <p className="text-xs text-gray-600 dark:text-muted-foreground">
                    Password strength: {passwordStrength.label}
                  </p>
                )}
              </div>
            )}

            {/* Password Requirements */}
            <div className="text-xs text-gray-600 dark:text-muted-foreground space-y-1">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li className={formData.password.length >= 8 ? "text-green-600 dark:text-green-400" : ""}>
                  At least 8 characters
                </li>
                <li className={/(?=.*[a-z])/.test(formData.password) ? "text-green-600 dark:text-green-400" : ""}>
                  One lowercase letter
                </li>
                <li className={/(?=.*[A-Z])/.test(formData.password) ? "text-green-600 dark:text-green-400" : ""}>
                  One uppercase letter
                </li>
                <li className={/(?=.*\d)/.test(formData.password) ? "text-green-600 dark:text-green-400" : ""}>
                  One number
                </li>
              </ul>
            </div>
          </div>

          {/* Confirm Password Input */}
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter new password"
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
            blockEmoji={true}
          />

          {/* Submit Button */}
          <Button type="submit" loading={loading} disabled={loading}>
            Reset Password
          </Button>
        </form>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-muted-foreground">
            Link expired?{" "}
            <Link
              href="/auth/forgot-password"
              className="text-accent hover:underline font-medium"
            >
              Request a new one
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthPageLayout>
  );
}
