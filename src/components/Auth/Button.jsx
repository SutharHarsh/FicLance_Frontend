"use client";

/**
 * Button Component
 * Premium CTA button with loading states and variants
 */
export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  fullWidth = true,
}) {
  const variants = {
    primary:
      "bg-accent hover:bg-accent/90 text-white dark:text-accent-foreground shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-100 hover:bg-gray-200 dark:bg-secondary dark:hover:bg-secondary/80 text-gray-900 dark:text-foreground",
    outline:
      "bg-transparent border-2 border-accent hover:bg-accent/10 text-accent dark:text-accent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? "w-full" : ""}
        px-6 py-3.5 rounded-full font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        disabled:opacity-60 disabled:cursor-not-allowed
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-[#FF8C22] to-[#FFA21F] hover:from-[#ff8a1d] hover:to-[#ff9f1a] text-white shadow-lg hover:shadow-xl focus:ring-[#FF8C22]"
            : variant === "secondary"
            ? "bg-gray-100 dark:bg-card hover:bg-gray-200 dark:hover:bg-secondary text-gray-900 dark:text-foreground"
            : "border border-gray-300 dark:border-border hover:bg-gray-50 dark:hover:bg-card/50 text-gray-700 dark:text-foreground"
        }
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
