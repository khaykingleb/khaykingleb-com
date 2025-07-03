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
        ${isLoading ? `animate-pulse` : ""}
      `}
    >
      <Image
        src="/avatar.webp"
        alt="Avatar"
        height={300}
        width={300}
        quality={80}
        loading="lazy"
        className="h-full w-full object-cover"
        onLoad={(e) => {
          // make sure the browser has fully decoded the image
          if (e.currentTarget.complete) {
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
};
