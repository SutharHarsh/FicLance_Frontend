"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

/**
 * UserAvatar Component
 * Displays user avatar with image fallback to default vector avatar
 * 
 * @param {string} src - Avatar image URL
 * @param {string} alt - Alt text for image
 * @param {string} initials - User initials for fallback
 * @param {string} size - Size variant: "sm" | "md" | "lg"
 */
export default function UserAvatar({ 
  src, 
  alt = "User avatar", 
  initials = "U",
  size = "md" 
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Size mappings
  const sizeClasses = {
    sm: "w-7 h-7 sm:w-8 sm:h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12 sm:w-14 sm:h-14",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const iconSize = iconSizes[size] || iconSizes.md;
  const textSize = textSizes[size] || textSizes.md;

  // Check if we have a valid image source
  const hasValidSrc = src && src !== "" && src !== "null" && src !== "undefined" && !imageError;

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-accent/30 dark:bg-accent/60 relative`}>
      {hasValidSrc ? (
        <>
          {/* Show placeholder while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-accent/30 dark:bg-accent/60">
              <User size={iconSize} className="text-foreground/50" />
            </div>
          )}
          
          {/* Actual image */}
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
            sizes="(max-width: 640px) 32px, 40px"
          />
        </>
      ) : (
        /* Fallback: Show default vector avatar or initials */
        <div className="w-full h-full flex items-center justify-center m-4">
          {initials && initials.length > 0 ? (
            <span className={`text-foreground font-medium ${textSize}`}>
              {initials}
            </span>
          ) : (
            <User size={iconSize} className="text-foreground/70" />
          )}
        </div>
      )}
    </div>
  );
}
