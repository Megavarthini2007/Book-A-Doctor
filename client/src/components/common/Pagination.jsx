import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="d-flex justify-content-center my-4" aria-label="Page navigation">
      <ul className="pagination pagination-md gap-1">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-item page-link rounded-circle border-0 d-flex align-items-center justify-content-center" onClick={() => onPageChange(currentPage - 1)}>
            <FaAngleLeft />
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link rounded-circle border-0 fw-semibold" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link rounded-circle border-0 d-flex align-items-center justify-content-center" onClick={() => onPageChange(currentPage + 1)}>
            <FaAngleRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
