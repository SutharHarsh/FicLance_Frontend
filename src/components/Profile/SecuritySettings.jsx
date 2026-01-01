"use client";

import React, { useState } from "react";
import { Shield, LogOut, Lock, Key, Moon, Sun, Monitor } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import api from "@/lib/api";

export default function SecuritySettings({ profile }) {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const [isSaving, setIsSaving] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    profile?.preferences?.theme || theme || "system"
  );

  const handleThemeChange = async (newTheme) => {
    setCurrentTheme(newTheme);
    setTheme(newTheme);

    try {
      await api.patch("/users/me", {
        preferences: {
          ...profile.preferences,
          theme: newTheme,
        },
      });
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  const getAuthProviderInfo = () => {
    // Determine which auth provider(s) the user has
    const providers = [];

    // This is simplified - in production, you'd fetch this from the session or account data
    if (profile.email?.includes("gmail")) {
      providers.push({ name: "Google", icon: "🔍" });
    }
    // Check for GitHub or other providers based on your auth setup

    return providers.length > 0 ? providers : [{ name: "Email", icon: "📧" }];
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Optional: Redirect is handled by AuthContext or calling component
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE_MY_ACCOUNT") {
      setDeleteError("Please type the exact confirmation phrase");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      const response = await api.delete("/users/me");

      if (response.data.success) {
        // Account deleted successfully, log out
        await logout();
      } else {
        setDeleteError(response.data.error || "Failed to delete account");
      }
    } catch (error) {
      console.error("Delete account failed:", error);
      setDeleteError("Network error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Shield size={24} />
            Account & Security
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your authentication and account security
          </p>
        </div>

        {/* Authentication Provider */}
        <div className="space-y-6">
          <div className="pb-6 border-b border-border">
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Key size={16} />
              Authentication Method
            </h3>
            <div className="space-y-3">
              {getAuthProviderInfo().map((provider, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">
                        {provider.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Connected
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Session Info */}
          <div className="pb-6 border-b border-border">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Lock size={16} />
              Session Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">
                  {profile.email}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Email Verified</span>
                <span
                  className={`font-medium ${
                    profile.emailVerified ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {profile.emailVerified ? "Yes" : "Not verified"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Account Created</span>
                <span className="font-medium text-foreground">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {profile.id?.slice(0, 16)}...
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {/* Theme Selection */}
            <div className="pb-6 border-b border-border">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <Monitor size={16} />
                Appearance
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", label: "Light", icon: Sun },
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "system", label: "System", icon: Monitor },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleThemeChange(option.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      currentTheme === option.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <option.icon size={20} />
                    <span className="text-xs font-semibold">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors font-semibold"
            >
              <LogOut size={18} />
              Log Out
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Member since {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
