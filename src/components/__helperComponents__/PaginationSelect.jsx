import { useState } from "react";

function PaginationSelect({
  setItemsPerPage,
  setPage,
  itemsPerPage,
  setQueryParams,
}) {
  const [itemCount, setItemCount] = useState(10);

  const handleChange = (e) => {
    const newItemCount = parseInt(e.target.value);

    //TODO: is this backwords compatibility?
    if (setItemsPerPage) {
      setItemsPerPage(newItemCount);
    }
    if (setPage) {
      setPage(1);
    }

    //whew
    setItemCount(newItemCount);
    setQueryParams((prev) => ({
      ...prev,
      count: newItemCount,
      page: 1,
    }));
  };

  return (
    <select
      className="pill-primary rounded-md border-0"
      value={itemCount}
      onChange={handleChange}
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={20}>20 per page</option>
      <option value={30}>30 per page</option>
      <option value={40}>40 per page</option>
      <option value={50}>50 per page</option>
    </select>
  );
}

export default PaginationSelect;
