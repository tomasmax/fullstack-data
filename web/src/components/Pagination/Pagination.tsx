import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 30, 50];

const BASE_CLASS = "pagination";

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const handlePageSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(e.target.value));
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onItemsPerPageChange(Number(e.target.value));
    onPageChange(1);
  };

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}-row`}>
        <button
          className={`${BASE_CLASS}-button`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous page
        </button>
        <select
          className={`${BASE_CLASS}-select`}
          value={currentPage}
          onChange={handlePageSelectChange}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button
          className={`${BASE_CLASS}-button`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
      <div className={`${BASE_CLASS}-row`}>
        <label htmlFor="itemsPerPage">Items Per Page:</label>
        <select
          className={`${BASE_CLASS}-items-per-page`}
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {ITEMS_PER_PAGE_OPTIONS.map((pageItems) => (
            <option key={pageItems} value={pageItems}>
              {pageItems}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
