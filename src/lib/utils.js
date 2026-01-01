import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge tailwind classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Check if app is in beta mode
 * Returns true if NEXT_PUBLIC_BETA_MODE is 'true'
 */
export const isBetaMode = () => {
  return process.env.NEXT_PUBLIC_BETA_MODE === "true";
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};
