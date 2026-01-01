"use client";
import React, { useState, useEffect } from "react";
import { X, Copy, Check, Globe, Loader2, RefreshCw, Power } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

/**
 * Share Portfolio Modal
 * Allows users to generate link, select theme, and manage settings
 */
const SharePortfolioModal = ({ isOpen, onClose, userTheme = "detailed" }) => {
  const [loading, setLoading] = useState(false);
  const [shareInfo, setShareInfo] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(userTheme);
  const [copied, setCopied] = useState(false);

  // Themes list
  const themes = [
    { id: "detailed", name: "Detailed (Default)" },
    { id: "minimalist", name: "Minimalist" },
    { id: "bento", name: "Bento Grid" },
    { id: "timeline", name: "Timeline" },
    { id: "modern", name: "Modern Grid" },
    { id: "dashboard", name: "Dashboard" },
  ];

  // Fetch share info when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchShareInfo();
    }
  }, [isOpen]);

  const fetchShareInfo = async () => {
    try {
      setLoading(true);
      const res = await api.get("/portfolio/share/info");
      if (res.data.success) {
        setShareInfo(res.data.data);
        if (res.data.data.settings?.theme) {
          setSelectedTheme(res.data.data.settings.theme);
        }
      }
    } catch (error) {
      console.error("Failed to fetch share info", error);
    } finally {
      setLoading(false);
    }
  };

  const generateLink = async () => {
    try {
      setLoading(true);
      const res = await api.post("/portfolio/share/generate", {
        theme: selectedTheme,
      });
      if (res.data.success) {
        setShareInfo((prev) => ({
          ...prev,
          shareLink: res.data.data.shareLink,
          shareToken: res.data.data.shareToken,
          settings: res.data.data.settings,
        }));
        toast.success("Share link generated!");
      }
    } catch (error) {
      toast.error("Failed to generate link");
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newTheme) => {
    setSelectedTheme(newTheme);
    if (!shareInfo?.shareToken) return; // Don't update backend if no token exists yet

    try {
      // Optimistic update
      setShareInfo((prev) => ({
        ...prev,
        settings: { ...prev.settings, theme: newTheme },
      }));

      await api.put("/portfolio/share/settings", {
        theme: newTheme,
        enabled: true,
      });
      toast.success("Theme updated");
    } catch (error) {
      toast.error("Failed to update theme");
    }
  };

  const copyToClipboard = () => {
    if (!shareInfo?.shareLink) return;
    navigator.clipboard.writeText(shareInfo.shareLink);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const disableSharing = async () => {
    try {
      setLoading(true);
      await api.post("/portfolio/share/disable");
      setShareInfo((prev) => ({
        ...prev,
        settings: { ...prev.settings, enabled: false },
      }));
      toast.success("Sharing disabled");
    } catch (error) {
      toast.error("Failed to disable sharing");
    } finally {
      setLoading(false);
    }
  };

  const enableSharing = async () => {
    if (shareInfo?.shareToken) {
      try {
        setLoading(true);
        await api.put("/portfolio/share/settings", {
          enabled: true,
        });
        setShareInfo((prev) => ({
          ...prev,
          settings: { ...prev.settings, enabled: true },
        }));
        toast.success("Sharing enabled");
      } catch (error) {
        toast.error("Failed to enable sharing");
      } finally {
        setLoading(false);
      }
    } else {
      generateLink();
    }
  };

  if (!isOpen) return null;

  const isShared = shareInfo?.settings?.enabled && shareInfo?.shareLink;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Share Portfolio
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {loading && !shareInfo ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Share Status Toggle */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <p className="font-semibold text-gray-900">Public Sharing</p>
                  <p className="text-xs text-gray-500">
                    Allow anyone with the link to view your portfolio
                  </p>
                </div>
                <button
                  onClick={isShared ? disableSharing : enableSharing}
                  disabled={loading}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isShared ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isShared ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Link Section */}
              <div
                className={`transition-opacity duration-300 ${
                  isShared ? "opacity-100" : "opacity-50 pointer-events-none"
                }`}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Public Link
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 truncate font-mono">
                    {shareInfo?.shareLink || "Link starts with https://..."}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    disabled={!isShared}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 flex items-center justify-center transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Theme for Public View
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => updateSettings(theme.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border ${
                        selectedTheme === theme.id
                          ? "bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {theme.name}
                        {selectedTheme === theme.id && (
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {!shareInfo?.shareLink && !loading && (
                <button
                  onClick={generateLink}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Generate Share Link
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharePortfolioModal;
