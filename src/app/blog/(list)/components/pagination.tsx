"use client";

import React from "react";

const NUM_VISIBLE = 5;

/**
 * Reusable button for pagination controls.
 *
 * @param children - The content to be displayed inside the button.
 * @param onClick - The function to call when the button is clicked.
 * @param disabled - Whether the button is disabled.
 * @param isActive - Whether the button is active.
 * @returns The PageButton component.
 */
const PageButton = ({
  children,
  onClick,
  disabled,
  isActive = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
}) => (
  <button
    className={`
      btn join-item h-8 w-8 transition-colors btn-sm
      ${
        isActive
          ? `
            bg-base-300
            hover:bg-base-300
          `
          : `
            bg-base-100
            hover:bg-base-200
          `
      }
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
    `}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

/**
 * Pagination component for navigating through pages of content.
 *
 * @param currentPage - The current page number.
 * @param pagesInTotal - The total number of pages.
 * @param onPageChange - The function to call when the page changes.
 * @returns The Pagination component.
 */
export const Pagination = ({
  currentPage,
  pagesInTotal,
  onPageChange,
}: {
  currentPage: number;
  pagesInTotal: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange?: (page: number) => void;
}) => {
  if (pagesInTotal < 1) return null;

  const startPage = Math.floor(currentPage / NUM_VISIBLE) * NUM_VISIBLE;
  const endPage = Math.min(startPage + NUM_VISIBLE, pagesInTotal);
  const pages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  return (
    <div className="mt-2 -mb-2 join flex justify-center">
      {/* Previous page button */}
      <PageButton
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 0}
      >
        «
      </PageButton>

      {/* Page number buttons */}
      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange?.(page)}
          isActive={page === currentPage}
        >
          {page + 1}
        </PageButton>
      ))}

      {/* Next page button */}
      <PageButton
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === pagesInTotal - 1}
      >
        »
      </PageButton>
    </div>
  );
};
