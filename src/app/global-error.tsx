"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

/**
 * GlobalError component to display error information and provide user actions.
 *
 * @param error - The error object containing error details.
 * @param reset - The function to reset the error state.
 * @returns The rendered GlobalError component.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <main
            className={`
              flex flex-grow flex-col items-center justify-center px-4
              text-center
            `}
          >
            <h1 className="mb-2 font-poppins text-4xl font-black">
              Something went wrong!
            </h1>
            <h2 className="font-gill-sans text-base">
              If the issue continues, please try again later or reach out to me
            </h2>
            <div className="mt-4 flex gap-4 font-gill-sans">
              <button
                onClick={reset}
                className={`
                  flex items-center gap-x-1 bg-transparent text-xl font-bold
                  transition-all
                  md:hover:scale-105 md:hover:opacity-80
                `}
              >
                <IoMdRefresh />
                Try again
              </button>
              <Link
                href="/"
                className={`
                  flex items-center gap-x-1 bg-transparent text-xl font-bold
                  transition-all
                  md:hover:scale-105 md:hover:opacity-80
                `}
              >
                <FaHome />
                Go to home
              </Link>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
