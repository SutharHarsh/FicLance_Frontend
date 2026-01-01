"use client";

import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

export default function GitHubFeedbackModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateGitHubUrl = (inputUrl) => {
    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubPattern.test(inputUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    if (!validateGitHubUrl(url)) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    onSubmit(url);
  };

  const handleClose = () => {
    if (!isLoading) {
      setUrl("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
            <FaGithub className="text-indigo-600 text-lg" />
          </div>
          <h3 className="text-base font-semibold text-foreground">GitHub Repository Analysis</h3>
        </div>
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <IoClose className="text-gray-500 text-xl" />
        </button>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-4">
          <label htmlFor="github-url" className="block text-sm font-medium text-gray-700 mb-2">
            Repository URL
          </label>
          <input
            id="github-url"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="https://github.com/username/repository"
            disabled={isLoading}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-50 text-sm"
          />
          {error && (
            <p className="mt-2 text-xs text-red-600">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <FaGithub className="text-sm" />
                Submit Repo
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

GitHubFeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
