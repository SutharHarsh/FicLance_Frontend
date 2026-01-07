"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";
import OAuthButtons from "@/components/Auth/OAuthButtons";
import Divider from "@/components/Auth/Divider";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";

/**
 * SignupPopup Component
 * Timed signup modal that appears after 30 seconds on landing page
 * Only shows for unauthenticated users, once per session
 */
export default function SignupPopup() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const status = loading
    ? "loading"
    : user
    ? "authenticated"
    : "unauthenticated";
  const statusRef = useRef(status);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Keep status ref updated
  useEffect(() => {
    const previousStatus = statusRef.current;
    statusRef.current = status;
    // console.log("🔍 [POPUP] Auth status updated:", status);

    // If user logs out (authenticated → unauthenticated), reset the flag
    if (previousStatus === "authenticated" && status === "unauthenticated") {
      // console.log("🔓 [POPUP] User logged out - clearing flag");
      sessionStorage.removeItem("signup-popup-shown");
    }
  }, [status]);

  // Start timer on mount (runs ONCE)
  useEffect(() => {
    console.log("🚀 [POPUP] Component mounted!");

    // FORCE RESET for testing (remove in production)
    const forceReset = new URLSearchParams(window.location.search).get("popup");
    if (forceReset === "reset") {
      console.log("🔧 [POPUP] FORCE RESET via ?popup=reset");
      sessionStorage.removeItem("signup-popup-shown");
    }

    // Check if popup has been shown this session
    const hasSeenPopup = sessionStorage.getItem("signup-popup-shown");
    console.log("📦 [POPUP] SessionStorage flag:", hasSeenPopup);

    if (hasSeenPopup && forceReset !== "reset") {
      console.log("⚠️ [POPUP] Already shown - NOT starting timer");
      return;
    }

    console.log("✅ [POPUP] Starting 30-second timer NOW!");

    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      console.log("⏰ [POPUP] 30 SECONDS ELAPSED!");

      // Check current authentication status via ref (gets latest value)
      const currentStatus = statusRef.current;
      console.log("🔍 [POPUP] Current status at timer fire:", currentStatus);

      // Only show if user is unauthenticated
      if (currentStatus === "authenticated") {
        console.log("🔒 [POPUP] User authenticated - NOT showing");
        sessionStorage.setItem("signup-popup-shown", "true");
        return;
      }

      if (currentStatus === "loading") {
        console.log("⏳ [POPUP] Still loading - NOT showing");
        return;
      }

      console.log("🎉 [POPUP] SHOWING POPUP NOW!");
      setIsOpen(true);
      sessionStorage.setItem("signup-popup-shown", "true");
    }, 10000); // TEMPORARY: 5 seconds for testing

    return () => {
      console.log("🧹 [POPUP] Cleanup - clearing timer");
      clearTimeout(timer);
    };
  }, []); // Empty dependency array - run ONCE on mount

  // Hide popup if user becomes authenticated while it's open
  useEffect(() => {
    if (status === "authenticated" && isOpen) {
      setIsOpen(false);
    }
  }, [status, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickSignup = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.email.split("@")[0], // Use email prefix as name
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Success - redirect to dashboard
      router.push("/auth/login?registered=true");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative bg-white dark:bg-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto no-scrollbar"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-muted-foreground" />
          </button>

          {/* Content */}
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-6">
              <h2
                id="popup-title"
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-foreground mb-2"
              >
                Ready to get started?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-muted-foreground">
                Start your Journey with FicLance today!
              </p>
            </div>

            {/* OAuth Buttons */}
            <OAuthButtons callbackUrl="/dashboard" />

            {/* Divider */}
            <Divider text="or log in with email" />

            {/* Quick Signup Form */}
            <form onSubmit={handleQuickSignup} className="space-y-3">
              {serverError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {serverError}
                  </p>
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
                required
              />

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 space-y-3 text-center text-sm">
              <p className="text-gray-600 dark:text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    handleClose();
                    router.push("/auth/signup");
                  }}
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Register
                </button>
              </p>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">
                Go to our{" "}
                <a
                  href="/helpdesk"
                  className="underline hover:text-primary/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HelpDesk
                </a>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
