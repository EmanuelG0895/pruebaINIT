import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageRange = 5; // Número máximo de páginas a mostrar

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="First"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <span className="hidden sm:inline">First</span>
        <span className="sm:hidden">«</span>
      </button>
      <button
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <svg
          className="shrink-0 size-3.5 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">‹</span>
      </button>
      <div className="flex items-center gap-x-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            type="button"
            className={`min-h-[38px] min-w-[38px] flex justify-center items-center text-white bg-gray-800 hover:bg-gray-700 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-700 ${
              currentPage === page ? "bg-gray-600" : ""
            }`}
            aria-current={currentPage === page ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">›</span>
        <svg
          className="shrink-0 size-3.5 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
      <button
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Last"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Last</span>
        <span className="sm:hidden">»</span>
      </button>
    </nav>
  );
};

export default Pagination;
