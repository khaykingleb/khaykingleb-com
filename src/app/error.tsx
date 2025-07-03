"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

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
    <html>
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
            <h1 className="font-poppins mb-2 text-4xl font-black">
              Something went wrong!
            </h1>
            <h2 className="font-gill-sans text-base">
              If the issue continues, please try again later or reach out to me
            </h2>
            <div className="font-gill-sans mt-4 flex gap-4">
              <button
                onClick={() => reset()}
                className="flex items-center gap-x-1 bg-transparent text-xl font-bold transition-all md:hover:scale-105 md:hover:opacity-80"
              >
                <IoMdRefresh />
                Try again
              </button>
              <Link
                href="/"
                className="flex items-center gap-x-1 bg-transparent text-xl font-bold transition-all md:hover:scale-105 md:hover:opacity-80"
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
