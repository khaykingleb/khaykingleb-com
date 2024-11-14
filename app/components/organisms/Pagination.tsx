interface PaginationProps {
  currentPage: number;
  pagesInTotal: number;
  onPageChange: (page: number) => void;
}

const MAX_PAGES_PER_PAGE = 5;

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
    Math.floor(currentPage / MAX_PAGES_PER_PAGE) * MAX_PAGES_PER_PAGE;
  const endPage = Math.min(startPage + MAX_PAGES_PER_PAGE, pagesInTotal);

  return (
    <div className="font-gill-sans join mt-auto flex justify-center space-x-0">
      <button
        className="btn join-item btn-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        «
      </button>
      {Array.from({ length: endPage - startPage }, (_, index) => (
        <button
          key={startPage + index}
          className={`btn join-item btn-sm ${startPage + index === currentPage ? "btn-active" : ""}`}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index + 1}
        </button>
      ))}
      <button
        className="btn join-item btn-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagesInTotal - 1}
      >
        »
      </button>
    </div>
  );
};
