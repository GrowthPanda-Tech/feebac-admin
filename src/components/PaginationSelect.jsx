import React from "react";

function PaginationSelect({ setItemsPerPage, setPage, itemsPerPage }) {
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setPage(1);
    };
    return (
        <select
            className=" rounded-md pill-primary"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
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
