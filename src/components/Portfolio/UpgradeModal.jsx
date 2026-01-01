"use client";
import React from "react";
import { X, Check, Globe, Share2, FileDown, Lock } from "lucide-react";

/**
 * Upgrade Modal - Shows when Free users try to access Premium features
 */
const UpgradeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
          <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Unlock Sharing</h2>
          <p className="text-blue-100 text-sm">
            Share your portfolio with the world
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-4 mb-8">
            <FeatureRow
              icon={<Globe className="w-4 h-4 text-blue-600" />}
              title="Public Portfolio Link"
              description="Get a unique URL to share with recruiters"
            />
            <FeatureRow
              icon={<Share2 className="w-4 h-4 text-purple-600" />}
              title="Access to All Themes"
              description="Switch between 7 stunning layouts instantly"
            />
            <FeatureRow
              icon={<FileDown className="w-4 h-4 text-green-600" />}
              title="PDF Export (Coming Soon)"
              description="Download your resume as a professional PDF"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-bold text-gray-900">Premium Plan</span>
              <span className="text-2xl font-black text-blue-600">
                $9.99
                <span className="text-sm font-normal text-gray-500">/mo</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Includes 15 projects, 3 themes, and priority support
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/pricing"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
            >
              Upgrade Now
            </a>
            <button
              onClick={onClose}
              className="block w-full py-3 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureRow = ({ icon, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

export default UpgradeModal;
