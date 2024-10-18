interface PaginationProps {
  currentPage: number;
  pagesInTotal: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;

export const Pagination = ({
  currentPage,
  pagesInTotal,
  onPageChange,
}: PaginationProps) => {
  const startPage =
    Math.floor(currentPage / MAX_VISIBLE_PAGES) * MAX_VISIBLE_PAGES;
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGES, pagesInTotal);

  return (
    <div className="join mt-auto flex justify-center space-x-0">
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
