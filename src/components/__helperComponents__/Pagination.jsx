function Pagination({ itemsPerPage, page, setPage, totalItems, setter }) {
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  if (isNaN(totalPages) || totalPages === 0) {
    totalPages = 1;
  }

  const handlePrevClick = () => {
    if (page > 1) {
      if (!setter) {
        setPage(page - 1);
        return;
      }

      setter((prev) => ({ ...prev, page: page - 1 }));
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      if (!setter) {
        setPage(page + 1);
        return;
      }

      setter((prev) => ({ ...prev, page: page + 1 }));
    }
  };

  const handlePageClick = (pageNumber) => {
    if (!setter) {
      setPage(pageNumber);
      return;
    }

    setter((prev) => ({ ...prev, page: pageNumber }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 2;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      const leftOffset = Math.min(page - 1, halfVisiblePages);
      const rightOffset = Math.min(totalPages - page, halfVisiblePages);

      if (page - leftOffset > 1) {
        pageNumbers.push(renderPageButton(1));
        if (page - leftOffset > 2) {
          pageNumbers.push(
            <button className={`rounded-md px-4 py-2 `} disabled>
              ...
            </button>,
          );
        }
      }

      for (let i = page - leftOffset; i <= page + rightOffset; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (page + rightOffset < totalPages) {
        if (page + rightOffset < totalPages - 1) {
          pageNumbers.push(
            <button className={`rounded-md px-4 py-2 `} disabled>
              ...
            </button>,
          );
        }
        pageNumbers.push(renderPageButton(totalPages));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber) => {
    return (
      <button
        key={pageNumber}
        className={`rounded-md border px-4 py-2 ${
          pageNumber === page ? "pill-primary" : "pill-secondary"
        }`}
        onClick={() => handlePageClick(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className="mt-4 flex justify-center space-x-4">
      <button
        className="pill-primary rounded-md border px-4 py-2 disabled:cursor-not-allowed"
        onClick={handlePrevClick}
        disabled={page === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="pill-primary rounded-md border px-4 py-2 disabled:cursor-not-allowed"
        onClick={handleNextClick}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
