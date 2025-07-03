"use client";

const NUM_VISIBLE = 5;

/**
 * Reusable button for pagination controls.
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
    className={`btn join-item btn-sm h-8 w-8 transition-colors ${
      isActive
        ? "bg-base-300 hover:bg-base-300 dark:bg-neutral-700 dark:hover:bg-neutral-700"
        : "bg-base-100 hover:bg-base-200"
    } ${disabled ? "cursor-not-allowed" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export const Pagination = ({
  currentPage,
  pagesInTotal,
  onPageChange,
}: {
  currentPage: number;
  pagesInTotal: number;
  onPageChange?: (page: number) => void;
}) => {
  const startPage = Math.floor(currentPage / NUM_VISIBLE) * NUM_VISIBLE;
  const endPage = Math.min(startPage + NUM_VISIBLE, pagesInTotal);
  const pages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  return (
    <div className="join mt-4 mb-[-10] flex justify-center">
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
