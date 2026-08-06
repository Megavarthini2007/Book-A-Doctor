import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

export const Breadcrumb = ({ items = [] }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="my-3">
      <ol className="breadcrumb mb-0 small">
        <li className="breadcrumb-item d-flex align-items-center gap-1">
          <Link to="/" className="text-secondary text-decoration-none">
            <FaHome className="mb-0.5" /> Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className={`breadcrumb-item ${isLast ? 'active text-primary fw-semibold' : ''}`}>
              {isLast ? (
                item.label
              ) : (
                <Link to={item.path} className="text-secondary text-decoration-none">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
