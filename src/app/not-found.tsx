"use client";

import { FaArrowLeft } from "react-icons/fa";

/**
 * Not found page component.
 *
 * @returns The not found page component.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
        <h2 className="font-poppins text-4xl font-bold">
          Page doesn&apos;t exist
        </h2>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-x-2 bg-transparent text-xl font-bold transition-all md:hover:scale-105 md:hover:opacity-80"
          >
            <FaArrowLeft /> Go back
          </button>
        </div>
      </main>
    </div>
  );
}
