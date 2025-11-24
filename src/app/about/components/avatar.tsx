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
        relative mx-2 h-48 w-48 overflow-hidden rounded-full transition-all
        duration-300 ease-in-out
        sm:h-64 sm:w-64
        md:hover:scale-102
        ${isLoading ? "animate-pulse bg-gray-200" : ""}
      `}
    >
      <Image
        src="/avatar.webp"
        alt="Avatar"
        fill
        className={`
          rounded-full object-cover
          ${
            isLoading
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-300"
          }
        `}
        onLoad={(e) => {
          if (e.currentTarget.complete) {
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
};
