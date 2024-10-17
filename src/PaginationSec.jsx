const PaginationSec = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  setCurrentPage,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2);
      } else {
        pageNumbers.push(1, 2, "...");
      }

      if (currentPage > 2 && currentPage < totalPages - 2) {
        pageNumbers.push(currentPage);
      }

      pageNumbers.push("...", totalPages - 1, totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex justify-center items-center my-8'>
      <a
        href='#'
        className={`flex items-center justify-center px-8 py-6 font-semibold text-xl mx-1 text-gray-500 capitalize bg-white rounded-md ${
          currentPage === 1
            ? "cursor-not-allowed"
            : "hover:bg-blue-500 hover:text-white"
        }`}
        onClick={(e) => {
          e.preventDefault();
          handlePrevPage();
        }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </a>

      {pageNumbers.map((page, index) => (
        <a
          key={index}
          href='#'
          className={`${
            page === "..."
              ? "cursor-default"
              : "hidden sm:inline px-8 py-6 font-semibold text-xl mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md hover:bg-blue-500 hover:text-white"
          } ${currentPage === page ? "bg-blue-500 text-white" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            if (page !== "...") {
              setCurrentPage(page);
            }
          }}>
          {page}
        </a>
      ))}

      <a
        href='#'
        className={`flex items-center justify-center px-8 py-6 font-semibold text-xl mx-1 text-gray-500 capitalize bg-white rounded-md ${
          currentPage === totalPages
            ? "cursor-not-allowed"
            : "hover:bg-blue-500 hover:text-white"
        }`}
        onClick={(e) => {
          e.preventDefault();
          handleNextPage();
        }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </a>
    </div>
  );
};

export default PaginationSec;
