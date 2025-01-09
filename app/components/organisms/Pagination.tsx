interface PaginationProps {
  currentPage: number;
  pagesInTotal: number;
  onPageChange: (page: number) => void;
}

const VISIBLE_PAGE_BUTTONS = 5;

/**
 * Pagination component
 *
 * @param currentPage - The current page number
 * @param pagesInTotal - The total number of pages
 * @param onPageChange - The function to call when the page changes
 * @returns Pagination component
 */
export const Pagination = ({
  currentPage,
  pagesInTotal,
  onPageChange,
}: PaginationProps) => {
  const startPage =
    Math.floor(currentPage / VISIBLE_PAGE_BUTTONS) * VISIBLE_PAGE_BUTTONS;
  const endPage = Math.min(startPage + VISIBLE_PAGE_BUTTONS, pagesInTotal);

  return (
    <div className="join mt-4 flex justify-center">
      <button
        className="btn join-item btn-sm h-8 w-8 bg-base-100 hover:bg-base-200 disabled:cursor-not-allowed disabled:bg-base-200 disabled:text-base-content/30"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        «
      </button>
      {Array.from({ length: endPage - startPage }, (_, index) => (
        <button
          key={startPage + index}
          className={`btn join-item btn-sm h-8 w-8 transition-colors ${
            startPage + index === currentPage
              ? "bg-base-300 hover:bg-base-300 dark:bg-neutral-700 dark:hover:bg-neutral-700"
              : "bg-base-100 hover:bg-base-200"
          }`}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index + 1}
        </button>
      ))}
      <button
        className="btn join-item btn-sm h-8 w-8 bg-base-100 hover:bg-base-200 disabled:cursor-not-allowed disabled:bg-base-200 disabled:text-base-content/30"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagesInTotal - 1}
      >
        »
      </button>
    </div>
  );
};
