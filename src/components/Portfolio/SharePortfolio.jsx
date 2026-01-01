"use client"; 

import { useState } from "react";

// Custom icon components (kept same as yours)
const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function SharePortfolio() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const portfolioUrl = "https://ficlance.com/portfolio/alexmorgan";
  const message = "Check out my professional portfolio!";

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // simulate export delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // For demo: create a downloadable dummy file
      const link = document.createElement("a");
      link.href = "data:text/plain;charset=utf-8,Portfolio PDF Export";
      link.download = "Alex_Morgan_Portfolio.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // fallback copy for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = portfolioUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSocialShare = (platform) => {
    const url = portfolioUrl;
    const msg = message;

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(msg + " " + url)}`,
      email: `mailto:?subject=${encodeURIComponent("Portfolio Share")}&body=${encodeURIComponent(msg + "\n\n" + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const socialPlatforms = [
    { name: "linkedin", label: "LinkedIn", icon: <LinkedInIcon />, bgColor: "bg-blue-100", textColor: "text-blue-600" },
    { name: "twitter", label: "Twitter", icon: <TwitterIcon />, bgColor: "bg-blue-100", textColor: "text-blue-400" },
    { name: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon />, bgColor: "bg-green-100", textColor: "text-green-600" },
    { name: "email", label: "Email", icon: <MailIcon />, bgColor: "bg-gray-100", textColor: "text-gray-600" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Portfolio</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Export your portfolio as a PDF or share it directly with potential clients and collaborators.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            aria-label="Export portfolio as PDF"
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
              isExporting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } text-white`}
          >
            {isExporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Exporting...
              </>
            ) : (
              <>
                <DownloadIcon />
                Export as PDF
              </>
            )}
          </button>

          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            aria-label="Toggle share options"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 text-gray-800 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ShareIcon />
            Share Portfolio
          </button>
        </div>

        {/* Share Options */}
        <div
          className={`transition-all duration-300 ease-in-out transform ${showShareOptions ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
        >
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg max-w-md mx-auto backdrop-blur-sm bg-opacity-95">
            <h3 className="font-semibold text-lg text-gray-900 mb-6">Share via</h3>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleSocialShare(platform.name)}
                  aria-label={`Share on ${platform.label}`}
                  className="flex flex-col items-center group transition-transform duration-200 hover:scale-105"
                >
                  <div className={`w-14 h-14 rounded-full ${platform.bgColor} flex items-center justify-center ${platform.textColor} mb-3 shadow-md group-hover:shadow-lg`}>
                    {platform.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{platform.label}</span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div>
              <p className="text-sm text-gray-600 mb-3 font-medium">Or copy link</p>
              <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <input type="text" value={portfolioUrl} readOnly className="flex-1 px-4 py-3 text-sm focus:outline-none bg-gray-50" />
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy portfolio link"
                  className={`px-4 py-3 transition-all duration-200 font-medium ${copySuccess ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white flex items-center justify-center min-w-[60px]`}
                >
                  {copySuccess ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              {copySuccess && <p className="text-sm text-green-600 mt-2 font-medium">Link copied to clipboard!</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
