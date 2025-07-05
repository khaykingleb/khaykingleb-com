"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Avatar component
 *
 * @returns Avatar component
 */
export const Avatar = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`
        mx-2 h-48 w-48 overflow-hidden rounded-full transition-all duration-300
        ease-in-out
        sm:h-64 sm:w-64
        md:hover:scale-105
      `}
    >
      <Image
        src="/avatar.webp"
        alt="Avatar"
        height={300}
        width={300}
        quality={80}
        loading="lazy"
        priority={false}
        onLoad={(e) => {
          if (e.currentTarget.complete) {
            setIsLoading(false);
          }
        }}
        className={`
          h-full w-full object-cover
          ${isLoading ? `animate-pulse bg-gray-200` : ""}
        `}
      />
    </div>
  );
};
